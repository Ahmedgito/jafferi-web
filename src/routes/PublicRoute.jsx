import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
    const isAuthenticated = useSelector(state => state.auth?.isAuthenticated);
    return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
