import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage';
import WeatherInfoPage from './pages/WeatherInfoPage/WeatherInfo';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/weather" element={<WeatherInfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
