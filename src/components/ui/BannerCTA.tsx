"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 bg-white">
      {/* Centered content container */}
      <section className="relative w-full max-w-7xl h-[400px] sm:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/shaping-banner.jpg"
            alt="Student learning"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="w-full px-6 sm:px-8 lg:px-12">
            <div className="max-w-2xl">
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 uppercase">
                Build Skills That
                <br />
                Build Careers
              </h1>

              <p className="text-white/90 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-xl leading-relaxed">
                At Edwin Academy, we unlock potential through knowledge.
                <br />
                Empowering students to lead the future with confidence.
              </p>

              <Link href="/course">
                <button className="group inline-flex items-center gap-3 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Discover Courses
                  <span className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full group-hover:translate-x-1 transition-transform duration-300">
                    <ChevronRight className="w-4 h-4" strokeWidth={3} />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
