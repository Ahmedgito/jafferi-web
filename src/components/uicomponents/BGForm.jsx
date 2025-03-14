import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const BGContactForm = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("Send Message");
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const apiUrl = import.meta.env.VITE_API_URL;
  const { token } = useSelector((state) => state.auth);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email address";
    }
    if (!formData.message.trim()) tempErrors.message = "Message cannot be empty";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("Submitting...");
    try {
      await axios.post(
          `${apiUrl}/issues/business-groups`,
          {
            receiver_id: user.user_id,
            full_name: formData.name,
            email: formData.email,
            description: formData.message,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );

      setStatus("Submitted");
      setSuccessMessage("Your message has been sent successfully!");

      setTimeout(() => {
        setSuccessMessage("");
        setStatus("Send Message");
        onClose();
      }, 3000);
    } catch (error) {
      setStatus("Send Message");
    }
  };

  return (
      <div className="fixed inset-0 backdrop-blur-sm bg-transparent bg-opacity-10 flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-center text-black">Contact {user.title}</h2>

          {successMessage && (
              <div className="bg-green-100 text-green-700 p-3 rounded-md text-center mb-4">
                {successMessage}
              </div>
          )}

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-gray-700">Your Name</label>
              <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Your Email</label>
              <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Message</label>
              <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="4"
                  placeholder="Write your message"
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </div>

            <button
                type="submit"
                className={`w-full text-white py-2 rounded-lg transition-all duration-300 ${
                    status === "Submitted" ? "bg-green-600" : "bg-green-800 hover:bg-green-900"
                }`}
                disabled={status === "Submitting..."}
            >
              {status}
            </button>
          </form>

          <button className="mt-4 w-full bg-gray-300 py-2 rounded-lg" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
  );
};

export default BGContactForm;
