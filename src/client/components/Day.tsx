import React from 'react';


type Props = {
    minTemp: number,
    maxTemp: number,
    windSpeed: number,
    windDirection: number,
};

export const Day = ({
    minTemp,
    maxTemp,
    windSpeed,
    windDirection,
}: Props) => {
    return (
        <React.Fragment>
            <span>min: {minTemp}</span>
            <span>max: {maxTemp}</span>
            <span>wind speed: {windSpeed}</span>
            <span>wind direction: {windDirection}</span>
        </React.Fragment>
    )
}