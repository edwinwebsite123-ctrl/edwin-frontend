"use client";
import React, { useState } from "react";
import {
  Menu,
  X,
  Code,
  Building2,
  Heart,
  Palette,
  BookOpen,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const courseCategories = [
  {
    id: "it",
    title: "INFORMATION TECHNOLOGY (IT)",
    description: "Tech careers and coding, from Data Science to Python.",
    icon: <Code className="w-5 h-5" />,
    courses: [
      { name: "Data Science", href: "/course/data-science" },
      { name: "Learning Python", href: "/course/python-programming" },
    ],
  },
  {
    id: "management",
    title: "MANAGEMENT & COMMERCE",
    description: "Business, HR, accounting and more.",
    icon: <Building2 className="w-5 h-5" />,
    courses: [
      { name: "Logistics & Supply Chain Management", href: "/course/logistics-scm" },
      { name: "HR Management", href: "/course/hr-management" },
      { name: "Digital Marketing", href: "/course/digital-marketing" },
    ],
  },
  {
    id: "healthcare",
    title: "HEALTH CARE",
    description: "Medical coding, management and scribing skills.",
    icon: <Heart className="w-5 h-5" />,
    courses: [
      { name: "AI Integrated Medical Coding", href: "/course/ai-medical-coding" },
      { name: "Hospital Management", href: "/course/hospital-mgmt" },
    ],
  },
  {
    id: "creative",
    title: "CREATIVE",
    description: "Unleash your artistic potential with our creative programs.",
    icon: <Palette className="w-5 h-5" />,
    courses: [
      { name: "Fashion Designing", href: "/course/fashion-design" },
      { name: "Interior Designing", href: "/course/interior-design" },
      { name: "Graphic Designing", href: "/course/graphic-design" },
    ],
  },
  {
    id: "ugpg",
    title: "UG/PG PROGRAMS",
    description: "Comprehensive undergraduate and postgraduate programs.",
    icon: <BookOpen className="w-5 h-5" />,
    courses: [
      { name: "B.Com", href: "/edwinexcel" },
      { name: "MCA", href: "/edwinexcel" },
    ],
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      {/* Full width container with matching carousel padding */}
      <div className="w-full px-2 md:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo — Pushed to far left */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo/nav-logo-2.webp"
                width={200}
                height={55}
                alt="Logo"
                priority
                className="object-contain w-[150px] xs:w-[140px] sm:w-[160px] md:w-[180px] lg:w-[170px]"
              />
            </Link>
          </div>

          {/* Desktop Navbar - Centered */}
          <div className="hidden lg:flex flex-1 items-center justify-center px-4 xl:px-8">
            <NavigationMenu.Root className="relative z-10">
              <NavigationMenu.List className="flex items-center justify-center space-x-2 xl:space-x-4">
                <NavigationMenu.Item>
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-[#1725BB] px-2 xl:px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>
                </NavigationMenu.Item>

                {/* Courses Dropdown */}
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger className="group flex items-center gap-1 text-gray-700 hover:text-[#1725BB] px-2 xl:px-3 py-2 rounded-md text-sm font-medium cursor-pointer select-none">
                    Courses
                    <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
                  </NavigationMenu.Trigger>

                  <NavigationMenu.Content>
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={dropdownVariants}
                      className="absolute left-1/2 top-14 -translate-x-1/2 w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[1000px] max-w-[1000px] bg-white rounded-2xl shadow-2xl border flex flex-col md:flex-row z-50 overflow-hidden"
                    >
                      {/* Left Info Section */}
                      <div className="md:basis-1/3 p-4 sm:p-6 lg:p-8 flex flex-col justify-between bg-[#F9FAFF]">
                        <div>
                          <h2 className="font-extrabold text-2xl sm:text-3xl text-[#1725BB] mb-3 sm:mb-4">
                            Explore Courses
                          </h2>
                          <p className="text-[#1725BB]/80 text-xs sm:text-sm leading-relaxed">
                            Discover programs across tech, healthcare, management, and more to build your dream career.
                          </p>
                        </div>
                        {/* Show always on tablet and smaller */}
                        <Link
                          href="/course"
                          className="mt-4 sm:mt-6 text-white px-4 sm:px-5 py-2 rounded-lg font-semibold bg-[#FF6002] hover:bg-[#FF6002]/80 transition text-center text-sm w-full md:w-auto"
                        >
                          View All Courses
                        </Link>
                      </div>

                      {/* Right Category Tree */}
                      <div className="md:basis-2/3 p-4 sm:p-6">
                        <ul className="space-y-2 sm:space-y-3">
                          {courseCategories.map((cat) => (
                            <li key={cat.id} className="border-b border-gray-100 pb-2">
                              <button
                                onClick={() =>
                                  setActiveCat(activeCat === cat.id ? null : cat.id)
                                }
                                className={`flex items-center justify-between w-full py-2 sm:py-3 px-3 sm:px-4 text-left rounded-lg transition-all ${activeCat === cat.id
                                    ? "bg-[#1725BB]/10"
                                    : "hover:bg-gray-50"
                                  }`}
                              >
                                <div className="flex items-center space-x-2 sm:space-x-3">
                                  <span className="p-1.5 sm:p-2 rounded-lg bg-[#00D0FF]/15 text-[#1725BB]">
                                    {cat.icon}
                                  </span>
                                  <div>
                                    <p className="text-xs sm:text-sm font-semibold text-[#1725BB]">
                                      {cat.title}
                                    </p>
                                    <p className="text-[10px] sm:text-xs text-gray-500 hidden sm:block">
                                      {cat.description}
                                    </p>
                                  </div>
                                </div>
                                <ChevronDown
                                  className={`w-4 h-4 transition-transform ${activeCat === cat.id
                                      ? "rotate-180 text-[#FF6002]"
                                      : "text-gray-500"
                                    }`}
                                />
                              </button>

                              {/* Sub-Courses */}
                              <AnimatePresence>
                                {activeCat === cat.id && cat.courses?.length > 0 && (
                                  <motion.ul
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="pl-8 sm:pl-12 mt-2 space-y-2 overflow-hidden"
                                  >
                                    {cat.courses.map((course) => (
                                      <li key={course.name}>
                                        <Link
                                          href={course.href}
                                          className="block text-xs sm:text-sm py-2 px-3 rounded-md hover:bg-[#FF6002]/10 hover:text-[#FF6002] transition"
                                        >
                                          {course.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </motion.ul>
                                )}
                              </AnimatePresence>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                  <Link
                    href="/edwinexcel"
                    className="text-gray-700 hover:text-[#1725BB] px-2 xl:px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Edwin Excel
                  </Link>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                  <Link
                    href="/placements"
                    className="text-gray-700 hover:text-[#1725BB] px-2 xl:px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Placements
                  </Link>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                  <Link
                    href="/about"
                    className="text-gray-700 hover:text-[#1725BB] px-2 xl:px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About
                  </Link>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                  <Link
                    href="/contact"
                    className="text-gray-700 hover:text-[#1725BB] px-2 xl:px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Contact
                  </Link>
                </NavigationMenu.Item>
              </NavigationMenu.List>
            </NavigationMenu.Root>
          </div>

          {/* CTA - Pushed to far right */}
          <div className="hidden lg:flex flex-shrink-0">
            <Link href="/contact">
              <button
                className="cursor-pointer group inline-flex items-center gap-2 lg:gap-2.5 
                            px-4 lg:px-5 xl:px-6 py-2 lg:py-2.5 xl:py-3 
                            bg-[#FF6002] hover:bg-[#e65502] 
                            text-white rounded-full font-semibold 
                            text-xs lg:text-sm transition-all duration-300 
                            whitespace-nowrap shadow-md hover:shadow-lg"
              >
                Admission
                <span className="flex items-center justify-center w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 
                                  bg-white/20 rounded-full group-hover:translate-x-1 
                                  transition-transform duration-300">
                  <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4" strokeWidth={3} />
                </span>
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="text-gray-700 hover:text-[#1725BB] p-2 rounded-lg hover:bg-gray-50 transition"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white shadow-lg border-t absolute top-16 left-0 w-full z-40"
          >
            <ul className="flex flex-col p-4 space-y-3">
              <li>
                <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-[#1725BB]">
                  Home
                </Link>
              </li>

              {/* Mobile Courses */}
              <li>
                <button
                  onClick={() =>
                    setActiveCat(activeCat === "courses" ? null : "courses")
                  }
                  className="flex justify-between items-center w-full px-3 py-2 text-gray-700 hover:text-[#1725BB]"
                >
                  Courses
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${activeCat === "courses" ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {activeCat === "courses" && (
                  <ul className="pl-6 mt-2 space-y-2">
                    {courseCategories.map((cat) => (
                      <li key={cat.id}>
                        <p className="font-semibold text-[#1725BB] mt-2">{cat.title}</p>
                        <ul className="pl-4 space-y-1">
                          {cat.courses.map((course) => (
                            <li key={course.name}>
                              <Link
                                href={course.href}
                                className="block py-1 text-sm text-gray-600 hover:text-[#FF6002]"
                              >
                                {course.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                    <li className="mt-4">
                      <Link
                        href="/course"
                        className="block bg-[#FF6002] text-white text-center px-3 py-2 rounded-lg font-semibold hover:shadow-lg transition"
                      >
                        View All Courses
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <Link href="/edwinexcel" className="block px-3 py-2 text-gray-700 hover:text-[#1725BB]">
                  Edwin Excel
                </Link>
              </li>

              <li>
                <Link href="/placements" className="block px-3 py-2 text-gray-700 hover:text-[#1725BB]">
                  Placements
                </Link>
              </li>
              <li>
                <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-[#1725BB]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-[#1725BB]">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block bg-[#FF6002] text-white text-center px-3 py-2 rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Admission
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;