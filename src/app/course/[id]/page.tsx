'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Trophy,
  Briefcase,
  BookOpen,
  Users,
  Award,
  Target,
  ChevronRight,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { allCoursesData } from '../../../data/courses';
import Navbar from '@/components/ui/navigation-menu';
import { AdmissionProvider, EnrollButton } from '@/components/ui/AdmissionButton';
import Footer from '@/components/ui/Footer';

export default function CourseDetail() {
  const { id } = useParams();
  const router = useRouter();
  const course = allCoursesData.find((c) => c.id === id);

  useEffect(() => {
    if (course) {
      document.title = `${course.title} | Professional Course | Your Platform`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', `${course.title} - ${course.duration}. ${course.shortDescription.substring(0, 140)}...`);
      }

      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', `${course.title}, ${course.category}, ${course.level} course, online learning, ${course.tools.slice(0, 5).join(', ')}`);
      }
    }
  }, [course]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h1>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/course')}
            className="px-6 py-3 bg-[#1725BB] text-white rounded-lg hover:bg-[#0f1a8f] transition"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-white"
      >
        {/* Breadcrumb Navigation - Removed */}

        {/* Hero Section */}
        <header className="relative bg-gradient-to-br from-[#1725BB] via-[#0f1a8f] to-[#1725BB] text-white overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>
          
          {/* Accent Shapes */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-[#9BF900] rounded-full opacity-10 blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#00D0FF] rounded-full opacity-10 blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            {/* View All Courses Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => router.push('/course')}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#1725BB] transition-all font-semibold text-sm"
              aria-label="Back to all courses"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Courses</span>
            </motion.button>

            <div className="max-w-4xl">
              {/* Category Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-md rounded-full text-sm font-semibold mb-6 border border-white/20"
              >
                <Sparkles className="w-4 h-4 text-[#9BF900]" />
                {course.category}
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                {course.title}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-3xl"
              >
                {course.shortDescription}
              </motion.p>

              {/* Key Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4 md:gap-6"
              >
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20">
                  <Clock className="w-5 h-5 text-[#9BF900]" />
                  <span className="font-semibold">{course.duration}</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20">
                  <BookOpen className="w-5 h-5 text-[#00D0FF]" />
                  <span className="font-semibold">{course.level}</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20">
                  <Trophy className="w-5 h-5 text-[#9BF900]" />
                  <span className="font-semibold">{course.certification}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {/* Main Content Column */}
            <article className="lg:col-span-2 space-y-6 sm:space-y-8">

              
              {/* Course Overview */}
              <section className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-[#1725BB] to-[#0f1a8f] rounded-lg sm:rounded-xl flex-shrink-0">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words">
                      Course Overview
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">What this course is all about</p>
                  </div>
                </div>
                <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                    {course.overview}
                  </p>
                </div>
              </section>

              {/* Key Highlights */}
              <section className="bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6 md:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 break-words">
                  What You'll Master
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">Key skills and knowledge you'll gain</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {course.highlights.map((point, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 group p-3 rounded-lg hover:bg-white transition-colors"
                    >
                      <div className="p-1 bg-green-50 rounded-lg group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-5 h-5 text-[#9BF900]" />
                      </div>
                      <span className="text-gray-700 leading-relaxed font-medium">{point}</span>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Career Opportunities */}
              <section className="bg-gradient-to-br from-[#1725BB]/5 via-[#00D0FF]/5 to-[#9BF900]/5 rounded-xl sm:rounded-2xl border border-[#1725BB]/20 p-4 sm:p-6 md:p-8 shadow-sm">
                <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-[#FF6002] to-[#FF6002]/80 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words">
                      Career Opportunities
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">Exciting roles waiting for you</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {course.careerOpportunities.map((role, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 sm:gap-3 bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 hover:border-[#9BF900] hover:shadow-md transition-all group"
                    >
                      <div className="p-1.5 sm:p-2 bg-[#9BF900]/10 rounded-lg group-hover:bg-[#9BF900]/20 transition-colors flex-shrink-0">
                        <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-[#1725BB]" />
                      </div>
                      <span className="text-xs sm:text-sm md:text-base text-gray-800 font-semibold break-words">{role}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Course Curriculum */}
              <section className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6 md:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 break-words">
                  Course Curriculum
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">Comprehensive learning path</p>
                <div className="space-y-3">
                  {course.modules.map((mod, i) => (
                    <details
                      key={i}
                      className="group bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:border-[#1725BB] transition-all"
                    >
                      <summary className="flex items-center justify-between cursor-pointer p-4 sm:p-5 font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-[#1725BB] to-[#0f1a8f] text-white rounded-xl shadow-lg flex-shrink-0">
                            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <span className="text-sm sm:text-base md:text-lg break-words">{mod.title}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-2" />
                      </summary>
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 bg-gray-50">
                        <ul className="space-y-2 sm:space-y-3">
                          {mod.content.map((topic, j) => (
                            <li key={j} className="flex items-start gap-2 sm:gap-3 text-gray-700">
                              <div className="w-2 h-2 bg-[#FF6002] rounded-full mt-2 flex-shrink-0" />
                              <span className="leading-relaxed text-xs sm:text-sm md:text-base break-words">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              {/* Tools & Technologies */}
              <section className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6 md:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 break-words">
                  Tools & Technologies
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">Industry-standard tools you'll use</p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {course.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 font-semibold rounded-lg text-xs sm:text-sm border border-gray-200 hover:border-[#1725BB] hover:shadow-md transition-all break-words"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </section>

              
            </article>

            {/* Sidebar - Sticky Enrollment Card */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-xl sm:rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="relative">
                  <img
                    src={course.image}
                    alt={`${course.title} course thumbnail`}
                    className="w-full h-48 sm:h-56 object-cover"
                    loading="lazy"
                  />
                  {/* <div className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#9BF900] text-[#1725BB] text-xs font-bold rounded-full shadow-lg">
                    POPULAR
                  </div> */}
                </div>
                
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-tight break-words">
                      {course.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                      {course.category}
                    </p>
                  </div>

                  <div className="space-y-3 sm:space-y-4 py-4 sm:py-5 border-y border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 sm:p-2 bg-[#1725BB]/10 rounded-lg flex-shrink-0">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#1725BB]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500 font-medium">Duration</p>
                        <p className="text-xs sm:text-sm text-gray-900 font-semibold break-words">{course.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 sm:p-2 bg-[#9BF900]/20 rounded-lg flex-shrink-0">
                        <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-[#1725BB]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500 font-medium">Certification</p>
                        <p className="text-xs sm:text-sm text-gray-900 font-semibold break-words">{course.certification}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 sm:p-2 bg-[#00D0FF]/20 rounded-lg flex-shrink-0">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#1725BB]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500 font-medium">Level</p>
                        <p className="text-xs sm:text-sm text-gray-900 font-semibold break-words">{course.level}</p>
                      </div>
                    </div>
                  </div>

                  <AdmissionProvider>
                    <EnrollButton course={course.id} children={null}/>
                  </AdmissionProvider>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4 text-[#9BF900] flex-shrink-0" />
                    <span className="font-medium">Start your transformation today</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </motion.div>
      <Footer/>
    </>
  );
}