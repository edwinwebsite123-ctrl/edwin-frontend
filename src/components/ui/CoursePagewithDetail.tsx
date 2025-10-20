'use client'
import React, { useState, useMemo } from 'react';
import { motion, Easing } from 'framer-motion';
import { 
  BookOpen, Award, Users, TrendingUp, Code, Briefcase, Heart, 
  Palette, GraduationCap, ArrowRight, Clock, Star, Laptop, 
  HeartPulse, Brush, X, Search,
  PlayCircle, CheckCircle, Target, Shield, Trophy, User
} from 'lucide-react';
import Navbar from '@/components/ui/navigation-menu';
import Footer from '@/components/ui/Footer';
import Image from 'next/image';

// --- EXPANDED COURSE DATA (Combined from previous turn for Detail Page) ---
const allCoursesData = [
    {
        id: 'hr-management-diploma',
        title: 'HR Management',
        subtitle: 'Diploma Program',
        category: 'management',
        icon: Users,
        description: 'Master human resource strategies, talent management, and organizational development with practical industry exposure to drive organizational success.',
        duration: '6 months',
        rating: 4.8,
        students: 1200,
        image: '/card-2.png',
        level: 'Diploma',
        modules: 12,
        certification: 'Certified',
        price: 1599,
        highlights: [
            'Focus on Indian Labor Laws and compliance.',
            'Practical training with HR software simulations.',
            'Capstone project: Designing a complete HR strategy.'
        ],
        instructor: {
            name: 'Dr. Evelyn Reed',
            title: 'Senior HR Consultant',
            bio: '20+ years in HR consulting across multinational companies. PhD in Organizational Psychology.',
            image: '',
            rating: 4.9
        },
        curriculum: [
            { module: 'Module 1', title: 'Fundamentals of HRM & Organizational Behavior' },
            { module: 'Module 2', title: 'Talent Acquisition and Workforce Planning' },
            { module: 'Module 3', title: 'Compensation and Benefits Management' },
            { module: 'Module 4', title: 'Performance Management Systems' },
            { module: 'Module 5', title: 'Employee Relations and Labor Laws' },
            { module: 'Module 6', title: 'Training and Development' },
        ],
    },
    {
        id: 'hr-management-pg',
        title: 'HR Management',
        subtitle: 'PG Diploma Program',
        category: 'management',
        icon: Users,
        description: 'Advanced human resource management with strategic planning, leadership, and organizational psychology.',
        duration: '12 months',
        rating: 4.9,
        students: 850,
        image: '/card-2.png',
        level: 'PG Diploma',
        modules: 18,
        certification: 'Certified',
        price: 2499,
        highlights: [
            'Strategic HR Planning and Leadership.',
            'Advanced Organizational Psychology.',
            'Global HR and Change Management.'
        ],
        instructor: { name: 'Prof. Anjali Desai', title: 'HR Strategist', bio: '15 years experience in strategic HR.', image: '', rating: 4.8 },
        curriculum: [
            { module: 'Module 1', title: 'Strategic HR Planning' },
            { module: 'Module 2', title: 'Advanced Organizational Development' },
            { module: 'Module 3', title: 'Talent Management & Succession' },
        ],
    },
    {
        id: 'hospital-management-diploma',
        title: 'Hospital Management',
        subtitle: 'Diploma Program',
        category: 'healthcare',
        icon: HeartPulse,
        description: 'Learn healthcare administration, medical facility operations, and patient care management essentials.',
        duration: '6 months',
        rating: 4.7,
        students: 720,
        image: '/card-3.png',
        level: 'Diploma',
        modules: 10,
        certification: 'Certified',
        price: 1499,
        highlights: [
            'Healthcare Facility Operations.',
            'Patient Care and Quality Standards.',
            'Medical Ethics and Law Fundamentals.'
        ],
        instructor: { name: 'Dr. Samuel Lee', title: 'Healthcare Administrator', bio: '10 years experience in hospital management.', image: '', rating: 4.7 },
        curriculum: [
            { module: 'Module 1', title: 'Intro to Healthcare Administration' },
            { module: 'Module 2', title: 'Hospital Logistics and Supply Chain' },
            { module: 'Module 3', title: 'Managing Patient Information' },
        ],
    },
    {
        id: 'hospital-management-pg',
        title: 'Hospital Management',
        subtitle: 'PG Diploma Program',
        category: 'healthcare',
        icon: HeartPulse,
        description: 'Advanced healthcare management covering strategic planning, quality control, and healthcare systems.',
        duration: '12 months',
        rating: 4.9,
        students: 620,
        image: '/card-3.png',
        level: 'PG Diploma',
        modules: 16,
        certification: 'Certified',
        price: 1899,
        highlights: [
            'Case studies on top hospital operational efficiency.',
            'Focus on NABH and JCI accreditation standards.',
            'Internship opportunities at partner hospitals.'
        ],
        instructor: {
            name: 'Prof. Mark Wilson',
            title: 'Healthcare Systems Director',
            bio: 'Former CEO of a regional hospital chain. Expert in public health policy and administration.',
            image: '',
            rating: 4.9
        },
        curriculum: [
            { module: 'Module 1', title: 'Healthcare System Structure & Policy' },
            { module: 'Module 2', title: 'Hospital Operations and Resource Management' },
            { module: 'Module 3', title: 'Quality Management & Patient Safety' },
            { module: 'Module 4', title: 'Healthcare Law and Ethics' },
            { module: 'Module 5', title: 'Hospital Information Systems (HIS)' },
            { module: 'Module 6', title: 'Healthcare Financial Management' },
        ],
    },
    {
        id: 'ai-digital-marketing',
        title: 'AI Integrated Digital Marketing',
        subtitle: 'Professional Certificate',
        category: 'management',
        icon: TrendingUp,
        description: 'Leverage cutting-edge AI tools for modern digital marketing strategies, SEO, and campaign optimization.',
        duration: '4-6 months',
        rating: 4.7,
        students: 1500,
        image: '/card-2.png',
        level: 'Certificate',
        modules: 14,
        certification: 'Professional',
        price: 1999,
        highlights: [
            'Hands-on with Google AI tools and advanced analytics.',
            'Creating predictive customer journey maps.',
            'Mastering programmatic advertising with machine learning.'
        ],
        instructor: {
            name: 'Mr. Alex Chen',
            title: 'Digital Strategy Lead',
            bio: 'Former CMO of a top-tier e-commerce firm. Specializes in AI-driven performance marketing.',
            image: '',
            rating: 4.7
        },
        curriculum: [
            { module: 'Module 1', title: 'AI in Marketing Fundamentals' },
            { module: 'Module 2', title: 'Advanced SEO & Content Strategy with AI' },
            { module: 'Module 3', title: 'Social Media & Influencer Marketing Automation' },
            { module: 'Module 4', title: 'PPC, Display & Retargeting Optimization' },
            { module: 'Module 5', title: 'Customer Segmentation & Personalization' },
            { module: 'Module 6', title: 'Marketing Analytics & Reporting' },
        ],
    },
    {
        id: 'ai-medical-coding',
        title: 'AI Integrated Medical Coding',
        subtitle: 'Professional Certificate',
        category: 'healthcare',
        icon: Code,
        description: 'Advanced medical coding with AI assistance for accurate healthcare documentation and billing.',
        duration: '5-8 months',
        rating: 4.8,
        students: 950,
        image: '/card-3.png',
        level: 'Certificate',
        modules: 12,
        certification: 'Professional',
        price: 1799,
        highlights: [
            'ICD-10-CM, CPT, and HCPCS coding mastery.',
            'Using AI tools for documentation audit.',
            'Anatomy, Physiology, and Medical Terminology.'
        ],
        instructor: { name: 'Mrs. Jane Doe', title: 'Certified Coder', bio: '12 years experience in multi-specialty coding.', image: 'instructor-jane.jpg', rating: 4.8 },
        curriculum: [
            { module: 'Module 1', title: 'Medical Terminology and Anatomy' },
            { module: 'Module 2', title: 'ICD-10-CM Coding' },
            { module: 'Module 3', title: 'CPT Coding and Modifiers' },
        ],
    },
    {
        id: 'professional-accounting',
        title: 'Professional Accounting',
        subtitle: 'Professional Certificate',
        category: 'management',
        icon: Briefcase,
        description: 'Comprehensive accounting principles, financial reporting, taxation, and audit management.',
        duration: '8-10 months',
        rating: 4.6,
        students: 1100,
        image: '/card-2.png',
        level: 'Certificate',
        modules: 16,
        certification: 'Professional',
        price: 1899,
        highlights: [
            'Tally ERP and advanced accounting software.',
            'GST and taxation compliance.',
            'Financial statement analysis and auditing.'
        ],
        instructor: { name: 'CA Rohan Singh', title: 'Chartered Accountant', bio: '25 years in financial consulting and auditing.', image: 'instructor-rohan.jpg', rating: 4.6 },
        curriculum: [
            { module: 'Module 1', title: 'Financial Accounting Fundamentals' },
            { module: 'Module 2', title: 'Corporate Taxation and GST' },
            { module: 'Module 3', title: 'Auditing and Assurance' },
        ],
    },
    {
        id: 'ug-pg-edwin-excel',
        title: 'Online UG - PG (Edwin Excel)',
        subtitle: 'Degree Programs',
        category: 'ugpg',
        icon: GraduationCap,
        description: 'Flexible online undergraduate and postgraduate degree programs with industry-relevant curriculum.',
        duration: '2-4 years',
        rating: 4.9,
        students: 2300,
        image: '/card-4.png',
        level: 'Degree',
        modules: 40,
        certification: 'University Degree',
        price: 4999,
        highlights: [
            'University recognized degree programs.',
            'Flexible online and blended learning options.',
            'Career counseling and university placement support.'
        ],
        instructor: { name: 'The Faculty', title: 'University Professors', bio: 'Taught by accredited university faculty members.', image: 'instructor-faculty.jpg', rating: 4.9 },
        curriculum: [
            { module: 'Semester 1', title: 'Core Subject 1 and 2' },
            { module: 'Semester 2', title: 'Core Subject 3 and Elective 1' },
            { module: 'Semester 3', title: 'Advanced Topics' },
        ],
    },
    {
        id: 'data-science',
        title: 'Data Science',
        subtitle: 'Professional Training',
        category: 'it',
        icon: TrendingUp,
        description: 'Master data analysis, machine learning, and statistical modeling for real-world applications.',
        duration: '6-8 months',
        rating: 4.8,
        students: 1800,
        image: '/card-1.png',
        level: 'Advanced',
        modules: 15,
        certification: 'Professional',
        price: 2499,
        highlights: [
            'Project-based learning with real-world datasets.',
            'In-depth Python (Pandas, Scikit-learn, TensorFlow).',
            'Deploying ML models using cloud services (AWS/Azure).'
        ],
        instructor: {
            name: 'Ms. Priya Sharma',
            title: 'Senior Data Scientist',
            bio: '5+ years at a major tech company. Expertise in predictive analytics and deep learning.',
            image: 'instructor-priya.jpg',
            rating: 4.8
        },
        curriculum: [
            { module: 'Module 1', title: 'Python & Statistical Programming' },
            { module: 'Module 2', title: 'Data Wrangling and Visualization' },
            { module: 'Module 3', title: 'Introduction to Machine Learning' },
            { module: 'Module 4', title: 'Deep Learning and Neural Networks' },
            { module: 'Module 5', title: 'Big Data Ecosystem (Spark/Hadoop)' },
            { module: 'Module 6', title: 'Model Deployment and MLOps' },
        ],
    },
    {
        id: 'learning-python',
        title: 'Learning Python',
        subtitle: 'Programming Fundamentals',
        category: 'it',
        icon: Code,
        description: 'Complete Python programming from basics to advanced concepts including frameworks and libraries.',
        duration: '2-3 months',
        rating: 4.7,
        students: 2100,
        image: '/card-1.png',
        level: 'Beginner',
        modules: 10,
        certification: 'Certificate',
        price: 799,
        highlights: [
            'Fundamentals of Python syntax and control flow.',
            'Object-Oriented Programming (OOP) in Python.',
            'Web scraping and basic automation projects.'
        ],
        instructor: { name: 'Mr. David Kim', title: 'Software Engineer', bio: 'Expert Python developer with a focus on web backend.', image: 'instructor-david.jpg', rating: 4.7 },
        curriculum: [
            { module: 'Module 1', title: 'Python Basics and Setup' },
            { module: 'Module 2', title: 'Data Structures and Algorithms' },
            { module: 'Module 3', title: 'Functions, Classes, and OOP' },
        ],
    },
    {
        id: 'graphic-video-editing',
        title: 'Graphic Designing & Video Editing',
        subtitle: 'Creative Mastery',
        category: 'creative',
        icon: Palette,
        description: 'Learn professional graphic design and video editing with industry-standard tools and techniques.',
        duration: '4-5 months',
        rating: 4.6,
        students: 980,
        image: '/card-5.png',
        level: 'Intermediate',
        modules: 12,
        certification: 'Professional',
        price: 1399,
        highlights: [
            'Adobe Photoshop, Illustrator, and Premiere Pro mastery.',
            'Creating brand identity and social media assets.',
            'Color correction, motion graphics, and sound editing.'
        ],
        instructor: { name: 'Ms. Chloe Wang', title: 'Creative Director', bio: '18 years in digital media and advertising.', image: 'instructor-chloe.jpg', rating: 4.6 },
        curriculum: [
            { module: 'Module 1', title: 'Design Principles and Theory' },
            { module: 'Module 2', title: 'Adobe Photoshop for Graphics' },
            { module: 'Module 3', title: 'Adobe Premiere Pro for Video Editing' },
        ],
    },
    {
        id: 'fashion-designing',
        title: 'Fashion Designing',
        subtitle: 'Creative Arts',
        category: 'creative',
        icon: Brush,
        description: 'Explore fashion illustration, pattern making, garment construction, and collection development.',
        duration: '6-9 months',
        rating: 4.5,
        students: 650,
        image: '/card-5.png',
        level: 'Professional',
        modules: 14,
        certification: 'Diploma',
        price: 1699,
        highlights: [
            'Sketching and Digital Fashion Illustration.',
            'Draping and Pattern Making Techniques.',
            'Building a professional design portfolio.'
        ],
        instructor: { name: 'Madam Isabelle', title: 'Couture Designer', bio: 'Ran her own boutique for 20 years. Teaches design theory.', image: 'instructor-isabelle.jpg', rating: 4.5 },
        curriculum: [
            { module: 'Module 1', title: 'History of Fashion & Textiles' },
            { module: 'Module 2', title: 'Fashion Illustration Techniques' },
            { module: 'Module 3', title: 'Garment Construction and Tailoring' },
        ],
    },
    {
        id: 'makeup-artist',
        title: 'Makeup Artist',
        subtitle: 'Beauty & Cosmetics',
        category: 'creative',
        icon: Palette,
        description: 'Professional makeup artistry covering bridal, editorial, special effects, and fashion makeup.',
        duration: '3-4 months',
        rating: 4.4,
        students: 420,
        image: '/card-5.png',
        level: 'Certificate',
        modules: 8,
        certification: 'Professional',
        price: 999,
        highlights: [
            'Bridal and Special Occasion Makeup.',
            'Advanced Contouring and Highlighting.',
            'Portfolio Shoot Guidance.'
        ],
        instructor: { name: 'Ms. Sofia Khan', title: 'Pro MUA', bio: 'Works with top fashion magazines and celebrities.', image: 'instructor-sofia.jpg', rating: 4.4 },
        curriculum: [
            { module: 'Module 1', title: 'Skin Care and Sanitation' },
            { module: 'Module 2', title: 'Day and Evening Makeup' },
            { module: 'Module 3', title: 'Bridal and Editorial Techniques' },
        ],
    },
    {
        id: 'interior-designing',
        title: 'Interior Designing',
        subtitle: 'Space & Architecture',
        category: 'creative',
        icon: Brush,
        description: 'Master space planning, 3D visualization, sustainable design, and residential/commercial interiors.',
        duration: '5-7 months',
        rating: 4.7,
        students: 780,
        image: '/card-5.png',
        level: 'Professional',
        modules: 13,
        certification: 'Diploma',
        price: 1599,
        highlights: [
            'AutoCAD and 3D Rendering software training.',
            'Vastu Shastra and Space Psychology.',
            'Residential and Commercial project management.'
        ],
        instructor: { name: 'Ar. Nikhil Mehta', title: 'Lead Architect & Designer', bio: '15 years running a successful design firm.', image: 'instructor-nikhil.jpg', rating: 4.7 },
        curriculum: [
            { module: 'Module 1', title: 'Elements and Principles of Design' },
            { module: 'Module 2', title: 'Space Planning and Ergonomics' },
            { module: 'Module 3', title: 'Materials, Lighting, and Furnishings' },
        ],
    },
    {
        id: 'logistics-scm',
        title: 'Logistics & Supply Chain Management',
        subtitle: 'Business Operations',
        category: 'management',
        icon: Briefcase,
        description: 'Comprehensive logistics, supply chain optimization, and inventory management strategies.',
        duration: '3-4 months',
        rating: 4.5,
        students: 890,
        image: '/card-2.png',
        level: 'Certificate',
        modules: 10,
        certification: 'Professional',
        price: 1299,
        highlights: [
            'Global Sourcing and Procurement.',
            'Inventory and Warehouse Management.',
            'Transportation and Logistics Technology.'
        ],
        instructor: { name: 'Mr. Ken Adams', title: 'Logistics Specialist', bio: 'Former Operations Director at a large shipping company.', image: 'instructor-ken.jpg', rating: 4.5 },
        curriculum: [
            { module: 'Module 1', title: 'Introduction to Supply Chain' },
            { module: 'Module 2', title: 'Demand Planning and Forecasting' },
            { module: 'Module 3', title: 'Warehouse and Inventory Operations' },
        ],
    },
    {
        id: 'medical-scribing',
        title: 'Medical Scribing',
        subtitle: 'Healthcare Documentation',
        category: 'healthcare',
        icon: Heart,
        description: 'Specialized training in medical documentation, EHR systems, and clinical terminology.',
        duration: '3-4 months',
        rating: 4.6,
        students: 560,
        image: '/card-3.png',
        level: 'Certificate',
        modules: 8,
        certification: 'Professional',
        price: 1099,
        highlights: [
            'Clinical Documentation and Note Taking.',
            'EHR System Navigation and Compliance (HIPAA).',
            'Pharmacology and Clinical Specialties.'
        ],
        instructor: { name: 'Ms. Rebecca Hill', title: 'Lead Scribe Trainer', bio: '7 years experience as a medical scribe in the US.', image: 'instructor-rebecca.jpg', rating: 4.6 },
        curriculum: [
            { module: 'Module 1', title: 'Clinical Workflow and Scribe Role' },
            { module: 'Module 2', title: 'Medical Terminology and Documentation' },
            { module: 'Module 3', title: 'EHR Systems and Data Entry' },
        ],
    },
    {
        id: 'office-fundamentals',
        title: 'Office Fundamentals',
        subtitle: 'Essential Skills',
        category: 'management',
        icon: Briefcase,
        description: 'Master Microsoft Office, business communication, and professional workplace skills.',
        duration: '2-3 months',
        rating: 4.3,
        students: 1250,
        image: '/card-2.png',
        level: 'Beginner',
        modules: 6,
        certification: 'Certificate',
        price: 599,
        highlights: [
            'Microsoft Excel (Advanced Formulas, Pivot Tables).',
            'Professional Email and Written Communication.',
            'Presentation Skills (PowerPoint).'
        ],
        instructor: { name: 'Mr. Anil Kumar', title: 'Corporate Trainer', bio: 'Expert in productivity and business software.', image: 'instructor-anil.jpg', rating: 4.3 },
        curriculum: [
            { module: 'Module 1', title: 'Microsoft Word and Document Creation' },
            { module: 'Module 2', title: 'Advanced Excel Techniques' },
            { module: 'Module 3', title: 'Professional Communication' },
        ],
    }
];

