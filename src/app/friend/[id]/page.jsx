'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { toast } from 'react-hot-toast';

const FriendDetails = () => {
    const { id } = useParams();
    const [friend, setFriend] = useState(null);

    const brandGreen = "#244d3f";

    useEffect(() => {
        fetch('/friends.json')
            .then((res) => res.json())
            .then((data) => {
                const found = data.find((f) => f.id.toString() === id);
                setFriend(found);
            });
    }, [id]);

    const handleCheckIn = (type) => {
        const newEntry = {
            id: Date.now(),
            type: type,
            name: friend.name,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        };

        const existingEntries = JSON.parse(sessionStorage.getItem('myTimeline') || '[]');
        sessionStorage.setItem('myTimeline', JSON.stringify([newEntry, ...existingEntries]));

        const toastConfig = {
            Call: { bg: '#244d3f', icon: '📞' },
            Text: { bg: '#1e40af', icon: '💬' },
            Video: { bg: '#991b1b', icon: '📹' }
        };

        const config = toastConfig[type] || { bg: brandGreen, icon: '✅' };

        toast.success(`${type} with ${friend.name} added!`, {
            style: {
                background: config.bg,
                color: '#fff',
                borderRadius: '10px'
            },
            icon: config.icon,
        });
    };

    if (!friend) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Left Column */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center flex-grow">
                        <div className="relative w-[100px] h-[100px] mx-auto mb-4">
                            <Image src={friend.picture} alt={friend.name} fill className="rounded-full object-cover" />
                        </div>
                        <h1 className="text-xl font-bold" style={{ color: brandGreen }}>{friend.name}</h1>
                        <div className="my-2 space-x-2">
                            <span className="bg-red-100 text-red-600 text-[10px] px-3 py-1 rounded-full uppercase font-bold">{friend.status}</span>
                            <span className="bg-green-100 text-green-600 text-[10px] px-3 py-1 rounded-full uppercase font-bold">Family</span>
                        </div>
                        <p className="text-gray-500 text-sm mt-3 italic">"{friend.bio}"</p>
                        <p className="text-xs text-gray-400 mt-2">Preferred: {friend.email || 'N/A'}</p>
                    </div>

                    <div className="space-y-3">
                        <button className="w-full bg-white py-3 border border-gray-100 rounded-lg text-sm font-medium hover:bg-gray-50">⏰ Snooze 2 Weeks</button>
                        <button className="w-full bg-white py-3 border border-gray-100 rounded-lg text-sm font-medium hover:bg-gray-50">📦 Archive</button>
                        <button className="w-full bg-white py-3 border border-gray-100 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50">🗑️ Delete</button>
                    </div>
                </div>

                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                            <h2 className="text-3xl font-bold" style={{ color: brandGreen }}>{friend.days_since_contact}</h2>
                            <p className="text-[10px] text-gray-500 uppercase mt-1 tracking-wider font-semibold">Days Since Contact</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                            <h2 className="text-3xl font-bold" style={{ color: brandGreen }}>{friend.goal}</h2>
                            <p className="text-[10px] text-gray-500 uppercase mt-1 tracking-wider font-semibold">Goal (Days)</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                            <h2 className="text-xl font-bold mt-1" style={{ color: brandGreen }}>Feb 27, 2026</h2>
                            <p className="text-[10px] text-gray-500 uppercase mt-1 tracking-wider font-semibold">Next Due</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
                        <div>
                            <h3 className="font-bold" style={{ color: brandGreen }}>Relationship Goal</h3>
                            <p className="text-sm text-gray-500">Connect every <span className="font-bold" style={{ color: brandGreen }}>{friend.goal} days</span></p>
                        </div>
                        <button className="px-4 py-1 border rounded-lg text-xs font-semibold hover:bg-gray-50">Edit</button>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex-grow">
                        <h3 className="font-bold mb-4" style={{ color: brandGreen }}>Quick Check-In</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
                            <button
                                onClick={() => handleCheckIn('Call')}
                                className="flex flex-row sm:flex-col items-center justify-center py-4 sm:py-6 border-2 border-gray-100 rounded-xl hover:border-[#244d3f] hover:bg-gray-50 transition-all duration-200 cursor-pointer active:scale-95 gap-4 sm:gap-2"
                            >
                                <Image src="/assets/call.png" alt="Call" width={30} height={30} />
                                <span className="text-xs font-semibold" style={{ color: brandGreen }}>Call</span>
                            </button>

                            
                            <button
                                onClick={() => handleCheckIn('Text')}
                                className="flex flex-row sm:flex-col items-center justify-center py-4 sm:py-6 border-2 border-gray-100 rounded-xl hover:border-[#244d3f] hover:bg-gray-50 transition-all duration-200 cursor-pointer active:scale-95 gap-4 sm:gap-2"
                            >
                                <Image src="/assets/text.png" alt="Text" width={30} height={30} />
                                <span className="text-xs font-semibold" style={{ color: brandGreen }}>Text</span>
                            </button>

                            <button
                                onClick={() => handleCheckIn('Video')}
                                className="flex flex-row sm:flex-col items-center justify-center py-4 sm:py-6 border-2 border-gray-100 rounded-xl hover:border-[#244d3f] hover:bg-gray-50 transition-all duration-200 cursor-pointer active:scale-95 gap-4 sm:gap-2"
                            >
                                <Image src="/assets/video.png" alt="Video" width={30} height={30} />
                                <span className="text-xs font-semibold" style={{ color: brandGreen }}>Video</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FriendDetails;