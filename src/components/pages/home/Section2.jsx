import React from 'react';
import Card from '../uicomponents/Card';

const Section2 = () => {
    return (
        <section className="py-10 bg-transparent">
            <div className="container mx-auto px-4">
                <h2 className="text-white text-2xl font-bold text-center mb-6">Our Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
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
