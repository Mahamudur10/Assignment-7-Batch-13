'use client';

import React, { useState, useEffect } from 'react';

const Timeline = () => {
    const [timelineData, setTimelineData] = useState([]);

    useEffect(() => {

        const handleBeforeUnload = () => {
            sessionStorage.removeItem('myTimeline');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        const data = JSON.parse(sessionStorage.getItem('myTimeline') || '[]');
        setTimelineData(data);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const getIcon = (type) => {
        switch (type) {
            case 'Call': return '📞';
            case 'Text': return '💬';
            case 'Video': return '📹';
            default: return '🤝';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-[#244d3f]">Timeline</h1>

                <div className="mb-6">
                    <select className="border border-gray-200 rounded-lg p-2 text-sm text-gray-600 bg-white shadow-sm outline-none cursor-pointer hover:border-[#244d3f]">
                        <option>Filter timeline</option>
                        <option>Calls</option>
                        <option>Texts</option>
                        <option>Videos</option>
                    </select>
                </div>

                <div className="space-y-4">
                    {timelineData.length > 0 ? (
                        timelineData.map((entry) => (
                            <div
                                key={entry.id}
                                className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all duration-200"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full text-lg">
                                        {getIcon(entry.type)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            {entry.type} <span className="font-normal text-gray-500">with</span> {entry.name}
                                        </h3>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400 font-medium">{entry.date}</span>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                            <p className="text-gray-500">No interaction history found yet.</p>
                            <p className="text-sm text-gray-400 mt-2">Go to a friend's page and make a check-in</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Timeline;