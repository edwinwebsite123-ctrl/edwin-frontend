import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Award, Users, TrendingUp, Calendar, Target } from 'lucide-react';

const EdwinAcademyCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const cards = [
    {
      id: 'courses',
      title: 'Courses',
      description: 'Explore our comprehensive range of industry-leading courses designed to transform your career. Learn from experts and gain practical skills that matter in today\'s competitive market.',
      gradient: 'from-blue-50 via-green-50 to-blue-50',
      widget: (
        <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 w-64 md:w-72 shadow-xl">
          <div className="flex gap-2 md:gap-3 mb-3 md:mb-4">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#1725BB' }}>
              <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-100 rounded-xl md:rounded-2xl flex items-center justify-center">
              <span className="text-xl md:text-2xl font-semibold">150+</span>
            </div>
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-100 rounded-xl md:rounded-2xl flex items-center justify-center">
              <Calendar className="w-5 h-5 md:w-6 md:h-6" />
            </div>
          </div>
          <div className="flex gap-2 md:gap-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white" style={{ backgroundColor: '#1725BB' }}></div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white" style={{ backgroundColor: '#9BF900' }}></div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white" style={{ backgroundColor: '#FF6002' }}></div>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-xs font-bold">5K+</span>
              </div>
            </div>
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-100 rounded-xl md:rounded-2xl flex items-center justify-center">
              <Award className="w-5 h-5 md:w-6 md:h-6" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'mentorship',
      title: 'Mentorship',
      description: 'Get personalized guidance from industry professionals. Our mentorship program connects you with experienced mentors who help accelerate your learning journey.',
      gradient: 'from-green-50 via-blue-50 to-green-50',
      widget: (
        <div className="bg-white/95 backdrop-blur rounded-2xl md:rounded-3xl p-4 md:p-6 w-72 md:w-80 shadow-xl">
          <div className="flex justify-between items-center mb-3 md:mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#9BF900' }}>
                <Users className="w-4 h-4 md:w-5 md:h-5" style={{ color: '#1725BB' }} />
              </div>
              <span className="font-semibold text-sm md:text-base">Student Progress</span>
            </div>
            <select className="text-xs md:text-sm border rounded-lg px-2 md:px-3 py-1 focus:outline-none focus:ring-2" style={{ focusRingColor: '#1725BB' }}>
              <option>Month</option>
              <option>Week</option>
            </select>
          </div>
          <div className="flex gap-1 md:gap-2 items-end h-24 md:h-32 mb-3 md:mb-4">
            {[65, 55, 90, 75, 70, 85, 80].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end">
                <div 
                  className="w-full rounded-t-lg transition-all duration-300"
                  style={{ 
                    height: `${height}%`,
                    backgroundColor: i === 2 ? '#FF6002' : '#9BF900'
                  }}
                ></div>
                {i === 2 && <span className="text-xs text-center mt-1">+35%</span>}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: 'rgba(155, 249, 0, 0.1)' }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1725BB' }}>
                  <span className="text-white text-xs font-bold">JD</span>
                </div>
                <div>
                  <div className="font-semibold text-xs md:text-sm">John Doe</div>
                  <div className="text-xs text-gray-500">Web Development</div>
                </div>
              </div>
              <span className="font-semibold text-sm md:text-base">92%</span>
            </div>
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF6002' }}>
                  <span className="text-white text-xs font-bold">SM</span>
                </div>
                <div>
                  <div className="font-semibold text-xs md:text-sm">Sarah Miller</div>
                  <div className="text-xs text-gray-500">Data Science</div>
                </div>
              </div>
              <span className="font-semibold text-sm md:text-base">88%</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'placement',
      title: 'Placement',
      description: 'Our dedicated placement cell ensures you land your dream job. With 95% placement success rate and partnerships with 500+ companies worldwide.',
      gradient: 'from-orange-50 via-blue-50 to-orange-50',
      widget: (
        <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 w-64 md:w-72 shadow-xl">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF6002' }}>
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">95%</div>
              <div className="text-xs md:text-sm text-gray-500">Success Rate</div>
            </div>
          </div>
          <div className="space-y-2 md:space-y-3">
            <div className="flex justify-between items-center p-2 md:p-3 rounded-xl" style={{ backgroundColor: 'rgba(155, 249, 0, 0.15)' }}>
              <span className="text-xs md:text-sm font-medium">Students Placed</span>
              <span className="text-base md:text-lg font-bold" style={{ color: '#1725BB' }}>2,450</span>
            </div>
            <div className="flex justify-between items-center p-2 md:p-3 bg-gray-50 rounded-xl">
              <span className="text-xs md:text-sm font-medium">Avg. Package</span>
              <span className="text-base md:text-lg font-bold">$85K</span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="text-center">
                <div className="text-lg md:text-xl font-bold" style={{ color: '#1725BB' }}>500+</div>
                <div className="text-xs text-gray-500">Partners</div>
              </div>
              <div className="text-center">
                <div className="text-lg md:text-xl font-bold" style={{ color: '#FF6002' }}>24</div>
                <div className="text-xs text-gray-500">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-lg md:text-xl font-bold" style={{ color: '#9BF900' }}>★4.9</div>
                <div className="text-xs text-gray-500">Rating</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  }, [cards.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  }, [cards.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleUserInteraction = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-6 md:py-12 px-3 md:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-8 md:mb-12 lg:mb-16 gap-6 lg:gap-12">
          <div className="flex-1">
            <div className="font-semibold mb-3 md:mb-4 tracking-wide text-xs md:text-sm" style={{ color: '#1725BB' }}>
              EDWIN ACADEMY
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Transform your future<br />
              <span className="relative inline-block">
                with world-class education
                <svg className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-2 md:h-3" viewBox="0 0 500 20" fill="none" preserveAspectRatio="none">
                  <path d="M0 10 Q 250 0, 500 10" stroke="#9BF900" strokeWidth="3" fill="none"/>
                </svg>
              </span>
            </h1>
          </div>
          
          <div className="flex-1 max-w-md lg:pt-8">
            <p className="text-gray-600 text-sm md:text-base lg:text-lg mb-4 md:mb-6 leading-relaxed">
              Master in-demand skills through expert-led courses, personalized mentorship, and guaranteed placement support — all in one transformative learning experience
            </p>
            <button 
              className="text-white px-5 md:px-8 py-2.5 md:py-4 rounded-full font-semibold transition-all duration-300 inline-flex items-center gap-2 text-sm md:text-base hover:shadow-lg transform hover:scale-105"
              style={{ backgroundColor: '#FF6002' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e55502'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF6002'}
            >
              Start Learning Today
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative py-6 md:py-12 overflow-hidden">
          <div className="flex gap-3 md:gap-6 items-stretch">
            {cards.map((card, index) => {
              const isActive = index === activeIndex;
              
              return (
                <div
                  key={card.id}
                  className={`
                    rounded-2xl md:rounded-3xl transition-all duration-700 ease-out
                    ${isActive 
                      ? 'flex-1 max-w-5xl opacity-100 scale-100' 
                      : 'w-20 md:w-32 lg:w-48 opacity-70 hover:opacity-90 scale-95 hover:scale-100 cursor-pointer'
                    }
                  `}
                  onClick={() => {
                    if (!isActive) {
                      setActiveIndex(index);
                      handleUserInteraction();
                    }
                  }}
                >
                  <div className={`
                    h-[350px] md:h-[450px] rounded-2xl md:rounded-3xl overflow-hidden
                    bg-gradient-to-br ${card.gradient}
                    transition-all duration-700 ease-out
                  `}>
                    {isActive ? (
                      <div className="relative h-full">
                        <div className="p-4 md:p-8 lg:p-12 h-full flex flex-col lg:flex-row items-center gap-4 md:gap-6">
                          <div className="flex-1 w-full">
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-6" style={{ color: '#1725BB' }}>
                              {card.title}
                            </h2>
                            <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed">
                              {card.description}
                            </p>
                          </div>
                          <div className="flex-1 flex justify-center items-center w-full overflow-hidden">
                            <div className="transform scale-90 md:scale-95 lg:scale-100 origin-center">
                              {card.widget}
                            </div>
                          </div>
                        </div>
                        
                        <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 flex items-center gap-2 md:gap-3 z-50">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              prevSlide();
                              handleUserInteraction();
                            }}
                            className="w-9 h-9 md:w-12 md:h-12 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
                            style={{ backgroundColor: '#1725BB' }}
                            aria-label="Previous slide"
                          >
                            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              nextSlide();
                              handleUserInteraction();
                            }}
                            className="w-9 h-9 md:w-12 md:h-12 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
                            style={{ backgroundColor: '#1725BB' }}
                            aria-label="Next slide"
                          >
                            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <div 
                          className="text-xl md:text-3xl lg:text-4xl font-bold transition-colors duration-300"
                          style={{ 
                            writingMode: 'vertical-rl',
                            textOrientation: 'mixed',
                            color: '#1725BB'
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
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6 md:mt-8">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                handleUserInteraction();
              }}
              className="h-1.5 md:h-2 rounded-full transition-all duration-300"
              style={{
                width: index === activeIndex ? '2rem' : '0.5rem',
                backgroundColor: index === activeIndex ? '#1725BB' : '#d1d5db'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EdwinAcademyCarousel;