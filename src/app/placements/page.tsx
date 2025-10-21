'use client';

import Image from 'next/image';
import { Sparkles, Award, ChevronRight } from 'lucide-react';
import Navbar from '@/components/ui/navigation-menu';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';

// ======== Placement Data ========
const placements = [
 {
  id: 1,
  name: 'JUBAIR AA',
  role: 'HR Executive',
  company: 'Lisie Hospital',
  companyLogo: '/placements/apple.png',
  studentImage: '/placements/boy-1.png',
  backgroundImage: '/placements/bg1.png',
  color: 'from-cyan-500 to-blue-600',
},
{
  id: 2,
  name: 'AYSHA SHADA',
  role: 'Digital Marketer',
  company: 'Mexilet Technologies',
  companyLogo: '/placements/chat-gpt.png',
  studentImage: '/placements/girl-1.png',
  backgroundImage: '/placements/bg2.png',
  color: 'from-emerald-500 to-teal-600',
},
{
  id: 3,
  name: 'RIZWAN KP',
  role: 'HR Executive',
  company: 'Roohi Recruitment',
  companyLogo: '/placements/intel.png',
  studentImage: '/placements/boy-2.png',
  backgroundImage: '/placements/bg3.png',
  color: 'from-cyan-500 to-blue-600',
},
{
  id: 4,
  name: 'ASIF KA',
  role: 'HR Executive',
  company: 'Core institute of technology',
  companyLogo: '/placements/microsoft.png',
  studentImage: '/placements/boy-3.png',
  backgroundImage: '/placements/bg4.png',
  color: 'from-emerald-500 to-teal-600',
},
{
  id: 5,
  name: 'Fathima Milsha',
  role: 'HR Executive',
  company: 'Gaotech',
  companyLogo: '/placements/apple.png',
  studentImage: '/placements/girl-2.png',
  backgroundImage: '/placements/bg1.png',
  color: 'from-cyan-500 to-blue-600',
},
{
  id: 6,
  name: 'AYSHA SHADA',
  role: 'Digital Marketer',
  company: 'Mexilet Technologies',
  companyLogo: '/placements/chat-gpt.png',
  studentImage: '/placements/girl-1.png',
  backgroundImage: '/placements/bg2.png',
  color: 'from-emerald-500 to-teal-600',
},

];

// const companyLogos = [
//   { id: 1, name: 'TCS', logo: '/placements/apple.png' },
//   { id: 2, name: 'Infosys', logo: '/placements/chat-gpt.png' },
//   { id: 3, name: 'Cognizant', logo: '/placements/intel.png' },
//   { id: 4, name: 'Google', logo: '/placements/microsoft.png' },
//   { id: 5, name: 'Microsoft', logo: '/placements/chat-gpt.png' },
//   { id: 6, name: 'Amazon', logo: '/placements/apple.png' },
//   { id: 7, name: 'Wipro', logo: '/placements/microsoft.png' },
//   { id: 8, name: 'Accenture', logo: '/placements/intel.png' },
// ];

// Poster Gallery Data - Replace with actual poster images
const placementPosters = [
  { id: 1, image: '/placements/old/1.jpg', alt: 'Batch 2024 Placements' },
  { id: 2, image: '/placements/old/2.jpg', alt: 'TCS Recruitment Drive' },
  { id: 3, image: '/placements/old/3.jpg', alt: 'Top Performers 2024' },
  { id: 4, image: '/placements/old/4.jpg', alt: 'Infosys Campus Drive' },
  { id: 5, image: '/placements/old/5.jpg', alt: 'Success Stories' },
  { id: 6, image: '/placements/old/6.jpg', alt: 'Corporate Partnerships' },
  { id: 7, image: '/placements/old/7.jpg', alt: 'Achievement Gallery' },
  { id: 8, image: '/placements/old/8.jpg', alt: 'Placement Highlights' },
  { id: 9, image: '/placements/old/9.jpg', alt: 'Placement Highlights' },
  { id: 10, image: '/placements/old/10.jpg', alt: 'Placement Highlights' },
];

