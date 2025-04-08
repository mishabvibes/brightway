'use client';

import { useState, useEffect } from 'react';
import { X, Download, ArrowDown, Smartphone, Share2, PlusCircle } from 'lucide-react';

// Define types for the beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Extend Navigator interface for standalone property
interface NavigatorExtended extends Navigator {
  standalone?: boolean;
}

// Extend Window interface for MSStream
interface WindowExtended extends Window {
  MSStream?: unknown;
}

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installDismissed, setInstallDismissed] = useState(false);
  const [alreadyInstalled, setAlreadyInstalled] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // Check if it's a mobile device first
    const mobileCheck = () => {
      let check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||(window as any).opera);
      return check;
    };
    
    const isMobileDevice = mobileCheck();
    setIsMobile(isMobileDevice);
    
    // If it's not mobile, don't continue with the rest of the initialization
    if (!isMobileDevice) {
      return;
    }

    // Check if already installed or dismissed recently
    const dismissed = localStorage.getItem('installPromptDismissed');
    if (dismissed && Date.now() - parseInt(dismissed) < 1000 * 60 * 60 * 24 * 7) {
      return;
    }

    // Check if already installed as PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                        ((navigator as NavigatorExtended).standalone === true);
                        
    if (isStandalone) {
      setAlreadyInstalled(true);
      return;
    }

    // Detect iOS
    const windowExt = window as WindowExtended;
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !windowExt.MSStream;
    setIsIOS(isIOSDevice);

    // Setup beforeinstallprompt event for Android/Chrome
    const handleBeforeInstall = (e: Event) => {
      const installEvent = e as BeforeInstallPromptEvent;
      installEvent.preventDefault();
      setDeferredPrompt(installEvent);
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
      localStorage.setItem('pwaInstalled', 'true');
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
          localStorage.setItem('pwaInstalled', 'true');
        } else {
          console.log('User dismissed the install prompt');
          handleDismiss();
        }
      } catch (err) {
        console.error('Error during install prompt:', err);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIOSGuide(false);
    setInstallDismissed(true);
    localStorage.setItem('installPromptDismissed', Date.now().toString());
  };

  // Don't show on desktop or if already installed
  if (!isMobile || alreadyInstalled || !showPrompt) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" data-pwa-install-prompt>
      <div className="relative bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden max-w-md w-[92%] mx-4 animate-fade-in">
        <div className="h-2 bg-gradient-to-r from-blue-600 to-orange-500"></div>
        
        <div className="p-6">
          <button 
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-start">
            <div className="mr-4 p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600">
              <Smartphone size={28} />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1">
                Install BrightWay App
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                {isIOS 
                  ? 'Add our app to your Home Screen for quick access and offline use!' 
                  : 'Install our app for faster access and a better experience, even offline!'}
              </p>
              
              {isIOS && showIOSGuide ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4">
                    <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-3">How to install on iOS:</h4>
                    
                    <div className="space-y-3 mb-3">
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 mr-2 text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                        <p className="text-sm">Tap the <span className="inline-flex items-center bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-xs"><Share2 size={12} className="mr-1" /> Share</span> button in the browser toolbar</p>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 mr-2 text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                        <p className="text-sm">Scroll down in the share menu and tap <span className="inline-flex items-center bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-xs"><PlusCircle size={12} className="mr-1" /> Add to Home Screen</span></p>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 mr-2 text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                        <p className="text-sm">Tap "Add" in the top-right corner to add the app to your Home Screen</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-2">
                      <img 
                        src="/ios-install-guide.png" 
                        alt="iOS installation guide" 
                        className="h-28 rounded-lg border border-neutral-200 dark:border-neutral-700"
                        onError={(e) => {
                          // Hide the image if it fails to load
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={handleDismiss}
                    className="w-full py-2.5 bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 dark:hover:bg-blue-800/30 text-blue-600 font-medium rounded-lg transition-colors"
                  >
                    Got it
                  </button>
                </div>
              ) : isIOS ? (
                <button
                  onClick={handleInstall}
                  className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg hover:shadow-blue-600/20 text-white font-medium rounded-lg flex items-center justify-center transition-all"
                >
                  <Download size={18} className="mr-2" />
                  Install App
                </button>
              ) : (
                <button
                  onClick={handleInstall}
                  className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg hover:shadow-blue-600/20 text-white font-medium rounded-lg flex items-center justify-center transition-all"
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