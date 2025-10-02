"use client";
import { useState, useEffect } from "react";
import { ModernHeader } from "@/components/ModernHeader";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useTheme } from "@/components/ThemeProvider";

export default function SettingsPage() {
  const { theme, currentTheme, changeTheme } = useTheme();
  const [settings, setSettings] = useState({
    soundEnabled: true,
    keyboardHints: true,
    showWPM: true,
    showAccuracy: true,
    autoSave: true,
    difficulty: "beginner",
    testDuration: 60,
    theme: currentTheme
  });

  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('speedtype-settings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(prev => ({ ...prev, ...parsed }));
    }
  }, []);

  useEffect(() => {
    // Save settings to localStorage whenever they change
    localStorage.setItem('speedtype-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    const defaultSettings = {
      soundEnabled: true,
      keyboardHints: true,
      showWPM: true,
      showAccuracy: true,
      autoSave: true,
      difficulty: "beginner",
      testDuration: 60,
      theme: "dark"
    };
    setSettings(defaultSettings);
    localStorage.setItem('speedtype-settings', JSON.stringify(defaultSettings));
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = 'speedtyper-settings.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const tabs = [
    { id: "general", label: "General", icon: "⚙️" },
    { id: "appearance", label: "Appearance", icon: "🎨" },
    { id: "typing", label: "Typing", icon: "⌨️" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "data", label: "Data & Privacy", icon: "🔒" }
  ];

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

      <div className="relative z-10 pt-20 p-6 max-w-6xl mx-auto">
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
              ⚙️ Settings
            </h1>
            <p className="text-gray-400 text-lg">
              Customize your typing experience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50 animate-slide-in-left">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30"
                          : "text-gray-300 hover:bg-gray-800/40 hover:text-white"
                      }`}
                    >
                      <span className="text-xl">{tab.icon}</span>
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 animate-slide-in-right">
                {/* General Settings */}
                {activeTab === "general" && (
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">General Settings</h2>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-gray-800/40 rounded-xl">
                        <div>
                          <div className="text-lg font-semibold text-white">Auto-save Progress</div>
                          <div className="text-sm text-gray-400">Automatically save your typing progress</div>
                        </div>
                        <button
                          onClick={() => updateSetting('autoSave', !settings.autoSave)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                            settings.autoSave ? 'bg-blue-600' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                              settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-800/40 rounded-xl">
                        <div>
                          <div className="text-lg font-semibold text-white">Default Difficulty</div>
                          <div className="text-sm text-gray-400">Choose your preferred difficulty level</div>
                        </div>
                        <select
                          value={settings.difficulty}
                          onChange={(e) => updateSetting('difficulty', e.target.value)}
                          className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-800/40 rounded-xl">
                        <div>
                          <div className="text-lg font-semibold text-white">Test Duration</div>
                          <div className="text-sm text-gray-400">Default time limit for timed tests (seconds)</div>
                        </div>
                        <select
                          value={settings.testDuration}
                          onChange={(e) => updateSetting('testDuration', parseInt(e.target.value))}
                          className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value={30}>30 seconds</option>
                          <option value={60}>60 seconds</option>
                          <option value={120}>2 minutes</option>
                          <option value={300}>5 minutes</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Appearance Settings */}
                {activeTab === "appearance" && (
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Appearance Settings</h2>

                    <div className="space-y-6">
                      <div className="p-4 bg-gray-800/40 rounded-xl">
                        <div className="text-lg font-semibold text-white mb-4">Theme Selection</div>
                        <div className="text-sm text-gray-400 mb-4">
                          Choose your preferred color theme
                        </div>
                        <ThemeSwitcher />
                      </div>

                      <div className="p-4 bg-gray-800/40 rounded-xl">
                        <div className="text-lg font-semibold text-white mb-4">Background Effects</div>
                        <div className="text-sm text-gray-400 mb-4">
                          Customize the visual effects and animations
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Floating Particles</span>
                            <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg">
                              Enabled
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Background Gradients</span>
                            <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg">
                              Enabled
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Smooth Animations</span>
                            <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg">
                              Enabled
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Typing Settings */}
                {activeTab === "typing" && (
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Typing Preferences</h2>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-gray-800/40 rounded-xl">
                        <div>
                          <div className="text-lg font-semibold text-white">Keyboard Hints</div>
                          <div className="text-sm text-gray-400">Show next character hints for beginners</div>
                        </div>
                        <button
                          onClick={() => updateSetting('keyboardHints', !settings.keyboardHints)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                            settings.keyboardHints ? 'bg-green-600' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                              settings.keyboardHints ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-800/40 rounded-xl">
                        <div>
                          <div className="text-lg font-semibold text-white">Show Live WPM</div>
                          <div className="text-sm text-gray-400">Display real-time WPM during typing</div>
                        </div>
                        <button
                          onClick={() => updateSetting('showWPM', !settings.showWPM)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                            settings.showWPM ? 'bg-blue-600' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                              settings.showWPM ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-800/40 rounded-xl">
                        <div>
                          <div className="text-lg font-semibold text-white">Show Live Accuracy</div>
                          <div className="text-sm text-gray-400">Display real-time accuracy during typing</div>
                        </div>
                        <button
                          onClick={() => updateSetting('showAccuracy', !settings.showAccuracy)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                            settings.showAccuracy ? 'bg-green-600' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                              settings.showAccuracy ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="p-4 bg-gray-800/40 rounded-xl">
                        <div className="text-lg font-semibold text-white mb-4">Typing Test Options</div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Highlight Errors</span>
                            <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg">
                              Enabled
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Show Progress Bar</span>
                            <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg">
                              Enabled
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Sound Effects</span>
                            <button
                              onClick={() => updateSetting('soundEnabled', !settings.soundEnabled)}
                              className={`px-3 py-1 text-sm rounded-lg ${
                                settings.soundEnabled ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'
                              }`}
                            >
                              {settings.soundEnabled ? 'Enabled' : 'Disabled'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Settings */}
                {activeTab === "notifications" && (
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Notifications & Alerts</h2>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-gray-800/40 rounded-xl">
                        <div>
                          <div className="text-lg font-semibold text-white">Test Completion Alerts</div>
                          <div className="text-sm text-gray-400">Get notified when you finish a typing test</div>
                        </div>
                        <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg">
                          Enabled
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-800/40 rounded-xl">
                        <div>
                          <div className="text-lg font-semibold text-white">Achievement Unlocks</div>
                          <div className="text-sm text-gray-400">Celebrate when you unlock new achievements</div>
                        </div>
                        <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg">
                          Enabled
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-800/40 rounded-xl">
                        <div>
                          <div className="text-lg font-semibold text-white">Personal Best Records</div>
                          <div className="text-sm text-gray-400">Get notified when you beat your records</div>
                        </div>
                        <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg">
                          Enabled
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-800/40 rounded-xl">
                        <div>
                          <div className="text-lg font-semibold text-white">Weekly Progress Reports</div>
                          <div className="text-sm text-gray-400">Receive weekly summaries of your progress</div>
                        </div>
                        <button className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-lg">
                          Weekly
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Data & Privacy Settings */}
                {activeTab === "data" && (
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Data & Privacy</h2>

                    <div className="space-y-6">
                      <div className="p-4 bg-gray-800/40 rounded-xl">
                        <div className="text-lg font-semibold text-white mb-4">Data Storage</div>
                        <div className="text-sm text-gray-400 mb-4">
                          Your typing data is stored locally on your device. No personal information is sent to external servers.
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Local Storage</span>
                            <span className="text-green-400 text-sm">Active</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Data Synchronization</span>
                            <span className="text-gray-500 text-sm">Not Connected</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-800/40 rounded-xl">
                        <div className="text-lg font-semibold text-white mb-4">Data Management</div>
                        <div className="space-y-3">
                          <button
                            onClick={exportSettings}
                            className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
                          >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Export Settings
                          </button>

                          <button
                            onClick={() => {
                              const confirmed = confirm('Are you sure you want to reset all settings to default? This action cannot be undone.');
                              if (confirmed) resetSettings();
                            }}
                            className="w-full flex items-center justify-center px-4 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-colors duration-200"
                          >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Reset to Defaults
                          </button>

                          <button
                            onClick={() => {
                              const confirmed = confirm('Are you sure you want to clear all typing data? This includes your statistics, achievements, and progress. This action cannot be undone.');
                              if (confirmed) {
                                localStorage.removeItem('speedtype-user-stats');
                                localStorage.removeItem('speedtype-settings');
                                alert('All data has been cleared. The page will reload.');
                                window.location.reload();
                              }
                            }}
                            className="w-full flex items-center justify-center px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200"
                          >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Clear All Data
                          </button>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-800/40 rounded-xl">
                        <div className="text-lg font-semibold text-white mb-4">Privacy Information</div>
                        <div className="text-sm text-gray-400 space-y-2">
                          <p>• All data is stored locally on your device</p>
                          <p>• No personal information is collected or transmitted</p>
                          <p>• Typing statistics are for personal progress tracking only</p>
                          <p>• You can export or delete your data at any time</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-8">
            <p className="text-gray-400">
              Settings are automatically saved to your browser's local storage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
