import React, { useEffect, useState } from 'react';
import api from '../services/api';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            const response = await api.get('doctors/');
            setDoctors(response.data);
        };
        fetchDoctors();
    }, []);

    return (
        <div>
            <h1>Doctors</h1>
            <ul>
                {doctors.map(doctor => (
                    <li key={doctor.id}>{doctor.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorList;
