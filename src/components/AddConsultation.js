import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

const AddConsultation = () => {
  const [rooms, setRooms] = useState([]);
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [treatment, setTreatment] = useState('');
  const [room, setRoom] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/rooms/');
        setRooms(response.data);
      } catch (err) {
        setError('Failed to fetch rooms. Please try again.');
        console.error(err);
      }
    };
    fetchRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedRoom = rooms.find((r) => r.id === parseInt(room));
      await axios.post('http://127.0.0.1:8000/api/consultations/', {
        room: selectedRoom,
        patient_name: patientName,
        patient_age: patientAge,
        recommended_treatment: treatment,
      });
      setPatientName('');
      setPatientAge('');
      setTreatment('');
      setRoom('');
      navigate('/consultation-list');
    } catch (err) {
      if (err.response) {
        setError('Failed to add consultation. Please try again.');
      } else {
        setError('Failed to add consultation. Please try again.');
      }
      console.error(err);
    }
  };

  const generatePDF = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/report/');
      const doc = new jsPDF();
      doc.text(JSON.stringify(response.data, null, 2), 10, 10);
      doc.save('report.pdf');
    } catch (err) {
      setError('Failed to generate report. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Consultation</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Patient Name:
          <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
        </label>
        <label>
          Patient Age:
          <input type="number" value={patientAge} onChange={(e) => setPatientAge(e.target.value)} required />
        </label>
        <label>
          Recommended Treatment:
          <textarea value={treatment} onChange={(e) => setTreatment(e.target.value)} required></textarea>
        </label>
        <label>
          Room:
          <select value={room} onChange={(e) => setRoom(e.target.value)} required>
            <option value="">Select Room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.room_number} - {room.doctor_name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Consultation</button>
      </form>
    </div>
  );
};

export default AddConsultation;
