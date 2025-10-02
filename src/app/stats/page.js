"use client";
import { useState, useEffect } from "react";
import { ModernHeader } from "@/components/ModernHeader";
import { useTheme } from "@/components/ThemeProvider";

export default function StatsPage() {
  const { theme } = useTheme();
  const [userStats, setUserStats] = useState({
    totalTests: 0,
    bestWpm: 0,
    bestAccuracy: 0,
    averageWpm: 0,
    totalTime: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalWpmSum: 0
  });

  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  useEffect(() => {
    // Load stats from localStorage
    const savedStats = localStorage.getItem('speedtype-user-stats');
    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }
  }, []);

  const getPerformanceGrade = (wpm, accuracy) => {
    if (wpm >= 80 && accuracy >= 95) return { grade: "S", color: "text-yellow-400", bg: "bg-yellow-500/20" };
    if (wpm >= 70 && accuracy >= 90) return { grade: "A", color: "text-green-400", bg: "bg-green-500/20" };
    if (wpm >= 60 && accuracy >= 85) return { grade: "B", color: "text-blue-400", bg: "bg-blue-500/20" };
    if (wpm >= 50 && accuracy >= 80) return { grade: "C", color: "text-purple-400", bg: "bg-purple-500/20" };
    if (wpm >= 40 && accuracy >= 75) return { grade: "D", color: "text-orange-400", bg: "bg-orange-500/20" };
    return { grade: "F", color: "text-red-400", bg: "bg-red-500/20" };
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) return `${hours}h ${minutes}m ${secs}s`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  const performanceGrade = getPerformanceGrade(userStats.averageWpm || 0, userStats.bestAccuracy || 0);

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
        {Array.from({ length: 25 }, (_, i) => ({
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

      <div className="relative z-10 pt-20 p-6 max-w-7xl mx-auto">
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
              Your Typing Statistics
            </h1>
            <p className="text-gray-400 text-lg">
              Track your progress and analyze your typing performance
            </p>
          </div>

          {/* Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Overall Grade */}
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover-lift animate-scale-in">
              <div className="flex items-center justify-between mb-4">
                <div className="text-5xl font-bold text-white">{performanceGrade.grade}</div>
                <div className={`w-12 h-12 rounded-full ${performanceGrade.bg} flex items-center justify-center`}>
                  <svg className="w-6 h-6 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Performance Grade</h3>
              <p className="text-gray-400 text-sm">Overall typing skill level</p>
            </div>

            {/* Total Tests */}
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover-lift animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-blue-400 mb-4">{userStats.totalTests || 0}</div>
              <h3 className="text-lg font-semibold text-white mb-2">Total Tests</h3>
              <p className="text-gray-400 text-sm">Tests completed</p>
            </div>

            {/* Best WPM */}
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover-lift animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-purple-400 mb-4">{userStats.bestWpm || 0}</div>
              <h3 className="text-lg font-semibold text-white mb-2">Best WPM</h3>
              <p className="text-gray-400 text-sm">Personal record</p>
            </div>

            {/* Best Accuracy */}
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover-lift animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-bold text-green-400 mb-4">{userStats.bestAccuracy ? `${userStats.bestAccuracy}%` : '0%'}</div>
              <h3 className="text-lg font-semibold text-white mb-2">Best Accuracy</h3>
              <p className="text-gray-400 text-sm">Highest accuracy achieved</p>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Performance Metrics */}
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 animate-slide-in-left">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Performance Metrics
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-800/40 rounded-xl">
                  <div>
                    <div className="text-lg font-semibold text-white">Average WPM</div>
                    <div className="text-sm text-gray-400">Across all tests</div>
                  </div>
                  <div className="text-2xl font-bold text-cyan-400">{userStats.averageWpm || 0}</div>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-800/40 rounded-xl">
                  <div>
                    <div className="text-lg font-semibold text-white">Total Time</div>
                    <div className="text-sm text-gray-400">Time spent typing</div>
                  </div>
                  <div className="text-2xl font-bold text-orange-400">{formatTime(userStats.totalTime || 0)}</div>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-800/40 rounded-xl">
                  <div>
                    <div className="text-lg font-semibold text-white">Current Streak</div>
                    <div className="text-sm text-gray-400">Consecutive good tests</div>
                  </div>
                  <div className="text-2xl font-bold text-emerald-400">{userStats.currentStreak || 0}</div>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-800/40 rounded-xl">
                  <div>
                    <div className="text-lg font-semibold text-white">Longest Streak</div>
                    <div className="text-sm text-gray-400">Best streak achieved</div>
                  </div>
                  <div className="text-2xl font-bold text-yellow-400">{userStats.longestStreak || 0}</div>
                </div>
              </div>
            </div>

            {/* Achievements Progress */}
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 animate-slide-in-right">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Achievement Progress
              </h2>

              <div className="space-y-4">
                {[
                  { name: "First Steps", desc: "Complete your first test", progress: userStats.totalTests >= 1 ? 100 : 0, unlocked: userStats.totalTests >= 1 },
                  { name: "Speed Demon", desc: "Reach 60 WPM", progress: Math.min((userStats.bestWpm / 60) * 100, 100), unlocked: userStats.bestWpm >= 60 },
                  { name: "Accuracy Master", desc: "Achieve 95% accuracy", progress: Math.min((userStats.bestAccuracy / 95) * 100, 100), unlocked: userStats.bestAccuracy >= 95 },
                  { name: "Consistent", desc: "Complete 10 tests", progress: Math.min((userStats.totalTests / 10) * 100, 100), unlocked: userStats.totalTests >= 10 },
                  { name: "Perfectionist", desc: "100% accuracy", progress: userStats.bestAccuracy === 100 ? 100 : userStats.bestAccuracy, unlocked: userStats.bestAccuracy === 100 },
                  { name: "Streak Master", desc: "Maintain 5-test streak", progress: Math.min((userStats.longestStreak / 5) * 100, 100), unlocked: userStats.longestStreak >= 5 }
                ].map((achievement, index) => (
                  <div key={achievement.name} className="p-4 bg-gray-800/40 rounded-xl animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{achievement.unlocked ? "🏆" : "🔒"}</span>
                        <div>
                          <div className={`font-semibold ${achievement.unlocked ? "text-white" : "text-gray-400"}`}>
                            {achievement.name}
                          </div>
                          <div className="text-sm text-gray-500">{achievement.desc}</div>
                        </div>
                      </div>
                      {achievement.unlocked && (
                        <div className="text-green-400">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          achievement.unlocked ? "bg-gradient-to-r from-yellow-500 to-orange-500" : "bg-gray-600"
                        }`}
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {achievement.unlocked ? "Completed" : `${Math.round(achievement.progress)}% complete`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Goals Section */}
          <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Goals & Targets
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* WPM Goal */}
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">{userStats.bestWpm || 0}/100</div>
                <div className="text-white font-semibold mb-2">WPM Target</div>
                <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((userStats.bestWpm / 100) * 100, 100)}%` }}
                  />
                </div>
                <div className="text-sm text-gray-400">
                  {userStats.bestWpm >= 100 ? "🎉 Goal Achieved!" : `${100 - (userStats.bestWpm || 0)} WPM to go`}
                </div>
              </div>

              {/* Accuracy Goal */}
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">{userStats.bestAccuracy || 0}/100</div>
                <div className="text-white font-semibold mb-2">Accuracy Target</div>
                <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${userStats.bestAccuracy || 0}%` }}
                  />
                </div>
                <div className="text-sm text-gray-400">
                  {userStats.bestAccuracy >= 100 ? "🎉 Perfect!" : `${100 - (userStats.bestAccuracy || 0)}% to go`}
                </div>
              </div>

              {/* Tests Goal */}
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">{userStats.totalTests || 0}/50</div>
                <div className="text-white font-semibold mb-2">Tests Target</div>
                <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((userStats.totalTests / 50) * 100, 100)}%` }}
                  />
                </div>
                <div className="text-sm text-gray-400">
                  {userStats.totalTests >= 50 ? "🎉 Goal Achieved!" : `${50 - (userStats.totalTests || 0)} tests to go`}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-8">
            <p className="text-gray-400">
              Keep practicing to improve your typing speed and accuracy! 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
