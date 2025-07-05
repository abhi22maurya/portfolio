
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const achievements = [
  {
    id: 1,
    title: '1st Place - MeitY Runway Incubation Grant',
    event: 'Ministry of Electronics & IT',
    venue: 'National Level',
    date: '2024-25',
    description: 'Secured ₹4,00,000 grant from the Ministry of Electronics and Information Technology for innovative tech startup solutions under the prestigious Runway Incubation program.',
    icon: '🥇',
    gradient: 'from-yellow-400 to-orange-500',
    category: 'Government Grant',
    impact: '₹4,00,000 funding secured'
  },
  {
    id: 2,
    title: '1st Place - Runway Cohort',
    event: 'Runway Incubation Program',
    venue: 'National Level',
    date: '2024-25',
    description: 'Won first place in the highly competitive Runway Cohort program, securing ₹1,00,000 grant for startup development and mentorship opportunities.',
    icon: '🥇',
    gradient: 'from-green-400 to-teal-500',
    category: 'Incubation',
    impact: '₹1,00,000 grant awarded'
  },
  {
    id: 3,
    title: '2nd Place - Startup Mahakumbh',
    event: 'TW HAI HI Competition',
    venue: 'National Startup Event',
    date: '2024',
    description: 'Achieved second place at the prestigious Startup Mahakumbh, one of India\'s largest startup gatherings, showcasing innovative solutions to national challenges.',
    icon: '🥈',
    gradient: 'from-blue-400 to-indigo-500',
    category: 'Startup Competition',
    impact: 'National recognition & networking'
  },
  {
    id: 4,
    title: '1st Place - Uttarakhand Tech Summit',
    event: 'ITI Niranjanpur Tech Summit',
    venue: 'Dehradun',
    date: '2024',
    description: 'Secured first place at the Uttarakhand Tech Summit, demonstrating excellence in technology innovation and entrepreneurship at the state level.',
    icon: '🥇',
    gradient: 'from-purple-400 to-pink-500',
    category: 'Tech Summit',
    impact: 'State-level tech leadership'
  },
  {
    id: 5,
    title: 'Best Hardware Team',
    event: 'HackData 2025',
    venue: 'Shiv Nadar University',
    date: '2025',
    description: 'Won the prestigious Best Hardware Team award for developing innovative IoT solutions that integrate AI for real-time data processing and safety applications.',
    icon: '🏆',
    gradient: 'from-cyan-400 to-blue-500',
    category: 'Hackathon',
    impact: 'Recognition for hardware innovation'
  },
  {
    id: 6,
    title: 'Winner - Hack the Hills',
    event: 'Hack the Hills 2024',
    venue: 'DIT University',
    date: '2024',
    description: 'Secured first place with a comprehensive solution that addressed real-world challenges through innovative technology stack and user-centric design.',
    icon: '🎖️',
    gradient: 'from-red-400 to-pink-500',
    category: 'Hackathon',
    impact: 'First place among 500+ participants'
  },
  {
    id: 7,
    title: 'Winner - HackData',
    event: 'HackData Competition',
    venue: 'Tech Innovation Hub',
    date: '2024',
    description: 'Won the HackData competition by developing data-driven solutions that demonstrate excellence in analytics, machine learning, and real-world application.',
    icon: '🎖️',
    gradient: 'from-indigo-400 to-purple-500',
    category: 'Data Hackathon',
    impact: 'Data science excellence recognition'
  },
  {
    id: 8,
    title: '2nd Place - Startup Uttarakhand Bootcamp',
    event: 'Graphic Era University',
    venue: 'Dehradun',
    date: '2024',
    description: 'Achieved second place in the competitive startup bootcamp, showcasing viable business models and innovative solutions for regional challenges.',
    icon: '🥈',
    gradient: 'from-emerald-400 to-green-500',
    category: 'Startup Bootcamp',
    impact: 'Regional startup ecosystem recognition'
  },
  {
    id: 9,
    title: '3rd Place - HackIndia',
    event: 'Quantum University',
    venue: 'Roorkee',
    date: '2024',
    description: 'Secured third place at HackIndia, demonstrating strong problem-solving skills and innovative approach to technology challenges.',
    icon: '🥉',
    gradient: 'from-amber-400 to-yellow-500',
    category: 'National Hackathon',
    impact: 'Top 3 nationwide recognition'
  },
  {
    id: 10,
    title: 'Top 5 - IDE Bootcamp',
    event: 'Innovation & Development Bootcamp',
    venue: 'Mathura',
    date: '2024',
    description: 'Selected among top 5 participants in the Innovation & Development Entrepreneurship bootcamp, showcasing exceptional startup potential.',
    icon: '🏅',
    gradient: 'from-teal-400 to-cyan-500',
    category: 'Entrepreneurship',
    impact: 'Top 5 selection nationwide'
  },
  {
    id: 11,
    title: '4th Place - TIDES TIP Cohort',
    event: 'IIT Delhi Technology Incubation',
    venue: 'IIT Delhi',
    date: '2024-25',
    description: 'Achieved 4th place in the prestigious TIDES Technology Innovation Program at IIT Delhi, gaining access to world-class mentorship and resources.',
    icon: '🏅',
    gradient: 'from-violet-400 to-purple-500',
    category: 'IIT Incubation',
    impact: 'IIT Delhi recognition & mentorship'
  },
  {
    id: 12,
    title: 'Innovation & Entrepreneurship Award',
    event: 'Academic Excellence Recognition',
    venue: 'College Campus',
    date: '2024-25',
    description: 'Received the Innovation & Entrepreneurship Award for outstanding contributions to technological innovation and startup ecosystem development during academic year.',
    icon: '🏅',
    gradient: 'from-rose-400 to-red-500',
    category: 'Academic Award',
    impact: 'Academic year excellence recognition'
  },
  {
    id: 13,
    title: 'Finalist - Smart India Hackathon',
    event: 'Smart India Hackathon (SIH)',
    venue: 'National Level',
    date: '2024',
    description: 'Selected as finalist in India\'s largest hackathon for developing STRING - a women\'s safety IoT wearable with AI-powered threat detection capabilities.',
    icon: '🎯',
    gradient: 'from-orange-400 to-red-500',
    category: 'National Competition',
    impact: 'Top 1% nationwide selection'
  }
];

