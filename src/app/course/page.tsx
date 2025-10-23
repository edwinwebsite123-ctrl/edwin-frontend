'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Users,
  Clock,
  Search,
  Star,
  ArrowRight,
  Briefcase,
  HeartPulse,
  Brush,
  GraduationCap,
  X,
} from 'lucide-react';
import { useCourses } from '@/data/api';
import Navbar from '@/components/ui/navigation-menu';
import Link from 'next/link';
import Footer from '@/components/ui/Footer';
import Image from 'next/image';

// Define the Course interface (matching the useCourses interface)
interface CourseModule {
  title: string;
  content: string[];
}

interface Course {
  id: string;
  title: string;
  short_description: string;
  category: string;
  duration: string;
  level: string;
  mode: string;
  certification: string;
  image: string;
  overview: string;
  modules: CourseModule[];
  career_opportunities: string[];
  tools: string[];
  highlights: string[];
  created_at: string;
  updated_at: string;
  description?: string;
  students?: number;
  rating?: number;
  slug?: string;
}

export default function CoursesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Use the useCourses hook
  const { courses: allCoursesData, loading, error } = useCourses();

  const categories = [
    { id: 'all', label: 'All Courses', icon: BookOpen },
    { id: 'it', label: 'IT & Technology', icon: BookOpen },
    { id: 'management', label: 'Management', icon: Briefcase },
    { id: 'healthcare', label: 'Healthcare', icon: HeartPulse },
    { id: 'creative', label: 'Creative Arts', icon: Brush },
    { id: 'ugpg', label: 'Degree Programs', icon: GraduationCap },
  ];

  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  // Filtered and sorted courses
  const filteredCourses = useMemo(() => {
     let courses: Course[] = allCoursesData as Course[];

    // Category filter
    if (activeCategory !== 'all') {
      courses = courses.filter(
        (course) => course.category?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Level filter
    if (selectedLevel !== 'all') {
      courses = courses.filter(
        (course) => course.level?.toLowerCase() === selectedLevel.toLowerCase()
      );
    }

    // Search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      courses = courses.filter(
        (course) =>
          (course.title?.toLowerCase() || '').includes(query) ||
          (course.description?.toLowerCase() || '').includes(query) ||
          (course.short_description?.toLowerCase() || '').includes(query) ||
          (course.category?.toLowerCase() || '').includes(query)
      );
    }

    // Sort
    if (sortBy === 'popular') {
      courses.sort((a, b) => (b.students || 0) - (a.students || 0));
    } else if (sortBy === 'rating') {
      courses.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'duration') {
      courses.sort((a, b) => {
        const durationA = parseInt(a.duration || '0');
        const durationB = parseInt(b.duration || '0');
        return durationA - durationB;
      });
    }

    return courses;
  }, [activeCategory, searchQuery, selectedLevel, sortBy, allCoursesData]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setSelectedLevel('all');
    setSortBy('popular');
  };

  const activeFiltersCount = 
    (activeCategory !== 'all' ? 1 : 0) +
    (selectedLevel !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0);

  // Show loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-64 mx-auto mb-20"></div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="h-[460px] bg-gray-200 rounded-2xl animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  // Show error state
  if (error) {
    return (
      <>
        <Navbar />
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
              <X className="w-10 h-10 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Error loading courses</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#1725BB] text-white font-semibold rounded-xl hover:bg-[#1725BB]/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            max-height: 0;
            opacity: 0;
          }
          to {
            max-height: 500px;
            opacity: 1;
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
        .slide-down {
          animation: slideDown 0.3s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <Navbar/>
      <section
        id="courses"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-[#FF6002]/10 rounded-full">
              <div className="w-2 h-2 bg-[#FF6002] rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-[#FF6002] uppercase tracking-wide">
                Our Programs
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 uppercase">
              Explore Our <span className="text-[#1725BB]">Courses</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover a wide range of programs designed to boost your career and creativity.
            </p>
          </div>

          {/* Search & Filter Section */}
          <div className="mb-12">
            {/* Main Search Bar */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 mb-6 animate-fade-in-up">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search for courses, categories, skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1725BB] focus:border-transparent focus:bg-white transition-all text-base"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Filter Toggle & Sort */}
                {/* <div className="flex gap-3">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-5 py-3.5 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium text-gray-700 transition-all border-2 border-transparent hover:border-gray-300"
                  >
                    <Filter className="w-5 h-5" />
                    <span className="hidden sm:inline">Filters</span>
                    {activeFiltersCount > 0 && (
                      <span className="ml-1 px-2 py-0.5 bg-[#1725BB] text-white text-xs font-bold rounded-full">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>

                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none px-4 sm:px-6 py-3.5 pr-10 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium text-gray-700 transition-all cursor-pointer border-2 border-transparent hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1725BB] text-sm sm:text-base"
                    >
                      <option value="popular">Popular</option>
                      <option value="rating">Top Rated</option>
                      <option value="duration">Duration</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                  </div>
                </div> */}
              </div>
            </div>

            {/* Expandable Filters */}
            {showFilters && (
              <div className="slide-down overflow-hidden">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 mb-6">
                  {/* Category Filter */}
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                      Category
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = activeCategory === cat.id;
                        return (
                          <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all hover:scale-105 active:scale-95 ${
                              isActive
                                ? 'bg-[#1725BB] text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{cat.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Level Filter */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                      Difficulty Level
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {levels.map((level) => {
                        const isActive = selectedLevel === level;
                        return (
                          <button
                            key={level}
                            onClick={() => setSelectedLevel(level)}
                            className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all hover:scale-105 active:scale-95 ${
                              isActive
                                ? 'bg-[#FF6002] text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {level === 'all' ? 'All Levels' : level}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  {activeFiltersCount > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <button
                        onClick={clearAllFilters}
                        className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Clear all filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Results Counter */}
            <div className="flex items-center justify-between mb-6 px-1">
              <p className="text-sm sm:text-base text-gray-600">
                Showing <span className="font-bold text-[#1725BB]">{filteredCourses.length}</span> of{' '}
                <span className="font-bold">{allCoursesData.length}</span> courses
              </p>
              {activeFiltersCount > 0 && (
                <p className="text-xs sm:text-sm text-gray-500">
                  {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} applied
                </p>
              )}
            </div>
          </div>

          {/* Course Grid */}
          {filteredCourses.length === 0 ? (
            <div className="text-center py-20 animate-fade-in-up">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search query
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-3 bg-[#1725BB] text-white font-semibold rounded-xl hover:bg-[#1725BB]/90 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => router.push(`/course/${course.id}`)}
                  className="group cursor-pointer animate-fade-in-up"
                >
                  <div className="relative h-[460px] rounded-2xl overflow-hidden bg-black shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${course.image}`} 
                        alt={course.title}
                        width={400}
                        height={460}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                    </div>

                    {/* Top Labels */}
                    <div className="absolute top-4 left-4 right-4 z-20 flex items-start justify-between">
                      <span className="px-3 py-1.5 bg-[#1725BB] text-white text-xs font-bold rounded-full">
                        {course.level}
                      </span>
                      <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <Star className="w-4 h-4 fill-[#1725BB] text-[#1725BB]" />
                        <span className="text-sm font-bold text-gray-900">
                          {course.rating}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 z-30 p-6">
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-[#9BF900] mb-1 uppercase tracking-wide">
                          {course.category}
                        </p>
                        <h3 className="text-2xl font-bold text-white mb-3 leading-snug">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-200 leading-relaxed line-clamp-2 mb-4">
                          {course.short_description}
                        </p>
                      </div>

                      {/* Course Stats */}
                      <div className="grid grid-cols-3 gap-3 mb-4 text-xs text-gray-300">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          <span>{course.students}+</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{Array.isArray(course.modules) ? course.modules.length : course.modules} Modules</span>
                        </div>
                      </div>

                      {/* Button */}
                      <Link href={`/course/${course.slug || course.id}`} className="block">
                        <button className="w-full group/btn inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 bg-[#FF6002] border border-white/25 rounded-full text-white text-xs sm:text-sm lg:text-base font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-white/25 shadow-lg hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]">
                          View Course
                          <span className="flex items-center justify-center w-4 sm:w-5 h-4 sm:h-5 bg-white/20 rounded-full group-hover/btn:translate-x-1 transition-transform duration-300">
                            <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5" strokeWidth={3} />
                          </span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer/>
    </>
  );
}