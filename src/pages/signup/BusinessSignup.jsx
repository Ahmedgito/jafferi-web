import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

const Form2 = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    IndustryType: "",
    Description: "",
    website_url: "",
    confirmConnections: false,
  });

  const apiUrl = import.meta.env.VITE_API_URL || "https://yourapi.com"; // Change this to your actual API URL

  // 🔹 VALIDATION FUNCTION
  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Business name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.IndustryType.trim()) newErrors.IndustryType = "Industry type is required";
    if (formData.Description.length < 50 || formData.Description.length > 200)
      newErrors.Description = "Description must be between 50-200 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 HANDLE FORM INPUT CHANGES
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });

    // Clear the error for the field being edited
    if (errors[id]) {
      setErrors({ ...errors, [id]: "" });
    }
  };

  // 🔹 HANDLE FORM SUBMISSION
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/auth/business-register`, formData);

      if (response.status === 201) {
        setSuccessMessage("Registration successful! Redirecting...");
        setTimeout(() => navigate("/signin"), 2000); // Redirect after 2 seconds
      } else {
        setErrors({ general: response.data.message || "Something went wrong" });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ general: "Network error, please try again" });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
    {/* Overlapping Background */}
    <div className="relative">
      <div className="absolute top-0 left-0 w-full md:h-[500px] h-96 bg-[#003505] clip-slant -z-10"></div>
    </div>

    <h1 className="font-bold text-5xl mt-3 mb-1 md:mt-8 md:mb-2 text-black text-center font-sans"></h1>
      <form onSubmit={handleSubmit}>
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <h1 className="font-bold text-2xl text-[#003505] font-sans text-center">
          REGISTER YOUR BUSINESS NOW!
        </h1>
        <div className="max-w-md mx-auto">

          {/* Input Fields */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="businessName">
                Business Name <span className="text-red-500">*</span>
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full focus:border-green-500 focus:ring-2 focus:ring-green-500"
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>

            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="email">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full focus:border-green-500 focus:ring-2 focus:ring-green-500"
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="password">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full pr-10 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-600"
                  onClick={() => {
                    const passwordInput = document.getElementById('password');
                    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
                  }}
                >
                  <Eye size={20} />
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>

            {/* Industry Dropdown */}
            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="IndustryType">
                Industry <span className="text-red-500">*</span>
              </label>
              <select
                className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full focus:border-green-500 focus:ring-2 focus:ring-green-500"
                id="IndustryType"
                value={formData.IndustryType}
                onChange={handleChange}
              >
                <option selected disabled>Select An Option</option>
                <option value="Agriculture, Environment & Sustainability">Agriculture, Environment & Sustainability</option>
                <option value="Arts, Communication, Media & Design">Arts, Communication, Media & Design</option>
                <option value="Consulting, Finance, Operations & Entrepreneurship">Consulting, Finance, Operations & Entrepreneurship</option>
                <option value="Education, Human Services & NonProfit">Education, Human Services & NonProfit</option>
                <option value="Government, Policy, Law & International Affairs">Government, Policy, Law & International Affairs</option>
                <option value="Health & Sciences">Health & Sciences</option>
                <option value="Hospitality, Sports & Recreation">Hospitality, Sports & Recreation</option>
                <option value="Technology, Engineering & Data">Technology, Engineering & Data</option>
              </select>
            </div>
            {errors.IndustryType && <p className="text-red-500 text-xs">{errors.IndustryType}</p>}
          </div>

          {/* New Fields */}
          <div>
            <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="description">
              Description (50-200 characters)
            </label>
            <textarea
              className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full focus:border-green-500 focus:ring-2 focus:ring-green-500"
              id="Description"
              maxLength="200"
              minLength="50"
              value={formData.Description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="website">
              Website (Optional)
            </label>
            <input
              className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full focus:border-green-500 focus:ring-2 focus:ring-green-500"
              type="url"
              id="website_url"
              value={formData.website_url}
            />
          </div>

          <div className="mt-2">
            <input
              type="checkbox"
              id="confirmConnections"
              className="mr-2"
              checked={formData.confirmConnections}
              onChange={handleChange}
            />
            <label htmlFor="confirmConnections" className="text-sm text-gray-600">
              I confirm that I am open to connections from community members
            </label>
          </div>

           {/* Submit Button */}
           <div className="mt-5">
                <button
                    className="py-2 px-4 bg-green-700 hover:bg-green-900 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg flex items-center justify-center"
                    type="submit"
                   // Disable button when loading
                >
                  Sign Up
                </button>
              </div>

              {/* Login Redirect */}
              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
                <a
                    className="text-xs text-gray-500 uppercase font-bold dark:text-gray-800 cursor-pointer hover:underline"
                    onClick={() => navigate("/signin")}
                >
                  Have an account? Log in
                </a>
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
              </div>

        </div>
      </div>
    </div>
      </form>
  </>
  );
};

export default Form2;