import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, RefreshCw, AlertCircle } from 'lucide-react';
import { useFaculty, Faculty } from '@/data/api';

// Skeleton Loading Component
const FacultyCardSkeleton = ({ cardsPerView }: { cardsPerView: number }) => {
  return (
    <div
      className="flex-shrink-0 px-2 sm:px-0"
      style={{
        width: cardsPerView === 1 ? '100%' : cardsPerView === 2 ? 'calc(50% - 0.75rem)' : 'calc(33.333% - 1rem)',
      }}
    >
      <div
        className="relative h-[420px] sm:h-[450px] rounded-2xl sm:rounded-3xl overflow-hidden mx-auto bg-gray-200 animate-pulse"
        style={{
          maxWidth: cardsPerView === 1 ? '320px' : '100%',
        }}
      >
        {/* Faculty Image Skeleton */}
        <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
          <div className="w-full h-full bg-gray-300"></div>
        </div>

        {/* Text Overlay Skeleton */}
        <div className="absolute bottom-0 left-0 right-0 z-30 p-4 sm:p-6 text-center">
          <div className="h-5 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

interface FacultyCardProps {
  name: string;
  title: string;
  facultyImage: string;
  bgImage?: string;
}

const FacultyCard = ({ name, title, facultyImage, bgImage }: FacultyCardProps) => {
  return (
    <div
      className="relative h-[420px] sm:h-[450px] rounded-2xl sm:rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 group mx-auto"
      style={{
        backgroundImage: bgImage ? `url('${process.env.NEXT_PUBLIC_API_URL}${bgImage}')` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-500" />

      {/* Faculty Image */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
        {facultyImage && (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${facultyImage}`}
            alt={name}
            width={320}
            height={420}
            className="w-full h-full object-cover drop-shadow-2xl"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/api/placeholder/320/420";
            }}
          />
        )}
      </div>


      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

      {/* Text Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-30 p-4 sm:p-6 text-center text-white">
        <h3 className="font-semibold text-base sm:text-lg mb-1">{name}</h3>
        <p className="text-xs sm:text-sm opacity-90">{title}</p>
      </div>
    </div>
  );
};

export default function FacultySection() {
  const { faculty, loading, error, refetch } = useFaculty();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isRetrying, setIsRetrying] = useState(false);

  // Handle responsive cards per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Retry function
  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      await refetch();
    } finally {
      setIsRetrying(false);
    }
  };

  const nextSlide = useCallback(() => {
    if (faculty.length === 0) return;
    setCurrentIndex((prev) =>
      prev + 1 >= faculty.length - cardsPerView + 1 ? 0 : prev + 1
    );
  }, [cardsPerView, faculty.length]);

  // Autoplay
  useEffect(() => {
    if (faculty.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [nextSlide, faculty.length]);

  const prevSlide = () => {
    if (faculty.length === 0) return;
    setCurrentIndex((prev) =>
      prev === 0 ? faculty.length - cardsPerView : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Loading state
  if (loading && faculty.length === 0) {
    return (
      <section className="w-full py-12 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="h-12 bg-gray-300 rounded w-96 mx-auto mb-3 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-80 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-64 mx-auto"></div>
          </div>

          {/* Skeleton Carousel */}
          <div className="w-full relative">
            <div className="overflow-hidden px-0 sm:px-12">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  gap: cardsPerView === 1 ? '0' : '1.5rem',
                }}
              >
                {Array.from({ length: Math.min(3, cardsPerView) }).map((_, index) => (
                  <FacultyCardSkeleton key={index} cardsPerView={cardsPerView} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error && faculty.length === 0) {
    return (
      <section className="w-full py-12 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 uppercase">
              Guided by Experts.
              <br />
              Inspired by Leaders.
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed px-4">
              Behind every successful learner stands a mentor who inspires, guides, and challenges them to reach new heights. Our mentors are industry pioneers, seasoned educators, and global innovators who bring real-world expertise to every session.
            </p>
          </div>

          {/* Error Message */}
          <div className="flex flex-col items-center justify-center py-16 space-y-6">
            <AlertCircle className="w-16 h-16 text-red-500" />
            <div className="text-center space-y-2">
              <p className="text-red-500 text-lg font-semibold">Failed to load faculty</p>
              <p className="text-gray-600 text-sm max-w-md">{error}</p>
            </div>
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-800/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
              {isRetrying ? 'Retrying...' : 'Try Again'}
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (!loading && faculty.length === 0) {
    return (
      <section className="w-full py-12 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 uppercase">
              Guided by Experts.
              <br />
              Inspired by Leaders.
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed px-4">
              Behind every successful learner stands a mentor who inspires, guides, and challenges them to reach new heights. Our mentors are industry pioneers, seasoned educators, and global innovators who bring real-world expertise to every session.
            </p>
          </div>

          {/* Empty State Message */}
          <div className="flex flex-col items-center justify-center py-16 space-y-6">
            <div className="text-gray-500 text-lg text-center">
              <p>No faculty members to display yet.</p>
              <p className="text-sm mt-2">Check back later for updates.</p>
            </div>
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-800/90 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 sm:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 uppercase">
            Guided by Experts.
            <br />
            Inspired by Leaders.
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed px-4">
            Behind every successful learner stands a mentor who inspires, guides, and challenges them to reach new heights. Our mentors are industry pioneers, seasoned educators, and global innovators who bring real-world expertise to every session.
          </p>

          {/* Refresh button */}
          {/* <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="mt-4 flex items-center gap-2 text-gray-800 hover:text-gray-800/80 transition-colors text-sm disabled:opacity-50 mx-auto"
          >
            <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
            {isRetrying ? 'Refreshing...' : 'Refresh'}
          </button> */}
        </div>

        {/* Loading overlay for refresh */}
        {isRetrying && faculty.length > 0 && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex items-center gap-3">
              <RefreshCw className="w-6 h-6 animate-spin text-gray-800" />
              <span className="text-gray-700">Updating faculty...</span>
            </div>
          </div>
        )}

        {/* Carousel Container */}
        <div className="w-full relative">
          <div className="overflow-hidden px-0 sm:px-12">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
                gap: cardsPerView === 1 ? '0' : '1.5rem',
              }}
            >
              {/* Show skeletons while refreshing with existing data */}
              {isRetrying ? (
                Array.from({ length: Math.min(faculty.length, cardsPerView) }).map((_, index) => (
                  <FacultyCardSkeleton key={index} cardsPerView={cardsPerView} />
                ))
              ) : (
                faculty.map((member: Faculty) => (
                  <div
                    key={member.id}
                    className="flex-shrink-0 px-2 sm:px-0"
                    style={{
                      width: cardsPerView === 1 ? '100%' : cardsPerView === 2 ? 'calc(50% - 0.75rem)' : 'calc(33.333% - 1rem)',
                    }}
                  >
                    <div style={{ maxWidth: cardsPerView === 1 ? '320px' : '100%', margin: '0 auto' }}>
                      <FacultyCard
                        name={member.name}
                        title={member.title}
                        facultyImage={member.faculty_image}
                        bgImage={member.bg_image}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Navigation Buttons - Only show if there are enough faculty members */}
          {faculty.length > cardsPerView && !isRetrying && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 z-30"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 z-30"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
              </button>
            </>
          )}

          {/* Dots - Only show if there are enough faculty members */}
          {faculty.length > cardsPerView && !isRetrying && (
            <div className="flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-12">
              {Array.from({ length: faculty.length - cardsPerView + 1 }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 rounded-full ${currentIndex === index
                        ? 'w-8 sm:w-10 h-2.5 sm:h-3 bg-gray-800'
                        : 'w-2.5 sm:w-3 h-2.5 sm:h-3 bg-gray-400 hover:bg-gray-500'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}