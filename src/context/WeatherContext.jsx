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
    const [weatherDataNow, setWeatherDataNow] = useState({});
    const [weatherDataDay1, setWeatherDataDay1] = useState({});
    const [weatherDataDay2, setWeatherDataDay2] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingWeather, setIsLoadingWeather] = useState(false);
    const [errorGettingWeather, setErrorGettingWeather] = useState(false);

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
                weatherDataNow,
                setWeatherDataNow,
                isLoading,
                setIsLoading,
                isLoadingWeather,
                setIsLoadingWeather,
                weatherDataDay1,
                setWeatherDataDay1,
                weatherDataDay2,
                setWeatherDataDay2,
                errorGettingWeather,
                setErrorGettingWeather
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeatherContext = () => {
    return useContext(WeatherContext);
};
