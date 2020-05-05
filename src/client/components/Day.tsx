import React from 'react';


type Props = {
    minTemp: number,
    maxTemp: number,
    windSpeed: number,
    windDirection: number,
    weatherStateAbbr: string,
};

const IMG_URL = 'https://www.metaweather.com/static/img/weather/';

export const Day = ({
    minTemp,
    maxTemp,
    windSpeed,
    windDirection,
    weatherStateAbbr,
}: Props) => {
    const src = `${IMG_URL}${weatherStateAbbr}.svg`
    return (
        <React.Fragment>
            <span>min: {minTemp}</span>
            <span>max: {maxTemp}</span>
            <span>wind speed: {windSpeed}</span>
            <span>wind direction: {windDirection}</span>
            <img
                src={src}
                width="32"
                height="32"
            ></img> 
        </React.Fragment>
    )
}