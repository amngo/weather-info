import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import ForecastCard from '../ForecastCard/ForecastCard';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import './BottomInfo.scss';

const BottomInfo = ({
  data,
  celsius,
  selectedId,
  setSelectedId,
  setCurrentForecast
}) => {
  const [page, setPage] = useState(0);
  const [portion, setPortion] = useState([]);
  const transitions = useTransition(portion, item => item.time, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { display: 'none' }
  });

  useEffect(() => {
    if (data) {
      const dataPortion = data.slice(page, page + 6);
      setPortion(dataPortion);
    }
  }, [data, page]);

  return (
    data && (
      <div className="bottom-info">
        <div className="bottom-info__slider">
          <Slider min={0} max={42} onChange={val => setPage(val)} />
        </div>
        <div className="bottom-info__forecasts">
          {transitions.map(({ item, props, key }) => {
            return (
              <animated.div key={key} style={props}>
                <ForecastCard
                  forecast={item}
                  celsius={celsius}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  setCurrentForecast={setCurrentForecast}
                />
              </animated.div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default BottomInfo;
