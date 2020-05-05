import * as url from 'url';
import axios, { AxiosResponse } from 'axios';
import { Response, Request, NextFunction } from "express";

const API_URL = 'https://www.metaweather.com/';

const woeidService = (
    host: string,
    query: string | string[],
    lattlong: string | string[],
): Promise<AxiosResponse> => {
    const queryString = query ? `query=${query}` : `lattlong=${lattlong}`;
    const url = `${host}api/location/search/?${queryString}`;
    return axios.get(url);
}

const queryValidation = (
    query: string | string[],
    lattlong: string | string[]
): boolean => {
    const hasNoQueryParam = !query && !lattlong
    const isArrayQueryParam = Array.isArray(query) || Array.isArray(lattlong);
    return hasNoQueryParam || isArrayQueryParam; 
}

export const getWoeid = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const urlParts = url.parse(req.url, true);
        const { query, lattlong } = urlParts.query;

        if (
            queryValidation(query, lattlong)
        ) {
            res.status(400);
            return res.end();
        }

        const response = await woeidService(API_URL, query, lattlong);

        if (response.status === 200) {
            const { data } = response;
            const woeid = data[0].woeid; 
            res.send({ woeid });
            res.end();
        }
    } catch (err) {
        if (err) {
            next(err);
        }
    }
};

const fiveDayForecastService = (url: string) => {
    return axios.get(url);
}

export const getFiveDayForecast = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const urlParts = url.parse(req.url, true);
        const { woeid } = urlParts.query;
        const response = await fiveDayForecastService(`${API_URL}api/location/${woeid}`);

        if (response.status === 200) {
            const { data } = response;
            res.send(data);
            res.end();
        }
    } catch (err) {
        next(err);
    }
}


// export const getIcons = async (weatherStateAbbr: string[]) => {
//     try {
//         const urls = weatherStateAbbr.map((abbr) =>
//             axios.get(`https://www.metaweather.com/static/img/weather/${abbr}.svg`));
//         return (await axios
//             .all(urls)
//             .then(
//                 axios.spread(
//                     (...responses) => {
//                         return responses.map(response => response.data)
//                     }),
//                 )
//             );
//     } catch (err) {
//         console.log('TRY THIS: ', err);
//     }
// };

export const getWeather = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const urlParts = url.parse(req.url, true);
        const { query, lattlong } = urlParts.query;

        const woeidResponse = await woeidService(API_URL, query, lattlong);

        if (woeidResponse.status !== 200) {
            throw new Error(`Weather service not available!`);
        }

        const { woeid } = woeidResponse.data[0];

        const weather = await fiveDayForecastService(`${API_URL}api/location/${woeid}`);

        if(weather.status === 200) {
            const { data } = weather;
            res.send(data);
            res.end();
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
}

// export const getStaticProxy = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const abbr = req.params.icon;
//         const { data, status } = await axios.get(`${API_URL}static/img/weather/${abbr}`);
// 
//         if (status === 200) {
//             res.setHeader('Content-Type', 'image/svg+xml');
//             res.send(data);
//         }
//         res.end();
//     } catch (err) {
//         console.log(err);
//     }
// }