import axios from 'axios';

//const API_URL = 'http://192.168.43.195:8000/api';
const API_URL = 'http://127.0.0.1:8000/api';



export const registerUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    const token = response.data.token;
    const userId = response.data.user.id;

    localStorage.setItem('authToken', `Bearer ${token}`);
    localStorage.setItem('user_id', userId);

    // Redirect user to car registration first
    window.location.href = `/car/register/${userId}`;

    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};





export const authAxios = axios.create({
  baseURL: API_URL,
});

// Interceptor to set the Authorization header dynamically
authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // ✅ Ensure "Bearer" prefix is added here
  }
  return config;
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








export const loginUser = async (credentials: { phone: string; password: string; app_type: string }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);

    const token = response.data.token;
    const userId = response.data.user.id; // Get user ID

    localStorage.setItem("authToken", token); // ✅ Store token without "Bearer"
    localStorage.setItem("user_id", userId); // ✅ Store user_id

    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Login failed" };
  }
};







export const userData = async (authToken: string) => {
  try {
    const userId = localStorage.getItem("user_id"); // Get stored user_id
    const response = await axios.get(`${API_URL}/user/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("API Response Error:", error.response?.data);
    throw error.response?.data || { message: "Fetching user data failed" };
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
  
  