import React from "react";
import "../Styles/Dashboard.css";
import {useNavigate} from "react-router-dom";
import {logout} from "../services/authService";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            logout();
            navigate("/login");
        }
    };
    const goToProfile = () => {
        navigate("/profile");
    };


    return (
        <div className="dashboard-content">
            <h2>Welcome to your Dashboard!</h2>
            <p>This is where your main content will go.</p>
        </div>
    );
};

export default Dashboard;
