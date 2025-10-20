import { useState, useEffect } from 'react';
import { X, Calendar, MapPin } from 'lucide-react';

export default function EventPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleRegister = () => {
    const phone = '917736911702';
    const message = encodeURIComponent('Hello! I would like to register for the Grand Convocation 2025 at Edwin Academy on October 18, 2025.');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-2 right-2 z-50 w-[calc(100%-16px)] max-w-[340px] sm:bottom-4 sm:right-4 sm:w-80 md:w-96 md:bottom-6 md:right-6">
        <div className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-orange-400 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 rounded-full p-1 sm:p-1.5"
            aria-label="Close"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>

          <div className="relative p-4 sm:p-5 md:p-6 text-white">
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative mb-3 sm:mb-4">
              <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide">
                Upcoming Event
              </span>
            </div>

            <h2 className="relative text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 leading-tight">
              GRAND CONVOCATION 2025 ✨
            </h2>

            <p className="relative text-xs sm:text-sm md:text-base text-white/90 mb-4 sm:mb-5 leading-relaxed">
              A day to celebrate achievement, dedication, and success! Join us at Edwin Academy as we honour our graduates and their inspiring journeys.
            </p>

            <div className="relative space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 flex-shrink-0">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-white/70">Date</p>
                  <p className="text-xs sm:text-sm font-semibold truncate">October 18, 2025</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-white/70">Location</p>
                  <p className="text-xs sm:text-sm font-semibold">Calicut Tower, Mavoor Road, Calicut</p>
                </div>
              </div>
            </div>

            <button 
              onClick={handleRegister}
              className="relative w-full bg-white text-purple-600 font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:bg-opacity-90 transition-all duration-200 hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              Register Now
            </button>
          </div>

          <div className="h-1.5 sm:h-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        div[class*="fixed"] > div {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>
    </>
  );
}