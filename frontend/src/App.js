import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './pages/homeScreen';
import FormSETNAMEScreen from './pages/formSETNAMEScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/formSETNAMEScreen" element={<FormSETNAMEScreen />} />
      </Routes>
    </Router>
  );
}

export default App;