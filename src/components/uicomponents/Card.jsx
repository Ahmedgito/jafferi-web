import React from "react";

const Card = ({ heading, paragraph, image }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      <div className="relative flex w-full max-w-xs flex-col rounded-xl bg-white shadow-md md:max-w-sm lg:max-w-md">
        {/* Image Section */}
        {image && (
          <div className="relative h-40 w-full overflow-hidden rounded-t-xl">
            <img
              src={image}
              alt="Card Image"
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Content Section */}
        <div className="p-6">
          <h5 className="mb-2 text-xl font-semibold text-blue-gray-900">
            {heading}
          </h5>
          <p className="text-base font-light">{paragraph}</p>
        </div>

        {/* Button Section */}
        <div className="p-6 pt-0">
          <button className="w-full rounded-lg bg-[#003505] py-3 px-6 text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg focus:opacity-85 active:opacity-85 disabled:pointer-events-none disabled:opacity-50">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
