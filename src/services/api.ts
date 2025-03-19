import axios from 'axios';

//const API_URL = 'http://192.168.43.195:8000/api';
const API_URL = 'http://127.0.0.1:8000/api';



export const registerUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    const token = response.data.token; // Get the token from the response

    // Store the token in localStorage or Vuex/Pinia for later use
    localStorage.setItem('authToken', token);

    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};




const authAxios = axios.create({
  baseURL: API_URL,
  headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
  },
});



export const registerCarMotor = async (vehicleData: any, authToken: string) => {
  try {
    const response = await axios.post(`${API_URL}/register/carmotor`, vehicleData, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("API Response Error:", error.response?.data);
    throw error.response?.data || { message: 'Registration failed' };
  }
};








export const loginUser = async (credentials: { phone: string; password: string }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Login failed' };
    }
  };
  
  

  export const logoutUser = async () => {
    try {
      await axios.post(`${API_URL}/logout`);
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  
  