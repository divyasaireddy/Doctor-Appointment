import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/auth.css";
import signupImg from "../assets/images/signup.gif";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "Patient",
    gender: "",
    profileImage: null,
    photoFile: null, // Add this
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profileImage: URL.createObjectURL(file),
        photoFile: file, // Save file for upload
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("fullName", formData.fullName); // ✅ Matches backend
    submitData.append("email", formData.email);
    submitData.append("password", formData.password);
    submitData.append("role", formData.role);
    submitData.append("gender", formData.gender);
    if (formData.photoFile) {
      submitData.append("photo", formData.photoFile);
    }

    // DEBUG
    for (let pair of submitData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await fetch("http://localhost:5001/api/v1/auth/register", {
        method: "POST",
        body: submitData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Signup successful!");
        navigate("/login");
      } else {
        toast.error(data.message || "Signup failed");
        console.error("❌ Signup failed:", data);
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer />
      <div className="signup-box">
        <div className="signup-img">
          <img src={signupImg} alt="Signup Illustration" />
        </div>
        <div className="signup-form">
          <h2>Create an <span className="highlight">Account</span></h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" name="fullName" placeholder="Enter full name" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="Enter email" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="Enter password" onChange={handleChange} required />
            </div>

            <div className="select-group input-group">
              <div>
                <label>Role</label>
                <select name="role" onChange={handleChange}>
                  <option value="Patient">Patient</option>
                  <option value="Doctor">Doctor</option>
                </select>
              </div>

              <div>
                <label>Gender</label>
                <select name="gender" onChange={handleChange} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="upload-photo">
              {formData.profileImage && (
                <img src={formData.profileImage} alt="Profile Preview" className="profile-preview" />
              )}
              <input type="file" accept="image/*" id="fileInput" onChange={handleFileChange} hidden />
              <button type="button" className="upload-btn" onClick={() => document.getElementById("fileInput").click()}>
                Upload Photo
              </button>
            </div>

            <button className="signup-btn" type="submit">Sign Up</button>
          </form>

          <p className="auth-text">
            Already have an account? <Link to="/login" className="login-link">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
