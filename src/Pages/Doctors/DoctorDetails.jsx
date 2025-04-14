import React, { useState } from "react";
import doctorImg from "../../assets/images/doctor-img02.png";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "../../Components/Doctors/DoctorAbout";
import Feedback from "../../Components/Doctors/Feedback";

const DoctorDetails = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          
          {/* Left Side - Doctor Info */}
          <div className="col-lg-7 col-md-10">
            <div className="d-flex align-items-center text-center mx-auto">
              <img
                src={doctorImg}
                alt="Doctor"
                className="rounded img-fluid me-3"
                style={{ width: "150px" }}
              />
              <div>
                <h3 className="fw-bold">Muhibur Rahman</h3>
                <span className="badge bg-primary">Surgeon</span>
                <div className="d-flex align-items-center mt-2 justify-content-center">
                  <img src={starIcon} alt="Rating" style={{ width: "20px" }} className="me-1" />
                  <span className="text-muted fw-bold">4.8 (272)</span>
                </div>
                <p className="text-muted mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, alias!
                </p>
              </div>
            </div>

            {/* Tabs Below Image */}
            <ul className="nav nav-tabs mt-4 justify-content-center">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "about" ? "active" : ""}`}
                  onClick={() => setActiveTab("about")}
                >
                  About
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "feedback" ? "active" : ""}`}
                  onClick={() => setActiveTab("feedback")}
                >
                  Feedback
                </button>
              </li>
            </ul>

            <div className="tab-content mt-4">
              {activeTab === "about" && <DoctorAbout />}
              {activeTab === "feedback" && <Feedback />}
            </div>
          </div>

          {/* Right Side - Smaller Ticket Price Card */}
          <div className="col-lg-3 col-md-10 mt-4 mt-lg-0">
            <div className="card shadow p-3 text-center mx-auto" style={{ maxWidth: "250px" }}>
              <h6 className="fw-bold">Ticket Price</h6>
              <h4 className="text-primary fw-bold">500 BDT</h4>
              <hr />
              <h6 className="text-muted">Available Time Slots:</h6>
              <ul className="list-unstyled small">
                <li>📅 Sun <span className="text-muted">4:00 - 9:30 PM</span></li>
                <li>📅 Tue <span className="text-muted">4:00 - 9:30 PM</span></li>
                <li>📅 Wed <span className="text-muted">4:00 - 9:30 PM</span></li>
              </ul>
              <button className="btn btn-primary w-100 mt-2 btn-sm">Book</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DoctorDetails;
