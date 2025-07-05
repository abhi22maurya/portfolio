import React from 'react';
import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
            Experience & Education
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            My professional journey and academic background
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 w-0.5 h-full bg-gradient-to-b from-cyan-500 to-purple-500 transform -translate-x-1/2"></div>
          
          <div className="space-y-12">
            {/* Experience 1 */}
            <div className="relative">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <div className="md:mr-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Product & AI Development Lead
                    </h3>
                    <p className="text-cyan-600 dark:text-cyan-400 font-medium">Vetra Innovation Pvt. Ltd.</p>
                    <p className="text-gray-500 dark:text-gray-400">Nov 2024 - Present</p>
                  </div>
                </div>
                <div className="hidden md:block w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 absolute left-1/2 transform -translate-x-1/2"></div>
                <div className="md:w-1/2 md:pl-12 mt-6 md:mt-0">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-cyan-500 mr-2">•</span>
                        <span className="text-gray-700 dark:text-gray-300">Led STRING, an IoT wearable for women's safety with AI and Flutter app</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-500 mr-2">•</span>
                        <span className="text-gray-700 dark:text-gray-300">Architected ML pipelines for distress signal detection using physiological data</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-500 mr-2">•</span>
                        <span className="text-gray-700 dark:text-gray-300">Oversaw hardware, software, and AWS (EC2/S3) integration for prototypes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-500 mr-2">•</span>
                        <span className="text-gray-700 dark:text-gray-300">Built stakeholder dashboards for performance tracking</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience 2 */}
            <div className="relative">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                  <div className="md:mr-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Web Developer Intern
                    </h3>
                    <p className="text-cyan-600 dark:text-cyan-400 font-medium">Techoctanet Services Pvt. Ltd.</p>
                    <p className="text-gray-500 dark:text-gray-400">Apr 2024 - Jun 2024</p>
                  </div>
                </div>
                <div className="hidden md:block w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 absolute left-1/2 transform -translate-x-1/2"></div>
                <div className="md:w-1/2 md:pl-12 mt-6 md:mt-0 order-1 md:order-2">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-cyan-500 mr-2">•</span>
                        <span className="text-gray-700 dark:text-gray-300">Developed a full-stack crowdfunding platform using React.js and Flask</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-500 mr-2">•</span>
                        <span className="text-gray-700 dark:text-gray-300">Integrated secure payment APIs and real-time analytics dashboards</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-500 mr-2">•</span>
                        <span className="text-gray-700 dark:text-gray-300">Designed user interfaces and performance tracking systems</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="relative">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <div className="md:mr-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      B.Tech in Computer Science
                    </h3>
                    <p className="text-cyan-600 dark:text-cyan-400 font-medium">Tula's Institute, Dehradun</p>
                    <p className="text-gray-500 dark:text-gray-400">Expected May 2026</p>
                  </div>
                </div>
                <div className="hidden md:block w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 absolute left-1/2 transform -translate-x-1/2"></div>
                <div className="md:w-1/2 md:pl-12 mt-6 md:mt-0">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300">
                      Pursuing a degree in Computer Science with a focus on AI/ML and Web Technologies.
                      Relevant coursework includes Data Structures, Algorithms, Machine Learning, and Web Development.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Achievements & Awards
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Recognition for innovation and technical excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: '1st Runner-Up',
                description: 'Startup Mahakumbh Futurepreneur – 2025',
                icon: <Award className="h-8 w-8 text-amber-500" />
              },
              {
                title: '4,00,000 Grant',
                description: 'MeitY Genesis Program',
                icon: <Award className="h-8 w-8 text-purple-500" />
              },
              {
                title: '1,00,000 Grant',
                description: 'UPES Runway Incubator (Best Innovation)',
                icon: <Award className="h-8 w-8 text-cyan-500" />
              },
              {
                title: 'Hackathon Winner',
                description: 'HackData, HackIndia, Hack the Hills',
                icon: <Award className="h-8 w-8 text-pink-500" />
              },
              {
                title: 'Startup Bootcamp Winner',
                description: 'Startup Uttarakhand Bootcamp – 2025',
                icon: <Award className="h-8 w-8 text-green-500" />
              }
            ].map((achievement, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                    {achievement.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">{achievement.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
