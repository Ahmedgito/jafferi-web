import React from "react";

const BForm = ({ onClose }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-transparent bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-center text-black mb-4">
          Register Your Ad
        </h2>
        
        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <form className="space-y-4">
            {/* Ad Image Upload */}
            <div>
              <label className="block text-gray-700">300x300 Ad Pic</label>
              <input type="file" className="w-full px-3 py-2 border rounded-lg" />
            </div>

            {/* Ad Title */}
            <div>
              <label className="block text-gray-700">Ad Title</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter Ad Title"
              />
            </div>

            {/* Ad Description */}
            <div>
              <label className="block text-gray-700">Ad Description</label>
              <textarea
                className="w-full px-3 py-2 border rounded-lg"
                rows="3"
                placeholder="Enter Ad Description"
              ></textarea>
            </div>

            {/* Notice */}
            <div className="p-4 bg-gray-100 border-l-4 border-yellow-500 rounded-lg">
              <p className="text-gray-700 text-sm">
                Notice: Your ad submission will be reviewed before approval.
                Please ensure all details are accurate.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-green-800 hover:bg-green-900 text-white rounded-lg transition-all duration-300"
            >
              Submit Ad
            </button>
          </form>
        </div>

        {/* Close Button */}
        <button
          className="mt-4 w-full bg-gray-300 py-2 rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BForm;
