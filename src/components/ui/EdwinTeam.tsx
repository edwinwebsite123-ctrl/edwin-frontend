import Image from 'next/image';

export default function EdwinAcademySections() {
  return (
    <div className="w-full bg-white">
      {/* Section: The Visionaries Behind Edwin Academy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight uppercase">
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

        {/* Cards Container */}
        <div className="flex flex-wrap justify-center gap-8">
          {/* Founder Card 1 */}
          <div className="group relative w-full sm:w-[350px] md:w-[400px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="relative h-96 sm:h-[450px] lg:h-[520px] overflow-hidden">
              <Image
                src="/fac/ameen.jpeg"
                alt="Muhammed Ameen B"
                width={400}
                height={520}
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
          </div>

          {/* Founder Card 2 */}
          <div className="group relative w-full sm:w-[350px] md:w-[400px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="relative h-96 sm:h-[450px] lg:h-[520px] overflow-hidden">
              <Image
                src="/fac/jamshir.png"
                alt="Jamsheer E"
                width={400}
                height={520}
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
          </div>
        </div>
      </section>
    </div>
  );
}
