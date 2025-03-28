import React, { useEffect } from "react";
import { useWeatherData } from "../../services/useWeatherData";
import { useWeatherContext } from "../../context/WeatherContext";
import { useNavigate } from "react-router-dom";
import '../../styles/landing.css';
import Header from "../../components/Header";

const LandingPage = () => {
    const { getProvinces, getMunicipalities, getMunicipalityWeather } = useWeatherData();
    const { provinces, selectedProvince, setSelectedProvince,
        municipalities, selectedMunicip, setSelectedMunicip } = useWeatherContext();
    const navigate = useNavigate();

    useEffect(() => {
        //Limpiamos datos para nuevas búsquedas
        setSelectedProvince('')
        setSelectedMunicip({})

        getProvinces();
    }, []);

    const handleSelectProvince = (e) => {
        const selectedValue = e.target.value;
        setSelectedProvince(selectedValue);   //almacenar el numero de provincia seleccionada
        getMunicipalities(selectedValue);  //Llamada a la api con ese codigo, al endpoint de municipios de esa provincia
    };

    const handleSelectMunicip = (e) => {
        const selectedId = e.target.value;
        const selectedMunicipality = municipalities.find(
            (municip) => municip.id === selectedId
        );
        setSelectedMunicip({
            id: selectedId,
            name: selectedMunicipality ? selectedMunicipality.municipalityName : ''
        });
    };


    const handleSubmit = async () => {
        if (!selectedProvince || !selectedMunicip) {
            return;
        }
        try {
            await getMunicipalityWeather(selectedProvince, selectedMunicip?.id);
            navigate("/weather");
        } catch (error) {
            console.error("Error en la consulta del clima:", error);
        }
    };

    return (
        <>
            <Header />
            <main className="container" >
                {/* Selector de provincia */}
                <select className="select form-item" value={selectedProvince} aria-label="Selecciona una provincia" onChange={handleSelectProvince} >
                    <option value="" disabled>Selecciona un municipio</option>
                    {provinces?.map((province, key) => (
                        <option key={province?.provinceCode} value={province?.provinceCode} >
                            {province.provinceName}
                        </option>
                    ))}
                </select>

                {/* Selector de municipio */}
                <select className="select form-item" aria-label="Selecciona un municipio" value={selectedMunicip?.id || ''} onChange={handleSelectMunicip} disabled={selectedProvince ? false : true}  >
                    <option value="" disabled>Selecciona una provincia</option>
                    {municipalities?.map((municip, key) => (
                        <option key={key} value={municip?.id} >
                            {municip?.municipalityName}
                        </option>
                    ))}
                </select>

                <button className="button form-item" disabled={!selectedProvince || !selectedMunicip?.id} aria-disabled={!selectedProvince || !selectedMunicip?.id} onClick={handleSubmit}>Consultar</button>
            </main>
        </>
    );
};

export default LandingPage;

