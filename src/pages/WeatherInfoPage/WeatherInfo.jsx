import React from 'react';
import { useWeatherContext } from '../../context/WeatherContext';

function WeatherInfo() {

  return (
    <>
      <header></header>
      <section className="card">
        <article className="card-item">Dato 1</article>
        <article className="card-item">Dato 2</article>
        <article className="card-item">Dato 3</article>
        <article className="card-item">Dato 4</article>
        <article className="card-item">Dato 5</article>
        <article className="card-item">Dato 6</article>
      </section>
    </>
  );
}

export default WeatherInfo;
