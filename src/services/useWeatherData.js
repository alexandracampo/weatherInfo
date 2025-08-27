import { useWeatherContext } from "../context/WeatherContext";

export const useWeatherData = () => {
    const { setMunicipalities, setWeatherData, } = useWeatherContext();

    const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGV4YW5kcmFjYW1wbzg2QGdtYWlsLmNvbSIsImp0aSI6ImNhYWMwZGI4LTJjZTQtNGEyYS04ZTBjLTU1ZDhkMTJhZjBjOSIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNzU2Mjg2ODQwLCJ1c2VySWQiOiJjYWFjMGRiOC0yY2U0LTRhMmEtOGUwYy01NWQ4ZDEyYWYwYzkiLCJyb2xlIjoiIn0.qX9CivQGUOelXj7N5GAyzMnzOmNab18EnRgFBvUhuGw"

    // const getProvinces = async () => {
    // try {
    //     const response = await fetch("https://www.el-tiempo.net/api/json/v2/provincias");
    //     const provincesList = await response.json();
    //     console.log({ provincesList })
    //     setProvinces(provincesList?.provincias.map(province => ({
    //         provinceCode: province?.CODPROV,
    //         provinceName: province?.NOMBRE_PROVINCIA,
    //     })));
    // } catch (error) {
    //     console.error("Error fetching provinces:", error);
    // }
    // };

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

    return { getMunicipalities, getMunicipalityWeather };
};

