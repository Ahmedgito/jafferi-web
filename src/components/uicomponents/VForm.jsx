import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const VContactForm = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    contactInfo: "",
    location: "",
    symptoms: "",
    duration: "",
    painRating: "",
    medicalConditions: "",
    medications: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonText, setButtonText] = useState("Submit");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const { token } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.age || formData.age < 1 || formData.age > 120) newErrors.age = "Enter a valid age (1-120)";
    if (!formData.contactInfo) newErrors.contactInfo = "Contact info is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.symptoms) newErrors.symptoms = "Symptoms description is required";
    if (!formData.duration) newErrors.duration = "Duration is required";
    if (!formData.painRating || formData.painRating < 1 || formData.painRating > 10) newErrors.painRating = "Pain rating must be between 1-10";
    if (!formData.medicalConditions) newErrors.medicalConditions = "Medical conditions are required";
    if (!formData.medications) newErrors.medications = "Medication details are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setButtonText("Submitting...");
    setIsSubmitting(true);

    if (!validateForm()){
      setButtonText("Submit");
      setIsSubmitting(false);
      return;
    }


    try {
      const response = await axios.post(
          `${apiUrl}/issues/virtual-clinic`,
          {
            receiver_id: user.id,
            gender: formData.gender,
            age: formData.age,
            contact_info: formData.contactInfo,
            location: formData.location,
            Symptoms: formData.symptoms,
            duration_of_symptoms: formData.duration,
            pain_rating: formData.painRating,
            existing_medical_conditions: formData.medicalConditions,
            active_medications_prescriptions: formData.medications
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );

      if (response.status === 201) {
        setSuccessMessage("Form submitted successfully!");
        setButtonText("Submitted");

        setTimeout(() => {
          setSuccessMessage("");
          onClose();
        }, 3000);
      }
    } catch (error) {
      setButtonText("Submit");
      setErrorMessage("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="fixed inset-0 backdrop-blur-sm bg-transparent bg-opacity-30 flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold text-center text-black mb-4">Contact {user.name}</h2>
          <div className="max-h-[70vh] overflow-y-auto pr-2">
            {successMessage && (
                <div className="mb-4 p-2 text-center text-white bg-green-600 rounded-lg">
                  {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="mb-4 p-2 text-center text-white bg-red-600 rounded-lg">
                  {errorMessage}
                </div>
            )}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
              </div>

              <div>
                <label className="block text-gray-700">Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Enter your age" />
                {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
              </div>

              <div>
                <label className="block text-gray-700">Contact Info</label>
                <input type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Phone or Email" />
                {errors.contactInfo && <p className="text-red-500 text-sm">{errors.contactInfo}</p>}
              </div>

              <div>
                <label className="block text-gray-700">Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Enter your city and state" />
                {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-gray-700">Symptoms</label>
                <textarea name="symptoms" value={formData.symptoms} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" rows="2"></textarea>
                {errors.symptoms && <p className="text-red-500 text-sm">{errors.symptoms}</p>}
              </div>

              {/* Duration of Symptoms */}
              <div>
                <label className="block text-gray-700">Duration of Symptoms</label>
                <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g., 3 days, 2 weeks" />
                {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
              </div>

              <div>
                <label className="block text-gray-700">Pain Rating (1-10)</label>
                <input type="number" name="painRating" value={formData.painRating} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" min="1" max="10" />
                {errors.painRating && <p className="text-red-500 text-sm">{errors.painRating}</p>}
              </div>

              {/* Existing Medical Conditions */}
              <div>
                <label className="block text-gray-700">Existing Medical Conditions</label>
                <textarea name="medicalConditions" value={formData.medicalConditions} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" rows="2" placeholder="List any existing conditions"></textarea>
                {errors.medicalConditions && <p className="text-red-500 text-sm">{errors.medicalConditions}</p>}
              </div>

              {/* Active Medications and Prescriptions */}
              <div>
                <label className="block text-gray-700">Active Medications & Prescriptions</label>
                <textarea name="medications" value={formData.medications} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" rows="2" placeholder="List your medications"></textarea>
                {errors.medications && <p className="text-red-500 text-sm">{errors.medications}</p>}
              </div>


              <button
                  type="submit"
                  className={`w-full py-2 rounded-lg transition-all duration-300 ${
                      isSubmitting ? "bg-gray-500" : "bg-green-800 hover:bg-green-900"
                  } text-white`}
                  disabled={isSubmitting}
              >
                {buttonText}
              </button>
            </form>
            {successMessage && (
                <div className="mt-4 mb-4 p-2 text-center text-white bg-green-600 rounded-lg">
                  {successMessage}
                </div>
            )}
          </div>
          <button className="mt-4 w-full bg-gray-300 py-2 rounded-lg" onClick={onClose}>Close</button>
        </div>
      </div>
  );
};

export default VContactForm;
