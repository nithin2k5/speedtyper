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
    <div className="relative">
      <button className="w-10 h-10 bg-gray-800/60 hover:bg-gray-700/60 rounded-lg flex items-center justify-center transition-colors duration-200 border border-gray-600/30 group">
        <span className="text-lg">
          {themeOptions.find(t => t.id === currentTheme)?.icon}
        </span>
      </button>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900/90 backdrop-blur-xl text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-gray-700/50">
        {themeOptions.find(t => t.id === currentTheme)?.name}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/90"></div>
      </div>

      {/* Dropdown Menu */}
      <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-xl border border-gray-600/50 rounded-xl shadow-xl opacity-0 invisible hover:opacity-100 hover:visible transition-all duration-200 z-50">
        <div className="p-2">
          <div className="text-xs text-gray-400 font-medium mb-2 px-2">Themes</div>
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
