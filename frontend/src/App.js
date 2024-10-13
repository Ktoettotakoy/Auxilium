import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './pages/homeScreen';
import FormScreen from './pages/formScreen';
import SmallClaims from './pages/smallClaims';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/formScreen" element={<FormScreen />} />
        <Route path="/smallClaims" element={<SmallClaims />} />
      </Routes>
    </Router>
  );
}

export default App;