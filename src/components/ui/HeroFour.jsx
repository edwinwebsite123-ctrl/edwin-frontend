"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSectionFour() {
  return (
    <div className="bg-[#E6F0FA] min-h-screen flex flex-col items-center justify-center px-6 md:px-16 py-10">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-6xl p-6 md:p-10 relative overflow-hidden">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold">Edwin Academy</h1>
          <nav className="hidden md:flex gap-6 text-gray-700 text-sm font-medium">
            <a href="#" className="hover:text-[#1725BB] transition">Home</a>
            <a href="#" className="hover:text-[#1725BB] transition">Services</a>
            <a href="#" className="hover:text-[#1725BB] transition">Works</a>
            <a href="#" className="hover:text-[#1725BB] transition">Contact</a>
          </nav>
          <button className="bg-[#1725BB] text-white px-5 py-2 rounded-full text-sm hover:scale-105 transition">
            Get Started
          </button>
        </div>

        {/* Hero Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Text Section */}
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Empowering students for a <span className="text-[#1725BB]">brighter future</span>
            </h2>
            <p className="text-gray-600 text-lg">
              At Edwin Academy, we combine education, innovation, and dedication to shape future leaders with confidence and vision.
            </p>
            <div className="flex gap-4">
              <button className="bg-[#1725BB] text-white px-6 py-3 rounded-full font-medium hover:scale-105 transition">
                Enroll Now
              </button>
              <button className="border border-gray-300 px-6 py-3 rounded-full font-medium text-gray-700 hover:bg-gray-100 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-md">
              <Image
                src="/logo/hero-icon.png"
                alt="Students"
                width={550}
                height={400}
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-6 bg-white rounded-2xl shadow-md p-4 w-64">
              <h4 className="text-lg font-semibold">Our Mission</h4>
              <p className="text-sm text-gray-500">
                Empowering students with knowledge, skills, and confidence for the future.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

