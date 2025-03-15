import React from "react";
import PButton from "../../components/uicomponents/PButton.jsx";

const UserCard = ({ user, onContactClick, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-transparent backdrop-blur-sm bg-opacity-30 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 border-t-4 border-green-700 relative">
        
        {/* Close Button */}
        <button 
          className="absolute top-3 right-3 bg-red-600 text-white text-sm w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-500 transition"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Profile Heading */}
        <h2 className="text-2xl font-bold text-center text-green-800 mb-4">
          Profile
        </h2>

        {/* User Details */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-xl">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <h3 className="text-lg font-semibold text-black">{user.name}</h3>
          <p className="text-gray-600 text-sm">{user.email}</p>
          <p className="text-gray-800 font-medium text-sm">{user.JobTitle}</p>
        </div>

        {/* Contact Button */}
        <div className="mt-5 flex justify-center">
          <button onClick={onContactClick}>
            <PButton />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
