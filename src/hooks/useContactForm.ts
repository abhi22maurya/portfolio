import { useState, useCallback, useEffect, useRef } from 'react';
import { sanitizeInput, validateEmail, debouncedSave, loadDraft } from '@/utils/formUtils';
import { trackFormInteraction, trackFormSubmission } from '@/utils/analytics';

type FormState = {
  name: string;
  email: string;
  message: string;
  errors: {
    name?: string;
    email?: string;
    message?: string;
    recaptcha?: string;
  };
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  lastInteraction: number;
  characterCount: number;
  recaptchaToken: string | null;
};

const MAX_MESSAGE_LENGTH = 2000;

export const useContactForm = () => {
  const [state, setState] = useState<FormState>(() => {
    const draft = loadDraft();
    return {
      name: draft.name || '',
      email: draft.email || '',
      message: draft.message || '',
      errors: {},
      isSubmitting: false,
      isSuccess: false,
      error: null,
      lastInteraction: 0,
      characterCount: draft.message?.length || 0,
      recaptchaToken: null,
    };
  });

  const lastSubmissionTime = useRef<number>(0);
  const submissionAttempts = useRef<number>(0);

  const validateForm = useCallback((): boolean => {
    const errors: FormState['errors'] = {};
    let isValid = true;
    const now = Date.now();

    // Rate limiting check (max 3 submissions per minute)
    if (now - lastSubmissionTime.current < 60000 && submissionAttempts.current >= 3) {
      setState(prev => ({
        ...prev,
        error: 'Too many attempts. Please try again in a minute.',
      }));
      trackFormSubmission('contact', 'error', 'rate_limit_exceeded');
      return false;
    }

    // Basic validation
    if (!state.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    } else if (state.name.trim().length < 2) {
      errors.name = 'Name is too short';
      isValid = false;
    }

    if (!state.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(state.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!state.message.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    } else if (state.message.trim().length < 10) {
      errors.message = 'Message should be at least 10 characters long';
      isValid = false;
    } else if (state.message.length > MAX_MESSAGE_LENGTH) {
      errors.message = `Message exceeds ${MAX_MESSAGE_LENGTH} characters`;
      isValid = false;
    }

    // reCAPTCHA validation in production
    const isProduction = import.meta.env.PROD || process.env.NODE_ENV === 'production';
    if (isProduction && !state.recaptchaToken) {
      errors.recaptcha = 'Please complete the reCAPTCHA';
      isValid = false;
    }

    setState(prev => ({
      ...prev,
      errors,
      lastInteraction: now,
    }));

    return isValid;
  }, [state.name, state.email, state.message, state.recaptchaToken]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newState = {
      ...state,
      [name]: value,
      errors: {
        ...state.errors,
        [name]: undefined, // Clear error when user types
      },
      lastInteraction: Date.now(),
      ...(name === 'message' && { characterCount: value.length }),
    };

    setState(newState);
    
    // Save form draft with debouncing
    debouncedSave({
      name: newState.name,
      email: newState.email,
      message: newState.message,
    });
    
    // Track field interaction
    trackFormInteraction('contact', name, 'input');
  }, [state]);

  const handleRecaptcha = useCallback((token: string) => {
    setState(prev => ({
      ...prev,
      recaptchaToken: token,
      errors: {
        ...prev.errors,
        recaptcha: undefined,
      },
    }));
  }, []);

  const handleRecaptchaError = useCallback((error: any) => {
    console.error('reCAPTCHA Error:', error);
    setState(prev => ({
      ...prev,
      recaptchaToken: null,
      errors: {
        ...prev.errors,
        recaptcha: 'Failed to load reCAPTCHA. Please refresh the page.',
      },
    }));
  }, []);

  const clearForm = useCallback(() => {
    if (window.confirm('Are you sure you want to clear the form?')) {
      setState(prev => ({
        ...prev,
        name: '',
        email: '',
        message: '',
        errors: {},
        characterCount: 0,
        recaptchaToken: null,
      }));
      localStorage.removeItem('contactFormDraft');
      trackFormInteraction('contact', 'form', 'cleared');
    }
  }, []);

  const restoreDraft = useCallback(() => {
    const draft = loadDraft();
    setState(prev => ({
      ...prev,
      ...draft,
      characterCount: draft.message?.length || 0,
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const now = Date.now();
    
    // Track form submission attempt
    trackFormInteraction('contact', 'form', 'submission_attempt');
    
    if (!validateForm()) {
      submissionAttempts.current++;
      lastSubmissionTime.current = now;
      return;
    }

    setState(prev => ({ ...prev, isSubmitting: true, error: null }));

    try {
      const formData = {
        name: sanitizeInput(state.name),
        email: sanitizeInput(state.email),
        message: sanitizeInput(state.message),
        'g-recaptcha-response': state.recaptchaToken || '',
        timestamp: new Date().toISOString(),
      };

      // In a real app, you would send this to your backend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Reset form on success
      setState(prev => ({
        ...prev,
        isSuccess: true,
        name: '',
        email: '',
        message: '',
        recaptchaToken: null,
        characterCount: 0,
      }));

      // Clear saved draft on success
      localStorage.removeItem('contactFormDraft');
      
      // Track successful submission
      trackFormSubmission('contact', 'success');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setState(prev => ({ ...prev, isSuccess: false }));
      }, 5000);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
      setState(prev => ({
        ...prev,
        error: errorMessage,
      }));
      
      // Track submission error
      trackFormSubmission('contact', 'error', errorMessage);
      
    } finally {
      setState(prev => ({ ...prev, isSubmitting: false }));
      
      // Reset reCAPTCHA on error
      if (state.error) {
        setState(prev => ({ ...prev, recaptchaToken: null }));
      }
    }
  }, [state.name, state.email, state.message, state.recaptchaToken, validateForm]);

  // Auto-save form data when component unmounts
  useEffect(() => {
    return () => {
      if (state.name || state.email || state.message) {
        debouncedSave({
          name: state.name,
          email: state.email,
          message: state.message,
        });
      }
    };
  }, [state.name, state.email, state.message]);

  return {
    state,
    handleChange,
    handleSubmit,
    handleRecaptcha,
    handleRecaptchaError,
    clearForm,
    restoreDraft,
    MAX_MESSAGE_LENGTH,
  };
};
