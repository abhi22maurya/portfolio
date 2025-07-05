import React, { useEffect, useState, type ReactNode, useCallback } from 'react';

interface LazyLoadComponentProps {
  children: ReactNode;
  threshold?: number | number[];
  rootMargin?: string;
  className?: string;
  style?: React.CSSProperties;
  fallback?: ReactNode;
}

const LazyLoadComponent: React.FC<LazyLoadComponentProps> = ({
  children,
  threshold = 0.1,
  rootMargin = '100px',
  className = '',
  style = {},
  fallback = (
    <div className="min-h-[300px] w-full flex items-center justify-center">
      <div className="animate-pulse w-full h-full bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
    </div>
  ),
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const setRef = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      setNode(node);
    }
  }, []);

  useEffect(() => {
    if (!node || isVisible) return;

    let observer: IntersectionObserver | null = null;
    
    try {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setHasAnimated(true);
            if (observer && node) {
              observer.unobserve(node);
            }
          }
        },
        {
          threshold,
          rootMargin,
        }
      );

      observer.observe(node);
    } catch (err) {
      // Fallback for browsers that don't support IntersectionObserver
      console.warn('IntersectionObserver not supported, loading content immediately');
      setIsVisible(true);
      setHasAnimated(true);
    }

    return () => {
      if (observer && node) {
        observer.unobserve(node);
      }
    };
  }, [node, isVisible, threshold, rootMargin]);

  // Error boundary for the lazy-loaded content
  if (error) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <p className="text-red-600 dark:text-red-400">
          Error loading component. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={setRef}
      className={`transition-opacity duration-500 ${className} ${
        hasAnimated ? 'opacity-100' : 'opacity-0'
      }`}
      style={style}
    >
      {isVisible ? (
        <ErrorBoundary onError={setError}>
          {children}
        </ErrorBoundary>
      ) : (
        fallback
      )}
    </div>
  );
};

// Simple error boundary component
class ErrorBoundary extends React.Component<
  { children: ReactNode; onError: (error: Error) => void },
  { hasError: boolean }
> {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error) {
    this.props.onError(error);
  }
  
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

export default LazyLoadComponent;
