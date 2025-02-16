import React, { useState } from "react";
import axios from 'axios';
import {useSelector}  from "react-redux";

const LContactForm = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    legalIssueType: "",
    specificIssue: "",
    issueDescription: "",
    relevantDates: "",
    consent: false,
    agreement: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const { token } = useSelector((state) => state.auth);

  const legalIssues = {
    "Family Law": ["Divorce", "Child Custody", "Child Support", "Adoption", "Spousal Support"],
    "Criminal Defense": ["DUI/DWI", "Drug Charges", "Assault", "Theft", "White Collar Crimes"],
    "Civil Disputes": ["Landlord-Tenant Issues", "Property Disputes", "Defamation", "Negligence"],
    "Contracts": ["Contract Drafting", "Contract Review", "Breach of Contract"],
    "Immigration": ["Visa Applications", "Green Cards", "Deportation Defense", "Citizenship Applications"],
    "Personal Injury": ["Car Accidents", "Workplace Injuries", "Medical Malpractice", "Slip and Fall"],
    "Employment Law": ["Wrongful Termination", "Workplace Harassment", "Discrimination", "Wage Disputes"],
    "Business Law": ["Business Formation", "Licensing and Compliance", "Disputes and Litigation", "Intellectual Property"],
    "Real Estate Law": ["Purchase Agreements", "Lease Agreements", "Zoning Issues", "Foreclosures"],
    "Bankruptcy": ["Chapter 7 Bankruptcy", "Chapter 13 Bankruptcy", "Debt Settlement"],
    "Estate Planning": ["Wills and Trusts", "Power of Attorney", "Probate"],
    "Consumer Protection": ["Fraudulent Practices", "Warranty Issues", "Identity Theft"],
    "Tax Law": ["Tax Disputes", "IRS Representation", "Tax Planning"],
    "Environmental Law": ["Land Use", "Pollution Claims", "Compliance"],
    "Education Law": ["Special Education Rights", "Disciplinary Actions", "Discrimination"],
    "Social Security/Disability Law": ["SSD Benefits Applications", "Appeals"],
    "Intellectual Property Law": ["Patents", "Trademarks", "Copyright"],
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });

    if (name === "legalIssueType") {
      setFormData((prev) => ({ ...prev, specificIssue: "" }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid email address.";
    if (!formData.phone.match(/^\d{10,15}$/)) newErrors.phone = "Invalid phone number.";
    if (!formData.legalIssueType) newErrors.legalIssueType = "Select a legal issue type.";
    if (!formData.specificIssue) newErrors.specificIssue = "Select a specific issue.";
    if (!formData.issueDescription.trim() || formData.issueDescription.length > 500)
      newErrors.issueDescription = "Description must be between 1 and 500 characters.";
    if (!formData.consent) newErrors.consent = "You must consent to proceed.";
    if (!formData.agreement) newErrors.agreement = "You must agree to proceed.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
          `${apiUrl}/issues/legal-assistance`,
          {
            receiver_id : user.id,
            full_name: formData.fullName,
            email: formData.email,
            PhoneNumber: formData.phone,
            address: formData.address,
            legal_issue: formData.legalIssueType,
            specific_issue: formData.specificIssue,
            description: formData.issueDescription,
            relevent_data: formData.relevantDates
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Replace with actual token
            },
          }
      );

      console.log("Form Submitted:", response.data);
      setSuccessMessage("Your form has been submitted successfully!");

      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 5000);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        legalIssueType: "",
        specificIssue: "",
        issueDescription: "",
        relevantDates: "",
        consent: false,
        agreement: false,
      });

    } catch (error) {
      console.error("Form Submission Error:", error);
      setErrorMessage("Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="fixed inset-0 backdrop-blur-sm bg-transparent bg-opacity-30 flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto relative">
          <h2 className="text-xl font-bold text-center text-black mb-4">Contact {user.name}</h2>

          {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded absolute top-4 left-1/2 transform -translate-x-1/2 w-11/12">
                {successMessage}
              </div>
          )}

          {errorMessage && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded absolute top-4 left-1/2 transform -translate-x-1/2 w-11/12">
                {errorMessage}
              </div>
          )}

          <div className="max-h-[70vh] overflow-y-auto pr-2 mt-4">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required placeholder="Enter your full name" />
                {errors.fullName && <p className="text-red-600">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-gray-700">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required placeholder="Enter your email" />
                {errors.email && <p className="text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-gray-700">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required placeholder="Enter your phone number" />
                {errors.phone && <p className="text-red-600">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-gray-700">Address (Optional)</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Enter your address" />
                {errors.address && <p className="text-red-600">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-gray-700">Type of Legal Issue</label>
                <select name="legalIssueType" value={formData.legalIssueType} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required>
                  <option value="">Select a Category</option>
                  {Object.keys(legalIssues).map((category) => (
                      <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.legalIssueType && <p className="text-red-600">{errors.legalIssueType}</p>}
              </div>

              {formData.legalIssueType && (
                  <div>
                    <label className="block text-gray-700">Specific Issue</label>
                    <select name="specificIssue" value={formData.specificIssue} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required>
                      <option value="">Select a Specific Issue</option>
                      {legalIssues[formData.legalIssueType].map((issue) => (
                          <option key={issue} value={issue}>{issue}</option>
                      ))}
                    </select>
                    {errors.specificIssue && <p className="text-red-600">{errors.specificIssue}</p>}
                  </div>
              )}

              <div>
                <label className="block text-gray-700">Describe the Issue</label>
                <textarea name="issueDescription" value={formData.issueDescription} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" rows="3" maxLength="500" required placeholder="Briefly describe your legal issue (Max 500 characters)"></textarea>
                {errors.issueDescription && <p className="text-red-600">{errors.issueDescription}</p>}
              </div>

              <div>
                <label className="block text-gray-700">Relevant Dates (Optional)</label>
                <input type="date" name="relevantDates" value={formData.relevantDates} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-gray-700">
                  <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} required />
                  <span>I consent to the collection and use of my information for legal assistance.</span>
                </label>
                {errors.consent && <p className="text-red-600">{errors.consent}</p>}
                <label className="flex items-center space-x-2 text-gray-700">
                  <input type="checkbox" name="agreement" checked={formData.agreement} onChange={handleChange} required />
                  <span>I agree that submitting this form does not establish an attorney-client relationship.</span>
                </label>
                {errors.agreement && <p className="text-red-600">{errors.agreement}</p>}
              </div>

              <button type="submit" className="w-full bg-green-800 text-white py-2 rounded-lg hover:bg-green-900" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>

          <button className="mt-4 w-full bg-gray-300 py-2 rounded-lg" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
  );
};

export default LContactForm;
