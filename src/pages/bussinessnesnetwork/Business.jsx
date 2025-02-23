import React, { useState } from "react";

const ads = [
  {
    id: 1,
    title: "Ad One",
    image: "https://placehold.co/300",
    description: "This is a long description for Ad One. It provides detailed information about the advertisement, ensuring that the modal adjusts dynamically based on the content length without breaking the design."
  },
  {
    id: 2,
    title: "Ad Two",
    image: "https://placehold.co/300",
    description: "This is a short description."
  },
  {
    id: 3,
    title: "Ad Three",
    image: "https://placehold.co/300",
    description: "Another longer description my name is Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis pariatur velit, excepturi deleniti accusamus a est, dolores aut ex itaque hic beatae facilis labore quidem ea? Odio in maxime illum? ahmed hello im Subsequently."
  }
];

const Business = () => {
  const [activeAd, setActiveAd] = useState(null);

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

      <div className="container  mx-auto p-4 relative">
        <h2 className="text-4xl font-bold mb-10 font-sans text-center">Business Network</h2>
        <div className="flex flex-col justify-center md:flex-row gap-6">
          {/* Tabs List */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            {ads.map((ad) => (
              <button
                key={ad.id}
                onClick={() => setActiveAd(ad)}
                className="flex items-center p-4 border rounded-lg shadow-md hover:bg-gray-100 transition"
              >
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <span className="ml-6 text-lg font-semibold">{ad.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Modal Overlay with Blur */}
        {activeAd && (
          <div className="fixed inset-0 bg-transparent bg-opacity-50 z-50 backdrop-blur-lg flex justify-center items-center p-4">
            <div className="p-6 md:p-8 border rounded-lg shadow-xl bg-white max-w-lg w-full relative max-h-[80vh] overflow-y-auto">
              <button
                className="absolute top-3 right-3 font-bold text-gray-900 hover:text-black text-xl"
                onClick={() => setActiveAd(null)}
              >
                ✕
              </button>
              <img
                src={activeAd.image}
                alt={activeAd.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <h3 className="text-2xl text-center text-[#003505] font-bold mt-4">{activeAd.title}</h3>
              <p className="mt-3 text-gray-600 text-lg">{activeAd.description}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Business;
