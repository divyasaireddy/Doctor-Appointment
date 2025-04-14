import React from "react";
import { FaStar } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const { name, avgRating, totalRating, photo, specialization, totalPatients, hospital } = doctor;

  return (
    <div className="card border-0 shadow-sm rounded-4 p-3">
      {/* Doctor Image */}
      <div className="rounded-3 overflow-hidden">
        <img src={photo} className="img-fluid w-100" alt={name} />
      </div>

      <div className="card-body text-start"> {/* Ensures left-aligned text */}
        {/* Doctor Name */}
        <h5 className="fw-bold text-dark mt-3">{name}</h5>

        {/* Specialization, Rating & Reviews (All on Same Line with Space Between) */}
        <div className="d-flex justify-content-between align-items-center mt-2">
          {/* Specialization Badge */}
          <span className="badge bg-info text-dark px-3 py-2">{specialization}</span>

          {/* Rating */}
          <div className="d-flex align-items-center">
            <FaStar className="text-warning me-1" />
            <p className="mb-0 text-dark fw-semibold">
              {avgRating} <span className="text-muted">({totalRating})</span>
            </p>
          </div>
        </div>

        {/* Patients Count */}
        <p className="text-muted mb-1 mt-2">+{totalPatients} patients</p>

        {/* Hospital Name + Arrow Icon (Both in Same Line) */}
        <div className="d-flex justify-content-between align-items-center">
          <p className="text-muted small mb-0">{hospital}</p>

          <Link
            to="/doctors"
            className="d-flex align-items-center justify-content-center rounded-circle border border-dark link-hover"
            style={{ width: "34px", height: "34px", transition: "all 0.3s ease-in-out" }}>
            <BsArrowRight className="text-dark" style={{ width: "18px", height: "18px" }} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
