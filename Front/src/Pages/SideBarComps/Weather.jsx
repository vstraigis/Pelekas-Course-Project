import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import "../css/Weather.css"

const Weather = () => {
  const [selectedLake, setSelectedLake] = useState(null);
  const [weather, setWeather] = useState(null);

  const loadLakes = async (inputValue) => {
    if (!inputValue || inputValue.length < 2) {
      return [];
    }

    const response = await fetch(`http://193.219.91.103:5915/lakedata?search=${inputValue}`);
    const data = await response.json();
    const lakesOptions = data.map((lake) => ({
      value: lake,
      label: lake.name,
    }));

    return lakesOptions;
  };

  const getWeather = async (x, y) => {
    const response = await fetch(`http://193.219.91.103:5915/api/weather/${x}/${y}`, {
      headers: { token: localStorage.token },
    });
    const weatherData = await response.json();
    setWeather(weatherData);
  };

  const renderForecast = () => {
    if (!weather) return null;

    const dailyData = weather.list.filter((reading) =>
      reading.dt_txt.includes('18:00:00')
    );

    const forecastElements = dailyData.slice(0, 5).map((day, index) => {
      const temperature = day.main.temp;
      const cloudCover = day.clouds.all;
      const windSpeed = day.wind.speed;
      const isGoodFishingTime = temperature > 15 && cloudCover > 30 && windSpeed >= 2 && windSpeed <= 15;

      return (
        <div key={index} className="weather-rectangle">
          <h4>{new Date(day.dt_txt).toLocaleDateString()}</h4>
          <p>Weather: {day.weather[0].description}</p>
          <p>Temperature: {temperature}°C</p>
          <p>Cloud Cover: {cloudCover}%</p>
          <p>Wind Speed: {windSpeed} km/h</p>
          {isGoodFishingTime ? <p>Puikus laikas žvejybai!</p> : <p>Netinkamas metas žvejybai</p>}
        </div>
      );
    });

    return (
      <div className="forecast">
        {forecastElements.map((element) => (
          <div key={element.key}>{element}</div>
        ))}
      </div>
    );
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedLake(selectedOption.value);
    getWeather(selectedOption.value.x, selectedOption.value.y);
  };

  return (
    <div className='weatherContent'>
      <h1> Pasirinkite norimą ežerą </h1>
      <AsyncSelect
        loadOptions={loadLakes}
        onChange={handleSelectChange}
        isSearchable={true}
        placeholder="Search for a lake..."
        className='weatherSelect'
      />
      {selectedLake && weather && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <h3>{selectedLake.name}</h3>
          {renderForecast()}
        </div>
      )}
    </div>
  );
};

export default Weather;
