"use client";
import { useState, useEffect } from "react";
import { TypingTest } from "@/components/TypingTest";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { WelcomeModal } from "@/components/WelcomeModal";
import { useTheme } from "@/components/ThemeProvider";

export default function Home() {
  const { theme } = useTheme();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Check if user has seen the welcome modal before
    const hasSeenWelcome = localStorage.getItem('speedtype-welcome-seen');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, []);

  return (
    <div className={`min-h-screen ${theme.background} flex flex-col relative overflow-hidden`}>
      {/* Dynamic background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.15),transparent_50%)]"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { left: 34.4, top: 11.3, delay: 1.725, duration: 3.273 },
          { left: 56.9, top: 78.6, delay: 2.621, duration: 3.004 },
          { left: 80.7, top: 67.9, delay: 1.480, duration: 2.637 },
          { left: 38.4, top: 46.9, delay: 0.482, duration: 3.223 },
          { left: 44.3, top: 38.0, delay: 0.798, duration: 2.020 },
          { left: 5.7, top: 3.5, delay: 0.847, duration: 3.447 },
          { left: 11.1, top: 67.3, delay: 2.416, duration: 3.752 },
          { left: 86.8, top: 75.9, delay: 1.439, duration: 3.627 },
          { left: 94.4, top: 25.0, delay: 0.985, duration: 2.639 },
          { left: 13.1, top: 67.3, delay: 0.592, duration: 3.262 },
          { left: 93.8, top: 22.9, delay: 0.687, duration: 3.703 },
          { left: 43.3, top: 64.9, delay: 1.668, duration: 3.930 },
          { left: 77.1, top: 72.6, delay: 0.860, duration: 3.543 },
          { left: 9.4, top: 40.0, delay: 0.482, duration: 3.153 },
          { left: 78.5, top: 55.8, delay: 0.626, duration: 3.829 },
          { left: 23.9, top: 92.1, delay: 0.830, duration: 2.505 },
          { left: 84.7, top: 51.6, delay: 2.059, duration: 3.666 },
          { left: 57.6, top: 97.6, delay: 0.782, duration: 2.264 },
          { left: 6.0, top: 65.8, delay: 1.403, duration: 3.429 },
          { left: 19.5, top: 33.0, delay: 0.073, duration: 2.121 },
        ].map((particle, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-pulse ${theme === 'light' ? 'bg-black/20' : 'bg-white/20'}`}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Theme switcher */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeSwitcher />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-screen px-4 sm:px-6 lg:px-8 py-4 overflow-hidden">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 animate-fade-in">
          <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent mb-3 sm:mb-4 tracking-tight drop-shadow-2xl ${
            theme === 'light' ? 'from-gray-900 via-blue-900 to-indigo-800' : ''
          }`}>
            SPEED
          </h1>
          <div className="flex items-center justify-center space-x-3 mb-4 sm:mb-6">
            <div className={`w-12 sm:w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent ${
              theme === 'light' ? 'via-blue-600' : ''
            }`}></div>
            <span className={`text-base sm:text-lg font-medium tracking-widest uppercase ${
              theme === 'light' ? 'text-blue-700' : 'text-blue-300'
            }`}>
              Typing Test
            </span>
            <div className={`w-12 sm:w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent ${
              theme === 'light' ? 'via-blue-600' : ''
            }`}></div>
          </div>
          <p className={`${theme.textSecondary} text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed`}>
            Challenge your typing speed and accuracy. Master the keyboard, one keystroke at a time.
          </p>
        </div>

               {/* Main typing test component */}
               <div className="w-full animate-fade-in-up">
                 <TypingTest />
               </div>

        {/* Footer */}
        <div className="text-center mt-4 sm:mt-6 animate-fade-in">
          <div className="flex items-center justify-center space-x-3 sm:space-x-6 text-gray-500 text-xs sm:text-sm">
            <span className="flex items-center space-x-2">
              <div className={`w-2 h-2 ${theme === 'light' ? 'bg-green-600' : 'bg-green-400'} rounded-full animate-pulse`}></div>
              <span>Real-time tracking</span>
            </span>
            <span className="flex items-center space-x-2">
              <div className={`w-2 h-2 ${theme === 'light' ? 'bg-blue-600' : 'bg-blue-400'} rounded-full animate-pulse`}></div>
              <span>Precision metrics</span>
            </span>
            <span className="flex items-center space-x-2">
              <div className={`w-2 h-2 ${theme === 'light' ? 'bg-purple-600' : 'bg-purple-400'} rounded-full animate-pulse`}></div>
              <span>Performance insights</span>
            </span>
          </div>
        </div>
      </div>

      {/* Welcome Modal for first-time users */}
      {showWelcome && (
        <WelcomeModal onClose={() => setShowWelcome(false)} />
      )}
    </div>
  );
}
