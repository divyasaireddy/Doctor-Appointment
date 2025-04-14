import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const Profile = () => {
  const { token } = useContext(AuthContext);
  const [profile, setProfile] = useState({ name: "", email: "", photo: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get("http://localhost:5001/api/v1/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await axios.put("http://localhost:5001/api/v1/users/me", profile, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Profile updated!");
  };

  return (
    <div>
      <h2>My Profile</h2>
      <input name="name" value={profile.name} onChange={handleChange} />
      <input name="email" value={profile.email} onChange={handleChange} />
      <input name="photo" value={profile.photo} onChange={handleChange} placeholder="Profile Image URL" />
      <button onClick={handleUpdate}>Save Changes</button>
    </div>
  );
};

export default Profile;
