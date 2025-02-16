import React, {useEffect, useState} from "react";
import PButton from "../../components/uicomponents/PButton.jsx";
import ContactForm from "../../components/uicomponents/LForm.jsx";
import {useSelector} from "react-redux";
import axios from "axios"; // Import Contact Form

const Legalass = () => {
  const [selectedUser, setSelectedUser] = useState(null); // Stores selected user
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    const { token } = useSelector((state) => state.auth);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const industryTypes = [
                    "Government, Policy, Law & International Affairs"
                ];
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
      <div className="w-full flex justify-center py-14 px-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#003505]">
          <h2 className="text-2xl font-bold text-center text-black py-4">Legal Assistance</h2>
          <p className="text-sm font-bold text-left ms-2 text-gray-700 py-4"><span className="text-red-500">Disclaimer : </span>
Submitting this form does not establish an attorney-client relationship. The information provided
is for preliminary review purposes only and does not guarantee legal representation. Please
avoid sharing sensitive or confidential details unless explicitly requested by a legal professional
who you have verified.</p>
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
                                            <PButton />
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
                                        <PButton />
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

export default Legalass;
