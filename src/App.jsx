import React from "react";
import "./App.css"; // Import global styles
import Layout from "./Layout/Layout";
import { ToastContainer } from "react-toastify"; // Import Toastify for notifications
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS


export const API_BASE_URL = import.meta.env.VITE_API_URL || "https://your-render-backend.onrender.com";


function App() {
  return (
    <>
      {/* Main layout component */}
      <Layout />

      {/* Toast notifications setup */}
      <ToastContainer 
        position="top-center" 
        autoClose={2000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </>
  );
}

export default App;
