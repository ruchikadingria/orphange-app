import React from "react";
import { FaTwitter, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

const Footer = () => {
    const socialLinks = {
        twitter: "https://x.com/i/flow/login?redirect_after_login=%2FSujilNadar80578https://twitter.com/SujilNadar80578?t=u1ECnKCbCBEz5AsNroWjbg&s=08",
        instagram: "https://instagram.com/thangarajsujil?igshid=MzNlNGNkZWQ4Mg==",
        facebook: "https://www.facebook.com/profile.php?id=100067967426566&mibextid=ZbWKwL",
        youtube: "https://youtube.com/@blessingprayertowerministr7708",
    };

    const handleAnchorClick = (href) => {
        window.location.href = `${window.location.origin}/${href}`;
    };

    return (
        <footer className="bg-gray-900 text-gray-300 py-13 w-full mt-24">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-start px-6 md:px-12">
                {/* Logo and Client Count */}
                <div className="flex flex-col items-start">
                    <img src="/10.svg" alt="Blessings Children Home" className="w-32 mb-4" />
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Quick Link</h3>
                    <ul className="space-y-1">
                        <li>
                            <a href="#home" onClick={() => handleAnchorClick('#home')} className="hover:text-white">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#about" onClick={() => handleAnchorClick('#about')} className="hover:text-white">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="#gallery" onClick={() => handleAnchorClick('#gallery')} className="hover:text-white">
                                Photo Gallery
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Get In Touch</h3>
                    <a href="#message" onClick={() => handleAnchorClick('#message')} className="hover:text-white">
                        Contact Us
                    </a>
                </div>

                {/* Address Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Address</h3>
                    <p className="text-sm">
                        Near Tulsi Ram Joshi Bungalow, Reti Bunder, RBI Colony,<br />
                        Dombivli West, Mumbai, Dombivli,<br />
                        Maharashtra 421202
                    </p>
                </div>

                {/* Social Icons */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                    <div className="flex space-x-3 text-xl">
                        <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="hover:text-white cursor-pointer" />
                        </a>
                        <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="hover:text-white cursor-pointer" />
                        </a>
                        <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="hover:text-white cursor-pointer" />
                        </a>
                        <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                            <FaYoutube className="hover:text-white cursor-pointer" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-700 text-center mt-10 pt-4 text-sm">
                Blessings Children Home
            </div>
        </footer>
    );
};

export default Footer;