import React, { useEffect, useState } from "react";
import PButton from "../../components/uicomponents/PButton.jsx";
import axios from "axios";

const BusinessGroup = () => {
    const [selectedUser, setSelectedUser] = useState(null);
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
        <div>
            {/* Background Slant Styling */}
            <div className="relative">
                <div className="absolute top-0 left-0 w-full h-80 bg-[#003505] clip-slant -z-10"></div>
            </div>
            <style>{`.clip-slant { clip-path: polygon(0 0, 100% 0, 100% 40%, 0 100%); }`}</style>

            <div className="w-full flex justify-center py-20 px-4">
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#003505]">
                    <h2 className="text-2xl font-bold text-center text-black py-4">All Business Groups</h2>

                    {loading ? (
                        <p className="text-center py-4 text-gray-600">Loading...</p>
                    ) : businessGroups.length === 0 ? (
                        <p className="text-center py-4 text-gray-600">No business groups found.</p>
                    ) : (
                        <>
                            {/* Desktop Table */}
                            <div className="hidden sm:block max-h-[400px] overflow-y-auto">
                                <table className="w-full border-collapse">
                                    <thead className="sticky top-0 bg-gray-100 z-10">
                                    <tr>
                                        <th className="text-center p-3 text-black font-semibold">Name</th>
                                        <th className="text-center p-3 text-black font-semibold">Description</th>
                                        <th className="text-center p-3 text-black font-semibold">Website</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {businessGroups.map((group, index) => (
                                        <tr key={index} className="border-t border-gray-200">
                                            <td className="p-3 text-gray-800 text-center">{group.title}</td>
                                            <td className="p-3 text-gray-800 text-center">{group.description}</td>
                                            <td className="p-3 text-gray-800 text-center">
                                                {group.website ? (
                                                    <a href={group.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                        {group.website}
                                                    </a>
                                                ) : (
                                                    "N/A"
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="block sm:hidden p-4 space-y-4 max-h-[400px] overflow-y-auto">
                                {businessGroups.map((group, index) => (
                                    <div key={index} className="bg-gray-100 p-4 rounded-lg shadow flex flex-col gap-2">
                                        <p className="text-lg font-semibold text-gray-800">{group.title}</p>
                                        <p className="text-gray-600">{group.description}</p>
                                        <p className="text-blue-600">
                                            {group.website ? (
                                                <a href={group.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                    {group.website}
                                                </a>
                                            ) : (
                                                "N/A"
                                            )}
                                        </p>
                                        <div className="mt-2">
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
            </div>
        </div>
    );
};

export default BusinessGroup;
