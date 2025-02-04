import React from "react";
import PButton from "../uicomponents/PButton";

const ProfessionalNetwork = () => {
  const users = [
    { name: "Abdul", email: "abd@gmail.com" },
    { name: "Ahmed", email: "ahm@gmail.com" },
    { name: "Ali", email: "ali@gmail.com" },
    { name: "Abdul", email: "abd@gmail.com" },
    { name: "Ahmed", email: "ahm@gmail.com" },
    { name: "Ali", email: "ali@gmail.com" }
  ];

  return (
    <>
      {/* Background Slant Styling */}
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

      {/* Container */}
      <div className="w-full flex justify-center py-10 px-4">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#003505]">
          <h2 className="text-2xl font-bold text-center text-black py-4">Professional Network</h2>

          {/* Table for Larger Screens */}
          <table className="w-full border-collapse hidden sm:table">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 text-black font-semibold">Username</th>
                <th className="text-left p-3 text-black font-semibold">Email</th>
                <th className="p-3 text-black font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="p-3 text-gray-800">{user.name}</td>
                  <td className="p-3 text-gray-800">{user.email}</td>
                  <td className="p-3 text-right">
                    <PButton />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Responsive Cards for Mobile */}
          <div className="block sm:hidden p-4 space-y-4">
            {users.map((user, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow flex flex-col gap-2">
                <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                <p className="text-gray-600">{user.email}</p>
                <div className="mt-2">
                  <PButton />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessionalNetwork;
