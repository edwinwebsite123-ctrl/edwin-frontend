'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { usePlacements, Placement } from '@/data/api';

// Skeleton Loading Component
const PlacementCardSkeleton = ({ cardsPerView }: { cardsPerView: number }) => {
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
        {/* Top Text Skeleton */}
        <div className="absolute top-4 sm:top-6 left-0 right-0 text-center z-10 px-4">
          <div className="h-5 bg-gray-300 rounded-lg mx-auto w-3/4"></div>
        </div>

        {/* Student Image Skeleton */}
        <div className="absolute top-12 sm:top-12 left-1/2 -translate-x-1/2 z-10 w-[320px] h-[320px] sm:w-[320px] sm:h-[320px]">
          <div className="w-full h-full bg-gray-300 rounded-full"></div>
        </div>

        {/* Bottom Info Skeleton */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-gray-400/70 via-gray-400/30 to-transparent z-20">
          <div className="space-y-2">
            <div className="h-6 bg-gray-300 rounded w-2/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PlacementCarousel() {
  const { placements, loading, error, refetch } = usePlacements();
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

  // Autoplay
  const nextSlide = useCallback(() => {
    if (placements.length === 0) return;

    setCurrentIndex((prev) =>
      prev + 1 >= placements.length - cardsPerView + 1 ? 0 : prev + 1
    );
  }, [cardsPerView, placements.length]);

  useEffect(() => {
    if (placements.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [nextSlide, placements.length]);

  const prevSlide = () => {
    if (placements.length === 0) return;

    setCurrentIndex((prev) =>
      prev === 0 ? placements.length - cardsPerView : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Retry function
  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      await refetch();
    } finally {
      setIsRetrying(false);
    }
  };

  // Loading state with skeleton
  if (loading && placements.length === 0) {
    return (
      <section className="w-full py-12 sm:py-20 px-4 flex flex-col items-center">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-3">
            <Sparkles className="text-[#FF6002]" size={32} />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1725BB] uppercase">
            Our Proud Achievers
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-sm lg:text-base px-4">
            Loading our talented students who secured placements at leading companies...
          </p>
        </div>

        {/* Skeleton Carousel */}
        <div className="w-full max-w-7xl mx-auto relative">
          <div className="overflow-hidden px-0 sm:px-12">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                gap: cardsPerView === 1 ? '0' : '1.5rem',
              }}
            >
              {Array.from({ length: Math.min(3, cardsPerView) }).map((_, index) => (
                <PlacementCardSkeleton key={index} cardsPerView={cardsPerView} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state with retry option
  if (error && placements.length === 0) {
    return (
      <section className="w-full py-12 sm:py-20 px-4 flex flex-col items-center">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-3">
            <Sparkles className="text-[#FF6002]" size={32} />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1725BB] uppercase">
            Our Proud Achievers
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-sm lg:text-base px-4">
            Celebrating our talented students who secured placements at leading companies.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <AlertCircle className="w-16 h-16 text-red-500" />
          <div className="text-center space-y-2">
            <p className="text-red-500 text-lg font-semibold">Failed to load placements</p>
            <p className="text-gray-600 text-sm max-w-md">{error}</p>
          </div>
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="flex items-center gap-2 bg-[#1725BB] text-white px-6 py-3 rounded-lg hover:bg-[#1725BB]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
            {isRetrying ? 'Retrying...' : 'Try Again'}
          </button>
        </div>
      </section>
    );
  }

  // Empty state
  if (!loading && placements.length === 0) {
    return (
      <section className="w-full py-12 sm:py-20 px-4 flex flex-col items-center">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-3">
            <Sparkles className="text-[#FF6002]" size={32} />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1725BB] uppercase">
            Our Proud Achievers
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-sm lg:text-base px-4">
            Celebrating our talented students who secured placements at leading companies.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="text-gray-500 text-lg text-center">
            <p>No placements to display yet.</p>
            <p className="text-sm mt-2">Check back later for updates.</p>
          </div>
          <button
            onClick={handleRetry}
            className="flex items-center gap-2 bg-[#1725BB] text-white px-6 py-3 rounded-lg hover:bg-[#1725BB]/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 sm:py-20 px-4 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex justify-center mb-3">
          <Sparkles className="text-[#FF6002]" size={32} />
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1725BB] uppercase">
          Our Proud Achievers
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-sm lg:text-base px-4">
          Celebrating our talented students who secured placements at leading companies.
        </p>

        {/* Refresh button when data is loaded but might be stale */}
        {/* <button
          onClick={handleRetry}
          disabled={isRetrying}
          className="mt-4 flex items-center gap-2 text-[#1725BB] hover:text-[#1725BB]/80 transition-colors text-sm disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
          {isRetrying ? 'Refreshing...' : 'Refresh Data'}
        </button> */}
      </div>

      {/* Loading overlay for refresh */}
      {isRetrying && placements.length > 0 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-[#1725BB]" />
            <span className="text-gray-700">Updating placements...</span>
          </div>
        </div>
      )}

      {/* Carousel Container */}
      <div className="w-full max-w-7xl mx-auto relative">
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
              Array.from({ length: Math.min(placements.length, cardsPerView) }).map((_, index) => (
                <PlacementCardSkeleton key={index} cardsPerView={cardsPerView} />
              ))
            ) : (
              placements.map((placement: Placement) => (
                <div
                  key={placement.id}
                  className="flex-shrink-0 px-2 sm:px-0"
                  style={{
                    width: cardsPerView === 1 ? '100%' : cardsPerView === 2 ? 'calc(50% - 0.75rem)' : 'calc(33.333% - 1rem)',
                  }}
                >
                  {/* Card */}
                  <div
                    className="relative h-[420px] sm:h-[450px] rounded-2xl sm:rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 group mx-auto"
                    style={{
                      maxWidth: cardsPerView === 1 ? '320px' : '100%',
                      backgroundImage: `url('${process.env.NEXT_PUBLIC_API_URL}${placement.background_image || '/placements/bg.png'}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-500" />

                    {/* Top Text */}
                    <div className="absolute top-4 sm:top-6 left-0 right-0 text-center z-10 px-4">
                      <h3 className="text-white text-base sm:text-lg font-semibold tracking-wide uppercase">
                        Placed at {placement.company}
                      </h3>
                    </div>

                    {/* Student Image */}
                    <div className="absolute top-32 sm:top-32 left-1/2 -translate-x-1/2 z-10 w-[320px] h-[320px] sm:w-[320px] sm:h-[320px]">
                      {placement.student_image && (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL}${placement.student_image}`}
                          alt={placement.name}
                          width={320}
                          height={320}
                          className="w-full h-full object-contain drop-shadow-2xl filter grayscale"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = '/placements/default-student.png';
                          }}
                        />
                      )}
                    </div>

                    {/* Bottom Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex items-end justify-between bg-gradient-to-t from-black/70 via-black/30 to-transparent z-20">
                      <div className="text-white">
                        <h4 className="text-base sm:text-lg font-bold leading-tight">{placement.name}</h4>
                        <p className="text-xs sm:text-sm text-white/80">{placement.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Navigation Buttons - Only show if there are enough placements */}
        {placements.length > cardsPerView && !isRetrying && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 z-30"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#1725BB]" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 z-30"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#1725BB]" />
            </button>
          </>
        )}

        {/* Dots - Only show if there are enough placements */}
        {placements.length > cardsPerView && !isRetrying && (
          <div className="flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-12">
            {Array.from({ length: placements.length - cardsPerView + 1 }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${currentIndex === index
                      ? 'w-8 sm:w-10 h-2.5 sm:h-3 bg-[#FF6002]'
                      : 'w-2.5 sm:w-3 h-2.5 sm:h-3 bg-gray-400 hover:bg-gray-500'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}