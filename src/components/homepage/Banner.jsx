import React from 'react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

const Banner = () => {
    const primaryGreen = "#2b4a43";

    const summaryCards = [
        { label: 'Total Friends', count: '10' },
        { label: 'On Track', count: '3' },
        { label: 'Need Attention', count: '6' },
        { label: 'Interactions This Month', count: '12' },
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="w-[95%] md:max-w-[65%] mx-auto text-center">

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Friends to keep close in your life
                </h1>
                <p className="text-gray-500 max-w-lg mx-auto mb-8">
                    Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
                </p>

                <button
                    style={{ backgroundColor: primaryGreen }}
                    className="inline-flex items-center gap-2 px-8 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                    <FaPlus />
                    Add a Friend
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                    {summaryCards.map((card, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-3xl font-bold text-gray-900 mb-1">{card.count}</h3>
                            <p className="text-sm text-gray-500 font-medium">{card.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Banner;