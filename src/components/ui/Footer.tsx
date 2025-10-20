import { Facebook, Linkedin, Instagram, Twitter, Mail, Phone, MapPin, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/', ariaLabel: 'Go to homepage' },
    { name: 'About Us', href: '/about', ariaLabel: 'Learn about Edwin Academy' },
    { name: 'Privacy Policy', href: '/privacy-policy', ariaLabel: 'Read our privacy policy' },
    { name: 'Terms & Conditions', href: '/terms', ariaLabel: 'Read terms and conditions' },
  ];

  const courses = [
    { name: 'Human Resource Management', href: '/course/hr-management', ariaLabel: 'Learn full stack development' },
    { name: 'Hospital Management', href: '/course/hospital-management', ariaLabel: 'Explore data science courses' },
    { name: 'Ai integrated Digital Marketing', href: '/course/ai-digital-marketing', ariaLabel: 'Study digital marketing' },
    { name: ' Ai integrated Medical Coding', href: '/course/ai-medical-coding', ariaLabel: 'Medical coding certification' },
  ];

  const resources = [
    { name: 'Testimonials', href: '/testimonials', ariaLabel: 'Read student testimonials' },
    { name: 'Blog', href: '/blog', ariaLabel: 'Visit our blog' },
    { name: 'Contact', href: '/contact', ariaLabel: 'Contact Edwin Academy' },
    { name: 'Careers', href: '/careers', ariaLabel: 'Career opportunities' },
  ];

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: Facebook, 
      href: 'https://www.facebook.com/edwinacademyindia',
      ariaLabel: 'Follow us on Facebook'
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      href: 'https://www.linkedin.com/company/edwinacademy/',
      ariaLabel: 'Connect with us on LinkedIn'
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      href: 'https://www.instagram.com/edwinacademyofficial?igsh=c251bjVtcW9tMHQ2&utm_source=qr',
      ariaLabel: 'Follow us on Instagram'
    },
    { 
      name: 'Youtube', 
      icon: Youtube, 
      href: 'https://youtube.com/@edwinacademyofficial7586?si=AWlTUgw-4ABn8RGr',
      ariaLabel: 'Follow us on Twitter'
    },
    
  ];

  return (
    <footer className="bg-black text-white" role="contentinfo" aria-label="Site footer">
      {/* Hero Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
            Join Us. Learn.
            <br />
            Create. Succeed.
            <br />
            Shape Your Future.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-3xl">
            Empowering students with industry-relevant skills and knowledge. Transform your career with Edwin Academy's comprehensive training programs designed for the modern workforce.
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <img 
                src="/logo/nav-logo.png" 
                alt="Edwin Academy - Professional Training Institute"
                className="h-10 sm:h-12 w-auto mb-4"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div style={{ display: 'none' }} className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#9BF900] rounded flex items-center justify-center">
                  <span className="text-black font-bold text-xl">E</span>
                </div>
                <span className="text-xl font-bold">Edwin Academy</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Leading professional training institute offering industry-certified courses in technology, healthcare, and business domains.
              </p>
            </div>

            {/* Contact Info */}
            <address className="not-italic space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-[#9BF900] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-gray-300">
                  Edwin Academy, Office
                  <br />
                  Calicut, Kerala, India
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-[#9BF900] flex-shrink-0" aria-hidden="true" />
                <a 
                  href="mailto:info@edwinacademy.com" 
                  className="text-gray-300 hover:text-[#9BF900] transition-colors duration-300"
                  aria-label="Email Edwin Academy"
                >
                  info@edwinacademy.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-[#9BF900] flex-shrink-0" aria-hidden="true" />
                <a 
                  href="tel:+919383848800" 
                  className="text-gray-300 hover:text-[#9BF900] transition-colors duration-300"
                  aria-label="Call Edwin Academy"
                >
                 +91 77369 11702 , +91 70251 43536
                </a>
              </div>
            </address>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#9BF900] transition-colors duration-300 text-sm block"
                    aria-label={link.ariaLabel}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Courses */}
          <nav aria-label="Popular courses">
            <h3 className="text-lg font-semibold mb-4 text-white">Popular Courses</h3>
            <ul className="space-y-3">
              {courses.map((course) => (
                <li key={course.name}>
                  <a
                    href={course.href}
                    className="text-gray-400 hover:text-[#9BF900] transition-colors duration-300 text-sm block"
                    aria-label={course.ariaLabel}
                  >
                    {course.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources">
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a
                    href={resource.href}
                    className="text-gray-400 hover:text-[#9BF900] transition-colors duration-300 text-sm block"
                    aria-label={resource.ariaLabel}
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © {currentYear} Edwin Academy. All rights reserved. | 
              <a href="/privacy-policy" className="hover:text-[#9BF900] ml-1 transition-colors duration-300">Privacy Policy</a>
              <span className="mx-2">|</span>
              <a href="/terms" className="hover:text-[#9BF900] transition-colors duration-300">Terms & Conditions</a>
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4" role="navigation" aria-label="Social media links">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:border-[#9BF900] hover:bg-[#9BF900]/10 transition-all duration-300 group"
                    aria-label={social.ariaLabel}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-4 h-4 text-gray-400 group-hover:text-[#9BF900] transition-colors duration-300" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Schema.org structured data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "Edwin Academy",
          "description": "Leading professional training institute offering industry-certified courses in technology, healthcare, and business domains",
          "url": "https://www.edwinacademy.com",
          "logo": "https://www.edwinacademy.com/logo.png",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Calicut",
            "addressRegion": "Kerala",
            "addressCountry": "IN"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-9838848800",
            "contactType": "customer service",
            "email": "info@edwinacademy.com"
          },
          "sameAs": [
            "https://facebook.com/edwinacademy",
            "https://linkedin.com/company/edwinacademy",
            "https://instagram.com/edwinacademy",
            "https://twitter.com/edwinacademy"
          ]
        })}
      </script>
    </footer>
  );
}