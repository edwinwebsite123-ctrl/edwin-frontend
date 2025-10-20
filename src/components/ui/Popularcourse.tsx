"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Building, Users, ArrowRight, TrendingUp, Check, Clock, BookOpen, Star } from "lucide-react";
import Image from "next/image";

const courses = [
  { 
    id: 1, 
    title: "Diploma in Human Resource Management", 
    category: "Management",
    description: "Explore essential HR skills and earn industry-relevant certification with this practical and theory-based...",
    icon: Users, 
    duration: "6 Months",
    modules: "13 Modules",
    students: "2,400+",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    slug: "hr-management"
  },
  { 
    id: 2, 
    title: "Hospital Management Diploma", 
    category: "Healthcare",
    description: "Specialized program in healthcare administration, hospital operations, and medical facility leadership...",
    icon: Building, 
    duration: "8 Months",
    modules: "15 Modules",
    students: "1,800+",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=600&fit=crop",
    slug: "hospital-management"
  },
  { 
    id: 3, 
    title: "AI Integrated Medical Coding", 
    category: "Healthcare Tech",
    description: "Master medical coding standards (ICD-10, CPT, HCPCS) with cutting-edge AI tools for accuracy...",
    icon: Brain, 
    duration: "5 Months",
    modules: "12 Modules",
    students: "1,500+",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    slug: "ai-medical-coding"
  },
];

