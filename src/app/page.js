"use client";
import { useState, useEffect } from "react";
import { TypingArea } from "@/components/TypingArea";
import { StatsSidebar } from "@/components/StatsSidebar";
import { ModernHeader } from "@/components/ModernHeader";
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
        {[
          { left: 10.5, top: 20.3, delay: 0.5, duration: 3.2, size: 1.8, opacity: 0.25 },
          { left: 25.7, top: 45.8, delay: 1.2, duration: 4.1, size: 2.1, opacity: 0.18 },
          { left: 40.2, top: 15.6, delay: 2.3, duration: 2.8, size: 1.5, opacity: 0.32 },
          { left: 55.9, top: 70.4, delay: 0.8, duration: 3.9, size: 1.9, opacity: 0.22 },
          { left: 70.3, top: 35.7, delay: 1.7, duration: 4.5, size: 2.3, opacity: 0.28 },
          { left: 85.1, top: 60.9, delay: 3.1, duration: 3.3, size: 1.7, opacity: 0.19 },
          { left: 15.8, top: 80.2, delay: 2.6, duration: 2.9, size: 2.0, opacity: 0.31 },
          { left: 30.4, top: 55.1, delay: 0.3, duration: 4.2, size: 1.6, opacity: 0.24 },
          { left: 45.6, top: 25.8, delay: 1.9, duration: 3.7, size: 2.2, opacity: 0.27 },
          { left: 60.8, top: 75.3, delay: 2.8, duration: 3.1, size: 1.4, opacity: 0.33 },
          { left: 75.2, top: 10.7, delay: 1.4, duration: 4.0, size: 1.8, opacity: 0.21 },
          { left: 90.5, top: 50.9, delay: 3.4, duration: 2.6, size: 2.1, opacity: 0.29 },
          { left: 5.3, top: 65.4, delay: 0.9, duration: 3.8, size: 1.9, opacity: 0.23 },
          { left: 20.9, top: 30.6, delay: 2.1, duration: 4.3, size: 1.7, opacity: 0.26 },
          { left: 35.1, top: 85.7, delay: 1.6, duration: 3.4, size: 2.0, opacity: 0.30 },
          { left: 50.7, top: 40.2, delay: 3.0, duration: 2.7, size: 1.5, opacity: 0.35 },
          { left: 65.4, top: 5.8, delay: 0.7, duration: 4.1, size: 1.8, opacity: 0.20 },
          { left: 80.6, top: 90.3, delay: 2.4, duration: 3.6, size: 2.2, opacity: 0.28 },
          { left: 95.8, top: 55.6, delay: 1.1, duration: 2.8, size: 1.6, opacity: 0.24 },
          { left: 12.7, top: 72.9, delay: 2.9, duration: 3.9, size: 1.9, opacity: 0.22 },
          { left: 27.3, top: 18.4, delay: 0.4, duration: 4.4, size: 2.1, opacity: 0.27 },
          { left: 42.8, top: 78.1, delay: 1.8, duration: 3.2, size: 1.7, opacity: 0.31 },
          { left: 57.5, top: 33.8, delay: 3.2, duration: 2.9, size: 1.8, opacity: 0.25 },
          { left: 72.1, top: 88.5, delay: 1.3, duration: 4.0, size: 2.0, opacity: 0.29 },
          { left: 87.4, top: 43.2, delay: 2.7, duration: 3.5, size: 1.5, opacity: 0.33 },
          { left: 2.9, top: 58.7, delay: 0.6, duration: 4.2, size: 1.9, opacity: 0.21 },
          { left: 17.6, top: 23.9, delay: 2.0, duration: 3.3, size: 2.1, opacity: 0.26 },
          { left: 32.2, top: 79.4, delay: 1.5, duration: 2.8, size: 1.6, opacity: 0.34 },
          { left: 47.8, top: 38.6, delay: 3.3, duration: 3.7, size: 1.8, opacity: 0.23 },
          { left: 62.4, top: 93.1, delay: 0.8, duration: 4.3, size: 2.2, opacity: 0.28 },
          { left: 77.9, top: 12.3, delay: 2.5, duration: 3.0, size: 1.7, opacity: 0.32 },
          { left: 92.6, top: 67.8, delay: 1.0, duration: 4.1, size: 1.9, opacity: 0.24 },
          { left: 7.8, top: 52.4, delay: 3.1, duration: 2.6, size: 2.0, opacity: 0.30 },
          { left: 22.4, top: 7.6, delay: 0.2, duration: 3.8, size: 1.5, opacity: 0.36 },
          { left: 37.7, top: 62.1, delay: 2.2, duration: 4.4, size: 1.8, opacity: 0.25 }
        ].map((particle, i) => (
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

      {/* Modern Header */}
      <ModernHeader />

      {/* Main Content - Split Screen Layout */}
      <div className="relative z-10 flex flex-col lg:flex-row h-screen pt-20">
        {/* Left Side - Typing Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
          <TypingArea />
        </div>

        {/* Right Side - Stats & Progress Sidebar */}
        <div className="w-full lg:w-96 bg-gray-900/40 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-gray-700/50 flex flex-col max-h-96 lg:max-h-none">
          <StatsSidebar />
        </div>
      </div>

      {/* Welcome Modal for first-time users */}
      {showWelcome && (
        <WelcomeModal onClose={() => setShowWelcome(false)} />
      )}
    </div>
  );
}
