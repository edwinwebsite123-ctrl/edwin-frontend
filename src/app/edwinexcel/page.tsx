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
} from 'lucide-react';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/navigation-menu';
import AdmissionFormButton, { AdmissionProvider, EnrollButton, StartLearningButton } from '@/components/ui/AdmissionButton';
import Image from 'next/image';

export default function EdwinExcelPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('ug');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);


  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sample program data with images
  const ugPrograms = [
    {
      id: 1,
      code: "BA",
      name: "Bachelor of Arts",
      subtitle: "Humanities & Social Sciences",
      description: "Comprehensive humanities program covering literature, history, and social sciences with research opportunities",
      duration: "3 Years",
      specializations: ["English", "History", "Political Science", "Economics", "Psychology"],
      eligibility: "10+2 or equivalent from a recognized board",
      students: "2500",
      modules: 24,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      code: "B.Com",
      name: "Bachelor of Commerce",
      subtitle: "Commerce & Accounting",
      description: "Foundation in accounting, finance, taxation, and business management with practical training",
      duration: "3 Years",
      specializations: ["Accounting", "Finance", "Banking", "Taxation", "Business Management"],
      eligibility: "10+2 with Commerce or equivalent",
      students: "3200",
      modules: 28,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      code: "BBA",
      name: "Bachelor of Business Administration",
      subtitle: "Business Management",
      description: "Strategic business education with focus on management and entrepreneurship skills",
      duration: "3 Years",
      specializations: ["Marketing", "Finance", "HR", "Operations", "International Business"],
      eligibility: "10+2 from any recognized board",
      students: "2800",
      modules: 26,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop"
    },
    {
      id: 4,
      code: "BCA",
      name: "Bachelor of Computer Applications",
      subtitle: "Information Technology",
      description: "Comprehensive IT program covering programming, databases, and web technologies",
      duration: "3 Years",
      specializations: ["Software Development", "Web Design", "Database Management", "Cloud Computing"],
      eligibility: "10+2 with Mathematics",
      students: "3500",
      modules: 30,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop"
    },
    {
      id: 5,
      code: "B.Sc",
      name: "Bachelor of Science",
      subtitle: "Science & Technology",
      description: "Scientific education with practical lab work and research opportunities",
      duration: "3 Years",
      specializations: ["Physics", "Chemistry", "Mathematics", "Biology", "Computer Science", "Biotechnology"],
      eligibility: "10+2 with Science stream",
      students: "2900",
      modules: 32,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop"
    },
    {
      id: 6,
      code: "B.Ed",
      name: "Bachelor of Education",
      subtitle: "Teacher Training",
      description: "Professional teaching program with classroom training and practice",
      duration: "2 Years",
      specializations: ["Primary Education", "Secondary Education", "Special Education", "Educational Technology"],
      eligibility: "Graduation in any discipline",
      students: "1800",
      modules: 20,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop"
    }
  ];

  const pgPrograms = [
    {
      id: 7,
      code: "MA",
      name: "Master of Arts",
      subtitle: "Advanced Humanities",
      description: "Advanced studies in humanities with research and thesis work",
      duration: "2 Years",
      specializations: ["English Literature", "History", "Political Science", "Sociology", "Public Administration"],
      eligibility: "Bachelor's degree in relevant field",
      students: "1500",
      modules: 16,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop"
    },
    {
      id: 8,
      code: "M.Com",
      name: "Master of Commerce",
      subtitle: "Advanced Commerce",
      description: "Advanced commerce education with specialization in finance and accounting",
      duration: "2 Years",
      specializations: ["Advanced Accounting", "Corporate Finance", "International Trade", "E-Commerce"],
      eligibility: "B.Com or equivalent degree",
      students: "1800",
      modules: 18,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    },
    {
      id: 9,
      code: "MBA",
      name: "Master of Business Administration",
      subtitle: "Executive Management",
      description: "Executive management program with industry case studies and internships",
      duration: "2 Years",
      specializations: ["Marketing Management", "Financial Management", "HR Management", "Operations", "Business Analytics"],
      eligibility: "Graduation in any discipline",
      students: "2200",
      modules: 20,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop"
    },
    {
      id: 10,
      code: "MCA",
      name: "Master of Computer Applications",
      subtitle: "Advanced IT",
      description: "Advanced IT program with focus on software engineering and systems",
      duration: "2 Years",
      specializations: ["Software Engineering", "Data Science", "Cyber Security", "AI & ML", "Cloud Architecture"],
      eligibility: "BCA/B.Sc (CS) or equivalent with Mathematics",
      students: "2000",
      modules: 22,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop"
    },
    {
      id: 11,
      code: "M.Sc",
      name: "Master of Science",
      subtitle: "Research & Science",
      description: "Research-oriented science program with laboratory and field work",
      duration: "2 Years",
      specializations: ["Physics", "Chemistry", "Mathematics", "Biotechnology", "Environmental Science", "Data Science"],
      eligibility: "B.Sc in relevant discipline",
      students: "1600",
      modules: 20,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop"
    },
    {
      id: 12,
      code: "M.Ed",
      name: "Master of Education",
      subtitle: "Educational Leadership",
      description: "Advanced teaching methodology with educational research and leadership",
      duration: "2 Years",
      specializations: ["Curriculum Development", "Educational Psychology", "Educational Administration", "Guidance & Counseling"],
      eligibility: "B.Ed degree from recognized university",
      students: "1200",
      modules: 16,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop"
    }
  ];

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

  const testimonials = [
    { name: 'Priya Menon', role: 'MBA Graduate', text: 'Completed my MBA while working full-time. The flexible online classes and excellent faculty support made it possible. Now I have better career prospects!', rating: 5, location: 'Kochi, Kerala' },
    { name: 'Rajesh Kumar', role: 'B.Com Graduate', text: 'Edwin Excel gave me a second chance at education. The affordable fees and quality teaching helped me complete my degree. Highly satisfied!', rating: 5, location: 'Kannur, Kerala' },
    { name: 'Anjali Sharma', role: 'MCA Student', text: 'The quality of education and continuous support from the team is outstanding. Study materials are excellent and exams are well-structured.', rating: 5, location: 'Calicut, Kerala' }
  ];

  const process = [
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

  // small helper to toggle FAQ
  const toggleFaq = (i: string) => setActiveFaq(activeFaq === i ? null : i);


  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navigation */}
      <Navbar/>
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
                href="tel:+917356774901"
                className="group flex items-center space-x-3 bg-[#FF6002] text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-[#ec5a06] hover:shadow-lg transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                <span>+91 73567 74901</span>
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

        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-white rounded-2xl p-1.5 shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveTab('ug')}
              className={`px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 text-sm ${
                activeTab === 'ug' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Undergraduate ({ugPrograms.length})
            </button>
            <button
              onClick={() => setActiveTab('pg')}
              className={`px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 text-sm ${
                activeTab === 'pg' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Postgraduate ({pgPrograms.length})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeTab === 'ug' ? ugPrograms : pgPrograms).map((program) => (
            <AdmissionProvider key={program.id}>
              <div className="group cursor-pointer">
                <div className="relative h-[460px] rounded-2xl overflow-hidden bg-black shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={program.image}
                      alt={program.name}
                      width={400}
                      height={460}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
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
          ))}
        </div>

        <div className="text-center mt-16 bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
          <p className="text-gray-600 mb-6 text-lg">Can&apos;t find your program? We offer many more courses!</p>
          <a 
            href="tel:+917356774901" 
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
                <a href="tel:+917356774901" className="bg-white text-green-700 px-6 py-3 rounded-full font-semibold shadow hover:shadow-lg">
                  Enroll for NIOS
                </a>
                <a href="#contact" className="inline-flex items-center space-x-2  rounded-full hover:bg-white/10 transition">
                  <AdmissionProvider>
                    <div>
                      <StartLearningButton/>
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
          {process.map((p, i) => (
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
      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 uppercase">What our students say</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Real stories from learners who upgraded their careers with Edwin Excel</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md flex-shrink-0">
                  <span className="font-semibold text-white text-sm">{t.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                  <p className="text-xs text-gray-400 mt-1">{t.location}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">{t.text}</p>
              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, s) => <Star key={s} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              </div>
            </div>
          ))}
        </div>
      </section>

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
      <Footer/>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Edwin Excel",
            "url": "https://yourdomain.com/edwin-excel",
            "logo": "https://yourdomain.com/images/edwin-excel-logo.png",
            "contactPoint": [{
              "@type": "ContactPoint",
              "telephone": "+91 73567 74901",
              "contactType": "customer service",
              "areaServed": "IN",
              "availableLanguage": ["English", "Malayalam","Hindi"]
            }]
          })
        }}
      />
    </div>
  );
}
