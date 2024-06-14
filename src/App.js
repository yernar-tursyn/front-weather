import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Start from './pages/Start/Start';
import Welcome from './components/Welcome/Welcome';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/start" element={<Start />} /> 
      </Routes>
    </div>
  );
}

export default App;
