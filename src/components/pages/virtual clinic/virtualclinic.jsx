import React from "react";
import PButton from "../uicomponents/PButton";

const VirtualClinic = () => {
  // Example data (replace with API data)
  const users = Array.from({ length: 20 }, (_, i) => ({
    name: `User ${i + 1}`,
    email: `user${i + 1}@gmail.com`,
  }));

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

      {/* Main Container */}
      <div className="w-full flex justify-center py-10 px-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#003505]">
          <h2 className="text-2xl font-bold text-center text-black py-4">Virtual Clinic</h2>

          {/* Scrollable Table for Large Screens */}
          <div className="hidden sm:block max-h-[400px] overflow-y-auto">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-gray-100 z-10">
                <tr>
                  <th className="p-3 text-black font-semibold text-center">Username</th>
                  <th className="p-3 text-black font-semibold text-center">Email</th>
                  <th className="p-3 text-black font-semibold text-center"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="p-3 text-gray-800 text-center">{user.name}</td>
                    <td className="p-3 text-gray-800 text-center">{user.email}</td>
                    <td className="p-3 text-end">
                      <PButton />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Responsive Cards for Mobile */}
          <div className="block sm:hidden p-4 space-y-4 max-h-[400px] overflow-y-auto">
            {users.map((user, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow flex flex-col items-center gap-2">
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

export default VirtualClinic;
