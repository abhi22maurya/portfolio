import React from 'react';
import { Cpu, Shield, FileText, HeartPulse, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Project {
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  date: string;
  highlights: string[];
}

const projects: Project[] = [
  {
    title: 'LegalGPT',
    description: 'AI-Powered Legal Assistant',
    icon: <FileText className="h-6 w-6 text-purple-500" />,
    tags: ['Streamlit', 'React.js', 'Razorpay', 'LLMs', 'Groq API'],
    date: 'Nov 2023',
    highlights: [
      'Built an end-to-end legal assistant with speech/text queries and PDF document analysis',
      'Implemented secure contract analysis, AI dispute mediation, and appointment booking',
      'Integrated automated email transcripts and explainable AI summaries'
    ]
  },
  {
    title: 'NeuroGrip',
    description: 'Brain-Controlled Bionic Hand',
    icon: <Cpu className="h-6 w-6 text-cyan-500" />,
    tags: ['ESP32C6', 'BioAmp', '3D Printing', 'AI'],
    date: 'Oct 2023',
    highlights: [
      'Designed a 3D-printed robotic hand with 6 servos and EMG/brainwave control',
      'Developed a haptic feedback system for touch simulation in amputees',
      'Demonstrated skills in embedded systems and AI-driven motion control'
    ]
  },
  {
    title: 'CardioGram',
    description: 'Portable ECG & Heart Monitoring System',
    icon: <HeartPulse className="h-6 w-6 text-pink-500" />,
    tags: ['IoT', 'ML', 'Flutter', 'ESP32C6', 'BioAmp'],
    date: 'Sep 2023',
    highlights: [
      'Built a portable ECG device with ESP32C6 and BioAmp Heart Candy for 3-lead heart signal recording',
      'Trained ML models on 30K+ ECG records to detect anomalies',
      'Integrated local LLMs to interpret results and generate PDF reports'
    ]
  },
  {
    title: 'STRING',
    description: 'IoT Wearable for Women\'s Safety',
    icon: <Shield className="h-6 w-6 text-amber-500" />,
    tags: ['IoT', 'AI', 'Flutter', 'AWS', 'EC2/S3'],
    date: 'Nov 2024 - Present',
    highlights: [
      'Led development of an IoT wearable with AI-powered distress signal detection',
      'Architected ML pipelines for analyzing physiological data',
      'Oversaw hardware, software, and AWS cloud integration'
    ]
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 md:px-6 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Cutting-edge solutions blending AI, IoT, and software innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card 
              key={project.title}
              className="group relative overflow-hidden bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 hover:border-cyan-400/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
                    {project.icon}
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-cyan-600 dark:text-cyan-400">
                      {project.description}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-white/5 rounded-full text-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-cyan-500 mr-2">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-800">
                <span className="text-sm text-gray-500 dark:text-gray-400">{project.date}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/30"
                >
                  View Details <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="https://github.com/abhi22maurya" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 transition-colors"
          >
            View All Projects on GitHub
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
