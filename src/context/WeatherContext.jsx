import React, { createContext, useContext, useState } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [provinces, setProvinces] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(''); // endpoint: [CODPROV]
    const [municipalities, setMunicipalities] = useState(null)
    const [selectedMunicip, setSelectedMunicip] = useState('') // endpoint: [ID] primeros cinco dígitos del campo CODIGOINE
    const [weatherInfo, setWeatherInfo] = useState(null);

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
                weatherInfo,
                setWeatherInfo,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeatherContext = () => {
    return useContext(WeatherContext);
};
