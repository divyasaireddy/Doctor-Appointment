import React, { useState } from "react";
import DoctorCard from "../../Components/Doctors/DoctorCard";
import { doctors } from "../../assets/data/doctors";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../../Context/AuthContext'

const Doctors = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter doctors based on search query (name or specialization)
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigate = useNavigate();
const { user } = useContext(AuthContext);

  const handleBookNow = () => {
    if (user) {
      navigate("/book-appointment");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {/* Section for Finding Doctors */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold">Find a Doctor</h2>

          {/* Search Box */}
          <div
            className="mx-auto mt-3 p-2 bg-primary bg-opacity-10 rounded d-flex align-items-center justify-content-between"
            style={{ maxWidth: "570px" }}
          >
            <input
              type="search"
              className="form-control border-0 bg-transparent"
              placeholder="Search by Name or Specialization"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-primary">Search</button>
          </div>
        </div>
      </section>

      {/* Doctors List Section */}
      <section className="container py-5">
        <div className="row justify-content-center">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, index) => (
              <div
                key={index}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex align-items-stretch"
              >
                <div className="card text-center shadow-sm p-3 border-0 rounded w-100">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="img-fluid mx-auto d-block"
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      marginBottom: "10px",
                    }}
                  />
                  <div className="card-body p-2">
                    <h6 className="fw-bold text-primary">{doctor.name}</h6>
                    <p className="text-muted small mb-1">
                      {doctor.specialization}
                    </p>
                    <p className="small">
                      <strong>Patients:</strong> {doctor.totalPatients}
                    </p>
                    <p className="small">
                      <strong>Rating:</strong> {doctor.avgRating} ⭐
                    </p>
                    <button className="btn btn-sm btn-outline-primary" onClick={handleBookNow}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <p>No doctors found</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Doctors;
