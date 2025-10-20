import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export default function BlogCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, cardsPerView]);

  const blogs = [
    {
      title: "Our visionary CEO, Dr. Muhammed Ameen, has been conferred with his Doctorate from Hawkins University, USA.",
      date: "January 26, 2024",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop"
    },
    {
      title: "Edwin Academy launches new AI and Machine Learning program to empower next generation developers.",
      date: "February 15, 2024",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop"
    },
    {
      title: "100% placement record achieved for the 2024 batch with top companies recruiting our graduates.",
      date: "March 10, 2024",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop"
    },
    {
      title: "New state-of-the-art campus inauguration ceremony attended by industry leaders and dignitaries.",
      date: "March 28, 2024",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop"
    },
    {
      title: "Edwin Academy partners with Fortune 500 companies to provide industry-integrated training programs.",
      date: "April 05, 2024",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + 1 >= blogs.length - cardsPerView + 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? blogs.length - cardsPerView : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div ref={sectionRef} className="relative w-full bg-white py-12 sm:py-16 lg:py-20">
      {/* Content */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div 
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4 transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
            }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight uppercase">
              What we&apos;ve
              <br className="sm:hidden" />
              <span className="sm:ml-2">Been up to lately</span>
            </h2>
            
            {/* Desktop Navigation Buttons */}
            <div className="hidden sm:flex gap-3">
              <button
                onClick={prevSlide}
                className="w-12 h-12 lg:w-14 lg:h-14 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-gray-900 hover:bg-gray-50 transition-all duration-300"
                aria-label="Previous blog"
              >
                <ChevronLeft className="w-6 h-6 text-gray-900" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 lg:w-14 lg:h-14 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-gray-900 hover:bg-gray-50 transition-all duration-300"
                aria-label="Next blog"
              >
                <ChevronRight className="w-6 h-6 text-gray-900" />
              </button>
            </div>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
                  gap: cardsPerView === 1 ? '0' : '1.5rem',
                }}
              >
                {blogs.map((blog, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 px-2 sm:px-0"
                    style={{
                      width: cardsPerView === 1 ? '100%' : cardsPerView === 2 ? 'calc(50% - 0.75rem)' : 'calc(33.333% - 1rem)',
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                      transition: `all 0.8s ease-out ${index * 0.15}s`
                    }}
                  >
                    {/* Card */}
                    <div
                      className="relative h-auto bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-500 group mx-auto"
                      style={{
                        maxWidth: cardsPerView === 1 ? '400px' : '100%',
                      }}
                    >
                      {/* Image Container */}
                      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          width={600}
                          height={450}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-5 sm:p-6">
                        {/* Date */}
                        <p className="text-sm text-gray-500 mb-3">
                          {blog.date}
                        </p>

                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 leading-relaxed mb-4 line-clamp-3">
                          {blog.title}
                        </h3>

                        {/* Read More Button */}
                        <button className="inline-flex items-center gap-2 text-blue-600 font-medium text-sm hover:gap-3 transition-all duration-300 group/btn">
                          <span>Read More</span>
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center group-hover/btn:bg-blue-700 transition-colors duration-300">
                            <ArrowRight className="w-4 h-4 text-white" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Navigation Buttons */}
            <div className="flex sm:hidden justify-center gap-3 mt-6">
              <button
                onClick={prevSlide}
                className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-gray-900 hover:bg-gray-50 transition-all duration-300"
                aria-label="Previous blog"
              >
                <ChevronLeft className="w-6 h-6 text-gray-900" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-gray-900 hover:bg-gray-50 transition-all duration-300"
                aria-label="Next blog"
              >
                <ChevronRight className="w-6 h-6 text-gray-900" />
              </button>
            </div>

            {/* Dots - Hidden on mobile since we have buttons */}
            <div className="hidden sm:flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-12">
              {Array.from({ length: blogs.length - cardsPerView + 1 }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      currentIndex === index
                        ? 'w-8 sm:w-10 h-2.5 sm:h-3 bg-gray-900'
                        : 'w-2.5 sm:w-3 h-2.5 sm:h-3 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to blog ${index + 1}`}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}