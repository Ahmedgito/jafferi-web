import React from 'react';
import Card from '../uicomponents/Card.jsx';
import Loader from '../uicomponents/Bloodline.jsx';
import Doctor1 from '../../assets/doctor1.png';
import Doctor2 from '../../assets/doctor2.png';
import Doctor3 from '../../assets/doctor3.png';

const Section2 = () => {
    return (
        <section className="py-10 bg-transparent">
        <div className="container mx-auto md:px-4">
        <div className="flex flex-col items-center justify-center gap-2 mb-6">
      <h2 className="text-4xl font-extrabold text-[#003505] tracking-wide uppercase drop-shadow-md flex items-center gap-2">
        Virtual Clinic
        <span className="inline-block">
          <Loader />
        </span>
      </h2>
    </div>
                <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                Accessible Healthcare for the Jaferia Community
                </p>
 
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center place-items-center">
            <Card
  heading="Joen Doe"
  paragraph="Discover the beauty of the outdoors with stunning landscapes and adventures."
  image={Doctor1}
/>
<Card
  heading="Adam Smith"
  paragraph="Discover the beauty of the outdoors with stunning landscapes and adventures."
  image={Doctor2}
/>
<Card
  heading="Joen Doe"
  paragraph="Discover the beauty of the outdoors with stunning landscapes and adventures."
  image={Doctor1}
/>
<Card
  heading="Sarah Larson"
  paragraph="Discover the beauty of the outdoors with stunning landscapes and adventures."
  image={Doctor3}
/>

            </div>
        </div>
    </section>
    
    );
};

export default Section2;
