import { useEffect } from "react";
import { useWeatherData } from "../../services/useWeatherData";
import { useWeatherContext } from "../../context/WeatherContext";
import { useNavigate } from "react-router-dom";
import '../../styles/landing.css';
import Lottie from "lottie-react";
import loadingAnimation from "../../images/Sandy-loading.json";
import { provinces } from "./provinces";

const LandingPage = () => {
    const { getDataMunicipality, getMunicipalityWeather } = useWeatherData();
    const { selectedProvince, setSelectedProvince,
        municipalities, selectedMunicip, setSelectedMunicip, isLoading, isLoadingWeather, setIsLoadingWeather } = useWeatherContext();
    const navigate = useNavigate();

    useEffect(() => {
        //Limpiamos datos para nuevas búsquedas
        setSelectedProvince('')
        setSelectedMunicip({})
    }, []);

    const handleSelectProvince = (e) => {
        setSelectedProvince('')
        setSelectedMunicip({})

        const selectedValue = e.target.value;
        setSelectedProvince(selectedValue);   //almacenar el numero de provincia seleccionada
        getDataMunicipality(selectedValue);  //Llamada a la api con ese codigo, al endpoint de municipios de esa provincia
    };

    const handleSelectMunicip = (e) => {
        const selectedId = e.target.value;
        const selectedMunicipality = municipalities?.find(
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
            setIsLoadingWeather(true)
            const ineCode = selectedProvince + selectedMunicip.id
            await getMunicipalityWeather(ineCode);
            navigate("/weather");
        } catch (error) {
            console.error("Error en la consulta del clima:", error);
        } finally {
            setIsLoadingWeather(false)
        }
    };

    const renderMunicipalityOptions = () => {
        if (isLoading) {
            return <option value="" disabled>Cargando datos...</option>;
        }

        if (!municipalities?.length) {
            return <option value="" disabled>Selecciona un municipio</option>;
        }

        return (
            <>
                <option value="" disabled>Selecciona un municipio</option>
                {municipalities.map((municip, key) => (
                    <option key={key} value={municip.id}>
                        {municip.municipalityName}
                    </option>
                ))}
            </>
        );
    };

    return (
        <>
            <main className="container" >
                <h1 className="app-title">WeatherInfo</h1>
                {/* Selector de provincia */}

                {isLoadingWeather ? (
                    <Lottie
                        animationData={loadingAnimation}
                        loop={true}
                        style={{ width: 150, height: 150 }}
                    />
                )
                    :
                    (
                        <>
                            <select className="select form-item" value={selectedProvince} aria-label="Selecciona una provincia" onChange={handleSelectProvince} >
                                <option value="" disabled>Selecciona una provincia</option>
                                {provinces?.map((province, key) => (
                                    <option key={province?.code} value={province?.code} >
                                        {province.name}
                                    </option>
                                ))}
                            </select>

                            {/* Selector de municipio */}
                            <select className="select form-item" aria-label="Selecciona un municipio" value={selectedMunicip?.id || ''} onChange={handleSelectMunicip} disabled={!selectedProvince}  >
                                {renderMunicipalityOptions()}
                            </select>

                            <button className="button form-item" disabled={!selectedProvince || !selectedMunicip?.id} aria-disabled={!selectedProvince || !selectedMunicip?.id} onClick={handleSubmit}>Consultar</button>
                        </>
                    )}


            </main>
        </>
    );
};

export default LandingPage;

