import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    const primaryGreen = "#2b4a43";

    const socialLinks = [
        { name: 'Instagram', icon: '/assets/instagram.png', url: '#' },
        { name: 'Facebook', icon: '/assets/facebook.png', url: '#' },
        { name: 'Twitter', icon: '/assets/twitter.png', url: '#' },
    ];

    const legalLinks = [
        { name: 'Privacy Policy', url: '#' },
        { name: 'Terms of Service', url: '#' },
        { name: 'Cookies', url: '#' },
    ];

    return (
        <footer style={{ backgroundColor: primaryGreen }} className="w-full text-white pt-14 pb-8 mt-auto">
            
            <div className="w-[95%] md:max-w-[80%] mx-auto px-4">
                
                <div className="flex flex-col items-center text-center mb-16">
                    
                    <div className="mb-6">
                        <Image 
                            src="/assets/logo-xl.png" 
                            alt="KeenKeeper Logo" 
                            width={220} 
                            height={60} 
                            className="object-contain"
                        />
                    </div>

                    <p className="text-gray-200 max-w-2xl text-sm md:text-base leading-relaxed mb-10">
                        Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
                    </p>

                    <div className="flex flex-col items-center gap-4">
                        <h4 className="text-lg font-semibold text-gray-100">Social Links</h4>
                        <div className="flex items-center gap-5">
                            {socialLinks.map((social) => (
                                <Link key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">
                                    <Image 
                                        src={social.icon} 
                                        alt={social.name} 
                                        width={36}
                                        height={36} 
                                        className="hover:opacity-80 transition-opacity"
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-500 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-300">
                    
                    <p>&copy; 2026 KeenKeeper. All rights reserved.</p>

                    <div className="flex items-center gap-6">
                        {legalLinks.map((link) => (
                            <Link key={link.name} href={link.url} className="hover:text-white transition-colors">
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;