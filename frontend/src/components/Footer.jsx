import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-amber-900 text-amber-100 py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold mb-4">Chocolate Factory</h3>
        <p className="text-lg mb-4">
          Indulge in the finest handcrafted chocolates, made with passion and the purest ingredients.
          Experience a world of rich flavors and exquisite textures.
        </p>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-amber-300 transition-colors duration-300">About Us</a>
          <a href="#" className="hover:text-amber-300 transition-colors duration-300">Contact</a>
          <a href="#" className="hover:text-amber-300 transition-colors duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-amber-300 transition-colors duration-300">Terms of Service</a>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Chocolate Factory. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
