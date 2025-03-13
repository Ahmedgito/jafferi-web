import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

const Form2 = () => {
  

  return (
    <>
    {/* Overlapping Background */}
    <div className="relative">
      <div className="absolute top-0 left-0 w-full md:h-[500px] h-96 bg-[#003505] clip-slant -z-10"></div>
    </div>
  
    <h1 className="font-bold text-5xl mt-3 mb-1 md:mt-8 md:mb-2 text-black text-center font-sans"></h1>
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
                id="businessName"
              />
            </div>
  
            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="email">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full focus:border-green-500 focus:ring-2 focus:ring-green-500"
                type="email"
                id="email"
              />
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
            </div>
  
            {/* Industry Dropdown */}
            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="IndustryType">
                Industry <span className="text-red-500">*</span>
              </label>
              <select
                className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full focus:border-green-500 focus:ring-2 focus:ring-green-500"
                id="IndustryType"
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
          </div>
  
          {/* New Fields */}
          <div>
            <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="description">
              Description (50-200 characters)
            </label>
            <textarea
              className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full focus:border-green-500 focus:ring-2 focus:ring-green-500"
              id="description"
              maxLength="200"
              minLength="50"
            ></textarea>
          </div>
  
          <div>
            <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="website">
              Website (Optional)
            </label>
            <input
              className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full focus:border-green-500 focus:ring-2 focus:ring-green-500"
              type="url"
              id="website"
            />
          </div>
  
          <div className="mt-2">
            <input
              type="checkbox"
              id="confirmConnections"
              className="mr-2"
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
  </>
  );
};

export default Form2;