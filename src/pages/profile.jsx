import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
    const { user } = useAuth();

    const profileKey = `profile_${user.email}`;

    const [profile, setProfile] = useState(() => {
        const savedProfile =
            localStorage.getItem(profileKey);

        return savedProfile
            ? JSON.parse(savedProfile)
            : {
                  name: "",
                  email: user.email,
                  phone: "",
                  address: "",
              };
    });

    function handleChange(event) {
        setProfile({
            ...profile,
            [event.target.name]: event.target.value,
        });
    }

    function saveProfile() {
        localStorage.setItem(
            profileKey,
            JSON.stringify(profile)
        );

        alert("Profile saved successfully!");
    }

    return (
        <div className="page">
            <div className="container">
                <h1 className="page-title">
                    My Profile
                </h1>

                <div className="auth-container">
                    <div className="form-group">
                        <label className="form-label">
                            Full Name
                        </label>

                        <input
                            className="form-input"
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Email
                        </label>

                        <input
                            className="form-input"
                            type="email"
                            name="email"
                            value={profile.email}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Phone Number
                        </label>

                        <input
                            className="form-input"
                            type="tel"
                            name="phone"
                            value={profile.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Address
                        </label>

                        <textarea
                            className="form-input"
                            name="address"
                            rows="4"
                            value={profile.address}
                            onChange={handleChange}
                            placeholder="Enter delivery address"
                        />
                    </div>

                    <button
                        className="btn btn-primary btn-large"
                        onClick={saveProfile}
                    >
                        Save Profile
                    </button>
                </div>
            </div>
        </div>
    );
}