"use client";
import { useTheme } from './ThemeProvider';

export function Achievements({ userStats }) {
  const { theme } = useTheme();

  const achievements = [
    {
      id: 'first_test',
      title: 'Getting Started',
      description: 'Complete your first typing test',
      icon: '🎯',
      condition: userStats.totalTests >= 1,
      reward: 'Beginner Badge'
    },
    {
      id: 'speed_demon',
      title: 'Speed Demon',
      description: 'Reach 50 WPM',
      icon: '⚡',
      condition: userStats.bestWpm >= 50,
      reward: 'Speed Badge'
    },
    {
      id: 'accuracy_master',
      title: 'Accuracy Master',
      description: 'Achieve 95% accuracy',
      icon: '🎯',
      condition: userStats.bestAccuracy >= 95,
      reward: 'Precision Badge'
    },
    {
      id: 'practice_warrior',
      title: 'Practice Warrior',
      description: 'Complete 10 tests',
      icon: '💪',
      condition: userStats.totalTests >= 10,
      reward: 'Dedication Badge'
    },
    {
      id: 'marathon_runner',
      title: 'Marathon Runner',
      description: 'Type for 30 minutes total',
      icon: '🏃',
      condition: userStats.totalTimeTyped >= 1800, // 30 minutes in seconds
      reward: 'Endurance Badge'
    },
    {
      id: 'perfectionist',
      title: 'Perfectionist',
      description: 'Complete a test with 100% accuracy',
      icon: '💎',
      condition: userStats.bestAccuracy >= 100,
      reward: 'Perfection Badge'
    },
    {
      id: 'speedster',
      title: 'Speedster',
      description: 'Reach 80 WPM',
      icon: '🚀',
      condition: userStats.bestWpm >= 80,
      reward: 'Velocity Badge'
    },
    {
      id: 'consistent',
      title: 'Consistent',
      description: 'Complete 25 tests',
      icon: '📈',
      condition: userStats.totalTests >= 25,
      reward: 'Consistency Badge'
    }
  ];

  const earnedAchievements = achievements.filter(achievement => achievement.condition);
  const totalAchievements = achievements.length;
  const earnedCount = earnedAchievements.length;

  return (
    <div className={`p-6 ${theme.cardBg} ${theme.cardBorder} rounded-2xl`}>
      <div className="text-center mb-6">
        <h3 className={`text-xl font-bold ${theme.text} mb-2`}>🏆 Achievements</h3>
        <p className={`${theme.textSecondary} text-sm`}>
          {earnedCount} of {totalAchievements} unlocked
        </p>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(earnedCount / totalAchievements) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-4 rounded-xl border transition-all duration-200 ${
              achievement.condition
                ? `${theme.cardBorder} bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-400/50`
                : `bg-gray-800/50 border-gray-700/50 ${theme.cardBorder}`
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`text-2xl ${achievement.condition ? '' : 'grayscale opacity-50'}`}>
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h4 className={`font-semibold ${theme.text} ${
                  achievement.condition ? '' : 'opacity-50'
                }`}>
                  {achievement.title}
                </h4>
                <p className={`text-sm ${theme.textSecondary} ${
                  achievement.condition ? '' : 'opacity-50'
                }`}>
                  {achievement.description}
                </p>
                {achievement.condition && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                      {achievement.reward}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {earnedCount === 0 && (
        <div className="text-center mt-6 p-4 bg-blue-500/10 border border-blue-400/30 rounded-xl">
          <p className={`${theme.textSecondary} text-sm`}>
            Start typing to unlock your first achievement! 🎯
          </p>
        </div>
      )}
    </div>
  );
}
