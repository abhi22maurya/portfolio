import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { ArrowDown, Github, Linkedin } from 'lucide-react';
import Image from '@/components/ui/Image';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
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

      {/* Cursor Following Effect */}
      <div
        className="fixed w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none z-0"
        style={{
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
          transition: 'all 0.3s ease-out'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className="mb-8 relative">
          <div className="w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 p-1 animate-scale-in">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
              <Image 
                src="/image.png"
                alt="Abhishek Maurya - Portfolio"
                width={256}
                height={256}
                priority={true}
                className="rounded-full"
              />
            </div>
          </div>
          
          {/* Floating Tech Icons */}
          <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center animate-float">
            <span className="text-2xl">⚡</span>
          </div>
          <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
            <span className="text-2xl">🚀</span>
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Abhishek Maurya
          </span>
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
          AI/ML Engineer & Full Stack Developer
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Building intelligent systems at the intersection of AI, IoT, and Web Technologies. 
          Passionate about creating impactful solutions through innovation.
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <a 
            href="https://github.com/abhi22maurya" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-800 text-white rounded-full flex items-center gap-2 hover:bg-gray-700 transition-colors"
          >
            <Github className="h-5 w-5" /> GitHub
          </a>
          <a 
            href="https://linkedin.com/in/abhishek-maurya2204" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-full flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Linkedin className="h-5 w-5" /> LinkedIn
          </a>
          <a 
            href="/abhishekresume.pdf" 
            download
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center gap-2 hover:from-purple-700 hover:to-pink-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download CV
          </a>
          <a 
            href="mailto:mauryax123@gmail.com" 
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full hover:opacity-90 transition-all"
          >
            Contact Me
          </a>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
          {['AI/ML', 'Web Development', 'IoT', 'Embedded Systems', 'Cloud', 'UI/UX'].map((skill) => (
            <span key={skill} className="px-3 py-1 bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-full text-sm font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <a href="#about" className="animate-bounce inline-block">
          <ArrowDown className="h-6 w-6 text-gray-400" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
