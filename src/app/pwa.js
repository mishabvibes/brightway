// src/app/pwa.js
'use client';

export function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
          console.log('ServiceWorker registration successful with scope:', registration.scope);
          
          // Setup update handling
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available
                showUpdateNotification();
              }
            });
          });
        })
        .catch(function(err) {
          console.error('ServiceWorker registration failed:', err);
        });
      
      // Handle controller change
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
      });
    });
  }
}

// Show update notification
function showUpdateNotification() {
  // Create notification element
  const notification = document.createElement('div');
  notification.style.position = 'fixed';
  notification.style.bottom = '0';
  notification.style.left = '0';
  notification.style.right = '0';
  notification.style.background = '#1E40AF';
  notification.style.color = 'white';
  notification.style.padding = '16px';
  notification.style.display = 'flex';
  notification.style.justifyContent = 'space-between';
  notification.style.alignItems = 'center';
  notification.style.zIndex = '9999';
  notification.style.boxShadow = '0 -2px 10px rgba(0,0,0,0.2)';
  
  notification.innerHTML = `
    <div>🚀 New version available!</div>
    <button style="background: white; color: #1E40AF; border: none; padding: 8px 16px; border-radius: 4px; font-weight: 600; cursor: pointer;">
      Update Now
    </button>
  `;
  
  document.body.appendChild(notification);
  
  // Add event listener
  const updateButton = notification.querySelector('button');
  updateButton.addEventListener('click', () => {
    // Tell service worker to skip waiting
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
    }
  });
}

// Track PWA installation events
export function trackPWAInstallation() {
  if (typeof window !== 'undefined') {
    // Track installation
    window.addEventListener('appinstalled', (event) => {
      console.log('PWA was installed');
      localStorage.setItem('pwaInstalled', 'true');
      
      // Remove any installation prompts
      const existingPrompt = document.querySelector('[data-pwa-install-prompt]');
      if (existingPrompt) {
        existingPrompt.style.display = 'none';
      }
    });
    
    // Check if already in standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         (window.navigator && window.navigator.standalone === true);
                         
    if (isStandalone) {
      console.log('PWA is running in standalone mode');
      localStorage.setItem('pwaInstalled', 'true');
      
      // You could modify the UI here for the installed app experience
      // For example, hiding "Install App" buttons
    }
    
    // Listen for display mode changes
    window.matchMedia('(display-mode: standalone)').addEventListener('change', (evt) => {
      console.log('Display mode changed:', evt.matches ? 'standalone' : 'browser');
    });
  }
}