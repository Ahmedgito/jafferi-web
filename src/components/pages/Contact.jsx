import { Mail, MapPin, Phone } from "lucide-react";

const ContactForm = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Left Contact Info */}
      <div className="bg-[#003505] text-white p-8 rounded-lg w-full md:w-1/3 shadow-lg relative">
        <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
        <p className="text-sm mb-4">Say something to start a live chat!</p>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Phone size={18} />
            <span>+1012 3456 789</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail size={18} />
            <span>demo@gmail.com</span>
          </div>
          <div className="flex items-start space-x-2">
            <MapPin size={18} />
            <span>
              132 Dartmouth Street Boston, <br />
              Massachusetts 02156 United States
            </span>
          </div>
        </div>

       
      </div>

      {/* Right Form Section */}
      <div className="bg-white p-8 rounded-lg w-full md:w-2/3 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">First Name</label>
            <input
              type="text"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 text-sm py-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Last Name</label>
            <input
              type="text"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 text-sm py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 text-sm py-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <input
              type="text"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 text-sm py-2"
            />
          </div>
        </div>

        {/* Select Subject */}
        <div className="mt-6">
          <label className="text-sm font-medium">Select Subject?</label>
          <div className="flex space-x-4 mt-2">
            <label className="flex items-center space-x-2">
              <input type="radio" name="subject" className="form-radio text-green-600" />
              <span className="text-sm">General Inquiry</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="subject" className="form-radio text-green-600" />
              <span className="text-sm">General Inquiry</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="subject" className="form-radio text-green-600" />
              <span className="text-sm">General Inquiry</span>
            </label>
          </div>
        </div>

        {/* Message Field */}
        <div className="mt-6">
          <label className="text-sm font-medium">Message</label>
          <textarea
            className="w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 text-sm py-2"
            placeholder="Write your message..."
          ></textarea>
        </div>

        {/* Send Message Button */}
        <div className="mt-6">
          <button className="px-6 py-2 bg-green-900 text-white rounded-lg w-full hover:bg-green-700">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
