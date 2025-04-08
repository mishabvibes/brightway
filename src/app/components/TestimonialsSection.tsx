'use client';

import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function EnhancedTestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      content: "BrightWay's team responded quickly when we had an electrical issue at home. The technician was friendly and knew exactly what to do. They also suggested smart home upgrades that made our daily life much easier.",
      author: "Afsal",
      position: "Info Tech",
      location: "CEO & Founder",
      rating: 5,
      image: "/users/image2.webp",
      color: "bg-gradient-to-br from-blue-500/10 to-indigo-500/10"
    },
    {
      id: 2,
      content: "We hired BrightWay to upgrade our office's electrical setup. Their work was smooth and didn’t interrupt our team at all. The smart monitoring system they installed helps us avoid any problems before they start.",
      author: "Swalih Zayn",
      position: "Real Estate",
      location: "Palakkad, Kerala",
      rating: 5,
      image: "/users/image3.webp",
      color: "bg-gradient-to-br from-emerald-500/10 to-green-500/10"
    },
    {
      id: 3,
      content: "BrightWay installed a water monitoring system for our resort. It helped us cut down water bills and avoid major repairs. Their service has been a big plus for our operations.",
      author: "Rinshad",
      position: "Hill Top Resort",
      location: "Manager",
      rating: 5,
      image: "/users/image1.webp",
      color: "bg-gradient-to-br from-purple-500/10 to-pink-500/10"
    }
  ];
  

  // Navigation controls
  const goToNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const goToPrev = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  // Auto-advance testimonials
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!document.hidden && !isAnimating) {
        goToNext();
      }
    }, 8000);

    return () => clearInterval(intervalId);
  }, [isAnimating]);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white dark:bg-neutral-950 overflow-hidden relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/3 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
            }`}
        >
          <div className="inline-block mb-4">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium px-4 py-2 rounded-full">
              Testimonials
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
              What Our Clients Say
            </span>
          </h2>

          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Discover how our innovative solutions have transformed homes and businesses across the region.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="max-w-5xl mx-auto">
          {/* Main Testimonial Card */}
          <div
            className={`
              relative overflow-hidden rounded-2xl shadow-xl
              transition-all duration-500
              ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
              ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}
            `}
          >
            <div className={`
              relative z-10 grid grid-cols-1 lg:grid-cols-7 overflow-hidden
              ${testimonials[currentIndex].color} dark:bg-neutral-900
            `}>
              {/* Client Image - 3 columns */}
              <div className="lg:col-span-3 p-8 lg:p-0 flex items-center justify-center">
                <div className="relative h-full w-full flex items-center justify-center p-8">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-black/20 dark:to-black/5"></div>

                  {/* Client image */}
                  <div className="relative z-10">
                    <div className="w-32 h-32 lg:w-48 lg:h-48 rounded-full border-4 border-white dark:border-neutral-800 shadow-xl overflow-hidden">
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].author}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Background decor */}
                    <div className="absolute -top-6 -right-6 w-16 h-16 bg-white dark:bg-neutral-800 rounded-full opacity-20 blur-lg"></div>
                    <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-500 dark:bg-blue-700 rounded-full opacity-20 blur-lg"></div>
                  </div>
                </div>
              </div>

              {/* Testimonial content - 4 columns */}
              <div className="lg:col-span-4 bg-white dark:bg-neutral-800 p-8 md:p-12 flex flex-col justify-center">
                {/* Quote icon */}
                <Quote
                  className="text-neutral-300 dark:text-neutral-700 mb-6"
                  size={48}
                />

                {/* Testimonial text */}
                <blockquote className="text-xl text-neutral-800 dark:text-neutral-200 mb-8 leading-relaxed">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                {/* Client info */}
                <div className="mt-auto">
                  <h3 className="text-xl font-semibold">
                    {testimonials[currentIndex].author}
                  </h3>

                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    {testimonials[currentIndex].position} | {testimonials[currentIndex].location}
                  </p>

                  {/* Rating stars */}
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={`
                          ${i < testimonials[currentIndex].rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-neutral-300 dark:text-neutral-700'
                          }
                        `}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8">
            {/* Pagination Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) setCurrentIndex(index);
                  }}
                  className={`
                    transition-all duration-300 rounded-full
                    ${currentIndex === index
                      ? 'w-8 h-2 bg-blue-600 dark:bg-blue-500'
                      : 'w-2 h-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-blue-400 dark:hover:bg-blue-700'
                    }
                  `}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrow Navigation */}
            <div className="flex space-x-4">
              <button
                onClick={goToPrev}
                disabled={isAnimating}
                className="
                  p-3 rounded-full 
                  bg-white dark:bg-neutral-800 
                  hover:bg-blue-50 dark:hover:bg-neutral-700
                  text-neutral-700 dark:text-neutral-300
                  hover:text-blue-600 dark:hover:text-blue-400
                  shadow-md hover:shadow-lg
                  transition-all
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                "
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={goToNext}
                disabled={isAnimating}
                className="
                  p-3 rounded-full 
                  bg-white dark:bg-neutral-800 
                  hover:bg-blue-50 dark:hover:bg-neutral-700
                  text-neutral-700 dark:text-neutral-300
                  hover:text-blue-600 dark:hover:text-blue-400
                  shadow-md hover:shadow-lg
                  transition-all
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                "
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}