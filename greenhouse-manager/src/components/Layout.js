import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import "../Styles/Layout.css";
import {FaSignOutAlt} from "react-icons/fa";

const Layout = ({ children, title }) => {
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const handleLogoutConfirm = () => {
        setShowPopup(false);
        logout()
        navigate("/login");
    };
    const handleLogoutCancel = () => {
        setShowPopup(false); // Close popup without action
    };
    
    const goToPage = (path) => {
        navigate(path);
        setDropdownVisible(false);
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
                    <li className="nav-item" onClick={() => goToPage("/settings")}>
                        Settings
                    </li>
                    
                </ul>
            </div>

            {/* Top Navigation */}
            <div className="top-nav">
                <h1 className="top-nav-title">{title}</h1>
                <div className="profile-section">
          <span
              className="profile-icon"
              onClick={() => setDropdownVisible(!dropdownVisible)}
          >
            👤
          </span>
                    {dropdownVisible && (
                        <div className="dropdown-menu">
                            <div className="dropdown-item" onClick={() => goToPage("/profile")}>
                                Edit Profile
                            </div>
                            {/*<div className="dropdown-item" onClick={() => goToPage("/settings")}>*/}
                            {/*    Settings*/}
                            {/*</div>*/}
                        </div>
                    )}
                    {/* Logout Button */}
                    <button className="logout-button" onClick={() => setShowPopup(true)}>
                        Log Out <FaSignOutAlt className="logout-icon" />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="content">{children}
                {/* Logout Confirmation Popup */}
                {showPopup && (
                    <div className="popup-overlay">
                        <div className="popup">
                            <h2>Confirm Logout</h2>
                            <p>Are you sure you want to log out?</p>
                            <div className="popup-actions">
                                <button className="popup-button yes" onClick={handleLogoutConfirm}>
                                    Yes
                                </button>
                                <button className="popup-button no" onClick={handleLogoutCancel}>
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Layout;
