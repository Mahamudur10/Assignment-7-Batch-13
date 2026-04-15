'use client';

import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';

const Banner = () => {
    const [friends, setFriends] = useState([]);
    const primaryGreen = "#2b4a43";

    useEffect(() => {
        fetch('/friends.json')
            .then((res) => res.json())
            .then((data) => setFriends(data))
            .catch((err) => console.error("Error loading friends:", err));
    }, []);

    const totalFriends = friends.length;
    const onTrack = friends.filter(f => f.status === 'on-track').length;
    const needAttention = friends.filter(f => f.status === 'overdue' || f.status === 'almost due').length;

    const interactions = friends.filter(f => f.days_since_contact <= 30).length;

    const summaryCards = [
        { label: 'Total Friends', count: totalFriends },
        { label: 'On Track', count: onTrack },
        { label: 'Need Attention', count: needAttention },
        { label: 'Interactions This Month', count: interactions },
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