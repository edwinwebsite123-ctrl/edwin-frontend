'use client'
import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  BookOpen,
  Globe,
  Award,
  Clock,
  DollarSign,
  CheckCircle,
  Phone,
  ArrowRight,
  Star,
  Users,
  Target,
  Shield,
  Briefcase,
  Video,
  FileCheck,
  Zap,
  ChevronDown,
  Calendar,
  BadgeCheck,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/navigation-menu';
import { AdmissionProvider, EnrollButton, StartLearningButton } from '@/components/ui/AdmissionButton';
import Image from 'next/image';
import EdwinExcelTestimonial from '@/components/ui/EdwinExcelTestimonial';
import { useUGPrograms, usePGPrograms, Program } from '@/data/api';

// Skeleton Loading Components
const ProgramCardSkeleton = () => (
  <div className="group cursor-pointer">
    <div className="relative h-[460px] rounded-2xl overflow-hidden bg-gray-200 animate-pulse shadow-xl">
      {/* Background Image Skeleton */}
      <div className="absolute inset-0 z-0 bg-gray-300"></div>

      {/* Top Labels Skeleton */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-start justify-between">
        <div className="w-16 h-6 bg-gray-400 rounded-full"></div>
        <div className="w-16 h-6 bg-gray-400 rounded-full"></div>
      </div>

      {/* Content Skeleton */}
      <div className="absolute bottom-0 left-0 right-0 z-30 p-6">
        <div className="mb-4">
          <div className="w-24 h-4 bg-gray-400 rounded mb-2"></div>
          <div className="w-32 h-6 bg-gray-400 rounded mb-3"></div>
          <div className="w-full h-12 bg-gray-400 rounded mb-4"></div>
        </div>

        {/* Course Stats Skeleton */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="w-full h-4 bg-gray-400 rounded"></div>
          <div className="w-full h-4 bg-gray-400 rounded"></div>
          <div className="w-full h-4 bg-gray-400 rounded"></div>
        </div>

        {/* Button Skeleton */}
        <div className="w-full h-12 bg-gray-400 rounded-xl"></div>
      </div>
    </div>
  </div>
);

// const StatsSkeleton = () => (
//   <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100 animate-pulse">
//     <div className="w-8 h-8 bg-gray-300 rounded-lg mx-auto mb-3"></div>
//     <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
//     <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
//   </div>
// );

export default function EdwinExcelPage() {
  const { programs: ugPrograms, loading: ugLoading, error: ugError, refetch: refetchUG } = useUGPrograms();
  const { programs: pgPrograms, loading: pgLoading, error: pgError, refetch: refetchPG } = usePGPrograms();

  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('ug');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrolled, setScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [isRetryingUG, setIsRetryingUG] = useState(false);
  const [isRetryingPG, setIsRetryingPG] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Retry functions
  const handleRetryUG = async () => {
    setIsRetryingUG(true);
    try {
      await refetchUG();
    } finally {
      setIsRetryingUG(false);
    }
  };

  const handleRetryPG = async () => {
    setIsRetryingPG(true);
    try {
      await refetchPG();
    } finally {
      setIsRetryingPG(false);
    }
  };

  const features = [
    { icon: Globe, title: 'Top Universities', desc: 'Study from UGC-DEB approved & NAAC A++ accredited institutions across India with proven excellence' },
    { icon: Video, title: '100% Online', desc: 'Live interactive classes, recorded lectures, and online exams - complete flexibility to learn anywhere' },
    { icon: Clock, title: 'Flexible Learning', desc: 'Complete your degree in 12 months while maintaining your full-time job and family commitments' },
    { icon: DollarSign, title: 'Affordable Fees', desc: 'Quality education with transparent pricing and easy EMI options that fit your budget' },
    { icon: Award, title: 'Globally Recognized', desc: 'Degrees with embassy attestation facility, accepted for jobs and higher studies worldwide' },
    { icon: Users, title: 'Expert Faculty', desc: 'Learn from experienced professors with proven track records from prestigious universities' },
    { icon: FileCheck, title: 'Valid Certificates', desc: 'UGC-PSC approved degrees with complete documentation for government and private sector' },
    { icon: Briefcase, title: 'Career Support', desc: 'Job-ready skills training, resume building, and placement assistance for career growth' }
  ];

  const benefits = [
    { icon: Shield, text: 'UGC-DEB Approved' },
    { icon: BadgeCheck, text: 'NAAC A++ & A Graded' },
    { icon: Globe, text: 'Embassy Attestation' },
    { icon: Target, text: 'Study While Working' },
    { icon: Zap, text: 'Fast Track - 12 Months' },
    { icon: Calendar, text: 'Flexible Schedule' }
  ];

  const steps = [
    { step: 1, title: 'Choose Your Course', desc: 'Browse our UG/PG programs and select the one that fits your career goals', icon: Target },
    { step: 2, title: 'Submit Documents', desc: 'Simple online application with minimal documentation required', icon: FileCheck },
    { step: 3, title: 'Get Enrolled', desc: 'Receive instant admission confirmation and payment details', icon: BadgeCheck },
    { step: 4, title: 'Start Learning', desc: 'Access your course materials and begin classes immediately', icon: GraduationCap }
  ];

  const faqs = [
    { q: 'Are these degrees valid for government jobs and PSC exams?', a: 'Yes! All our programs are UGC-DEB approved and recognized by government bodies. They are valid for government jobs, PSC exams, higher studies, and promotions.' },
    { q: 'Can I study while working full-time?', a: 'Absolutely! Our 100% online format is specifically designed for working professionals. You can attend live classes or watch recordings at your convenience and complete assignments on your schedule.' },
    { q: 'What is the fee structure and payment options?', a: 'We offer competitive and affordable fees with flexible payment options including easy EMI plans. Contact us at +91 73567 74901 for detailed fee structure based on your chosen program.' },
    { q: 'How long does it take to complete the degree?', a: 'Most programs can be completed in 12 months through our accelerated learning approach. You will receive proper credits and a valid degree certificate upon completion.' },
    { q: 'Which universities are you affiliated with?', a: 'We are authorized facilitators for multiple UGC-DEB approved universities with NAAC A++ and A grades. All partner universities are recognized and their degrees are valid nationwide.' },
    { q: 'Will I get proper certificates and documentation?', a: 'Yes! You will receive original degree certificates, mark sheets, and transcripts. We also provide embassy attestation services for those planning to work abroad.' }
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Students', icon: Users },
    { number: '50+', label: 'Programs Offered', icon: BookOpen },
    { number: '100%', label: 'Online Learning', icon: Video },
    { number: 'A++', label: 'NAAC Grading', icon: Award }
  ];

  const universities = [
    { name: 'Recognized by UGC-DEB', grade: 'Approved' },
    { name: 'NAAC A++ Grade University', grade: 'Excellence' },
    { name: 'NAAC A Grade University', grade: 'Quality' },
    { name: 'AIU Recognized', grade: 'Valid' }
  ];

  const highlights = [
    { icon: '✨', title: 'Training by Industry Experts', desc: 'Learn from professionals with real-world experience in their fields' },
    { icon: '🎤', title: 'Public Speaking & Personal Branding', desc: 'Build confidence and establish your professional presence' },
    { icon: '🎓', title: 'Convocation', desc: 'Celebrate your achievement with a formal graduation ceremony' },
    { icon: '🕒', title: 'Online-Offline Batches', desc: 'Choose the learning mode that fits your schedule and lifestyle' },
    { icon: '📈', title: '100% Practical Training', desc: 'Industry-demanding syllabus focused on hands-on learning' },
    { icon: '📈', title: 'Placement Support', desc: 'Get assistance in landing your dream job after graduation' },
    { icon: '📊', title: 'Internship Support', desc: 'Gain real-world experience through our internship program' },
    { icon: '📚', title: 'Communicative English Training', desc: 'Improve your professional communication skills' }
  ];

  // Helper to toggle FAQ
  const toggleFaq = (i: string) => setActiveFaq(activeFaq === i ? null : i);

  // Determine current programs and loading state
  const currentPrograms = activeTab === 'ug' ? ugPrograms : pgPrograms;
  const currentLoading = activeTab === 'ug' ? ugLoading : pgLoading;
  const currentError = activeTab === 'ug' ? ugError : pgError;
  const isRetrying = activeTab === 'ug' ? isRetryingUG : isRetryingPG;
  const handleRetry = activeTab === 'ug' ? handleRetryUG : handleRetryPG;

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

            <div className="inline-flex items-center space-x-2 bg-blue-50 px-5 py-2.5 rounded-full mb-6 border border-blue-100">
              <Shield className="w-4 h-4 text-blue-700" />
              <span className="text-sm font-medium text-blue-900">Authorized Course Facilitator | UG & PG Programs</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-slate-900 uppercase">
              Advance Your Career with
              <br />
              <span className="text-blue-700">Accredited Online Education</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-700 mb-4 max-w-3xl mx-auto leading-relaxed">
              Earn your <strong>Bachelor&apos;s or Master&apos;s degree in 12 months</strong> from prestigious Indian universities
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-600 mb-10 max-w-3xl mx-auto">
              <span className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>100% Online</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>UGC-DEB Approved</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>NAAC A++ Accredited</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Globally Recognized</span>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a
                href="tel:+917736911702"
                className="group flex items-center space-x-3 bg-[#FF6002] text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-[#ec5a06] hover:shadow-lg transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                <span>+91 77369 11702</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#programs"
                className="flex items-center space-x-2 bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold text-base border border-slate-200 hover:border-blue-700 hover:shadow-md transition-all duration-300"
              >
                <span>Explore Programs</span>
                <ChevronDown className="w-5 h-5" />
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {stats.map((stat, idx) => {
                const StatIcon = stat.icon;
                return (
                  <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
                    <StatIcon className="w-8 h-8 mx-auto mb-3 text-blue-700" />
                    <div className="text-2xl font-bold text-slate-900 mb-1">{stat.number}</div>
                    <p className="text-sm text-slate-600">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Banner */}
      <section className="py-5 bg-[#1725BB]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-white text-center">
            {benefits.map((benefit, idx) => {
              const BenefitIcon = benefit.icon;
              return (
                <div key={idx} className="flex flex-col items-center space-y-2">
                  <BenefitIcon className="w-5 h-5 opacity-90" />
                  <p className="text-xs font-medium opacity-90">{benefit.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 uppercase">Why Choose Edwin Excel</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Delivering excellence in online higher education through accredited programs and dedicated student support services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => {
              const FeatureIcon = feature.icon;
              return (
                <div key={idx} className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                  <div className="w-14 h-14 bg-[#FF6002] rounded-lg flex items-center justify-center mb-6">
                    <FeatureIcon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* University Partners */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 text-gray-900 uppercase">Accredited University Partners</h3>
            <p className="text-lg text-gray-600">Collaborating with nationally recognized, UGC-approved institutions</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {universities.map((uni, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 text-center border border-gray-200 hover:border-blue-500 transition-all hover:shadow-md">
                <Award className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                <p className="font-semibold text-gray-900 mb-2">{uni.name}</p>
                <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded font-medium">{uni.grade}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-blue-600 tracking-wider uppercase bg-blue-50 px-4 py-2 rounded-full">Academic Excellence</span>
            </div>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 tracking-tight uppercase">
              Available Programs
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">UGC-PSC Approved • NAAC A++ & A Graded Universities</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex bg-white rounded-2xl p-1.5 shadow-sm border border-gray-200">
              <button
                onClick={() => setActiveTab('ug')}
                className={`px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 text-sm ${activeTab === 'ug'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                Undergraduate ({ugLoading ? '...' : ugPrograms.length})
              </button>
              <button
                onClick={() => setActiveTab('pg')}
                className={`px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 text-sm ${activeTab === 'pg'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                Postgraduate ({pgLoading ? '...' : pgPrograms.length})
              </button>
            </div>
          </div>

          {/* Refresh Button */}
          {!currentLoading && currentPrograms.length > 0 && (
            <div className="flex justify-center mb-8">
              <button
                onClick={handleRetry}
                disabled={isRetrying}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
                {isRetrying ? 'Refreshing...' : 'Refresh Programs'}
              </button>
            </div>
          )}

          {/* Loading Overlay */}
          {isRetrying && currentPrograms.length > 0 && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 flex items-center gap-3">
                <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
                <span className="text-gray-700">Updating programs...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {currentError && currentPrograms.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 space-y-6">
              <AlertCircle className="w-16 h-16 text-red-500" />
              <div className="text-center space-y-2">
                <p className="text-red-500 text-lg font-semibold">Failed to load {activeTab === 'ug' ? 'undergraduate' : 'postgraduate'} programs</p>
                <p className="text-gray-600 text-sm max-w-md">{currentError}</p>
              </div>
              <button
                onClick={handleRetry}
                disabled={isRetrying}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
                {isRetrying ? 'Retrying...' : 'Try Again'}
              </button>
            </div>
          )}

          {/* Empty State */}
          {!currentLoading && !currentError && currentPrograms.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 space-y-6">
              <div className="text-gray-500 text-lg text-center">
                <p>No {activeTab === 'ug' ? 'undergraduate' : 'postgraduate'} programs to display yet.</p>
                <p className="text-sm mt-2">Check back later for updates.</p>
              </div>
              <button
                onClick={handleRetry}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          )}

          {/* Programs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentLoading && currentPrograms.length === 0 ? (
              // Initial loading skeletons
              Array.from({ length: 6 }).map((_, index) => (
                <ProgramCardSkeleton key={index} />
              ))
            ) : isRetrying ? (
              // Refresh loading with skeletons
              Array.from({ length: Math.min(currentPrograms.length, 6) }).map((_, index) => (
                <ProgramCardSkeleton key={index} />
              ))
            ) : (
              // Actual program data
              currentPrograms.map((program: Program) => (
                <AdmissionProvider key={program.id}>
                  <div className="group cursor-pointer">
                    <div className="relative h-[460px] rounded-2xl overflow-hidden bg-black shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                      {/* Background Image */}
                      <div className="absolute inset-0 z-0">
                        {program.image && (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}${program.image}`}
                            alt={program.name}
                            width={400}
                            height={460}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                            onError={(e) => {
                              // Fallback image if program image fails to load
                              e.currentTarget.src = '/programs/fallback.jpg';
                            }}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                      </div>


                      {/* Top Labels */}
                      <div className="absolute top-4 left-4 right-4 z-20 flex items-start justify-between">
                        <span className="px-3 py-1.5 bg-[#1725BB] text-white text-xs font-bold rounded-full">
                          {program.code}
                        </span>
                        <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                          <Star className="w-4 h-4 fill-[#9BF900] text-[#9BF900]" />
                          <span className="text-sm font-bold text-gray-900">
                            {program.rating}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 z-30 p-6">
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-[#9BF900] mb-1 uppercase tracking-wide">
                            {program.subtitle}
                          </p>
                          <h3 className="text-2xl font-bold text-white mb-3 leading-snug">
                            {program.name}
                          </h3>
                          <p className="text-sm text-gray-200 leading-relaxed line-clamp-2 mb-4">
                            {program.description}
                          </p>
                        </div>

                        {/* Course Stats */}
                        <div className="grid grid-cols-3 gap-3 mb-4 text-xs text-gray-300">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{program.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            <span>{program.students}+</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>{program.modules} Modules</span>
                          </div>
                        </div>

                        {/* Button */}
                        <EnrollButton course={program.name}>Enroll Now</EnrollButton>
                      </div>
                    </div>
                  </div>
                </AdmissionProvider>
              ))
            )}
          </div>

          {/* Contact for More Programs */}
          <div className="text-center mt-16 bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
            <p className="text-gray-600 mb-6 text-lg">Can&apos;t find your program? We offer many more courses!</p>
            <a
              href="tel:+917736911702"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>Contact us for complete course list</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* NIOS Section (continued) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1725BB] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <BookOpen className="w-20 h-20 mb-6 opacity-90" />
              <h3 className="text-4xl sm:text-5xl font-bold mb-6">NIOS 10th & 12th</h3>
              <p className="text-xl mb-4 opacity-90">National Institute of Open Schooling</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0" />
                  <span>Online & Regular Classes Available</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0" />
                  <span>Flexible Exam Schedules</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0" />
                  <span>Recognized Certification for Further Studies</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0" />
                  <span>Support for Practical & Theory Subjects</span>
                </li>
              </ul>

              <div className="flex items-center gap-4">
                {/* <a href="tel:+917356774901" className="bg-white text-green-700 px-6 py-3 rounded-full font-semibold shadow hover:shadow-lg">
                  Enroll for NIOS
                </a> */}
                <a href="#contact" className="inline-flex items-center space-x-2  rounded-full hover:bg-white/10 transition">
                  <AdmissionProvider>
                    <div>
                      <StartLearningButton />
                    </div>
                  </AdmissionProvider>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 text-gray-800 shadow-xl">
              <h4 className="text-xl font-bold mb-4">NIOS - Who should apply?</h4>
              <p className="text-sm text-gray-700 mb-4">NIOS is ideal for learners who need flexible schedules, working professionals, adult learners, and students seeking recognized open schooling certification.</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm font-semibold">Mode</p>
                  <p className="text-xs text-gray-600">Online & Regular</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm font-semibold">Exams</p>
                  <p className="text-xs text-gray-600">Flexible Schedule</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm font-semibold">Support</p>
                  <p className="text-xs text-gray-600">Study Material & Mentorship</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm font-semibold">Certificate</p>
                  <p className="text-xs text-gray-600">Recognized for Further Studies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl opacity-20"></div>

        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold tracking-wider uppercase text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                Why Choose Us
              </span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 tracking-tight uppercase">
              Excellence in Every Aspect
            </h3>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Comprehensive support and training designed to ensure your success in the professional world
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, i) => (
              <div
                key={i}
                className="group relative bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-xl transition-all duration-500 ease-out"
              >
                {/* Accent Line */}
                <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-2xl group-hover:w-full transition-all duration-500"></div>

                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <span className="text-3xl filter group-hover:drop-shadow-lg">
                      {highlight.icon}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h4 className="font-bold text-xl mb-3 text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                  {highlight.title}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {highlight.desc}
                </p>

                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 -z-10"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process / How it works */}
      <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 uppercase">How it works</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">A simple 4-step process to get you started and earning your degree quickly.</p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          {steps.map((p, i) => (
            <div key={i} className="bg-white border border-gray-200 p-8 rounded-xl hover:border-blue-300 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-[#FF6002] rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-700 transition-colors">
                <p className="text-white font-bold text-xl">{p.step}</p>
              </div>
              <h4 className="font-semibold text-xl mb-3 text-gray-900">{p.title}</h4>
              <p className="text-gray-600 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <EdwinExcelTestimonial />

      {/* FAQ Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 uppercase">Frequently asked questions</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">If you still have questions, reach out via phone or message below.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div>
              {faqs.slice(0, Math.ceil(faqs.length / 2)).map((f, i) => {
                const idx = i;
                return (
                  <div key={idx} className="mb-4 bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-300 transition-colors">
                    <button onClick={() => toggleFaq(idx.toString())} className="w-full text-left flex items-center justify-between p-6">
                      <span className="font-semibold text-gray-900 pr-4">{f.q}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transform transition-transform flex-shrink-0 ${activeFaq === idx.toString() ? 'rotate-180' : 'rotate-0'}`} />
                    </button>
                    <div className={`px-6 text-gray-600 leading-relaxed transition-all duration-300 ${activeFaq === idx.toString() ? 'pb-6 max-h-96' : 'max-h-0 overflow-hidden'}`}>
                      <p>{f.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div>
              {faqs.slice(Math.ceil(faqs.length / 2)).map((f, i) => {
                const idx = i + Math.ceil(faqs.length / 2);
                return (
                  <div key={idx} className="mb-4 bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-300 transition-colors">
                    <button onClick={() => toggleFaq(idx.toString())} className="w-full text-left flex items-center justify-between p-6">
                      <span className="font-semibold text-gray-900 pr-4">{f.q}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transform transition-transform flex-shrink-0 ${activeFaq === idx.toString() ? 'rotate-180' : 'rotate-0'}`} />
                    </button>
                    <div className={`px-6 text-gray-600 leading-relaxed transition-all duration-300 ${activeFaq === idx.toString() ? 'pb-6 max-h-96' : 'max-h-0 overflow-hidden'}`}>
                      <p>{f.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <Footer />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Edwin Excel",
            "url": "https://www.edwinacademy.com/edwinexcel",
            "logo": "https://www.edwinacademy.com/images/nav-logo.png",
            "contactPoint": [{
              "@type": "ContactPoint",
              "telephone": "+91 77369 11702",
              "contactType": "customer service",
              "areaServed": "IN",
              "availableLanguage": ["English", "Malayalam", "Hindi"]
            }]
          })
        }}
      />
    </div>
  );
}