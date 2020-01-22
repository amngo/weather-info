import React from 'react';
import { useSpring, animated } from 'react-spring';
import { WiHumidity, WiRain, WiStrongWind, WiBarometer } from 'react-icons/wi';
import * as easings from 'd3-ease';

import './RightInfo.scss';

const RightInfo = ({ currentForecast }) => {
  const humidity = useSpring({
    number: currentForecast.humidity * 100,
    config: { duration: 500, easing: easings.easeQuadInOut }
  });
  const pressure = useSpring({
    number: currentForecast.pressure,
    config: { duration: 500, easing: easings.easeQuadInOut }
  });
  const rainChance = useSpring({
    number: currentForecast.precipProbability * 100,
    config: { duration: 500, easing: easings.easeQuadInOut }
  });
  const windSpeed = useSpring({
    number: currentForecast.windSpeed,
    config: { duration: 500, easing: easings.easeQuadInOut }
  });

  return (
    <div className="right-info">
      <div className="right-info__data">
        <WiHumidity className="icon" />
        <div className="data-container">
          <div className="data-container__header">Humidity</div>
          <div className="data-container__value">
            <animated.span>
              {humidity.number.interpolate(val => Math.floor(val))}
            </animated.span>{' '}
            %
          </div>
        </div>
      </div>
      <div className="right-info__data">
        <WiBarometer className="icon" />
        <div className="data-container">
          <div className="data-container__header">Air Pressure</div>
          <div className="data-container__value">
            <animated.span>
              {pressure.number.interpolate(val => Math.floor(val))}
            </animated.span>{' '}
            hPa
          </div>
        </div>
      </div>
      <div className="right-info__data">
        <WiRain className="icon" />
        <div className="data-container">
          <div className="data-container__header">Chance of Rain</div>
          <div className="data-container__value">
            <animated.span>
              {rainChance.number.interpolate(val => Math.floor(val))}
            </animated.span>{' '}
            %
          </div>
        </div>
      </div>
      <div className="right-info__data">
        <WiStrongWind className="icon" />
        <div className="data-container">
          <div className="data-container__header">Wind Speed</div>
          <div className="data-container__value">
            <animated.span>
              {windSpeed.number.interpolate(val => val.toFixed(2))}
            </animated.span>{' '}
            m/h
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightInfo;
