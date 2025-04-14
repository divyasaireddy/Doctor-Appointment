import React, { useState } from "react";
import "../styles/contact.css"; // Ensure this file exists
import { toast, ToastContainer } from "react-toastify"; // ✅ Import Toast
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Message Sent Successfully!", {
      position: "top-right",
      autoClose: 3000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      closeButton: true,
    });
  

    setFormData({
      email: "",
      subject: "",
      message: "",
    });
  };
  


  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>Got a technical issue? Want to send feedback about a beta feature? Let us know.</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="input-group">
          <label>Your Email</label>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="Let us know how we can help you"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Your Message</label>
          <textarea
            name="message"
            placeholder="Leave a comment..."
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-btn" >Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;
