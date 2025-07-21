import React from 'react'
import ChattingPana from "../assets/ChattingPana.png";

function Footer() {
  return (
   <footer className="bg-[#1B0A2A] text-white py-8 px-6 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Side - Image */}
        <div className="mb-6 md:mb-0 w-full md:w-1/2 flex justify-center md:justify-start">
          <img src={ChattingPana} alt="Chat illustration" className="w-60 md:w-72" />
        </div>

        {/* Right Side - Footer Links */}
        <div className="w-full md:w-1/2 text-center md:text-right">
          <h2 className="text-2xl font-bold text-purple-300 mb-2">ChatSphere</h2>
          <p className="text-sm text-gray-300 mb-2">Where Conversations Bloom 🌙</p>
          <div className="flex justify-center md:justify-end space-x-4">
            <a href="#" className="hover:text-purple-400 transition">Privacy</a>
            <a href="#" className="hover:text-purple-400 transition">Terms</a>
            <a href="#" className="hover:text-purple-400 transition">Contact</a>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ChatSphere. All rights reserved by KaranBhatia.
      </div>
    </footer>
  );
};



export default Footer