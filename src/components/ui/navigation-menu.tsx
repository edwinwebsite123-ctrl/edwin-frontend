"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      {/* Adjusted padding for closer left alignment */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo — Wider and aligned left */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo/nav-logo-2.webp"
                width={200}
                height={55}
                alt="Logo"
                priority
                className="object-contain w-[150px] sm:w-[170px] md:w-[200px]"
              />
            </Link>
          </div>

          {/* Desktop Navbar */}
          <div className="hidden lg:flex w-full items-center justify-center">
            <NavigationMenu.Root className="relative z-10 w-full">
              <NavigationMenu.List className="flex items-center justify-center space-x-4">
                <NavigationMenu.Item>
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-[#1725BB] px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>
                </NavigationMenu.Item>

                {/* Courses Dropdown */}
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger className="group flex items-center gap-1 text-gray-700 hover:text-[#1725BB] px-3 py-2 rounded-md text-sm font-medium cursor-pointer select-none">
                    Courses
                    <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
                  </NavigationMenu.Trigger>

                  <NavigationMenu.Content>
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={dropdownVariants}
                      className="absolute left-1/2 top-14 -translate-x-1/2 w-[1000px] max-w-[98vw] bg-white rounded-2xl shadow-2xl border flex flex-col md:flex-row z-50 overflow-hidden"
                    >
                      {/* Left Info Section */}
                      <div className="md:basis-1/3 p-8 flex flex-col justify-between bg-[#F9FAFF]">
                        <div>
                          <h2 className="font-extrabold text-3xl text-[#1725BB] mb-4">
                            Explore Courses
                          </h2>
                          <p className="text-[#1725BB]/80 text-sm leading-relaxed">
                            Discover programs across tech, healthcare, management, and more to build your dream career.
                          </p>
                        </div>
                        {/* Show always on tablet and smaller */}
                        <Link
                          href="/course"
                          className="mt-6 text-white px-5 py-2 rounded-lg font-semibold bg-[#FF6002] hover:bg-[#FF6002]/80 transition text-center w-full md:w-auto"
                        >
                          View All Courses
                        </Link>
                      </div>

                      {/* Right Category Tree */}
                      <div className="md:basis-2/3 p-6">
                        <ul className="space-y-3">
                          {courseCategories.map((cat) => (
                            <li key={cat.id} className="border-b border-gray-100 pb-2">
                              <button
                                onClick={() =>
                                  setActiveCat(activeCat === cat.id ? null : cat.id)
                                }
                                className={`flex items-center justify-between w-full py-3 px-4 text-left rounded-lg transition-all ${activeCat === cat.id
                                    ? "bg-[#1725BB]/10"
                                    : "hover:bg-gray-50"
                                  }`}
                              >
                                <div className="flex items-center space-x-3">
                                  <span className="p-2 rounded-lg bg-[#00D0FF]/15 text-[#1725BB]">
                                    {cat.icon}
                                  </span>
                                  <div>
                                    <p className="text-sm font-semibold text-[#1725BB]">
                                      {cat.title}
                                    </p>
                                    <p className="text-xs text-gray-500">
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
                                    className="pl-12 mt-2 space-y-2 overflow-hidden"
                                  >
                                    {cat.courses.map((course) => (
                                      <li key={course.name}>
                                        <Link
                                          href={course.href}
                                          className="block text-sm py-2 px-3 rounded-md hover:bg-[#FF6002]/10 hover:text-[#FF6002] transition"
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
                    className="text-gray-700 hover:text-[#1725BB] px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Edwin Excel
                  </Link>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                  <Link
                    href="/placements"
                    className="text-gray-700 hover:text-[#1725BB] px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Placements
                  </Link>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                  <Link
                    href="/about"
                    className="text-gray-700 hover:text-[#1725BB] px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About
                  </Link>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                  <Link
                    href="/contact"
                    className="text-gray-700 hover:text-[#1725BB] px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Contact
                  </Link>
                </NavigationMenu.Item>
              </NavigationMenu.List>
            </NavigationMenu.Root>
          </div>

          {/* CTA */}
          <div className="hidden lg:flex ml-6">
            <Link href="/contact">
              <button

                className="cursor-pointer group inline-flex items-center gap-2.5 
                            px-5 lg:px-6 py-2.5 lg:py-3 
                            bg-[#FF6002] hover:bg-[#e65502] 
                            text-white rounded-full font-semibold 
                            text-sm transition-all duration-300 
                            whitespace-nowrap shadow-md hover:shadow-lg"
              >
                Admission
                <span className="flex items-center justify-center w-5 h-5 lg:w-6 lg:h-6 
                                  bg-white/20 rounded-full group-hover:translate-x-1 
                                  transition-transform duration-300">
                  <ArrowRight className="w-4 h-4" strokeWidth={3} />
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
