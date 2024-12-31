import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../services/authService";

const ProtectedPage = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the token is expired
        if (isTokenExpired()) {
            alert("Session expired. Please log in again.");
            localStorage.removeItem("token"); // Clear the token
            navigate("/login"); // Redirect to login page
        }
    }, [navigate]);

    return <>{children}</>; // Render the protected content if the token is valid
};

export default ProtectedPage;
