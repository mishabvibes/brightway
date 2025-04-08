'use client';

import { useEffect, useState } from 'react';
import { ChevronRight, Zap, Droplet, Calendar, Shield, Phone, ArrowRight } from 'lucide-react';

export default function EnhancedHomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeService, setActiveService] = useState(0);
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Featured services data
  const services = [
    {
      icon: <Zap size={28} className="text-primary" />,
      title: "Smart Electrical",
      description: "Intelligent systems with IoT integration and energy optimization",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Droplet size={28} className="text-primary" />,
      title: "Modern Plumbing",
      description: "Advanced water systems with leak detection and conservation",
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: <Calendar size={28} className="text-primary" />,
      title: "Scheduled Maintenance",
      description: "Proactive care that prevents costly repairs and extends system life",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Shield size={28} className="text-primary" />,
      title: "24/7 Emergency",
      description: "Round-the-clock support for your urgent electrical and plumbing needs",
      color: "from-orange-500 to-amber-600"
    }
  ];

  return (
    <div className="relative bg-white dark:bg-neutral-950 overflow-hidden">
      {/* Hero Section with Parallax Effect */}
      <section className="relative min-h-screen flex items-center">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-48 -right-48 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl"
               style={{ transform: `translateY(${scrollY * 0.1}px)` }}></div>
          <div className="absolute top-24 -left-24 w-64 h-64 bg-purple-500 rounded-full opacity-10 blur-3xl"
               style={{ transform: `translateY(${scrollY * 0.05}px)` }}></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-orange-500 rounded-full opacity-10 blur-3xl"
               style={{ transform: `translateY(${scrollY * -0.08}px)` }}></div>
          
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5"></div>
        </div>
        
        {/* Hero content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full text-blue-600 dark:text-blue-400">
                <span className="flex items-center mr-2"><Zap size={16} /></span>
                Next-Gen Home Solutions
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block">Smarter</span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-400 text-transparent bg-clip-text">Electrical & Plumbing</span>
              </h1>
              
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto lg:mx-0">
                Transform your home with cutting-edge technology and unrivaled craftsmanship from Portland's premier service provider.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#contact" className="group relative inline-flex items-center justify-center px-8 py-4 rounded-lg overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="relative flex items-center">Get Free Quote <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" /></span>
                </a>
                
                <a href="#services" className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 hover:bg-white dark:hover:bg-neutral-900 text-neutral-800 dark:text-neutral-200 font-medium transition-colors">
                  Our Services <ArrowRight className="ml-2 transition-transform" />
                </a>
              </div>
            </div>
            
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                {/* Main image container */}
                <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 overflow-hidden shadow-xl">
                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-[url('/hero.png')] bg-center bg-cover mix-blend-overlay dark:mix-blend-lighten opacity-80"></div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-70 blur-xl"></div>
                  <div className="absolute top-10 -left-6 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-60 blur-xl"></div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white dark:bg-neutral-900 rounded-xl shadow-xl p-5 animate-float">
                  <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-white">
                    <Shield size={30} />
                  </div>
                </div>
                
                <div className="absolute -bottom-8 left-0 w-36 bg-white dark:bg-neutral-900 rounded-xl shadow-xl p-3 animate-float-slow">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center text-white">
                      <Phone size={20} />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">24/7 Support</p>
                      <p className="text-xs text-neutral-500">Always Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-neutral-300 dark:border-neutral-700 rounded-full flex justify-center">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>
      
      {/* Featured Services */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Premium Services</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              We combine traditional expertise with cutting-edge technology to bring you the most innovative home solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden"
                onMouseEnter={() => setActiveService(index)}
              >
                {/* Background gradients */}
                <div className={`absolute right-0 bottom-0 w-24 h-24 bg-gradient-to-br ${service.color} rounded-full opacity-10 group-hover:opacity-20 -m-6 transition-opacity`}></div>
                
                {/* Service content */}
                <div className="relative">
                  <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    {service.description}
                  </p>
                  
                  <a href="#services" className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium">
                    Learn more <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Trust indicators */}
      <section className="py-14 bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Shield className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <div>
                <p className="font-semibold">Licensed & Insured</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Full protection</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Calendar className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <div>
                <p className="font-semibold">15+ Years Experience</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Trusted expertise</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Zap className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <div>
                <p className="font-semibold">Smart Technology</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Future-ready solutions</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Phone className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <div>
                <p className="font-semibold">24/7 Emergency Service</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Always available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(150,150,150,.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(150,150,150,.1) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </div>
  );
}