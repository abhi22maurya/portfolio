import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaLoad: () => void;
  }
}

interface RecaptchaProps {
  onChange: (token: string) => void;
  onError?: (error: any) => void;
  siteKey: string;
  className?: string;
}

export const Recaptcha = ({ onChange, onError, siteKey, className }: RecaptchaProps) => {
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);

  useEffect(() => {
    const loadRecaptcha = () => {
      if (!window.grecaptcha) {
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=explicit`;
        script.async = true;
        script.defer = true;
        script.onerror = (error) => onError?.(error);
        document.head.appendChild(script);
      }

      window.onRecaptchaLoad = () => {
        if (recaptchaRef.current && !widgetId.current) {
          try {
            widgetId.current = window.grecaptcha.render(recaptchaRef.current, {
              sitekey: siteKey,
              callback: onChange,
              'expired-callback': () => onChange(''),
              'error-callback': () => {
                onChange('');
                onError?.('reCAPTCHA error');
              },
              size: 'normal',
              theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
            });
          } catch (error) {
            onError?.(error);
          }
        }
      };

      if (window.grecaptcha) {
        window.onRecaptchaLoad();
      } else {
        window.onRecaptchaLoad = window.onRecaptchaLoad || (() => {});
      }
    };

    loadRecaptcha();

    return () => {
      if (widgetId.current !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(widgetId.current);
        } catch (error) {
          console.error('Error resetting reCAPTCHA:', error);
        }
      }
    };
  }, [onChange, onError, siteKey]);

  return <div ref={recaptchaRef} className={className} />;
};
