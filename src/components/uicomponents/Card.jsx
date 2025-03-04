import React from "react";
import PButton from "./PButton";

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
          <PButton/>
        </div>
      </div>
    </div>
  );
};

export default Card;
