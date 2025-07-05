interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export const trackEvent = ({ category, action, label, value }: AnalyticsEvent) => {
  // Using Google Analytics if available
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  // Fallback to console in development
  const isDevelopment = import.meta.env.DEV || process.env.NODE_ENV === 'development';
  if (isDevelopment) {
    console.log('Analytics Event:', { category, action, label, value });
  }
};

export const trackFormInteraction = (formId: string, fieldName: string, action: string) => {
  trackEvent({
    category: 'Form Interaction',
    action: action,
    label: `${formId} - ${fieldName}`,
  });
};

export const trackFormSubmission = (formId: string, status: 'success' | 'error', error?: string) => {
  trackEvent({
    category: 'Form Submission',
    action: status,
    label: formId,
    ...(error && { value: 1, error }),
  });
};
