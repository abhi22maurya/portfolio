
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            My journey from self-taught programmer to tech entrepreneur
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-cyan-400">🚀 Innovation-Driven</h3>
                <p className="text-gray-300 leading-relaxed">
                  Started as a curious teenager learning Python and Java, now building startups that tackle real-world 
                  challenges. My passion lies in creating technology that makes a meaningful impact, especially in 
                  accessibility and safety.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">🏆 Award-Winning Builder</h3>
                <p className="text-gray-300 leading-relaxed">
                  From winning hackathons at prestigious universities to being incubated at IIT Roorkee, I've 
                  consistently pushed boundaries in AI, IoT, and blockchain technologies. My projects have gained 
                  recognition for their technical excellence and social impact.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-pink-400">🌍 Purpose-First Approach</h3>
                <p className="text-gray-300 leading-relaxed">
                  Every line of code I write serves a purpose. Whether it's enhancing women's safety through IoT 
                  wearables or democratizing education through accessible platforms, I believe technology should 
                  solve problems, not create them.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-md border border-white/10 p-8 flex flex-col justify-center items-center text-center">
              <div className="text-6xl mb-6">🧠</div>
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Always Learning
              </h3>
              <p className="text-gray-300 leading-relaxed">
                "The day you stop learning is the day you stop growing. I'm constantly exploring new technologies, 
                from the latest AI models to emerging blockchain protocols, always asking: How can this make the world better?"
              </p>
              
              <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">3+</div>
                  <div className="text-sm text-gray-400">Years Coding</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">5+</div>
                  <div className="text-sm text-gray-400">Major Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-400">10+</div>
                  <div className="text-sm text-gray-400">Awards Won</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">2</div>
                  <div className="text-sm text-gray-400">Startups Founded</div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-2xl animate-float">
              💡
            </div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl animate-float" style={{ animationDelay: '1.5s' }}>
              🔥
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
