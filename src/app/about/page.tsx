'use client';
import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Users,
  Award,
  Target,
  BookOpen,
  Lightbulb,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Globe,
  Briefcase,
  Code,
  Shield,
  Zap,
  Trophy,
  MessageSquare,
  Rocket,
  Building2,
  Sparkles,
  Clock,
  HeadphonesIcon,
  FileCheck,
  Network,
  ChevronRight,
  Eye,
} from 'lucide-react';
import Navbar from '@/components/ui/navigation-menu';
import Footer from '@/components/ui/Footer';
import EdwinAcademySections from '@/components/ui/EdwinTeam';
import { AdmissionProvider, StartLearningButton } from '@/components/ui/AdmissionButton';
import TestimonialSection from '@/components/ui/Testimonial';

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id^="animate-"]').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // const stats = [
  //   { number: '10,000+', label: 'Students Enrolled', icon: Users },
  //   { number: '500+', label: 'Courses Available', icon: BookOpen },
  //   { number: '95%', label: 'Success Rate', icon: Award },
  //   { number: '50+', label: 'Expert Instructors', icon: GraduationCap },
  // ];
  const highlights = [
    {
      icon: Users,
      label: "Expert Instructors",
      value: "50+"
    },
    {
      icon: Award,
      label: "Industry Certifications",
      value: "350+"
    },
    {
      icon: Target,
      label: "Placement Rate",
      value: "99%"
    }
  ];

  const skillServices = [
    { icon: Code, title: 'Practical and Industry-Oriented Curriculum', desc: 'Real-world focused training designed with industry requirements in mind' },
    { icon: Users, title: 'Expert Trainers', desc: 'Learn from professionals with extensive industry experience' },
    { icon: Briefcase, title: 'Off-the-Job and On-the-Job Training', desc: 'Comprehensive training covering both theoretical and practical aspects' },
    { icon: Award, title: 'Cost-Effective and Quality-Centric', desc: 'Affordable programs without compromising on education quality' },
    { icon: BookOpen, title: 'Academic Assistance', desc: 'Continuous support throughout your learning journey' },
  ];

  const educationalServices = [
    { icon: GraduationCap, title: 'Higher Education Guidance', desc: 'Expert counseling for academic progression and career planning' },
    { icon: Briefcase, title: 'Job Placement Assistance', desc: 'Direct connections with leading companies for employment opportunities' },
    { icon: Building2, title: 'Internship Opportunities', desc: 'Hands-on experience with partner organizations' },
    { icon: TrendingUp, title: 'Career Advancement Support', desc: 'Ongoing mentorship for professional growth and transitions' },
    { icon: Users, title: 'Corporate Training Programs', desc: 'Customized training solutions for organizations and teams' },
  ];

  const approach = [
    { 
      icon: Target, 
      title: 'Research and Trend Analysis', 
      desc: 'Continuously identifying latest trends, possibilities, and technology-oriented advancements in the industry.',
      color: 'from-[#1725BB] to-[#1725BB]/80'
    },
    { 
      icon: Lightbulb, 
      title: 'Curriculum Development', 
      desc: 'Collaborating with industry experts to create programs that meet real-world demands and standards.',
      color: 'from-[#9BF900] to-[#9BF900]/80'
    },
    { 
      icon: Network, 
      title: 'Corporate Partnerships', 
      desc: 'Building strong relationships with leading companies for job placement and internship opportunities.',
      color: 'from-[#FF6002] to-[#FF6002]/80'
    },
    { 
      icon: TrendingUp, 
      title: 'Workforce Training', 
      desc: 'Comprehensive skill development programs that prepare students for evolving career requirements.',
      color: 'from-[#1725BB] to-[#1725BB]/80'
    },
  ];

 const whyChoose = [
    { icon: Shield, title: 'Accredited Programs', description: 'International Education Standards Board accreditation ensuring quality education.' },
    { icon: Zap, title: 'AI-Powered Learning', description: 'Personalized learning paths adapted to your pace and learning style.' },
    { icon: Trophy, title: 'Industry Recognition', description: 'Certificates recognized by leading employers across multiple industries.' },
    { icon: MessageSquare, title: 'Expert Guidance', description: 'Access to experienced mentors providing timely feedback and career advice.' },
    { icon: Rocket, title: 'Career Advancement', description: 'Ongoing support for professional growth and career transitions.' },
    { icon: Globe, title: 'Global Reach', description: 'Programs accessible to learners across different countries.' },
];


  

