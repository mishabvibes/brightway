'use client';

import { useEffect } from 'react';

export default function useCursorEffect() {
  useEffect(() => {
    // Only run on desktop
    if (window.innerWidth < 768) return;
    
    // Add magnetic effect to buttons and links
    const addMagneticEffect = () => {
      const buttons = document.querySelectorAll(
        '.btn-primary, .btn-secondary, a[href*="contact"], button:not(.no-magnetic)'
      );
      
      buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
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
        });
        
        button.addEventListener('mouseleave', () => {
          // Reset position with a smooth transition
          button.style.transition = 'transform 0.3s ease';
          button.style.transform = 'translate(0, 0)';
          
          // Remove transition after returning to original position
          setTimeout(() => {
            button.style.transition = '';
          }, 300);
        });
      });
    };
    
    // Add subtle hover glow effect
    const addGlowEffect = () => {
      const glowElements = document.querySelectorAll('.gradient-text, .section-title, .glow');
      
      glowElements.forEach(element => {
        // Create a subtle glow on hover
        element.addEventListener('mouseenter', () => {
          element.style.textShadow = '0 0 10px rgba(59, 130, 246, 0.5)';
          element.style.transition = 'text-shadow 0.3s ease';
        });
        
        element.addEventListener('mouseleave', () => {
          element.style.textShadow = 'none';
        });
      });
    };
    
    // Initialize effects
    addMagneticEffect();
    addGlowEffect();
    
    // Clean up event listeners on unmount
    return () => {
      document.querySelectorAll('.btn-primary, .btn-secondary, a[href*="contact"], button:not(.no-magnetic)').forEach(button => {
        button.removeEventListener('mousemove', () => {});
        button.removeEventListener('mouseleave', () => {});
      });
      
      document.querySelectorAll('.gradient-text, .section-title, .glow').forEach(element => {
        element.removeEventListener('mouseenter', () => {});
        element.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);
  
  // Return nothing as this is just a side-effect hook
  return null;
}