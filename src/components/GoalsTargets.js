"use client";
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

export function GoalsTargets({ userStats, onGoalUpdate }) {
  const { theme } = useTheme();
  const [goals, setGoals] = useState({
    wpmGoal: 40,
    accuracyGoal: 95,
    testsGoal: 10
  });
  const [isEditing, setIsEditing] = useState(false);

  // Load goals from localStorage
  useEffect(() => {
    const savedGoals = localStorage.getItem('speedtype-goals');
    if (savedGoals) {
      try {
        setGoals(JSON.parse(savedGoals));
      } catch (error) {
        console.error('Error loading goals:', error);
      }
    }
  }, []);

  const saveGoals = (newGoals) => {
    localStorage.setItem('speedtype-goals', JSON.stringify(newGoals));
    setGoals(newGoals);
    onGoalUpdate && onGoalUpdate(newGoals);
  };

  const handleGoalChange = (key, value) => {
    const numValue = parseInt(value) || 0;
    const newGoals = { ...goals, [key]: numValue };
    setGoals(newGoals);
  };

  const saveGoalsChanges = () => {
    saveGoals(goals);
    setIsEditing(false);
  };

  const resetGoals = () => {
    const defaultGoals = { wpmGoal: 40, accuracyGoal: 95, testsGoal: 10 };
    setGoals(defaultGoals);
    saveGoals(defaultGoals);
  };

  // Calculate progress percentages
  const wpmProgress = Math.min((userStats.bestWpm / goals.wpmGoal) * 100, 100);
  const accuracyProgress = Math.min((userStats.bestAccuracy / goals.accuracyGoal) * 100, 100);
  const testsProgress = Math.min((userStats.totalTests / goals.testsGoal) * 100, 100);

  return (
    <div className={`p-6 ${theme.cardBg} ${theme.cardBorder} rounded-2xl`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-xl font-bold ${theme.text} mb-2`}>🎯 Goals & Targets</h3>
          <p className={`${theme.textSecondary} text-sm`}>
            Set and track your typing improvement goals
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            isEditing
              ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
              : 'bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30'
          }`}
        >
          {isEditing ? 'Cancel' : 'Edit Goals'}
        </button>
      </div>

      <div className="space-y-6">
        {/* WPM Goal */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <span className="text-lg">⚡</span>
              <div>
                <div className={`font-semibold ${theme.text}`}>WPM Goal</div>
                <div className={`text-sm ${theme.textSecondary}`}>
                  Current: {userStats.bestWpm} WPM
                </div>
              </div>
            </div>
            {isEditing ? (
              <input
                type="number"
                value={goals.wpmGoal}
                onChange={(e) => handleGoalChange('wpmGoal', e.target.value)}
                className={`w-20 px-3 py-1 ${theme.inputBg} ${theme.inputBorder} rounded text-center ${theme.text}`}
                min="10"
                max="200"
              />
            ) : (
              <span className={`text-lg font-bold ${theme.text}`}>
                {goals.wpmGoal} WPM
              </span>
            )}
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${wpmProgress}%` }}
            ></div>
          </div>
          <div className={`text-xs ${theme.textSecondary} mt-1 text-right`}>
            {Math.round(wpmProgress)}% complete
          </div>
        </div>

        {/* Accuracy Goal */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <span className="text-lg">🎯</span>
              <div>
                <div className={`font-semibold ${theme.text}`}>Accuracy Goal</div>
                <div className={`text-sm ${theme.textSecondary}`}>
                  Current: {userStats.bestAccuracy}%
                </div>
              </div>
            </div>
            {isEditing ? (
              <input
                type="number"
                value={goals.accuracyGoal}
                onChange={(e) => handleGoalChange('accuracyGoal', e.target.value)}
                className={`w-20 px-3 py-1 ${theme.inputBg} ${theme.inputBorder} rounded text-center ${theme.text}`}
                min="50"
                max="100"
              />
            ) : (
              <span className={`text-lg font-bold ${theme.text}`}>
                {goals.accuracyGoal}%
              </span>
            )}
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${accuracyProgress}%` }}
            ></div>
          </div>
          <div className={`text-xs ${theme.textSecondary} mt-1 text-right`}>
            {Math.round(accuracyProgress)}% complete
          </div>
        </div>

        {/* Tests Goal */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <span className="text-lg">📊</span>
              <div>
                <div className={`font-semibold ${theme.text}`}>Practice Goal</div>
                <div className={`text-sm ${theme.textSecondary}`}>
                  Current: {userStats.totalTests} tests
                </div>
              </div>
            </div>
            {isEditing ? (
              <input
                type="number"
                value={goals.testsGoal}
                onChange={(e) => handleGoalChange('testsGoal', e.target.value)}
                className={`w-20 px-3 py-1 ${theme.inputBg} ${theme.inputBorder} rounded text-center ${theme.text}`}
                min="5"
                max="1000"
              />
            ) : (
              <span className={`text-lg font-bold ${theme.text}`}>
                {goals.testsGoal} tests
              </span>
            )}
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${testsProgress}%` }}
            ></div>
          </div>
          <div className={`text-xs ${theme.textSecondary} mt-1 text-right`}>
            {Math.round(testsProgress)}% complete
          </div>
        </div>

        {/* Goal Achievement Messages */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {wpmProgress >= 100 && (
            <div className="p-3 bg-blue-500/10 border border-blue-400/30 rounded-lg text-center">
              <div className="text-2xl mb-1">🏆</div>
              <div className={`text-sm font-medium ${theme.text}`}>WPM Goal Achieved!</div>
            </div>
          )}
          {accuracyProgress >= 100 && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-400/30 rounded-lg text-center">
              <div className="text-2xl mb-1">💎</div>
              <div className={`text-sm font-medium ${theme.text}`}>Accuracy Goal Achieved!</div>
            </div>
          )}
          {testsProgress >= 100 && (
            <div className="p-3 bg-purple-500/10 border border-purple-400/30 rounded-lg text-center">
              <div className="text-2xl mb-1">🎉</div>
              <div className={`text-sm font-medium ${theme.text}`}>Practice Goal Achieved!</div>
            </div>
          )}
        </div>

        {/* Edit Mode Actions */}
        {isEditing && (
          <div className="flex justify-between items-center pt-4 border-t border-gray-700">
            <button
              onClick={resetGoals}
              className={`px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm font-medium transition-colors duration-200`}
            >
              Reset to Default
            </button>
            <div className="space-x-3">
              <button
                onClick={() => setIsEditing(false)}
                className={`px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm font-medium transition-colors duration-200`}
              >
                Cancel
              </button>
              <button
                onClick={saveGoalsChanges}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg text-sm font-medium transition-all duration-200"
              >
                Save Goals
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
