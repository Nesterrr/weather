import React from 'react';
import styled, { css } from 'styled-components';


interface DayForecastContainerProps {
    readonly isTodayForecast: boolean,
    
}

const DayForecastContainer = styled.section<DayForecastContainerProps>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8px;
    color: #fff;
    background-color: #68b6d4;

    ${({ isTodayForecast }) =>
        isTodayForecast
        && css`
            background-color: #0193cc;
        `
    }

    & img {
        align-self: center;
    }
`;

const WeatherDescriptionPart = styled.div`
    text-transform: capitalize;

    & span {
        display: inline-block;
        width: 80px;
    }
`;

type Props = {
    minTemp: number,
    maxTemp: number,
    windSpeed: number,
    windDirection: string,
    weatherStateAbbr: string,
    applicableDate: string,
    isTodayForecast: boolean,
};

const IMG_URL = 'https://www.metaweather.com/static/img/weather/';

export const Day = ({
    minTemp,
    maxTemp,
    windSpeed,
    windDirection,
    weatherStateAbbr,
    applicableDate,
    isTodayForecast,
}: Props) => {
    const src = `${IMG_URL}${weatherStateAbbr}.svg`;
    return (
        <DayForecastContainer isTodayForecast={isTodayForecast}>
            <img
                src={src}
                width="40"
                height="40"
            />
            {/* <WeatherDescriptionPart><span>date:</span> {applicableDate}</WeatherDescriptionPart> */}
            <WeatherDescriptionPart><span>min:</span> {Math.round(minTemp)}</WeatherDescriptionPart>
            <WeatherDescriptionPart><span>max:</span> {Math.round(maxTemp)}</WeatherDescriptionPart>
            <WeatherDescriptionPart><span>speed:</span> {Math.round(windSpeed * 10) / 10}</WeatherDescriptionPart>
            <WeatherDescriptionPart><span>direction:</span> {windDirection}</WeatherDescriptionPart> 
        </DayForecastContainer>
    )
}