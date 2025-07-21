import React from 'react';
import chatting from "../../assets/Chatting.png";
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';

function Home() {
  
  return (
        <div className="min-h-screen bg-[#1b1f2b] font-sans text-white">
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 gap-12">

        {/* Left Section */}
        <div className="md:w-1/2 space-y-6">
          <div className="bg-fuchsia-600 text-white px-4 py-2 rounded-full text-sm font-semibold w-fit">
            <Link to={'/login'}>online Chat</Link>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold">
            Make New Friend
          </h1>

          <p className="text-gray-300 max-w-md">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero doloribus harum exercitationem aliquam aut ratione aspernatur, ducimus neque praesentium rerum velit dolor, libero magni. Pariatur enim exercitationem ea ex porro!
          </p>

          <Link to="/register">
            <button className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-medium transition-all">
              Register Now
            </button>
          </Link>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 flex justify-center">
          <img src={chatting} alt="chat illustration" className="w-full max-w-md" />
        </div>

      </section>
      <Footer/>
    </div>
  );
}

export default Home
