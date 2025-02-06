import React, { useState } from "react";
import ContactForm from "../uicomponents/Form";

const ProfessionalNetwork = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const users = Array.from({ length: 20 }, (_, i) => ({
    name: `User ${i + 1}`,
    email: `user${i + 1}@gmail.com`,
  }));

  return (
    <>
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-40 bg-[#003505] clip-slant -z-10"></div>
      </div>

      <style>
        {`
          .clip-slant {
            clip-path: polygon(0 0, 100% 0, 100% 40%, 0 100%);
          }
        `}
      </style>

      {/* Main Container */}
      <div className="w-full flex justify-center py-10 px-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#003505]">
          <h2 className="text-2xl font-bold text-center text-black py-4">Professional Network</h2>

          <div className="hidden sm:block max-h-[400px] overflow-y-auto">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-gray-100 z-10">
                <tr>
                  <th className="text-center p-3 text-black font-semibold">Username</th>
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
                      <button
                        className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900"
                        onClick={() => setSelectedUser(user)}
                      >
                        Contact
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
                <button
                  className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900"
                  onClick={() => setSelectedUser(user)}
                >
                  Contact
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {selectedUser && <ContactForm user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </>
  );
};

export default ProfessionalNetwork;
