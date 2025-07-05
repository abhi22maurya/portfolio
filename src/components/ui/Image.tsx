import React, { useState, useEffect } from 'react';
import { optimizeImage } from '@/utils/imageUtils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: 'eager' | 'lazy';
  quality?: number;
  sizes?: string;
  priority?: boolean;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  quality = 85,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    // Only process the image if it's in the viewport or has priority
    const img = new window.Image();
    
    const handleLoad = () => {
      setIsLoaded(true);
      setImageSrc(optimizeImage(src, { width, height, quality }));
    };
    
    const handleError = () => {
      setIsError(true);
      console.error(`Failed to load image: ${src}`);
    };

    img.src = src;
    img.onload = handleLoad;
    img.onerror = handleError;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, width, height, quality]);

  // Fallback to original src if optimization fails
  const finalSrc = isError ? src : (isLoaded ? imageSrc : '');
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: isLoaded ? 'transparent' : '#f3f4f6',
      }}
    >
      {finalSrc && (
        <img
          src={finalSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : loading}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          {...props}
        />
      )}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-cyan-500 rounded-full animate-spin"></div>
        </div>
      )}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 dark:bg-red-900/20">
          <span className="text-red-500 dark:text-red-400 text-sm">Image failed to load</span>
        </div>
      )}
    </div>
  );
};

export default Image;
