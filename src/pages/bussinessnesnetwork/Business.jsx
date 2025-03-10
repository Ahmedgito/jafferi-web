import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import AdRegisterPopup from "../../components/uicomponents/BForm"; // Import Ad registration popup

const Business = () => {
  const [ads, setAds] = useState([]);
  const [activeAd, setActiveAd] = useState(null);
  const [showAdRegister, setShowAdRegister] = useState(false);
  const [fullSizeImage, setFullSizeImage] = useState(null); // State for full-size image
  const { token } = useSelector((state) => state.auth);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${apiUrl}/admin/get-business-network?status_all=approved`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAds(response.data);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    fetchAds();
  }, [apiUrl, token]);

  return (
      <>
        {/* Background Slant Styling */}
        <div className="relative">
          <div className="relative top-0 left-0 w-full h-20 bg-[#003505] clip-slant -z-50"></div>
        </div>

        <style>
          {`.clip-slant {
          clip-path: polygon(0 0, 100% 0, 100% 40%, 0 100%);
        }`}
        </style>

        <div className="container mx-auto p-4 relative">
          {/* Register Ad Button */}
          <div className="flex justify-center md:justify-end mt-4">
            <button
                className="w-full md:w-auto bg-[#003505] text-white p-3 mb-5 md:px-4 md:py-2 rounded-lg hover:bg-green-700 transition"
                onClick={() => setShowAdRegister(true)}
            >
              Click to register your ad
            </button>
          </div>

          <h2 className="text-4xl font-bold mb-10 font-sans text-center">
            Business Network
          </h2>

          <div className="flex flex-col justify-center md:flex-row gap-6">
            {/* Ads List */}
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              {ads.map((ad) => (
                  <button
                      key={ad.id}
                      onClick={() => setActiveAd(ad)}
                      className="flex items-center p-4 border rounded-lg shadow-md hover:bg-gray-100 transition"
                  >
                    <img
                        src={ad.images[0]}
                        alt={ad.title}
                        className="w-24 h-24 object-cover rounded-md"
                    />
                    <span className="ml-6 text-lg font-semibold">{ad.title}</span>
                  </button>
              ))}
            </div>
          </div>

          {/* Ad Details Modal */}
          {activeAd && (
              <div className="fixed inset-0 bg-transparent bg-opacity-50 z-50 backdrop-blur-lg flex justify-center items-center p-4">
                <div className="p-6 md:p-8 border rounded-lg shadow-xl bg-white max-w-lg w-full relative max-h-[80vh] overflow-y-auto">
                  <button
                      className="absolute top-3 right-3 font-bold text-gray-900 hover:text-black text-xl"
                      onClick={() => setActiveAd(null)}
                  >
                    ✕
                  </button>

                  {/* Image Carousel */}
                  <div className="flex overflow-x-auto space-x-2">
                    {activeAd.images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Ad Image ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-md border cursor-pointer"
                            onClick={() => setFullSizeImage(img)} // Open full-size image
                        />
                    ))}
                  </div>

                  <h3 className="text-2xl text-center text-[#003505] font-bold mt-4">
                    {activeAd.title}
                  </h3>

                  <p className="text-gray-500 text-sm text-center mt-1">
                    Category: <span className="font-semibold">{activeAd.category}</span>
                  </p>

                  <p className="mt-3 text-gray-600 text-lg">{activeAd.description}</p>

                  {/* Price */}
                  <p className="text-xl font-bold text-green-700 mt-4">
                    {activeAd.price}
                  </p>

                  {/* Contact Details */}
                  <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                    <p className="text-gray-700">
                      📍 <strong>Location:</strong> {activeAd.location}
                    </p>
                    <p className="text-gray-700">
                      📧 <strong>Email:</strong>{" "}
                      <a href={`mailto:${activeAd.contactEmail}`} className="text-blue-600">
                        {activeAd.contactEmail}
                      </a>
                    </p>
                    <p className="text-gray-700">
                      📞 <strong>Phone:</strong>{" "}
                      <a href={`tel:${activeAd.contactPhone}`} className="text-blue-600">
                        {activeAd.contactPhone}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
          )}

          {/* Full-Size Image Preview with Close Button */}
          {fullSizeImage && (
              <div className="fixed inset-0 flex justify-center items-center bg-transparent backdrop-blur-md bg-opacity-80 z-50">
                <button
                    className="absolute top-5 right-5 text-white text-3xl font-bold bg-[#003505] rounded-full p-2 hover:bg-gray-700 transition"
                    onClick={() => setFullSizeImage(null)}
                >
                  ✕
                </button>

                <img src={fullSizeImage} alt="Full Size Preview" className="max-w-full max-h-full" />
              </div>
          )}

          {/* Ad Registration Popup */}
          {showAdRegister && <AdRegisterPopup onClose={() => setShowAdRegister(false)} />}
        </div>
      </>
  );
};

export default Business;