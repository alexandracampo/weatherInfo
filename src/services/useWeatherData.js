import { useEffect } from "react";
import { useWeatherContext } from "../context/WeatherContext";

export const useWeatherData = () => {
    const { setMunicipalities, setWeatherData, setIsLoading } = useWeatherContext();
    const AEMET_API_KEY = import.meta.env.VITE_AEMET_API_KEY;

    // Obtener listado de municipios (almacenados en bbdd en MongoDB) mediante código de provincia:
    const getDataMunicipality = async (codProv) => {
        try {
            setIsLoading(true)
            const res = await fetch(`https://weather-backend-dlk4.onrender.com/municipios/${codProv}`)
            const data = await res.json();
            const cleanMunicipalities = data.map(municip => ({
                id: municip.CMUN,
                municipalityName: municip.NOMBRE
            }));
            setMunicipalities(cleanMunicipalities);
        } catch (err) {
            console.error("Error obteniendo municipios:", err);
        } finally {
            setIsLoading(false);
        }
    }
    // Obtener el tiempo actual por municipios de la api de la AEMET:
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

            const dataWeather = prediction[0].prediccion.dia[0]
            setWeatherData(dataWeather)
        } catch (error) {
            console.error("Error obteniendo la predicción horaria:", error);
            return null;
        }
    };


    return { getMunicipalityWeather, getDataMunicipality };
};

