import
  React,
  {
    FunctionComponent,
    useState,
    useEffect,
  }
from 'react';
import { Day } from './Day';
import { Data } from '../types/weather';

type Props = { 
    data: Data,
};

export const WeatherForecast = ({ data }: Props) => {
    const date = new Date(data.time);

    console.log('::: ', JSON.stringify(data, null, 2));
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return (
      <div>
        {data.consolidated_weather.length}
        {JSON.stringify(data.sources)}
        <div>City: {data.parent.title}</div>
        <div>Date: {formattedDate}</div>
        <ul>
            {
              data.consolidated_weather.map(({
                min_temp,
                max_temp,
                wind_speed,
                wind_direction,
                id,
              }) => (
                <li key={id}>
                  <Day
                    minTemp={min_temp}
                    maxTemp={max_temp}
                    windSpeed={wind_speed}
                    windDirection={wind_direction}
                  />      
                </li>)
              )
            }
          </ul>
      </div>
    )
}
