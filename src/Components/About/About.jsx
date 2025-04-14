import React from 'react';
import aboutImg from '../../assets/images/about.png';
import aboutCardImg from '../../assets/images/about-card.png';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <section className="about-section py-5">
            <div className="container">
                <div className="row align-items-start">

                    {/* About Image - Left (Smaller with More Space) */}
                    <div className="position-relative col-lg-5 d-flex justify-content-center">
                        {/* Main About Image */}
                        <img
                            src={aboutImg}
                            alt="About Us"
                            className="img-fluid rounded shadow"
                            style={{ maxWidth: "80%", height: "auto", objectFit: "cover" }}
                        />

                        {/* About Card Image - Positioned on Right Corner & Slightly Bigger */}
                        <div
                            className="position-absolute"
                            style={{ width: "220px", bottom: "5%", right: "5%" }} // Increased width & adjusted position
                        >
                            <img
                                src={aboutCardImg}
                                alt="About Card"
                                className="img-fluid"
                                style={{ maxWidth: "100%", height: "auto" }}
                            />
                        </div>
                    </div>


                    {/* About Content - Right (With More Space & Justified Text) */}
                    <div className="col-lg-6 d-flex flex-column justify-content-start text-justify ps-lg-5">
                        <h2 className="fw-bold text-dark mb-4">
                            Your Health, <span className="text-primary">Our Commitment</span>
                        </h2>

                        <p className="text-muted">
                            At <strong>OurCare</strong>, we are committed to **transforming healthcare** through
                            **expert medical services** and **compassionate patient care**. Our mission is simple—
                            to provide you with the highest quality medical attention in a comfortable and supportive environment.
                        </p>

                        <p className="text-muted">
                            We offer **comprehensive healthcare solutions**, ranging from **preventive screenings**
                            to **advanced treatments**, ensuring that you and your family receive the best possible care.
                        </p>

                        <p className="text-muted">
                            Our expert doctors and state-of-the-art facilities are designed to give you
                            **personalized treatments** that cater to your unique health needs. Whether you need
                            **urgent care** or a **long-term wellness plan**, we’ve got you covered.
                        </p>

                        <Link to='/'>
                        <button className='btn1'> 
                           Learn More
                        </button>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default About;
