"use client";
import { useState } from "react";
import { ModernHeader } from "@/components/ModernHeader";
import { useTheme } from "@/components/ThemeProvider";

export default function PracticePage() {
  const { theme } = useTheme();
  const [selectedMode, setSelectedMode] = useState("words");
  const [wordCount, setWordCount] = useState(25);
  const [timeLimit, setTimeLimit] = useState(60);
  const [difficulty, setDifficulty] = useState("intermediate");

  const practiceModes = [
    {
      id: "words",
      title: "Word Count",
      description: "Type until you reach a specific number of words",
      icon: "📝",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "time",
      title: "Time Limit",
      description: "Type as many words as possible within a time limit",
      icon: "⏱️",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "quotes",
      title: "Quote Mode",
      description: "Type famous quotes and passages",
      icon: "💬",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "custom",
      title: "Custom Text",
      description: "Paste your own text to practice with",
      icon: "✏️",
      color: "from-orange-500 to-red-500"
    }
  ];

  const startPractice = () => {
    // Navigate to main typing page with practice parameters
    const params = new URLSearchParams({
      mode: selectedMode,
      difficulty: difficulty,
      ...(selectedMode === "words" && { wordCount }),
      ...(selectedMode === "time" && { timeLimit })
    });

    window.location.href = `/?${params.toString()}`;
  };

  return (
    <div className={`min-h-screen ${theme.background} relative overflow-hidden`}>
      {/* Enhanced Dynamic Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.4),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.3),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.2),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_70%,rgba(139,92,246,0.25),transparent_50%)]"></div>
      </div>

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 35 }, (_, i) => ({
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: Math.random() * 4,
          duration: 2 + Math.random() * 3,
          size: 1 + Math.random() * 2,
          opacity: 0.1 + Math.random() * 0.3
        })).map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: 'rgba(255,255,255,0.4)',
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 2}px rgba(168,85,247,0.4)`
            }}
          />
        ))}
      </div>

      <ModernHeader />

      <div className="relative z-10 pt-20 p-6 max-w-6xl mx-auto">
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
              🎯 Practice Mode
            </h1>
            <p className="text-gray-400 text-lg">
              Choose your practice method and improve your typing skills
            </p>
          </div>

          {/* Mode Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-scale-in">
            {practiceModes.map((mode, index) => (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`p-6 bg-gray-900/60 backdrop-blur-xl rounded-2xl border transition-all duration-300 hover-lift animate-fade-in ${
                  selectedMode === mode.id
                    ? "border-blue-500 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                    : "border-gray-700/50 hover:border-gray-600/70"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <div className="text-5xl mb-4">{mode.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{mode.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{mode.description}</p>
                  {selectedMode === mode.id && (
                    <div className="mt-4 flex justify-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Settings Panel */}
          <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 animate-slide-in-up">
            <h2 className="text-2xl font-bold text-white mb-6">Practice Settings</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Difficulty */}
              <div className="space-y-3">
                <label className="block text-lg font-semibold text-white">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full bg-gray-800/60 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-700/60 transition-all duration-200"
                >
                  <option value="beginner">Beginner - Simple words</option>
                  <option value="intermediate">Intermediate - Common words</option>
                  <option value="advanced">Advanced - Complex passages</option>
                </select>
              </div>

              {/* Word Count (for word mode) */}
              {selectedMode === "words" && (
                <div className="space-y-3">
                  <label className="block text-lg font-semibold text-white">Word Count</label>
                  <select
                    value={wordCount}
                    onChange={(e) => setWordCount(parseInt(e.target.value))}
                    className="w-full bg-gray-800/60 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-700/60 transition-all duration-200"
                  >
                    <option value={10}>10 words</option>
                    <option value={25}>25 words</option>
                    <option value={50}>50 words</option>
                    <option value={100}>100 words</option>
                  </select>
                </div>
              )}

              {/* Time Limit (for time mode) */}
              {selectedMode === "time" && (
                <div className="space-y-3">
                  <label className="block text-lg font-semibold text-white">Time Limit</label>
                  <select
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                    className="w-full bg-gray-800/60 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-700/60 transition-all duration-200"
                  >
                    <option value={30}>30 seconds</option>
                    <option value={60}>1 minute</option>
                    <option value={120}>2 minutes</option>
                    <option value={300}>5 minutes</option>
                    <option value={600}>10 minutes</option>
                  </select>
                </div>
              )}

              {/* Custom Text Input (for custom mode) */}
              {selectedMode === "custom" && (
                <div className="md:col-span-2 space-y-3">
                  <label className="block text-lg font-semibold text-white">Custom Text</label>
                  <textarea
                    placeholder="Paste your custom text here..."
                    className="w-full h-32 bg-gray-800/60 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-700/60 transition-all duration-200 resize-none"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Practice Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 animate-slide-in-left">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <svg className="w-6 h-6 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Practice Tips
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start space-x-3">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Focus on accuracy first, speed will follow</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Use proper finger positioning on the keyboard</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Practice regularly for best results</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Try different difficulties to challenge yourself</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 animate-slide-in-right">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <svg className="w-6 h-6 mr-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What You'll Improve
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-800/40 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">⚡</div>
                  <div className="text-sm text-gray-300 mt-1">Speed</div>
                </div>
                <div className="text-center p-3 bg-gray-800/40 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">🎯</div>
                  <div className="text-sm text-gray-300 mt-1">Accuracy</div>
                </div>
                <div className="text-center p-3 bg-gray-800/40 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">🧠</div>
                  <div className="text-sm text-gray-300 mt-1">Memory</div>
                </div>
                <div className="text-center p-3 bg-gray-800/40 rounded-lg">
                  <div className="text-2xl font-bold text-orange-400">💪</div>
                  <div className="text-sm text-gray-300 mt-1">Endurance</div>
                </div>
              </div>
            </div>
          </div>

          {/* Start Practice Button */}
          <div className="text-center animate-fade-in-up">
            <button
              onClick={startPractice}
              className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              <svg className="w-8 h-8 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Start Practice Session
            </button>

            <p className="text-gray-400 mt-4">
              Ready to improve your typing skills? Let's begin! 🚀
            </p>
          </div>

          {/* Quick Stats Preview */}
          <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Your Current Progress</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-gray-800/40 rounded-xl">
                <div className="text-2xl font-bold text-blue-400">0</div>
                <div className="text-sm text-gray-400">Best WPM</div>
              </div>
              <div className="p-4 bg-gray-800/40 rounded-xl">
                <div className="text-2xl font-bold text-green-400">0%</div>
                <div className="text-sm text-gray-400">Best Accuracy</div>
              </div>
              <div className="p-4 bg-gray-800/40 rounded-xl">
                <div className="text-2xl font-bold text-purple-400">0</div>
                <div className="text-sm text-gray-400">Tests Completed</div>
              </div>
              <div className="p-4 bg-gray-800/40 rounded-xl">
                <div className="text-2xl font-bold text-orange-400">0</div>
                <div className="text-sm text-gray-400">Current Streak</div>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-400">
                Complete some typing tests to see your progress here! 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
