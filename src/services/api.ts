// api.ts
import axios from 'axios';

// === API Base URL ===
const API_URL = 'https://dririd.nxtremeprojectnew.com/api';

// === Types ===
export interface User {
  id: number;
  name: string;
  phone: string;
  email?: string;
  // Extend if more fields are needed
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ErrorResponse {
  message: string;
  [key: string]: any;
}

// === Register User ===
export const registerUser = async (userData: any): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/register`, userData);
    const { token, user } = response.data;

    localStorage.setItem('authToken', `Bearer ${token}`);
    localStorage.setItem('user_id', user.id.toString());

    window.location.href = `/car/register/${user.id}`;
    return response.data;
  } catch (error: any) {
    throw (error.response?.data as ErrorResponse) || { message: 'Registration failed' };
  }
};

// === Authenticated Axios Instance ===
export const authAxios = axios.create({
  baseURL: API_URL,
});

authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers = config.headers || {}; // ✅ Prevent headers undefined error
    config.headers.Authorization = token;
  }
  return config;
});

// === Register Car or Motor ===
export const registerCarMotor = async (vehicleData: any, authToken: string): Promise<any> => {
  try {
    const response = await axios.post<any>(`${API_URL}/register/carmotor`, vehicleData, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("API Response Error:", error.response?.data);
    throw (error.response?.data as ErrorResponse) || { message: 'Registration failed' };
  }
};

// === Login User ===
export const loginUser = async (
  credentials: { phone: string; password: string; app_type: string }
): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/login`, credentials);
    const { token, user } = response.data;

    localStorage.setItem("authToken", `Bearer ${token}`);
    localStorage.setItem("user_id", user.id.toString());

    return response.data;
  } catch (error: any) {
    throw (error.response?.data as ErrorResponse) || { message: "Login failed" };
  }
};

// === Fetch Logged-in User's Data ===
export const userData = async (authToken: string): Promise<User> => {
  try {
    const userId = localStorage.getItem("user_id");
    const response = await axios.get<User>(`${API_URL}/user/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("API Response Error:", error.response?.data);
    throw (error.response?.data as ErrorResponse) || { message: "Fetching user data failed" };
  }
};

// === Logout User ===
export const logoutUser = async (): Promise<void> => {
  try {
    const token = localStorage.getItem("authToken");

    await axios.post(`${API_URL}/logout`, {}, {
      headers: {
        Authorization: token,
      },
    });

    localStorage.removeItem("authToken");
    localStorage.removeItem("user_id");
  } catch (error) {
    console.error("Logout failed", error);
  }
};
