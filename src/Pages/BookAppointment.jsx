import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";

const BookAppointment = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    doctor: "",
    date: "",
    time: "",
    symptoms: "",
  });

  // 🔒 Token Validation
  const validateToken = (token) => {
    try {
      const tokenParts = token.split(".");
      if (tokenParts.length !== 3) return false;

      const payload = JSON.parse(atob(tokenParts[1]));
      if (payload.exp && payload.exp < Date.now() / 1000) return false;

      return true;
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  };

  // 🚀 On mount, redirect if token is invalid
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !validateToken(token)) {
      alert("You are not logged in or your session has expired. Please login.");
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token || !validateToken(token)) {
      alert("You are not logged in or your session has expired.");
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }

    const appointmentDate = `${formData.date}T${formData.time}`;
    const ticketPrice = 500;

    try {
      const res = await fetch("http://localhost:5001/api/v1/users/book-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctor: formData.doctor,
          appointmentDate,
          ticketPrice,
          symptoms: formData.symptoms,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          alert("Unauthorized. Please login again.");
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        throw new Error(result.message || "Booking failed");
      }

      alert("Appointment booked successfully!");
      navigate("/");
    } catch (err) {
      console.error("Booking error:", err);
      alert("Failed to book appointment: " + (err.message || "Unknown error"));
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Book an Appointment</h2>

      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "600px" }}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input name="name" type="text" className="form-control" value={formData.name} readOnly />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name="email" type="email" className="form-control" value={formData.email} readOnly />
        </div>

        <div className="mb-3">
          <label className="form-label">Choose Doctor</label>
          <select
            name="doctor"
            className="form-select"
            value={formData.doctor}
            onChange={handleChange}
            required
          >
            <option value="">Select Doctor</option>
            <option value="6610efc70b0c01b53cf1e64f">Dr. Smith</option>
            <option value="6610efd60b0c01b53cf1e651">Dr. Emily</option>
            <option value="6610f0140b0c01b53cf1e658">Dr. Wayne</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            name="date"
            type="date"
            className="form-control"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Time</label>
          <input
            name="time"
            type="time"
            className="form-control"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ticket Price</label>
          <input type="text" className="form-control" value="₹500" disabled />
        </div>

        <div className="mb-3">
          <label className="form-label">Symptoms / Reason</label>
          <textarea
            name="symptoms"
            className="form-control"
            rows="4"
            value={formData.symptoms}
            onChange={handleChange}
            placeholder="Describe symptoms or reason for visit"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit Appointment
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
