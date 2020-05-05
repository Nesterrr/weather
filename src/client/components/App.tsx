import
  React,
  {
    FunctionComponent,
    useState,
    useEffect,
  }
from 'react';
import axios, { AxiosResponse } from 'axios';
import { WeatherForecast } from './WeatherForecast';
import { Data } from '../types/weather';

function getError(error: PositionError) {
  console.dir(error);
  switch(error.code) {
    case error.PERMISSION_DENIED:
      return "User denied the request for Geolocation.";
    case error.POSITION_UNAVAILABLE:
      return "Location information is unavailable.";
    case error.TIMEOUT:
      return "The request to get user location timed out.";
    default:
      return "An unknown error occurred.";
  }
}

const geolocationOptions = {
  timeout: 60000,
};

type Coords = {
  coords: {
    latitude: number,
    longitude: number,
}};

const useWeatherFetch = (disabled: boolean) => {
  // if (disabled) {
  //   return { error: null, data: null };
  // }
  const { location, error } = useCurrentLocation(geolocationOptions);
  const [data, setData] = useState<Data>();

  useEffect(() => {
    if (location) {
      async function fetchData() {
        const result: AxiosResponse<any> | void =
          await axios
            .get(`/api/weather?lattlong=${location}`)
            .catch(err => console.log(err));
        if (result) {
          setData(result.data);
        }
      }
      fetchData();
    }
  }, [location]);
  // const fetchError = null;
  const currentError = error; //  || fetchError;

  return {
    data,
    error: currentError,
  };
}

const useCurrentLocation = (options = {}) => {
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleSuccess = ({ coords }: Coords): void =>
      setLocation(`${coords.latitude},${coords.longitude}`);

    const handleError = (error: PositionError): void =>
      setError(getError(error));

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    );
  }, [options]);

  return { location, error };
}


export const App:FunctionComponent = () => {
  const [disabled, toggle] = useState<boolean>(true);

  const { data, error } = useWeatherFetch(disabled);

  if (!disabled && data) {
    return <WeatherForecast data={data} /> 
  }
  return (
    <div>
      <button onClick={() => toggle(!disabled)}>
        Fetch
      </button>
    </div>
  );
}
