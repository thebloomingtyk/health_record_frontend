import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './ConsultationList.css';

const ConsultationList = () => {
  const [consultations, setConsultations] = useState([]);
  const [filteredConsultations, setFilteredConsultations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/consultations/');
        setConsultations(response.data);
        setFilteredConsultations(response.data);
      } catch (err) {
        setError('Failed to fetch consultations. Please try again.');
        console.error(err);
      }
    };
    fetchConsultations();
  }, []);

  useEffect(() => {
    const results = consultations.filter(
      consultation =>
        consultation.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultation.room.doctor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultation.room.room_number.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredConsultations(results);
  }, [searchTerm, consultations]);

  const generatePDF = () => {
    const date = new Date().toLocaleDateString();
    const doc = new jsPDF();
    doc.text(`Consultations report - ${date}`, 10, 10);
    const tableData = filteredConsultations.map((consultation, index) => [
      index + 1,
      consultation.room.doctor_name,
      consultation.room.room_number,
      consultation.patient_name,
      consultation.patient_age,
      new Date(consultation.consultation_time).toLocaleTimeString(),
      consultation.recommended_treatment,
    ]);
    doc.autoTable({
      head: [['#', 'Doctor', 'Room', 'Patient', 'Age', 'Time', 'Treatment']],
      body: tableData,
    });
    doc.save('consultations_report.pdf');
  };

  return (
    <div className="consultation-list-container">
      <h2>Consultation List</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Search by patient name, doctor name, or room number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <table className="consultation-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Doctor</th>
            <th>Room</th>
            <th>Patient</th>
            <th>Age</th>
            <th>Time</th>
            <th>Treatment</th>
          </tr>
        </thead>
        <tbody>
          {filteredConsultations.map((consultation, index) => (
            <tr key={consultation.id}>
              <td>{index + 1}</td>
              <td>{consultation.room.doctor_name}</td>
              <td>{consultation.room.room_number}</td>
              <td>{consultation.patient_name}</td>
              <td>{consultation.patient_age}</td>
              <td>{new Date(consultation.consultation_time).toLocaleTimeString()}</td>
              <td>{consultation.recommended_treatment}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={generatePDF} className="generate-report-button">Print Report</button>
    </div>
  );
};

export default ConsultationList;
