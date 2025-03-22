import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import AdRegisterPopup from "../../components/uicomponents/BForm"; // Import Ad registration popup

const Business = () => {
    const [ads, setAds] = useState([]);
    const [activeAd, setActiveAd] = useState(null);
    const [showAdRegister, setShowAdRegister] = useState(false);
    const [fullSizeImage, setFullSizeImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = useSelector((state) => state.auth);
    const apiUrl = import.meta.env.VITE_API_URL;
    const imageBaseUrl = "https://api.jaferialliance.com/uploads/";

    useEffect(() => {
        const fetchAds = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${apiUrl}/admin/get-business-network?status_all=approved`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const formattedAds =
                    response.data?.data.map((ad) => ({
                        ...ad,
                        images:
                            ad.image_url && ad.image_url.startsWith("[")
                                ? JSON.parse(ad.image_url).map((img) =>
                                      img.startsWith("http") ? img : `${imageBaseUrl}${img}`
                                  )
                                : ad.image_url && ad.image_url !== "not found"
                                ? [ad.image_url.startsWith("http") ? ad.image_url : `${imageBaseUrl}${ad.image_url}`]
                                : [],
                    })) || [];

                setAds(formattedAds);
            } catch (error) {
                console.error("Error fetching ads:", error);
            } finally {
                setLoading(false);
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

            <div className="container mx-auto p-6 relative">
                {/* Register Ad Button */}
                <div className="flex justify-center md:justify-end">
                    <button
                        className="bg-[#003505] text-white px-5 py-3 rounded-lg hover:bg-green-700 transition text-lg font-medium"
                        onClick={() => setShowAdRegister(true)}
                    >
                        + Register Your Ad
                    </button>
                </div>

                <h2 className="text-4xl font-bold my-10 text-center text-gray-900">Ads & Services</h2>

                {/* Loading Spinner */}
               {loading ? (
    <div className="flex justify-center items-center mt-10">
        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-600 text-lg">Fetching Ads...</span>
    </div>
) : (
    <div className="flex flex-wrap justify-center gap-6">
        {ads.map((ad) => (
            <button
                key={ad.id}
                onClick={() => setActiveAd(ad)}
                className="flex items-center p-4 border border-gray-300 rounded-lg shadow-md hover:bg-gray-50 transition w-80"
            >
                <img
                    src={ad.images?.length > 0 ? ad.images[0] : "https://placehold.co/300?text=No+Image"}
                    alt={ad.title}
                    className="w-24 h-24 object-cover rounded-md border border-gray-300"
                />
                <span className="ml-6 text-lg font-semibold text-gray-800">{ad.title}</span>
            </button>
        ))}
    </div>
)}


                {/* Ad Details Modal */}
                {activeAd && (
                    <div className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-50 flex justify-center items-center p-4 z-50">
                        <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-lg w-full relative">
                            <button
                                className="absolute top-3 right-3 text-gray-800 hover:text-black text-2xl"
                                onClick={() => setActiveAd(null)}
                            >
                                ✕
                            </button>

                            {/* Image Carousel */}
                            {activeAd.images?.length > 0 ? (
                                <div className="flex overflow-x-auto space-x-2">
                                    {activeAd.images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`Ad Image ${index + 1}`}
                                            className="w-24 h-24 object-cover rounded-md border cursor-pointer"
                                            onClick={() => setFullSizeImage(img)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center">No images available</p>
                            )}

                            <h3 className="text-2xl text-center text-[#003505] font-bold mt-4">{activeAd.title}</h3>
                            <p className="text-gray-500 text-center text-sm mt-1">
                                <strong>Category:</strong> {activeAd.category}
                            </p>

                            <p className="mt-3 text-gray-700 text-lg">{activeAd.description}</p>

                            {/* Price */}
                            <p className="text-xl font-bold text-green-700 mt-4">Price : {activeAd.price_offer || "N/A"}</p>

                            {/* Contact Details */}
                            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                                <p className="text-gray-700">
                                    📍 <strong>Location:</strong> {activeAd.location || "N/A"}
                                </p>
                                <p className="text-gray-700">
                                    📧 <strong>Email:</strong>{" "}
                                    <a href={`mailto:${activeAd.contact_email}`} className="text-blue-600">
                                        {activeAd.contact_email || "N/A"}
                                    </a>
                                </p>
                                <p className="text-gray-700">
                                    📞 <strong>Phone:</strong>{" "}
                                    <a href={`tel:${activeAd.contact_phone}`} className="text-blue-600">
                                        {activeAd.contact_phone || "N/A"}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Enlarged Full-Size Image Modal */}
                {fullSizeImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-6">
                        <img src={fullSizeImage} alt="Full Size" className="max-w-full max-h-screen rounded-lg" />
                        <button
                            className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-gray-300"
                            onClick={() => setFullSizeImage(null)}
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* Ad Registration Popup */}
                {showAdRegister && <AdRegisterPopup onClose={() => setShowAdRegister(false)} />}
            </div>
        </>
    );
};

export default Business;
