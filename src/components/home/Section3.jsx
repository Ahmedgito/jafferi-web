import React, { useState } from "react";
import Nloader from "../uicomponents/Nloader";
import Card1 from "../../assets/card1.png";
import Card2 from "../../assets/card2.png";
import Card3 from "../../assets/card3.png";

const NewsEvents = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      img: Card1,
      title: "We Are Live!",
      date: "5 Mar, 2025",
      comments: "3 comments",
      description:
        " Jaferi Alliance serves as a dynamic platform to foster professional collaboration within the Jaferia community. It is designed to empower Shia Muslims by providing a space to connect, share resources, and engage in meaningful discussions that contribute to continuous growth Through insightful articles, success stories, and community-driven content, It's Live keeps members informed, inspired, and connected helping them navigate their professional journeys, discover business opportunities, and strengthen communal ties. Whether you're seeking career insights, business networking, or personal development, this blog is your gateway to a thriving, supportive community."
    },
    {
      img: Card2,
      title: "How to Get Started",
      date: "12 Mar, 2025",
      comments: "5 comments",
      description: `
        Jaferi Alliance offers three registration options to cater to different community needs:<br /><br />
        🔹 <strong>Register as a Business or Service</strong><br />
        Showcase your offerings and connect with potential clients.<br />
        <strong>How to Register:</strong> Click the 'Register Your Business' button on the homepage and complete the form.<br /><br />
        
        🔹 <strong>Register as a Mentor</strong><br />
        Guide and support others as an experienced professional.<br />
        <strong>How to Register:</strong> Click the 'Join Our Network' button and fill out the mentor registration form.<br /><br />
        
        🔹 <strong>Register as a Seeker</strong><br />
        Find career guidance, networking, and professional opportunities.<br />
        <strong>How to Register:</strong> Click the 'Join Our Network' button and select the seeker registration form.
      `
   },
    
   {
    img: Card3,
    title: "Explore the Powerful Features of Jaferi Alliance",
    date: "4 Mar, 2025",
    comments: "8 comments",
    description: `
      Jaferi Alliance is built to empower the community by offering valuable networking and support opportunities. Our platform includes:<br /><br />
      🔹 <strong>Business and Service</strong><br />
      - <strong>Ads and Services:</strong> Post ads for businesses, services, or job opportunities to reach potential clients.<br />
      - <strong>Business Network:</strong> Connect and collaborate with other business owners within the community.<br /><br />
  
      🔹 <strong>Professional Network</strong><br />
      A space where professionals from various fields can seek mentorship, guidance, and career advice from experienced seniors.<br /><br />
  
      🔹 <strong>Virtual Clinic</strong><br />
      A digital healthcare hub that connects patients with doctors, making medical assistance more accessible.<br /><br />
  
      🔹 <strong>Legal Assistance</strong><br />
      Individuals in need of legal advice can connect with experienced lawyers for guidance and support.<br /><br />
  
      Jaferi Alliance is more than a platform—it's a thriving community fostering growth, collaboration, and support for all members.
    `,
  }
  ,
  ];

  return (
    <section className="py-12 mt-10 mb-7 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="flex flex-col items-center justify-center gap-4 mb-6">
          <h2 className="text-4xl font-extrabold text-[#003505] tracking-wide uppercase drop-shadow-md flex items-center gap-4">
            News and Events
            <span className="inline-block scale-90">
              <Nloader />
            </span>
          </h2>
        </div>

        {/* Intro Text */}
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Through insightful articles, success stories, and community-driven content
        </p>

        {/* News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-[1.02] cursor-pointer"
              onClick={() => setSelectedArticle(article)}
            >
              <img
                src={article.img}
                alt="Article"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>🟢 {article.date}</span>
                  <span>💬 {article.comments}</span>
                </div>
                <h3 className="text-lg font-semibold">{article.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

{/* Full-Screen Modal */}
{selectedArticle && (
  <div className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-80 flex justify-center items-center z-50 transition-all">
    <div className="bg-white border-green-600 border-2 p-6 rounded-lg max-w-2xl w-full relative shadow-xl transform scale-100 animate-fadeIn 
                    max-h-[80vh] overflow-y-auto">
      {/* Close Button */}
      <button
        className="absolute top-1 right-1 bg-green-700 text-white text-xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-green-500 transition"
        onClick={() => setSelectedArticle(null)}
      >
        ✕
      </button>

      {/* Expanded Article Content */}
      <img
        src={selectedArticle.img}
        alt="Expanded"
        className="w-full h-64 object-cover rounded-lg"
      />
      <h2 className="text-2xl font-bold mt-4">{selectedArticle.title}</h2>
      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span>🟢 {selectedArticle.date}</span>
        <span>💬 {selectedArticle.comments}</span>
      </div>
      
      {/* Scrollable Description */}
      <div className="mt-4 text-gray-700">
        <p dangerouslySetInnerHTML={{ __html: selectedArticle.description }}></p>
      </div>
    </div>
  </div>
)}

    </section>
  );
};

export default NewsEvents;
