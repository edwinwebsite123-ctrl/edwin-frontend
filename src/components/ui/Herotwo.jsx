import React from 'react';
import { ArrowRight, BookOpen, Users, Star } from 'lucide-react';

const HeroSectionTwo = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navigation */}
      <nav className="flex items-center justify-between mb-12 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-black">
          Edwin Academy
        </div>
        <div className="hidden md:flex items-center space-x-8 text-gray-500 text-sm">
          <a href="#" className="hover:text-black transition-colors">About</a>
          <a href="#" className="hover:text-black transition-colors">Courses</a>
          <a href="#" className="hover:text-black transition-colors">Contact</a>
          <a href="#" className="hover:text-black transition-colors">Blog</a>
        </div>
        <div className="flex items-center space-x-4">
          <ArrowRight className="w-5 h-5 text-gray-400" />
          <button className="bg-black text-white px-6 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors">
            Get Started
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6 h-[600px]">
          
          {/* Left side - Main heading */}
          <div className="col-span-6 bg-white rounded-3xl p-12 flex flex-col justify-center relative">
            <h1 className="text-6xl font-bold text-black leading-tight">
              REVOLUTIONIZE
              <br />
              YOUR LEARNING
              <br />
              WITH EXPERT
              <br />
              <span className="relative">
                EDUCATION
                <div className="absolute -right-16 top-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 opacity-80"></div>
                </div>
              </span>
            </h1>
          </div>

          {/* Top right - Dark card */}
          <div className="col-span-6 bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-8 left-8">
              <span className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm">
                Updated Syllabus
              </span>
            </div>
            <div className="absolute top-6 right-8">
              <Star className="w-12 h-12 text-white opacity-30" />
            </div>
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-lg leading-relaxed">
                Unlock a world of limitless learning with Edwin Academy by accessing a vast library of courses, tutorials, and resources tailored to your needs.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-12 gap-6 mt-6">
          
          {/* Bottom left - Stats card with colored orb */}
          <div className="col-span-3 bg-white rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-4 left-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 via-purple-500 to-blue-500 opacity-80"></div>
            </div>
            <div className="mt-20">
              <div className="bg-black text-white rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold">125</div>
                <div className="text-sm opacity-70">Courses</div>
              </div>
              <div className="text-center mt-4">
                <div className="text-3xl font-bold text-black">2.5K</div>
                <div className="text-sm text-gray-500">Learners</div>
              </div>
            </div>
          </div>

          {/* Bottom right - Professional card */}
          <div className="col-span-9 bg-gradient-to-r from-lime-300 to-green-400 rounded-3xl p-8 text-black relative">
            <div className="flex gap-3 mb-6">
              <span className="bg-black text-white px-4 py-2 rounded-full text-sm">
                Personalized Learning
              </span>
              <span className="bg-white/30 px-4 py-2 rounded-full text-sm">
                Virtual Education
              </span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Professional</h2>
            <p className="text-lg max-w-md">
              Unlock a world of limitless learning with Edwin Academy by accessing a vast library of courses, tutorials, and resources tailored to your needs.
            </p>
            <div className="absolute bottom-8 right-8">
              <ArrowRight className="w-12 h-12 text-black opacity-60" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSectionTwo;