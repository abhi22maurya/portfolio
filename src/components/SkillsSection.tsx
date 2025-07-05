import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

// Define valid Lucide icon names
type LucideIconName = keyof typeof LucideIcons;

type Category = {
  id: string;
  name: string;
  icon: keyof typeof LucideIcons;
  description: string;
};

type Project = {
  name: string;
  description: string;
  link?: string;
};

type TechItem = {
  id: string;
  name: string;
  icon: LucideIconName;
  category: string;
  years: number;
  projects: Project[];
  color: string;
};

const categories: Category[] = [
  {
    id: 'languages',
    name: 'Languages',
    icon: 'Code',
    description: 'Programming languages I work with'
  },
  {
    id: 'frontend',
    name: 'Frontend',
    icon: 'Layout',
    description: 'Modern web interfaces and user experiences'
  },
  {
    id: 'backend',
    name: 'Backend & API',
    icon: 'Server',
    description: 'Server-side applications and APIs'
  },
  {
    id: 'ai-ml',
    name: 'AI/ML',
    icon: 'Brain',
    description: 'Machine learning and artificial intelligence'
  },
  {
    id: 'mobile',
    name: 'Mobile',
    icon: 'Smartphone',
    description: 'Mobile application development'
  },
  {
    id: 'devops',
    name: 'DevOps & Cloud',
    icon: 'Cloud',
    description: 'Cloud infrastructure and deployment'
  },
  {
    id: 'tools',
    name: 'Tools',
    icon: 'Wrench',
    description: 'Development tools and software'
  }
];

