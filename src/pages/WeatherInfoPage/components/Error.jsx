import React from 'react';
import '../../../styles/weather.css';

const Error = () => {
    return (
        <div className='error'>
            <p >Error al consultar los datos, inicia de nuevo la búsqueda.</p>
        </div>
    );
};

export default Error;