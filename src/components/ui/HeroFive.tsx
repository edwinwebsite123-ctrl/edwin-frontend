import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight, BookOpen, Users, Award, TrendingUp, GraduationCap, Sparkles } from 'lucide-react';

const EdwinAcademyCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  const cards = [
    {
      id: 'courses',
      title: 'Professional Courses',
      description: 'Master industry-leading skills with our comprehensive curriculum designed by experts. From fundamentals to advanced techniques, we guide your learning journey.',
      accentColor: '#FF6002',
      bgGradient: 'from-orange-50 via-white to-orange-50',
      stats: [
        { label: 'Courses', value: '50+' },
        { label: 'Success Rate', value: '95%' },
        { label: 'Support', value: '24/7' }
      ],
      image: (
        <div className="relative w-full h-full bg-gradient-to-br from-orange-50 to-white rounded-2xl overflow-hidden border-2 border-orange-100 shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <BookOpen className="w-32 h-32 text-orange-200" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-400 rounded-full animate-ping"></div>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border-2 border-orange-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-900">50+ Courses</div>
                  <div className="text-xs text-orange-600 font-medium">Available Now</div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-2 text-center border border-orange-200">
                  <div className="font-bold text-lg text-orange-600">95%</div>
                  <div className="text-xs text-gray-600">Success</div>
                </div>
                <div className="flex-1 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-2 text-center border border-orange-200">
                  <div className="font-bold text-lg text-orange-600">24/7</div>
                  <div className="text-xs text-gray-600">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'mentorship',
      title: 'Expert Mentorship',
      description: 'Learn directly from industry professionals with years of experience. Get personalized guidance and insights that accelerate your career growth.',
      accentColor: '#1725BB',
      bgGradient: 'from-blue-50 via-white to-blue-50',
      stats: [
        { label: 'Mentors', value: '100+' },
        { label: 'Experience', value: '10+ Yrs' },
        { label: 'Sessions', value: '1000+' }
      ],
      image: (
        <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-white rounded-2xl overflow-hidden border-2 border-blue-100 shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <Users className="w-32 h-32 text-blue-200" />
              <div className="absolute top-0 right-0 w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border-2 border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-900">100+ Mentors</div>
                  <div className="text-xs text-blue-600 font-medium">Industry Experts</div>
                </div>
              </div>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white shadow-md bg-gradient-to-br from-blue-600 to-blue-700"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 border-2 border-white shadow-md"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 border-2 border-white shadow-md"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 border-2 border-white flex items-center justify-center shadow-md">
                  <span className="text-xs font-bold text-gray-700">+96</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'certification',
      title: 'Industry Certification',
      description: 'Earn recognized certifications that boost your career prospects. Our programs are aligned with industry standards and employer requirements.',
      accentColor: '#9BF900',
      bgGradient: 'from-green-50 via-white to-green-50',
      stats: [
        { label: 'Certifications', value: '15+' },
        { label: 'Placement', value: '90%' },
        { label: 'Recognition', value: 'Global' }
      ],
      image: (
        <div className="relative w-full h-full bg-gradient-to-br from-green-50 to-white rounded-2xl overflow-hidden border-2 border-green-200 shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <Award className="w-32 h-32 text-green-200" />
              <Sparkles className="w-6 h-6 text-green-500 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border-2 border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                  <Award className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-900">15+ Certifications</div>
                  <div className="text-xs font-medium" style={{ color: '#9BF900' }}>Globally Recognized</div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border-2 border-green-200">
                <div className="text-2xl font-bold text-green-700">90%</div>
                <div className="text-xs text-gray-600">Placement Rate</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'placement',
      title: 'Career Placement',
      description: 'Join thousands of successful graduates who landed their dream jobs. Our dedicated placement team ensures you\'re interview-ready and connected with top employers.',
      accentColor: '#1725BB',
      bgGradient: 'from-blue-50 via-white to-indigo-50',
      stats: [
        { label: 'Alumni', value: '5000+' },
        { label: 'Avg Package', value: '₹8 LPA' },
        { label: 'Partners', value: '150+' }
      ],
      image: (
        <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl overflow-hidden border-2 border-blue-100 shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <TrendingUp className="w-32 h-32 text-blue-200" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse"></div>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border-2 border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-900">5000+ Alumni</div>
                  <div className="text-xs text-blue-600 font-medium">Successfully Placed</div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-2 text-center border border-blue-200">
                  <div className="font-bold text-lg text-blue-600">₹8 LPA</div>
                  <div className="text-xs text-gray-600">Avg Package</div>
                </div>
                <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-2 text-center border border-blue-200">
                  <div className="font-bold text-lg text-blue-600">150+</div>
                  <div className="text-xs text-gray-600">Partners</div>
                </div>
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
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleUserInteraction = (callback) => {
    setIsAutoPlaying(false);
    callback();
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-12 mb-8 lg:mb-12">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900 ">
              Discover the freedom<br />
              <span className="relative inline-block">
                of learning on your terms
                <svg className="absolute -bottom-1 left-0 w-full h-3 animate-pulse" viewBox="0 0 300 12" fill="none">
                  <path d="M0 6 Q 150 0, 300 6" stroke="#9BF900" strokeWidth="4" fill="none"/>
                </svg>
              </span>
            </h1>
          </div>
          
          <div className="flex-1 max-w-md">
            <p className="text-gray-600 text-base lg:text-lg mb-4 lg:mb-6 leading-relaxed">
              Get expert courses, mentorship, certifications, and career placement — all in one comprehensive learning solution
            </p>
            <button 
              className="group text-white px-6 py-3 lg:px-8 lg:py-4 rounded-full font-semibold transition-all duration-300 inline-flex items-center gap-2 text-sm lg:text-base shadow-lg hover:shadow-2xl"
              style={{ backgroundColor: '#FF6002' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e55502';
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FF6002';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              Explore Our Courses
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Desktop and Tablet View */}
          <div className="hidden sm:flex gap-3 sm:gap-4 lg:gap-6 overflow-hidden">
            {cards.map((card, index) => {
              const isActive = index === activeIndex;
              
              return (
                <div
                  key={card.id}
                  className={`flex-shrink-0 transition-all duration-700 ease-out ${
                    isActive 
                      ? 'w-full lg:flex-1 opacity-100 scale-100' 
                      : 'w-32 lg:w-40 opacity-60 cursor-pointer hover:opacity-80 scale-95 hover:scale-100'
                  }`}
                  onClick={() => !isActive && handleUserInteraction(() => setActiveIndex(index))}
                  onMouseEnter={() => !isActive && setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={`h-[450px] lg:h-[500px] rounded-2xl lg:rounded-3xl overflow-hidden bg-gradient-to-br ${card.bgGradient} border-2 transition-all duration-700 ${
                    isActive ? 'border-gray-200 shadow-2xl' : hoveredCard === index ? 'border-gray-300 shadow-lg' : 'border-gray-100 shadow-md'
                  }`}>
                    {isActive ? (
                      <div className="relative h-full p-6 sm:p-8 lg:p-12 flex flex-col lg:flex-row gap-6 lg:gap-8">
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-4">
                              <div 
                                className="w-16 h-1.5 rounded-full transition-all duration-700 shadow-lg"
                                style={{ backgroundColor: card.accentColor }}
                              ></div>
                              <div 
                                className="w-2 h-2 rounded-full animate-ping"
                                style={{ backgroundColor: card.accentColor }}
                              ></div>
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 lg:mb-4 text-gray-900 animate-fade-in">
                              {card.title}
                            </h2>
                            <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mb-6">
                              {card.description}
                            </p>
                            
                            {/* Stats Pills */}
                            <div className="flex flex-wrap gap-2">
                              {card.stats.map((stat, idx) => (
                                <div 
                                  key={idx}
                                  className="px-4 py-2 rounded-full border-2 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                                  style={{ borderColor: card.accentColor + '40' }}
                                >
                                  <span className="font-bold text-sm" style={{ color: card.accentColor }}>
                                    {stat.value}
                                  </span>
                                  <span className="text-xs text-gray-600 ml-1">{stat.label}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1 relative transform hover:scale-105 transition-transform duration-500">
                          {card.image}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUserInteraction(nextSlide);
                          }}
                          className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 group"
                        >
                          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    ) : (
                      <div 
                        className="h-full flex items-center justify-center p-4 transition-colors duration-300"
                        style={{ 
                          backgroundColor: hoveredCard === index ? card.accentColor + '50' : card.accentColor + '30'
                        }}
                      >
                        <div 
                          className="text-xl sm:text-2xl lg:text-3xl font-bold transition-all duration-300"
                          style={{ 
                            writingMode: 'vertical-rl',
                            textOrientation: 'mixed',
                            transform: 'rotate(180deg)',
                            color: hoveredCard === index ? card.accentColor : card.accentColor + 'CC'
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

          {/* Mobile View - Only Active Card */}
          <div className="sm:hidden">
            <div className={`h-[550px] rounded-2xl overflow-hidden bg-gradient-to-br ${cards[activeIndex].bgGradient} border-2 border-gray-200 shadow-2xl`}>
              <div className="relative h-full p-6 flex flex-col gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center gap-2 mb-4">
                    <div 
                      className="w-16 h-1.5 rounded-full shadow-lg"
                      style={{ backgroundColor: cards[activeIndex].accentColor }}
                    ></div>
                    <div 
                      className="w-2 h-2 rounded-full animate-ping"
                      style={{ backgroundColor: cards[activeIndex].accentColor }}
                    ></div>
                  </div>
                  <h2 className="text-3xl font-bold mb-3 text-gray-900">
                    {cards[activeIndex].title}
                  </h2>
                  <p className="text-base text-gray-600 leading-relaxed mb-4">
                    {cards[activeIndex].description}
                  </p>
                  
                  {/* Stats Pills for Mobile */}
                  <div className="flex flex-wrap gap-2">
                    {cards[activeIndex].stats.map((stat, idx) => (
                      <div 
                        key={idx}
                        className="px-3 py-1.5 rounded-full border-2 bg-white/80 backdrop-blur-sm"
                        style={{ borderColor: cards[activeIndex].accentColor + '40' }}
                      >
                        <span className="font-bold text-xs" style={{ color: cards[activeIndex].accentColor }}>
                          {stat.value}
                        </span>
                        <span className="text-xs text-gray-600 ml-1">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex-1 relative">
                  {cards[activeIndex].image}
                </div>

                <button
                  onClick={() => handleUserInteraction(nextSlide)}
                  className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center shadow-xl transition-all duration-300 active:scale-95"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Dots */}
        <div className="flex justify-center gap-3 mt-6 lg:mt-8">
          {cards.map((card, index) => (
            <button
              key={index}
              onClick={() => handleUserInteraction(() => setActiveIndex(index))}
              className={`rounded-full transition-all duration-500 hover:scale-110 ${
                index === activeIndex ? 'w-10 h-3 shadow-lg' : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
              }`}
              style={index === activeIndex ? { backgroundColor: card.accentColor } : {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EdwinAcademyCarousel;