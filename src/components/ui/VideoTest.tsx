'use client';

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ashmil Noushad",
    role: "HR Executive",
    video: "/video/1.mp4",
    poster: "/video/1.png",
  },
  {
    id: 2,
    name: "Nihala",
    role: "HR Executive",
    video: "/video/3.mp4",
    poster: "/video/2.png",
  },
  {
    id: 3,
    name: "Hafsa",
    role: "HR Executive",
    video: "/video/2.mp4",
    poster: "/video/3.png",
  },
];

export default function VideoTestimonialsSection() {
  const [playingId, setPlayingId] = useState(null);
  const videoRefs = useRef({});

  const togglePlay = (id) => {
    const video = videoRefs.current[id];
    if (!video) return;

    if (playingId === id) {
      video.pause();
      setPlayingId(null);
    } else {
      if (playingId && videoRefs.current[playingId]) {
        videoRefs.current[playingId].pause();
      }
      video.play().catch(() => {});
      setPlayingId(id);
    }
  };

  return (
    <section className="bg-white py-14 sm:py-20 lg:py-24 px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 bg-blue-50 border border-blue-100 rounded-full mb-5 sm:mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
            <span className="font-medium text-xs sm:text-sm tracking-wide text-blue-600">
              TESTIMONIALS
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight uppercase">
            Transforming Careers,
            <span className="block mt-1 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              One Story at a Time
            </span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-xl sm:max-w-2xl mx-auto px-2">
            Discover how{" "}
            <span className="font-semibold text-blue-600">
              10,000+ professionals
            </span>{" "}
            have accelerated their career growth with Edwin Academy.
          </p>
        </motion.div>

        {/* Video Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {testimonials.map((person, index) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-900 shadow-lg transition-transform duration-300 hover:scale-[1.03]">
                {/* Video */}
                <video
                  ref={(el) => (videoRefs.current[person.id] = el)}
                  className="absolute inset-0 w-full h-full object-cover"
                  loop
                  playsInline
                  preload="none"
                  poster={person.poster}
                >
                  <source src={person.video} type="video/mp4" />
                </video>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                {/* Playing Indicator */}
                {playingId === person.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-3 right-3"
                  >
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500 rounded-full">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                      <span className="text-white text-[10px] sm:text-xs font-semibold">
                        PLAYING
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <div className="flex items-end justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-white mb-0.5 truncate">
                        {person.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-200 truncate">
                        {person.role}
                      </p>
                    </div>

                    {/* Play Button */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => togglePlay(person.id)}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-500 flex items-center justify-center transition-all duration-200 hover:bg-orange-600 shadow-md flex-shrink-0"
                      aria-label={
                        playingId === person.id ? "Pause video" : "Play video"
                      }
                    >
                      {playingId === person.id ? (
                        <Pause className="w-5 h-5 text-white fill-white" />
                      ) : (
                        <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