interface ServiceProps {
  icon: React.ElementType;
  title: string;
  desc: string;
}

  const ServiceCard = ({ service }: { service: ServiceProps }) => {
    const Icon = service.icon;
    return (
      <div className="group h-full">
        <div 
          className="h-full bg-white p-8 rounded-xl border border-gray-200 hover:border-[#9BF900]/60 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
        >
          <div 
            className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
            style={{
              background: '#9BF900',
              borderRadius: '50%',
              transform: 'translate(30%, -30%)'
            }}
          ></div>
          
          <div className="relative z-10">
            <div 
              className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
              style={{ backgroundColor: '#00D0FF15' }}
            >
              <Icon className="w-7 h-7" style={{ color: '#002aff' }} />
            </div>
            
            <h4 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-[#0e1503] transition-colors">
              {service.title}
            </h4>
            <p className="text-gray-700 leading-relaxed text-sm">
              {service.desc}
            </p>
          </div>
          
          <div 
            className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
            style={{ backgroundColor: '#9BF900' }}
          ></div>
        </div>
      </div>
    );
  };


  return (
    <>
      <Navbar/>
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
       <section className="relative overflow-hidden bg-gradient-to-br from-[#1725BB] via-[#1725BB]/95 to-[#1725BB]/90">
      {/* Background blur elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#9BF900] rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#9BF900] rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/20">
            <Sparkles className="w-4 h-4 text-[#9BF900]" />
            <span className="text-sm font-medium text-white">About Us</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight uppercase">
            Building Futures Through Education
          </h1>

          {/* Description */}
          <p className="text-xl text-white/90 mb-6 leading-relaxed max-w-2xl mx-auto">
            Since our founding, we've been dedicated to bridging the gap between education and industry, empowering students with skills that matter in today's competitive job market.
          </p>

          {/* Secondary text */}
          <p className="text-lg text-white/80 mb-12 leading-relaxed max-w-2xl mx-auto">
            Join thousands of graduates who have transformed their careers and achieved their dreams with our industry-partnered programs and mentorship.
          </p>

          {/* CTA Buttons */}
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-[#FF6002] hover:bg-[#FF6002]/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl">
              Our Programs <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 border border-white/30">
              Get In Touch
            </button>
          </div> */}
        </div>

        {/* Highlights section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 pt-12 border-t border-white/10">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="text-center">
                <Icon className="w-8 h-8 text-[#9BF900] mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">{item.value}</div>
                <div className="text-white/80">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

      {/* About Us Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-[#1725BB]/5 rounded-lg mb-6">
                <span className="text-[#1725BB] font-semibold text-sm">ABOUT EDWIN ACADEMY</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight uppercase">
                Leading Provider of Quality Education
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Edwin Academy is a leading provider of quality education and job-oriented training that helps students pursue their dream careers. We are consistently involved in identifying the latest trends, possibilities, and technology-oriented advancements.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We don't just build a simple support structure for education but empower our students to bring out their true potential and transform themselves into a productive workforce. With the optimal mix of support resources and qualified trainers, Edwin Academy stands as one of the best education providers that understand the dynamics of demanding careers and their evolving requirements.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-[#1725BB]/10 to-[#1725BB]/5 p-6 rounded-2xl">
                  <Target className="w-10 h-10 text-[#1725BB] mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Industry Focus</h3>
                  <p className="text-gray-600 text-sm">Curriculum aligned with market demands</p>
                </div>
                <div className="bg-gradient-to-br from-[#FF6002]/10 to-[#FF6002]/5 p-6 rounded-2xl">
                  <Award className="w-10 h-10 text-[#FF6002] mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Training</h3>
                  <p className="text-gray-600 text-sm">Expert trainers and mentors</p>
                </div>
              </div>
              <div className="space-y-6 pt-12">
                <div className="bg-gradient-to-br from-[#9BF900]/20 to-[#9BF900]/10 p-6 rounded-2xl">
                  <Rocket className="w-10 h-10 text-[#1725BB] mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Career Growth</h3>
                  <p className="text-gray-600 text-sm">Placement assistance and support</p>
                </div>
                <div className="bg-gradient-to-br from-[#1725BB]/10 to-[#1725BB]/5 p-6 rounded-2xl">
                  <Globe className="w-10 h-10 text-[#1725BB] mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Global Reach</h3>
                  <p className="text-gray-600 text-sm">Operations in India and GCC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <EdwinAcademySections/>

      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-white to-white"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-50/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-50/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="max-w-3xl mb-16">
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1725BB]/5 rounded-full mb-6">
              <div className="w-2 h-2 bg-[#1725BB] rounded-full"></div>
              <span className="text-[#1725BB] font-semibold text-sm tracking-wide">WHO WE ARE</span>
            </div> */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight uppercase">
              Our Mission & Vision
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Empowering learners to innovate, lead, and create meaningful impact through education and skill development.
            </p>
          </div>

          {/* Mission & Vision Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="group relative bg-white rounded-2xl p-8 lg:p-10 border border-gray-200 hover:border-gray-300 transition-all duration-500 hover:shadow-xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1725BB] to-[#3D56F0] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#1725BB] to-[#3D56F0] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                  <Rocket className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    Our Mission
                  </h3>
                  <div className="w-12 h-1 bg-[#1725BB] rounded-full"></div>
                </div>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                To cultivate ambition, creativity, and 21st-century skills in every learner — providing high-quality, affordable education that prepares them to succeed in a world full of challenges.
              </p>
            </div>

            {/* Vision Card */}
            <div className="group relative bg-gradient-to-br from-[#1725BB] via-[#2030D0] to-[#1725BB] rounded-2xl p-8 lg:p-10 text-white shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-start gap-6 mb-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-500">
                    <Eye className="w-7 h-7 text-[#9BF900]" />
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                      Our Vision
                    </h3>
                    <div className="w-12 h-1 bg-[#9BF900] rounded-full"></div>
                  </div>
                </div>
                
                <p className="text-lg text-white/95 leading-relaxed">
                  To nurture a community of inspired and skilled individuals who lead with purpose, embrace innovation, and contribute positively to society through knowledge and creativity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-[#1725BB]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="w-full mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/10 rounded-full mb-4 sm:mb-6 border border-[#9BF900]/30">
            <div className="w-2 h-2 bg-[#9BF900] rounded-full flex-shrink-0"></div>
            <span className="text-[#9BF900] font-semibold text-xs sm:text-xs tracking-widest">COMPREHENSIVE SOLUTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight uppercase">
            Accelerate  <span className="block sm:inline text-[#9BF900]">Your Growth</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed max-w-2xl">
            Access industry-relevant skill development and academic support designed to accelerate your success in an increasingly competitive landscape.
          </p>
        </div>

        {/* Skill Development Services */}
        <div className="mb-16 sm:mb-20 md:mb-28">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-xl bg-[#9BF900] ">
                <Code className="h-7 w-7 sm:h-8 sm:w-8 text-[#1725BB]" />
              </div>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Skill Development Services</h3>
              <p className="text-sm sm:text-base text-gray-300 mt-1">Tailored programs for modern professional demands</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {skillServices.map((service, idx) => (
              <ServiceCard key={idx} service={service} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#9BF900]/30 to-transparent my-12 sm:my-16 md:my-20"></div>

        {/* Educational Support */}
        <div className="mb-16 sm:mb-20 md:mb-28">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-xl bg-[#9BF900] ">
                <BookOpen className="h-7 w-7 sm:h-8 sm:w-8 text-[#1725BB]" />
              </div>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Educational Support</h3>
              <p className="text-sm sm:text-base text-gray-300 mt-1">Expert guidance across all academic stages</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {educationalServices.map((service, idx) => (
              <ServiceCard key={idx} service={service} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 md:mt-20 pt-12 sm:pt-16 md:pt-20 border-t border-white/10">
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl md:text-3xl font-bold text-[#1725BB] mb-3 sm:mb-4">
              Ready to Transform Your Career?
            </h3>
            <p className="text-[#1725BB]/80 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of students and professionals who have achieved their goals through our comprehensive learning solutions.
            </p>
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#FF6002] hover:bg-[#e55a01] text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#FF6002]/30">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>


      {/* Our Approach */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#1725BB]/5 rounded-lg mb-6">
              <span className="text-[#1725BB] font-semibold text-sm">OUR METHODOLOGY</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 uppercase">Our Approach</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">A systematic process that ensures quality education and career success</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approach.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="relative group">
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all h-full">
                    <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute top-6 right-6 text-6xl font-bold text-gray-100">{idx + 1}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed relative z-10">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
     <section className="py-24 bg-[#1725BB] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#9BF900] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#9BF900] rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase">Why Choose Edwin Academy</h2>
            <p className="text-xl text-white/80">Benefits that make us a preferred choice for learners worldwide</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChoose.map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 border border-white/20">
                <item.icon className="w-10 h-10 text-[#9BF900] mb-4" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/80 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 bg-gradient-to-br from-[#ffffff] to-[#fefefe]/90 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#9BF900] rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#9BF900] rounded-full opacity-10 blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 uppercase">Ready to Transform Your Career?</h2>
          <p className="text-xl text-black/90 mb-10 leading-relaxed">Join thousands of successful students who have achieved their career goals with Edwin Academy.</p>
          <AdmissionProvider>
            <StartLearningButton/>
          </AdmissionProvider>
        </div>
      </section>


      {/* Testimonials */}
      <TestimonialSection/>

      {/* CTA */}
      
    </div>
    <Footer/>
    </>
  );
}
