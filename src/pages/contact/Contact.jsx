import { Mail, MapPin, Phone } from "lucide-react";

const ContactForm = () => {
  return (
    <>
      {/* ONLY FOR STYLING ---- START ---------- */}
      <div className="relative">
        {/* Overlapping Div */}
        <div className="absolute top-0 left-0 w-full h-40 bg-[#003505] clip-slant -z-10"></div>
      </div>

      <style>
        {`
          .clip-slant {
            clip-path: polygon(0 0, 100% 0, 100% 40%, 0 100%);
          }
        `}
      </style>
      {/* ONLY FOR STYLING ---- END ---------- */}

      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-transparent p-6 md:-mt-10">
        {/* Left Contact Info */}
        <div className="bg-[#003505] text-white p-8 rounded-lg w-full md:w-1/3 shadow-lg relative border-2 border-white">
          <h2 className="text-lg font-semibold mb-2">Contact Information</h2>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Phone size={18} />
              <span>+92 322 2155556</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={18} />
              <span>myousufk87@gmail.com</span>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin size={18} />
              <span>33 Street Saadi Town, near Malir Cantt</span>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="bg-white p-8 rounded-lg w-full md:w-2/3 shadow-2xl">
          <h1 className="text-center text-3xl font-bold mb-3 text-[#003505]">
            SEND US A MESSAGE
          </h1>

          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">First Name</label>
                <input
                  type="text"
                  required
                  aria-required="true"
                  className="w-full border-b border-gray-400 focus:outline-none focus:border-gray-500 text-sm py-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  required
                  aria-required="true"
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 text-sm py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  required
                  aria-required="true"
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 text-sm py-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <input
                  type="text"
                  required
                  aria-required="true"
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 text-sm py-2"
                />
              </div>
            </div>

            {/* Select Subject */}
            <div className="mt-6">
              <label className="text-sm font-medium">Select Subject?</label>
              <div className="flex space-x-4 mt-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="subject"
                    required
                    aria-required="true"
                    className="form-radio text-green-600"
                  />
                  <span className="text-sm">General Inquiry</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="subject"
                    required
                    aria-required="true"
                    className="form-radio text-green-600"
                  />
                  <span className="text-sm">General Inquiry</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="subject"
                    required
                    aria-required="true"
                    className="form-radio text-green-600"
                  />
                  <span className="text-sm">General Inquiry</span>
                </label>
              </div>
            </div>

            {/* Message Field */}
            <div className="mt-6">
              <label className="text-sm font-medium">Message</label>
              <textarea
                required
                aria-required="true"
                className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 text-sm py-2"
                placeholder="Write your message..."
              ></textarea>
            </div>

            {/* Send Message Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-green-900 text-white rounded-lg w-full hover:bg-green-700"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
