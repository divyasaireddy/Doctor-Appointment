import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";
import userPlaceholder from "../../assets/images/avatar-icon.png";

const MyAccount = () => {
  const { user, token, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?._id || !token || !user?.role) return;

      try {
        const rolePath = user.role === "doctor" ? "doctors" : "users";

        const response = await fetch(`http://localhost:5001/api/v1/${rolePath}/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setUpdatedUser(data.data);
        } else {
          setError("Failed to fetch user data.");
        }
      } catch (err) {
        setError("An error occurred while fetching user data.");
      }
    };

    fetchUserProfile();
  }, [user?._id, token, user?.role]);

  const handleInputChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUpdatedUser({ ...updatedUser, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    if (!user?._id || !token || !user?.role) {
      alert("User authentication error. Please log in again.");
      return;
    }

    try {
      const rolePath = user.role === "doctor" ? "doctors" : "users";

      const response = await fetch(`http://localhost:5001/api/v1/${rolePath}/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: updatedUser.name,
          phone: updatedUser.phone,
          photo: updatedUser.photo,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update profile");

      setUpdatedUser(data.data);
      dispatch({ type: "UPDATE_PROFILE", payload: data.data });
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed:", error);
      alert("Failed to update profile.");
    }
  };

  const navigateToAppointments = () => {
    navigate("/my-appointments");
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setTimeout(() => {
      navigate("/home");
    });
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-lg p-4">
        <Row className="align-items-center">
          <Col md={3} className="text-center">
            <img
              src={updatedUser?.photo || userPlaceholder}
              alt="User"
              className="rounded-circle img-fluid"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            {editMode && <Form.Control type="file" accept="image/*" onChange={handleImageUpload} className="mt-2" />}
          </Col>
          <Col md={9}>
            <h3 className="fw-bold">{updatedUser?.name || "User Name"}</h3>
            <p className="text-muted">{updatedUser?.email}</p>
          </Col>
        </Row>

        <hr />

        {error && <p className="text-danger">{error}</p>}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={updatedUser?.name || ""}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={updatedUser?.phone || ""}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </Form.Group>

          {editMode ? (
            <Button variant="success" onClick={handleSaveChanges} className="me-2">
              Save Changes
            </Button>
          ) : (
            <Button variant="primary" onClick={() => setEditMode(true)} className="me-2">
              Edit Profile
            </Button>
          )}

          <Button variant="info" className="me-2" onClick={navigateToAppointments}>
            My Appointments
          </Button>

          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default MyAccount;