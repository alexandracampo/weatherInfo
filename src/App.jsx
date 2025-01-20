import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage';
import WeatherInfoPage from './pages/WeatherInfoPage/WeatherInfo';
import Header from './components/Header';


function App() {

  return (
    <Router>
      <Routes>
        <React.Fragment>
          <Route path="/" element={<LandingPage />} />
          <Route path="/weather" element={<WeatherInfoPage />} />
        </React.Fragment>
      </Routes>
    </Router>
  );
}

export default App;
