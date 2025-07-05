import { debounce } from 'lodash';

export const sanitizeInput = (input: string): string => {
  // Basic XSS protection
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const debouncedSave = debounce((formData: Record<string, string>) => {
  try {
    localStorage.setItem('contactFormDraft', JSON.stringify(formData));
  } catch (error) {
    console.error('Failed to save form data:', error);
  }
}, 500);

export const loadDraft = (): Record<string, string> => {
  try {
    const draft = localStorage.getItem('contactFormDraft');
    return draft ? JSON.parse(draft) : {};
  } catch (error) {
    console.error('Failed to load form draft:', error);
    return {};
  }
};
