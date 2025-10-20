"use client";
import Image from "next/image";
import { motion } from "framer-motion";


export default function MoreSections() {
  return (
    <div className="bg-[#E6F0FA] py-16 px-6 md:px-16 space-y-16">
      {/* About Section */}
      <section className="bg-white rounded-3xl shadow-lg p-10 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">About Edwin Academy</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
          Edwin Academy is dedicated to academic excellence, innovative learning methods, and
          holistic student development for a brighter tomorrow.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {[
            { title: "Our Vision", desc: "Empowering minds for global opportunities." },
            { title: "Our Mission", desc: "Building leaders with ethics and innovation." },
            { title: "Our Values", desc: "Integrity, Excellence, and Commitment." }
          ].map((item, i) => (
            <div key={i} className="bg-[#F8FAFF] p-6 rounded-2xl shadow-md text-center">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses Section */}
      <section className="bg-white rounded-3xl shadow-lg p-10 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Our Popular Programs</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Computer Science", img: "/images/cs.jpg" },
            { title: "Business Management", img: "/images/business.jpg" },
            { title: "Digital Marketing", img: "/images/marketing.jpg" }
          ].map((course, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-[#F8FAFF] rounded-2xl shadow-md overflow-hidden"
            >
              <Image src={course.img} alt={course.title} width={400} height={250} className="w-full h-52 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <button className="mt-3 text-sm text-[#1725BB] border border-[#1725BB] px-4 py-1 rounded-full hover:bg-[#1725BB] hover:text-white transition">
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Key Features Section */}
      <section className="bg-white rounded-3xl shadow-lg p-10 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Why Choose Us?</h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[
            { icon: "🎓", title: "Expert Faculty", desc: "Highly experienced educators." },
            { icon: "📚", title: "Quality Learning", desc: "Innovative curriculum & resources." },
            { icon: "🌍", title: "Global Exposure", desc: "International learning opportunities." },
            { icon: "💼", title: "Career Guidance", desc: "Support for jobs & placements." }
          ].map((feature, i) => (
            <div key={i} className="bg-[#F8FAFF] p-6 rounded-2xl shadow-md">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}