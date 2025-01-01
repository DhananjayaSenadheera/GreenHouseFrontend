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
            <div className="dashboard-welcome">
                <h2>Welcome, John Henderson!</h2>
            </div>
            {/* Main content */}
            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>Registered Users</h3>
                    <p>83</p>
                </div>
                <div className="stat-card">
                    <h3>Daily Visitors</h3>
                    <p>135</p>
                </div>
                <div className="stat-card">
                    <h3>New Messages</h3>
                    <p>23</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
