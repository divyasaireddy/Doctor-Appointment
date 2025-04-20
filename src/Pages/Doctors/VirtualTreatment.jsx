import React, { useState, useEffect } from 'react';
import './VirtualTreatment.css'; // Custom CSS file

export default function VirtualTreatmentSection() {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [dateTime, setDateTime] = useState({ date: '', time: '' });
  const [appointmentStatus, setAppointmentStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Mock data for doctors
  useEffect(() => {
    // In a real implementation, this would be an API call
    const mockDoctors = [
      { id: 1, name: "Dr. Wayne Collins", specialty: "General Medicine", availability: ["9:00 AM", "10:00 AM", "2:00 PM"] },
      { id: 2, name: "Dr. Sarah Johnson", specialty: "Cardiology", availability: ["11:00 AM", "1:00 PM", "3:00 PM"] },
      { id: 3, name: "Dr. Michael Chen", specialty: "Pediatrics", availability: ["8:30 AM", "12:30 PM", "4:00 PM"] },
      { id: 4, name: "Dr. Lisa Patel", specialty: "Dermatology", availability: ["10:30 AM", "1:30 PM", "3:30 PM"] }
    ];
    setDoctors(mockDoctors);
  }, []);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    // Reset selections when hiding details
    if (showDetails) {
      resetSelections();
    }
  };

  const resetSelections = () => {
    setSelectedOption(null);
    setSelectedDoctor(null);
    setDateTime({ date: '', time: '' });
    setAppointmentStatus(null);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSelectedDoctor(null);
    setDateTime({ date: '', time: '' });
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleDateChange = (e) => {
    setDateTime({ ...dateTime, date: e.target.value });
  };

  const handleTimeChange = (e) => {
    setDateTime({ ...dateTime, time: e.target.value });
  };

  const handleScheduleAppointment = () => {
    // Validate all required fields
    if (!selectedOption || !selectedDoctor || !dateTime.date || !dateTime.time) {
      setAppointmentStatus({
        success: false,
        message: "Please complete all required fields."
      });
      return;
    }

    // In a real application, this would be an API call
    setLoading(true);
    
    setTimeout(() => {
      setAppointmentStatus({
        success: true,
        message: `Your ${selectedOption} appointment with ${selectedDoctor.name} has been scheduled for ${dateTime.date} at ${dateTime.time}.`,
        confirmationNumber: "VT" + Math.floor(100000 + Math.random() * 900000)
      });
      setLoading(false);
    }, 1500);
  };

  const treatmentOptions = [
    {
      id: "video",
      name: "Video Consultation",
      icon: "bi-camera-video",
      description: "Speak with your doctor face-to-face from the comfort of your home."
    },
    {
      id: "phone",
      name: "Phone Consultation",
      icon: "bi-telephone",
      description: "Available for follow-ups and quick check-ins."
    },
    {
      id: "message",
      name: "Secure Messaging",
      icon: "bi-chat-dots",
      description: "Send questions and receive responses from your healthcare provider."
    },
    {
      id: "prescription",
      name: "Prescription Renewals",
      icon: "bi-capsule",
      description: "Request medication refills through our secure portal."
    }
  ];

  // Generate dates for the next 14 days
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      
      const formattedDate = nextDate.toISOString().split('T')[0];
      dates.push(formattedDate);
    }
    
    return dates;
  };

  return (
    <div className="container virtual-treatment-container">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h2 className="heading-main">Get Virtual Treatment Anytime.</h2>
          
          <ol className="steps-list">
            <li>Schedule the appointment directly.</li>
            <li>Search for your physician here and contact their office.</li>
            <li>View our physicians who are accepting new patients and use the online scheduling tool.</li>
          </ol>
          
          <button 
            onClick={toggleDetails}
            className="btn btn-primary learn-more-btn"
          >
            <span>{showDetails ? 'Hide Details' : 'Learn More'}</span>
            <i className={`bi ${showDetails ? 'bi-chevron-up' : 'bi-chevron-down'} ms-2`}></i>
          </button>
          
          {showDetails && (
            <div className={`treatment-details ${showDetails ? 'show' : ''}`}>
              {appointmentStatus && (
                <div className={`alert ${appointmentStatus.success ? 'alert-success' : 'alert-danger'} mb-4`} role="alert">
                  <div className="d-flex align-items-center">
                    <i className={`bi ${appointmentStatus.success ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2`}></i>
                    <div>
                      <p className="mb-1">{appointmentStatus.message}</p>
                      {appointmentStatus.success && (
                        <p className="mb-0 small">Confirmation Number: <strong>{appointmentStatus.confirmationNumber}</strong></p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {!appointmentStatus?.success && (
                <>
                  <h3>Virtual Treatment Options</h3>
                  
                  {/* Step 1: Select consultation type */}
                  <div className="booking-step active">
                    <h4 className="step-title">
                      <span className="step-number">1</span> Select Consultation Type
                    </h4>
                    
                    <ul className="treatment-options">
                      {treatmentOptions.map(option => (
                        <li 
                          key={option.id} 
                          className={`treatment-option ${selectedOption === option.name ? 'selected' : ''}`}
                          onClick={() => handleOptionSelect(option.name)}
                        >
                          <div className="icon-wrapper">
                            <i className={`bi ${option.icon}`}></i>
                          </div>
                          <div className="option-content">
                            <span className="option-name">{option.name}</span>
                            <p>{option.description}</p>
                          </div>
                          {selectedOption === option.name && (
                            <div className="selected-check">
                              <i className="bi bi-check-circle-fill"></i>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Step 2: Select doctor - Only shown if an option was selected */}
                  {selectedOption && (
                    <div className="booking-step active mt-4">
                      <h4 className="step-title">
                        <span className="step-number">2</span> Select Doctor
                      </h4>
                      
                      <div className="doctor-selection">
                        <div className="row g-3">
                          {doctors.map(doctor => (
                            <div key={doctor.id} className="col-md-6">
                              <div 
                                className={`doctor-card ${selectedDoctor?.id === doctor.id ? 'selected' : ''}`}
                                onClick={() => handleDoctorSelect(doctor)}
                              >
                                <div className="doctor-avatar">
                                  {doctor.name.split(' ')[1][0]}{doctor.name.split(' ')[2]?.[0] || ''}
                                </div>
                                <div className="doctor-details">
                                  <h5>{doctor.name}</h5>
                                  <p>{doctor.specialty}</p>
                                </div>
                                {selectedDoctor?.id === doctor.id && (
                                  <div className="selected-check">
                                    <i className="bi bi-check-circle-fill"></i>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 3: Select Date and Time - Only shown if a doctor was selected */}
                  {selectedDoctor && (
                    <div className="booking-step active mt-4">
                      <h4 className="step-title">
                        <span className="step-number">3</span> Select Date & Time
                      </h4>
                      
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label htmlFor="appointmentDate" className="form-label">Date</label>
                          <select 
                            className="form-select" 
                            id="appointmentDate"
                            value={dateTime.date}
                            onChange={handleDateChange}
                          >
                            <option value="">Select a date</option>
                            {getAvailableDates().map(date => (
                              <option key={date} value={date}>
                                {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="col-md-6">
                          <label htmlFor="appointmentTime" className="form-label">Time</label>
                          <select 
                            className="form-select" 
                            id="appointmentTime"
                            value={dateTime.time}
                            onChange={handleTimeChange}
                            disabled={!dateTime.date}
                          >
                            <option value="">Select a time</option>
                            {selectedDoctor && selectedDoctor.availability.map(time => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <button 
                          className="btn btn-primary schedule-btn" 
                          onClick={handleScheduleAppointment}
                          disabled={loading || !dateTime.date || !dateTime.time}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Scheduling...
                            </>
                          ) : (
                            <>Schedule Appointment</>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
              
              {/* Action buttons */}
              <div className="action-buttons mt-4">
                {appointmentStatus?.success ? (
                  <>
                    <button 
                      className="btn btn-outline-primary" 
                      onClick={resetSelections}
                    >
                      Book Another Appointment
                    </button>
                    <a href="#" className="btn btn-primary">Go to My Appointments</a>
                  </>
                ) : (
                  <>
                    {!selectedOption && (
                      <>
                        <a href="#physicians" className="btn btn-outline-primary">Browse All Physicians</a>
                        <a href="#faq" className="btn btn-outline-secondary">Virtual Visit FAQs</a>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="col-md-6">
          <div className="doctor-image-container">
            <img 
              src='https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg'
              alt="Doctor with stethoscope" 
              className="img-fluid rounded"
            />
            
            <div className="appointment-card">
              <div className="appointment-header">
                <div className="appointment-date">Tue, 24</div>
                <div className="appointment-time">10:00 AM</div>
              </div>
              <div className="appointment-type">Consultation</div>
              <div className="doctor-info">
                <div className="doctor-avatar">WC</div>
                <div className="doctor-name">Wayne Collins</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}