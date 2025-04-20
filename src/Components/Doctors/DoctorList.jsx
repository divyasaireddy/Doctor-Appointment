import React from "react";
import { Link } from "react-router-dom";
// Use named import to match how the data is exported
import { doctors } from "../../assets/data/doctors.js";
import DoctorCard from "../../Components/Doctors/DoctorCard";

const DoctorList = () => {
  // Use the first 3 doctors from your data file
  const displayDoctors = doctors.slice(0, 3);

  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* <h2 className="fw-bold text-center text-dark mb-4">Top Rated Doctors</h2> */}
        
        <div className="row justify-content-center">
          {displayDoctors.map((doctor) => (
            <div key={doctor.id} className="col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
              <DoctorCard doctor={doctor} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-3">
          <Link to="/doctors" className="btn btn-outline-primary px-4">
            View More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DoctorList;