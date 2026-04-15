'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaHome, FaClock, FaChartLine } from 'react-icons/fa';

const Navbar = () => {
    const pathname = usePathname();
    const primaryColor = "#2b4a43";

    const navLinks = [
        { name: 'Home', path: '/', icon: <FaHome /> },
        { name: 'Timeline', path: '/timeline', icon: <FaClock /> },
        { name: 'Stats', path: '/stats', icon: <FaChartLine /> },
    ];

    return (
        <nav className="w-full bg-white border-b border-gray-100 shadow-sm">
            <div className="w-[95%] md:max-w-[80%] mx-auto flex justify-between items-center px-4 md:px-8 py-3">

                <Link href="/" className="flex items-center">
                    <Image
                        src="/assets/logo.png"
                        alt="KeenKeeper Logo"
                        width={160}
                        height={45}
                        className="object-contain"
                        priority
                    />
                </Link>

                <div className="flex items-center gap-1.5 md:gap-4">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.path;
                        return (
                            <Link
                                key={link.name}
                                href={link.path}
                                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-all duration-300 ${isActive
                                        ? 'text-white shadow-md'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                style={{ backgroundColor: isActive ? primaryColor : 'transparent' }}
                            >
                                <span className={`${isActive ? 'text-white' : 'text-gray-500'} text-lg`}>
                                    {link.icon}
                                </span>
                                <span className={`hidden md:inline text-sm font-semibold ${isActive ? 'text-white' : 'text-gray-800'}`}>
                                    {link.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;