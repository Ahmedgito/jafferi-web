import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Admin = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    const { token } = useSelector((state) => state.auth);
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchData = async (endpoint) => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}${endpoint}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (endpoint.includes("get-all-users")) {
                setData(response.data.users || []);
            } else {
                setData(response.data.data || []);
            }
        } catch (error) {
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === "helpers") fetchData("/info/get-all-users?role=helper");
        else if (activeTab === "seekers") fetchData("/info/get-all-users?role=seeker");
        else if (activeTab === "contactForms") fetchData("/contact/get-contact-form");
        else if (activeTab === "Ads") fetchData("/admin/get-all-business-network");
        else if (activeTab === "Pending-Ads") fetchData("/admin/get-business-network?status_all=pending");
        else if (activeTab === "businessGroups") fetchData("/admin/get-all-business-group");
        else if (activeTab === "pendingBusinessGroups") fetchData("/admin/get-business-group?status_all=0");
        else setData([]);
    }, [activeTab]);

    const filteredData = data.filter((item) => {
        const text = activeTab === "contactForms"
            ? `${item.first_name} ${item.last_name} ${item.email} ${item.phone_number} ${item.message}`
            : (["Ads", "Pending-Ads", "businessGroups", "pendingBusinessGroups"].includes(activeTab))
                ? `${item.title} ${item.category} ${item.status} ${item.contact_email} ${item.location}`
                : `${item.name} ${item.email} ${item.role}`;
        return text.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const renderStatusBadge = (status, type) => {
        const statusMapping = {
            "pending": { text: "Pending", color: "bg-yellow-100 text-yellow-800 border border-yellow-400", icon: "⏳" },
            "approved": { text: "Approved", color: "bg-green-100 text-green-800 border border-green-400", icon: "✅" },
            "rejected": { text: "Rejected", color: "bg-red-100 text-red-800 border border-red-400", icon: "❌" }
        };
    
        const integerStatusMapping = {
            0: { text: "Pending", color: "bg-yellow-100 text-yellow-800 border border-yellow-400", icon: "⏳" },
            1: { text: "Approved", color: "bg-green-100 text-green-800 border border-green-400", icon: "✅" },
            2: { text: "Rejected", color: "bg-red-100 text-red-800 border border-red-400", icon: "❌" }
        };
    
        const statusData = type === "Ads" ? statusMapping[status] : integerStatusMapping[status];
    
        return (
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusData?.color || "bg-gray-100 text-gray-800 border border-gray-400"}`}>
                <span>{statusData?.icon}</span>
                <span>{statusData?.text || "Unknown"}</span>
            </span>
        );
    };
    

    const handleApprove = async (id, type) => {
        const approveEndpoint = type === "businessGroups"
            ? "/admin/approve-business-group"
            : "/admin/approve-business-network";
        await axios.post(`${apiUrl}${approveEndpoint}`, { id }, { headers: { Authorization: `Bearer ${token}` } });
        setData(prev => prev.filter(item => item.id !== id));
    };

    const handleReject = async (id, type) => {
        const rejectEndpoint = type === "businessGroups"
            ? "/admin/reject-business-group"
            : "/admin/reject-business-network";

        await axios.post(`${apiUrl}${rejectEndpoint}`, { id }, { headers: { Authorization: `Bearer ${token}` } });
        setData(prev => prev.filter(item => item.id !== id));
    };

    const handleDelete = async (id, type) => {
        let rejectEndpoint = "";

        if (type === "Ads") {
            rejectEndpoint = "/admin/delete-ads";
        } else if (type === "businessGroups") {
            rejectEndpoint = "/admin/delete-business";
        } else {
            rejectEndpoint = "/admin/delete-user";
        }

        await axios.post(`${apiUrl}${rejectEndpoint}`, { id }, { headers: { Authorization: `Bearer ${token}` } });
        setData(prev => prev.filter(item => item.id !== id));
    }

    const renderTableHeaders = () => (
        <tr className="bg-white-100 border-b text-sm text-gray-600 uppercase">
            <th className="py-3 px-4">#</th>
            {activeTab === "contactForms" ? (
                <>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Message</th>
                </>
            ) : (activeTab === "Ads" || activeTab === "Pending-Ads") ? (
                <>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Contact Email</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Status</th>
                    {activeTab === "Pending-Ads" && <th className="py-3 px-4">Action</th>}
                    {activeTab === "Ads" && <th className="py-3 px-4">Action</th>}
                </>
            ):
                (activeTab === "businessGroups" || activeTab === "pendingBusinessGroups") ? (
                    <>
                        <th className="py-3 px-4">Title</th>
                        <th className="py-3 px-4">description</th>
                        <th className="py-3 px-4">website</th>
                        <th className="py-3 px-4">Status</th>
                        {activeTab === "pendingBusinessGroups" && <th className="py-3 px-4">Action</th>}
                        {activeTab === "businessGroups" && <th className="py-3 px-4">Action</th>}
                    </>
                ): (
                <>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                    <th>Action</th>
                </>
            )}
        </tr>
    );

    const renderTableRows = () => {
        if (loading) return <tr><td colSpan={6} className="text-center py-4">Loading...</td></tr>;
        if (filteredData.length === 0) return <tr><td colSpan={6} className="text-center py-4">No data found.</td></tr>;

        return filteredData.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50 text-sm">
                <td className="py-3 px-4">{index + 1}</td>
                {activeTab === "contactForms" ? (
                    <>
                        <td>{item.first_name} {item.last_name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone_number}</td>
                        <td>{item.message}</td>
                    </>
                ) : (activeTab === "Ads" || activeTab === "Pending-Ads") ? (
                    <>
                        <td>{item.title}</td>
                        <td>{item.category}</td>
                        <td>{item.contact_email}</td>
                        <td>{item.location}</td>
                        <td>{renderStatusBadge(item.status, 'Ads')}</td>
                        {activeTab === "Ads" && (
                            <td>
                                <button onClick={() => handleDelete(item.id,'Ads')} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                            </td>
                        )}
                        {activeTab === "Pending-Ads" && (
                            <td className="space-x-2">
                                <button onClick={() => handleApprove(item.id,'Ads')} className="bg-green-500 text-white px-3 py-1 rounded">Approve</button>
                                <button onClick={() => handleReject(item.id, 'Ads')} className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
                            </td>
                        )}
                    </>
                ) :(activeTab === "businessGroups" || activeTab === "pendingBusinessGroups") ? (
                        <>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{item.website}</td>
                            <td>{renderStatusBadge(item.status)}</td>
                            {activeTab === "businessGroups" && (
                                <td>
                                    <button onClick={() => handleDelete(item.id,'businessGroups')} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                                </td>
                            )}
                            {activeTab === "pendingBusinessGroups" && (
                                <td className="space-x-2">
                                    <button onClick={() => handleApprove(item.id, 'businessGroups')} className="bg-green-500 text-white px-3 py-1 rounded">Approve</button>
                                    <button onClick={() => handleReject(item.id, 'businessGroups')} className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
                                </td>
                            )}
                        </>
                    )
                    : (
                    <>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                        <td>
                            <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                        </td>
                    </>
                )}
            </tr>
        ));
    };

    return (
        <div className="min-h-screen bg-white-100 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow">
                <div className="p-4 font-bold text-xl border-b">Admin Panel</div>
                <ul className="space-y-2 p-4">
                    {["dashboard", "helpers", "seekers", "contactForms", "Ads", "Pending-Ads", 'businessGroups', 'pendingBusinessGroups'].map(tab => (
                        <li key={tab}>
                            <button
                                className={`w-full text-left px-4 py-2 rounded ${activeTab === tab ? "bg-[#003505] text-white" : "text-gray-700 hover:bg-gray-200"}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {activeTab === "dashboard" ? (
                    <div className="text-2xl font-semibold text-gray-700">Welcome to Admin Dashboard</div>
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="mb-4 border px-4 py-2 w-full rounded-md"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        
                        <div className="bg-white shadow rounded overflow-x-auto">
                            <table className="min-w-full table-auto">
                                <thead>{renderTableHeaders()}</thead>
                                <tbody>{renderTableRows()}</tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Admin;
