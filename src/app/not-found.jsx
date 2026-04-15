import Link from 'next/link';
import React from 'react';
import { FaHome } from 'react-icons/fa'; 

const NotFoundPage = () => {
    
    const primaryGreen = "#2b4a43";

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
            
            <h1 
                style={{ color: primaryGreen }} 
                className="text-[120px] font-extrabold leading-none tracking-tight"
            >
                404
            </h1>
            
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
                Page Not Found
            </h2>
            
            <p className="mt-6 text-gray-500 max-w-md mx-auto leading-relaxed">
                Looks like this friendship link is broken. The page<br />
                you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            
            
            <div className="mt-12">
                <Link 
                    href="/"
                    style={{ backgroundColor: primaryGreen }}
                    className="inline-flex items-center gap-2.5 px-6 py-2.5 text-white text-sm font-medium rounded-md hover:opacity-90 transition-opacity shadow-md"
                >
                    <FaHome className="text-base" />
                    Back to Home
                </Link>
            </div>

            <div className="fixed bottom-0 left-0 w-full h-10 bg-[#E2E8F0] border-t border-gray-300"></div>
        </div>
    );
};

export default NotFoundPage;