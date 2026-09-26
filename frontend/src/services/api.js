import axios from 'axios';

// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to add auth token
api.interceptors.request.use((config) => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    const user = JSON.parse(userStr);
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return config;
}, (error) => Promise.reject(error));


export const disasterAPI = {
  // Incidents
  getIncidents: () => api.get('/incidents'),
  getIncidentById: (id) => api.get(`/incidents/${id}`),
  createIncident: (data) => api.post('/incidents', data),
  updateIncident: (id, data) => api.put(`/incidents/${id}`, data),
  
  // Resources / Units
  getUnits: () => api.get('/units'),
  assignUnit: (incidentId, unitId) => api.post(`/incidents/${incidentId}/assign`, { unitId }),
  
  // Alerts
  createAlert: (data) => api.post('/alerts', data),
  getPublicAlerts: () => api.get('/alerts/public'),
  
  // Reports
  getAnalytics: () => api.get('/analytics/summary'),
};

export default api;
