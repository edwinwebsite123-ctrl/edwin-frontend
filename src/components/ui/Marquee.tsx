import React from 'react';
import Image from 'next/image';

const MarqueeAccreditation = () => {
  const accreditations = [
    { 
      id: 1, 
      txt:'logo',
      logo: '/marquee/1.webp',
      width: 100,
      height: 100
    },
    { 
      id: 2, 
      logo: '/marquee/2.webp',
      txt:'logo',
      width: 120,
      height: 100
    },
    { 
      id: 3, 
      logo: '/marquee/3.webp',
      txt:'logo',
      width: 110,
      height: 100
    },
    { 
      id: 4, 
      logo: '/marquee/4.webp',
      txt:'logo',
      width: 100,
      height: 100
    },
    { 
      id: 5, 
      logo: '/marquee/5.webp',
      txt:'logo',
      width: 120,
      height: 100
    },
    { 
      id: 6, 
      logo: '/marquee/6.webp',
      txt:'logo',
      width: 100,
      height: 100
    },
    { 
      id: 7, 
      logo: '/marquee/7.webp',
      txt:'logo',
      width: 110,
      height: 100
    },
    { 
      id: 8, 
      logo: '/marquee/8.webp',
      txt:'logo',
      width: 120,
      height: 100
    },
    { 
      id: 9, 
      logo: '/marquee/9.webp',
      txt:'logo',
      width: 100,
      height: 100
    },
    { 
      id: 10, 
      logo: '/marquee/10.webp',
      txt:'logo',
      width: 110,
      height: 100
    },
    { 
      id: 11, 
      logo: '/marquee/11.webp',
      txt:'logo',
      width: 100,
      height: 100
    },
  ];

  const duplicatedAccreditations = [...accreditations, ...accreditations];

  return (
    <div className="w-full bg-white py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 uppercase">
            Our Accreditations
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Recognized by leading national and international bodies
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrolling Content */}
          <div className="overflow-hidden">
            <div 
              className="flex items-center animate-marquee"
              style={{
                width: 'fit-content',
              }}
            >
              {duplicatedAccreditations.map((accreditation, index) => (
                <div
                  key={`${accreditation.id}-${index}`}
                  className="flex-shrink-0 mx-4 md:mx-8"
                >
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8 w-40 md:w-48 lg:w-52 h-32 md:h-36 lg:h-40 flex items-center justify-center transition-all duration-300 hover:shadow-md">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={accreditation.logo}
                        alt={accreditation.txt}
                        width={accreditation.width}
                        height={accreditation.height}
                        className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                        priority={index < 13}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MarqueeAccreditation;