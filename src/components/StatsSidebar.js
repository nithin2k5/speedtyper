"use client";
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

export function StatsSidebar() {
  const { theme } = useTheme();
  const [userStats, setUserStats] = useState({
    totalTests: 0,
    bestWpm: 0,
    bestAccuracy: 0,
    averageWpm: 0,
    totalTime: 0,
    currentStreak: 0,
    longestStreak: 0
  });

  useEffect(() => {
    // Load stats from localStorage
    const savedStats = localStorage.getItem('speedtype-user-stats');
    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }
  }, []);

  const achievements = [
    { id: 1, name: "First Steps", description: "Complete your first test", unlocked: userStats.totalTests > 0, icon: "🎯" },
    { id: 2, name: "Speed Demon", description: "Reach 60 WPM", unlocked: userStats.bestWpm >= 60, icon: "⚡" },
    { id: 3, name: "Accuracy Master", description: "Achieve 95% accuracy", unlocked: userStats.bestAccuracy >= 95, icon: "🎯" },
    { id: 4, name: "Consistent", description: "Complete 10 tests", unlocked: userStats.totalTests >= 10, icon: "🔥" },
    { id: 5, name: "Perfectionist", description: "100% accuracy in a test", unlocked: userStats.bestAccuracy === 100, icon: "💎" },
    { id: 6, name: "Streak Master", description: "Maintain a 5-test streak", unlocked: userStats.longestStreak >= 5, icon: "🔥" }
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked).slice(0, 3);

  return (
    <div className="flex flex-col h-full overflow-hidden animate-slide-in-right">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/50 animate-fade-in">
        <h2 className="text-xl font-bold text-white mb-2">Your Progress</h2>
        <p className="text-gray-400 text-sm">Track your typing journey</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {/* Current Session Stats */}
        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/30 hover-lift animate-scale-in">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Current Session
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">0</div>
              <div className="text-xs text-gray-400">WPM</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">0%</div>
              <div className="text-xs text-gray-400">Accuracy</div>
            </div>
          </div>
        </div>

        {/* Personal Best */}
        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/30 hover-lift animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Personal Best
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Best WPM:</span>
              <span className="font-semibold text-yellow-400">{userStats.bestWpm || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Best Accuracy:</span>
              <span className="font-semibold text-yellow-400">{userStats.bestAccuracy ? `${userStats.bestAccuracy}%` : 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Avg WPM:</span>
              <span className="font-semibold text-white">{userStats.averageWpm || 0}</span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/30 hover-lift animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Statistics
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Total Tests:</span>
              <span className="font-semibold text-white">{userStats.totalTests}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Total Time:</span>
              <span className="font-semibold text-white">{Math.round(userStats.totalTime / 60)}m</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Current Streak:</span>
              <span className="font-semibold text-orange-400">{userStats.currentStreak}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Best Streak:</span>
              <span className="font-semibold text-orange-400">{userStats.longestStreak}</span>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/30 hover-lift animate-scale-in" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Achievements
          </h3>

          {/* Unlocked Achievements */}
          {unlockedAchievements.length > 0 && (
            <div className="space-y-3 mb-4">
              <h4 className="text-sm font-medium text-emerald-400 mb-2">Unlocked</h4>
              {unlockedAchievements.map(achievement => (
                <div key={achievement.id} className="flex items-center space-x-3 p-2 bg-emerald-900/20 rounded-lg border border-emerald-500/20">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <div className="font-medium text-white text-sm">{achievement.name}</div>
                    <div className="text-xs text-gray-400">{achievement.description}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Locked Achievements */}
          {lockedAchievements.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Locked</h4>
              {lockedAchievements.map(achievement => (
                <div key={achievement.id} className="flex items-center space-x-3 p-2 bg-gray-800/40 rounded-lg border border-gray-600/30 opacity-60">
                  <span className="text-2xl">🔒</span>
                  <div>
                    <div className="font-medium text-gray-400 text-sm">{achievement.name}</div>
                    <div className="text-xs text-gray-500">{achievement.description}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Goals/Targets */}
        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/30 hover-lift animate-scale-in" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Goals
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">WPM Target (60)</span>
                <span className="text-cyan-400">{userStats.bestWpm}/60</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((userStats.bestWpm / 60) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">Accuracy Target (95%)</span>
                <span className="text-cyan-400">{userStats.bestAccuracy}%/95%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((userStats.bestAccuracy / 95) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">Test Count (25)</span>
                <span className="text-cyan-400">{userStats.totalTests}/25</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((userStats.totalTests / 25) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
