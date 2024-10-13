import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './pages/homeScreen';
import FormScreen from './pages/formScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/formScreen" element={<FormScreen />} />
      </Routes>
    </Router>
  );
}

export default App;