'use client'
import React from 'react'
import Link from 'next/link'
import HeroSectionThree from '@/components/ui/Herotthree'
import Navbar from '@/components/ui/navigation-menu'
import MarqueeAccreditation from '@/components/ui/Marquee'

import Image from 'next/image';
import BannerCTA from '@/components/ui/BannerCTA'
import CardOverlay from '@/components/ui/CardOverlay'
import PopularCourses from '@/components/ui/Popularcourse'
import { ArrowRight } from 'lucide-react'
import PlacementCarousel from '@/components/ui/PlacementCarousal'
import FacultySection from '@/components/ui/FacultySection'
import EdwinAcademySections from '@/components/ui/EdwinTeam'
import FAQSection from '@/components/ui/FAQ'
import TestimonialSection from '@/components/ui/Testimonial'
import Footer from '@/components/ui/Footer'
import EdwinTalks from '@/components/ui/EdwinTalks'




export default function HeroSection() {

  // // Counter animation hook
  // const useCounter = (end: number, duration: number = 2000, start: number = 0) => {
  //   const [count, setCount] = useState(start);

  //   useEffect(() => {
  //     let startTime: number | undefined;
  //     let animationFrame: number;

  //     const animate = (currentTime: number) => {
  //       if (!startTime) startTime = currentTime;
  //       const progress = (currentTime - startTime) / duration;

  //       if (progress < 1) {
  //         setCount(Math.floor(start + (end - start) * progress));
  //         animationFrame = requestAnimationFrame(animate);
  //       } else {
  //         setCount(end);
  //       }
  //     };

  //     animationFrame = requestAnimationFrame(animate);
  //     return () => cancelAnimationFrame(animationFrame);
  //   }, [end, duration, start]);

  //   return count;
  // };

  // // Stat Card Component
  // interface StatCardProps {
  //   icon: React.ReactNode;
  //   value: number;
  //   label: string;
  //   suffix?: string;
  //   delay?: number;
  // }

  // const StatCard = ({ icon, value, label, suffix = '+', delay = 0 }: StatCardProps) => {
  //   const [isVisible, setIsVisible] = useState(false);
  //   const count = useCounter(isVisible ? value : 0, 2000);

  //   useEffect(() => {
  //     const timer = setTimeout(() => setIsVisible(true), delay);
  //     return () => clearTimeout(timer);
  //   }, [delay]);

  //   return (
  //     <div className="flex flex-col items-center text-center">
  //       <div className="text-blue-600 mb-3">{icon}</div>
  //       <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-1">
  //         {count.toLocaleString()}{suffix}
  //       </div>
  //       <div className="text-gray-700 text-sm md:text-base font-medium">{label}</div>
  //     </div>
  //   );
  // };

  return (
    <>
      <header>
        <Navbar />

      </header>
      <HeroSectionThree />


      <div className="bg-white">
  {/* Welcome Section */}
  <section className="bg-blue-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-5xl mx-auto text-center">
      {/* Tag / Label */}
      <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 bg-blue-100/50 border border-blue-200 rounded-full mb-6 backdrop-blur-sm">
        <div className="w-2 h-2 rounded-full bg-[#1725BB]"></div>
        <span className="font-medium text-xs sm:text-sm tracking-wider text-[#1725BB]">
          WELCOME
        </span>
      </div>

      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight uppercase px-2">
        Welcome to Edwin Academy
        <span
          className="block mt-2 text-transparent bg-clip-text"
          style={{
            backgroundImage: "linear-gradient(135deg, #0519ff 0%, #00a2ff 100%)",
          }}
        >
          Empowering Your Career Journey
        </span>
      </h2>

      {/* Description */}
      <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-light px-2">
        Edwin Academy is a career-oriented and educational platform for aspiring learners.
        Our innovative approach offers a practical, industry-focused curriculum developed with
        input from experienced professionals. We are committed to helping individuals become
        self-sufficient, confident, and capable of leading fulfilling lives.
      </p>
    </div>
  </section>
</div>

        <PopularCourses />

        <MarqueeAccreditation />

        {/* Stats Section */}
        {/* <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <StatCard
            icon={
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14l-6-6h12z"/>
                <path d="M5.5 7L12 3l6.5 4v10l-6.5 4-6.5-4z" opacity="0.3"/>
                <path d="M12 3L5.5 7v10l6.5 4 6.5-4V7L12 3zm0 2.2l4.5 2.7v7.2L12 17.8l-4.5-2.7V7.9L12 5.2z"/>
              </svg>
            }
            value={8000}
            label="Students"
            delay={0}
          />
          
          <StatCard
            icon={
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            }
            value={3}
            label="Branches"
            delay={200}
          />
          
          <StatCard
            icon={
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
            }
            value={5}
            label="Years of operations"
            delay={400}
          />
          
          <StatCard
            icon={
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
              </svg>
            }
            value={3000}
            label="Placements"
            delay={600}
          />
        </div>
      </div> */}



        {/* Hero Section with Image */}
        <div className="relative w-full bg-white">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2">
            {/* Blue Section - Left */}
            <div className="bg-[#1325C2] text-white p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 uppercase">
                Shaping the Future with Innovation & Technology
              </h1>
              <p className="text-sm md:text-base mb-6 leading-relaxed opacity-90">
                Step into a world where education meets cutting edge technology. From
                AI-driven learning platforms and smart classrooms to immersive VR
                experiences, we empower students to innovate, experiment, and lead the
                digital revolution.
              </p>

              <Link href="/course">
                <button
                  className="lg:mb-2 group inline-flex items-center gap-3 px-6 lg:px-8 py-3 lg:py-4 bg-[#FF6002] hover:bg-[#e65502] text-white rounded-full font-semibold text-sm lg:text-base shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap self-start focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6002]"
                >
                  Start Learning Today
                  <span className="flex items-center justify-center w-6 h-6 lg:w-7 lg:h-7 bg-white/20 rounded-full group-hover:translate-x-1 transition-transform duration-300">
                    <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={3} />
                  </span>
                </button>
              </Link>
            </div>

            {/* Image Section - Right */}
            <div className="relative h-80 md:h-auto min-h-[400px]">
              <Image
                src="/hero-img.jpg"
                alt="Innovation and Technology - Future of education"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
            </div>
          </div>
        </div>
      

      {/* <CourseCardList/> */}
      {/* <EventPopup/> */}
      <CardOverlay />
      <BannerCTA />

      {/* <VideoTestimonialsSection /> */}
      <PlacementCarousel />
      <EdwinTalks />
      <FacultySection />
      <EdwinAcademySections />
      <FAQSection />
      <TestimonialSection />
     
      <Footer />





    </>
  )
}