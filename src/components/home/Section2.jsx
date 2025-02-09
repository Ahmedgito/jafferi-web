import React from 'react';
import Card from '../uicomponents/Card.jsx';

const Section2 = () => {
    return (
        <section className="py-10 bg-transparent">
        <div className="container mx-auto md:px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Virtual Clinic</h2>
                <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock.
                </p>
 
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center place-items-center">
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    </section>
    
    );
};

export default Section2;
