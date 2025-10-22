import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  HeartPulse,
  Brush,
  GraduationCap,
  Globe,
  Laptop,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const courses = [
  {
    id: 1,
    title: "INFORMATION TECHNOLOGY (IT)",
    description: "Explore cutting-edge IT courses that build your foundation in software, data, and systems.",
    image: "/card-1.png",
    icon: Laptop,
  },
  {
    id: 2,
    title: "MANAGEMENT & COMMERCE",
    description: "Master the art of business management, finance, and entrepreneurship.",
    image: "/card-2.png",
    icon: Briefcase,
  },
  {
    id: 3,
    title: "HEALTHCARE",
    description: "Advance your career in medical and healthcare fields with specialized programs.",
    image: "/card-3.png",
    icon: HeartPulse,
  },
  {
    id: 4,
    title: "CREATIVE",
    description: "Unleash your imagination with design, arts, and multimedia creative courses.",
    image: "/card-5.png",
    icon: Brush,
  },
  {
    id: 5,
    title: "UG/PG PROGRAMS",
    description: "Comprehensive undergraduate and postgraduate programs for career excellence.",
    image: "/card-4.png",
    icon: GraduationCap,
  },
  {
    id: 6,
    title: "Other Edwin Programs",
    description: "Discover a wide variety of skill-based professional courses by Edwin Academy.",
    image: "/exc.png",
    icon: Globe,
  },
];

export default function CourseCategoriesSection() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 mb-4 lg:mb-5"
            >
              <div className="w-12 h-0.5 bg-[#FF6002]"></div>
              <span className="text-[#FF6002] font-semibold text-sm tracking-wide uppercase">
                Course Categories
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 lg:mb-5 leading-tight uppercase"
            >
              Explore Our Course Categories
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-base lg:text-lg text-gray-600 leading-relaxed"
            >
              Discover diverse programs tailored to boost your skills and career — from creative design to advanced healthcare and management studies.
            </motion.p>
          </div>

          <Link href="/course">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="lg:mb-2 group inline-flex items-center gap-3 px-6 lg:px-8 py-3 lg:py-4 bg-[#FF6002] hover:bg-[#e65502] text-white rounded-full font-semibold text-sm lg:text-base transition-all duration-300 whitespace-nowrap self-start"
            >
              Explore All Courses
              <span className="flex items-center justify-center w-6 h-6 lg:w-7 lg:h-7 bg-white/20 rounded-full group-hover:translate-x-1 transition-transform duration-300">
                <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={3} />
              </span>
            </motion.button>
          </Link>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {courses.map((course, idx) => {
            const Icon = course.icon;
            // const isHovered = hoveredId === course.id;

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredId(course.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group cursor-pointer"
              >
                <div className="relative h-[380px] sm:h-[420px] rounded-2xl overflow-hidden bg-black transition-all duration-400 hover:shadow-2xl hover:-translate-y-2">
                  {/* Background Image */}
                  <div className="absolute inset-0 z-10">
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={400}
                      height={420}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-black/30 opacity-80 transition-opacity duration-400 group-hover:opacity-60"></div>
                  </div>

                  {/* Overlay Icon - Right Aligned */}
                  <div className="absolute top-0 right-8 bottom-0 flex items-center justify-center z-20 w-[140px] h-[240px]">
                    <div className="relative w-full h-full">
                      {/* Background side-logo.png */}
                      <Image
                        src="/side-logo.png"
                        alt="overlay background"
                        width={140}
                        height={240}
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                        loading="lazy"
                      />
                      {/* Icon */}
                      <div className="absolute inset-0 flex items-center justify-center pb-12">
                        <Icon className="w-[55px] h-[55px] text-[#9BF900]" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-5 left-5 right-5 z-30 text-left">
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] text-gray-200 leading-relaxed mb-4">
                      {course.description}
                    </p>
                    <Link href="/course">
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 bg-[#FF6002] border border-white/25 rounded-full text-white text-xs sm:text-sm lg:text-base font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-white/25 group/btn shadow-lg"
                      >
                        View Course
                        <span className="flex items-center justify-center w-4 sm:w-5 h-4 sm:h-5 bg-white/20 rounded-full group-hover/btn:translate-x-1 transition-transform duration-300">
                          <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5" strokeWidth={3} />
                        </span>
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 lg:mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-orange-50 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">100+</div>
                <div className="text-sm text-gray-600">Courses Available</div>
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-300"></div>
            <p className="text-sm text-gray-600 max-w-md">
              Find the perfect course to match your career goals and interests across multiple disciplines.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}