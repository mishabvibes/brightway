'use client';

import { useEffect, useState } from 'react';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Send, 
  ChevronRight, 
  ArrowUp 
} from 'lucide-react';

export default function EnhancedFooter() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const currentYear = new Date().getFullYear();
  
  // Listen for scroll to show/hide the scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 700);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Subscribe form handler
  const handleSubscribe = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    // Simulate subscription
    setTimeout(() => {
      setIsSubscribing(false);
      setIsSubscribed(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }, 1500);
  };
  
  // Navigation sections
  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { label: 'Home', href: '#home' },
        { label: 'Services', href: '#services' },
        { label: 'About Us', href: '#about' },
        { label: 'Contact', href: '#contact' },
        { label: 'Blog', href: '#' }
      ]
    },
    {
      title: 'Services',
      links: [
        { label: 'Smart Electrical', href: '#services' },
        { label: 'Precision Plumbing', href: '#services' },
        { label: 'Emergency Response', href: '#services' },
        { label: 'Preventive Maintenance', href: '#services' },
        { label: 'Smart Home Integration', href: '#services' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'FAQ', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Customer Reviews', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' }
      ]
    }
  ];
  
  // Social media links
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-white dark:bg-neutral-950 pt-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full opacity-40 dark:opacity-10">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute -top-1/4 -right-1/4 w-full h-full text-blue-100 dark:text-blue-900">
            <path fill="currentColor" d="M39.7,-66.2C51.9,-60.2,62.8,-50.5,71.1,-38.6C79.4,-26.7,85.2,-12.3,84.4,1.4C83.6,15.2,76.2,28.7,67,40.1C57.8,51.5,46.8,60.9,33.7,66.4C20.7,71.8,5.7,73.3,-8.6,71.7C-22.9,70.1,-36.5,65.5,-47.8,57.2C-59.1,48.9,-68.1,37,-69.9,24.1C-71.8,11.2,-66.5,-2.7,-63.1,-17.4C-59.6,-32.1,-58,-47.6,-49.5,-56.1C-41,-64.5,-25.5,-65.9,-11.3,-67.6C2.9,-69.3,27.5,-72.2,39.7,-66.2Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>
      
      {/* Main footer content */}
      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative w-10 h-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold">BW</div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-50"></div>
              </div>
              <span className="text-xl font-bold">BrightWay</span>
            </div>
            
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-xs">
              Innovative electrical and plumbing solutions powered by cutting-edge technology and expert craftsmanship since 2005.
            </p>
            
            {/* Social Links */}
            <div className="space-x-3 flex">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg flex items-center justify-center transition-colors"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Navigation */}
          {footerSections.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a 
                      href={link.href} 
                      className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center group"
                    >
                      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                      <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
              Stay updated with our latest services and innovations.
            </p>
            
            {isSubscribed ? (
              <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-lg text-sm">
                Thanks for subscribing! We'll be in touch soon.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-3 px-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-1.5 rounded-md hover:bg-blue-700 transition-colors"
                >
                  {isSubscribing ? (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-neutral-500 dark:text-neutral-500 text-sm">
            &copy; {currentYear} BrightWay Electrical & Plumbing Solutions. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6">
            <a href="#" className="text-neutral-500 dark:text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-neutral-500 dark:text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-neutral-500 dark:text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`
          fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg 
          flex items-center justify-center hover:bg-blue-700 transition-all z-50
          ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
        `}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}