import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/auth.css";
import loginImg from "../assets/images/signup.gif";
import { AuthContext } from "../Context/AuthContext.jsx";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // ✅ Added loading state
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading) return;
    setLoading(true);
  
    try {
      const response = await fetch("http://localhost:5001/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log("Login API Response:", data);
  
      if (response.ok) {
        const user = data.data;
  
        if (!user) {
          console.error("Missing user data in API response");
          toast.error("Login failed: Missing user information.");
          setLoading(false);
          return;
        }
  
        // Only store essential user data (avoid large fields)
        const minimalUser = { 
          _id: user._id, 
          name: user.name, 
          email: user.email, 
          role: user.role 
        };
  
        dispatch({ type: "LOGIN_SUCCESS", payload: { user: minimalUser, token: data.token } });
  
        toast.success("Login successful!", { autoClose: 2000 });
  
        try {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(minimalUser));
        } catch (error) {
          console.error("LocalStorage error:", error);
          toast.error("Storage error: Unable to save user data.");
        }
  
        setTimeout(() => {
          navigate("/home");
          setLoading(false);
        }, 2000);
      } else {
        toast.error(data.message || "Login failed. Try again!");
        setLoading(false);
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong. Please try again!");
      setLoading(false);
    }
  };
  

  return (
    <section className="auth-container">
      <div className="auth-box">
        <div className="auth-image">
          <img src={loginImg} alt="Login" />
        </div>

        <div className="auth-form">
          <h2>
            Login to your <span className="highlight">account</span>
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                placeholder="Enter your email" 
                required 
                onChange={handleChange} 
              />
            </div>

            <div className="input-box">
              <label>Password</label>
              <input 
                type="password" 
                name="password" 
                placeholder="Enter your password" 
                required 
                onChange={handleChange} 
              />
            </div>

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="auth-text">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>

      <ToastContainer />
    </section>
  );
};

export default Login;
