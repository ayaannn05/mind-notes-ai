import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const PublicRoute = ({ children, restricted }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (restricted && user) {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default PublicRoute;