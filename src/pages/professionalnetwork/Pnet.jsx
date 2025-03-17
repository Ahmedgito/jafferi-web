import React, { useEffect, useState } from "react";
import PButton from "../../components/uicomponents/PButton.jsx";
import ContactForm from "../../components/uicomponents/PForm.jsx";
import UserCard from "../../components/uicomponents/UserCard.jsx";
import { useSelector } from "react-redux";
import axios from "axios";

const ProfessionalNetwork = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState("");

  const { token } = useSelector((state) => state.auth);
  const apiUrl = import.meta.env.VITE_API_URL;

  const industryTypes = [
    "Agriculture, Environment & Sustainability",
    "Arts, Communication, Media & Design",
    "Consulting, Finance, Operations & Entrepreneurship",
    "Education, Human Services & NonProfit",
    "Hospitality, Sports & Recreation",
    "Technology, Engineering & Data",
  ];

  // Fetch Users API
  const fetchUsers = async (industry = null) => {
    setLoading(true);
    try {
      const params = {};
      if (industry) {
        params.industry_type = industry;
      } else {
        params.industry_type = industryTypes;
      }

      const response = await axios.get(`${apiUrl}/info/get-users`, {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [apiUrl, token]);

  useEffect(() => {
    if (selectedIndustry) {
      fetchUsers(selectedIndustry);
    } else {
      fetchUsers();
    }
  }, [selectedIndustry]);

  return (
    <div>
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-80 bg-[#003505] clip-slant -z-10"></div>
      </div>
      <style>{`.clip-slant { clip-path: polygon(0 0, 100% 0, 100% 40%, 0 100%); }`}</style>

      <div className="w-full flex justify-center py-20 px-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#003505]">
          <h2 className="text-2xl font-bold text-center text-black py-4">
            Professional Network
          </h2>

          {/* Industry Filter */}
          <div className="px-4 py-2 flex justify-center">
            <select
              className="w-full max-w-xs p-3 border border-green-600 rounded-lg bg-white text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all duration-200 hover:shadow-lg"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
            >
              <option value="">All Industries</option>
              {industryTypes.map((industry, index) => (
                <option key={index} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <p className="text-center py-4 text-gray-600">Loading...</p>
          ) : users.length === 0 ? (
            <p className="text-center py-4 text-gray-600">No users found.</p>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden sm:block max-h-[400px] overflow-y-auto">
                <table className="w-full border-collapse">
                  <thead className="sticky top-0 bg-gray-100 z-10">
                    <tr>
                      <th className="text-center p-3 text-black font-semibold">
                        Name
                      </th>
                      <th className="text-center p-3 text-black font-semibold">
                        Job Title
                      </th>
                      <th className="p-3 text-black font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr
                        key={index}
                        className="border-t border-gray-200"
                      >
                        <td className="p-3 text-gray-800 text-center">
                          {user.name}
                        </td>
                        <td className="p-3 text-gray-800 text-center">
                          {user.JobTitle}
                        </td>
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

              {/* Mobile Cards */}
              <div className="block sm:hidden p-4 space-y-4 max-h-[400px] overflow-y-auto">
                {users.map((user, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 rounded-lg shadow flex flex-col gap-2"
                  >
                    <p className="text-lg font-semibold text-gray-800">
                      {user.name}
                    </p>
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

      {/* Show User Card */}
      {selectedUser && !showContactForm && (
        <UserCard
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onContactClick={() => setShowContactForm(true)}
        />
      )}

      {/* Show Contact Form Modal */}
      {showContactForm && (
        <ContactForm user={selectedUser} onClose={() => setShowContactForm(false)} />
      )}
    </div>
  );
};

export default ProfessionalNetwork;
