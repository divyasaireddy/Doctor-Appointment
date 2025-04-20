import React from "react";
import { FaStar } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const { name, avgRating, totalRating, photo, specialization, totalPatients, hospital } = doctor;

  return (
    <div className="card border-0 shadow-sm rounded-4 p-3">
      {/* Doctor Image Container with common background */}
      <div
  className="d-flex justify-content-center align-items-center rounded-3"
  style={{
    // backgroundColor: "#f0f8ff", // Light blue
    height: "230px",             // Fixed uniform height
    padding: "10px",
    overflow: "hidden",
  }}
>
  <img
    src={photo}
    alt={name}
    style={{
      maxHeight: "100%",
      maxWidth: "100%",
      objectFit: "contain", // Prevents overflow
    }}
  />
</div>

      <div className="card-body text-start">
        {/* Doctor Name */}
        <h5 className="fw-bold text-dark mt-3">{name}</h5>

        {/* Specialization & Rating */}
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="badge bg-info text-dark px-3 py-2">{specialization}</span>
          <div className="d-flex align-items-center">
            <FaStar className="text-warning me-1" />
            <p className="mb-0 text-dark fw-semibold">
              {avgRating} <span className="text-muted">({totalRating})</span>
            </p>
          </div>
        </div>

        {/* Patients Count */}
        <p className="text-muted mb-1 mt-2">+{totalPatients} patients</p>

        {/* Hospital Info + Arrow */}
        <div className="d-flex justify-content-between align-items-center">
          <p className="text-muted small mb-0">{hospital}</p>
          <Link
            to="/doctors"
            className="d-flex align-items-center justify-content-center rounded-circle border border-dark link-hover"
            style={{ width: "34px", height: "34px", transition: "all 0.3s ease-in-out" }}
          >
            <BsArrowRight className="text-dark" style={{ width: "18px", height: "18px" }} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
