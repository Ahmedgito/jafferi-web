import React from "react";

const PContactForm = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-transparent bg-opacity-10 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-center text-black">Contact {user.name}</h2>
        
        <form className="mt-4 space-y-4">
          <div>
            <label className="block text-gray-700">Your Name</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Enter your name" />
          </div>
          <div>
            <label className="block text-gray-700">Your Email</label>
            <input type="email" className="w-full px-3 py-2 border rounded-lg" placeholder="Enter your email" />
          </div>
          <div>
            <label className="block text-gray-700">Message</label>
            <textarea className="w-full px-3 py-2 border rounded-lg" rows="4" placeholder="Write your message"></textarea>
          </div>
          <button type="submit" className="w-full bg-green-800 text-white py-2 rounded-lg hover:bg-green-900">
            Send Message
          </button>
        </form>

        <button className="mt-4 w-full bg-gray-300 py-2 rounded-lg" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PContactForm;
