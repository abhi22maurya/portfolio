export const optimizeImage = (src: string, options: {
  width: number;
  height: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
}): string => {
  // Ensure the path is correctly formatted
  let processedSrc = src.startsWith('/') ? `.${src}` : `/${src}`;
  
  // For development, just return the processed path
  const isDevelopment = import.meta.env.DEV || process.env.NODE_ENV === 'development';
  if (isDevelopment) {
    return processedSrc;
  }
  
  // In production, you can add your image optimization logic here
  // For now, we'll just return the processed path
  return processedSrc;
};
