'use client';

import { useState, useEffect } from 'react';
import { X, Download, ArrowDown, Smartphone } from 'lucide-react';

// Define types for BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

// Extend Navigator interface
interface NavigatorExtended extends Navigator {
  standalone?: boolean;
}

// Extend Window interface
interface WindowExtended extends Window {
  MSStream?: unknown;
}

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installDismissed, setInstallDismissed] = useState(false);
  const [alreadyInstalled, setAlreadyInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed or dismissed recently
    const dismissed = localStorage.getItem('installPromptDismissed');
    if (dismissed && Date.now() - parseInt(dismissed) < 1000 * 60 * 60 * 24 * 7) {
      return;
    }

    // Type assertions for extended interfaces
    const navigatorExtended = navigator as NavigatorExtended;
    const windowExtended = window as WindowExtended;

    // Check if already installed as PWA
    if (window.matchMedia('(display-mode: standalone)').matches || 
        navigatorExtended.standalone === true) {
      setAlreadyInstalled(true);
      return;
    }

    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !windowExtended.MSStream;
    setIsIOS(isIOSDevice);

    // Setup beforeinstallprompt event for Android/Chrome
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // For iOS, show custom instructions after a delay
    if (isIOSDevice) {
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    }

    // Listen for app installation
    window.addEventListener('appinstalled', () => {
      setShowPrompt(false);
      setAlreadyInstalled(true);
      console.log('PWA was installed');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', () => {});
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt && !isIOS) return;

    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          console.log('User accepted the install prompt');
          setDeferredPrompt(null);
        } else {
          console.log('User dismissed the install prompt');
          handleDismiss();
        }
      } catch (err) {
        console.error('Error during install prompt:', err);
      }
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setInstallDismissed(true);
    localStorage.setItem('installPromptDismissed', Date.now().toString());
  };

  if (alreadyInstalled || !showPrompt) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div 
        className="
          relative 
          bg-white dark:bg-neutral-900 
          rounded-xl 
          shadow-xl 
          border border-neutral-200 dark:border-neutral-800
          overflow-hidden
          max-w-md 
          mx-auto
          animate-fade-in
        "
      >
        <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>
        
        <div className="p-6">
          <button 
            onClick={handleDismiss}
            className="
              absolute top-3 right-3 
              text-neutral-500 dark:text-neutral-400
              hover:text-neutral-700 dark:hover:text-neutral-200
              transition-colors
              p-1
              rounded-full
              hover:bg-neutral-100 dark:hover:bg-neutral-800
            "
          >
            <X size={20} />
          </button>
          
          <div className="flex items-start">
            <div className="
              mr-4 
              p-3 
              rounded-full 
              bg-primary/10 dark:bg-primary/20
              text-primary
            ">
              <Smartphone size={28} />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1">
                Install BrightWay App
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                {isIOS 
                  ? 'Add our app to your Home Screen for quick access to our services!' 
                  : 'Install our app for faster access and a better experience, even offline!'}
              </p>
              
              {isIOS ? (
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="
                      w-6 h-6 
                      bg-primary/10 dark:bg-primary/20
                      rounded-full 
                      flex items-center justify-center 
                      text-primary 
                      mr-2
                      text-xs
                      font-bold
                    ">1</div>
                    <p className="text-sm">Tap <span className="inline-flex items-center bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-xs"><ArrowDown size={12} className="mr-1" /> Share</span></p>
                  </div>
                  <div className="flex items-center">
                    <div className="
                      w-6 h-6 
                      bg-primary/10 dark:bg-primary/20
                      rounded-full 
                      flex items-center justify-center 
                      text-primary 
                      mr-2
                      text-xs
                      font-bold
                    ">2</div>
                    <p className="text-sm">Scroll and select <span className="inline-flex items-center bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-xs">Add to Home Screen</span></p>
                  </div>
                  <button
                    onClick={handleDismiss}
                    className="
                      w-full
                      mt-2
                      py-2.5
                      bg-primary/10 dark:bg-primary/20
                      hover:bg-primary/20 dark:hover:bg-primary/30
                      text-primary font-medium
                      rounded-lg
                      transition-colors
                    "
                  >
                    Got it
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleInstall}
                  className="
                    w-full
                    py-2.5 
                    bg-gradient-to-r from-primary to-primary/90
                    hover:shadow-lg hover:shadow-primary/20
                    text-white 
                    font-medium 
                    rounded-lg 
                    flex 
                    items-center 
                    justify-center
                    transition-all
                  "
                >
                  <Download size={18} className="mr-2" />
                  Install App
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}