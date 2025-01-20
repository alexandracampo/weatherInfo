import React, { createContext, useContext, useState } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [provinces, setProvinces] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(''); // endpoint: [CODPROV]
    const [municipalities, setMunicipalities] = useState(null)
    const [selectedMunicip, setSelectedMunicip] = useState({ // endpoint: [ID] primeros cinco dígitos del campo CODIGOINE
        id: '',
        name: ''
    });
    const [weatherData, setWeatherData] = useState({});

    return (
        <WeatherContext.Provider
            value={{
                provinces,
                setProvinces,
                selectedProvince,
                setSelectedProvince,
                municipalities,
                setMunicipalities,
                selectedMunicip,
                setSelectedMunicip,
                weatherData,
                setWeatherData,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeatherContext = () => {
    return useContext(WeatherContext);
};
