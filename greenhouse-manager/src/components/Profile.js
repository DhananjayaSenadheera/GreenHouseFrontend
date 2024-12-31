import React, { useEffect, useState } from "react";
import { getProfile } from "../services/authService";

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");

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

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    if (!profile) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Profile</h2>
            <p>Email: {profile.email}</p>
            <p>Role: {profile.role}</p>
        </div>
    );
};

export default ProfilePage;
