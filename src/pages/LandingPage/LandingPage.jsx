import React, { useEffect } from "react";
import { useWeatherData } from "../../services/useWeatherData";
import { useWeatherContext } from "../../context/WeatherContext";

const LandingPage = () => {
    const { getProvinces, getMunicipalities, getMunicipalityWeather } = useWeatherData();
    const { provinces, selectedProvince, setSelectedProvince,
        municipalities, selectedMunicip, setSelectedMunicip, weatherInfo } = useWeatherContext();

    useEffect(() => {
        getProvinces();
    }, []);

    const handleSelectProvince = (e) => {
        const selectedValue = e.target.value;
        //almacenar el numero de provincia seleccionada
        setSelectedProvince(selectedValue);
        //Llamada a la api con ese codigo, al endpoint de municipios de esa provincia
        getMunicipalities(selectedValue);
    };

    const handleSelectMunicip = (e) => {
        const selectedValue = e.target.value; //id
        setSelectedMunicip(selectedValue)
    }


    const handleSubmit = async () => {
        if (!selectedProvince || !selectedMunicip) {
            return;
        }
        try {
            await getMunicipalityWeather(selectedProvince, selectedMunicip);
            //navega a la siguiente pagina donde se pintan los resultados del tiempo del municipio seleccionado
        } catch (error) {
            console.error("Error en la consulta del clima:", error);
        }
    };


    return (
        <div className="container">

            {/* Selector de provincia */}
            <select className="select-province" value={selectedProvince} onChange={handleSelectProvince} >
                <option value="" disabled>Selecciona un municipio</option>
                {provinces?.map((province, key) => (
                    <option key={province?.provinceCode} value={province?.provinceCode}>
                        {province.provinceName}
                    </option>
                ))}
            </select>


            {/* mostramos el input disabled para buscar municipios si NO hay una provincia seleccionada */}

            <select className="select-municip" value={selectedMunicip} onChange={handleSelectMunicip} disabled={selectedProvince ? false : true}  >
                <option value="" disabled>Selecciona una provincia</option>
                {municipalities?.map((municip, key) => (
                    <option key={key} value={municip?.id}>
                        {municip?.municipalityName}
                    </option>
                ))}
            </select>


            {/* añadimos un boton que estaba habilitado solo cuando haya seleccionado una provincia y un municipio */}
            <button disabled={!selectedProvince || !selectedMunicip} onClick={handleSubmit}>Consultar</button>
        </div>
    );
};

export default LandingPage;

