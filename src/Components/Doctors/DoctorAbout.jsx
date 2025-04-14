import React from "react";

const DoctorAbout = () => {
  return (
    <div>
      <h4 className="fw-bold text-primary">About Dr. Muhibur Rahman</h4>
      <p className="text-muted">
        Dr. Muhibur Rahman is a highly experienced surgeon with over 15 years of expertise in advanced surgical procedures. He has worked at top hospitals worldwide and has successfully performed thousands of surgeries.
      </p>

      {/* Education Section */}
      <h5 className="fw-bold mt-4 text-dark">🎓 Education</h5>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <strong>MBBS - University of Health Sciences</strong>
          <br />
          <span className="text-muted">2004 - 2010 | Dhaka, Bangladesh</span>
        </li>
        <li className="list-group-item">
          <strong>MS in Surgery - Harvard Medical School</strong>
          <br />
          <span className="text-muted">2011 - 2014 | Boston, USA</span>
        </li>
        <li className="list-group-item">
          <strong>Fellowship in Advanced Surgery - Mayo Clinic</strong>
          <br />
          <span className="text-muted">2015 - 2017 | Rochester, USA</span>
        </li>
      </ul>

      {/* Experience Section */}
      <h5 className="fw-bold mt-4 text-dark">🏥 Experience</h5>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <strong>Senior Surgeon at Mount Adora Hospital</strong>
          <br />
          <span className="text-muted">2018 - Present | Sylhet, Bangladesh</span>
        </li>
        <li className="list-group-item">
          <strong>Consultant Surgeon at Mayo Clinic</strong>
          <br />
          <span className="text-muted">2015 - 2018 | Rochester, USA</span>
        </li>
        <li className="list-group-item">
          <strong>Resident Surgeon at John Hopkins Hospital</strong>
          <br />
          <span className="text-muted">2012 - 2015 | Baltimore, USA</span>
        </li>
      </ul>
    </div>
  );
};

export default DoctorAbout;
