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

    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return (
      <div>
        <div>City: {data.parent.title}</div>
        <div>Date: {formattedDate}</div>
        <ul>
            {
              data.consolidated_weather.map(({
                id,
                min_temp,
                max_temp,
                wind_speed,
                wind_direction,
                weather_state_abbr,
              }) => (
                <li key={id}>
                  <Day
                    minTemp={min_temp}
                    maxTemp={max_temp}
                    windSpeed={wind_speed}
                    windDirection={wind_direction}
                    weatherStateAbbr={weather_state_abbr}
                  />      
                </li>)
              )
            }
          </ul>
      </div>
    )
}
