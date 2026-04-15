'use client';

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const Stats = () => {
    const [chartData, setChartData] = useState([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const history = JSON.parse(sessionStorage.getItem('myTimeline') || '[]');

        const counts = history.reduce((acc, entry) => {
            acc[entry.type] = (acc[entry.type] || 0) + 1;
            return acc;
        }, {});

        const data = [
            { name: 'Text', value: counts['Text'] || 0 },
            { name: 'Call', value: counts['Call'] || 0 },
            { name: 'Video', value: counts['Video'] || 0 },
        ].filter(item => item.value > 0);

        setChartData(data);
    }, []);

    const COLORS = ['#8b5cf6', '#244d3f', '#10b981'];

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-[#244d3f]">Friendship Analytics</h1>

                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-700 mb-6">By Interaction Type</h2>

                    <div className="h-[300px] w-full">
                        {chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={110}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex justify-center items-center h-full text-gray-400">
                                No interaction data to display yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;