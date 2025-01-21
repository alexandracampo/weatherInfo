import React from 'react';
import despejadoIcon from '../../../images/icons/despejado.png';
import cubiertoIcon from '../../../images/icons/cubierto.png';
import lluviaIcon from '../../../images/icons/lluvia.png';
import tormentaIcon from '../../../images/icons/tormenta.png';
import nieblaIcon from '../../../images/icons/niebla.png';
import nieveIcon from '../../../images/icons/nieve.png';
import defaultIcon from '../../../images/icons/default.png';
import solNubes from '../../../images/icons/solNubes.png';
import '../../../styles/weather.css';

const WeatherIcon = ({ stateSky }) => {

    const icons = {
        11: despejadoIcon, // Despejado (día y noche)
        12: solNubes,  // Poco nuboso
        13: cubiertoIcon,  // Nuboso
        14: cubiertoIcon,  // Muy nuboso
        15: cubiertoIcon,  // Cubierto
        16: cubiertoIcon,  // Nubes altas
        17: solNubes,  // Intervalos nubosos
        23: lluviaIcon,    // Llovizna (día y noche)
        24: lluviaIcon,    // Granizo
        25: nieblaIcon,    // Calima
        26: lluviaIcon,    // Cubierto con lluvia
        33: nieveIcon,     // Nieve
        34: nieveIcon,     // Nieve
        35: nieveIcon,     // Nieve
        36: nieveIcon,     // Nieve
        43: lluviaIcon,    // Intervalos nubosos con lluvia escasa
        44: lluviaIcon,    // Nuboso con lluvia escasa
        45: lluviaIcon,    // Nuboso con lluvia
        46: lluviaIcon,    // Cubierto con lluvia escasa
        51: tormentaIcon,  // Tormenta
        52: tormentaIcon,  // Tormenta
        53: tormentaIcon,  // Tormenta
        54: tormentaIcon,  // Tormenta
        61: tormentaIcon,  // Tormenta
        62: tormentaIcon,  // Tormenta
        63: tormentaIcon,  // Tormenta
        64: tormentaIcon,  // Tormenta
        71: nieveIcon,     // Nieve
        72: nieveIcon,     // Nieve
        73: nieveIcon,     // Nieve
        74: nieveIcon,     // Nieve
        81: nieblaIcon,    // Niebla
        82: nieblaIcon     // Niebla
    };

    // Eliminar la letra 'n' al final del código si existe
    const normalizedStateSky = stateSky?.replace('n', '');

    // Buscar el ícono correspondiente o usar el ícono por defecto
    const selectedIcon = icons[normalizedStateSky] || defaultIcon;

    return (
        <img src={selectedIcon} alt={selectedIcon} className='icon' />
    );
};

export default WeatherIcon;