import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/contact/contact-form`, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: formData.phoneNumber,
        subject: formData.subject,
        message: formData.message,
      });

      if (response.status === 201) {
        setSuccessMessage("Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          subject: "",
          message: "",
        });
      } else {
        setErrors({ general: response.data.message || "Something went wrong" });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ general: "Network error, please try again" });
    } finally {
      setIsLoading(false);
    }
  };

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
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .fade-in {
            animation: fadeIn 0.5s ease-in-out;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-left-color: #003505;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            animation: spin 1s linear infinite;
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

            {/* Success Message */}
            {successMessage && (
                <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg fade-in">
                  {successMessage}
                </div>
            )}

            {/* General Error Message */}
            {errors.general && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg fade-in">
                  {errors.general}
                </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className={`w-full border-b border-gray-400 focus:outline-none focus:border-gray-500 text-sm py-2 ${
                          errors.firstName ? "border-red-500" : ""
                      }`}
                  />
                  {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className={`w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 text-sm py-2 ${
                          errors.lastName ? "border-red-500" : ""
                      }`}
                  />
                  {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className={`w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 text-sm py-2 ${
                          errors.email ? "border-red-500" : ""
                      }`}
                  />
                  {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Phone Number</label>
                  <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className={`w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 text-sm py-2 ${
                          errors.phoneNumber ? "border-red-500" : ""
                      }`}
                  />
                  {errors.phoneNumber && (
                      <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                  )}
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
                        value="General Inquiry"
                        checked={formData.subject === "General Inquiry"}
                        onChange={handleChange}
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
                        value="Support"
                        checked={formData.subject === "Support"}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        className="form-radio text-green-600"
                    />
                    <span className="text-sm">Support</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="subject"
                        value="Feedback"
                        checked={formData.subject === "Feedback"}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        className="form-radio text-green-600"
                    />
                    <span className="text-sm">Feedback</span>
                  </label>
                </div>
                {errors.subject && (
                    <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                )}
              </div>

              {/* Message Field */}
              <div className="mt-6">
                <label className="text-sm font-medium">Message</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className={`w-full border-b border-gray-300 focus:outline-none focus:border-gray-500 text-sm py-2 ${
                        errors.message ? "border-red-500" : ""
                    }`}
                    placeholder="Write your message..."
                ></textarea>
                {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              {/* Send Message Button */}
              <div className="mt-6">
                <button
                    type="submit"
                    className="px-6 py-2 bg-green-900 text-white rounded-lg w-full hover:bg-green-700 flex items-center justify-center"
                    disabled={isLoading}
                >
                  {isLoading ? (
                      <div className="spinner"></div>
                  ) : (
                      "Send Message"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
  );
};

export default ContactForm;