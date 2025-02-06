import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Import eye icons

const Form = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("seeker"); // Default to "seeker"
  const [profilePic, setProfilePic] = useState(null); // State for storing profile picture
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [industry, setIndustry] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [areaOfExpertise, setAreaOfExpertise] = useState("");

  // Reset fields when userType changes
  useEffect(() => {
    setProfilePic(null);
    setFullName("");
    setEmail("");
    setUsername("");
    setPhoneNumber("");
    setIndustry("");
    setJobTitle("");
    setYearsOfExperience("");
    setAreaOfExpertise("");
  }, [userType]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file)); // Preview the image
    }
  };

  return (
    <>
      {/* Styling - Overlapping Div */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-40 bg-[#003505] clip-slant -z-10"></div>
      </div>

      <style>
        {`
          .clip-slant {
            clip-path: polygon(0 0, 100% 0, 100% 40%, 0 100%);
          }
        `}
      </style>

      {/* Form Section */}
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <h1 className="font-bold text-2xl text-[#003505] text-center">REGISTER NOW</h1>

          {/* User Type Selection */}
          <div className="flex justify-center gap-4 mt-5">
            <button
              className={`py-2 px-4 w-1/2 rounded-lg font-semibold transition ${
                userType === "seeker" ? "bg-green-700 text-white" : "bg-gray-200 text-black"
              }`}
              onClick={() => setUserType("seeker")}
            >
              Assistance Seeker
            </button>
            <button
              className={`py-2 px-4 w-1/2 rounded-lg font-semibold transition ${
                userType === "mentor" ? "bg-green-700 text-white" : "bg-gray-200 text-black"
              }`}
              onClick={() => setUserType("mentor")}
            >
              Mentor
            </button>
          </div>

          <div className="mt-5">
            {/* Profile Picture Upload */}
            <div className="flex justify-center">
              {profilePic && (
                <img
                  src={profilePic}
                  alt="Profile Preview"
                  className="mt-2 w-24 h-24 object-cover rounded-full"
                />
              )}
            </div>
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              onChange={handleProfilePicChange}
            />
          </div>

          <div className="max-w-md mx-auto">
            {/* Form Fields */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">Full Name <span className="text-red-500">*</span></label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">Email <span className="text-red-500">*</span></label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">Username <span className="text-red-500">*</span></label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {/* Password Field with Toggle */}
              <div>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">Password <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full pr-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    type={showPassword ? "text" : "password"}
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
                <label className="font-semibold text-sm text-gray-600 pb-1 block">Phone Number <span className="text-red-500">*</span></label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">Job Title <span className="text-red-500">*</span></label>
                <select
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                >
                  <option value="option1">Agriculture, Environment & Sustainability</option>
                  <option value="option2">Arts, Communication, Media & Design</option>
                  <option value="option3">Consulting, Finance, Operations & Entrepreneurship</option>
                  <option value="option4">Education, Human Services & NonProfit</option>
                  <option value="option5">⁠Government, Policy, Law & International Affairs</option>
                  <option value="option6">Health & Sciences</option>
                  <option value="option7">Hospitality, Sports & Recreation</option>
                  <option value="option8">Technology, Engineering & Data</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block">Open to Connections <span className="text-red-500">*</span></label>
              <select
                className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block">Industry <span className="text-red-500">*</span></label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                required
              />
            </div>

            {userType === "mentor" && (
              <>
                <div>
                  <label className="font-semibold text-sm text-gray-600 pb-1 block">Years of Experience <span className="text-red-500">*</span></label>
                  <input
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    type="number"
                    min="0"
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm text-gray-600 pb-1 block">Area of Expertise <span className="text-red-500">*</span></label>
                  <input
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    type="text"
                    value={areaOfExpertise}
                    onChange={(e) => setAreaOfExpertise(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block">Professional Summary (Optional)</label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                type="text"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-5">
              <button className="py-2 px-4 bg-[#003505] hover:bg-green-700 focus:ring-blue-500 text-white w-full transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" type="submit">
                Sign up
              </button>
            </div>

            {/* Login Redirect */}
            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b md:w-1/4" />
              <a className="text-xs text-gray-500 uppercase cursor-pointer hover:underline" onClick={() => navigate("/jafferi-web/signin")}>
                Have an account? Log in
              </a>
              <span className="w-1/5 border-b md:w-1/4" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
