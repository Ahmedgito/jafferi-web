import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        console.log(token)
        // if (!token) {
        //     navigate("/");
        // }
    }, [token, navigate]);

    const validateForm = () => {
        if (!newPassword || newPassword.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/auth/reset-password`, {
                token,
                newPassword
            });

            if (response.status === 200) {
                setSuccess(response.data.message);
                setTimeout(() => navigate("/signin"), 2000);
            }
        } catch (err) {
            setError(err.response?.data?.error_message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">New Password</label>
                    <input
                        className="border rounded-lg px-3 py-2 mt-1 mb-3 text-sm w-full"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">Confirm Password</label>
                    <input
                        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                    {success && <p className="text-green-500 text-xs">{success}</p>}
                    <button
                        className="py-2 px-4 bg-[#003505] hover:bg-green-800 text-white w-full rounded-lg font-semibold mt-3"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword;
