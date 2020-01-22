import React, { useState } from 'react';
import LeftInfo from './components/LeftInfo/LeftInfo';
import RightInfo from './components/RightInfo/RightInfo';
import BottomInfo from './components/BottomInfo/BottomInfo';

import './App.scss';

const App = () => {
  const [data, setData] = useState();
  const [celsius, setCelsius] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [currentForecast, setCurrentForecast] = useState();

  return (
    <div className="container">
      <div className="container__top">
        <LeftInfo
          currentForecast={currentForecast}
          setCurrentForecast={setCurrentForecast}
          setData={setData}
          setCelsius={setCelsius}
          celsius={celsius}
        />

        {currentForecast && <RightInfo currentForecast={currentForecast} />}
      </div>
      {data && (
        <BottomInfo
          data={data.hourly.data}
          celsius={celsius}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          setCurrentForecast={setCurrentForecast}
        />
      )}
      ()
    </div>
  );
};

export default App;
