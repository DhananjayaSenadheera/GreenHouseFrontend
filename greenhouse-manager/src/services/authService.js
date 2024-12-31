import axios from "axios";
import {jwtDecode} from "jwt-decode";

// Base URL for the authentication service
const API_URL = "http://localhost:5039/api/auth"; // Replace with your backend URL

// Register a new user
export const register = async (email, password, role) => {
    console.log(API_URL);
    try {
        const response = await axios.post(`${API_URL}/Register`, {
            email,
            password,
            role,
        });
        return response.data; // Return response data (e.g., success message)
    } catch (error) {
        console.error("Error registering user:", error);
        throw error; // Re-throw error to handle in the calling function
    }
};

// Login a user and get the token
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password,
        });
        const { token } = response.data;

        // Store token in localStorage for future requests
        localStorage.setItem("token", token);
        return token; // Return the token
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

// Fetch user profile
export const getProfile = async () => {
    try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        const response = await axios.get(`${API_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`, // Attach token in the Authorization header
            },
        });
        return response.data; // Return profile data
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
};

// Logout (Clear token from localStorage)
export const logout = () => {
    localStorage.removeItem("token");
};

// Check if the token is expired
export const isTokenExpired = () => {
    const token = localStorage.getItem("token");
    if (!token) return true; // If no token, consider it expired

    try {
        const { exp } = jwtDecode(token); // Decode the token to get the exp field
        const currentTime = Date.now() / 1000; // Current time in seconds
        return exp < currentTime; // Return true if expired
    } catch (error) {
        console.error("Error decoding token:", error);
        return true; // If decoding fails, consider the token expired
    }
};

