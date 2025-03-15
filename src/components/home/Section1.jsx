import { useNavigate } from "react-router-dom";
import phone from "../../assets/image.png";
import Homebutton from "../uicomponents/Homebutton.jsx";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Section1 = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth); // ✅ Fix: Get isAuthenticated state

  // Typewriter Effect for Guest Message
  const text =
    "Note : To gain access to the Professional Network, Businesses & Services, Virtual Clinic, and Legal Assistance, please create a user profile.";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isAuthenticated && index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [index, text, isAuthenticated]);

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
      
      {/* Main Section */}
      <div className="flex flex-col md:flex-row items-center justify-between min-h-[50vh] md:mt-2 mt-14 text-white px-8 md:px-40 py-4">
         
        {/* Left Content */}
        <div className="md:w-1/2 -mt-10">
          <h2 className="text-3xl md:text-5xl font-bold  mb-4 animate-fade-in">
            Our Mission
          </h2>
          <p className="text-lg  mb-4">
            The mission of Jaferi Alliance is to provide a platform to
            encourage professional collaboration between members of the Jaferia
            community. It’s a platform for Shia Muslims to connect and share
            resources which would benefit the members of the community in
            continuous growth.
          </p>

       

          <button onClick={() => navigate("/signup")} className="mb-1">
            <Homebutton text={"Join our network"} />
          </button>
          <br />
          <button onClick={() => navigate("/business-signup")} className="mt-1">
            <Homebutton text={"Register your Business!"} />
          </button>
        </div>

        {/* Right Image (Phone) */}
        <div className="md:w-1/3 md:mt-0 mt-2 flex justify-center">
          <div className="relative">
            <img src={phone} alt="Coming Soon" className="w-60 md:w-72" />
          </div>
        </div>
      </div>
      {!isAuthenticated && (
            <p className="text-lg md:block hidden text-center text-[#003505] mt-0 font-bold  min-h-[40px]">
              {displayText}
              <span className="animate-blink">|</span>
            </p>
          )}
    </>
  );
};

export default Section1;
