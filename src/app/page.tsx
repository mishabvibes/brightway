'use client';

import { useEffect } from 'react';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import useCursorEffect from './cursor-effect';
import { registerServiceWorker, trackPWAInstallation } from './pwa';

export default function Home() {
  // Initialize cursor effects
  useCursorEffect();

  // Initialize PWA features
  useEffect(() => {
    if (typeof registerServiceWorker === 'function') {
      registerServiceWorker();
    }
    
    if (typeof trackPWAInstallation === 'function') {
      trackPWAInstallation();
    }
  }, []);
  
  // Register section observer for animations
  useEffect(() => {
    // Function to handle intersection observations
    const observeSections = () => {
      const sections = document.querySelectorAll('.section-animate');
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in');
              // Unobserve after animation to improve performance
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      sections.forEach((section) => {
        observer.observe(section);
      });
      
      return () => {
        sections.forEach((section) => {
          observer.unobserve(section);
        });
      };
    };
    
    observeSections();
  }, []);

  return (
    <main className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 overflow-hidden">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}