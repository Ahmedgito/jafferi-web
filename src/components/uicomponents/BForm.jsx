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
    image_url: [],
  });

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length + images.length > 7) {
      alert("You can upload a maximum of 7 images.");
      return;
    }

    setLoading(true);
    const uploadedImageUrls = [...formData.image_url];

    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;
      const localImagePath = `/uploads/${fileName}`;
      uploadedImageUrls.push(localImagePath);
    }

    setImages([...images, ...files]);
    setFormData((prev) => ({ ...prev, image_url: uploadedImageUrls }));
    setLoading(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length < 3) {
      alert("Please upload at least 3 images before submitting.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
          `${apiUrl}/issues/business-network`,
          { ...formData },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
      );

      console.log(response);
      alert("Ad submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to submit the ad.");
    }

    setLoading(false);
  };

  return (
      <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold text-center text-black mb-4">
            Register Your Ad
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Image Upload */}
            <div>
              <label className="block text-gray-700">Upload Images (Min: 3, Max: 7)</label>
              <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 border rounded-lg"
              />
              <p className="text-sm text-gray-500 mt-1">
                You must upload at least 3 images (Max: 7).
              </p>

              {/* Show uploaded images */}
              <div className="flex flex-wrap gap-2 mt-2">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={URL.createObjectURL(img)}
                        alt={`Uploaded ${index + 1}`}
                        className="w-16 h-16 object-cover rounded-md border"
                    />
                ))}
              </div>
            </div>

            {/* Ad Title */}
            <div>
              <label className="block text-gray-700">Ad Title</label>
              <input
                  type="text"
                  name="title"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter Ad Title"
                  onChange={handleChange}
                  required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700">Description</label>
              <textarea
                  name="description"
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="3"
                  placeholder="Enter Description"
                  onChange={handleChange}
                  required
              ></textarea>
            </div>

            {/* Category */}
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

            {/* Ad Description */}
            <div>
              <label className="block text-gray-700">Ad Description</label>
              <textarea
                  name="ad_description"
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="3"
                  placeholder="Enter Ad Description"
                  onChange={handleChange}
                  required
              ></textarea>
            </div>

            {/* Price or Offer */}
            <div>
              <label className="block text-gray-700">Price/Offer</label>
              <input
                  type="text"
                  name="price_offer"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter Price or Offer"
                  onChange={handleChange}
              />
            </div>

            {/* Contact Email */}
            <div>
              <label className="block text-gray-700">Contact Email</label>
              <input
                  type="email"
                  name="contact_email"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter Contact Email"
                  onChange={handleChange}
                  required
              />
            </div>

            {/* Contact Phone */}
            <div>
              <label className="block text-gray-700">Contact Phone</label>
              <input
                  type="tel"
                  name="contact_phone"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter Contact Number"
                  onChange={handleChange}
                  required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700">Location</label>
              <input
                  type="text"
                  name="location"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter City, State or Address"
                  onChange={handleChange}
                  required
              />
            </div>

            {/* Notice */}
            <div className="p-4 bg-gray-100 border-l-4 border-yellow-500 rounded-lg">
              <p className="text-gray-700 text-sm">
                Notice: Your ad submission will be reviewed before approval.
                Please ensure all details are accurate.
              </p>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full py-2 bg-green-800 hover:bg-green-900 text-white rounded-lg transition-all duration-300"
                disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Ad"}
            </button>
          </form>

          {/* Close Button */}
          <button className="mt-4 w-full bg-gray-300 py-2 rounded-lg" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
  );
};

export default BForm;