const techStack: TechItem[] = [
  // Languages
  {
    id: 'python',
    name: 'Python',
    icon: 'FileCode',
    category: 'languages',
    years: 5,
    color: 'from-yellow-400 to-blue-600',
    projects: []
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: 'FileCode',
    category: 'languages',
    years: 4,
    color: 'from-yellow-300 to-yellow-600',
    projects: []
  },
  {
    id: 'cpp',
    name: 'C/C++',
    icon: 'FileCode',
    category: 'languages',
    years: 4,
    color: 'from-blue-500 to-purple-600',
    projects: []
  },
  {
    id: 'java',
    name: 'Java',
    icon: 'FileCode',
    category: 'languages',
    years: 3,
    color: 'from-red-500 to-orange-600',
    projects: []
  },

  // Frontend
  {
    id: 'react',
    name: 'React.js',
    icon: 'Atom',
    category: 'frontend',
    years: 3,
    color: 'from-blue-400 to-cyan-400',
    projects: []
  },
  
  // Backend & API
  {
    id: 'flask',
    name: 'Flask',
    icon: 'FlaskConical',
    category: 'backend',
    years: 3,
    color: 'from-gray-100 to-gray-300',
    projects: []
  },
  {
    id: 'django',
    name: 'Django',
    icon: 'Server', // Using Server as a fallback for Django
    category: 'backend',
    years: 2,
    color: 'from-green-700 to-green-900',
    projects: []
  },

  // Mobile
  {
    id: 'flutter',
    name: 'Flutter',
    icon: 'Smartphone',
    category: 'mobile',
    years: 2,
    color: 'from-blue-400 to-blue-600',
    projects: []
  },

  // AI/ML
  {
    id: 'pandas',
    name: 'Pandas',
    icon: 'Table',
    category: 'ai-ml',
    years: 3,
    color: 'from-purple-500 to-pink-600',
    projects: []
  },
  {
    id: 'scikit-learn',
    name: 'Scikit-learn',
    icon: 'Brain',
    category: 'ai-ml',
    years: 3,
    color: 'from-orange-500 to-yellow-500',
    projects: []
  },
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    icon: 'Brain',
    category: 'ai-ml',
    years: 2,
    color: 'from-orange-500 to-pink-600',
    projects: []
  },

  // Tools
  {
    id: 'git',
    name: 'Git',
    icon: 'GitBranch',
    category: 'tools',
    years: 4,
    color: 'from-orange-600 to-red-600',
    projects: []
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: 'Github',
    category: 'tools',
    years: 4,
    color: 'from-gray-800 to-black',
    projects: []
  },
  {
    id: 'vscode',
    name: 'VS Code',
    icon: 'Code',
    category: 'tools',
    years: 4,
    color: 'from-blue-500 to-blue-700',
    projects: []
  },
  {
    id: 'postman',
    name: 'Postman',
    icon: 'Send',
    category: 'tools',
    years: 3,
    color: 'from-orange-500 to-orange-700',
    projects: []
  },
  {
    id: 'aws',
    name: 'AWS (EC2/S3)',
    icon: 'Cloud',
    category: 'devops',
    years: 2,
    color: 'from-orange-400 to-yellow-600',
    projects: []
  },
  {
    id: 'excel',
    name: 'Excel',
    icon: 'Table',
    category: 'tools',
    years: 5,
    color: 'from-green-500 to-green-700',
    projects: []
  },
  {
    id: 'powerpoint',
    name: 'PowerPoint',
    icon: 'Presentation',
    category: 'tools',
    years: 5,
    color: 'from-orange-500 to-orange-700',
    projects: []
  }
];

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);

  const filteredTech = techStack.filter(tech => {
    const matchesSearch = tech.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || tech.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const renderTechItem = (tech: TechItem, isLast: boolean = false) => {
    const IconComponent = LucideIcons[tech.icon as keyof typeof LucideIcons] as React.ElementType;
    const tooltipId = `tooltip-${tech.id}`;
    const itemId = `skill-${tech.id}`;
    
    return (
      <React.Fragment key={tech.id}>
        <span 
          id={itemId}
          role="button"
          tabIndex={0}
          data-tooltip-id={tooltipId}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-help focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1 -mx-1"
          aria-describedby={tooltipId}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              const tooltip = document.querySelector(`#${tooltipId}`) as HTMLElement;
              tooltip?.setAttribute('data-state', 'visible');
            }
          }}
        >
          {IconComponent && React.createElement(IconComponent, { 
            className: "w-4 h-4 flex-shrink-0",
            'aria-hidden': 'true'
          })}
          <span className="sr-only">{tech.name}, </span>
          <span aria-hidden="true">{tech.name}</span>
          <span className="text-xs text-gray-400 ml-1" aria-hidden="true">
            ({tech.years}yr{tech.years !== 1 ? 's' : ''})
          </span>
        </span>
        {!isLast && (
          <span 
            className="text-gray-500 mx-2" 
            aria-hidden="true"
            role="separator"
          >•</span>
        )}
        <ReactTooltip 
          id={tooltipId} 
          className="!bg-slate-800 !border !border-slate-700 !rounded-lg !p-3 !max-w-xs"
          place="top"
          role="tooltip"
          aria-live="polite"
          afterShow={() => {
            const tooltip = document.querySelector(`#${tooltipId}`) as HTMLElement;
            tooltip?.setAttribute('aria-hidden', 'false');
          }}
          afterHide={() => {
            const tooltip = document.querySelector(`#${tooltipId}`) as HTMLElement;
            tooltip?.setAttribute('aria-hidden', 'true');
          }}
        >
          <div className="text-sm">
            <h4 className="font-bold mb-1 text-white">{tech.name}</h4>
            <p className="text-gray-300">{getTooltipContent(tech)}</p>
            {tech.projects && tech.projects.length > 0 && (
              <div className="mt-2">
                <p className="text-xs font-medium text-cyan-400 mb-1">Used in projects:</p>
                <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
                  {tech.projects.map((project, idx) => (
                    <li key={idx} className="ml-2">
                      {project.link ? (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:underline"
                        >
                          {project.name}
                        </a>
                      ) : (
                        project.name
                      )}
                      {project.description && ` - ${project.description}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ReactTooltip>
      </React.Fragment>
    );
  };

  const getCategoryTech = (categoryId: string) => {
    const techs = filteredTech.filter(tech => tech.category === categoryId);
    return techs.map((tech, index) => ({
      ...tech,
      isLast: index === techs.length - 1
    }));
  };

  const getTooltipContent = (tech: TechItem) => {
    const IconComponent = LucideIcons[tech.icon as keyof typeof LucideIcons] as React.ElementType;
    return (
      <div className="max-w-xs p-2">
        <div className="flex items-center gap-3 mb-2">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${tech.color}`}>
            {IconComponent && React.createElement(IconComponent, { className: "w-5 h-5 text-white" })}
          </div>
          <div>
            <div className="font-semibold text-white">{tech.name}</div>
            <div className="text-xs text-gray-300">{tech.years} {tech.years === 1 ? 'year' : 'years'} experience</div>
          </div>
        </div>
        
        {tech.projects.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-700">
            <div className="text-xs font-medium text-gray-400 mb-1">USED IN</div>
            <ul className="space-y-1">
              {tech.projects.map((project, idx) => (
                <li key={idx} className="text-sm text-cyan-300 hover:text-cyan-200">
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                      {project.name}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 012.828 0l3 3a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-3-3a2 2 0 010-2.828l1.172-1.172a1 1 0 00-1.415-1.414l-1.172 1.172a4 4 0 000 5.656l3 3a4 4 0 005.656 0l7-7a4 4 0 000-5.656l-3-3a4 4 0 00-5.656 0l-1.172 1.172a1 1 0 101.415 1.414l1.172-1.172z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M8 4a1 1 0 00-1-1H4a1 1 0 00-1 1v3a1 1 0 102 0V6h2a1 1 0 001-1z" clipRule="evenodd" />
                      </svg>
                    </a>
                  ) : (
                    project.name
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const allCategories = [
    { id: 'all', name: 'All Skills', icon: 'Layout' },
    ...categories
  ];

  // Get proficiency level based on years of experience
  const getProficiencyLevel = (years: number) => {
    if (years <= 1) return 25;
    if (years <= 3) return 50;
    if (years <= 5) return 75;
    return 100; // 5+ years
  };

  // Get color class based on years of experience
  const getProficiencyColor = (years: number) => {
    if (years <= 1) return 'bg-yellow-500';
    if (years <= 3) return 'bg-green-500';
    if (years <= 5) return 'bg-blue-500';
    return 'bg-purple-500'; // 5+ years
  };

  const handleExportPDF = (techName: string) => {
    // TODO: Implement PDF export
    console.log(`Exporting ${techName} to PDF...`);
  };

  return (
    <section id="skills" className="py-16 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Skills & Expertise
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I've worked with across various domains
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            <div className="absolute right-3 top-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
            >
              All Skills
            </button>
            {categories.map((category) => {
              const IconComponent = LucideIcons[category.icon as keyof typeof LucideIcons] as React.ElementType;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                      : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                  }`}
                >
                  {IconComponent && React.createElement(IconComponent, { className: "w-4 h-4" })}
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tech Stack Grid */}
        <div className="space-y-12">
          {categories.map((category) => {
            const categoryTech = getCategoryTech(category.id);
            if (categoryTech.length === 0) return null;
            
            const IconComponent = LucideIcons[category.icon as keyof typeof LucideIcons] as React.ElementType;
            
            return (
              <div key={category.id} className="bg-slate-800/50 rounded-xl p-6 shadow-lg border border-slate-700/50">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700">
                  <div className="p-2 rounded-lg bg-slate-700/50">
                    {IconComponent && React.createElement(IconComponent, { className: "w-6 h-6 text-cyan-400" })}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                    <p className="text-sm text-gray-400">{category.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-y-2">
                  {categoryTech.map((tech, index) => renderTechItem(tech, index === categoryTech.length - 1))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech Detail Modal */}
        {selectedTech && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700/50">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${selectedTech.color} flex items-center justify-center`}>
                      {React.createElement(LucideIcons[selectedTech.icon as keyof typeof LucideIcons] as React.ElementType, { className: "w-8 h-8 text-white" })}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedTech.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <span>{selectedTech.years} year{selectedTech.years !== 1 ? 's' : ''} experience</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedTech(null)}
                    className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-slate-700"
                  >
                    <LucideIcons.X className="w-6 h-6" />
                  </button>
                </div>

                {selectedTech.projects.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 text-white">Projects</h4>
                    <div className="space-y-3">
                      {selectedTech.projects.map((project, idx) => (
                        <div key={idx} className="bg-slate-700/30 rounded-lg p-4">
                          <div className="font-medium text-white">{project.name}</div>
                          <p className="text-sm text-gray-300 mt-1">{project.description}</p>
                          {project.link && (
                            <a 
                              href={project.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm text-cyan-400 hover:text-cyan-300 mt-2"
                            >
                              View Project
                              <LucideIcons.ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-700/50">
                  <button 
                    onClick={() => setSelectedTech(null)}
                    className="px-4 py-2 rounded-lg border border-slate-600 text-white hover:bg-slate-700/50 transition-colors"
                  >
                    Close
                  </button>
                  <button 
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 transition-opacity flex items-center gap-2"
                    onClick={() => {
                      // TODO: Implement PDF export
                      console.log('Exporting to PDF:', selectedTech.name);
                    }}
                  >
                    <LucideIcons.Download className="w-4 h-4" />
                    Export to PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
