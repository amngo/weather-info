import React from 'react';
import moment from 'moment';
import './ForecastCard.scss';
import WeatherIcon from '../WeatherIcon/WeatherIcon';

const ForecastCard = ({
  forecast,
  setCurrentForecast,
  celsius,
  selectedId,
  setSelectedId
}) => {
  const { time, temperature } = forecast;
  const formattedTime = moment.unix(time).format('h a');
  const formattedTemp = celsius
    ? Math.round((temperature - 32) * (5 / 9)) + ' °C'
    : Math.round(temperature) + ' °F';
  const handleClick = () => {
    setCurrentForecast && setCurrentForecast(forecast);
    setSelectedId && setSelectedId(time);
  };

  return (
    <button
      className={`forecast-card ${selectedId === time ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <div className="forecast-card__time">{formattedTime}</div>
      <WeatherIcon classes={'forecast-card__icon'} icon={forecast.icon} />
      <div className="forecast-card__temperature">{formattedTemp}</div>
    </button>
  );
};

export default ForecastCard;