const AchievementsSection = () => {
  return (
    <section id="achievements" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Achievements & Recognition
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive showcase of awards, competitions, and milestones that mark my journey in tech innovation and entrepreneurship
          </p>
        </div>

        {/* Achievement Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <Card 
              key={achievement.id}
              className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:rotate-1 group"
            >
              <CardContent className="p-6 h-full flex flex-col">
                {/* Icon and Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${achievement.gradient} flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300`}>
                    {achievement.icon}
                  </div>
                  <Badge variant="secondary" className="bg-gray-700/50 text-gray-300 text-xs">
                    {achievement.category}
                  </Badge>
                </div>

                {/* Title and Event */}
                <div className="mb-3">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors leading-tight">
                    {achievement.title}
                  </h3>
                  <h4 className="text-sm text-cyan-400 font-semibold">{achievement.event}</h4>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-gray-400 text-xs">{achievement.venue}</span>
                    <span className="text-gray-500 text-xs">{achievement.date}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed mb-3 flex-grow text-xs">
                  {achievement.description}
                </p>

                {/* Impact */}
                <div className="mt-auto">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-green-400">💫</span>
                    <span className="text-green-300 font-medium">{achievement.impact}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievement Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { 
              label: 'Total Grants Won', 
              value: '₹5L+', 
              icon: '💰',
              description: 'Government & private funding'
            },
            { 
              label: 'Hackathons Won', 
              value: '8+', 
              icon: '🏆',
              description: 'First place victories'
            },
            { 
              label: 'National Recognition', 
              value: '6', 
              icon: '🇮🇳',
              description: 'SIH, MeitY & more'
            },
            { 
              label: 'IIT Programs', 
              value: '2', 
              icon: '🎓',
              description: 'Delhi & Roorkee incubation'
            },
            { 
              label: 'Awards & Honors', 
              value: '13', 
              icon: '🌟',
              description: 'Total recognitions'
            }
          ].map((stat, index) => (
            <Card key={stat.label} className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text mb-1">
                  {stat.value}
                </div>
                <div className="text-white font-semibold mb-1 text-sm">{stat.label}</div>
                <div className="text-gray-400 text-xs">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quote Section */}
        <div className="mt-16 text-center">
          <Card className="bg-white/5 backdrop-blur-md border-white/10 max-w-4xl mx-auto">
            <CardContent className="p-12">
              <div className="text-6xl mb-6">🎉</div>
              <blockquote className="text-2xl text-gray-300 italic leading-relaxed mb-6">
                "Each achievement represents not just personal success, but a step towards building 
                technology that creates meaningful impact and drives innovation for a better tomorrow."
              </blockquote>
              <div className="text-cyan-400 font-semibold">- Abhishek Maurya</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
