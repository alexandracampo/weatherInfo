import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import LandingPage from './LandingPage'
import { WeatherProvider } from '../../context/WeatherContext'


vi.mock('lottie-react', () => ({
    __esModule: true,
    default: () => <div data-testid="lottie-mock" />,
}))

// Mocks FUNCIONES de servicios, contexto y react
const mockGetDataMunicipality = vi.fn()
const mockGetMunicipalityWeather = vi.fn()
const mockSetSelectedProvince = vi.fn()
const mockSetSelectedMunicip = vi.fn()
const mockSetIsLoadingWeather = vi.fn()
const mockNavigate = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal()
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    }
})

vi.mock('../../services/useWeatherData', () => ({
    useWeatherData: () => ({
        getDataMunicipality: mockGetDataMunicipality,
        getMunicipalityWeather: mockGetMunicipalityWeather,
    })

}))

vi.mock('../../context/WeatherContext', () => ({
    useWeatherContext: () => ({
        selectedProvince: '',
        setSelectedProvince: mockSetSelectedProvince,
        municipalities: [],
        selectedMunicip: {},
        setSelectedMunicip: mockSetSelectedMunicip,
        isLoading: false,
        isLoadingWeather: false,
        setIsLoadingWeather: mockSetIsLoadingWeather,
    }),
}))

test('Debería renderizar el container principal del componente', () => {
    render(<LandingPage />)

    expect(screen.getByRole('main')).toBeInTheDocument();
})



//Que se seleccione una provincia y se haga llamada a la api propia para obtener los municipios

//Que al hacer la llamada a la api propia y quede pending, renderice el loading en el select

//Que renderice el loading cuando tenga que quedarse pending la llamada a la api aemet

// Que navegue a la página del clima cuando se haga la llamada a la api de aemet y esta se resuelva correctamente

