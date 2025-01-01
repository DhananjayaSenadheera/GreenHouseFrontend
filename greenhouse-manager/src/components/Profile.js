import React, { useEffect, useState } from "react";
import {getProfile, updateProfile} from "../services/authService";
import "../Styles/ProfilePage.css"

const ProfilePage = () => {
    const [profile, setProfile] = useState({ email: "", role: "" ,fname:"",lname:""});
    const [error, setError] = useState("");
    const [editable, setEditable] = useState(false);
    const [password, setPassword] = useState("");
    const [popup, setPopup] = useState({ visible: false, message: "", details: null });
    

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
                NewFname: profile.fname,
                NewLname: profile.lname,
            };
            const response = await updateProfile(updatedProfile);
             // Update the state with the new profile data
            const updatedData = {
                id: response.id || profile.id,
                email: response.NewEmail || profile.email,
                fname: response.NewFname || profile.fname,
                lname: response.NewLname || profile.lname,
                role: profile.role,
            };
            setProfile(updatedData);
            setPopup({
                visible: true,
                message: "Profile updated successfully!",
                //details: updatedData,
            });
            setEditable(false);
            
        } catch (err) {
            setPopup({
                visible: true,
                message: "Error updating profile.",
                details: null,
            });
        }
    };
    const closePopup = () => {
        setPopup({ ...popup, visible: false });
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
                <label>First Name:</label>
                <input
                    type="text"
                    value={profile.fname || ""}
                    disabled={!editable}
                    onChange={(e) => setProfile({ ...profile, fname: e.target.value })}
                />
                <label>Last Name:</label>
                <input
                    type="text"
                    value={profile.lname || ""}
                    disabled={!editable}
                     onChange={(e) => setProfile({ ...profile, lname: e.target.value })}
                />
                <label>Email:</label>
                <input
                    type="email"
                    value={profile.email || ""}
                    disabled={!editable}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
                
                {/*<label>New Password:</label>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    disabled={!editable}
                    onChange={(e) => setPassword(e.target.value)}
                />*/}
                <label>Role:</label>
                <input
                    type="text"
                    value={profile.role || ""}
                    disabled={true}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                />
                <button onClick={() => setEditable(!editable)}>
                    {editable ? "Cancel" : "Edit"}
                </button>
                {editable && <button onClick={handleSave}>Save</button>}
            </div>
            {popup.visible && (
                <div className="popup-overlay">
                <div className="popup">
                    <div className="popup-content">
                        <p>{popup.message}</p>
                        {/*{popup.details && (
                            <div>
                                <p>Updated Details:</p>
                                <pre>{JSON.stringify(popup.details, null, 2)}</pre>
                            </div>
                        )}*/}
                        <button onClick={closePopup}>Close</button>
                    </div>
                </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
