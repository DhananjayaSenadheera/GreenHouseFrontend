import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
    return (
        <div className="dashboard">
            {/* Left Navigation */}
            <div className="dashboard-left-nav">
                <ul className="nav-list">
                    <li className="nav-item">Home</li>
                    <li className="nav-item">Profile</li>
                    <li className="nav-item">Settings</li>
                    <li className="nav-item">Logout</li>
                </ul>
            </div>

            {/* Top Navigation */}
            <div className="dashboard-top-nav">
                <h1 className="dashboard-title">Dashboard</h1>
                <div className="profile-section">
                    <span className="profile-icon">👤</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="dashboard-content">
                <h2>Welcome to your Dashboard!</h2>
                <p>This is where your main content will go.</p>
            </div>
        </div>
    );
};

export default Dashboard;
