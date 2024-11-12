
import axios from 'axios';

const BASE_URL = 'https://travel-api2024-default-rtdb.asia-southeast1.firebasedatabase.app';

export const getHotels = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/pesawat.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};