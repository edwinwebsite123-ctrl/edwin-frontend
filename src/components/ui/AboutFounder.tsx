'use client';
import Image from 'next/image';

export default function AboutFounder() {
  return (
    <div className="w-full bg-white">
      {/* Section: The Visionaries Behind Edwin Academy */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
        aria-labelledby="founders-heading"
      >
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2
            id="founders-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight uppercase"
          >
            The Visionaries Behind
            <br />
            Edwin Academy
          </h2>

          <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed font-light px-4">
            Edwin Academy was built on the belief that education should not just inform but
            transform. Our founders are pioneers who blend academic excellence with
            innovative thinking, dedicated to empowering learners and shaping the leaders of
            tomorrow.
          </p>
        </div>

        {/* Founders Cards Container */}
        <div className="flex flex-wrap justify-center gap-8 mb-20">
          {/* Founder Card 1 */}
          <article
            className="group relative w-full sm:w-[350px] md:w-[400px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2"
            aria-label="Founder and CEO Muhammed Ameen B"
          >
            <div className="relative h-96 sm:h-[450px] lg:h-[520px] overflow-hidden">
              <Image
                src="/fac/ameen.jpeg"
                alt="Muhammed Ameen B, Founder and CEO of Edwin Academy"
                width={400}
                height={520}
                priority
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-center transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                <h3 className="text-white text-2xl font-bold mb-2 tracking-tight">
                  Muhammed Ameen B
                </h3>
                <p className="text-gray-200 text-sm sm:text-base font-light">
                  Founder & CEO, Edwin Academy
                </p>
              </div>
            </div>
          </article>

          {/* Founder Card 2 */}
          <article
            className="group relative w-full sm:w-[350px] md:w-[400px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2"
            aria-label="Founder and CMO Jamsheer E"
          >
            <div className="relative h-96 sm:h-[450px] lg:h-[520px] overflow-hidden">
              <Image
                src="/fac/jamshir.png"
                alt="Jamsheer E, Founder and CMO of Edwin Academy"
                width={400}
                height={520}
                priority
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-center transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                <h3 className="text-white text-2xl font-bold mb-2 tracking-tight">
                  Jamsheer E
                </h3>
                <p className="text-gray-200 text-sm sm:text-base font-light">
                  Founder & CMO, Edwin Academy
                </p>
              </div>
            </div>
          </article>
        </div>

        {/* Voices of Edwin Section */}
        <section
          aria-labelledby="voices-heading"
          className="mt-16 sm:mt-20 lg:mt-24"
        >
          <h3
            id="voices-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-10 tracking-tight uppercase"
          >
            Voices of Edwin
          </h3>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {/* Team Member 1 */}
            <article
              className="group relative w-full xs:w-[calc(50%-0.5rem)] sm:w-[280px] max-w-[280px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Academic Director Dr. Sameer Shereef"
            >
              <div className="relative h-[280px] xs:h-[300px] sm:h-[320px] overflow-hidden">
                <Image
                  src="/fac/sameer.png"
                  alt="Dr. Sameer Shereef, Academic Director at Edwin Academy"
                  width={280}
                  height={320}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                  <h4 className="text-white text-lg font-semibold mb-1">
                    Dr. Sameer Shereef
                  </h4>
                  <p className="text-gray-200 text-sm">Academic Director</p>
                </div>
              </div>
            </article>

            {/* Team Member 2 */}
            <article
              className="group relative w-full xs:w-[calc(50%-0.5rem)] sm:w-[280px] max-w-[280px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Advisory Member Dr. K Madhavan"
            >
              <div className="relative h-[280px] xs:h-[300px] sm:h-[320px] overflow-hidden">
                <Image
                  src="/fac/madhavan.png"
                  alt="Dr. K Madhavan, Advisory Member at Edwin Academy"
                  width={280}
                  height={320}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                  <h4 className="text-white text-lg font-semibold mb-1">
                    Dr. K Madhavan
                  </h4>
                  <p className="text-gray-200 text-sm">Advisory Member</p>
                </div>
              </div>
            </article>

            {/* Team Member 3 */}
            <article
              className="group relative w-full xs:w-[calc(50%-0.5rem)] sm:w-[280px] max-w-[280px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Advisory Member Dr. Rashid Abdullah"
            >
              <div className="relative h-[280px] xs:h-[300px] sm:h-[320px] overflow-hidden">
                <Image
                  src="/fac/user.png"
                  alt="Dr. Rashid Abdullah, Advisory Member at Edwin Academy"
                  width={280}
                  height={320}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                  <h4 className="text-white text-lg font-semibold mb-1">
                    Dr. Rashid Abdullah
                  </h4>
                  <p className="text-gray-200 text-sm">Advisory Member</p>
                </div>
              </div>
            </article>

            {/* Team Member 4 */}
            <article
              className="group relative w-full xs:w-[calc(50%-0.5rem)] sm:w-[280px] max-w-[280px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Advisory Member Aneesh Pillai"
            >
              <div className="relative h-[280px] xs:h-[300px] sm:h-[320px] overflow-hidden">
                <Image
                  src="/fac/user.png"
                  alt="Aneesh Pillai, Advisory Member at Edwin Academy"
                  width={280}
                  height={320}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                  <h4 className="text-white text-lg font-semibold mb-1">
                    Aneesh Pillai
                  </h4>
                  <p className="text-gray-200 text-sm">Advisory Member</p>
                </div>
              </div>
            </article>
          </div>
        </section>
      </section>
    </div>
  );
}
