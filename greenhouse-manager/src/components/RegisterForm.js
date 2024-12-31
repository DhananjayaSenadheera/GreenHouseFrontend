import React, { useState } from "react";
import { register } from "../services/authService";
import "../FormStyles.css"
const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("User");
    const [error, setError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(email, password, role);
            alert("Registration successful!");
            // Redirect to login page or other action
        } catch (err) {
            setError("Error registering user. Please try again.");
        }
    };

    return (
        <div className="form-page">
            <div className="form-container">
                <h2 className="form-title">Sign Up</h2>
                <p className="form-subtitle">Create Your Account</p>
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
                    <div className="form-group">
                        <label>Repeat Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Repeat your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                        Sign Up
                    </button>
                </form>
                <p className="form-footer">
                    Already have an account? <a href="/login" className="form-link">Login</a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
