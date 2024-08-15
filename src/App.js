import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddDoctor from './components/AddDoctor';
import AddConsultation from './components/AddConsultation';
import './styles/App.css';
import ConsultationsList from './components/ConsultationsList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AddDoctor />} />
          <Route path="/consultation" element={<AddConsultation />} />
          <Route path="/consultation-list" element={<ConsultationsList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
