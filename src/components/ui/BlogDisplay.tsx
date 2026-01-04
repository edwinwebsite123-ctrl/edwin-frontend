import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Blog } from '@/data/api';

interface BlogCarouselProps {
  blogs?: Blog[];
  loading?: boolean;
  error?: string | null;
}

export default function BlogCarousel({ blogs: propBlogs, loading = false, error = null }: BlogCarouselProps) {
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


  useEffect(() => {
    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);



  // Use provided blogs or fallback to default blogs if none provided
  const defaultBlogs = [
    {
      id: 1,
      title: "Our visionary CEO, Dr. Muhammed Ameen, has been conferred with his Doctorate from Hawkins University, USA.",
      slug: "ceo-doctorate-award",
      date: "January 26, 2024",
      image: "/hero/banner-1.jpg",
      content: "Our visionary CEO, Dr. Muhammed Ameen, has been conferred with his Doctorate from Hawkins University, USA.",
      status: "published",
      created_at: "2024-01-26T00:00:00Z",
      updated_at: "2024-01-26T00:00:00Z"
    },
    {
      id: 2,
      title: "Edwin Academy launches new AI and Machine Learning program to empower next generation developers.",
      slug: "ai-ml-program-launch",
      date: "February 15, 2024",
      image: "/hero/banner-2.jpg",
      content: "Edwin Academy launches new AI and Machine Learning program to empower next generation developers.",
      status: "published",
      created_at: "2024-02-15T00:00:00Z",
      updated_at: "2024-02-15T00:00:00Z"
    },
    {
      id: 3,
      title: "100% placement record achieved for the 2024 batch with top companies recruiting our graduates.",
      slug: "100-percent-placement-2024",
      date: "March 10, 2024",
      image: "/popular/ai.png",
      content: "100% placement record achieved for the 2024 batch with top companies recruiting our graduates.",
      status: "published",
      created_at: "2024-03-10T00:00:00Z",
      updated_at: "2024-03-10T00:00:00Z"
    },
    {
      id: 4,
      title: "New state-of-the-art campus inauguration ceremony attended by industry leaders and dignitaries.",
      slug: "campus-inauguration-ceremony",
      date: "March 28, 2024",
      image: "/popular/digital.png",
      content: "New state-of-the-art campus inauguration ceremony attended by industry leaders and dignitaries.",
      status: "published",
      created_at: "2024-03-28T00:00:00Z",
      updated_at: "2024-03-28T00:00:00Z"
    },
    {
      id: 5,
      title: "Edwin Academy partners with Fortune 500 companies to provide industry-integrated training programs.",
      slug: "fortune-500-partnership",
      date: "April 05, 2024",
      image: "/popular/code.png",
      content: "Edwin Academy partners with Fortune 500 companies to provide industry-integrated training programs.",
      status: "published",
      created_at: "2024-04-05T00:00:00Z",
      updated_at: "2024-04-05T00:00:00Z"
    }
  ];

  const blogs = propBlogs || defaultBlogs;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev + 1 >= blogs.length - cardsPerView + 1 ? 0 : prev + 1
    );
  }, [cardsPerView, blogs.length]);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

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
                        {(blog.image) ? (
                          <Image
                            src={
                              blog.image!.startsWith('http')
                                ? blog.image!
                                : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${blog.image}`
                            }
                            alt={blog.title}
                            width={600}
                            height={450}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <svg
                              className="w-16 h-16 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M8.5 9h7M8.5 12h7M8.5 15h4"
                              />
                            </svg>
                          </div>
                        )}


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
                        <Link
                          href={`/edwinfeaturednews/${blog.slug}`}
                          className="inline-flex items-center gap-2 text-blue-600 font-medium text-sm hover:gap-3 transition-all duration-300 group/btn"
                        >
                          <span>Read More</span>
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center group-hover/btn:bg-blue-700 transition-colors duration-300">
                            <ArrowRight className="w-4 h-4 text-white" />
                          </div>
                        </Link>
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
                    className={`transition-all duration-300 rounded-full ${currentIndex === index
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