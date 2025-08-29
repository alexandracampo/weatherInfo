import React, { useState, useEffect } from 'react';
import '../../styles/weather.css';
import { useWeatherContext } from '../../context/WeatherContext';
import WeatherIcon from './components/WeatherIcon.jsx';
import Header from '../../components/Header.jsx';
import { useNavigate } from "react-router-dom";
import Error from '../WeatherInfoPage/components/Error.jsx';

function WeatherInfo() {
  const { weatherData, selectedMunicip } = useWeatherContext();
  const [stateSky, setStateSky] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setStateSky(weatherData?.stateSky?.id);
  }, []);


  const someError = !weatherData.temperatura_actual || !weatherData?.humedad

  // console.log(weatherData)
  return (

    <div className="weather-container">
      <Header title2={selectedMunicip?.name} showTitle2 />

      {someError ? <Error /> :

        (<section className="weather-card">
          <article className="card-item">{weatherData?.stateSky?.description}
            <WeatherIcon stateSky={stateSky} />
          </article>

          <article className="card-item">Temperatura actual
            <h1>{weatherData?.temperatura_actual ? `${weatherData.temperatura_actual}ºC` : '-'}</h1>
          </article>

          <article className="card-item">Humedad
            <h1>{weatherData?.humedad ? `${weatherData?.humedad}%` : '-'}</h1>
          </article>

        </section>)}

      <footer className='footer-weatherinfo'>
        <button className='button-weatherinfo' aria-label="Volver a la página principal para hacer una nueva búsqueda" onClick={() => navigate("/")} >Nueva búsqueda</button>
      </footer>
    </div >

  );
}

export default WeatherInfo;
