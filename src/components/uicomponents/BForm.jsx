import React, { useState } from "react";

const BForm = ({ onClose }) => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + images.length > 7) {
      alert("You can upload a maximum of 7 images.");
      return;
    }
    setImages([...images, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length < 3) {
      alert("Please upload at least 3 images before submitting.");
      return;
    }
    // Proceed with form submission (e.g., send data to backend)
    alert("Ad submitted successfully!");
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-transparent bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-center text-black mb-4">
          Register Your Ad
        </h2>

        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Ad Image Upload (Min: 3, Max: 7) */}
            <div>
              <label className="block text-gray-700">
              </label>
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
                    alt={`Ad Preview ${index + 1}`}
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
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter Ad Title"
                required
              />
            </div>

            {/* Ad Category */}
            <div>
              <label className="block text-gray-700">Category</label>
              <select className="w-full px-3 py-2 border rounded-lg" required>
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
                className="w-full px-3 py-2 border rounded-lg"
                rows="3"
                placeholder="Enter Ad Description"
                required
              ></textarea>
            </div>

            {/* Price or Offer */}
            <div>
              <label className="block text-gray-700">Price/Offer (Optional)</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter Price or Offer"
              />
            </div>

            {/* Contact Email */}
            <div>
              <label className="block text-gray-700">Contact Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter Contact Email"
                required
              />
            </div>

            {/* Contact Phone */}
            <div>
              <label className="block text-gray-700">Contact Phone</label>
              <input
                type="tel"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter Contact Number"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter City, State or Address"
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
            >
              Submit Ad
            </button>
          </form>
        </div>

        {/* Close Button */}
        <button
          className="mt-4 w-full bg-gray-300 py-2 rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BForm;
