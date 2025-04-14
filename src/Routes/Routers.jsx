import React from "react";
import Home from "../Pages/Home";
import Services from "../Pages/Services";
import Contact from "../Pages/Contact";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Doctors from "../Pages/Doctors/Doctors";
import DoctorDetails from "../Pages/Doctors/DoctorDetails";
import MyAccount from "../Dashboard/user-account/MyAccount";
import Dashboard from "../Dashboard/doctor-account/Dashboard";
import { Routes, Route } from "react-router-dom";
import BookAppointment from "../Pages/BookAppointment";
import MyAppointments from "../Dashboard/MyAppointments";
// import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/book-appointment" element={<BookAppointment />} />
      <Route path='/my-appointments' element={<MyAppointments />} />
      <Route
        path="/users/profile/me"
        element={
            <MyAccount />
          }
          // <ProtectedRoute allowedRoles={["patient"]}>
          // </ProtectedRoute>
      />
      <Route
        path="/doctors/profile/me"
        element={
            <Dashboard />
          // <ProtectedRoute allowedRoles={["doctor"]}>
          // </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
