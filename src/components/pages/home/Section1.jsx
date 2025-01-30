import phone from '../../../assets/image.png';

const Section1 = () => {
  return (
    <>
      {/* Overlapping Background */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full md:h-[500px] h-96 bg-[#003505] clip-slant -z-10"></div>
      </div>

      <style>
        {`
          .clip-slant {
            clip-path: polygon(0 0, 100% 0, 100% 70%, 0 100%);
          }
        `}
      </style>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row items-center justify-between min-h-[50vh]  text-white px-8 md:px-20 py-4">
        {/* Left Content */}
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mission</h2>
          <p className="text-lg mb-6">
            The mission of Jaferi Alliance is to provide a platform to encourage professional collaboration between members of the Jaferia community. It’s a platform for Shia Muslims to connect and share resources which would benefit the members of the community in continuous growth.
          </p>
          <button className="px-6 py-2 border-2 border-[#003505] mb-5 bg-white text-black rounded-md hover:bg-gray-200 transition">
            Join our Network
          </button>
        </div>

        {/* Right Image (Phone) */}
        <div className="md:w-1/3 flex justify-center">
          <div className="relative">
            <img src={phone} alt="Coming Soon" className="w-60 md:w-72 " />
        
          </div>
        </div>
      </div>
    </>
  );
};

export default Section1;
