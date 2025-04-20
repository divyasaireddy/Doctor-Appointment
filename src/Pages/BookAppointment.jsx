import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";

const BookAppointment = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const doctorFromCard = location.state?.doctor || null;

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    doctor: doctorFromCard?._id || "",
    date: "",
    time: "",
    symptoms: "",
  });

  const doctorOptions = [
    { id: "6610efc70b0c01b53cf1e64f", name: "Dr. Smith", specialization: "General Medicine" },
    { id: "6610efd60b0c01b53cf1e651", name: "Dr. Emily", specialization: "Cardiology" },
    { id: "6610f0140b0c01b53cf1e658", name: "Dr. Wayne", specialization: "Pediatrics" }
  ];

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

    if (!formData.symptoms.trim()) {
      alert("Please enter your symptoms or reason for visit.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token || !validateToken(token)) {
      alert("You are not logged in or your session has expired.");
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }

    let doctorInfo = {
      id: formData.doctor,
      name: "Unknown Doctor",
      specialization: "Not available"
    };

    if (doctorFromCard) {
      doctorInfo = {
        id: doctorFromCard._id,
        name: doctorFromCard.name,
        specialization: doctorFromCard.specialization || "Not available"
      };
    } else {
      const selectedDoctor = doctorOptions.find(d => d.id === formData.doctor);
      if (selectedDoctor) {
        doctorInfo = {
          id: selectedDoctor.id,
          name: selectedDoctor.name,
          specialization: selectedDoctor.specialization
        };
      }
    }

    try {
      const doctorMap = JSON.parse(localStorage.getItem("doctorAppointmentMap") || "{}");
      doctorMap[doctorInfo.id] = {
        name: doctorInfo.name,
        specialization: doctorInfo.specialization
      };
      localStorage.setItem("doctorAppointmentMap", JSON.stringify(doctorMap));
      
      const symptomsMap = JSON.parse(localStorage.getItem("appointmentSymptomsMap") || "{}");
      const tempKey = new Date().toISOString();
      symptomsMap[tempKey] = {
        doctorId: doctorInfo.id,
        doctorName: doctorInfo.name,
        symptoms: formData.symptoms || "Not specified",
        date: `${formData.date}T${formData.time}`
      };
      localStorage.setItem("appointmentSymptomsMap", JSON.stringify(symptomsMap));
    } catch (err) {
      console.error("Error saving appointment info to localStorage:", err);
    }

    const appointmentDate = `${formData.date}T${formData.time}`;
    const ticketPrice = 0.01;

    try {
      const res = await fetch("http://localhost:5001/api/v1/users/book-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctor: formData.doctor,
          doctorName: doctorInfo.name,
          doctorSpecialization: doctorInfo.specialization,
          appointmentDate,
          ticketPrice,
          symptoms: formData.symptoms || "Not specified",
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

      if (result.data && result.data._id) {
        try {
          const symptomsMap = JSON.parse(localStorage.getItem("appointmentSymptomsMap") || "{}");
          const tempKeys = Object.keys(symptomsMap);
          const latestKey = tempKeys.sort().pop();
          if (latestKey) {
            const latestEntry = symptomsMap[latestKey];
            symptomsMap[result.data._id] = latestEntry;
            delete symptomsMap[latestKey];
            localStorage.setItem("appointmentSymptomsMap", JSON.stringify(symptomsMap));
          }
        } catch (err) {
          console.error("Error updating appointment info in localStorage:", err);
        }
      }

      alert("Appointment booked successfully!");
      navigate("/my-appointments");
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

        {doctorFromCard ? (
          <div className="mb-3">
            <label className="form-label">Doctor</label>
            <input type="text" className="form-control" value={doctorFromCard.name} readOnly />
          </div>
        ) : (
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
              {doctorOptions.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>
        )}

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
          <input type="text" className="form-control" value="0.01" disabled />
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
            required
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
