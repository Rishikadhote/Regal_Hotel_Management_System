import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-xl font-bold">Luxury Stays</h2>
            <p className="text-gray-400 mt-2">Experience world-class hospitality with breathtaking views and premium services.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition">About Us</a></li>
              <li><a href="/" className="text-gray-400 hover:text-white transition">Rooms & Suites</a></li>
              <li><a href="/" className="text-gray-400 hover:text-white transition">Dining</a></li>
              <li><a href="/" className="text-gray-400 hover:text-white transition">Spa & Wellness</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="mt-3 space-y-2">
              <li className="text-gray-400">📍 123 Luxury St, Paris, France</li>
              <li className="text-gray-400">📞 +91 98765 43210</li>
              <li className="text-gray-400">📧 support@luxurystays.com</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4 mt-3">
              <a href="/" className="text-gray-400 hover:text-white text-2xl"><FaFacebook /></a>
              <a href="/" className="text-gray-400 hover:text-white text-2xl"><FaInstagram /></a>
              <a href="/" className="text-gray-400 hover:text-white text-2xl"><FaTwitter /></a>
              <a href="/" className="text-gray-400 hover:text-white text-2xl"><FaLinkedin /></a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 mt-10 border-t border-gray-700 pt-4">
          © {new Date().getFullYear()} Luxury Stays. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
