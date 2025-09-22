import React from 'react'
import '../../../styles/weather.css';
import { useWeatherContext } from '../../../context/WeatherContext';
import WeatherIcon from './WeatherIcon';


function NextDaysWeather({ weatherInfoData }) {

    const today = new Date();
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowName = days[tomorrow.getDay()];
    const tomorrowNumber = tomorrow.getDate()

    // Si tuviéramos que mostrar info de pasado mañana:
    // const dayAfterTomorrow = new Date();
    // dayAfterTomorrow.setDate(today.getDate() + 2);
    // const dayAfterTomorrowName = days[dayAfterTomorrow.getDay()];
    // const dayAfterTomorrowNumber = dayAfterTomorrow.getDate();

    const tomorrow6 = weatherInfoData?.estadoCielo?.find(obj => obj.periodo === '06');
    const tomorrowSky6 = tomorrow6?.value

    const tomorrow12 = weatherInfoData?.estadoCielo?.find(obj => obj.periodo === '12');
    const tomorrowSky12 = tomorrow12?.value

    const tomorrow18 = weatherInfoData?.estadoCielo?.find(obj => obj.periodo === '18');
    const tomorrowSky18 = tomorrow18?.value

    return (
        <article className="card-item">
            {tomorrowName + ' ' + tomorrowNumber}
            <div className='sub-card'>

                <div className='sub-card-item'>
                    <p > 06:00 hrs </p>
                    <WeatherIcon stateSky={tomorrowSky6} />
                </div>

                <div className='sub-card-item'>
                    <p > 12:00 hrs </p>
                    <WeatherIcon stateSky={tomorrowSky12} />

                </div>

                <div className='sub-card-item'>
                    <p > 18:00 hrs </p>
                    <WeatherIcon stateSky={tomorrowSky18} />

                </div>


            </div>
        </article>
    )
}

export default NextDaysWeather
