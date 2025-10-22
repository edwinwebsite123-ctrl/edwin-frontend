"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import Link from "next/link";


export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(2);

  const faqs = [
    {
      question: "What courses does Edwin Academy offer?",
      answer:
        "Edwin Academy offers a wide range of courses including web development, data science, digital marketing, graphic design, and business management. All courses are designed by industry experts.",
    },
    {
      question: "Are the courses certified?",
      answer:
        "Yes, all our courses are certified. Upon completion, you'll receive an industry-recognized certificate that you can add to your resume and LinkedIn profile.",
    },
    {
      question: "Do you provide placement assistance?",
      answer:
        "Absolutely! We provide comprehensive placement assistance including resume building, interview preparation, and connections with our partner companies.",
    },
    {
      question: "Can I learn online or is it only offline?",
      answer:
        "We offer flexible learning options including classroom sessions, live online classes, and blended learning programs.",
    },
    {
      question: "What is the eligibility to enroll?",
      answer:
        "Most of our courses are open to anyone with basic computer knowledge. Specific courses may have prerequisites which are mentioned in the course details.",
    },
    {
      question: "How do I apply for a course?",
      answer:
        "You can apply directly through our website by clicking 'Explore Our Course' or 'Admission' buttons. Fill out the application form and our team will contact you within 24 hours.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 xl:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 uppercase px-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Got Questions?
          </h1>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">
            We&apos;ve got Answers
          </p>
        </div>

        {/* FAQ List */}
        <div className="bg-white rounded-2xl shadow-sm mb-12 overflow-hidden">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-sm sm:text-base md:text-lg font-medium text-gray-900 pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <X className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-gray-600 bg-gray-50 text-sm sm:text-base">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          <div className="grid md:grid-cols-2">
            {/* Left Side */}
            <div
              className="p-6 sm:p-10 lg:p-16 flex flex-col justify-center"
              style={{ backgroundColor: "#1725BB" }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight uppercase">
                Discover Courses
                <br />
                That Inspire
              </h2>
              <p className="text-white/90 mb-8 text-sm sm:text-base max-w-md">
                Explore a wide range of programs designed to enhance your skills
                and knowledge. Find the perfect course for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
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

            {/* Right Side (Image) */}
            <div className="relative min-h-[250px] sm:min-h-[350px] md:min-h-full w-full">
              <Image
                src="/card-1.png"
                alt="Discover Courses"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
