import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FacultyCardProps {
  name: string;
  title: string;
  facultyImage: string;
}

const FacultyCard = ({ name, title, facultyImage }: FacultyCardProps) => {
  return (
    <div
      className="relative h-[420px] sm:h-[450px] rounded-2xl sm:rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 group mx-auto"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-500" />

      {/* Faculty Image */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
        <Image
          src={facultyImage || "/api/placeholder/320/420"}
          alt={name}
          width={320}
          height={420}
          className="w-full h-full object-cover drop-shadow-2xl"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

      {/* Text Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-30 p-4 sm:p-6 text-center text-white">
        <h3 className="font-semibold text-base sm:text-lg mb-1">{name}</h3>
        <p className="text-xs sm:text-sm opacity-90">{title}</p>
      </div>
    </div>
  );
};

export default function FacultySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  const facultyMembers = [
    {
      name: "Vineetha",
      title: "Head of Healthcare Department, Edwin Academy",
      facultyImage: "/fac/1 (1).jpeg",
      bgImage: "/placements/bg.png"
    },
    {
      name: "Soniya N",
      title: "HR Trainer",
      facultyImage: "/fac/1 (2).jpeg",
      bgImage: "/placements/bg.png"
    },
    {
      name: "Dr. Anupriya N",
      title: "Public Health & Ayurveda Specialist",
      facultyImage: "/fac/1 (3).jpeg",
      bgImage: "/placements/bg.png"
    },
    {
      name: "Sharath K",
      title: "HR Faculty, Edwin Academy",
      facultyImage: "/fac/1 (4).jpeg",
      bgImage: "/placements/bg.png"
    },
    {
      name: "Shilpa Ghosh P V",
      title: "Senior HRM Faculty",
      facultyImage: "/fac/1 (5).jpeg",
      bgImage: "/placements/bg.png"
    }
  ];

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

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev + 1 >= facultyMembers.length - cardsPerView + 1 ? 0 : prev + 1
    );
  }, [cardsPerView, facultyMembers.length]);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);


  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? facultyMembers.length - cardsPerView : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section
      className="w-full py-12 sm:py-20 px-4"
    //   style={{
    //     backgroundImage: 'url("/fac/bg.jpg")',
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //     backgroundAttachment: 'fixed'
    //   }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 uppercase">
            Guided by Experts.
            <br />
            Inspired by Leaders.
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed px-4">
            Behind every successful learner stands a mentor who inspires, guides, and challenges them to reach new heights. Our mentors are industry pioneers, seasoned educators, and global innovators who bring real-world expertise to every session.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="w-full relative">
          <div className="overflow-hidden px-0 sm:px-12">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
                gap: cardsPerView === 1 ? '0' : '1.5rem',
              }}
            >
              {facultyMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-2 sm:px-0"
                  style={{
                    width: cardsPerView === 1 ? '100%' : cardsPerView === 2 ? 'calc(50% - 0.75rem)' : 'calc(33.333% - 1rem)',
                  }}
                >
                  <div style={{ maxWidth: cardsPerView === 1 ? '320px' : '100%', margin: '0 auto' }}>
                    <FacultyCard
                      name={member.name}
                      title={member.title}
                      facultyImage={member.facultyImage}
                    />
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
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 z-30"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-12">
            {Array.from({ length: facultyMembers.length - cardsPerView + 1 }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${currentIndex === index
                      ? 'w-8 sm:w-10 h-2.5 sm:h-3 bg-gray-800'
                      : 'w-2.5 sm:w-3 h-2.5 sm:h-3 bg-gray-400 hover:bg-gray-500'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}