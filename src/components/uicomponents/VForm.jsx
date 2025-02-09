import React, { useState } from "react";

const VContactForm = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    contactInfo: "",
    location: "",
    symptoms: "",
    duration: "",
    painRating: "",
    medicalConditions: "",
    medications: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Form submitted successfully!"); // Temporary alert for testing
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-transparent bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-center text-black mb-4">Contact {user.name}</h2>

        {/* Scrollable Content */}
        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Gender */}
            <div>
              <label className="block text-gray-700">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Age */}
            <div>
              <label className="block text-gray-700">Age</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Enter your age" />
            </div>

            {/* Contact Info */}
            <div>
              <label className="block text-gray-700">Contact Info</label>
              <input type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Phone or Email" />
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700">Location (City, State)</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Enter your city and state" />
            </div>

            {/* Symptoms */}
            <div>
              <label className="block text-gray-700">Symptoms</label>
              <textarea name="symptoms" value={formData.symptoms} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" rows="2" placeholder="Describe your symptoms"></textarea>
            </div>

            {/* Duration of Symptoms */}
            <div>
              <label className="block text-gray-700">Duration of Symptoms</label>
              <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g., 3 days, 2 weeks" />
            </div>

            {/* Pain Rating */}
            <div>
              <label className="block text-gray-700">Pain Rating (1-10)</label>
              <input type="number" name="painRating" value={formData.painRating} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" min="1" max="10" placeholder="Rate your pain level" />
            </div>

            {/* Existing Medical Conditions */}
            <div>
              <label className="block text-gray-700">Existing Medical Conditions</label>
              <textarea name="medicalConditions" value={formData.medicalConditions} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" rows="2" placeholder="List any existing conditions"></textarea>
            </div>

            {/* Active Medications and Prescriptions */}
            <div>
              <label className="block text-gray-700">Active Medications & Prescriptions</label>
              <textarea name="medications" value={formData.medications} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" rows="2" placeholder="List your medications"></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-green-800 text-white py-2 rounded-lg hover:bg-green-900">
              Submit
            </button>
          </form>
        </div>

        {/* Close Button */}
        <button className="mt-4 w-full bg-gray-300 py-2 rounded-lg" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default VContactForm;