// Fallback course data for unmatched IDs
const fallbackCourse = {
    id: 'not-found',
    title: 'Course Not Found',
    subtitle: 'Error',
    category: 'none',
    icon: BookOpen,
    description: 'The requested course ID does not match any available program.',
    duration: 'N/A',
    rating: 0.0,
    students: 0,
    image: '/card-default.png',
    level: 'N/A',
    modules: 0,
    certification: 'N/A',
    price: 0,
    highlights: ['Please return to the courses page.'],
    instructor: {
        name: 'Admin',
        title: 'Support Team',
        bio: 'Contact support for assistance.',
        image: 'instructor-default.jpg',
        rating: 5.0
    },
    curriculum: [],
};


// --- COURSE DETAIL PAGE COMPONENTS (Moved here for single-file structure) ---

interface DetailCardProps {
  Icon: React.ElementType;
  title: string;
  value: string;
  colorClass: { bg: string; text: string; };
}

const DetailCard: React.FC<DetailCardProps> = ({ Icon, title, value, colorClass }) => (
  <motion.div 
    className="flex items-center space-x-4 p-4 lg:p-6 bg-white rounded-xl shadow-md border border-gray-100"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className={`p-3 rounded-xl ${colorClass.bg}`}>
      <Icon className={`w-6 h-6 ${colorClass.text}`} />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  </motion.div>
);

interface SectionTitleProps {
  title: string;
  Icon: React.ElementType;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, Icon }) => (
    <div className="flex items-center space-x-3 mb-6">
        <Icon className="w-7 h-7 text-[#1725BB]" />
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
);

interface CourseDetailPageProps {
  courseId: string;
  onBack: () => void;
}

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ courseId, onBack }) => {
  
  const course = useMemo(() => {
    return allCoursesData.find(c => c.id === courseId) || fallbackCourse;
  }, [courseId]);

  if (course.id === 'not-found') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -50 }} 
        className="min-h-screen flex items-center justify-center bg-gray-50 p-8"
      >
        <div className="text-center p-12 bg-white rounded-xl shadow-2xl max-w-md">
          <X className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">404 - Course Not Found</h1>
          <p className="text-gray-600 mb-6">
            The course you are looking for ({courseId}) could not be located.
          </p>
          <button
            onClick={onBack}
            className="inline-flex items-center bg-[#1725BB] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0d1870] transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180 mr-2" />
            Go to All Courses
          </button>
        </div>
      </motion.div>
    );
  }

  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0, 0.71, 0.2, 1.01] as unknown as Easing[] } }
  };
  
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
  };

  return (
    <motion.div
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -50 }} 
        className="min-h-screen bg-gray-50"
    >
      {/* Header with Back Button */}
      <header className="py-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button onClick={onBack} className="text-sm text-[#1725BB] hover:text-[#0d1870] font-medium transition-colors flex items-center">
                <ArrowRight className="w-4 h-4 rotate-180 mr-1" /> Back to Courses List
            </button>
        </div>
      </header>

      {/* Hero/Overview Section */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-br from-[#1725BB] to-[#0d1870] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Course Info Column */}
            <motion.div
              variants={headerVariants}
              initial="hidden"
              animate="visible"
              className="lg:w-2/3"
            >
              <span className="inline-block px-4 py-1.5 mb-3 text-xs font-semibold uppercase rounded-full bg-white/20 text-white">
                {course.level} Program
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
                {course.title}
              </h1>
              <p className="text-xl font-light opacity-90 mb-6">{course.description}</p>
              
              <div className="flex items-center space-x-6 text-lg font-medium">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-2" />
                  <span>{course.rating} Rating</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-white/70 mr-2" />
                  <span>{course.students.toLocaleString()}+ Students</span>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/30">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <User className="w-6 h-6 text-white" />
                        <span className="text-lg font-semibold">{course.subtitle}</span>
                    </div>
                    <span className="px-4 py-2 bg-[#FF6002] text-white font-bold rounded-lg text-lg">
                        {course.price ? `₹${course.price.toLocaleString()}` : 'Enquire'}
                    </span>
                </div>
              </div>
            </motion.div>

            {/* Sticky Enrollment/Call-to-Action Card */}
            <motion.div
              variants={headerVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="lg:w-1/3 mt-8 lg:mt-0"
            >
              <div className="lg:sticky lg:top-24 bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Enroll?</h3>
                <p className="text-gray-600 mb-6">Start your journey today and unlock exclusive career opportunities.</p>
                
                <button 
                  onClick={() => console.log('Initiate Enrollment for ' + course.title)}
                  className="w-full bg-gradient-to-r from-[#FF6002] to-[#e55502] text-white py-3.5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Enroll Now
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <div className="mt-6 space-y-3 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#9BF900]" />
                        <span>{course.certification} Certification Included</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{course.duration} Duration</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-gray-500" />
                        <span>{course.modules} In-Depth Modules</span>
                    </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: Details (Highlights & Curriculum) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Key Highlights */}
            <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <SectionTitle title="Key Program Highlights" Icon={Trophy} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                    <Target className="w-5 h-5 mt-1 text-[#FF6002] flex-shrink-0" />
                    <p className="text-gray-700">{highlight}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Curriculum/Syllabus */}
            <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <SectionTitle title="Detailed Course Curriculum" Icon={BookOpen} />
              <div className="space-y-4">
                {course.curriculum.map((item, index) => (
                  <div 
                    key={index} 
                    className="p-5 bg-white rounded-lg border border-gray-100 shadow-sm transition-all hover:border-[#1725BB] cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#1725BB]">{item.module}</span>
                      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#1725BB] transition-colors" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mt-1">{item.title}</h4>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Right Column: Instructor Profile & Key Stats */}
          <div className="lg:col-span-1 space-y-10">
            
            {/* Instructor Profile */}
            <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <SectionTitle title="Meet Your Instructor" Icon={User} />
              <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden border-4 border-[#1725BB]">
                  <Image 
                    src={course.instructor.image} 
                    alt={course.instructor.name} 
                    width={96}
                    height={96}
                    className="w-full h-full object-cover" 
                    onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src="/instructor-default.jpg"; }} 
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{course.instructor.name}</h3>
                <p className="text-md text-[#FF6002] font-semibold mb-3">{course.instructor.title}</p>
                <div className="flex items-center justify-center mb-4 text-sm font-medium text-gray-700">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{course.instructor.rating} Instructor Rating</span>
                </div>
                <p className="text-gray-600 text-sm italic">{course.instructor.bio}</p>
              </div>
            </motion.div>

            {/* Key Stats Grid */}
            <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.5 }}>
              <SectionTitle title="Course Snapshot" Icon={CheckCircle} />
              <div className="grid grid-cols-1 gap-4">
                <DetailCard 
                  Icon={Clock} 
                  title="Duration" 
                  value={course.duration} 
                  colorClass={{ bg: 'bg-blue-100', text: 'text-blue-600' }}
                />
                <DetailCard 
                  Icon={BookOpen} 
                  title="Total Modules" 
                  value={`${course.modules} Modules`} 
                  colorClass={{ bg: 'bg-green-100', text: 'text-green-600' }}
                />
                <DetailCard 
                  Icon={Briefcase} 
                  title="Level" 
                  value={course.level} 
                  colorClass={{ bg: 'bg-orange-100', text: 'text-orange-600' }}
                />
                <DetailCard 
                  Icon={Trophy} 
                  title="Certification" 
                  value={course.certification} 
                  colorClass={{ bg: 'bg-purple-100', text: 'text-purple-600' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer (Simplified) */}
      <footer className="bg-white border-t border-gray-100 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          &copy; 2025 Edwin Academy. All rights reserved.
        </div>
      </footer>
    </motion.div>
  );
};


// --- MAIN CoursesPage Component (Updated to handle routing) ---

const CoursesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null); // State for dynamic routing simulation

  const allCourses = allCoursesData; // Use the expanded data array

  const categories = [
    { id: 'all', label: 'All Courses', icon: BookOpen },
    { id: 'it', label: 'IT & Technology', icon: Laptop },
    { id: 'management', label: 'Management', icon: Briefcase },
    { id: 'healthcare', label: 'Healthcare', icon: HeartPulse },
    { id: 'creative', label: 'Creative Arts', icon: Brush },
    { id: 'ugpg', label: 'Degree Programs', icon: GraduationCap }
  ];

  const features = [
    { icon: Trophy, title: 'Industry Recognition', description: 'Certified programs recognized by leading industries' },
    { icon: Users, title: 'Expert Faculty', description: '50+ experienced instructors with real-world expertise' },
    { icon: Clock, title: 'Flexible Learning', description: 'Study at your own pace with lifetime access' },
    { icon: Shield, title: 'Job Assistance', description: 'Career support and placement guidance included' }
  ];

  const filterCourses = () => {
    let filtered = allCourses;
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(course => course.category === activeCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  // Function to simulate navigation to the detail page
  const handleCourseClick = (courseId: string) => {
    setSelectedCourseId(courseId);
  };
  
  // Function to simulate navigation back to the list
  const handleBackToCourses = () => {
      setSelectedCourseId(null);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  // If a course is selected, render the detail page
  if (selectedCourseId) {
      return <CourseDetailPage courseId={selectedCourseId} onBack={handleBackToCourses} />;
  }

  // Otherwise, render the main courses list page
  return (
    <div className="min-h-screen bg-white">
      {/* Modern Header */}
     <Navbar/>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-full shadow-md border border-gray-100"
            >
              <div className="w-2 h-2 bg-[#9BF900] rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">{allCourses.length}+ Professional Programs Available</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 mb-6 leading-tight"
            >
              Transform Your Career with
              <span className="block mt-2 bg-gradient-to-r from-[#1725BB] to-[#00D0FF] bg-clip-text text-transparent">
                World-Class Education
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto"
            >
              Discover industry-leading courses designed by experts. From IT to Healthcare, Management to Creative Arts - find your perfect learning path.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="#courses"
                className="w-full sm:w-auto bg-gradient-to-r from-[#FF6002] to-[#e55502] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 inline-flex items-center justify-center gap-3 group"
              >
                Browse All Courses
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#"
                className="w-full sm:w-auto bg-white text-[#1725BB] px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all border-2 border-[#1725BB] hover:bg-[#1725BB] hover:text-white inline-flex items-center justify-center gap-3"
              >
                <PlayCircle className="w-5 h-5" />
                Watch Intro
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-16 lg:mt-20"
          >
            {[
              { icon: Award, label: 'Certified Programs', value: `${allCourses.length}+`, color: '#1725BB' },
              { icon: Users, label: 'Active Students', value: '10K+', color: '#9BF900' },
              { icon: BookOpen, label: 'Expert Instructors', value: '50+', color: '#FF6002' },
              { icon: Trophy, label: 'Success Rate', value: '95%', color: '#00D0FF' }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + idx * 0.1, type: 'spring' }}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-3 rounded-xl" style={{ backgroundColor: `${stat.color}15` }}>
                      <Icon className="w-8 h-8" style={{ color: stat.color }} />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Edwin Academy?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We&apos;re committed to providing quality education with real-world applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-all"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1725BB]/10 to-[#00D0FF]/10 rounded-2xl mb-4">
                    <Icon className="w-8 h-8 text-[#1725BB]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-[#FF6002]/10 rounded-full">
              <div className="w-2 h-2 bg-[#FF6002] rounded-full"></div>
              <span className="text-sm font-semibold text-[#FF6002] uppercase tracking-wide">Our Programs</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              Explore Our Courses
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our diverse range of professional courses designed for career growth
            </p>
          </motion.div>

          <div className="mb-10">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1725BB] focus:border-transparent shadow-sm"
                />
              </div>

              <div className="text-sm text-gray-600 font-medium">
                Showing {filterCourses().length} of {allCourses.length} courses
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-semibold transition-all shadow-sm ${
                      activeCategory === cat.id
                        ? 'bg-[#1725BB] text-white shadow-lg shadow-[#1725BB]/30'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{cat.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filterCourses().map((course) => {
              return (
                <motion.div
                  key={course.id}
                  variants={itemVariants}
                  onClick={() => handleCourseClick(course.id)} // Click now navigates to detail page
                  className="group cursor-pointer"
                >
                  <div className="relative h-[480px] rounded-2xl overflow-hidden bg-black shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                    <div className="absolute inset-0 z-10">
                      <Image
                        src={course.image}
                        alt={course.title}
                        width={400}
                        height={480}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30 transition-opacity duration-500 group-hover:from-black/90"></div>
                    </div>

                    <div className="absolute top-4 left-4 right-4 z-30 flex items-start justify-between">
                      <span className="px-3 py-1.5 bg-[#1725BB] text-white text-xs font-bold rounded-full">
                        {course.level}
                      </span>
                      <div className="flex items-center space-x-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <Star className="w-4 h-4 fill-[#9BF900] text-[#9BF900]" />
                        <span className="text-sm font-bold text-gray-900">{course.rating}</span>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 z-30 p-6">
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-[#9BF900] mb-1 uppercase tracking-wide">
                          {course.subtitle}
                        </p>
                        <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-200 leading-relaxed line-clamp-2 mb-4">
                          {course.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-4 text-xs text-gray-300">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          <span>{course.students}+</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{course.modules} Modules</span>
                        </div>
                      </div>

                      <button className="w-full inline-flex items-center justify-center gap-2 bg-[#FF6002] hover:bg-[#e55502] text-white font-bold py-3 rounded-xl shadow-lg transition-all hover:shadow-xl">
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default CoursesPage;