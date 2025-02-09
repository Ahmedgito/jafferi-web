import React, { useState } from "react";

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

    // Reset specific issue when changing the legal issue type
    if (name === "legalIssueType") {
      setFormData((prev) => ({ ...prev, specificIssue: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Form submitted successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-trnasparent bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-center text-black mb-4">Contact {user.name}</h2>

        {/* Scrollable Content */}
        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required placeholder="Enter your full name" />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required placeholder="Enter your email" />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required placeholder="Enter your phone number" />
            </div>

            {/* Address (Optional) */}
            <div>
              <label className="block text-gray-700">Address (Optional)</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Enter your address" />
            </div>

            {/* Type of Legal Issue */}
            <div>
              <label className="block text-gray-700">Type of Legal Issue</label>
              <select name="legalIssueType" value={formData.legalIssueType} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required>
                <option value="">Select a Category</option>
                {Object.keys(legalIssues).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Specific Issue */}
            {formData.legalIssueType && (
              <div>
                <label className="block text-gray-700">Specific Issue</label>
                <select name="specificIssue" value={formData.specificIssue} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required>
                  <option value="">Select a Specific Issue</option>
                  {legalIssues[formData.legalIssueType].map((issue) => (
                    <option key={issue} value={issue}>
                      {issue}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Describe the Issue */}
            <div>
              <label className="block text-gray-700">Describe the Issue</label>
              <textarea name="issueDescription" value={formData.issueDescription} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" rows="3" maxLength="500" required placeholder="Briefly describe your legal issue (Max 500 characters)"></textarea>
            </div>

            {/* Relevant Dates (Optional) */}
            <div>
              <label className="block text-gray-700">Relevant Dates (Optional)</label>
              <input type="date" name="relevantDates" value={formData.relevantDates} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
            </div>

            {/* Consent & Agreement */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700">
                <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} required />
                <span>I consent to the collection and use of my information for legal assistance.</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-700">
                <input type="checkbox" name="agreement" checked={formData.agreement} onChange={handleChange} required />
                <span>I agree that submitting this form does not establish an attorney-client relationship.</span>
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-green-800 text-white py-2 rounded-lg hover:bg-green-900">
              Submit
            </button>
          </form>
        </div>

        {/* Close Button */}
        <button className="mt-4 w-full bg-gray-300 py-2 rounded-lg" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default LContactForm;
