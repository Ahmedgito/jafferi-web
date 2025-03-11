import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

const Form = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mentorship: "",
    PhoneNumber: "",
    IndustryType: "",
    JobTitle: "",
    Description: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const apiUrl = import.meta.env.VITE_API_URL;

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.PhoneNumber.trim()) newErrors.PhoneNumber = "Phone number is required";
    if (!formData.IndustryType.trim()) newErrors.IndustryType = "Industry type is required";
    if (!formData.JobTitle.trim()) newErrors.JobTitle = "Job title is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    // Clear the error for the field being edited
    if (errors[id]) {
      setErrors({ ...errors, [id]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true); // Start loading animation
    const role = formData.mentorship === "Yes" ? "helper" : formData.mentorship === "No" ? "seeker" : "helper";
    const payload = { ...formData, role };

    try {
      const response = await axios.post(`${apiUrl}/auth/register`, payload);

      if (response.status === 201) {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/signin");
        }, 2000); // Redirect after 2 seconds
      } else {
        setErrors({ general: response.data.message || "Something went wrong" });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ general: "Network error, please try again" });
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  return (
      <>
        {/* Overlapping Background */}
        <div className="relative">
          <div className="absolute top-0 left-0 w-full md:h-[500px] h-96 bg-[#003505] clip-slant -z-10"></div>
        </div>

        <style>
          {`
          .clip-slant {
            clip-path: polygon(0 0, 100% 0, 100% 70%, 0 100%);
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .fade-in {
            animation: fadeIn 0.5s ease-in-out;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-left-color: #003505;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            animation: spin 1s linear infinite;
          }
        `}
        </style>

        <h1 className="font-bold text-5xl mt-3 mb-1 md:mt-8 md:mb-2 text-black text-center font-sans"></h1>
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <h1 className="font-bold text-2xl text-[#003505] font-sans text-center">
              REGISTER NOW
            </h1>
            <div className="max-w-md mx-auto">
              {/* Success Message */}
              {successMessage && (
                  <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg fade-in">
                    {successMessage}
                  </div>
              )}

              {/* General Error Message */}
              {errors.general && (
                  <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg fade-in">
                    {errors.general}
                  </div>
              )}

              {/* Input Fields */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                      className="font-semibold text-sm text-gray-600 pb-1 block"
                      htmlFor="name"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                      className={`border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full focus:border-green-500 focus:ring-2 focus:ring-green-500 ${
                          errors.name ? "border-red-500" : ""
                      }`}
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                  />
                  {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label
                      className="font-semibold text-sm text-gray-600 pb-1 block"
                      htmlFor="email"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                      className={`border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full focus:border-green-500 focus:ring-2 focus:ring-green-500 ${
                          errors.email ? "border-red-500" : ""
                      }`}
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                  />
                  {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label
                      className="font-semibold text-sm text-gray-600 pb-1 block"
                      htmlFor="mentorship"
                  >
                    Open to Mentorship <span className="text-red-500">*</span>
                  </label>
                  <select
                      className={`border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full focus:border-green-500 focus:ring-2 focus:ring-green-500 ${
                          errors.mentorship ? "border-red-500" : ""
                      }`}
                      id="mentorship"
                      value={formData.mentorship}
                      onChange={handleChange}
                      required
                  >
                    <option selected disabled>Select An Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Student">Student</option>
                  </select>
                  {errors.mentorship && (
                      <p className="text-red-500 text-xs mt-1">{errors.mentorship}</p>
                  )}
                </div>

                {/* Password Field with Eye Icon */}
                <div>
                  <label
                      className="font-semibold text-sm text-gray-600 pb-1 block"
                      htmlFor="password"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                        className={`border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full pr-10 focus:border-green-500 focus:ring-2 focus:ring-green-500 ${
                            errors.password ? "border-red-500" : ""
                        }`}
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                      <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>
              </div>

              {/* Additional Fields */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                      className="font-semibold text-sm text-gray-600 pb-1 block"
                      htmlFor="PhoneNumber"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                      className={`border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full focus:border-green-500 focus:ring-2 focus:ring-green-500 ${
                          errors.PhoneNumber ? "border-red-500" : ""
                      }`}
                      type="tel"
                      id="PhoneNumber"
                      value={formData.PhoneNumber}
                      onChange={handleChange}
                      required
                  />
                  {errors.PhoneNumber && (
                      <p className="text-red-500 text-xs mt-1">{errors.PhoneNumber}</p>
                  )}
                </div>
                <div>
                  <label
                      className="font-semibold text-sm text-gray-600 pb-1 block"
                      htmlFor="IndustryType"
                  >
                    Industry <span className="text-red-500">*</span>
                  </label>
                  <select
                      className={`border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full focus:border-green-500 focus:ring-2 focus:ring-green-500 ${
                          errors.IndustryType ? "border-red-500" : ""
                      }`}
                      id="IndustryType"
                      value={formData.IndustryType}
                      onChange={handleChange}
                      required
                  >
                    <option selected disabled>Select An Option</option>
                    <option value="Agriculture, Environment & Sustainability">
                      Agriculture, Environment & Sustainability
                    </option>
                    <option value="Arts, Communication, Media & Design">
                      Arts, Communication, Media & Design
                    </option>
                    <option value="Consulting, Finance, Operations & Entrepreneurship">
                      Consulting, Finance, Operations & Entrepreneurship
                    </option>
                    <option value="Education, Human Services & NonProfit">
                      Education, Human Services & NonProfit
                    </option>
                    <option value="Government, Policy, Law & International Affairs">
                      Government, Policy, Law & International Affairs
                    </option>
                    <option value="Health & Sciences">Health & Sciences</option>
                    <option value="Hospitality, Sports & Recreation">
                      Hospitality, Sports & Recreation
                    </option>
                    <option value="Technology, Engineering & Data">
                      Technology, Engineering & Data
                    </option>
                  </select>
                  {errors.IndustryType && (
                      <p className="text-red-500 text-xs mt-1">{errors.IndustryType}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                    className="font-semibold text-sm text-gray-600 pb-1 block"
                    htmlFor="JobTitle"
                >
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                    className={`border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full focus:border-green-500 focus:ring-2 focus:ring-green-500 ${
                        errors.JobTitle ? "border-red-500" : ""
                    }`}
                    type="text"
                    id="JobTitle"
                    value={formData.JobTitle}
                    onChange={handleChange}
                    required
                />
                {errors.JobTitle && (
                    <p className="text-red-500 text-xs mt-1">{errors.JobTitle}</p>
                )}
              </div>

              <div>
                <label
                    className="font-semibold text-sm text-gray-600 pb-1 block"
                    htmlFor="Description"
                >
                  Professional Summary (Optional)
                </label>
                <textarea
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-green-500 focus:ring-2 focus:ring-green-500 resize-y"
                    id="Description"
                    rows="4"
                    value={formData.Description}
                    onChange={handleChange}
                    placeholder="Describe your professional background..."
                />
              </div>

              {/* Submit Button */}
              <div className="mt-5">
                <button
                    className="py-2 px-4 bg-green-700 hover:bg-green-900 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg flex items-center justify-center"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isLoading} // Disable button when loading
                >
                  {isLoading ? (
                      <div className="spinner"></div> // Show spinner when loading
                  ) : (
                      "Sign up"
                  )}
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
      </>
  );
};

export default Form;