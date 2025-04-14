import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { token, role } = useContext(AuthContext);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!role || !allowedRoles.includes(role)) {
        return <Navigate to="/users/profile/me" replace />;
    }

    return children;
};

export default ProtectedRoute;
