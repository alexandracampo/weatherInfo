import '../../styles/weather.css';
import { useWeatherContext } from '../../context/WeatherContext';
import WeatherIcon from './components/WeatherIcon.jsx';
import Header from '../../components/Header.jsx';
import { useNavigate } from "react-router-dom";
import Error from '../WeatherInfoPage/components/Error.jsx';

function WeatherInfo() {
  const { weatherData, selectedMunicip } = useWeatherContext();
  const navigate = useNavigate();

  const someError = !weatherData
  const currentHour = new Date().getHours();

  // Estado cielo:
  const skyData = weatherData.estadoCielo
  const currentHourSkyData = skyData.find(obj => Number(obj.periodo) === currentHour)
  const skyCode = currentHourSkyData.value
  const skyDescription = currentHourSkyData.descripcion

  // Temperatura:
  const temperatureData = weatherData.temperatura
  const currentTemperatureData = temperatureData.find(obj => Number(obj.periodo) === currentHour)
  const temperature = currentTemperatureData.value

  // Humedad:
  const humidityData = weatherData.humedadRelativa
  const currentDataObj = humidityData.find(obj => Number(obj.periodo) === currentHour)
  const humidity = currentDataObj.value

  return (

    <div className="weather-container">
      <Header title2={selectedMunicip?.name} showTitle2 />

      {someError ? <Error /> :

        (<section className="weather-card">
          <article className="card-item">{skyDescription}
            <WeatherIcon stateSky={skyCode} />
          </article>

          <article className="card-item">Temperatura actual
            <h1>{temperature ? `${temperature}ºC` : '-'}</h1>
          </article>

          <article className="card-item">Humedad
            <h1>{humidity ? `${humidity}%` : '-'}</h1>
          </article>

        </section>)}

      <footer className='footer-weatherinfo'>
        <button className='button-weatherinfo' aria-label="Volver a la página principal para hacer una nueva búsqueda" onClick={() => navigate("/")} >Nueva búsqueda</button>
      </footer>
    </div >

  );
}

export default WeatherInfo;
