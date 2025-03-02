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

    return <button className="flex items-center gap-1 md:-mt-1 px-4 py-1 bg-[white] text-#003505 font-medium rounded-lg 
             transition duration-300 hover:bg-[#003505] hover:text-[white] hover:border-2 hover:border-white cursor-pointer border-2 border-[#003505] shadow-md" onClick={handlelogout}>Logout</button>
};

export default LogoutButton;

