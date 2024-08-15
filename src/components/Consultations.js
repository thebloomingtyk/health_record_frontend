import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

const ConsultationsList = () => {
  const [consultations, setConsultations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/consultations/');
        setConsultations(response.data);
      } catch (err) {
        setError('Failed to fetch consultations. Please try again.');
        console.error(err);
      }
    };
    fetchConsultations();
  }, []);

  return (
    <div className="consultations-list-container">
      <h2>Consultations List</h2>
      {error && <p className="error">{error}</p>}
      <table className="consultations-table">
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Doctor Name</th>
            <th>Patient Name</th>
            <th>Patient Age</th>
            <th>Consultation Time</th>
            <th>Treatment</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((consultation) => (
            <tr key={consultation.id}>
              <td>{consultation.room.room_number}</td>
              <td>{consultation.room.doctor_name}</td>
              <td>{consultation.patient_name}</td>
              <td>{consultation.patient_age}</td>
              <td>{new Date(consultation.consultation_time).toLocaleString()}</td>
              <td>{consultation.recommended_treatment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultationsList;
