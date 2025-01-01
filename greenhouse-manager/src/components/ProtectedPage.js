import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../services/authService";

const ProtectedPage = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token") || isTokenExpired()) {
            navigate("/login");
        }
    }, [navigate]);

    return <>{children}</>; // Render protected content
};

export default ProtectedPage;
