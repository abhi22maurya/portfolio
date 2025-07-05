export const registerServiceWorker = () => {
  const isProduction = import.meta.env.PROD || process.env.NODE_ENV === 'production';
  if ('serviceWorker' in navigator && isProduction) {
    window.addEventListener('load', () => {
      const swUrl = '/sw.js';

      const registerValidSW = async (url: string) => {
        try {
          const registration = await navigator.serviceWorker.register(url);
          
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    // New content is available; refresh the page
                    console.log('New content is available; please refresh.');
                    
                    // Optional: Show a toast notification to the user
                    if (window.dispatchEvent) {
                      window.dispatchEvent(
                        new CustomEvent('sw-update', { detail: registration })
                      );
                    }
                  } else {
                    // Content is cached for offline use
                    console.log('Content is cached for offline use.');
                  }
                }
              };
            }
          };
          
          // Check for updates every hour
          setInterval(() => {
            registration.update().catch(err => 
              console.error('Error checking for service worker update:', err)
            );
          }, 60 * 60 * 1000);
          
        } catch (error) {
          console.error('Error during service worker registration:', error);
        }
      };

      const checkValidServiceWorker = async (url: string) => {
        try {
          const response = await fetch(url, {
            headers: { 'Service-Worker': 'script' },
          });
          
          const contentType = response.headers.get('content-type');
          if (
            response.status === 404 ||
            (contentType != null && contentType.indexOf('javascript') === -1)
          ) {
            // No service worker found or invalid content type
            const registration = await navigator.serviceWorker.ready;
            await registration.unregister();
            window.location.reload();
          } else {
            // Service worker found, proceed with registration
            registerValidSW(swUrl);
          }
        } catch {
          console.log('No internet connection found. App is running in offline mode.');
        }
      };

      // Check if the service worker exists before attempting registration
      checkValidServiceWorker(swUrl);
    });
  }
};

export const unregister = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.unregister();
    } catch (error) {
      console.error('Error during service worker unregistration:', error);
    }
  }
};

export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('This browser does not support desktop notification');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const showLocalNotification = (title: string, options: NotificationOptions) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, options);
  }
};
