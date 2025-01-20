import { useWeatherContext } from "../context/WeatherContext";

export const useWeatherData = () => {
    const { setProvinces, setMunicipalities, setWeatherData } = useWeatherContext();

    const getProvinces = async () => {
        try {
            const response = await fetch("https://www.el-tiempo.net/api/json/v2/provincias");
            const provincesList = await response.json();
            setProvinces(provincesList?.provincias.map(province => ({
                provinceCode: province?.CODPROV,
                provinceName: province?.NOMBRE_PROVINCIA,
            })));
        } catch (error) {
            console.error("Error fetching provinces:", error);
        }
    };

    const getMunicipalities = async (provinceCode) => {
        if (!provinceCode) {
            setMunicipalities([]);
            return;
        }

        try {
            const response = await fetch(`https://www.el-tiempo.net/api/json/v2/provincias/${provinceCode}/municipios`);
            const municipalitiesList = await response.json();
            setMunicipalities(municipalitiesList?.municipios?.map(municipality => ({
                municipalityName: municipality?.NOMBRE,
                id: municipality?.CODIGOINE.slice(0, 5)
            })));
        } catch (error) {
            console.error("Error fetching municipios:", error);
        }
    };

    const getMunicipalityWeather = async (provinceCode, municipalityId) => {
        try {
            const response = await fetch(`https://www.el-tiempo.net/api/json/v2/provincias/${provinceCode}/municipios/${municipalityId}`);
            const municipalityWeather = await response.json();

            // Extraer los datos necesarios
            const { stateSky, temperatura_actual, temperaturas, humedad, proximos_dias } = municipalityWeather;

            // Crear un objeto con los datos relevantes
            const dataWeather = { stateSky, temperatura_actual, temperaturas, humedad, proximos_dias };

            setWeatherData(dataWeather);

        } catch (error) {
            console.error("Error fetching weather:", error);
        }
    };

    return { getProvinces, getMunicipalities, getMunicipalityWeather };
};

