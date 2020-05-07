import React from 'react';
import { Day } from '../Day/';
import styled, { css } from 'styled-components';
import { Data } from '../../types/weather';


const ForecastContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

const WeatherList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const WeatherItem = styled.li`
  display: flex;
  flex-direction: column;
  max-width: 160px;
  margin-right: 1px;
`;

const Location = styled.div`

`

type Props = { 
    data: Data,
};


export const WeatherForecast = ({ data }: Props) => {
    const date = new Date(data.time);

    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    return (
      <ForecastContainer>
        <div>City: {data.parent.title}</div>
        <div>Date: {formattedDate}</div>
        <WeatherList>
            {
              data.consolidated_weather.map(({
                id,
                min_temp,
                max_temp,
                wind_speed,
                wind_direction_compass,
                weather_state_abbr,
                applicable_date,
              }, index) => (
                <WeatherItem key={id}>
                  <Day
                    minTemp={min_temp}
                    maxTemp={max_temp}
                    windSpeed={wind_speed}
                    windDirection={wind_direction_compass}
                    weatherStateAbbr={weather_state_abbr}
                    applicableDate={applicable_date}
                    isTodayForecast={index === 0}
                  />      
                </WeatherItem>)
              )
            }
          </WeatherList>
        </ForecastContainer>
    )
}
