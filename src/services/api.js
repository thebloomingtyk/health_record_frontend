import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const getConsultations = () => axios.get(`${API_BASE_URL}/consultations/`);

export const addConsultation = (consultation) => axios.post(`${API_BASE_URL}/consultations/`, consultation);

export const generateDailySummary = () => axios.get(`${API_BASE_URL}/daily-summary/`, { responseType: 'blob' });
