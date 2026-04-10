import axios from 'axios';

// Change this to your deployed backend URL later
const BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const predictSeverity = async (data) => {
  try {
    console.log("Simulating API Call with data:", data);
    
    // We are now hitting your brand new Python Backend Server!
    const response = await api.post('/predict', data);
    return response.data;
  } catch (error) {
    console.error("API Prediction Error: ", error);
    throw error;
  }
};

export const getGeospatialHotspots = async (lat, lng) => {
  try {
    const response = await api.get(`/hotspots?lat=${lat}&lng=${lng}`);
    return response.data.hotspots;
  } catch (error) {
    console.error("API Hotspot Error: ", error);
    return []; // Return empty array if backend is down
  }
};
