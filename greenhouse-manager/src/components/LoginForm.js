import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "../FormStyles.css"; // Use the updated CSS file

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await login(email, password);
            alert("Login successful!");
            console.log("Token:", token);
            navigate("/profile"); // Redirect to the profile page
        } catch (err) {
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="form-page">
            <div className="form-container">
                <h2 className="form-title">Login</h2>
                <p className="form-subtitle">Welcome Back</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="form-error">{error}</p>} {/* Display error */}
                    <div className="form-group">
                        <label>
                            <input type="checkbox" className="form-checkbox" /> I Accept the{" "}
                            <a href="#" className="form-link">
                                Terms
                            </a>
                        </label>
                    </div>
                    <button type="submit" className="form-button">
                        Login
                    </button>
                </form>
                <p className="form-footer">
                    Don't have an account? <a href="/register" className="form-link">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
