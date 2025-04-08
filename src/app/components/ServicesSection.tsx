'use client';

import { useState, useEffect } from 'react';
import { Zap, Droplet, Clock, Wrench, Shield, Cpu, ChevronRight, Check, ArrowRight } from 'lucide-react';

export default function EnhancedServicesSection() {
  const [activeCard, setActiveCard] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    const section = document.getElementById('services-section');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);
  
  // Auto-rotate featured service
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % services.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Services data
  const services = [
    {
      icon: <Zap size={24} className="text-blue-600 dark:text-blue-400" />,
      title: 'Smart Electrical Solutions',
      description: 'Intelligent electrical systems with IoT integration and energy efficiency features.',
      features: [
        'Smart home automation integration',
        'Energy usage monitoring and optimization',
        'Advanced circuit protection systems',
        'Renewable energy compatibility'
      ],
      bgGradient: 'from-blue-500/20 to-indigo-500/20',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      accentColor: 'bg-blue-600 dark:bg-blue-500'
    },
    {
      icon: <Droplet size={24} className="text-cyan-600 dark:text-cyan-400" />,
      title: 'Precision Plumbing Systems',
      description: 'Advanced plumbing technologies with leak detection and water conservation features.',
      features: [
        'Smart leak detection and prevention',
        'Water quality monitoring systems',
        'Eco-friendly fixture installation',
        'High-efficiency water heating'
      ],
      bgGradient: 'from-cyan-500/20 to-blue-500/20',
      iconBg: 'bg-cyan-100 dark:bg-cyan-900/30',
      accentColor: 'bg-cyan-600 dark:bg-cyan-500'
    },
    {
      icon: <Clock size={24} className="text-orange-600 dark:text-orange-400" />,
      title: '24/7 Emergency Services',
      description: 'Round-the-clock support for urgent electrical and plumbing needs with rapid response.',
      features: [
        'Available 24/7, 365 days a year',
        'Average response time under 60 minutes',
        'Fully-equipped service vehicles',
        'Transparent pricing with no overtime fees'
      ],
      bgGradient: 'from-orange-500/20 to-red-500/20',
      iconBg: 'bg-orange-100 dark:bg-orange-900/30',
      accentColor: 'bg-orange-600 dark:bg-orange-500'
    },
    {
      icon: <Wrench size={24} className="text-emerald-600 dark:text-emerald-400" />,
      title: 'Preventive Maintenance',
      description: 'Proactive maintenance plans to prevent costly issues and extend system life.',
      features: [
        'Scheduled inspection and maintenance',
        'Detailed digital reports and recommendations',
        'Priority scheduling for service calls',
        'Extended warranty on maintained systems'
      ],
      bgGradient: 'from-emerald-500/20 to-green-500/20',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
      accentColor: 'bg-emerald-600 dark:bg-emerald-500'
    },
    {
      icon: <Shield size={24} className="text-purple-600 dark:text-purple-400" />,
      title: 'Safety Audits & Inspections',
      description: 'Comprehensive safety assessments to ensure your home systems meet all standards.',
      features: [
        'Complete electrical safety inspections',
        'Plumbing system pressure testing',
        'Code compliance verification',
        'Detailed safety improvement plans'
      ],
      bgGradient: 'from-purple-500/20 to-indigo-500/20',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      accentColor: 'bg-purple-600 dark:bg-purple-500'
    },
    {
      icon: <Cpu size={24} className="text-rose-600 dark:text-rose-400" />,
      title: 'Smart Home Integration',
      description: 'Seamlessly integrate your electrical and plumbing systems into your smart home.',
      features: [
        'Voice-controlled system management',
        'Mobile app for remote monitoring',
        'Integration with existing smart devices',
        'Custom automation scenarios'
      ],
      bgGradient: 'from-rose-500/20 to-pink-500/20',
      iconBg: 'bg-rose-100 dark:bg-rose-900/30',
      accentColor: 'bg-rose-600 dark:bg-rose-500'
    }
  ];

  return (
    <section 
      id="services-section"
      className="py-24 bg-neutral-50 dark:bg-neutral-900 overflow-hidden relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -left-20 w-60 h-60 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div 
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block mb-4">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium px-4 py-2 rounded-full">
              Our Expertise
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
              Innovative Services for Modern Homes
            </span>
          </h2>
          
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            We combine industry-leading expertise with cutting-edge technology to deliver solutions that transform how your home systems function.
          </p>
        </div>
        
        {/* Featured Service */}
        <div 
          className={`mb-20 transition-all duration-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className={`
            relative rounded-2xl overflow-hidden shadow-xl 
            bg-gradient-to-br ${services[activeCard].bgGradient}
            dark:bg-gradient-to-br dark:from-neutral-800 dark:to-neutral-900
          `}>
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
              <svg className="absolute right-0 top-0 h-full w-1/2 transform translate-x-1/3 text-white text-opacity-5" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <polygon points="50,0 100,0 50,100 0,100" />
              </svg>
            </div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12">
              <div className="flex flex-col justify-center">
                <div className={`
                  w-16 h-16 rounded-xl ${services[activeCard].iconBg} 
                  flex items-center justify-center mb-6
                `}>
                  {services[activeCard].icon}
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {services[activeCard].title}
                </h3>
                
                <p className="text-neutral-700 dark:text-neutral-300 mb-6">
                  {services[activeCard].description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {services[activeCard].features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className={`
                        p-1 rounded-full ${services[activeCard].accentColor} text-white mr-3 mt-1 flex-shrink-0
                      `}>
                        <Check size={12} />
                      </div>
                      <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div>
                  <a 
                    href="#contact" 
                    className={`
                      inline-flex items-center text-sm font-medium px-5 py-3 rounded-lg
                      bg-white dark:bg-neutral-800 shadow-md hover:shadow-lg transition-all
                      group
                    `}
                  >
                    Schedule a Consultation
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
              
              <div className="hidden lg:flex items-center justify-center">
                <div className="w-full max-w-md h-80 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-xl shadow-inner overflow-hidden relative">
                  {/* Graphic elements representing the service */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full border-2 border-current animate-pulse"></div>
                    <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 rounded-full border border-current animate-ping"></div>
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
                      <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.3" fill="none" />
                      <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="0.2" fill="none" />
                      <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="0.2" />
                      <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="0.2" />
                    </svg>
                  </div>
                  
                  {/* Central icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white/80 dark:bg-black/30 backdrop-blur flex items-center justify-center">
                      <div className="transform scale-150">
                        {services[activeCard].icon}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Service Selector Tabs */}
          <div className="flex justify-center mt-6 space-x-2">
            {services.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveCard(idx)}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${activeCard === idx 
                    ? 'bg-blue-600 dark:bg-blue-500 w-8'
                    : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-blue-400 dark:hover:bg-blue-700'
                  }
                `}
                aria-label={`View service ${idx + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* All Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx}
              className={`
                group bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg hover:shadow-xl
                border border-neutral-200 dark:border-neutral-700
                hover:border-neutral-300 dark:hover:border-neutral-600
                transition-all duration-300 hover:-translate-y-1
                ${idx % 3 === 0 ? 'lg:transform lg:translate-y-8' : ''}
                ${idx % 3 === 1 ? '' : ''}
                ${idx % 3 === 2 ? 'lg:transform lg:translate-y-16' : ''}
                opacity-0 translate-y-10
              `}
              style={{
                animationName: isVisible ? 'fadeInUp' : 'none',
                animationDuration: '0.6s',
                animationDelay: `${0.1 + idx * 0.1}s`,
                animationFillMode: 'forwards'
              }}
            >
              <div className={`
                w-14 h-14 rounded-lg ${service.iconBg}
                flex items-center justify-center mb-6
                transition-transform duration-300 group-hover:scale-110
              `}>
                {service.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                {service.description}
              </p>
              
              <a 
                href="#contact" 
                className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:translate-x-1 transition-transform"
              >
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}