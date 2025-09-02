import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold mb-4">Chocolate Factory</h3>
        <p className="text-lg mb-4">
          Indulge in the finest handcrafted chocolates, made with passion and the purest ingredients.
          Experience a world of rich flavors and exquisite textures.
        </p>
        <div className="flex justify-center space-x-6 mb-4">
          <Link to="/about" className="hover:text-gray-100 transition-colors duration-300">About Us</Link>
          <Link to="/contact" className="hover:text-gray-100 transition-colors duration-300">Contact</Link>
          <Link to="/privacy" className="hover:text-gray-100 transition-colors duration-300">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-gray-100 transition-colors duration-300">Terms of Service</Link>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Chocolate Factory. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
