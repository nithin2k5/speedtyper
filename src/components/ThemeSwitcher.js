"use client";
import { useTheme } from './ThemeProvider';

export function ThemeSwitcher() {
  const { currentTheme, changeTheme, themes } = useTheme();

  const themeOptions = [
    { id: 'dark', name: 'Dark', icon: '🌙', color: 'bg-slate-600' },
    { id: 'cyber', name: 'Cyber', icon: '💚', color: 'bg-green-500' },
    { id: 'purple', name: 'Purple', icon: '💜', color: 'bg-purple-500' },
    { id: 'ocean', name: 'Ocean', icon: '🌊', color: 'bg-cyan-500' },
    { id: 'sunset', name: 'Sunset', icon: '🌅', color: 'bg-orange-500' },
    { id: 'neon', name: 'Neon', icon: '✨', color: 'bg-pink-500' },
    { id: 'forest', name: 'Forest', icon: '🌲', color: 'bg-emerald-500' },
  ];

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800/60 backdrop-blur-sm border border-gray-600/50 rounded-xl hover:bg-gray-700/60 transition-all duration-200">
        <span className="text-lg">
          {themeOptions.find(t => t.id === currentTheme)?.icon}
        </span>
        <span className="text-sm text-gray-300 font-medium">
          {themeOptions.find(t => t.id === currentTheme)?.name}
        </span>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      <div className="absolute top-full mt-2 right-0 w-48 bg-gray-800/95 backdrop-blur-xl border border-gray-600/50 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-2">
          {themeOptions.map((theme) => (
            <button
              key={theme.id}
              onClick={() => changeTheme(theme.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                currentTheme === theme.id
                  ? 'bg-indigo-500/20 border border-indigo-400/30 text-indigo-300'
                  : 'hover:bg-gray-700/50 text-gray-300 hover:text-white'
              }`}
            >
              <span className="text-lg">{theme.icon}</span>
              <span className="text-sm font-medium">{theme.name}</span>
              {currentTheme === theme.id && (
                <div className="ml-auto w-2 h-2 bg-indigo-400 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
