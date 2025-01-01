import React, { useEffect, useState } from "react";
import {getProfile, updateProfile} from "../services/authService";
import "../Styles/ProfilePage.css"

const ProfilePage = () => {
    const [profile, setProfile] = useState({ email: "", role: "" });
    const [error, setError] = useState("");
    const [editable, setEditable] = useState(false);
    const [password, setPassword] = useState(""); 
    

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setProfile(data);
            } catch (err) {
                setError("Error fetching profile. Please login again.");
            }
        };

        fetchProfile();
    }, []);
    const handleSave = async () => {
        try {
            const updatedProfile = {
                UserId: profile.id, 
                NewEmail: profile.email, 
                NewPassword: password,
            };
            const response = await updateProfile(updatedProfile); // Call the update profile function
            alert("Profile updated successfully!");
            setProfile(response); // Update the state with the new profile data
            setEditable(false);
        } catch (err) {
            setError("Error updating profile.");
        }
    };
    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    if (!profile) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-page">
            <h2>Profile</h2>
            <div className="profile-details">
                <label>Email:</label>
                <input
                    type="email"
                    value={profile.email || ""}
                    disabled={!editable}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
                
                <label>New Password:</label>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    disabled={!editable}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>Role:</label>
                <input
                    type="text"
                    value={profile.role || ""} // Default to empty string if profile.role is undefined
                    disabled={true}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                />
                <button onClick={() => setEditable(!editable)}>
                    {editable ? "Cancel" : "Edit"}
                </button>
                {editable && <button onClick={handleSave}>Save</button>}
            </div>
        </div>
    );
};

export default ProfilePage;
