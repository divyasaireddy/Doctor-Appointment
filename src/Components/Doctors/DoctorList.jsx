import { doctors } from "../../assets/data/doctors";
import DoctorCard from "./DoctorCard";

const DoctorList = () => {
  return (
    <div className="container mt-4">
      <div className="row g-1">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">
            <DoctorCard doctor={doctor} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
