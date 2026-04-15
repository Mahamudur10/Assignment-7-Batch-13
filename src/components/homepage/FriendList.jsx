'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; 

const FriendList = () => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/friends.json')
            .then((res) => res.json())
            .then((data) => {
                setFriends(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading friends:", err);
                setLoading(false);
            });
    }, []);

    return (
        <section className="py-16 bg-gray-50">
            <div className="w-[95%] md:max-w-[65%] mx-auto">
                <h2 className="text-2xl font-bold mb-8">Your Friends</h2>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-500 font-medium">Loading your friends...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {friends.map((friend) => (
                            
                            <Link href={`/friend/${friend.id}`} key={friend.id}>
                                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                                    <div className="flex justify-center mb-4">
                                        <Image
                                            src={friend.picture}
                                            alt={friend.name}
                                            width={80}
                                            height={80}
                                            className="rounded-full object-cover"
                                        />
                                    </div>

                                    <h3 className="text-lg font-bold text-center text-gray-800">{friend.name}</h3>
                                    <p className="text-xs text-gray-500 text-center mb-4">{friend.days_since_contact} days ago</p>

                                    <div className="flex justify-center gap-2 mb-4">
                                        {friend.tags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-green-100 text-green-700 text-[10px] px-2 py-1 rounded-full uppercase font-bold"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="text-center">
                                        <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase ${friend.status === 'overdue' ? 'bg-red-100 text-red-600' :
                                            friend.status === 'almost due' ? 'bg-orange-100 text-orange-600' :
                                                'bg-green-100 text-green-700'
                                            }`}>
                                            {friend.status}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FriendList;