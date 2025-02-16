import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Import eye icons

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const role = formData.mentorship === "Yes" ? "mentor" : formData.mentorship === "No" ? "seeker" : "helper";
    const payload = { ...formData, role };

    try {
      const response = await fetch("https://your-api-endpoint.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("Response:", result);

      if (response.ok) {
        alert("Registration successful!");
        navigate("/signin");
      } else {
        alert(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error, please try again");
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
        `}
      </style>
      <h1 className="font-bold text-5xl mt-3 mb-1 md:mt-8 md:mb-2 text-black text-center font-sans"></h1>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <h1 className="font-bold text-2xl text-[#003505] font-sans text-center">
            REGISTER NOW
          </h1>
          <div className="max-w-md mx-auto">
            {/* Input Fields */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  className="font-semibold text-sm text-gray-600 pb-1 block"
                  htmlFor="fullname"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-green-500 focus:ring-2 focus:ring-green-500"
                  type="text"
                  id="fullname"
                  required
                />
              </div>
              <div>
                <label
                  className="font-semibold text-sm text-gray-600 pb-1 block"
                  htmlFor="email"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-green-500 focus:ring-2 focus:ring-green-500"
                  type="email"
                  id="email"
                  required
                />
              </div>
              <div>
                <label
                  className="font-semibold text-sm text-gray-600 pb-1 block"
                  htmlFor="username"
                >
                  
                Open to Mentorship <span className="text-red-500">*</span>
                </label>
                <select
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-green-500 focus:ring-2 focus:ring-green-500"
                id="mentorship"
                required
              >
                <option value=""></option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
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
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full pr-10 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                    type={showPassword ? "text" : "password"}
                    id="password"
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
              </div>
            </div>

            {/* Additional Fields */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  className="font-semibold text-sm text-gray-600 pb-1 block"
                  htmlFor="number"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-green-500 focus:ring-2 focus:ring-green-500"
                  type="tel"
                  id="number"
                  required
                />
              </div>
              <div>
                <label
                  className="font-semibold text-sm text-gray-600 pb-1 block"
                  htmlFor="field"
                >
                  Industry <span className="text-red-500">*</span>
                </label>
                <select
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-green-500 focus:ring-2 focus:ring-green-500"
                  id="industry"
                  required
                >
                  <option value=""></option>
                  <option value="option1"> Agriculture, Environment & Sustainability</option>
                  <option value="option2">Arts, Communication, Media & Design</option>
                  <option value="option3">Consulting, Finance, Operations & Entrepreneurship</option>
                  <option value="option4">Education, Human Services & NonProfit                  </option>
                  <option value="option5">Government, Policy, Law & International Affairs
                  </option>
                  <option value="option6">Health & Sciences
                  </option>
                  <option value="option7">Hospitality, Sports & Recreation
                    </option>
                  <option value="option8">Technology, Engineering & Data</option>
                </select>
              </div>
            </div>

           

            <div>
              <label
                className="font-semibold text-sm text-gray-600 pb-1 block"
                htmlFor="job"
              >
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-green-500 focus:ring-2 focus:ring-green-500"
                type="text"
                id="industry"
                required
              />
            </div>

            <div>
              <label
                className="font-semibold text-sm text-gray-600 pb-1 block"
                htmlFor="summary"
              >
                Professional Summary (Optional)
              </label>
              <textarea
  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-green-500 focus:ring-2 focus:ring-green-500 resize-y"
  id="summary"
  rows="4"
  placeholder="Describe your professional background..."
></textarea>
            </div>

            {/* Submit Button */}
            <div className="mt-5">
              <button
                className="py-2 px-4 bg-green-700 hover:bg-green-900 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                type="submit"
              >
                Sign up
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
