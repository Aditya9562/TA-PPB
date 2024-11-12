// hotelservice.js - Update API and rename function

import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng',
  params: {
    longitude: '109.19553',
    latitude: '12.235588',
    lunit: 'km',
    currency: 'USD',
    lang: 'en_US'
  },
  headers: {
    'X-RapidAPI-Key': 'cb78fd55c7mshe5cb23870748621p190809jsn672c4a237919',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  }
};

export const fetchAttractions = async () => {
  try {
    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    console.error('API Error Details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });
    throw error;
  }
};
