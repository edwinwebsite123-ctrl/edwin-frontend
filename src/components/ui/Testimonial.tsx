'use client';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isVisible, setIsVisible] = useState(false);
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

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(interval);
  }, [currentIndex, cardsPerView]);

  const testimonials = [
    {
      text: "This was the most well-managed project I've been a part of. The communication was exceptional.",
      name: "Nikh Khosla",
      role: "CEO - Seneca (US)",
      image: "NK",
    },
    {
      text: "Edwin Academy transformed my career! I landed my dream job within 3 months of graduation.",
      name: "Sarah Johnson",
      role: "Software Engineer - Tech Corp",
      image: "SJ",
    },
    {
      text: "The hands-on approach and real-world projects gave me confidence throughout my journey.",
      name: "Michael Chen",
      role: "Data Analyst - Analytics Pro",
      image: "MC",
    },
    {
      text: "Outstanding experience! The practical training and exposure prepared me perfectly for my career.",
      name: "Priya Sharma",
      role: "Product Manager - Tech Innovations",
      image: "PS",
    },
    {
      text: "The mentorship program was exceptional. Real-world projects boosted my confidence for interviews.",
      name: "James Wilson",
      role: "UX Designer - Creative Studios",
      image: "JW",
    },
  ];

  const nextSlide = () =>
    setCurrentIndex((prev) =>
      prev + 1 >= testimonials.length - cardsPerView + 1 ? 0 : prev + 1
    );

  const prevSlide = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - cardsPerView : prev - 1
    );

  const goToSlide = (index: number) => setCurrentIndex(index);

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
        </div>

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
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-2 sm:px-0"
                  style={{
                    width:
                      cardsPerView === 1
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
                      <div
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white font-semibold"
                        style={{ backgroundColor: '#1725BB' }}
                      >
                        {testimonial.image}
                      </div>
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
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
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

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8 sm:mt-12">
            {Array.from({ length: testimonials.length - cardsPerView + 1 }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === index
                      ? 'w-6 sm:w-8 h-2 bg-[#9BF900]'
                      : 'w-2 sm:w-3 h-2 bg-white/40 hover:bg-white/60'
                  }`}
                />
              )
            )}
          </div>
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
