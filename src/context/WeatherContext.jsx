import React, { createContext, useContext, useState } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [provinces, setProvinces] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [municipalities, setMunicipalities] = useState([])
    const [selectedMunicip, setSelectedMunicip] = useState({ // endpoint: [ID] primeros cinco dígitos del campo CODIGOINE
        id: '',
        name: ''
    });
    const [weatherData, setWeatherData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingWeather, setIsLoadingWeather] = useState(false);

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
                isLoading,
                setIsLoading,
                isLoadingWeather,
                setIsLoadingWeather
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeatherContext = () => {
    return useContext(WeatherContext);
};
