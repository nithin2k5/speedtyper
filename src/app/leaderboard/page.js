"use client";
import { useState, useEffect } from "react";
import { ModernHeader } from "@/components/ModernHeader";
import { useTheme } from "@/components/ThemeProvider";

export default function LeaderboardPage() {
  const { theme } = useTheme();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("wpm");
  const [timeframe, setTimeframe] = useState("all");

  useEffect(() => {
    // Load user stats
    const savedStats = localStorage.getItem('speedtype-user-stats');
    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }

    // Generate sample leaderboard data (in a real app, this would come from an API)
    generateLeaderboardData();
  }, [selectedCategory, timeframe]);

  const generateLeaderboardData = () => {
    // Sample leaderboard data - in a real app, this would be fetched from a backend
    const sampleData = [
      { id: 1, name: "SpeedMaster", wpm: 98, accuracy: 97, tests: 245, country: "🇺🇸", avatar: "🚀" },
      { id: 2, name: "TypeWizard", wpm: 95, accuracy: 99, tests: 189, country: "🇬🇧", avatar: "🧙‍♂️" },
      { id: 3, name: "KeyboardNinja", wpm: 92, accuracy: 96, tests: 312, country: "🇯🇵", avatar: "🥷" },
      { id: 4, name: "SwiftKeys", wpm: 89, accuracy: 98, tests: 156, country: "🇨🇦", avatar: "⚡" },
      { id: 5, name: "TypePro", wpm: 87, accuracy: 95, tests: 278, country: "🇩🇪", avatar: "💎" },
      { id: 6, name: "QuickType", wpm: 85, accuracy: 97, tests: 203, country: "🇫🇷", avatar: "🎯" },
      { id: 7, name: "KeyMaster", wpm: 83, accuracy: 96, tests: 167, country: "🇦🇺", avatar: "🏆" },
      { id: 8, name: "SpeedDemon", wpm: 81, accuracy: 94, tests: 134, country: "🇧🇷", avatar: "🔥" },
      { id: 9, name: "TypeQueen", wpm: 79, accuracy: 98, tests: 198, country: "🇸🇪", avatar: "👑" },
      { id: 10, name: "RapidKeys", wpm: 77, accuracy: 95, tests: 145, country: "🇮🇹", avatar: "🚀" },
      // Add current user if they have stats
      ...(userStats && userStats.totalTests > 0 ? [{
        id: 999,
        name: "You",
        wpm: userStats.bestWpm || 0,
        accuracy: userStats.bestAccuracy || 0,
        tests: userStats.totalTests || 0,
        country: "🏠",
        avatar: "👤",
        isCurrentUser: true
      }] : [])
    ];

    // Sort based on selected category
    const sorted = [...sampleData].sort((a, b) => {
      switch (selectedCategory) {
        case "wpm":
          return b.wpm - a.wpm;
        case "accuracy":
          return b.accuracy - a.accuracy;
        case "tests":
          return b.tests - a.tests;
        default:
          return 0;
      }
    });

    // Add rankings
    sorted.forEach((user, index) => {
      user.rank = index + 1;
    });

    setLeaderboardData(sorted);
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return "text-yellow-400";
      case 2:
        return "text-gray-300";
      case 3:
        return "text-orange-400";
      default:
        return "text-gray-400";
    }
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
        {Array.from({ length: 30 }, (_, i) => ({
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
              🏆 Global Leaderboard
            </h1>
            <p className="text-gray-400 text-lg">
              See how you rank against typists from around the world
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory("wpm")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  selectedCategory === "wpm"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "bg-gray-800/60 text-gray-300 hover:bg-gray-700/60"
                }`}
              >
                WPM
              </button>
              <button
                onClick={() => setSelectedCategory("accuracy")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  selectedCategory === "accuracy"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                    : "bg-gray-800/60 text-gray-300 hover:bg-gray-700/60"
                }`}
              >
                Accuracy
              </button>
              <button
                onClick={() => setSelectedCategory("tests")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  selectedCategory === "tests"
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                    : "bg-gray-800/60 text-gray-300 hover:bg-gray-700/60"
                }`}
              >
                Tests
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setTimeframe("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  timeframe === "all"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "bg-gray-800/60 text-gray-300 hover:bg-gray-700/60"
                }`}
              >
                All Time
              </button>
              <button
                onClick={() => setTimeframe("month")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  timeframe === "month"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                    : "bg-gray-800/60 text-gray-300 hover:bg-gray-700/60"
                }`}
              >
                This Month
              </button>
            </div>
          </div>

          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in-up">
            {leaderboardData.slice(0, 3).map((user, index) => {
              const position = index + 1;
              const heights = ["h-32", "h-40", "h-28"]; // Different heights for podium effect

              return (
                <div
                  key={user.id}
                  className={`bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 text-center hover-lift animate-scale-in ${heights[index]}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex flex-col items-center">
                    <div className="text-6xl mb-4">{user.avatar}</div>
                    <div className={`text-4xl font-bold mb-2 ${getRankColor(position)}`}>
                      {getRankIcon(position)}
                    </div>
                    <div className="text-xl font-bold text-white mb-1">{user.name}</div>
                    <div className="text-lg text-gray-400 mb-4">{user.country}</div>

                    <div className="space-y-2 w-full">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">WPM:</span>
                        <span className="font-semibold text-blue-400">{user.wpm}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Accuracy:</span>
                        <span className="font-semibold text-green-400">{user.accuracy}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Tests:</span>
                        <span className="font-semibold text-purple-400">{user.tests}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full Leaderboard */}
          <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden animate-slide-in-up">
            <div className="p-6 border-b border-gray-700/50">
              <h2 className="text-2xl font-bold text-white">
                {selectedCategory === "wpm" && "Top Typists by WPM"}
                {selectedCategory === "accuracy" && "Most Accurate Typists"}
                {selectedCategory === "tests" && "Most Dedicated Typists"}
              </h2>
            </div>

            <div className="divide-y divide-gray-700/30">
              {leaderboardData.map((user, index) => (
                <div
                  key={user.id}
                  className={`p-6 hover:bg-gray-800/30 transition-all duration-200 ${
                    user.isCurrentUser ? "bg-blue-900/20 border-l-4 border-blue-500" : ""
                  } ${index < 3 ? "bg-gradient-to-r from-yellow-500/5 to-transparent" : ""} animate-fade-in`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`text-xl font-bold w-8 ${getRankColor(user.rank)}`}>
                        {user.isCurrentUser ? "🏠" : getRankIcon(user.rank)}
                      </div>

                      <div className="text-3xl">{user.avatar}</div>

                      <div>
                        <div className={`font-semibold text-lg ${user.isCurrentUser ? "text-blue-400" : "text-white"}`}>
                          {user.name} {user.isCurrentUser && "(You)"}
                        </div>
                        <div className="text-gray-400 text-sm">{user.country}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{user.wpm}</div>
                        <div className="text-xs text-gray-400">WPM</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{user.accuracy}%</div>
                        <div className="text-xs text-gray-400">Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{user.tests}</div>
                        <div className="text-xs text-gray-400">Tests</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Your Ranking Card */}
          {userStats && userStats.totalTests > 0 && (
            <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30 animate-bounce-in">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-4">Your Global Ranking</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      {leaderboardData.find(user => user.isCurrentUser)?.rank || "Unranked"}
                    </div>
                    <div className="text-gray-300">Current Rank</div>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {userStats.bestWpm || 0}
                    </div>
                    <div className="text-gray-300">Your Best WPM</div>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">
                      {userStats.bestAccuracy ? `${userStats.bestAccuracy}%` : "0%"}
                    </div>
                    <div className="text-gray-300">Your Best Accuracy</div>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-gray-400">
                    Keep practicing to climb the leaderboard! 💪
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center py-8">
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 animate-fade-in">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Climb the Ranks?</h3>
              <p className="text-gray-400 mb-6">
                Take a typing test now and see how you stack up against the global community!
              </p>
              <a
                href="/"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Start Typing Test
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
