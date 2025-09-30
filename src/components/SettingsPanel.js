"use client";
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

export function SettingsPanel({ onClose }) {
  const { theme, setTheme, currentTheme, themes } = useTheme();
  const [settings, setSettings] = useState({
    fontSize: 'medium',
    soundEnabled: true,
    keyboardHints: true,
    autoAdvance: false,
    showWpm: true,
    showAccuracy: true,
    theme: currentTheme
  });

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('speedtype-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = (newSettings) => {
    localStorage.setItem('speedtype-settings', JSON.stringify(newSettings));
    setSettings(newSettings);
  };

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    saveSettings(newSettings);

    // Handle theme change immediately
    if (key === 'theme') {
      setTheme(value);
    }
  };

  const fontSizes = [
    { value: 'small', label: 'Small', class: 'text-sm' },
    { value: 'medium', label: 'Medium', class: 'text-base' },
    { value: 'large', label: 'Large', class: 'text-lg' },
    { value: 'xlarge', label: 'Extra Large', class: 'text-xl' }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 z-50">
      <div className="relative group max-w-2xl w-full">
        <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-30 animate-pulse ${theme.glow}`}></div>

        <div className={`relative ${theme.cardBg} backdrop-blur-2xl ${theme.cardBorder} rounded-3xl p-8 shadow-2xl`}>
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">⚙️</div>
            <h2 className={`text-3xl font-bold ${theme.text} mb-2`}>Settings</h2>
            <p className={`${theme.textSecondary}`}>
              Customize your typing experience
            </p>
          </div>

          <div className="space-y-8">
            {/* Theme Selection */}
            <div>
              <h3 className={`text-lg font-semibold ${theme.text} mb-4`}>🎨 Theme</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(themes).map(([key, themeData]) => (
                  <button
                    key={key}
                    onClick={() => handleSettingChange('theme', key)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      settings.theme === key
                        ? 'border-indigo-400 bg-indigo-500/20'
                        : `${theme.cardBorder} hover:bg-gray-700/50`
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{themeData.name === 'Dark' ? '🌙' : themeData.name === 'Light' ? '☀️' : themeData.name === 'Cyber' ? '💚' : themeData.name === 'Purple' ? '💜' : themeData.name === 'Ocean' ? '🌊' : themeData.name === 'Sunset' ? '🌅' : themeData.name === 'Neon' ? '✨' : '🌲'}</div>
                      <div className={`text-sm font-medium ${theme.text}`}>
                        {themeData.name}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div>
              <h3 className={`text-lg font-semibold ${theme.text} mb-4`}>📝 Font Size</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {fontSizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => handleSettingChange('fontSize', size.value)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      settings.fontSize === size.value
                        ? 'border-indigo-400 bg-indigo-500/20'
                        : `${theme.cardBorder} hover:bg-gray-700/50`
                    }`}
                  >
                    <div className="text-center">
                      <div className={`${size.class} font-medium ${theme.text} mb-1`}>
                        Aa
                      </div>
                      <div className={`text-xs ${theme.textSecondary}`}>
                        {size.label}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Display Options */}
            <div>
              <h3 className={`text-lg font-semibold ${theme.text} mb-4`}>👁️ Display Options</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-medium ${theme.text}`}>Show WPM</div>
                    <div className={`text-sm ${theme.textSecondary}`}>Display words per minute counter</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.showWpm}
                      onChange={(e) => handleSettingChange('showWpm', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-medium ${theme.text}`}>Show Accuracy</div>
                    <div className={`text-sm ${theme.textSecondary}`}>Display accuracy percentage</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.showAccuracy}
                      onChange={(e) => handleSettingChange('showAccuracy', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-medium ${theme.text}`}>Keyboard Hints</div>
                    <div className={`text-sm ${theme.textSecondary}`}>Show next character hint before typing</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.keyboardHints}
                      onChange={(e) => handleSettingChange('keyboardHints', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-medium ${theme.text}`}>Auto Advance</div>
                    <div className={`text-sm ${theme.textSecondary}`}>Automatically advance to next test</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoAdvance}
                      onChange={(e) => handleSettingChange('autoAdvance', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Sound Settings */}
            <div>
              <h3 className={`text-lg font-semibold ${theme.text} mb-4`}>🔊 Sound Effects</h3>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`font-medium ${theme.text}`}>Enable Sounds</div>
                  <div className={`text-sm ${theme.textSecondary}`}>Play sound effects for typing and completion</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.soundEnabled}
                    onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center mt-8">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