export default function PopularCourses() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });
  
  const [counts, setCounts] = useState({
    students: 0,
    instructors: 0,
    success: 0,
    companies: 0
  });

  useEffect(() => {
    if (!isStatsInView) return;

    const duration = 2500;
    const steps = 80;
    const interval = duration / steps;

    const targets = {
      students: 6000,
      instructors: 15,
      success: 99,
      companies: 200
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = easeOutQuart(currentStep / steps);

      setCounts({
        students: Math.floor(targets.students * progress),
        instructors: Math.floor(targets.instructors * progress),
        success: Math.floor(targets.success * progress),
        companies: Math.floor(targets.companies * progress)
      });

      if (currentStep >= steps) {
        setCounts(targets);
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isStatsInView]);

  const easeOutQuart = (x: number) => {
    return 1 - Math.pow(1 - x, 4);
  };

  return (
    <section className="bg-white py-10 xs:py-12 sm:py-16 lg:py-20 xl:py-24 px-3 xs:px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 xs:mb-10 sm:mb-12 lg:mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 xs:gap-2 mb-3 xs:mb-4 sm:mb-5 lg:mb-6 px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 bg-gradient-to-r from-[#1725BB]/10 to-[#FF6002]/10 rounded-full border border-[#1725BB]/20"
          >
            <div className="w-1.5 xs:w-2 h-1.5 xs:h-2 bg-[#FF6002] rounded-full animate-pulse"></div>
            <span className="text-[#1725BB] font-bold text-[10px] xs:text-xs sm:text-sm tracking-wider uppercase">Most Popular Courses</span>
            <TrendingUp className="w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4 text-[#FF6002]" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-900 mb-2.5 xs:mb-3 sm:mb-4 lg:mb-5 leading-tight uppercase px-2"
          >
           Top-Rated Programs <span className="text-[#1725BB]">Students Love</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xs xs:text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed px-2"
          >
           Join thousands of successful learners who chose these industry-leading programs to advance their careers and achieve professional excellence.
          </motion.p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 lg:gap-7 relative">
          {courses.map((course, idx) => {
         
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredId(course.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group cursor-pointer relative z-10"
              >
                <div className="relative h-[480px] xs:h-[500px] sm:h-[520px] lg:h-[460px] rounded-xl xs:rounded-2xl overflow-hidden bg-black transition-all duration-400 hover:shadow-2xl hover:-translate-y-2">
                  {/* Popular Badge */}
                  <div className="absolute top-2.5 xs:top-3 sm:top-4 left-2.5 xs:left-3 sm:left-4 z-30">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: idx * 0.1 + 0.3, duration: 0.5, type: "spring" }}
                      className="relative inline-flex items-center gap-1 xs:gap-1.5 sm:gap-2 bg-gradient-to-r from-[#FF6002] to-[#ff8833] px-2 xs:px-2.5 sm:px-3 md:px-4 py-1 xs:py-1.5 sm:py-2 rounded-full shadow-lg overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      <TrendingUp className="w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4 text-white relative z-10" strokeWidth={2.5} />
                      <span className="text-white font-bold text-[9px] xs:text-[10px] sm:text-xs tracking-wide uppercase relative z-10">Top Choice</span>
                    </motion.div>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-2.5 xs:top-3 sm:top-4 right-2.5 xs:right-3 sm:right-4 z-30">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: idx * 0.1 + 0.2, duration: 0.5 }}
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-1 xs:gap-1.5 bg-white/95 backdrop-blur-sm px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 sm:py-2 rounded-full shadow-lg"
                    >
                      <Star className="w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4 text-[#FF6002]" fill="#FF6002" strokeWidth={2} />
                      <span className="text-gray-900 font-bold text-[10px] xs:text-xs">4.9</span>
                    </motion.div>
                  </div>

                  {/* Background Image */}
                  <div className="absolute inset-0 z-10">
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={400}
                      height={460}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-3.5 xs:p-4 sm:p-5 md:p-6 z-30 text-left">
                    {/* Category Label */}
                    <div className="mb-2 xs:mb-2.5 sm:mb-3">
                      <span className="inline-block text-[#9BF900] font-bold text-[10px] xs:text-xs sm:text-sm tracking-wider uppercase">
                        {course.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 xs:mb-2.5 sm:mb-3 leading-tight">
                      {course.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs xs:text-sm sm:text-base text-gray-300 leading-relaxed mb-3 xs:mb-3.5 sm:mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Course Meta Info */}
                    <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-4 mb-3.5 xs:mb-4 sm:mb-5 text-white/90 flex-wrap">
                      <div className="flex items-center gap-1 xs:gap-1.5">
                        <Clock className="w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4 text-[#9BF900]" />
                        <span className="text-[10px] xs:text-xs sm:text-sm font-medium">{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 xs:gap-1.5">
                        <Users className="w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4 text-[#9BF900]" />
                        <span className="text-[10px] xs:text-xs sm:text-sm font-medium">{course.students}</span>
                      </div>
                      <div className="flex items-center gap-1 xs:gap-1.5">
                        <BookOpen className="w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4 text-[#9BF900]" />
                        <span className="text-[10px] xs:text-xs sm:text-sm font-medium">{course.modules}</span>
                      </div>
                    </div>

                    {/* View Course Button */}
                    <button
                      onClick={() => window.location.href = `/course/${course.slug}`}
                      className="w-full group/btn inline-flex items-center justify-center gap-1.5 xs:gap-2 px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 sm:py-3 bg-[#FF6002] border border-white/25 rounded-full text-white text-[11px] xs:text-xs sm:text-sm lg:text-base font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-white/25 shadow-lg"
                    >
                      View Course
                      <span className="flex items-center justify-center w-3.5 xs:w-4 sm:w-5 h-3.5 xs:h-4 sm:h-5 bg-white/20 rounded-full group-hover/btn:translate-x-1 transition-transform duration-300">
                        <ArrowRight className="w-2.5 xs:w-3 sm:w-3.5 h-2.5 xs:h-3 sm:h-3.5" strokeWidth={3} />
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Bar */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 md:gap-6 mt-8 xs:mt-10 sm:mt-12 lg:mt-16 mb-8 xs:mb-10 sm:mb-12 lg:mb-16 p-4 xs:p-5 sm:p-6 md:p-8 bg-[#1725BB] rounded-lg xs:rounded-xl"
        >
          <div className="text-center">
            <motion.div 
              className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-[#9BF900] mb-0.5 xs:mb-1"
              initial={{ scale: 0.5 }}
              animate={isStatsInView ? { scale: 1 } : { scale: 0.5 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {counts.students.toLocaleString()}+
            </motion.div>
            <div className="text-[10px] xs:text-xs sm:text-sm text-white/90">Active Students</div>
          </div>
          <div className="text-center">
            <motion.div 
              className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-[#9BF900] mb-0.5 xs:mb-1"
              initial={{ scale: 0.5 }}
              animate={isStatsInView ? { scale: 1 } : { scale: 0.5 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {counts.instructors}+
            </motion.div>
            <div className="text-[10px] xs:text-xs sm:text-sm text-white/90">Expert Instructors</div>
          </div>
          <div className="text-center">
            <motion.div 
              className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-[#9BF900] mb-0.5 xs:mb-1"
              initial={{ scale: 0.5 }}
              animate={isStatsInView ? { scale: 1 } : { scale: 0.5 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {counts.success}%
            </motion.div>
            <div className="text-[10px] xs:text-xs sm:text-sm text-white/90">Success Rate</div>
          </div>
          <div className="text-center">
            <motion.div 
              className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-[#9BF900] mb-0.5 xs:mb-1"
              initial={{ scale: 0.5 }}
              animate={isStatsInView ? { scale: 1 } : { scale: 0.5 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {counts.companies}+
            </motion.div>
            <div className="text-[10px] xs:text-xs sm:text-sm text-white/90">Partner Companies</div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-8 xs:mt-10 sm:mt-12 md:mt-16 lg:mt-20 relative overflow-hidden rounded-lg xs:rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 bg-[#1725BB]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1725BB] to-[#0f1a8f]"></div>

          <div className="relative z-10 text-center">
            <TrendingUp className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#9BF900] mx-auto mb-3 xs:mb-3.5 sm:mb-4 md:mb-5" />
            <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 xs:mb-2.5 sm:mb-3 md:mb-4 uppercase px-2 xs:px-3 sm:px-4">
              Excel in Your Future with Edwin Excel
            </h2>
            <p className="text-[11px] xs:text-xs sm:text-sm md:text-base lg:text-lg text-white/90 mb-4 xs:mb-5 sm:mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-2 xs:px-3 sm:px-4">
              Discover career-driven <strong>Undergraduate</strong> and <strong>Postgraduate programs</strong> designed to help you build real-world skills, gain global exposure, and achieve professional excellence.
            </p>

            <div className="flex flex-col xs:flex-row gap-2 xs:gap-2.5 sm:gap-3 md:gap-4 justify-center items-center mb-4 xs:mb-5 sm:mb-6 md:mb-8 px-2 xs:px-3 sm:px-4">
              <div className="flex items-center gap-1.5 xs:gap-2 text-white/90">
                <Check className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-[#9BF900] flex-shrink-0" />
                <span className="text-[10px] xs:text-xs sm:text-sm">UG & PG Programs</span>
              </div>
              <div className="flex items-center gap-1.5 xs:gap-2 text-white/90">
                <Check className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-[#9BF900] flex-shrink-0" />
                <span className="text-[10px] xs:text-xs sm:text-sm">Industry-Relevant Curriculum</span>
              </div>
              <div className="flex items-center gap-1.5 xs:gap-2 text-white/90">
                <Check className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-[#9BF900] flex-shrink-0" />
                <span className="text-[10px] xs:text-xs sm:text-sm">Placement Assistance</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 xs:gap-3 sm:gap-4 justify-center px-2 xs:px-3 sm:px-4">
              <button
                onClick={() => window.location.href = '/edwinexcel'}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3 px-4 xs:px-5 sm:px-6 md:px-8 py-2.5 xs:py-3 sm:py-4 bg-[#FF6002] text-white rounded-full font-semibold text-xs xs:text-sm sm:text-base hover:bg-[#e65502] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Edwin Excel
                <span className="flex items-center justify-center w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-white/20 rounded-full group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRight className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5" strokeWidth={3} />
                </span>
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}