import { useEffect } from "react";
import { useWeatherContext } from "../context/WeatherContext";

export const useWeatherData = () => {
    const { setMunicipalities, setWeatherData } = useWeatherContext();
    const AEMET_API_KEY = import.meta.env.VITE_AEMET_API_KEY;

    // Obtener listado de municipios (almacenados en bbdd en MongoDB) mediante código de provincia
    const getDataMunicipality = async (codProv) => {
        fetch(`https://weather-backend-dlk4.onrender.com/municipios/${codProv}`)
            .then(res => res.json())
            .then(data => {
                const cleanMunicipalities = data.map(municip => ({
                    id: municip.CMUN,
                    municipalityName: municip.NOMBRE
                }));
                setMunicipalities(cleanMunicipalities);
            })
            .catch(err => console.error(err));
    }

    // const getMunicipalityWeather = async (codigoMunicipio) => {
    //     try {
    //         const response = await fetch(`https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/horaria/${codigoMunicipio}`);
    //         const municipalityWeather = await response.json();

    //         // Extraer los datos necesarios
    //         const { stateSky, temperatura_actual, temperaturas, humedad, proximos_dias } = municipalityWeather;

    //         // Crear un objeto con los datos relevantes
    //         const dataWeather = { stateSky, temperatura_actual, temperaturas, humedad, proximos_dias };

    //         setWeatherData(dataWeather);

    //     } catch (error) {
    //         console.error("Error fetching weather:", error);
    //     }
    // };

    // Obtener el tiempo actual por municipios de la api de aemet
    const getMunicipalityWeather = async (ineCode) => {
        try {
            // Primera llamada → devuelve JSON con URL "datos"
            const res = await fetch(
                `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/horaria/${ineCode}?api_key=${AEMET_API_KEY}`
            );

            const metaData = await res.json();

            if (!metaData.datos) {
                throw new Error("No se pudo obtener la URL de datos de AEMET");
            }

            // Segunda llamada → puede ser JSON o XML
            const dataRes = await fetch(metaData.datos);
            const rawData = await dataRes.text();

            let prediction;
            try {
                prediction = JSON.parse(rawData); // si es JSON válido
            } catch {
                prediction = rawData; // si es XML
            }

            // Así accedemos a los datos del día de hoy:
            const currentHour = new Date().getHours();
            console.log(currentHour)
            const dataWeather = prediction[0].prediccion.dia[0]
            setWeatherData(dataWeather)

            return prediction;
        } catch (error) {
            console.error("Error obteniendo la predicción horaria:", error);
            return null;
        }
    };


    return { getMunicipalityWeather, getDataMunicipality };
};

