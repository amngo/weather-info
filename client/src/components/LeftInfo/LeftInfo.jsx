import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import * as easings from 'd3-ease';
import moment from 'moment';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import { MdLocationOn } from 'react-icons/md';
import axios from 'axios';

import './LeftInfo.scss';

const ENDPOINT =
  process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : '';

const LeftInfo = ({
  currentForecast,
  setCelsius,
  setData,
  setCurrentForecast,
  celsius
}) => {
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');
  const [showInput, setShowInput] = useState(false);
  let time,
    temperature,
    icon,
    summary,
    formattedTime,
    formattedTemp = 0,
    toCelsius,
    toFahrenheit;

  if (currentForecast) {
    time = currentForecast.time;
    temperature = currentForecast.temperature;
    icon = currentForecast.icon;
    summary = currentForecast.summary;
    formattedTime = moment.unix(time).format('dddd, MMMM Do h:mm A');
    formattedTemp = celsius ? (temperature - 32) * 1.8 : temperature;
    toCelsius = () => setCelsius && setCelsius(true);
    toFahrenheit = () => setCelsius && setCelsius(false);
  }

  let temp = useSpring({
    number: formattedTemp,
    config: { duration: 500, easing: easings.easeQuadInOut }
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${ENDPOINT}/forecast?q=Westminster CA 92683`);
      const { forecastData, locationName } = result.data;
      console.log(forecastData);
      setLocation(locationName);
      setData(forecastData);
      setCurrentForecast(forecastData.currently);
    };

    fetchData();
  }, [setCurrentForecast, setData]);

  const getForecast = async query => {
    const result = await axios(`${ENDPOINT}/forecast?q=${query}`);
    const { forecastData, locationName } = result.data;

    setLocation(locationName);
    setData(forecastData);
    setCurrentForecast(forecastData.currently);
  };

  return (
    <div className="left-info">
      <WeatherIcon classes={'left-info__icon'} icon={icon} />
      <div className="left-info__type">{summary}</div>
      <div className="left-info__group">
        <div className="left-info__temperature">
          <animated.span>
            {temp.number.interpolate(val => Math.round(val))}
          </animated.span>
          {celsius ? ' °C' : ' °F'}
        </div>
        <div className="left-info__format">
          <button
            className={`btn ${celsius ? 'active' : ''}`}
            onClick={toCelsius}
          >
            °C
          </button>
          <div className="seperator">|</div>
          <button
            className={`btn ${celsius ? '' : 'active'}`}
            onClick={toFahrenheit}
          >
            °F
          </button>
        </div>
      </div>
      <div className="left-info__time">{formattedTime}</div>
      <div className="left-info__city-name">{location}</div>
      {showInput ? (
        <input
          className="left-info__input"
          type="text"
          value={query}
          placeholder="Enter city and state"
          onChange={event => setQuery(event.target.value)}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              setShowInput(false);
              getForecast(query);
              setQuery('');
            }
          }}
        />
      ) : (
        <button className="left-info__btn" onClick={() => setShowInput(true)}>
          <MdLocationOn className="icon" />
          Change Location
        </button>
      )}
    </div>
  );
};

export default LeftInfo;
