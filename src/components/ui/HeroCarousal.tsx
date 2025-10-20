import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Code, BarChart3, Megaphone, Brain, Users, Target, Zap } from 'lucide-react';

// Academy Carousel Component
const AcademyCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);
  
  const courses = [
    {
      id: 1,
      title: "Web Development",
      category: "Personal Learning",
      description: "Master modern web technologies with hands-on projects. Build responsive websites using HTML, CSS, JavaScript, and React.",
      image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      icon: Code,
      duration: "12 weeks",
      students: "2,847"
    },
    {
      id: 2,
      title: "Data Science",
      category: "Business Training",
      description: "Transform raw data into actionable insights. Learn Python, machine learning, and statistical analysis for business decisions.",
      image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      icon: BarChart3,
      duration: "16 weeks",
      students: "1,923"
    },
    {
      id: 3,
      title: "Digital Marketing",
      category: "Freelance Skills",
      description: "Build your brand and reach customers online. Master SEO, social media marketing, content strategy, and analytics.",
      image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      icon: Megaphone,
      duration: "10 weeks",
      students: "3,156"
    },
    {
      id: 4,
      title: "AI & Machine Learning",
      category: "Advanced Programs",
      description: "Dive deep into artificial intelligence and neural networks. Create intelligent systems that can learn and adapt.",
      image: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      icon: Brain,
      duration: "20 weeks",
      students: "892"
    },
    {
      id: 5,
      title: "UX/UI Design",
      category: "Personal Learning",
      description: "Design intuitive user experiences and beautiful interfaces. Learn design thinking, prototyping, and user research.",
      image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      icon: Target,
      duration: "14 weeks",
      students: "2,134"
    },
    {
      id: 6,
      title: "Project Management",
      category: "Business Training",
      description: "Lead teams and deliver projects successfully. Master agile methodologies, stakeholder management, and strategic planning.",
      image: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      icon: Users,
      duration: "8 weeks",
      students: "1,678"
    }
  ];

  const totalSlides = courses.length;
  const cardsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div 
        className="overflow-hidden rounded-2xl"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div 
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsPerView.desktop)}%)`,
          }}
        >
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-3"
            >
              <div className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                {/* Background Gradient */}
                <div 
                  className="absolute inset-0"
                  style={{ background: course.image }}
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <course.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                          {course.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                      <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                      <div className="w-2 h-2 bg-white/20 rounded-full"></div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">
                      {course.title}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed mb-4 line-clamp-3">
                      {course.description}
                    </p>
                    
                    {/* Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Zap className="w-4 h-4 text-yellow-400" />
                          <span className="text-white/90 text-xs font-medium">{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-blue-400" />
                          <span className="text-white/90 text-xs font-medium">{course.students}</span>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs font-semibold hover:bg-white/30 transition-all duration-300 border border-white/20">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-colors duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
      </button>

      {/* Pagination Dots */}
      <div className="flex justify-center space-x-2 mt-8">
        {courses.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-blue-600 w-8'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play Indicator */}
      <div className="absolute top-4 right-4 z-10">
        <div className={`w-3 h-3 rounded-full ${isAutoPlaying ? 'bg-green-400' : 'bg-red-400'} shadow-lg`} />
      </div>
    </div>
  );
};

// Main Page Component with Carousel
const AcademyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Section */}
      <div className="px-6 pt-16 pb-12 lg:px-12 lg:pt-24 lg:pb-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Discover the freedom of learning
            <br />
            <span className="text-blue-600">at your own pace</span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Choose from a variety of programs designed for students, professionals, and freelancers.
            Start your journey towards mastering new skills and advancing your career.
          </p>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="px-6 pb-16 lg:px-12 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          <AcademyCarousel />
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 pb-16 lg:px-12 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">50K+</div>
                <div className="text-gray-600 font-medium">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">200+</div>
                <div className="text-gray-600 font-medium">Expert Instructors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">95%</div>
                <div className="text-gray-600 font-medium">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-gray-600 font-medium">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyPage;