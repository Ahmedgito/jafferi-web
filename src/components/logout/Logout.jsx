import React from 'react';
import { useDispatch } from "react-redux";
import { logout } from "../../../src/store/slices/authSlices.js";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlelogout = () => {
        dispatch(logout());
        navigate('/signin');
    };

    return <button className="block text-white p-0" onClick={handlelogout}>Logout</button>
};

export default LogoutButton;

