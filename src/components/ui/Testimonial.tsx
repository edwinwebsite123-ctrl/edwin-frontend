'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image'; // <-- ADDED: Import Next.js Image component
import { ChevronLeft, ChevronRight, RefreshCw, AlertCircle } from 'lucide-react';
import { useTestimonials, Testimonial } from '@/data/api';

// Skeleton Loading Component
const TestimonialCardSkeleton = ({ cardsPerView }: { cardsPerView: number }) => {
  return (
    <div
      className="flex-shrink-0 px-2 sm:px-0"
      style={{
        width: cardsPerView === 1 ? '100%' : cardsPerView === 2 ? 'calc(50% - 0.75rem)' : 'calc(33.333% - 1rem)',
      }}
    >
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 h-full flex flex-col justify-between animate-pulse">
        {/* Quote Icon Skeleton */}
        <div className="w-10 h-10 rounded-full bg-gray-300 mb-4"></div>

        {/* Text Skeleton */}
        <div className="space-y-2 mb-6 flex-grow">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>

        {/* Author Skeleton */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-300"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-24"></div>
            <div className="h-3 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TestimonialSection() {
  const { testimonials, loading, error, refetch } = useTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isVisible, setIsVisible] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const sectionRef = useRef(null);

  // Responsive cards per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
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
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) =>
      prev + 1 >= testimonials.length - cardsPerView + 1 ? 0 : prev + 1
    );
  }, [cardsPerView, testimonials.length]);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, testimonials.length]);

  const prevSlide = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - cardsPerView : prev - 1
    );
  };

  const goToSlide = (index: number) => setCurrentIndex(index);

  // Loading state
  if (loading && testimonials.length === 0) {
    return (
      <div ref={sectionRef} className="relative overflow-hidden bg-black">
        {/* Background with fixed parallax effect */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat"
          style={{
            backgroundImage: "url('/fac/bg.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t "></div>
        </div>

        {/* Content Section */}
        <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 px-4 flex flex-col items-center">
          {/* Header Skeleton */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="h-12 bg-gray-300 rounded w-96 mx-auto mb-3 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-80 mx-auto"></div>
          </div>

          {/* Skeleton Carousel */}
          <div className="w-full max-w-6xl relative">
            <div className="overflow-hidden px-2 sm:px-8">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  gap: cardsPerView === 1 ? '0' : '1.5rem',
                }}
              >
                {Array.from({ length: Math.min(3, cardsPerView) }).map((_, index) => (
                  <TestimonialCardSkeleton key={index} cardsPerView={cardsPerView} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Error state
  if (error && testimonials.length === 0) {
    return (
      <div ref={sectionRef} className="relative overflow-hidden bg-black">
        {/* Background with fixed parallax effect */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat"
          style={{
            backgroundImage: "url('/fac/bg.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t "></div>
        </div>

        {/* Content Section */}
        <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 px-4 flex flex-col items-center">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 leading-tight uppercase">
              What Our Students <br /> Say About Us
            </h2>
            <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto px-2">
              At Edwin Academy, we unlock potential through knowledge, empowering
              students to lead the future with confidence.
            </p>
          </div>

          {/* Error Message */}
          <div className="flex flex-col items-center justify-center py-16 space-y-6">
            <AlertCircle className="w-16 h-16 text-red-500" />
            <div className="text-center space-y-2">
              <p className="text-red-500 text-lg font-semibold">Failed to load testimonials</p>
              <p className="text-white/80 text-sm max-w-md">{error}</p>
            </div>
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="flex items-center gap-2 bg-[#9BF900] text-black px-6 py-3 rounded-lg hover:bg-[#9BF900]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
              {isRetrying ? 'Retrying...' : 'Try Again'}
            </button>
          </div>
        </section>
      </div>
    );
  }

  // Empty state
  if (!loading && testimonials.length === 0) {
    return (
      <div ref={sectionRef} className="relative overflow-hidden bg-black">
        {/* Background with fixed parallax effect */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat"
          style={{
            backgroundImage: "url('/fac/bg.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t "></div>
        </div>

        {/* Content Section */}
        <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 px-4 flex flex-col items-center">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 leading-tight uppercase">
              What Our Students <br /> Say About Us
            </h2>
            <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto px-2">
              At Edwin Academy, we unlock potential through knowledge, empowering
              students to lead the future with confidence.
            </p>
          </div>

          {/* Empty State Message */}
          <div className="flex flex-col items-center justify-center py-16 space-y-6">
            <div className="text-white/80 text-lg text-center">
              <p>No testimonials to display yet.</p>
              <p className="text-sm mt-2">Check back later for student feedback.</p>
            </div>
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 bg-[#9BF900] text-black px-6 py-3 rounded-lg hover:bg-[#9BF900]/90 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="relative overflow-hidden bg-black">
      {/* Background with fixed parallax effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat"
        style={{
          backgroundImage: "url('/fac/bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t "></div>
      </div>

      {/* Content Section */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 px-4 flex flex-col items-center">
        {/* Header */}
        <div
          className="text-center mb-8 sm:mb-12 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 leading-tight uppercase">
            What Our Students <br /> Say About Us
          </h2>
          <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto px-2">
            At Edwin Academy, we unlock potential through knowledge, empowering
            students to lead the future with confidence.
          </p>

          {/* Refresh button */}
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="mt-4 flex items-center gap-2 text-[#9BF900] hover:text-[#9BF900]/80 transition-colors text-sm disabled:opacity-50 mx-auto"
          >
            <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
            {isRetrying ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {/* Loading overlay for refresh */}
        {isRetrying && testimonials.length > 0 && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex items-center gap-3">
              <RefreshCw className="w-6 h-6 animate-spin text-[#1725BB]" />
              <span className="text-gray-700">Updating testimonials...</span>
            </div>
          </div>
        )}

        {/* Carousel */}
        <div className="w-full max-w-6xl relative">
          <div className="overflow-hidden px-2 sm:px-8">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
                gap: cardsPerView === 1 ? '0' : '1.5rem',
              }}
            >
              {/* Show skeletons while refreshing with existing data */}
              {isRetrying ? (
                Array.from({ length: Math.min(testimonials.length, cardsPerView) }).map((_, index) => (
                  <TestimonialCardSkeleton key={index} cardsPerView={cardsPerView} />
                ))
              ) : (
                testimonials.map((testimonial: Testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="flex-shrink-0 px-2 sm:px-0"
                    style={{
                      width: cardsPerView === 1
                        ? '100%'
                        : cardsPerView === 2
                          ? 'calc(50% - 0.75rem)'
                          : 'calc(33.333% - 1rem)',
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                      transition: `all 0.8s ease-out ${index * 0.15}s`,
                    }}
                  >
                    <div className="bg-white rounded-2xl shadow-lg hover:-translate-y-2 transition-all duration-500 p-6 sm:p-8 h-full flex flex-col justify-between">
                      {/* Quote Icon */}
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                        style={{ backgroundColor: '#9BF900' }}
                      >
                        <QuoteIcon />
                      </div>

                      {/* Text */}
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 flex-grow">
                        {testimonial.text}
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                        {testimonial.image ? (
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden relative"> {/* ADDED 'relative' for Image fill layout */}
                            {/* REPLACED <img> with <Image /> */}
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_URL}${testimonial.image}`}
                              alt={testimonial.name}
                              fill // Use fill to make it cover the parent div
                              sizes="56px" // Use a small size for performance
                              className="object-cover"
                              // Removed onError from Image and placed logic on the fallback div
                              onError={(e) => {
                                // Fallback to initials if image fails to load
                                e.currentTarget.style.display = 'none';
                                const fallback = document.getElementById(`fallback-${testimonial.id}`);
                                if (fallback) fallback.style.display = 'flex';
                              }}
                            />
                            {/* Fallback Initial Div - Hidden by default */}
                            <div
                              id={`fallback-${testimonial.id}`}
                              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white font-semibold"
                              style={{ backgroundColor: '#1725BB', display: 'none' }} // Hide by default
                            >
                              {getInitials(testimonial.name)}
                            </div>
                          </div>
                        ) : (
                          // Fallback when no image is provided in the data
                          <div
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white font-semibold"
                            style={{ backgroundColor: '#1725BB' }}
                          >
                            {getInitials(testimonial.name)}
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-gray-900 text-base sm:text-lg">
                            {testimonial.name}
                          </h4>
                          <p className="text-gray-600 text-xs sm:text-sm">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Navigation Buttons - Only show if there are enough testimonials */}
          {testimonials.length > cardsPerView && !isRetrying && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 transition-all z-20"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5 text-[#1725BB]" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 transition-all z-20"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5 text-[#1725BB]" />
              </button>
            </>
          )}

          {/* Dots - Only show if there are enough testimonials */}
          {testimonials.length > cardsPerView && !isRetrying && (
            <div className="flex justify-center gap-2 mt-8 sm:mt-12">
              {Array.from({ length: testimonials.length - cardsPerView + 1 }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`transition-all duration-300 rounded-full ${currentIndex === index
                      ? 'w-6 sm:w-8 h-2 bg-[#9BF900]'
                      : 'w-2 sm:w-3 h-2 bg-white/40 hover:bg-white/60'
                      }`}
                  />
                )
              )}
            </div>
          )}
        </div>
      </section>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// Helper function to get initials from name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function QuoteIcon() {
  return (
    <svg
      className="w-5 h-5 text-white"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}