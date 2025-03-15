import React, { useEffect, useState } from "react";
import PButton from "../../components/uicomponents/PButton.jsx";
import axios from "axios";
import ContactForm from "../../components/uicomponents/BGForm.jsx";
import UserCard from "../../components/uicomponents/UserCard.jsx"; // Import Profile Card

const BusinessGroup = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [showContactForm, setShowContactForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [businessGroups, setBusinessGroups] = useState([]);

    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchBusinessGroups = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/admin/get-business-group?status_all=1`);
            setBusinessGroups(response.data.data || []);
        } catch (error) {
            console.error("Error fetching business groups:", error);
            setBusinessGroups([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBusinessGroups();
    }, []);

    return (
        <div className="relative w-full min-h-screen flex flex-col items-center">
            {/* Background Slant Styling */}
            <div className="absolute top-0 left-0 w-full h-80 bg-[#003505] clip-slant -z-10"></div>
            <style>{`.clip-slant { clip-path: polygon(0 0, 100% 0, 100% 40%, 0 100%); }`}</style>

            {/* Main Container */}
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg border-2 border-[#003505] mt-24 p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-center text-black mb-6">Business Directory</h2>

                {loading ? (
                    <p className="text-center py-6 text-gray-600">Loading...</p>
                ) : businessGroups.length === 0 ? (
                    <p className="text-center py-6 text-gray-600">No business groups found.</p>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden sm:block max-h-[450px] overflow-y-auto">
                            <table className="w-full border-collapse">
                                <thead className="sticky top-0 bg-gray-200 z-10">
                                    <tr className="border-b border-gray-300">
                                        <th className="p-3 text-left text-black font-semibold">Name</th>
                                        <th className="p-3 text-left text-black font-semibold">Description</th>
                                        <th className="p-3 text-left text-black font-semibold">Website</th>
                                        <th className="p-3 text-center text-black font-semibold">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {businessGroups.map((group, index) => (
                                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 transition">
                                            <td className="p-3 text-gray-800">{group.title}</td>
                                            <td className="p-3 text-gray-700">{group.description}</td>
                                            <td className="p-3 text-blue-600">
                                                {group.website ? (
                                                    <a href={group.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                        {group.website}
                                                    </a>
                                                ) : (
                                                    "N/A"
                                                )}
                                            </td>
                                            <td className="p-3 text-center">
                                                <button onClick={() => setSelectedUser(group)}>
                                                    <PButton />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="block sm:hidden p-4 space-y-4 max-h-[450px] overflow-y-auto">
                            {businessGroups.map((group, index) => (
                                <div key={index} className="bg-white border border-gray-300 p-5 rounded-lg shadow-md hover:shadow-lg transition">
                                    <h3 className="text-lg font-semibold text-gray-900">{group.title}</h3>
                                    <p className="text-gray-700 text-sm mt-1">{group.description}</p>
                                    <p className="text-blue-600 text-sm mt-2">
                                        {group.website ? (
                                            <a href={group.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                {group.website}
                                            </a>
                                        ) : (
                                            "N/A"
                                        )}
                                    </p>
                                    <div className="mt-3 flex justify-end">
                                        <button onClick={() => setSelectedUser(group)}>
                                            <PButton />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Profile Card Modal */}
            {selectedUser && !showContactForm && (
                <UserCard
                    user={{
                        name: selectedUser.title,
                        email: selectedUser.email || "Not Provided",
                        JobTitle: selectedUser.description,
                    }}
                    onContactClick={() => setShowContactForm(true)}
                    onClose={() => setSelectedUser(null)}
                />
            )}

            {/* Contact Form Modal */}
            {showContactForm && <ContactForm user={selectedUser} onClose={() => setShowContactForm(false)} />}
        </div>
    );
};

export default BusinessGroup;
