"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, Building2, GraduationCap, FileText, Clock } from "lucide-react";
import Navbar from "@/components/ui/navigation-menu";
import Footer from "@/components/ui/Footer";
import { AdmissionProvider, StartLearningButton } from "@/components/ui/AdmissionButton";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false); // reset first

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // ✅ Only show success if server confirms it worked
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        setTimeout(() => setSubmitted(false), 3000);
      } else {
        // Backend responded with error
        const errorText = await response.text();
        console.error("Failed to submit form:", errorText);
        alert("Something went wrong! Please try again.");
      }
    } catch (error) {
      // Network or CORS error
      console.error("Error submitting form:", error);
      alert("Unable to connect to the server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };


  const locations = [
    {
      city: "Kannur",
      address: "9th Floor, Thana Square Kannur",
      phone: "+91 (497) 123-4567",
      email: "kannur@edwinacademy.com",
    },
    {
      city: "Calicut",
      address: "2nd Floor, The Ladder Link Road, Calicut",
      phone: "+91 (495) 234-5678",
      email: "calicut@edwinacademy.com",
    },
    {
      city: "Kochi",
      address: "6th Floor, Kandamkulathi Tower, MG Road, Kochi",
      phone: "+91 (484) 345-6789",
      email: "kochi@edwinacademy.com",
    },
  ];

  const admissionSteps = [
    {
      icon: FileText,
      step: "1",
      title: "Register Online",
      description: "Create your account and fill out the admission form with your details"
    },
    {
      icon: Phone,
      step: "2",
      title: "Get Counseling",
      description: "Speak with our admission counselor to discuss programs and eligibility"
    },
    {
      icon: Clock,
      step: "3",
      title: "Final Confirmation",
      description: "Complete verification and confirm your enrollment details"
    },
    {
      icon: GraduationCap,
      step: "4",
      title: "Start Learning",
      description: "Begin your journey with access to all course materials and support"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-[#1725BB] text-white py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                <span className="font-medium text-xs tracking-widest uppercase">Contact</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight tracking-tight uppercase">
                Get in Touch
              </h1>
              <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
                We&apos;re here to help you take the next step in your career journey.
              </p>
            </motion.div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form - Takes 3 columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-8 lg:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send a Message</h2>
                <p className="text-gray-600 mb-8">We&apos;ll respond within 24 hours</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#1725BB] focus:ring-2 focus:ring-[#1725BB]/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#1725BB] focus:ring-2 focus:ring-[#1725BB]/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#1725BB] focus:ring-2 focus:ring-[#1725BB]/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-700">
                        Topic
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-[#1725BB] focus:ring-2 focus:ring-[#1725BB]/20 outline-none transition-all bg-white"
                      >
                        <option value="">Select</option>
                        <option value="admissions">Admissions Inquiry</option>
                        <option value="programs">Program Information</option>
                        <option value="partnership">Corporate Training</option>
                        <option value="support">Student Support</option>
                        <option value="other">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#1725BB] focus:ring-2 focus:ring-[#1725BB]/20 outline-none resize-none transition-all"
                    ></textarea>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={submitted || loading}
                    className="w-full bg-[#FF6002] text-white font-semibold px-6 py-4 rounded-lg hover:bg-[#e55502] transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
                  >
                    {submitted ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Message Sent Successfully
                      </>
                    ) : loading ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info Sidebar - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Quick Contact */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-5">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#1725BB]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-[#1725BB]" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">Phone</p>
                      <p className="text-gray-600 text-sm">+91 77369 11702</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#1725BB]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-[#1725BB]" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">Phone</p>
                      <p className="text-gray-600 text-sm">+91 70251 43536</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#1725BB]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-[#1725BB]" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">Email</p>
                      <p className="text-gray-600 text-sm">info@edwinacademy.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#1725BB]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-4 h-4 text-[#1725BB]" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">Business Hours</p>
                      <p className="text-gray-600 text-sm">Mon-Sat: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Get Admission Section */}
          <div className="mt-24">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6002]/10 rounded-full mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF6002]"></div>
                  <span className="font-medium text-xs tracking-widest uppercase text-[#FF6002]">Admission</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 uppercase">Join Our Academy</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Simple admission process to kickstart your career transformation</p>
              </motion.div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {admissionSteps.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className="relative"
                  >
                    {/* Connecting Line */}
                    {i < admissionSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-16 left-[60%] w-[calc(100%-30px)] h-1 bg-gradient-to-r from-[#1725BB] to-transparent"></div>
                    )}

                    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-[#1725BB] transition-all relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-[#FF6002] text-white flex items-center justify-center font-bold text-lg">
                          {item.step}
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-[#1725BB]/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#1725BB]" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >


              <AdmissionProvider>
                <StartLearningButton />
              </AdmissionProvider>

            </motion.div>
          </div>

          {/* Campus Locations */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 uppercase">Our Locations</h2>
              <p className="text-lg text-gray-600">Visit any of our campuses across Kerala</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((loc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#1725BB] hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#1725BB]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#1725BB] transition-colors">
                      <MapPin className="w-5 h-5 text-[#1725BB] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#1725BB] transition-colors">
                        {loc.city}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <p className="text-gray-600 leading-relaxed">
                      {loc.address}
                    </p>
                    <div className="pt-3 border-t border-gray-100 space-y-2">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone className="w-4 h-4 text-[#1725BB]" />
                        <span>{loc.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="w-4 h-4 text-[#1725BB]" />
                        <span>{loc.email}</span>
                      </div>
                    </div>
                  </div>

                  <button className="mt-4 text-[#FF6002] font-semibold text-sm hover:gap-2 flex items-center gap-1 transition-all">
                    Get Directions
                    <span>→</span>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}