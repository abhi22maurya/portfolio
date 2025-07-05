import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, MapPin, Github, Linkedin, Send, 
  Loader2, CheckCircle, AlertCircle, X, 
  Check, AlertTriangle 
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { cn } from '@/lib/utils';
import { Recaptcha } from './ui/Recaptcha';
import { useContactForm } from '@/hooks/useContactForm';

interface ContactSectionProps {
  // Add any props if needed
}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Get form state and handlers from the useContactForm hook
  const {
    state,
    handleChange,
    handleSubmit: submitForm,
    handleRecaptcha,
    handleRecaptchaError,
    clearForm,
    MAX_MESSAGE_LENGTH,
  } = useContactForm();
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm(e);
  };
  
  // Handle input blur for validation
  const handleBlur = (field: keyof typeof state, value: string) => {
    if (!value.trim()) {
      handleChange({
        target: { 
          name: 'errors', 
          value: { 
            ...state.errors, 
            [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} is required` 
          },
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };
  
  // Register service worker on component mount
  useEffect(() => {
    const isProduction = import.meta.env?.PROD || process.env.NODE_ENV === 'production';
    
    if (isProduction && 'serviceWorker' in navigator) {
      import('@/utils/serviceWorker')
        .then(({ registerServiceWorker }) => registerServiceWorker())
        .catch(err => console.error('Service worker registration failed:', err));
    }
  }, []);

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('contact');
      if (element) {
        const rect = element.getBoundingClientRect();
        setIsScrolled(window.scrollY > rect.top - 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle message validation on blur
  const handleMessageBlur = () => {
    if (state.message.trim().length < 10) {
      handleChange({
        target: { 
          name: 'errors', 
          value: { 
            ...state.errors, 
            message: 'Message should be at least 10 characters long' 
          },
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    } else if (state.message.length > MAX_MESSAGE_LENGTH) {
      handleChange({
        target: { 
          name: 'errors', 
          value: { 
            ...state.errors, 
            message: `Message exceeds ${MAX_MESSAGE_LENGTH} characters` 
          },
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    } else if (state.errors.message) {
      // Clear error if validation passes
      const { message, ...restErrors } = state.errors;
      handleChange({
        target: { 
          name: 'errors', 
          value: restErrors,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 100 
      }
    }
  };

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      id="contact" 
      className="relative py-20 bg-background overflow-hidden min-h-screen flex items-center"
      role="region"
      aria-labelledby="contact-heading"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-full h-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl dark:mix-blend-screen"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl dark:mix-blend-screen"></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <motion.div 
          className="text-center mb-16 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            id="contact-heading"
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent"
          >
            Get In Touch
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? I'd love to hear from you!
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 bg-background/80 dark:bg-background/90 backdrop-blur-sm p-8 rounded-2xl border border-border/20 shadow-xl"
          initial="hidden"
          animate={isScrolled ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Contact Info */}
          <motion.div 
            className="space-y-6"
            variants={itemVariants}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">Contact Information</h3>
              <p className="text-muted-foreground">
                Feel free to reach out through any of these channels. I'll get back to you as soon as possible!
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Email</h4>
                  <a 
                    href="mailto:mauryax123@gmail.com" 
                    className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors"
                  >
                    mauryax123@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Location</h4>
                  <p className="text-gray-600 dark:text-gray-300">Dehradun, India</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <h4 className="text-sm font-medium text-foreground mb-3">Connect with me</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a 
                  href="https://linkedin.com/in/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-slate-100 dark:border-slate-700/50 lg:col-span-2"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { 
                  type: 'spring', 
                  stiffness: 100,
                  delay: 0.1
                }
              }
            }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send me a message
            </h3>
            <form 
              ref={formRef}
              onSubmit={handleSubmit} 
              className="space-y-6" 
              noValidate
            >
              {state.isSuccess && (
                <div className="flex items-center gap-3 p-4 mb-4 text-sm text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400 rounded-lg">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Message sent successfully!</h3>
                    <p>Thank you for reaching out. I&apos;ll get back to you soon.</p>
                  </div>
                </div>
              )}
              {state.error && (
                <div role="alert">
                  <div className="flex items-center gap-3 p-4 mb-4 text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-lg">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p>{state.error}</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative space-y-1">
                    <Input
                      id="name"
                      name="name"
                      value={state.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name', state.name)}
                      placeholder="Your name"
                      className={cn("w-full transition-all duration-200 border-2 focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 dark:focus:ring-cyan-900/50", {
                        'border-red-500 dark:border-red-500 focus:ring-red-500/20': state.errors.name,
                        'border-green-500 dark:border-green-500': state.name && !state.errors.name && state.name.length >= 2,
                        'border-gray-200 dark:border-slate-700': !state.name && !state.errors.name
                      })}
                      aria-invalid={!!state.errors.name}
                      aria-describedby={state.errors.name ? 'name-error' : 'name-help'}
                      disabled={state.isSubmitting}
                      autoComplete="name"
                    />
                    {state.name && !state.errors.name && state.name.length >= 2 && (
                      <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                    )}
                  </div>
                  {state.errors.name ? (
                    <p 
                      id="name-error" 
                      className="mt-1 text-sm text-red-600 dark:text-red-400"
                      role="alert"
                    >
                      {state.errors.name}
                    </p>
                  ) : (
                    <p id="name-help" className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Your full name
                    </p>
                  )}
                </div>
                
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative space-y-1">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={state.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email', state.email)}
                      placeholder="your.email@example.com"
                      className={cn("w-full transition-all duration-200 border-2 focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 dark:focus:ring-cyan-900/50", {
                        'border-red-500 dark:border-red-500 focus:ring-red-500/20': state.errors.email,
                        'border-green-500 dark:border-green-500': state.email && !state.errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email),
                        'border-gray-200 dark:border-slate-700': !state.email && !state.errors.email
                      })}
                      aria-invalid={!!state.errors.email}
                      aria-describedby={state.errors.email ? 'email-error' : 'email-help'}
                      disabled={state.isSubmitting}
                      autoComplete="email"
                      inputMode="email"
                    />
                    {state.email && !state.errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email) && (
                      <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                    )}
                  </div>
                  {state.errors.email ? (
                    <p 
                      id="email-error" 
                      className="mt-1 text-sm text-red-600 dark:text-red-400"
                      role="alert"
                    >
                      {state.errors.email}
                    </p>
                  ) : (
                    <p id="email-help" className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Your email address
                    </p>
                  )}
                </div>
              </div>
              
              <div className="relative space-y-1">
                <div className="flex justify-between items-baseline mb-1">
                  <label 
                    htmlFor="message" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <span 
                    className={cn("text-xs font-medium transition-colors", {
                      'text-yellow-600 dark:text-yellow-400': state.characterCount > MAX_MESSAGE_LENGTH * 0.8 && state.characterCount <= MAX_MESSAGE_LENGTH * 0.9,
                      'text-red-600 dark:text-red-400': state.characterCount > MAX_MESSAGE_LENGTH * 0.9,
                      'text-gray-500 dark:text-gray-400': state.characterCount <= MAX_MESSAGE_LENGTH * 0.8,
                    })}
                    aria-live="polite"
                  >
                    {state.characterCount}/{MAX_MESSAGE_LENGTH}
                  </span>
                </div>
                <div className="relative">
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={state.message}
                    onChange={handleChange}
                    onBlur={handleMessageBlur}
                    placeholder="Your message..."
                    className={cn("w-full transition-all duration-200 border-2 focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 dark:focus:ring-cyan-900/50 min-h-[120px]", {
                      'border-red-500 dark:border-red-500 focus:ring-red-500/20': 
                        state.errors.message || (!state.errors.message && state.characterCount > MAX_MESSAGE_LENGTH * 0.9),
                      'border-yellow-500 dark:border-yellow-500 focus:ring-yellow-500/20': 
                        !state.errors.message && state.characterCount > MAX_MESSAGE_LENGTH * 0.8 && state.characterCount <= MAX_MESSAGE_LENGTH * 0.9,
                      'border-green-500 dark:border-green-500': 
                        state.message && !state.errors.message && state.characterCount >= 10 && state.characterCount <= MAX_MESSAGE_LENGTH * 0.8,
                      'border-gray-200 dark:border-slate-700': !state.message && !state.errors.message
                    })}
                    aria-invalid={!!state.errors.message || state.characterCount > MAX_MESSAGE_LENGTH}
                    aria-describedby={
                      state.errors.message ? 'message-error' : 'message-help message-counter-'+ (state.characterCount > MAX_MESSAGE_LENGTH * 0.8 ? 'warning' : 'normal')
                    }
                    disabled={state.isSubmitting}
                  />
                  {state.message && !state.errors.message && state.characterCount >= 10 && state.characterCount <= MAX_MESSAGE_LENGTH * 0.8 && (
                    <Check className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                  )}
                </div>
                <AnimatePresence>
                  {state.errors.message && (
                    <motion.p 
                      id="message-error" 
                      className="flex items-start gap-1.5 mt-1 text-sm text-red-600 dark:text-red-400"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      role="alert"
                    >
                      <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>{state.errors.message}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
                <p 
                  id="message-help" 
                  className="mt-1 text-xs text-gray-500 dark:text-gray-400"
                >
                  Please include details about your project or inquiry (minimum 10 characters)
                </p>
              </div>

              {/* reCAPTCHA */}
              <div className="pt-2">
                <Recaptcha
                  siteKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
                  onChange={handleRecaptcha}
                  onError={handleRecaptchaError}
                  className="flex justify-center"
                  aria-describedby={state.errors.recaptcha ? 'recaptcha-error' : undefined}
                />
                <AnimatePresence>
                  {state.errors.recaptcha && (
                    <motion.p 
                      id="recaptcha-error" 
                      className="flex items-center gap-1.5 mt-1 text-sm text-red-600 dark:text-red-400"
                      role="alert"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                      <span>{state.errors.recaptcha}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
                {!state.errors.recaptcha && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Please verify you're not a robot
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
                <div className="space-x-2">
                  <Button 
                    type="button" 
                    variant="outline"
                    size="sm"
                    onClick={clearForm}
                    disabled={state.isSubmitting || (!state.name && !state.email && !state.message)}
                    className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Clear
                  </Button>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={state.isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {state.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};