'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react'; // Added Suspense
import { useRouter, useSearchParams } from 'next/navigation';
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

// =========================================================================
// 💡 Type definition for the router
// =========================================================================
type AppRouter = ReturnType<typeof useRouter>;


// =========================================================================
// 💡 CoursesContent: Contains the original page logic (Client Component)
// This is where useSearchParams is called.
// =========================================================================
function CoursesContent() {
  const router = useRouter();
  // 💡 This is the hook causing the issue during prerendering
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Get category from URL params
  const urlCategory = searchParams.get('category');

  // Use the useCourses hook
  const { courses: allCoursesData, loading, error } = useCourses();

  const categories = [
    { id: 'all', label: 'All Courses', icon: BookOpen },
    { id: 'it', label: 'IT & Technology', icon: BookOpen },
    { id: 'management', label: 'Management', icon: Briefcase },
    { id: 'healthcare', label: 'Healthcare', icon: HeartPulse },
    { id: 'creative', label: 'Creative Arts', icon: Brush },
    { id: 'education', label: 'Degree Programs', icon: GraduationCap },
  ];

  // Set active category from URL on component mount
  useEffect(() => {
    if (urlCategory && urlCategory !== 'all') {
      setActiveCategory(urlCategory);
    }
  }, [urlCategory]);

  // Filtered and sorted courses
  const { matchingCourses, otherCourses } = useMemo(() => {
    let courses: Course[] = allCoursesData as Course[];

    // Apply search filter first
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

    // Apply level filter
    if (selectedLevel !== 'all') {
      courses = courses.filter(
        (course) => course.level?.toLowerCase() === selectedLevel.toLowerCase()
      );
    }

    // Sort courses
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

    // If no category is selected or category is 'all', show all courses
    if (activeCategory === 'all' || !activeCategory) {
      return {
        matchingCourses: courses,
        otherCourses: []
      };
    }

    // Split courses into matching and others
    const matching = courses.filter(course => {
      if (!course.category) return false;

      // For partial matching (e.g., "IT" matches "IT & Marketing", "IT & Digital")
      const courseCategory = course.category.toLowerCase();
      const activeCategoryLower = activeCategory.toLowerCase();

      return courseCategory.includes(activeCategoryLower) ||
        activeCategoryLower.includes(courseCategory) ||
        courseCategory === activeCategoryLower;
    });

    const others = courses.filter(course =>
      !matching.some(matchCourse => matchCourse.id === course.id)
    );

    return { matchingCourses: matching, otherCourses: others };
  }, [activeCategory, searchQuery, selectedLevel, sortBy, allCoursesData]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setSelectedLevel('all');
    setSortBy('popular');
    // Also update URL to remove category param
    router.push('/course');
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    // Update URL with category
    if (categoryId === 'all') {
      router.push('/course');
    } else {
      router.push(`/course?category=${categoryId}`);
    }
  };

  const activeFiltersCount =
    (activeCategory !== 'all' ? 1 : 0) +
    (selectedLevel !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0);

  // Show loading state
  if (loading) {
    return (
      <>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-32 sm:w-48 mx-auto mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-64 sm:w-96 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-48 sm:w-64 mx-auto mb-20"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="h-[460px] bg-gray-200 rounded-2xl animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Show error state
  if (error) {
    return (
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <section
        id="courses"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header - Updated to show category name */}
          <div className="text-center mb-14 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-[#FF6002]/10 rounded-full">
              <div className="w-2 h-2 bg-[#FF6002] rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-[#FF6002] uppercase tracking-wide">
                {activeCategory === 'all' ? 'Our Programs' : `${categories.find(cat => cat.id === activeCategory)?.label || activeCategory}`}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 uppercase">
              {activeCategory === 'all' ? (
                <>Explore Our <span className="text-[#1725BB]">Courses</span></>
              ) : (
                <>{(categories.find(cat => cat.id === activeCategory)?.label || activeCategory)} Courses</>
              )}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {activeCategory === 'all'
                ? "Discover a wide range of programs designed to boost your career and creativity."
                : `Explore our specialized ${categories.find(cat => cat.id === activeCategory)?.label || activeCategory} programs designed for your career growth.`
              }
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
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide px-1">
                Filter by Category
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all hover:scale-105 active:scale-95 ${isActive
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

            {/* Results Counter */}
            <div className="flex items-center justify-between mb-6 px-1">
              <p className="text-sm sm:text-base text-gray-600">
                Showing{' '}
                <span className="font-bold text-[#1725BB]">
                  {activeCategory === 'all'
                    ? matchingCourses.length
                    : matchingCourses.length + otherCourses.length
                  }
                </span>{' '}
                of{' '}
                <span className="font-bold">{allCoursesData.length}</span> courses
              </p>
              {activeFiltersCount > 0 && (
                <div className="flex items-center gap-2">
                  <p className="text-xs sm:text-sm text-gray-500">
                    {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} applied
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Course Grid with Sections */}
          {matchingCourses.length === 0 && otherCourses.length === 0 ? (
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
            <div className="space-y-12">
              {/* Matching Courses Section */}
              {matchingCourses.length > 0 && activeCategory !== 'all' && (
                <div className="animate-fade-in-up">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {categories.find(cat => cat.id === activeCategory)?.label || activeCategory} Courses
                    </h3>
                    <span className="inline-flex items-center justify-center px-2 py-1 bg-[#1725BB] text-white text-xs font-medium rounded-full whitespace-nowrap sm:text-sm sm:font-semibold sm:px-3">
                      {matchingCourses.length} course{matchingCourses.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {matchingCourses.map((course) => (
                      <CourseCard key={course.id} course={course} router={router} />
                    ))}
                  </div>
                </div>
              )}

              {/* Other Courses Section */}
              {otherCourses.length > 0 && activeCategory !== 'all' && (
                <div className="animate-fade-in-up">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Other Courses</h3>
                    <span className="px-3 py-1 bg-gray-600 text-white text-sm font-semibold rounded-full">
                      {otherCourses.length} course{otherCourses.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherCourses.map((course) => (
                      <CourseCard key={course.id} course={course} router={router} />
                    ))}
                  </div>
                </div>
              )}

              {/* All Courses (when no category filter) */}
              {activeCategory === 'all' && matchingCourses.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
                  {matchingCourses.map((course) => (
                    <CourseCard key={course.id} course={course} router={router} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}


// =========================================================================
// 💡 Default Export (Server Component Wrapper)
// =========================================================================
// This component wraps the client content in Suspense to resolve the prerender error.
export default function CoursesPage() {
  return (
    <>
      <Navbar />
      {/* 💡 The required Suspense boundary */}
      <Suspense fallback={<div>Loading Filters...</div>}>
        <CoursesContent />
      </Suspense>
      <Footer />
    </>
  );
}


// Extracted CourseCard component for better organization
const CourseCard = ({ course, router }: { course: Course; router: AppRouter }) => {
  return (
    <div
      onClick={() => router.push(`/course/${course.slug || course.id}`)}
      className="group cursor-pointer animate-fade-in-up"
    >
      <div className="relative h-[460px] rounded-2xl overflow-hidden bg-black shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {course.image && (
            <>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${course.image}`}
                alt={course.title}
                width={400}
                height={460}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            </>
          )}
        </div>


        {/* Top Labels */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-start justify-between">
          <span className="px-3 py-1.5 bg-[#1725BB] text-white text-xs font-bold rounded-full">
            {course.level}
          </span>
          <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <Star className="w-4 h-4 fill-[#1725BB] text-[#1725BB]" />
            <span className="text-sm font-bold text-gray-900">
              {course.rating || '4.5'}
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
              <span>{course.students || 0}+</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{Array.isArray(course.modules) ? course.modules.length : 0} Modules</span>
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
  );
};