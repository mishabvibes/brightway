'use client';

// Check if we're in a browser environment before trying to access window
const isBrowser = typeof window !== 'undefined';

/**
 * Register the service worker for PWA functionality
 */
export function registerServiceWorker() {
  if (!isBrowser || !('serviceWorker' in navigator)) {
    console.log('Service workers are not supported in this browser');
    return;
  }

  // Wait until the page is fully loaded
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });
      
      console.log('ServiceWorker registered successfully:', registration.scope);
      
      // Set up update detection
      setupUpdateDetection(registration);
      
    } catch (error) {
      console.error('ServiceWorker registration failed:', error);
    }
  });
}

/**
 * Setup detection of service worker updates
 * @param {ServiceWorkerRegistration} registration 
 */
function setupUpdateDetection(registration) {
  // Check for updates when service worker is first installed
  if (registration.installing) {
    trackInstallation(registration.installing);
  }
  
  // Listen for new service worker installation
  registration.addEventListener('updatefound', () => {
    if (registration.installing) {
      trackInstallation(registration.installing);
    }
  });
  
  // Detect controller change (new service worker took over)
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    console.log('New service worker activated, reloading for fresh content...');
    window.location.reload();
  });
}

/**
 * Track the installation state changes of a service worker
 * @param {ServiceWorker} worker 
 */
function trackInstallation(worker) {
  worker.addEventListener('statechange', () => {
    if (worker.state === 'installed' && navigator.serviceWorker.controller) {
      // New content is available, notify user
      showUpdateNotification();
    }
  });
}

/**
 * Show a notification when a new version is available
 */
function showUpdateNotification() {
  // First check if we already have a notification
  if (document.getElementById('pwa-update-notification')) {
    return;
  }
  
  const notification = document.createElement('div');
  notification.id = 'pwa-update-notification';
  notification.className = 'fixed bottom-20 left-0 right-0 mx-auto max-w-md bg-white dark:bg-neutral-800 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 p-4 z-50';
  notification.style.cssText = 'margin-left: auto; margin-right: auto;';
  
  notification.innerHTML = `
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <div class="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
            <line x1="16" y1="8" x2="2" y2="22"></line>
            <line x1="17.5" y1="15" x2="9" y2="15"></line>
          </svg>
        </div>
        <div>
          <h3 class="font-semibold">App Update Available</h3>
          <p class="text-neutral-600 dark:text-neutral-400 text-sm">Reload to see the latest version</p>
        </div>
      </div>
      <button id="pwa-update-button" class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors ml-4">
        Update
      </button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Add event listener to the update button
  document.getElementById('pwa-update-button')?.addEventListener('click', () => {
    // Tell service worker to skip waiting and activate new version
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then(registration => {
        if (registration.waiting) {
          // Send message to waiting service worker
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          
          // Remove notification
          notification.remove();
        }
      });
    }
  });
}

/**
 * Track and handle PWA installation events
 */
export function trackPWAInstallation() {
  if (!isBrowser) return;
  
  // Track successful installations
  window.addEventListener('appinstalled', (event) => {
    // Log installation to analytics
    console.log('PWA was installed');
    
    // Set a flag in localStorage to remember this device has installed the app
    localStorage.setItem('pwaInstalled', 'true');
    
    // Remove any installation prompts if they exist
    const existingPrompt = document.getElementById('pwa-install-prompt');
    if (existingPrompt) {
      existingPrompt.remove();
    }
  });
}

/**
 * Initialize all PWA features
 */
export function initializePWA() {
  if (!isBrowser) return;
  
  // Register service worker
  registerServiceWorker();
  
  // Track installation events
  trackPWAInstallation();
}