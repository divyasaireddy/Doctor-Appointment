import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Table, Button, Badge, Card, Spinner, Alert } from "react-bootstrap";

const MyAppointments = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(null);

  // Check for token validity
  useEffect(() => {
    if (!token) {
      console.log("No token found, redirecting to login");
      navigate("/login");
      return;
    }

    // Attempt to fetch appointments
    fetchAppointments();
  }, [token, navigate]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching appointments with token:", token ? "Token exists" : "No token");
      
      const response = await fetch("http://localhost:5001/api/v1/users/get-appointments", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });
      
      // Check if we're getting HTML instead of JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("text/html")) {
        const textResponse = await response.text();
        console.error("Server returned HTML:", textResponse.substring(0, 200) + "...");
        throw new Error("Server returned HTML instead of JSON. Please check server configuration.");
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch appointments");
      }
      
      // Extract bookings array from the nested structure
      const bookingsArray = data.data?.bookings || [];
      setAppointments(bookingsArray);
      
      // Store doctors data separately if needed
      const doctorsArray = data.data?.doctors || [];
      setDoctors(doctorsArray);
      
      console.log("Appointments loaded:", bookingsArray.length);
      console.log("Doctors loaded:", doctorsArray.length);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      
      if (err.message.includes("Unexpected token") || err.message.includes("<!DOCTYPE")) {
        setError("Authentication error. Please log out and log in again.");
      } else if (err.message.includes("404") || err.message.includes("Not Found")) {
        setError("Could not find appointments. The API endpoint may not exist.");
      } else {
        setError("Failed to load your appointments: " + (err.message || "Unknown error"));
      }
    } finally {
      setLoading(false);
    }
  };

  // UPDATED: Fixed handleCancelAppointment function with multiple endpoint attempts
  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }
    
    try {
      setCancelling(appointmentId);
      
      // List of possible endpoint patterns to try
      const possibleEndpoints = [
        // Original endpoint
        `http://localhost:5001/api/v1/users/cancel-appointment/${appointmentId}`,
        // Alternative endpoint patterns based on REST conventions
        `http://localhost:5001/api/v1/appointments/${appointmentId}`,
        `http://localhost:5001/api/v1/bookings/${appointmentId}`,
        `http://localhost:5001/api/v1/users/appointments/${appointmentId}`
      ];
      
      let success = false;
      let lastError = null;
      
      // Try each endpoint until one works
      for (const endpoint of possibleEndpoints) {
        try {
          console.log(`Attempting to cancel appointment using: ${endpoint}`);
          
          const response = await fetch(endpoint, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
          });
          
          // If we get a 404, try the next endpoint
          if (response.status === 404) {
            console.log(`Endpoint ${endpoint} returned 404, trying next...`);
            continue;
          }
          
          // Check for HTML response
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("text/html")) {
            console.log(`Endpoint ${endpoint} returned HTML, trying next...`);
            lastError = new Error("Server returned HTML instead of JSON");
            continue;
          }
          
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.message || "Failed to cancel appointment");
          }
          
          // If we reach here, the request was successful
          console.log("Appointment cancelled successfully!");
          setAppointments(appointments.filter(app => app._id !== appointmentId));
          alert("Appointment cancelled successfully");
          success = true;
          break;
        } catch (err) {
          console.log(`Error with endpoint ${endpoint}:`, err);
          lastError = err;
        }
      }
      
      // If all endpoints failed, throw the last error
      if (!success) {
        throw lastError || new Error("All cancellation endpoints failed");
      }
    } catch (err) {
      console.error("Error cancelling appointment:", err);
      alert("Failed to cancel appointment: " + (err.message || "Unknown error") + 
            "\n\nPlease check with your backend team about the correct endpoint for cancelling appointments.");
    } finally {
      setCancelling(null);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (err) {
      return "Invalid date";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge bg="warning">Pending</Badge>;
      case "confirmed":
        return <Badge bg="success">Confirmed</Badge>;
      case "cancelled":
        return <Badge bg="danger">Cancelled</Badge>;
      case "completed":
        return <Badge bg="info">Completed</Badge>;
      default:
        return <Badge bg="secondary">{status || "Unknown"}</Badge>;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Added debug panel to show backend API endpoints
  const renderDebugPanel = () => {
    return (
      <Alert variant="info" className="mt-3">
        <h5>Development Debug Panel</h5>
        <p>If you're experiencing API connection issues, check these endpoints on your backend:</p>
        <ul className="mb-1">
          <li><code>GET /api/v1/users/get-appointments</code> - For fetching appointments</li>
          <li><code>DELETE /api/v1/users/cancel-appointment/:id</code> - For cancelling (current implementation)</li>
          <li><code>DELETE /api/v1/appointments/:id</code> - Alternative pattern</li>
          <li><code>DELETE /api/v1/users/appointments/:id</code> - Alternative pattern</li>
        </ul>
        <p className="mb-0 mt-2">
          <Button variant="outline-primary" size="sm" onClick={() => {
            const backendUrl = prompt("Enter your backend URL:", "http://localhost:5001");
            if (backendUrl) {
              alert(`Debug info will be logged to console for ${backendUrl}`);
              console.log("Testing backend connectivity...");
              fetch(`${backendUrl}/api/v1/health-check`, {
                headers: { "Accept": "application/json" }
              })
                .then(res => res.ok ? res.json() : Promise.reject("Server error"))
                .then(data => console.log("Backend is up:", data))
                .catch(err => console.error("Backend connection failed:", err));
            }
          }}>
            Test Backend Connection
          </Button>
        </p>
      </Alert>
    );
  };

  const findDoctorById = (doctorId) => {
    return doctors.find(doctor => doctor._id === doctorId) || null;
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <Card className="shadow-lg">
        <Card.Header className="bg-primary text-white">
          <h3 className="mb-0">My Appointments</h3>
        </Card.Header>
        <Card.Body>
          {error && (
            <Alert variant="danger">
              <strong>Error: </strong>{error}
              <div className="mt-2">
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  onClick={fetchAppointments}
                >
                  Try Again
                </Button>
                <Button 
                  variant="outline-secondary" 
                  size="sm" 
                  className="ms-2" 
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
              {renderDebugPanel()}
            </Alert>
          )}
          
          {!error && appointments.length === 0 ? (
            <Alert variant="info">
              You don't have any appointments yet. 
              <Button 
                variant="link" 
                onClick={() => navigate("/book-appointment")} 
                className="p-0 ms-2"
              >
                Book an appointment
              </Button>
            </Alert>
          ) : (
            !error && (
              <div className="table-responsive">
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Doctor</th>
                      <th>Date & Time</th>
                      <th>Symptoms</th>
                      <th>Status</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(appointments) && appointments.map(appointment => {
                      const doctor = findDoctorById(appointment.doctor);
                      return (
                        <tr key={appointment._id}>
                          <td>
                            <div className="d-flex align-items-center">
                              {doctor?.photo && (
                                <img 
                                  src={doctor.photo} 
                                  alt={doctor.name}
                                  className="rounded-circle me-2"
                                  style={{ width: "30px", height: "30px", objectFit: "cover" }}
                                />
                              )}
                              <div>
                                <div>{doctor?.name || "Unknown Doctor"}</div>
                                <small className="text-muted">{doctor?.specialization}</small>
                              </div>
                            </div>
                          </td>
                          <td>{formatDate(appointment.appointmentDate)}</td>
                          <td>{appointment.symptoms || "Not specified"}</td>
                          <td>{getStatusBadge(appointment.status)}</td>
                          <td>₹{appointment.ticketPrice}</td>
                          <td>
                            {appointment.status !== "cancelled" && appointment.status !== "completed" && (
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleCancelAppointment(appointment._id)}
                                disabled={cancelling === appointment._id}
                              >
                                {cancelling === appointment._id ? (
                                  <Spinner animation="border" size="sm" />
                                ) : (
                                  "Cancel"
                                )}
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            )
          )}
          
          {/* Show debug panel in development mode */}
          {process.env.NODE_ENV === 'development' && !error && renderDebugPanel()}
        </Card.Body>
        <Card.Footer className="bg-light">
          <Button variant="primary" onClick={() => navigate("/book-appointment")}>
            Book New Appointment
          </Button>
          <Button variant="secondary" className="ms-2" onClick={() => navigate("/my-account")}>
            Back to Profile
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default MyAppointments;