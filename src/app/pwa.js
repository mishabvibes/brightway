'use client';

// Service worker registration
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/',
      });
      
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Service worker registration failed: ${error}`);
    }
  }
};

// Track PWA installation
export const trackPWAInstallation = () => {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    window.deferredPrompt = e;
  });

  window.addEventListener('appinstalled', () => {
    // Clear the deferredPrompt
    window.deferredPrompt = null;
    // Log install to analytics
    console.log('PWA was installed');
  });
};

// Create a simple PWA install prompt component
export const createInstallPrompt = (setShowPrompt) => {
  if (window.deferredPrompt) {
    const promptEvent = window.deferredPrompt;
    
    // Show the install prompt
    promptEvent.prompt();
    
    // Wait for the user to respond to the prompt
    promptEvent.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setShowPrompt(false);
      window.deferredPrompt = null;
    });
  }
};