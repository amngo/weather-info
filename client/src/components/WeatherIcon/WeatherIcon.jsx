import React from 'react';
import {
  WiDaySunny,
  WiNightClear,
  WiRain,
  WiSnow,
  WiSleet,
  WiWindy,
  WiFog,
  WiCloudy,
  WiCloud,
  WiNightPartlyCloudy
} from 'react-icons/wi';

const iconMap = {
  'clear-day': <WiDaySunny />,
  'clear-night': <WiNightClear />,
  rain: <WiRain />,
  snow: <WiSnow />,
  sleet: <WiSleet />,
  wind: <WiWindy />,
  fog: <WiFog />,
  cloudy: <WiCloudy />,
  'partly-cloudy-day': <WiCloud />,
  'partly-cloudy-night': <WiNightPartlyCloudy />
};

const WeatherIcon = ({ classes, icon }) => {
  return <div className={classes}>{iconMap[icon]}</div>;
};

export default WeatherIcon;
