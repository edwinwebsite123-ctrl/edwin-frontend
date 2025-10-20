'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronRight, BookOpen, ArrowRight } from 'lucide-react';

const EdwinAcademyCarousel = () => {
  // ----- State -----
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // ----- Responsive detector (safe for SSR) -----
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ----- Cards data (use mobile/desktop sources where useful) -----
  // Note: for the card that needs two images (placement), we use both desktop & mobile files.
  // Replace '/hero/banner-1-mobile.jpg' with the actual mobile image path you upload.
  const cards = [
    {
      id: 'courses',
      title: 'PROFESSIONAL COURSES',
      description:
        'Master industry-leading skills with our comprehensive curriculum designed by experts. From fundamentals to advanced techniques, we guide your learning journey.',
      accentColor: '#FF6002',
      sideBg: '#1725BB',
      stats: [
        { label: 'Courses', value: '70+' },
        { label: 'Success Rate', value: '99%' },
        { label: 'Rating', value: '4.5' }
      ],
      // This card uses a custom markup (icons + stat cards) — keep the original design
      customMedia: (
        <div className="relative w-full h-full bg-gradient-to-br from-orange-50 to-white rounded-2xl overflow-hidden border-2 border-orange-100 shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <BookOpen className="w-24 h-24 sm:w-32 sm:h-32 text-orange-200" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-400 rounded-full animate-ping"></div>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white backdrop-blur-md rounded-xl p-3 sm:p-4 border-2 border-orange-100">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-gray-900">50+ Courses</div>
                  <div className="text-xs text-orange-600 font-medium">Available Now</div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-2 text-center border border-orange-200">
                  <div className="font-bold text-base sm:text-lg text-orange-600">99%</div>
                  <div className="text-xs text-gray-600">Success</div>
                </div>
                <div className="flex-1 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-2 text-center border border-orange-200">
                  <div className="font-bold text-base sm:text-lg text-orange-600">4.5</div>
                  <div className="text-xs text-gray-600">Course Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 'mentorship',
      title: 'EXPERT MENTORSHIP',
      description:
        'Learn directly from industry professionals with years of experience. Get personalized guidance and insights that accelerate your career growth.',
      accentColor: '#FF6002',
      sideBg: '#000004',
      stats: [
        { label: 'Mentors', value: '50+' },
        { label: 'Experience', value: '4+ Yrs' },
        { label: 'Sessions', value: '10000+' }
      ],
      // single source (you may optionally add a mobile variant later)
      imgDesktop: '/hero/banner-2.jpg',
      imgMobile: '/hero/banner-2.jpg' // change if you have a mobile-specific file
    },

    {
      id: 'placement',
      title: 'CAREER PLACEMENT',
      description: '',
      accentColor: '#FF6002',
      sideBg: '#1725BB',
      stats: [],
      isFullImage: true,
      // **Important**: provide two images for better results on tablet/phone vs desktop
      imgDesktop: '/hero/banner-1.jpg',
      imgMobile: '/hero/banner-mobile.png' // upload this mobile-optimized image
    },

    {
      id: 'certification',
      title: 'BRAND SHOWCASE',
      description: '',
      accentColor: '#FF6002',
      sideBg: '#000000',
      stats: [],
      isFullVideo: true,
      videoSrc: '/hero/fade.mp4', // ensure this file is optimized (web-friendly, small, H.264 or H.265/AV1)
      videoPoster: '/hero/banner-1.jpg' // fallback poster image for quick first paint
    }
  ];

  // ----- Helpers: next/prev -----
  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  }, [cards.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  }, [cards.length]);

  // Auto-play control
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleUserInteraction = (callback) => {
    setIsAutoPlaying(false);
    callback();
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // ----- Preload next slide's media for instant swap -----
  useEffect(() => {
    // preload next slide media (image or video metadata) so transitions appear instant
    const nextIndex = (activeIndex + 1) % cards.length;
    const nextCard = cards[nextIndex];

    // Preload image
    const imgSrc = isMobile ? nextCard.imgMobile || nextCard.imgDesktop : nextCard.imgDesktop;
    if (imgSrc) {
      try {
        const img = new window.Image();
        img.src = imgSrc;
        // no onload handlers needed; browser caches it
      } catch (e) {
        // ignore if window is undefined or preload fails
      }
    }

    // Preload video metadata (do not fully download if avoidable)
    if (nextCard.videoSrc) {
      try {
        const v = document.createElement('video');
        v.preload = 'metadata'; // metadata is typically enough to avoid initial delay
        v.muted = true;
        v.src = nextCard.videoSrc;
        // call load to at least fetch metadata
        v.load();
      } catch (e) {
        // ignore errors silently
      }
    }

    // Also optionally preload current slide's image if not already loaded (defensive)
    const currentCard = cards[activeIndex];
    const currImg = isMobile ? currentCard.imgMobile || currentCard.imgDesktop : currentCard.imgDesktop;
    if (currImg) {
      try {
        const i2 = new window.Image();
        i2.src = currImg;
      } catch (e) {}
    }
  }, [activeIndex, isMobile, cards]);

  // ----- Render -----
  return (
    <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 py-10 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-3 xs:gap-4 sm:gap-6 lg:gap-8 mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12">
          <div className="flex-1 w-full">
            {/* Slightly bigger heading on small screens -> default text-2xl */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 uppercase">
              Discover the freedom<br />
              <span className="relative inline-block">
                of learning on your terms
                <svg className="absolute -bottom-0.5 xs:-bottom-1 sm:-bottom-2 left-0 w-full h-1.5 xs:h-2 sm:h-3 md:h-4 animate-pulse" viewBox="0 0 300 12" fill="none">
                  <path d="M0 6 Q 150 0, 300 6" stroke="#9BF900" strokeWidth="4" fill="none"/>
                </svg>
              </span>
            </h1>
          </div>

          <div className="flex-1 w-full max-w-lg">
            <p className="text-gray-600 text-xs xs:text-sm sm:text-base lg:text-lg mb-3 xs:mb-4 sm:mb-6 leading-relaxed">
              Get expert courses, mentorship, certifications, and career placement — all in one comprehensive learning solution
            </p>
            <button
              className="cursor-pointer group inline-flex items-center gap-2 xs:gap-3 px-4 xs:px-5 sm:px-6 lg:px-8 py-2.5 xs:py-3 lg:py-4 bg-[#FF6002] hover:bg-[#e65502] text-white rounded-full font-semibold text-xs xs:text-sm lg:text-base transition-all duration-300 whitespace-nowrap"
            >
              Explore Our Courses
              <span className="flex items-center justify-center w-5 h-5 xs:w-6 xs:h-6 lg:w-7 lg:h-7 bg-white/20 rounded-full group-hover:translate-x-1 transition-transform duration-300">
                <ArrowRight className="w-3 h-3 xs:w-4 xs:h-4 lg:w-5 lg:h-5" strokeWidth={3} />
              </span>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative pb-0" onMouseEnter={() => setIsAutoPlaying(false)} onMouseLeave={() => setIsAutoPlaying(true)}>
          {/* Desktop & Tablet view (>= sm) */}
          <div className="hidden sm:flex gap-3 md:gap-4 lg:gap-6 overflow-hidden">
            {cards.map((card, index) => {
              const isActive = index === activeIndex;
              const nextIndex = (activeIndex + 1) % cards.length;
              const isNext = index === nextIndex;

              return (
                <div
                  key={card.id}
                  className={`flex-shrink-0 transition-all duration-700 ease-out ${
                    isActive
                      ? 'flex-[3] opacity-100 scale-100'
                      : 'w-16 sm:w-20 md:w-24 lg:w-28 opacity-90 cursor-pointer hover:opacity-100 scale-95 hover:scale-100'
                  }`}
                  onClick={() => !isActive && handleUserInteraction(() => setActiveIndex(index))}
                  onMouseEnter={() => !isActive && setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className="h-[320px] sm:h-[360px] md:h-[400px] lg:h-[440px] xl:h-[480px] rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden transition-all duration-700 relative"
                    style={{
                      background: isActive ? 'linear-gradient(135deg, #1725BB, #0F1A80)' : card.sideBg,
                      border: isActive ? '2px solid #0F1A80' : '2px solid rgba(255,255,255,0.05)'
                    }}
                    role="group"
                    aria-label={`${card.title} carousel card`}
                  >
                    {isActive ? (
                      // Active full layout
                      <div className="relative h-full flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
                        {card.isFullImage || card.isFullVideo ? (
                          // Full-width image/video layout for active card
                          <div className="w-full h-full relative">
                            {card.isFullImage && (card.imgDesktop || card.imgMobile) && (
                              <div className="absolute inset-0">
                                <Image
                                  src={isMobile ? (card.imgMobile || card.imgDesktop) : card.imgDesktop}
                                  alt={card.title}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                  priority={true} // active slide should load immediately
                                  loading="eager"
                                  quality={85}
                                />
                              </div>
                            )}

                            {card.isFullVideo && card.videoSrc && (
                              <video
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="auto"
                                poster={card.videoPoster || card.imgDesktop || ''}
                              >
                                <source src={card.videoSrc} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            )}

                            {/* Next button (on top of media) */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUserInteraction(nextSlide);
                              }}
                              aria-label="Next slide"
                              className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 group border-2 z-10"
                              style={{
                                backgroundColor: card.accentColor,
                                borderColor: 'rgba(255, 255, 255, 0.2)'
                              }}
                            >
                              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 text-white group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                            </button>
                          </div>
                        ) : (
                          // Regular layout: left text + right media
                          <>
                            <div className="flex-1 flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                              <div>
                                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                  <div
                                    className="w-12 sm:w-16 md:w-20 h-1.5 sm:h-2 rounded-full transition-all duration-700 shadow-lg"
                                    style={{ backgroundColor: card.accentColor }}
                                  />
                                  <div
                                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full animate-ping"
                                    style={{ backgroundColor: card.accentColor }}
                                  />
                                </div>

                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 text-white tracking-tight">
                                  {card.title}
                                </h2>

                                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6">
                                  {card.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                  {card.stats.map((stat, idx) => (
                                    <div
                                      key={idx}
                                      className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-3 rounded-full border-2 bg-white/100 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white"
                                      style={{ borderColor: card.accentColor + '40' }}
                                    >
                                      <span className="font-bold text-xs sm:text-sm md:text-base" style={{ color: card.accentColor }}>
                                        {stat.value}
                                      </span>
                                      <span className="text-xs sm:text-sm text-gray-600 ml-1 sm:ml-2">{stat.label}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="flex-1 relative transform hover:scale-105 transition-transform duration-500 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                              {/* For mentorship we load image */}
                              {card.imgDesktop && (
                                <div className="relative w-full h-full rounded-lg overflow-hidden">
                                  <Image
                                    src={isMobile ? (card.imgMobile || card.imgDesktop) : card.imgDesktop}
                                    alt={card.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority={isNext ? true : false}
                                    loading={isNext ? 'eager' : 'lazy'}
                                    quality={80}
                                  />
                                  {/* subtle overlay */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent pointer-events-none" />
                                </div>
                              )}

                              {/* If card has customMedia (courses), render it */}
                              {card.customMedia && !card.imgDesktop && (
                                <div className="w-full h-full">
                                  {card.customMedia}
                                </div>
                              )}
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUserInteraction(nextSlide);
                              }}
                              className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 group border-2"
                              style={{
                                backgroundColor: card.accentColor,
                                borderColor: 'rgba(255, 255, 255, 0.2)'
                              }}
                            >
                              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 text-white group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                            </button>
                          </>
                        )}
                      </div>
                    ) : (
                      // Inactive compact vertical title (keeps media unloaded until activated)
                      <div className="h-full flex items-center justify-center p-3 sm:p-4 transition-all duration-500">
                        <div
                          className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold transition-all duration-300 tracking-wider"
                          style={{
                            writingMode: 'vertical-rl',
                            textOrientation: 'mixed',
                            transform: 'rotate(180deg)',
                            color: hoveredCard === index ? '#FFFFFF' : 'rgba(255, 255, 255, 0.9)'
                          }}
                        >
                          {card.title}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile view (sm:hidden) */}
          <div className="sm:hidden">
            <div
              className="h-[380px] xs:h-[420px] rounded-lg xs:rounded-xl overflow-hidden border-2 shadow-2xl"
              style={{
                background:
                  cards[activeIndex].isFullImage || cards[activeIndex].isFullVideo
                    ? '#000000'
                    : 'linear-gradient(135deg, #1725BB, #0F1A80)',
                borderColor: '#0F1A80'
              }}
            >
              {/* Mobile active slide rendering */}
              {(() => {
                const card = cards[activeIndex];

                // Full image
                if (card.isFullImage && (card.imgDesktop || card.imgMobile)) {
                  const src = isMobile ? (card.imgMobile || card.imgDesktop) : card.imgDesktop;
                  return (
                    <div className="relative h-full w-full">
                      <Image
                        src={src}
                        alt={card.title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                        loading="eager"
                        quality={80}
                      />
                    </div>
                  );
                }

                // Full video
                if (card.isFullVideo && card.videoSrc) {
                  return (
                    <div className="relative h-full w-full bg-black">
                      <video
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        poster={card.videoPoster || ''}
                      >
                        <source src={card.videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  );
                }

                // Regular mobile layout (text + media/custom)
                return (
                  <div className="relative h-full p-3 xs:p-4 sm:p-5 flex flex-col gap-3 xs:gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center gap-1.5 xs:gap-2 mb-2 xs:mb-3">
                        <div
                          className="w-10 xs:w-12 h-1 xs:h-1.5 rounded-full shadow-lg"
                          style={{ backgroundColor: card.accentColor }}
                        />
                        <div
                          className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full animate-ping"
                          style={{ backgroundColor: card.accentColor }}
                        />
                      </div>

                      <h2 className="text-xl xs:text-2xl font-bold mb-1.5 xs:mb-2 text-white tracking-tight leading-tight">
                        {card.title}
                      </h2>

                      <p className="text-[11px] xs:text-xs text-gray-200 leading-relaxed mb-2 xs:mb-3">
                        {card.description}
                      </p>

                      <div className="flex flex-wrap gap-1 xs:gap-1.5">
                        {card.stats.map((stat, idx) => (
                          <div
                            key={idx}
                            className="px-2 xs:px-3 py-1 xs:py-1.5 rounded-full border-2 bg-white/80 backdrop-blur-sm"
                            style={{ borderColor: (card.accentColor || '#FF6002') + '40' }}
                          >
                            <span className="font-bold text-[10px] xs:text-xs text-blue-800">{stat.value}</span>
                            <span className="text-[10px] xs:text-xs text-gray-600 ml-0.5 xs:ml-1">{stat.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex-1 relative mt-1 xs:mt-2">
                      {/* Show either customMedia, image or placeholder */}
                      {card.customMedia ? (
                        <div className="w-full h-full rounded-lg overflow-hidden">{card.customMedia}</div>
                      ) : card.imgDesktop ? (
                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                          <Image
                            src={isMobile ? (card.imgMobile || card.imgDesktop) : card.imgDesktop}
                            alt={card.title}
                            fill
                            className="object-cover"
                            sizes="100vw"
                            priority
                            loading="eager"
                            quality={80}
                          />
                        </div>
                      ) : card.isFullVideo && card.videoSrc ? (
                        <div className="relative w-full h-full bg-black">
                          <video
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            poster={card.videoPoster || ''}
                          >
                            <source src={card.videoSrc} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      ) : (
                        <div className="w-full h-full rounded-lg bg-gray-100" />
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Mobile Navigation Dots */}
            <div className="flex justify-center gap-1.5 xs:gap-2 mt-3 xs:mt-4">
              {cards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleUserInteraction(() => setActiveIndex(index))}
                  className={`h-1.5 xs:h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-6 xs:w-8 bg-[#FF6002]' : 'w-1.5 xs:w-2 bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdwinAcademyCarousel;
