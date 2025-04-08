'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Wrench, Info, Phone, Menu, X, ChevronRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Footer from './Footer';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Dynamically import the InstallPrompt to avoid SSR issues
const InstallPrompt = dynamic(() => import('./InstallPrompt'), {
  ssr: false
});

export default function Layout({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mounted, setMounted] = useState(false);

  // Ensure client-side rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll and section tracking
  useEffect(() => {
    const handleScroll = () => {
      // Track scroll position for navbar
      setScrolled(window.scrollY > 50);

      // Update active section
      const sections = ['home', 'services', 'about', 'contact'];
      const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPos + 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent render until mounted
  if (!mounted) return null;

  // Navigation items
  const navItems = [
    { 
      name: 'Home', 
      href: '/', 
      icon: <Home className="bottom-nav-icon" size={20} />,
      section: 'home'
    },
    { 
      name: 'Services', 
      href: '/#services', 
      icon: <Wrench className="bottom-nav-icon" size={20} />,
      section: 'services'
    },
    { 
      name: 'About', 
      href: '/#about', 
      icon: <Info className="bottom-nav-icon" size={20} />,
      section: 'about'
    },
    { 
      name: 'Contact', 
      href: '/#contact', 
      icon: <Phone className="bottom-nav-icon" size={20} />,
      section: 'contact'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      {/* Desktop Navigation */}
      <header 
        className={`
          fixed 
          top-0 
          left-0 
          right-0 
          z-50 
          transition-all 
          duration-300 
          ${scrolled 
            ? 'bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md shadow-md' 
            : 'bg-transparent'
          }
          md:block
          ${isMenuOpen ? 'hidden' : ''}
        `}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="/" 
            className="
              text-xl
              font-bold 
              text-neutral-900 
              dark:text-neutral-100 
              hover:text-primary
              dark:hover:text-primary
              transition-colors
              flex items-center
            "
          >
            <div className="
              w-8 h-8 
              mr-2
              rounded-full 
              bg-gradient-to-br 
              from-primary to-secondary
              flex items-center 
              justify-center
              text-white
              shadow-md
            ">
              BW
            </div>
            BrightWay
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  text-sm 
                  uppercase 
                  tracking-wider 
                  transition-colors 
                  relative
                  py-2
                  ${activeSection === item.section
                    ? 'text-primary dark:text-primary font-medium'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-primary dark:hover:text-primary'
                  }
                  ${activeSection === item.section ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-secondary' : ''}
                `}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Theme Toggle and CTA */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              <Link 
                href="/#contact" 
                className="
                  px-5
                  py-2 
                  text-sm 
                  font-medium
                  tracking-wider 
                  bg-gradient-to-r
                  from-primary
                  to-secondary
                  text-white 
                  rounded-lg
                  hover:shadow-lg
                  hover:shadow-primary/20
                  transition-all
                  flex 
                  items-center 
                  space-x-2
                  group
                "
              >
                <span>Get Quote</span>
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="
                text-neutral-900 
                dark:text-neutral-100 
                hover:text-primary
                dark:hover:text-primary
                transition-colors
                p-2
                rounded-lg
                hover:bg-neutral-100
                dark:hover:bg-neutral-800
              "
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="
            fixed 
            inset-0 
            bg-white 
            dark:bg-neutral-950 
            z-40 
            pt-20 
            px-4 
            overflow-y-auto 
            md:hidden
          "
        >
          <nav className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`
                  text-xl 
                  font-medium
                  transition-colors 
                  ${activeSection === item.section
                    ? 'text-primary dark:text-primary'
                    : 'text-neutral-900 dark:text-neutral-100 hover:text-primary dark:hover:text-primary'
                  }
                  flex
                  items-center
                  py-2
                `}
              >
                <span className="
                  w-10 h-10
                  rounded-full
                  bg-neutral-100
                  dark:bg-neutral-800
                  flex items-center justify-center
                  mr-4
                  ${activeSection === item.section ? 'text-primary' : 'text-neutral-500'}
                ">
                  {item.icon}
                </span>
                {item.name}
              </Link>
            ))}
            
            <Link 
              href="/#contact" 
              onClick={() => setIsMenuOpen(false)}
              className="
                mt-6
                text-center
                px-6 
                py-3 
                text-base
                font-medium
                bg-gradient-to-r
                from-primary
                to-secondary
                text-white 
                rounded-lg
                shadow-lg
                transition-all
                flex
                items-center
                justify-center
                space-x-2
              "
            >
              <span>Get Free Quote</span>
              <ChevronRight size={20} />
            </Link>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-16 pb-16 md:pb-0">
        {children}
      </main>

      {/* Install App Prompt */}
      <InstallPrompt />

      {/* Bottom Navigation Bar (Mobile Only) */}
      <div className="bottom-nav md:hidden">
        <div className="grid grid-cols-4 bg-white/95 dark:bg-neutral-900/95 border-t border-neutral-200 dark:border-neutral-800">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`
                bottom-nav-item
                ${activeSection === item.section ? 'active' : ''}
              `}
            >
              {item.icon}
              <span className="text-xs">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}