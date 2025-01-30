import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Import eye icons

const Form = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
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
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
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
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
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
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  type="text"
                  id="username"
                  required
                />
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
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full pr-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
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
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
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
                  Job Title <span className="text-red-500">*</span>
                </label>
                <select
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  id="field"
                  required
                >
                  <option value="">Select</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Engineer">Engineer</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label
                className="font-semibold text-sm text-gray-600 pb-1 block"
                htmlFor="connection"
              >
                Open to Connections <span className="text-red-500">*</span>
              </label>
              <select
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                id="connection"
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div>
              <label
                className="font-semibold text-sm text-gray-600 pb-1 block"
                htmlFor="industry"
              >
                Industry <span className="text-red-500">*</span>
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
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
              <input
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                type="text"
                id="summary"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-5">
              <button
                className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                type="submit"
              >
                Sign up
              </button>
            </div>

            {/* Login Redirect */}
            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
              <a
                className="text-xs text-gray-500 uppercase dark:text-gray-800 cursor-pointer hover:underline"
                onClick={() => navigate("/jafferi-web/signin")}
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
