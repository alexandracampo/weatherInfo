import React, { useState, useEffect } from 'react';
import '../../styles/weather.css';
import { useWeatherContext } from '../../context/WeatherContext';
import WeatherIcon from './components/WeatherIcon.jsx';
import Header from '../../components/Header.jsx';


function WeatherInfo() {
  const { weatherData, selectedMunicip } = useWeatherContext();

  const [estadoCielo, setEstadoCielo] = useState(null);

  useEffect(() => {
    setEstadoCielo(weatherData?.stateSky?.id);
  }, []);

  console.log(weatherData)
  return (
    <div div className="weather-container">
      <Header title2={selectedMunicip?.name} showTitle2></Header>
      <section className="weather-card">

        <article className="card-item">{weatherData?.stateSky?.description}
          <WeatherIcon estadoCielo={estadoCielo} />
        </article>

        <article className="card-item">Temperatura actual
          <h1>{`${weatherData?.temperatura_actual}ºC`}</h1>
        </article>

        <article className="card-item">Humedad
          <h1>{`${weatherData?.humedad}%`}</h1>
        </article>

      </section>
    </div>
  );
}

export default WeatherInfo;
