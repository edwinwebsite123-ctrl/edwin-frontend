'use client';

import { useState, useEffect, useCallback  } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

const placements = [
  {
    id: 1,
    name: 'JUBAIR AA',
    role: 'HR Executive',
    company: 'Lisie Hospital',
    companyLogo: '/placements/apple.png',
    studentImage: '/placements/boy-1.png',
    backgroundImage: '/placements/bg1.png',
  },
  {
    id: 2,
    name: 'AYSHA SHADA',
    role: 'Digital Marketer',
    company: 'Mexilet Technologies',
    companyLogo: '/placements/chat-gpt.png',
    studentImage: '/placements/girl-1.png',
    backgroundImage: '/placements/bg2.png',
  },
  {
    id: 3,
    name: 'RIZWAN KP',
    role: 'HR Executive',
    company: 'Roohi Recruitment',
    companyLogo: '/placements/intel.png',
    studentImage: '/placements/boy-2.png',
    backgroundImage: '/placements/bg3.png',
  },
  {
    id: 4,
    name: 'ASIF KA',
    role: 'HR Executive',
    company: 'Core institute of technology',
    companyLogo: '/placements/microsoft.png',
    studentImage: '/placements/boy-3.png',
    backgroundImage: '/placements/bg4.png',
  },
  {
    id: 5,
    name: 'Fathima Milsha',
    role: 'HR Executive',
    company: 'Gaotech',
    companyLogo: '/placements/apple.png',
    studentImage: '/placements/girl-2.png',
    backgroundImage: '/placements/bg1.png',
  },
];

// const companyLogos = [
//   { id: 1, name: 'TCS', logo: '/placements/apple.png' },
//   { id: 2, name: 'Infosys', logo: '/placements/chat-gpt.png' },
//   { id: 3, name: 'Cognizant', logo: '/placements/intel.png' },
//   { id: 4, name: 'Google', logo: '/placements/apple.png' },
//   { id: 5, name: 'Microsoft', logo: '/placements/microsoft.png' },
//   { id: 6, name: 'Amazon', logo: '/placements/chat-gpt.png' },
//   { id: 7, name: 'Wipro', logo: '/placements/apple.png' },
//   { id: 8, name: 'Accenture', logo: '/placements/microsoft.png' },
// ];

export default function PlacementCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

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
  setCurrentIndex((prev) =>
    prev + 1 >= placements.length - cardsPerView + 1 ? 0 : prev + 1
  );
}, [cardsPerView]); // Removed placements.length

useEffect(() => {
  const interval = setInterval(() => {
    nextSlide();
  }, 4000);
  return () => clearInterval(interval);
}, [nextSlide]); 

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? placements.length - cardsPerView : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

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
      </div>

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
            {placements.map((placement) => (
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
                    backgroundImage: `url('/placements/bg.png')`,
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
                    <Image
                      src={placement.studentImage}
                      alt={placement.name}
                      width={320}
                      height={320}
                      className="w-full h-full object-contain drop-shadow-2xl filter grayscale"
                    />
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex items-end justify-between bg-gradient-to-t from-black/70 via-black/30 to-transparent z-20">
                    <div className="text-white">
                      <h4 className="text-base sm:text-lg font-bold leading-tight">{placement.name}</h4>
                      <p className="text-xs sm:text-sm text-white/80">{placement.role}</p>
                    </div>
                    {/* <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center p-2">
                      <img
                        src={placement.companyLogo}
                        alt={placement.company}
                        className="w-full h-full object-contain"
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
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

        {/* Dots */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-12">
          {Array.from({ length: placements.length - cardsPerView + 1 }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index
                    ? 'w-8 sm:w-10 h-2.5 sm:h-3 bg-[#FF6002]'
                    : 'w-2.5 sm:w-3 h-2.5 sm:h-3 bg-gray-400 hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            )
          )}
        </div>
      </div>

      {/* Company Logos Marquee Section */}
      {/* <div className="w-full mt-16 sm:mt-24 overflow-hidden">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-[#1725BB] mb-8 sm:mb-12 px-4 uppercase">
          Our Placement Partners
        </h3>
        
        <style jsx>{`
          @keyframes scroll-left {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
          @keyframes scroll-right {
            from {
              transform: translateX(-50%);
            }
            to {
              transform: translateX(0);
            }
          }
          .marquee-left {
            animation: scroll-left 40s linear infinite;
          }
          .marquee-right {
            animation: scroll-right 40s linear infinite;
          }
          .marquee-container:hover .marquee-left,
          .marquee-container:hover .marquee-right {
            animation-play-state: paused;
          }
        `}</style> */}
        
        {/* <div className="space-y-4 sm:space-y-6"> */}
          {/* Top Row - Left to Right */}
          {/* <div className="relative overflow-hidden py-4 sm:py-6 bg-gradient-to-r from-[#1725BB]/5 to-transparent marquee-container">
            <div className="flex marquee-left whitespace-nowrap">
              {[...companyLogos, ...companyLogos, ...companyLogos].map((company, index) => (
                <div
                  key={`top-${index}`}
                  className="inline-flex items-center justify-center w-32 h-16 sm:w-40 sm:h-20 mx-3 sm:mx-4 lg:mx-6 bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex-shrink-0"
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="max-w-[70%] max-h-[50%] object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div> */}

          {/* Bottom Row - Right to Left */}
          {/* <div className="relative overflow-hidden py-4 sm:py-6 bg-gradient-to-l from-[#1725BB]/5 to-transparent marquee-container">
            <div className="flex marquee-right whitespace-nowrap">
              {[...companyLogos, ...companyLogos, ...companyLogos].map((company, index) => (
                <div
                  key={`bottom-${index}`}
                  className="inline-flex items-center justify-center w-32 h-16 sm:w-40 sm:h-20 mx-3 sm:mx-4 lg:mx-6 bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex-shrink-0"
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="max-w-[70%] max-h-[50%] object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div> */}
          {/* </div> */}
        {/* </div> */}
      {/* </div> */}
    </section>
  );
}