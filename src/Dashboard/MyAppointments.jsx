import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Table, Button, Badge, Card, Spinner, Alert } from "react-bootstrap";
import PayPalCheckout from '../Components/PaypalPayment/PayPalCheckout'; // ✅ NEW

const MyAppointments = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(null);
  const [paymentAppointmentId, setPaymentAppointmentId] = useState(null); // ✅ NEW

  useEffect(() => {
    if (!token) {
      console.log("No token found, redirecting to login");
      navigate("/login");
      return;
    }
    fetchAppointments();
  }, [token, navigate]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://localhost:5001/api/v1/users/get-appointments", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("text/html")) {
        const text = await response.text();
        throw new Error("Server returned HTML instead of JSON");
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch appointments");
      }

      const bookingsArray = data.data?.bookings || [];
      const doctorMap = JSON.parse(localStorage.getItem("doctorAppointmentMap") || "{}");
      const symptomsMap = JSON.parse(localStorage.getItem("appointmentSymptomsMap") || "{}");

      const enrichedAppointments = bookingsArray.map((appointment) => {
        const enrichedAppointment = { ...appointment };
        const doctorData = data.data?.doctors?.find((dr) => dr._id === appointment.doctor);

        if (!doctorData) {
          const storedDoctorInfo = doctorMap[appointment.doctor];
          enrichedAppointment.doctorInfo = storedDoctorInfo
            ? {
              _id: appointment.doctor,
              name: storedDoctorInfo.name,
              specialization: storedDoctorInfo.specialization,
            }
            : {
              _id: appointment.doctor,
              name: "Unknown Doctor",
              specialization: "Not available",
            };
        } else {
          enrichedAppointment.doctorInfo = doctorData;
        }

        if (!enrichedAppointment.symptoms || enrichedAppointment.symptoms === "Not specified") {
          const storedSymptoms = symptomsMap[appointment._id];
          if (storedSymptoms?.symptoms) {
            enrichedAppointment.symptoms = storedSymptoms.symptoms;
          }
        }

        return enrichedAppointment;
      });

      setAppointments(enrichedAppointments);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      setCancelling(appointmentId);

      const endpoints = [
        `http://localhost:5001/api/v1/users/cancel-appointment/${appointmentId}`,
        `http://localhost:5001/api/v1/appointments/${appointmentId}`,
        `http://localhost:5001/api/v1/bookings/${appointmentId}`,
        `http://localhost:5001/api/v1/users/appointments/${appointmentId}`,
      ];

      let success = false;
      let lastError = null;

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });

          if (response.status === 404) continue;

          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("text/html")) {
            lastError = new Error("Server returned HTML instead of JSON");
            continue;
          }

          const data = await response.json();
          if (!response.ok) throw new Error(data.message || "Failed to cancel appointment");

          setAppointments((prev) => prev.filter((app) => app._id !== appointmentId));
          alert("Appointment cancelled successfully");
          success = true;
          break;
        } catch (err) {
          lastError = err;
        }
      }

      if (!success) throw lastError || new Error("All cancellation endpoints failed");
    } catch (err) {
      console.error("Error cancelling appointment:", err);
      alert("Failed to cancel appointment: " + (err.message || "Unknown error"));
    } finally {
      setCancelling(null);
    }
  };

  const handlePayOnline = (appointmentId) => {
    setPaymentAppointmentId(appointmentId); // ✅ Updated
  };

  const handlePaymentSuccess = async (details) => { // ✅ New
    console.log("Payment successful!", details);
    alert("Payment completed! Updating appointment...");

    try {
      const response = await fetch(`http://localhost:5001/api/v1/appointments/mark-paid/${paymentAppointmentId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionId: details.id,
          payerEmail: details.payer.email_address,
          status: "paid",
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to update payment");

      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === paymentAppointmentId ? { ...appt, isPaid: true } : appt
        )
      );

      setPaymentAppointmentId(null);
    } catch (err) {
      console.error("Payment update failed:", err);
      alert("Payment succeeded, but backend update failed: " + err.message);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return "Invalid date";
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: "warning",
      confirmed: "success",
      cancelled: "danger",
      completed: "info",
    };
    return <Badge bg={statusMap[status] || "secondary"}>{status || "Unknown"}</Badge>;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
          <h3>My Appointments</h3>
        </Card.Header>
        <Card.Body>
          {error ? (
            <Alert variant="danger">
              <strong>Error:</strong> {error}
              <div className="mt-2">
                <Button variant="outline-primary" size="sm" onClick={fetchAppointments}>
                  Try Again
                </Button>
                <Button variant="outline-secondary" size="sm" className="ms-2" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </Alert>
          ) : appointments.length === 0 ? (
            <Alert variant="info">
              You don't have any appointments yet.
              <Button variant="link" onClick={() => navigate("/book-appointment")} className="p-0 ms-2">
                Book an appointment
              </Button>
            </Alert>
          ) : (
            <div className="table-responsive">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Cancel</th>
                    <th>Pay Online</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => {
                    const doctorInfo = appointment.doctorInfo || {};
                    return (
                      <tr key={appointment._id}>
                        <td>
                          <div className="d-flex align-items-center">
                            {doctorInfo.photo && (
                              <img
                                src={doctorInfo.photo}
                                alt={doctorInfo.name}
                                className="rounded-circle me-2"
                                style={{ width: "30px", height: "30px", objectFit: "cover" }}
                              />
                            )}
                            <div>
                              <div>{doctorInfo.name || "Unknown Doctor"}</div>
                              <small className="text-muted">{doctorInfo.specialization || "Not available"}</small>
                            </div>
                          </div>
                        </td>
                        <td>{formatDate(appointment.appointmentDate)}</td>
                        <td>{getStatusBadge(appointment.status)}</td>
                        <td>{appointment.ticketPrice}</td>
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
                        <td>
                          
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => handlePayOnline(appointment._id)}
                            >
                              Pay Online
                            </Button>
                          
                        </td>
                        {paymentAppointmentId === appointment._id && (
                          <PayPalCheckout
                            amount={appointment.ticketPrice}
                            onSuccess={handlePaymentSuccess} // ✅ Updated
                          />
                        )}

                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
        <Card.Footer className="bg-light">
          <Button variant="primary" onClick={() => navigate("/book-appointment")}>Book New Appointment</Button>
          <Button variant="secondary" className="ms-2" onClick={() => navigate("/users/profile/me")}>Back to Profile</Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default MyAppointments;
