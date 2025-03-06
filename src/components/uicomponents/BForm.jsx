import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const BForm = ({ onClose }) => {
  const { token } = useSelector((state) => state.auth);
  const apiUrl = import.meta.env.VITE_API_URL;

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    ad_description: "",
    price_offer: "",
    contact_email: "",
    contact_phone: "",
    location: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    if (files.length + images.length > 7) {
      alert("You can upload a maximum of 7 images.");
      return;
    }

    setImages([...images, ...files]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length < 3) {
      alert("Please upload at least 3 images before submitting.");
      return;
    }

    setLoading(true);
    const formDataToSend = new FormData();

    // Append text fields
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    // Append images
    images.forEach((file) => formDataToSend.append("images", file));

    try {
      const response = await axios.post(`${apiUrl}/issues/business-network`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);
      alert("Ad submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to submit the ad.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold text-center text-black mb-4">Register Your Ad</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Image Upload */}
            <div>
              <label className="block text-gray-700">Upload Images (Min: 3, Max: 7)</label>
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="w-full px-3 py-2 border rounded-lg"/>
              <p className="text-sm text-gray-500 mt-1">You must upload at least 3 images (Max: 7).</p>

              {/* Show upload ed images */}
              <div className="flex flex-wrap gap-2 mt-2">
                {images.map((img, index) => (
                    <img key={index} src={URL.createObjectURL(img)} alt={`Uploaded ${index + 1}`} className="w-16 h-16 object-cover rounded-md border"/>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700">Category</label>
              <select
                  name="category"
                  className="w-full px-3 py-2 border rounded-lg"
                  onChange={handleChange}
                  required
              >
                <option value="">-- Select Category --</option>
                <option>Real Estate</option>
                <option>Automotive</option>
                <option>Technology</option>
                <option>Services</option>
                <option>Retail</option>
                <option>Other</option>
              </select>
            </div>

            {/* Form Fields */}
            {["title", "description", "ad_description", "price_offer", "contact_email", "contact_phone", "location"].map((field, index) => (
                <div key={index}>
                  <label className="block text-gray-700">{field.replace("_", " ")}</label>
                  <input type="text" name={field} className="w-full px-3 py-2 border rounded-lg" placeholder={`Enter ${field}`} onChange={handleChange} required/>
                </div>
            ))}

            {/* Submit Button */}
            <button type="submit" className={`w-full py-2 ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-800 hover:bg-green-900"} text-white rounded-lg transition-all duration-300`} disabled={loading}>
              {loading ? "Submitting..." : "Submit Ad"}
            </button>
          </form>

          {/* Close Button */}
          <button className="mt-4 w-full bg-gray-300 py-2 rounded-lg" onClick={onClose}>Close</button>
        </div>
      </div>
  );
};

export default BForm;
