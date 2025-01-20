import React from 'react';
import despejadoIcon from '../../../images/icons/despejado.png';
import cubiertoIcon from '../../../images/icons/cubierto.png';
import lluviaIcon from '../../../images/icons/lluvia.png';
import tormentaIcon from '../../../images/icons/tormenta.png';
import nieblaIcon from '../../../images/icons/niebla.png';
import nieveIcon from '../../../images/icons/nieve.png';
import defaultIcon from '../../../images/icons/default.png';
import '../../../styles/weather.css';

const WeatherIcon = ({ stateSky }) => {

    const icons = {
        11: despejadoIcon,   // Despejado
        12: despejadoIcon,   // Poco nuboso
        13: cubiertoIcon,    // Nuboso
        14: cubiertoIcon,    // Muy nuboso
        15: cubiertoIcon,    // Cubierto
        16: cubiertoIcon,    // Nubes altas
        17: cubiertoIcon,    // Intervalos nubosos
        18: lluviaIcon,      // Chubascos
        19: tormentaIcon,    // Tormenta
        20: nieblaIcon,      // Niebla
        21: nieveIcon,       // Nieve   
        22: lluviaIcon,      // Lluvia
        23: lluviaIcon,      // Llovizna
        24: lluviaIcon,      // Granizo
        25: nieblaIcon,      // Calima
        26: lluviaIcon,     // Cubierto con lluvia
        44: lluviaIcon,     // Nuboso con lluvia escasa
        46: lluviaIcon     // Cubierto con lluvia escasa
    };

    const imagen = icons[stateSky] || defaultIcon;

    return (
        <img src={imagen} alt={imagen} className='icon' />
    );
};

export default WeatherIcon;