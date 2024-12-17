import React from 'react';

const Footer = () => {
  return (
    <footer className=" text-white py-8">
      <div className="container mx-auto px-4">
        {/* Navigation Links */}
        <nav className="flex flex-col md:flex-row md:justify-center md:items-center gap-6 mb-6">
          <a className="hover:text-gray-400 transition-colors" href="#">Home</a>
          <a className="hover:text-gray-400 transition-colors" href="#">About</a>
          <a className="hover:text-gray-400 transition-colors" href="#">Services</a>
          <a className="hover:text-gray-400 transition-colors" href="#">Media</a>
          <a className="hover:text-gray-400 transition-colors" href="#">Gallery</a>
          <a className="hover:text-gray-400 transition-colors" href="#">Contact</a>
        </nav>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-4 mb-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <img src="https://img.icons8.com/fluent/30/ffffff/facebook-new.png" alt="Facebook" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <img src="https://img.icons8.com/fluent/30/ffffff/linkedin-2.png" alt="LinkedIn" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src="https://img.icons8.com/fluent/30/ffffff/instagram-new.png" alt="Instagram" />
          </a>
          <a href="https://messenger.com" target="_blank" rel="noopener noreferrer" aria-label="Messenger">
            <img src="https://img.icons8.com/fluent/30/ffffff/facebook-messenger--v2.png" alt="Messenger" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <img src="https://img.icons8.com/fluent/30/ffffff/twitter.png" alt="Twitter" />
          </a>
        </div>
        
        {/* Copyright Notice */}
        <p className="text-center text-sm md:text-base lg:text-lg font-medium">&copy; 2022 Company Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
