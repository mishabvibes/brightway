'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Check, Send, 
  ArrowRight, Clock, Shield 
} from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
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
  
  // Button hover animation
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      button.style.setProperty('--mouse-x', `${x}px`);
      button.style.setProperty('--mouse-y', `${y}px`);
    };
    
    button.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      id="contact" 
      className="
        py-24 
        bg-white dark:bg-neutral-950
        text-neutral-900 dark:text-neutral-100 
        relative 
        overflow-hidden
        section-animate
      "
    >
      {/* Background gradient */}
      <div className="
        absolute inset-0 
        bg-gradient-subtle
        pointer-events-none
      "></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="
            text-3xl md:text-4xl 
            font-bold 
            mb-4
          ">
            Let's Build Your <span className="gradient-text">Future-Ready Solution</span>
          </h2>
          <p className="
            text-lg 
            text-neutral-600 dark:text-neutral-400
            max-w-2xl 
            mx-auto
          ">
            Ready to transform your electrical and plumbing systems? Contact us for a personalized consultation tailored to your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="
              bg-white dark:bg-neutral-900/30
              rounded-xl
              p-8 
              shadow-lg
              shadow-neutral-200/50 dark:shadow-neutral-900/50
              border border-neutral-200 dark:border-neutral-800
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
                    bg-primary/10 dark:bg-primary/20 backdrop-blur-md
                    p-4 
                    rounded-full 
                    mb-6
                  ">
                    <Check 
                      className="text-primary" 
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
                    text-neutral-600 dark:text-neutral-400
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
                          text-neutral-700 dark:text-neutral-300
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
                          bg-neutral-50 dark:bg-neutral-800/20 backdrop-blur-md
                          border border-neutral-200 dark:border-neutral-700
                          rounded-lg 
                          text-neutral-900 dark:text-neutral-100
                          focus:outline-none 
                          focus:ring-2 
                          focus:ring-primary/40
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
                          text-neutral-700 dark:text-neutral-300 
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
                          bg-neutral-50 dark:bg-neutral-800/20 backdrop-blur-md
                          border border-neutral-200 dark:border-neutral-700
                          rounded-lg 
                          text-neutral-900 dark:text-neutral-100
                          focus:outline-none 
                          focus:ring-2 
                          focus:ring-primary/40
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
                          text-neutral-700 dark:text-neutral-300
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
                          bg-neutral-50 dark:bg-neutral-800/20 backdrop-blur-md
                          border border-neutral-200 dark:border-neutral-700
                          rounded-lg 
                          text-neutral-900 dark:text-neutral-100
                          focus:outline-none 
                          focus:ring-2 
                          focus:ring-primary/40
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
                          text-neutral-700 dark:text-neutral-300
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
                          bg-neutral-50 dark:bg-neutral-800/20 backdrop-blur-md
                          border border-neutral-200 dark:border-neutral-700
                          rounded-lg 
                          text-neutral-900 dark:text-neutral-100
                          focus:outline-none 
                          focus:ring-2 
                          focus:ring-primary/40
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
                        text-neutral-700 dark:text-neutral-300/30
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
                        bg-neutral-50 dark:bg-neutral-800/20 backdrop-blur-md
                        border border-neutral-200 dark:border-neutral-700
                        rounded-lg 
                        text-neutral-900 dark:text-neutral-100
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-primary/40
                        focus:border-transparent
                        transition-colors
                      "
                      placeholder="Tell us about your project or issue..."
                    ></textarea>
                  </div>
                  
                  <button
                    ref={buttonRef}
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      w-full 
                      py-3 
                      bg-gradient-to-r from-primary to-primary/90
                      text-white 
                      font-medium 
                      rounded-lg 
                      shadow-lg shadow-primary/20
                      hover:shadow-xl hover:shadow-primary/30
                      transition-all 
                      flex 
                      items-center 
                      justify-center 
                      group
                      focus:outline-none
                      focus:ring-2
                      focus:ring-primary/40
                    "
                  >
                    {isSubmitting ? 'Sending...' : 'Get Your Free Quote'}
                    <Send 
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
          <div className="lg:col-span-1 space-y-6">
            <div className="
              bg-white dark:bg-neutral-900/20 backdrop-blur-md
              rounded-xl
              p-8 
              shadow-lg
              shadow-neutral-200/50 dark:shadow-neutral-900/50
              border border-neutral-200 dark:border-neutral-800
              stagger-children
            ">
              <h3 className="
                text-xl 
                font-bold 
                mb-6
              ">
                Contact Details
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="
                    bg-neutral-100 dark:bg-neutral-800
                    p-3 
                    rounded-lg
                    text-primary
                  ">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="
                      text-neutral-700 dark:text-neutral-300
                      font-medium
                    ">
                      Phone
                    </p>
                    <a 
                      href="tel:+919188126866" 
                      className="
                        text-neutral-900 dark:text-neutral-100
                        hover:text-primary dark:hover:text-primary
                        transition-colors
                      "
                    >
                      +91 91881 26866
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="
                    bg-neutral-100 dark:bg-neutral-800
                    p-3 
                    rounded-lg
                    text-primary
                  ">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="
                      text-neutral-700 dark:text-neutral-300
                      font-medium
                    ">
                      Email
                    </p>
                    <a 
                      href="mailto:brightwaytechnicalsolution@gmail.com" 
                      className="
                        text-neutral-900 dark:text-neutral-100
                        hover:text-primary dark:hover:text-primary
                        transition-colors
                      "
                    >
                      brightwaytechnicalsolution@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="
                    bg-neutral-100 dark:bg-neutral-800
                    p-3 
                    rounded-lg
                    text-primary
                  ">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="
                      text-neutral-700 dark:text-neutral-300
                      font-medium
                    ">
                      Address
                    </p>
                    <p className="
                      text-neutral-900 dark:text-neutral-100
                    ">
                      Changaleeri, Mannarkkad<br />
                      Kerala 678762
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="
                    bg-neutral-100 dark:bg-neutral-800
                    p-3 
                    rounded-lg
                    text-primary
                  ">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="
                      text-neutral-700 dark:text-neutral-300
                      font-medium
                    ">
                      Working Hours
                    </p>
                    <p className="
                      text-neutral-900 dark:text-neutral-100
                    ">
                      Monday-Friday: 9AM-6PM<br />
                      Saturday: 9AM-4PM<br />
                      <span className="text-primary font-medium">24/7 Emergency Service</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Trust Badge */}
            <div className="
              bg-neutral-100 dark:bg-neutral-800/20 backdrop-blur-md
              rounded-xl
              p-6
              border border-white/80
              flex items-center
              space-x-4
            ">
              <div className="
                text-primary
              ">
                <Shield size={32} />
              </div>
              <div>
                <h4 className="font-medium">Licensed & Insured</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">All our technicians are certified professionals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}