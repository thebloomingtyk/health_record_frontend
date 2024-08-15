import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [roomChoices, setRoomChoices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomChoices = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/room-choices/');
        setRoomChoices(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRoomChoices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        room_number: room,
        doctor_name: name
      };
      const response = await axios.post('http://127.0.0.1:8000/api/rooms/', data);
      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/consultation'); // Redirect to /consultation page
        }, 2000); // 2 seconds delay
      } else {
        setError('Failed to add doctor. Please try again.');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data); 
      } else {
        setError('Failed to add doctor. Please try again.');
      }
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Doctor and Room</h2>
      {error && <p className="error">{JSON.stringify(error)}</p>}
      {success && <p className="success">Doctor added successfully! Redirecting...</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Doctor Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Room Number:
          <select value={room} onChange={(e) => setRoom(e.target.value)} required>
            <option value="">Select Room</option>
            {roomChoices.map((roomChoice) => (
              <option key={roomChoice.value} value={roomChoice.value}>
                {roomChoice.label}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Doctor</button>
      </form>
    </div>
  );
};

export default AddDoctor;
