'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Check, Send, 
  ArrowRight, Clock, Shield, ChevronRight 
} from 'lucide-react';

export default function EnhancedContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const buttonRef = useRef(null);

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

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-24 bg-neutral-50 overflow-hidden relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -left-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div 
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
          }`}
        >
          <div className="inline-block mb-4">
            <span className="bg-blue-100 text-blue-600 text-sm font-medium px-4 py-2 rounded-full">
              Contact Us
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
              Let's Build Your Future-Ready Solution
            </span>
          </h2>
          
          <p className="text-lg text-neutral-600">
            Ready to transform your electrical and plumbing systems? Contact us for a personalized consultation tailored to your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div 
            className={`lg:col-span-2 transition-all duration-700 ${
              isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-10'
            }`}
          >
            <div className="
              bg-white
              rounded-xl
              p-8 
              shadow-lg
              hover:shadow-xl
              border border-neutral-200
              transition-all
              duration-300
            ">
              {isSubmitted ? (
                <div className="
                  flex 
                  flex-col 
                  items-center 
                  justify-center 
                  text-center 
                  py-16
                  animate-fade-in
                ">
                  <div className="
                    bg-blue-50
                    p-4 
                    rounded-full 
                    mb-6
                  ">
                    <Check 
                      className="text-blue-600" 
                      size={48} 
                    />
                  </div>
                  <h3 className="
                    text-2xl 
                    font-bold 
                    mb-4
                  ">
                    Thank You!
                  </h3>
                  <p className="
                    text-neutral-600
                    max-w-md
                  ">
                    Your message has been sent successfully. Our team will review your request and get back to you shortly.
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label 
                        htmlFor="name" 
                        className="
                          block 
                          text-neutral-700
                          font-medium
                        "
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="
                          w-full 
                          px-4 py-3 
                          bg-neutral-50
                          border border-neutral-200
                          rounded-lg 
                          text-neutral-900
                          focus:outline-none 
                          focus:ring-2 
                          focus:ring-blue-500/40
                          focus:border-transparent
                          transition-colors
                        "
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label 
                        htmlFor="email" 
                        className="
                          block 
                          text-neutral-700
                          font-medium
                        "
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="
                          w-full 
                          px-4 py-3 
                          bg-neutral-50
                          border border-neutral-200
                          rounded-lg 
                          text-neutral-900
                          focus:outline-none 
                          focus:ring-2 
                          focus:ring-blue-500/40
                          focus:border-transparent
                          transition-colors
                        "
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label 
                        htmlFor="phone" 
                        className="
                          block 
                          text-neutral-700
                          font-medium
                        "
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="
                          w-full 
                          px-4 py-3 
                          bg-neutral-50
                          border border-neutral-200
                          rounded-lg 
                          text-neutral-900
                          focus:outline-none 
                          focus:ring-2 
                          focus:ring-blue-500/40
                          focus:border-transparent
                          transition-colors
                        "
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label 
                        htmlFor="service" 
                        className="
                          block 
                          text-neutral-700
                          font-medium
                        "
                      >
                        Service Needed
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="
                          w-full 
                          px-4 py-3 
                          bg-neutral-50
                          border border-neutral-200
                          rounded-lg 
                          text-neutral-900
                          focus:outline-none 
                          focus:ring-2 
                          focus:ring-blue-500/40
                          focus:border-transparent
                          transition-colors
                        "
                      >
                        <option value="" disabled>Select a service</option>
                        <option value="electrical">Smart Electrical Services</option>
                        <option value="plumbing">Advanced Plumbing Systems</option>
                        <option value="emergency">Emergency Services</option>
                        <option value="maintenance">Predictive Maintenance</option>
                        <option value="inspection">Safety Protocols</option>
                        <option value="smarthome">IoT & Smart Home</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label 
                      htmlFor="message" 
                      className="
                        block 
                        text-neutral-700
                        font-medium
                      "
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="
                        w-full 
                        px-4 py-3 
                        bg-neutral-50
                        border border-neutral-200
                        rounded-lg 
                        text-neutral-900
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-blue-500/40
                        focus:border-transparent
                        transition-colors
                      "
                      placeholder="Tell us about your project or issue..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      group
                      w-full 
                      py-4 
                      bg-gradient-to-r from-blue-600 to-indigo-600
                      text-white 
                      font-medium 
                      rounded-lg 
                      shadow-lg
                      hover:shadow-xl
                      transition-all 
                      flex 
                      items-center 
                      justify-center 
                      hover:bg-gradient-to-br
                    "
                  >
                    {isSubmitting ? 'Sending...' : 'Get Your Free Quote'}
                    <ChevronRight 
                      className="
                        ml-2 
                        group-hover:translate-x-1 
                        transition-transform
                      " 
                      size={20} 
                    />
                  </button>
                </form>
              )}
            </div>
          </div>
          
          {/* Contact Information */}
          <div 
            className={`lg:col-span-1 space-y-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-10'
            }`}
          >
            <div className="
              bg-white 
              rounded-xl
              p-8 
              shadow-lg
              hover:shadow-xl
              border border-neutral-200
              transition-all
              duration-300
              space-y-6
            ">
              <h3 className="
                text-xl 
                font-semibold 
                mb-6
                border-b border-neutral-200 
                pb-4
              ">
                Contact Details
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group hover:bg-blue-50 p-3 -mx-3 rounded-lg transition-colors">
                  <div className="
                    w-12 h-12
                    bg-blue-50
                    rounded-lg
                    flex items-center 
                    justify-center
                    text-blue-600
                  ">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-neutral-600 text-sm mb-1">Phone</p>
                    <a 
                      href="tel:+919188126866" 
                      className="
                        text-neutral-900
                        font-medium
                        group-hover:text-blue-600
                        transition-colors
                      "
                    >
                      +91 91881 26866
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group hover:bg-blue-50 p-3 -mx-3 rounded-lg transition-colors">
                  <div className="
                    w-12 h-12
                    bg-blue-50
                    rounded-lg
                    flex items-center 
                    justify-center
                    text-blue-600
                  ">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-neutral-600 text-sm mb-1">Email</p>
                    <a 
                      href="mailto:brightwaytechnicalsolution@gmail.com" 
                      className="
                        text-neutral-900
                        font-medium
                        group-hover:text-blue-600
                        transition-colors
                      "
                    >
                      brightwaytechnicalsolution@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group hover:bg-blue-50 p-3 -mx-3 rounded-lg transition-colors">
                  <div className="
                    w-12 h-12
                    bg-blue-50
                    rounded-lg
                    flex items-center 
                    justify-center
                    text-blue-600
                  ">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-neutral-600 text-sm mb-1">Address</p>
                    <p className="
                      text-neutral-900
                      font-medium
                      group-hover:text-blue-600
                      transition-colors
                    ">
                      Changaleeri, Mannarkkad<br />
                      Kerala 678762
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group hover:bg-blue-50 p-3 -mx-3 rounded-lg transition-colors">
                  <div className="
                    w-12 h-12
                    bg-blue-50
                    rounded-lg
                    flex items-center 
                    justify-center
                    text-blue-600
                  ">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-neutral-600 text-sm mb-1">Working Hours</p>
                    <p className="
                      text-neutral-900
                      font-medium
                      group-hover:text-blue-600
                      transition-colors
                    ">
                      Monday-Friday: 9AM-6PM<br />
                      Saturday: 9AM-4PM<br />
                      <span className="text-blue-600 font-semibold">24/7 Emergency Service</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Trust Badge */}
            <div className="
              bg-white
              rounded-xl
              p-6
              shadow-lg
              hover:shadow-xl
              border border-neutral-200
              flex items-center
              space-x-4
              transition-all
              duration-300
            ">
              <div className="
                w-14 h-14
                bg-blue-50
                rounded-lg
                flex items-center 
                justify-center
                text-blue-600
              ">
                <Shield size={28} />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900">Licensed & Insured</h4>
                <p className="text-sm text-neutral-600">All our technicians are certified professionals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}