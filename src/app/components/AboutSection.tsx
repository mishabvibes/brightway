'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle, Award, Users, Clock, Zap, ChevronRight } from 'lucide-react';

export default function EnhancedAboutSection() {
  const sectionRef = useRef(null);
  const progressRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(false);
  
  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Animation for progress bars
  useEffect(() => {
    const progressObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimateProgress(true);
        }
      },
      { threshold: 0.5 }
    );
    
    if (progressRef.current) {
      progressObserver.observe(progressRef.current);
    }
    
    return () => {
      if (progressRef.current) {
        progressObserver.unobserve(progressRef.current);
      }
    };
  }, []);
  
  const features = [
    {
      icon: <Clock size={20} className="text-blue-600" />,
      title: "15+ Years Experience",
      text: "Delivering innovative solutions since 2005",
      color: "bg-blue-100"
    },
    {
      icon: <Award size={20} className="text-purple-600" />,
      title: "Certified Experts",
      text: "Licensed professionals with advanced training",
      color: "bg-purple-100"
    },
    {
      icon: <CheckCircle size={20} className="text-emerald-600" />,
      title: "100% Satisfaction",
      text: "Committed to exceeding your expectations",
      color: "bg-emerald-100"
    },
    {
      icon: <Zap size={20} className="text-amber-600" />,
      title: "Modern Approach",
      text: "Cutting-edge technology and methodologies",
      color: "bg-amber-100"
    }
  ];
  
  const expertise = [
    { label: "Electrical Systems", percentage: 98 },
    { label: "Plumbing Solutions", percentage: 95 },
    { label: "Smart Home Integration", percentage: 92 },
    { label: "Emergency Response", percentage: 97 }
  ];

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-24 bg-white overflow-hidden relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            {/* Section label */}
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-6">
              Our Story
            </div>
            
            <h2 className="text-4xl font-bold mb-6">
              Pioneering <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Next-Generation</span> Home Solutions
            </h2>
            
            <p className="text-neutral-600 text-lg mb-8 leading-relaxed">
              Since 2017, BrightWay has transformed how homeowners experience electrical and plumbing services. By combining deep technical expertise with innovative technology, we've become the region's leader in smart home integration and efficiency solutions.
            </p>
            
            {/* Expertise Progress Bars */}
            <div ref={progressRef} className="space-y-5 mb-10">
              {expertise.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-neutral-800 font-medium">{skill.label}</span>
                    <span className="text-blue-600 font-medium">{skill.percentage}%</span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-1500 ease-out" 
                      style={{ 
                        width: animateProgress ? `${skill.percentage}%` : '0%',
                        transitionDelay: `${index * 200}ms`
                      }} 
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Learn More Button */}
            <a 
              href="#contact" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Learn More About Us
              <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
          
          {/* Right Column - Features & Image */}
          <div className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl border border-neutral-200 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div className={`w-10 h-10 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-neutral-600">{feature.text}</p>
                </div>
              ))}
            </div>
            
            {/* Image Element */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video">
              {/* Background gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 mix-blend-overlay"></div>
              
              {/* Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-90 transition-transform duration-700 hover:scale-105"
                style={{ 
                  backgroundImage: "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
                }}
              ></div>
              
              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/60 to-transparent">
                <div className="p-6 bg-white/90 backdrop-blur-sm rounded-xl max-w-md">
                  <div className="flex items-center mb-4">
                    <Users size={24} className="text-blue-600 mr-3" />
                    <h3 className="text-xl font-semibold">Our Team</h3>
                  </div>
                  <p className="text-neutral-700">
                    Our experts combine decades of experience with continuous training in the latest technologies to provide unmatched service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}