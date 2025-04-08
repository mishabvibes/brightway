'use client';

import { useEffect } from 'react';

export default function useCursorEffect() {
  useEffect(() => {
    // Debug logging
    console.log('Initializing cursor effects');
    
    // Only run on desktop
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      console.log('Screen width < 768px, skipping cursor effects');
      return;
    }
    
    // Add magnetic effect to buttons and links
    const addMagneticEffect = () => {
      const buttons = document.querySelectorAll(
        '.btn-primary, .btn-secondary, a[href*="contact"], button:not(.no-magnetic)'
      );
      
      console.log(`Found ${buttons.length} elements for magnetic effect`);
      
      // Store the handler functions to properly remove them later
      const moveHandlers = new Map();
      const leaveHandlers = new Map();
      
      buttons.forEach((button, index) => {
        const handleMouseMove = (e) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const distanceX = x - centerX;
          const distanceY = y - centerY;
          
          // Softer movement for a more subtle effect
          const pull = 0.2;
          
          // Apply transformation
          button.style.transform = `translate(${distanceX * pull}px, ${distanceY * pull}px)`;
        };
        
        const handleMouseLeave = () => {
          // Reset position with a smooth transition
          button.style.transition = 'transform 0.3s ease';
          button.style.transform = 'translate(0, 0)';
          
          // Remove transition after returning to original position
          setTimeout(() => {
            button.style.transition = '';
          }, 300);
        };
        
        // Store the handlers to remove them properly later
        moveHandlers.set(button, handleMouseMove);
        leaveHandlers.set(button, handleMouseLeave);
        
        // Attach event listeners
        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);
      });
      
      // Return cleanup function with the stored handlers
      return { moveHandlers, leaveHandlers };
    };
    
    // Add subtle hover glow effect
    const addGlowEffect = () => {
      const glowElements = document.querySelectorAll('.gradient-text, .section-title, .glow');
      
      console.log(`Found ${glowElements.length} elements for glow effect`);
      
      // Store the handler functions to properly remove them later
      const enterHandlers = new Map();
      const leaveHandlers = new Map();
      
      glowElements.forEach((element, index) => {
        const handleMouseEnter = () => {
          element.style.textShadow = '0 0 10px rgba(59, 130, 246, 0.5)';
          element.style.transition = 'text-shadow 0.3s ease';
        };
        
        const handleMouseLeave = () => {
          element.style.textShadow = 'none';
        };
        
        // Store the handlers to remove them properly later
        enterHandlers.set(element, handleMouseEnter);
        leaveHandlers.set(element, handleMouseLeave);
        
        // Attach event listeners
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
      });
      
      // Return cleanup function with the stored handlers
      return { enterHandlers, leaveHandlers };
    };
    
    // Initialize effects and store cleanup data
    const magneticEffects = addMagneticEffect();
    const glowEffects = addGlowEffect();
    
    // Clean up event listeners on unmount
    return () => {
      console.log('Cleaning up cursor effects');
      
      // Clean up magnetic effects
      if (magneticEffects) {
        const { moveHandlers, leaveHandlers } = magneticEffects;
        
        moveHandlers.forEach((handler, element) => {
          element.removeEventListener('mousemove', handler);
        });
        
        leaveHandlers.forEach((handler, element) => {
          element.removeEventListener('mouseleave', handler);
        });
      }
      
      // Clean up glow effects
      if (glowEffects) {
        const { enterHandlers, leaveHandlers } = glowEffects;
        
        enterHandlers.forEach((handler, element) => {
          element.removeEventListener('mouseenter', handler);
        });
        
        leaveHandlers.forEach((handler, element) => {
          element.removeEventListener('mouseleave', handler);
        });
      }
    };
  }, []);
  
  // Return nothing as this is just a side-effect hook
  return null;
}