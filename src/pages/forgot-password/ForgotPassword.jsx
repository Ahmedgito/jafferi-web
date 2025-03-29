import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/auth/forgot-password`, { email });
            if (response.status === 200) {
                setSuccess(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.error_message || "Failed to send reset link");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                    <input
                        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                    {success && <p className="text-green-500 text-xs">{success}</p>}
                    <button
                        className="py-2 px-4 bg-[#003505] hover:bg-green-800 text-white w-full rounded-lg font-semibold mt-3"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
                <div className="text-center mt-4">
                    <button className="text-sm text-gray-500 hover:text-gray-600" onClick={() => navigate("/signin")}>
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;