// ======== Main Component ========
export default function PlacementPage() {
  return (
    <>
      <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* HERO SECTION - Professional Header */}
      <section className="relative bg-gradient-to-r from-[#1725BB] to-[#4A5DFF] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative z-10 text-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 border border-white/20">
            <Award className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">Industry Leading Placements</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-4 uppercase">
            Empowering Careers Through Excellence
          </h1>
          
          <p className="max-w-3xl mx-auto text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed px-4">
            Edwin Academy takes pride in transforming students into industry-ready professionals. 
            Our placement record speaks for itself — our alumni are thriving in leading global companies.
          </p>
        </div>
      </section>

      {/* PLACEMENT STATS - Original Design */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto py-12 sm:py-16 px-4 sm:px-6 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-4xl sm:text-5xl font-bold text-[#1725BB]">98%</h3>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Placement Success Rate</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-4xl sm:text-5xl font-bold text-[#1725BB]">300+</h3>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Hiring Partners</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-4xl sm:text-5xl font-bold text-[#1725BB]">5000+</h3>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Students Placed</p>
        </div>
      </section>

      {/* PLACEMENT GRID - Enhanced with Hover Colors */}
      <section className="w-full py-12 sm:py-16 lg:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6002]/10 to-[#1725BB]/10 px-4 py-2 rounded-full mb-4">
            <Sparkles className="text-[#FF6002] w-5 h-5" />
            <span className="text-sm font-semibold text-gray-700">
              Success Stories
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 uppercase">
            Our Proud Achievers
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-base lg:text-lg">
            Celebrating talented individuals who secured dream placements at
            industry-leading companies
          </p>
        </div>

        {/* Placement Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {placements.map((placement) => (
            <div
              key={placement.id}
              className="relative h-[420px] sm:h-[450px] rounded-2xl sm:rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 group"
              style={{
                backgroundImage: `url('/placements/bg.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
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
              <div className="absolute top-28 sm:top-32 left-1/2 -translate-x-1/2 z-10 w-[320px] h-[320px] sm:w-[320px] sm:h-[320px]">
                <Image
                  src={placement.studentImage}
                  alt={placement.name}
                  fill
                  className="object-contain drop-shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex items-end justify-between bg-gradient-to-t from-black/70 via-black/30 to-transparent z-20">
                <div className="text-white">
                  <h4 className="text-base sm:text-lg font-bold leading-tight">
                    {placement.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/80">
                    {placement.role}
                  </p>
                </div>
                {/* <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl shadow-lg flex items-center justify-center p-2">
                  <Image
                    src={placement.companyLogo}
                    alt={placement.company}
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* PLACEMENT POSTERS GALLERY - Responsive */}
     <section className="w-full py-12 sm:py-16 lg:py-24 px-4 bg-gradient-to-br from-gray-100 to-gray-50">
  <div className="max-w-7xl mx-auto">
    {/* Header */}
    <div className="text-center mb-8 sm:mb-12">
      <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-4 shadow-md">
        <Award className="text-[#1725BB] w-5 h-5" />
        <span className="text-sm font-semibold text-gray-700">Placement Gallery</span>
      </div>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 uppercase">
        Placement Highlights
      </h2>

      <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-base lg:text-lg px-4">
        Browse through our collection of placement announcements and achievement posters
      </p>
    </div>

    {/* Poster Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {placementPosters.map((poster, index) => (
        <div
          key={poster.id}
          className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2"
        >
          {/* Poster Image */}
          <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1725BB]/10 to-[#FF6002]/10" />

            <Image
              src={poster.image}
              alt={poster.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-cover"
              priority={index < 4}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* PARTNER LOGOS MARQUEE - Responsive */}
      {/* <section className="w-full py-12 sm:py-16 overflow-hidden bg-white">
        <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12 px-4 uppercase">
          Our Esteemed Placement Partners
        </h3>
        
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10" />
          
          <div className="flex animate-scroll">
            {[...companyLogos, ...companyLogos].map((c, i) => (
              <div
                key={i}
                className="inline-flex items-center justify-center w-32 h-20 sm:w-40 sm:h-24 lg:w-48 lg:h-28 mx-3 sm:mx-6 bg-white rounded-2xl shadow-md hover:shadow-xl flex-shrink-0 transition-all duration-300 border border-gray-100 hover:border-[#1725BB]/30"
              >
                <div className="relative w-20 h-10 sm:w-24 sm:h-12 lg:w-28 lg:h-14">
                  <Image
                    src={c.logo}
                    alt={c.name}
                    fill
                    sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 112px"
                    className="object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <style jsx>{`
          @keyframes scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 45s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section> */}

      {/* CALL TO ACTION - Responsive */}
      <section className="relative bg-[#1725BB] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative z-10 text-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight uppercase">
            Ready to Build Your Career?
          </h2>
          
          <p className="max-w-2xl mx-auto text-white/90 text-sm sm:text-base lg:text-lg mb-8 sm:mb-10 leading-relaxed">
            Join Edwin Academy today and take your first step toward a successful and fulfilling career.
          </p>
          
          <Link href="/contact">
                <button className="group inline-flex items-center gap-3 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Apply Now
                  <span className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full group-hover:translate-x-1 transition-transform duration-300">
                    <ChevronRight className="w-4 h-4" strokeWidth={3} />
                  </span>
                </button>
              </Link>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
}