import React from 'react'
import Contact from '../assets/ContactUs.png'

function ContactUs() {
  return (
     <div className="min-h-screen bg-[#0e0e1a] text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full bg-[#1b1b2f] rounded-3xl shadow-xl p-10 grid md:grid-cols-2 gap-10 items-center">
        
        {/* Image Section */}
        <div className="w-full flex justify-center">
          <img
            src={Contact}
            alt="Contact Support Illustration"
            className="w-[90%] max-w-md h-auto object-contain"
          />
        </div>

        {/* Contact Info Section */}
        <div className="w-full">
          <h2 className="text-4xl font-bold text-purple-400 mb-6">Get in Touch 💬</h2>
          <p className="text-gray-300 mb-6">
            Have questions, feedback, or just want to say hello? We're here for you — 24/7 support with a smile.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-purple-300 text-xl">📞</span>
              <p className="text-gray-200">+91 9XXXXXXXXXXX</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-purple-300 text-xl">📧</span>
              <p className="text-gray-200">support@yourapp.com</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-purple-300 text-xl">🌐</span>
              <p className="text-gray-200">www.yourapp.com</p>
            </div>
          </div>

          <form className="mt-8 space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-[#2a2a40] text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-[#2a2a40] text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full bg-[#2a2a40] text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 transition-colors px-6 py-3 rounded-xl font-semibold text-white w-full"
            >
              Send Message ✨
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs