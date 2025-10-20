import React, { useState } from 'react';
import { 
  Database, 
  TrendingUp, 
  Stethoscope, 
  Palette, 
  GraduationCap,
  ArrowRight,
  Users,
  BookOpen,
  Award,
  Target,
  Building2,
  Clock,
  CheckCircle
} from 'lucide-react';

const EdwinAcademyCategories = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    {
      id: 1,
      name: 'Information Technology',
      shortName: 'IT Solutions',
      courses: 2,
      icon: Database,
      color: '#1725BB',
      bgColor: 'bg-[#1725BB]',
      lightBg: 'bg-[#1725BB]/5',
      description: 'Advanced Data Science & Python Programming',
      duration: '6-12 Months',
      level: 'Professional',
      slug: 'information-technology'
    },
    {
      id: 2,
      name: 'Management & Commerce',
      shortName: 'Business',
      courses: 7,
      icon: TrendingUp,
      color: '#9BF900',
      bgColor: 'bg-[#9BF900]',
      lightBg: 'bg-[#9BF900]/5',
      description: 'Strategic Business Management & Operations',
      duration: '4-8 Months',
      level: 'Executive',
      slug: 'management-commerce'
    },
    {
      id: 3,
      name: 'Healthcare',
      shortName: 'Medical',
      courses: 4,
      icon: Stethoscope,
      color: '#FF6002',
      bgColor: 'bg-[#FF6002]',
      lightBg: 'bg-[#FF6002]/5',
      description: 'AI-Integrated Medical Technology & Coding',
      duration: '6-10 Months',
      level: 'Specialist',
      slug: 'healthcare'
    },
    {
      id: 4,
      name: 'Creative Arts',
      shortName: 'Design',
      courses: 4,
      icon: Palette,
      color: '#00D0FF',
      bgColor: 'bg-[#00D0FF]',
      lightBg: 'bg-[#00D0FF]/5',
      description: 'Professional Design & Creative Solutions',
      duration: '3-6 Months',
      level: 'Creative',
      slug: 'creative-arts'
    },
    {
      id: 5,
      name: 'Academic Programs',
      shortName: 'Degrees',
      courses: 15,
      icon: GraduationCap,
      color: '#1725BB',
      bgColor: 'bg-[#1725BB]',
      lightBg: 'bg-[#1725BB]/5',
      description: 'Undergraduate & Postgraduate Qualifications',
      duration: '1-4 Years',
      level: 'Academic',
      slug: 'degree-programs'
    }
  ];

  const handleCategoryClick = (category) => {
    console.log(`Navigating to ${category.name} courses`);
    alert(`Redirecting to ${category.name} courses...`);
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        
        {/* Corporate Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-2 bg-white border border-slate-200 rounded-full shadow-sm mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#1725BB]"></div>
              <span className="text-sm font-semibold text-slate-700">EDWIN ACADEMY</span>
              <div className="w-px h-4 bg-slate-300 mx-2"></div>
              <span className="text-sm text-slate-500">Professional Training Institute</span>
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Transform Your Career with
            <br />
            <span className="bg-gradient-to-r from-[#1725BB] to-[#9BF900] bg-clip-text text-transparent">
              Industry-Leading Programs
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Join thousands of professionals who have advanced their careers through our comprehensive training programs designed by industry experts.
          </p>
          
          {/* Professional Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 bg-white rounded-xl p-8 shadow-sm border border-slate-100">
            {[
              { metric: '2,500+', label: 'Professionals Trained', color: '#1725BB' },
              { metric: '98%', label: 'Success Rate', color: '#9BF900' },
              { metric: '150+', label: 'Corporate Partners', color: '#FF6002' },
              { metric: '5+', label: 'Years Excellence', color: '#00D0FF' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-1">{item.metric}</div>
                <div className="text-sm text-slate-600">{item.label}</div>
                <div className="w-12 h-0.5 mx-auto mt-2 rounded-full" style={{ backgroundColor: item.color }}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Program Grid */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Our Programs</h2>
              <p className="text-slate-600">Choose from our comprehensive range of professional development programs</p>
            </div>
            <div className="hidden lg:flex items-center gap-3 text-sm text-slate-500">
              <Clock className="w-4 h-4" />
              <span>Flexible scheduling available</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isHovered = hoveredCard === category.id;
              
              return (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  onMouseEnter={() => setHoveredCard(category.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group relative bg-white border-2 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    isHovered ? 'border-current shadow-lg -translate-y-1' : 'border-slate-100 hover:border-slate-200'
                  }`}
                  style={{ 
                    borderColor: isHovered ? category.color : undefined,
                    boxShadow: isHovered ? `0 20px 25px -5px ${category.color}15` : undefined
                  }}
                >
                  {/* Header Section */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div 
                        className={`w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform duration-300 ${
                          isHovered ? 'scale-110' : ''
                        } ${category.bgColor}`}
                      >
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">{category.shortName}</div>
                        <div className="text-sm font-semibold" style={{ color: category.color }}>{category.courses} Programs</div>
                      </div>
                    </div>
                    <ArrowRight className={`w-5 h-5 text-slate-400 transition-all duration-300 ${isHovered ? 'text-current translate-x-1' : ''}`} style={{ color: isHovered ? category.color : undefined }} />
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
                      {category.name}
                    </h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Program Details */}
                  <div className="flex items-center justify-between text-sm mb-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">{category.duration}</span>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${category.lightBg}`} style={{ color: category.color }}>
                        {category.level}
                      </div>
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div className="absolute bottom-0 left-0 h-1 bg-slate-100 w-full rounded-b-2xl">
                    <div 
                      className={`h-full rounded-b-2xl transition-all duration-500 ${
                        isHovered ? 'w-full' : 'w-0'
                      }`}
                      style={{ backgroundColor: category.color }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Corporate Features Section */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 lg:p-16 text-white mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Industry Leaders Choose Us</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              We deliver comprehensive professional development solutions that drive real business results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: "Corporate Partnerships",
                description: "Direct connections with leading companies for placement opportunities",
                color: "#1725BB",
                accent: "#9BF900"
              },
              {
                icon: Users,
                title: "Expert Faculty",
                description: "Industry veterans with proven track records in their respective fields",
                color: "#FF6002",
                accent: "#00D0FF"
              },
              {
                icon: Award,
                title: "Proven Results",
                description: "98% of our graduates secure positions within 6 months of completion",
                color: "#9BF900",
                accent: "#1725BB"
              }
            ].map((feature, index) => (
              <div key={index} className="group text-center">
                <div className="relative mb-6">
                  <div 
                    className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <feature.icon className="w-9 h-9" style={{ color: feature.color }} />
                  </div>
                  <div 
                    className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: feature.accent }}
                  >
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Professional CTA */}
        <div className="text-center bg-white border border-slate-200 rounded-2xl p-12 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to Advance Your Career?</h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Take the first step towards professional excellence. Our admissions team is ready to help you choose the right program for your career goals.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => console.log('Explore programs')}
              className="px-8 py-4 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl bg-gradient-to-r from-[#1725BB] to-blue-700"
            >
              <span className="flex items-center gap-2">
                Explore Programs
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>
            
            <button 
              onClick={() => console.log('Schedule consultation')}
              className="px-8 py-4 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl bg-gradient-to-r from-[#FF6002] to-orange-600"
            >
              Schedule Consultation
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-8 pt-8 border-t border-slate-100 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#9BF900]" />
              <span>Free Career Counseling</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#9BF900]" />
              <span>Flexible Payment Options</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#9BF900]" />
              <span>Industry Certification</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdwinAcademyCategories;