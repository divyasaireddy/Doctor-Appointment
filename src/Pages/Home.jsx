import React, { useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from '../Context/AuthContext.jsx'
// import { HashLink as Link } from 'react-router-hash-link';

import heroImg01 from "../assets/images/hero-img01.png";
import heroImg02 from "../assets/images/hero-img02.png";
import heroImg03 from "../assets/images/hero-img03.png";
import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import featureImg from "../assets/images/feature-img.png";
import videoIcon from "../assets/images/video-icon.png";
import avatarIcon from "../assets/images/avatar-icon.png";
// import faqImg from "../assets/images/faq-img.png";

import { BsArrowRight } from "react-icons/bs";
import About from "../Components/About/About.jsx";
import ServicesList from "../Components/Services/ServicesList.jsx";
import DoctorList from "../Components/Doctors/DoctorList.jsx";
import FaqList from "../Components/Faq/FaqItem.jsx";
import Testimonial from "../Components/Testimonial/Testimonial.jsx";
import Footer from "../Components/Footer/Footer.jsx";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const servicesRef = useRef(null);

  const handleScrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  const handleAppointmentClick = () => {
    if (user) {
      navigate("/book-appointment");
    } //else {
    //   navigate("/login");
    // }
  };

  const handleLearnMore = () => {
    navigate("/virtual-treatment");
  };

  return (
    <>
      {/* Hero Section start */}
      <section className="hero-section pt-5 pt-lg-4" style={{ minHeight: "500px" }}>
        <div className="container px-4 px-md-5 px-lg-6">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-5 ms-lg-5">
              <div className="text-center text-lg-start">
                <h1
                  className="fw-bold text-headingColor display-5"
                  style={{ maxWidth: "450px", lineHeight: "1.4", wordWrap: "break-word" }}
                >
                  We help patients live a healthy, longer life.
                </h1>

                <p className="text-para" style={{ maxWidth: "500px" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, minima velit,
                  aliquid voluptatum quam non omnis reiciendis incidunt, dicta inventore veritatis
                  rem dolore accusantium!
                </p>

                <button className="btn btn-primary" onClick={handleScrollToServices}>
                  Request an Appointment
                </button>

              </div>

              {/* Hero Counter */}
              <div className="mt-3 mt-lg-5 d-flex flex-column flex-lg-row align-items-center gap-4">
                <div className="text-center text-lg-start">
                  <h2 className="fs-2 fw-bold text-dark">30+</h2>
                  <span
                    className="d-block w-50 bg-warning rounded-pill mx-auto mx-lg-0"
                    style={{ height: "8px", width: "100px", marginTop: "-14px" }}
                  ></span>
                  <p className="text-muted">Years of Experience</p>
                </div>

                <div className="text-center text-lg-start">
                  <h2 className="fs-2 fw-bold text-dark">50+</h2>
                  <span
                    className="d-block w-50 bg-primary rounded-pill mx-auto mx-lg-0"
                    style={{ height: "8px", width: "100px", marginTop: "-14px" }}
                  ></span>
                  <p className="text-muted">Expert Doctors</p>
                </div>

                <div className="text-center text-lg-start">
                  <h2 className="fs-2 fw-bold text-dark">100%</h2>
                  <span
                    className="d-block w-50 bg-info rounded-pill mx-auto mx-lg-0"
                    style={{ height: "8px", width: "100px", marginTop: "-14px" }}
                  ></span>
                  <p className="text-muted">Patient Satisfaction</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 d-flex flex-lg-row flex-column align-items-center justify-content-center gap-4">
              <div className="text-center text-lg-end">
                <img
                  src={heroImg01}
                  alt="Main Doctor"
                  className="img-fluid rounded shadow"
                  style={{ maxWidth: "320px", height: "auto" }}
                />
              </div>

              <div className="d-flex flex-column align-items-start gap-3">
                <img
                  src={heroImg02}
                  className="img-fluid rounded shadow"
                  alt="Doctor 2"
                  style={{ maxWidth: "220px", height: "auto" }}
                />
                <img
                  src={heroImg03}
                  className="img-fluid rounded shadow"
                  alt="Doctor 3"
                  style={{ maxWidth: "220px", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Icons Section */}
      <section ref={servicesRef}>
        <div className="container mt-5">
          <div className="row justify-content-center text-center">
            <div className="col-lg-6">
              <h2 className="fw-bold">Providing the Best Medical Services</h2>
              <p className="text-muted">
                World-class care for everyone. Our health system offers unmatched, expert health
                care.
              </p>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-4">
            <div className="col">
              <div className="p-4 text-center shadow rounded bg-white">
                <img src={icon01} alt="Service 1" className="img-fluid mb-3" />
                <h2 className="fw-bold">Find a Doctor</h2>
                <p className="fs-6 fw-normal text-muted mt-4 text-center">
                  World-class care for everyone. Our health system offers unmatched, expert health
                  care.
                </p>
                <Link
                  to="/doctors?category=find-doctor"
                  className="d-flex align-items-center justify-content-center rounded-circle border border-dark mt-3 mx-auto link-hover"
                  style={{ width: "44px", height: "44px" }}
                >
                  <BsArrowRight className="text-dark" style={{ width: "24px", height: "20px" }} />
                </Link>
              </div>
            </div>

            <div className="col">
              <div className="p-4 text-center shadow rounded bg-white">
                <img src={icon02} alt="" className="img-fluid mb-3" />
                <h2 className="fw-bold">Find a Location</h2>
                <p className="fs-6 fw-normal text-muted mt-4 text-center">
                  World-class care for everyone. Our health system offers unmatched, expert health
                  care.
                </p>
                <Link
                  to="/locations"
                  className="d-flex align-items-center justify-content-center rounded-circle border border-dark mt-3 mx-auto link-hover"
                  style={{ width: "44px", height: "44px" }}
                >
                  <BsArrowRight className="text-dark" style={{ width: "24px", height: "20px" }} />
                </Link>
              </div>
            </div>

            <div className="col">
              <div className="p-4 text-center shadow rounded bg-white">
                <img src={icon03} alt="Service 1" className="img-fluid mb-3" />
                <h2 className="fw-bold">Book Appointment</h2>
                <p className="fs-6 fw-normal text-muted mt-4 text-center">
                  World-class care for everyone. Our health system offers unmatched, expert health
                  care.
                </p>
                <Link
                  to="/doctors"
                  className="d-flex align-items-center justify-content-center rounded-circle border border-dark mt-3 mx-auto link-hover"
                  style={{ width: "44px", height: "44px" }}
                >
                  <BsArrowRight className="text-dark" style={{ width: "24px", height: "20px" }} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About, Services, Features, Doctors, Testimonials */}
      <About />

      <section>
        <div className="container">
          <div className="col-xl-6 mx-auto text-center">
            <h2 className="fw-bold text-dark">Our Medical Services</h2>
            <p className="text-muted">
              World-class care for everyone. Our health system offers unmatched, expert health care.
            </p>
          </div>
          <ServicesList />
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row align-items-center justify-content-between mx-md-4 mx-lg-5">
            <div className="col-lg-5 pe-lg-5">
              <h2 className="fw-bold text-dark mb-4">Get Virtual Treatment Anytime.</h2>
              <ul className="list-unstyled">
                <li className="text-muted mb-2">
                  <strong>1.</strong> Schedule the appointment directly.
                </li>
                <li className="text-muted mb-2">
                  <strong>2.</strong> Search for your physician here and contact their office.
                </li>
                <li className="text-muted mb-3">
                  <strong>3.</strong> View our physicians who are accepting new patients and use the
                  online scheduling tool.
                </li>
              </ul>
              <button className="btn btn-primary px-4" onClick={handleLearnMore}>
                Learn More
              </button>
            </div>

            <div className="col-lg-6 position-relative text-center text-lg-end">
              <img src={featureImg} className="img-fluid w-75 rounded shadow" alt="Feature" />
              <div
                className="position-absolute bg-white shadow p-3 rounded-3"
                style={{
                  width: "220px",
                  top: "60%",
                  left: "10%",
                  zIndex: "10",
                  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1 text-muted fw-semibold" style={{ fontSize: "12px" }}>Tue, 24</p>
                  <p className="mb-1 text-muted fw-semibold" style={{ fontSize: "12px" }}>10:00 AM</p>
                  <div className="bg-warning d-flex align-items-center justify-content-center rounded-circle" style={{ width: "24px", height: "24px" }}>
                    <img src={videoIcon} alt="Video Call" width="14" />
                  </div>
                </div>
                <div className="bg-info text-primary py-1 px-2 text-center fw-semibold rounded-pill mt-2" style={{ fontSize: "10px", width: "100px" }}>
                  Consultation
                </div>
                <div className="d-flex align-items-center gap-2 mt-2">
                  <img src={avatarIcon} alt="Avatar" className="rounded-circle" style={{ width: "24px", height: "24px" }} />
                  <h4 className="fw-bold text-dark mb-0" style={{ fontSize: "12px" }}>Wayne Collins</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="col-xl-6 mx-auto text-center">
            <h2 className="fw-bold mb-3">Our Great Doctors</h2>
            <p className="text-muted">World-class care for everyone. Our health system offers unmatched, expert health care.</p>
          </div>
          <DoctorList />
        </div>
      </section>

      <section>
        <div className="container">
          <div className="col-xl-6 mx-auto text-center">
            <h2 className="fw-bold mb-3">What our patients say</h2>
            <p className="text-muted">World-class care for everyone. Our health system offers unmatched, expert health care.</p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Home;
