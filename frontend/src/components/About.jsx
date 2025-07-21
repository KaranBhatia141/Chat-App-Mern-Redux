import React from 'react'
import ChattingCuate from '../assets/ChattingCuate.png'

function About() {
  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-5xl bg-[#1b1b2f] rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row items-center space-y-10 md:space-y-0 md:space-x-10">
        
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={ChattingCuate}
            alt="Chatting Illustration"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl font-extrabold text-yellow-400 mb-4">About Us </h2>
          <p className="text-gray-300 text-lg mb-4">
            We're passionate about building seamless, real-time chat experiences that feel personal, fun, and effortless. Whether it's for love, friendships, or collabs — we keep you connected.
          </p>
          <p className="text-gray-400 text-lg">
            Crafted with MERN stack magic and loads of ❤️, this platform is all about you — your words, your moments, your vibe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About