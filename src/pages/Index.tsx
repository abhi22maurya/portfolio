
import { useState, useEffect, Suspense, lazy } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import ErrorBoundary from '@/components/ErrorBoundary';

// Lazy load all sections
const HeroSection = lazy(() => import('@/components/HeroSection'));
const SkillsSection = lazy(() => import('@/components/SkillsSection'));
const ProjectsSection = lazy(() => import('@/components/ProjectsSection'));
const ExperienceSection = lazy(() => import('@/components/ExperienceSection'));
const ContactSection = lazy(() => import('@/components/ContactSection').then(module => ({ default: module.ContactSection })));

// Error boundary component for lazy-loaded components
const LazyComponent = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary>
    <Suspense fallback={<SectionLoading />}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

// Loading component for suspense fallback
const SectionLoading = () => (
  <div className="min-h-[70vh] flex items-center justify-center">
    <div className="animate-pulse w-full max-w-4xl mx-auto p-6">
      <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-4/6"></div>
      </div>
    </div>
  </div>
);

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      
      // Update active section based on scroll position
      const sections = ['home', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;
          
          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white relative overflow-x-hidden transition-colors duration-200">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(156,146,172,0.15) 1px, transparent )',
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      {/* Smooth scrolling */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
        }
      `}</style>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <a 
              href="#" 
              className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
            >
              AM
            </a>
            
            <div className="hidden md:flex items-center space-x-1">
              {[
                { id: 'home', label: 'Home' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'experience', label: 'Experience' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeSection === item.id
                      ? 'text-cyan-600 dark:text-cyan-400'
                      : 'text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <ThemeToggle />
            </div>
            
            <div className="md:hidden flex items-center">
              <ThemeToggle />
              <button className="ml-4 p-2 rounded-md text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-16">
        <LazyComponent>
          <section id="home">
            <HeroSection />
          </section>
        </LazyComponent>
        
        <LazyComponent>
          <section id="skills">
            <SkillsSection />
          </section>
        </LazyComponent>
        
        <LazyComponent>
          <section id="projects">
            <ProjectsSection />
          </section>
        </LazyComponent>
        
        <LazyComponent>
          <section id="experience">
            <ExperienceSection />
          </section>
        </LazyComponent>
        
        <LazyComponent>
          <section id="contact">
            <ContactSection />
          </section>
        </LazyComponent>
      </main>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center">
            <div className="flex space-x-6 mb-6">
              <a 
                href="https://github.com/abhishekmaurya" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a 
                href="https://linkedin.com/in/abhishek-maurya" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="https://twitter.com/abhishekmaurya" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a 
                href="mailto:abhishek.maurya@example.com" 
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
            <p className="text-center text-slate-500 dark:text-slate-400 text-sm">
              © {new Date().getFullYear()} Abhishek Maurya. All rights reserved.
            </p>
            <p className="mt-2 text-center text-slate-500 dark:text-slate-500 text-xs">
              Built with React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
