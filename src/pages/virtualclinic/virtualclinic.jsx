import React, { useEffect, useState } from "react";
import PButton from "../../components/uicomponents/PButton.jsx";
import ContactForm from "../../components/uicomponents/VForm.jsx";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../../components/uicomponents/Bloodline.jsx";
import { useNavigate } from "react-router-dom";
import NLoader from "../../components/uicomponents/Loader.jsx"

const VirtualClinic = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]); // Fix: default state as empty array
    const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const industryTypes = ["Health & Sciences"];
                const response = await axios.get(`${apiUrl}/info/get-users`, {
                    params: { industry_type: industryTypes },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUsers(response.data.users || []); // Fix: Ensure array response
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [apiUrl, token]);

    return (
        <>
            {/* Background Slant Styling */}
            <div className="relative">
                <div className="absolute top-0 left-0 w-full h-80 bg-[#003505] clip-slant -z-10"></div>
            </div>

            <style>
                {`.clip-slant {
          clip-path: polygon(0 0, 100% 0, 100% 40%, 0 100%);
        }`}
            </style>

            {/* Main Container */}
            <div className="w-full flex justify-center py-20 px-4">
            <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
          <NLoader/>
          <h2 className="text-xl font-bold text-gray-800">Coming Soon</h2>
          <p className="text-gray-600 mt-2">This section is under development.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-[#003505] text-white rounded-lg hover:bg-green-700 cursor-pointer"
          >
            Go Back Home
          </button>
        </div>
      </div>
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#003505]">
                <div className="flex flex-col items-center justify-center gap-2 mb-6">
      <h2 className="text-4xl font-extrabold text-[#003505] tracking-wide uppercase drop-shadow-md flex items-center gap-2">
        Virtual Clinic
        <span className=" mt-2 md:inline-block hidden">
         <Loader/>
        </span>
      </h2>
    </div>
                    <p className="text-sm font-bold text-left ms-2 text-gray-700 py-4">
                        <span className="text-red-500">Disclaimer: </span>
                        If you are experiencing an emergency, please call 911 or the relevant emergency services number in your region. This portal is not designed for emergencies.
                    </p>

                    {loading ? (
                        <p className="text-center py-4 text-gray-600">Loading...</p>
                    ) : users.length === 0 ? (
                        <p className="text-center py-4 text-gray-600">No users found.</p>
                    ) : (
                        <>
                            {/* Scrollable Table for Large Screens */}
                            <div className="hidden sm:block max-h-[400px] overflow-y-auto">
                                <table className="w-full border-collapse">
                                    <thead className="sticky top-0 bg-gray-100 z-10">
                                    <tr>
                                        <th className="text-center p-3 text-black font-semibold">Name</th>
                                        <th className="text-center p-3 text-black font-semibold">Email</th>
                                        <th className="p-3 text-black font-semibold"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users.map((user, index) => (
                                        <tr key={index} className="border-t border-gray-200">
                                            <td className="p-3 text-gray-800 text-center">{user.name}</td>
                                            <td className="p-3 text-gray-800 text-center">{user.email}</td>
                                            <td className="p-3 text-right">
                                                <button onClick={() => setSelectedUser(user)}>
                                                    <PButton text="Profile" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Responsive Cards for Mobile */}
                            <div className="block sm:hidden p-4 space-y-4 max-h-[400px] overflow-y-auto">
                                {users.map((user, index) => (
                                    <div key={index} className="bg-gray-100 p-4 rounded-lg shadow flex flex-col gap-2">
                                        <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                                        <p className="text-gray-600">{user.email}</p>
                                        <div className="mt-2">
                                            <button onClick={() => setSelectedUser(user)}>
                                                <PButton text="Profile" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Contact Form Modal */}
            {selectedUser && <ContactForm user={selectedUser} onClose={() => setSelectedUser(null)} />}
        </>
    );
};

export default VirtualClinic;
