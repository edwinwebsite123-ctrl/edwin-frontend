import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRef, useEffect } from 'react';

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      if (containerRef.current) {
        containerRef.current.style.setProperty('--x', `${x}px`);
        containerRef.current.style.setProperty('--y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-gray-950 text-white font-sans flex flex-col relative overflow-hidden"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        
        .animated-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 70% 30%, rgba(100, 21, 255, 0.15), transparent 40%),
                      radial-gradient(circle at 30% 70%, rgba(255, 21, 150, 0.15), transparent 40%);
          transform: translate(var(--x, 0), var(--y, 0));
          transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
      `}</style>

      {/* Background Effect */}
      <div className="animated-bg z-0"></div>

      <div className="relative z-10 w-full p-8 md:p-12 lg:p-24 flex-1 flex flex-col justify-center">
        {/* Main Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Where the Future
            </span>
            <span className="block">
              of Learning Begins.
            </span>
          </h1>
        </motion.div>

        {/* Sub-content and CTA */}
        <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-start md:items-end justify-between w-full max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl"
          >
            We empower innovators and thought leaders with a project-based curriculum, expert mentorship, and a global community. Discover an education designed for the real world.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 md:mt-0 flex space-x-4"
          >
            <button className="bg-white text-gray-950 font-bold py-3 px-8 rounded-full shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center">
              Explore Courses
              <ArrowUpRight size={20} className="ml-2" />
            </button>
            <button className="border border-white/30 text-white/80 font-medium py-3 px-8 rounded-full transition-colors duration-300 hover:border-white hover:text-white flex items-center justify-center">
              Watch Our Story
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default App;
