import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import "../Styles/Layout.css";

const Layout = ({ children, title }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const goToPage = (path) => {
        navigate(path);
    };

    return (
        <div className="layout">
            {/* Left Navigation */}
            <div className="left-nav">
                <ul className="nav-list">
                    <li className="nav-item" onClick={() => goToPage("/dashboard")}>
                        Dashboard
                    </li>
                    <li className="nav-item" onClick={() => goToPage("/profile")}>
                        Profile
                    </li>
                    <li className="nav-item">Settings</li>
                    <li className="nav-item" onClick={handleLogout}>
                        Logout
                    </li>
                </ul>
            </div>

            {/* Top Navigation */}
            <div className="top-nav">
                <h1 className="top-nav-title">{title}</h1> {/* Dynamic Title */}
                <div className="profile-section">
          <span className="profile-icon" onClick={() => goToPage("/profile")}>👤</span>
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="content">{children}</div>
        </div>
    );
};

export default Layout;
