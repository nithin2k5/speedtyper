"use client";
import { useState, useEffect } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useTheme } from "./ThemeProvider";

export function ModernHeader() {
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const isActive = (path) => currentPath === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                SpeedTyper
              </h1>
              <p className="text-xs text-gray-400 -mt-1">Master Your Typing</p>
            </div>
            {/* Mobile Logo Text */}
            <div className="sm:hidden">
              <h1 className="text-lg font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                ST
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a
              href="/"
              className={`transition-colors duration-200 font-medium text-sm xl:text-base ${
                isActive("/")
                  ? "text-white bg-white/10 px-3 py-1 rounded-lg"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Practice
            </a>
            <a
              href="/stats"
              className={`transition-colors duration-200 font-medium text-sm xl:text-base ${
                isActive("/stats")
                  ? "text-white bg-white/10 px-3 py-1 rounded-lg"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Stats
            </a>
            <a
              href="/leaderboard"
              className={`transition-colors duration-200 font-medium text-sm xl:text-base ${
                isActive("/leaderboard")
                  ? "text-white bg-white/10 px-3 py-1 rounded-lg"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Leaderboard
            </a>
            <a
              href="/settings"
              className={`transition-colors duration-200 font-medium text-sm xl:text-base ${
                isActive("/settings")
                  ? "text-white bg-white/10 px-3 py-1 rounded-lg"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Settings
            </a>
          </nav>

          {/* User Controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Switcher */}
            <ThemeSwitcher />

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-10 h-10 bg-gray-800/60 hover:bg-gray-700/60 rounded-lg flex items-center justify-center transition-colors duration-200 border border-gray-600/30"
              >
                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-xl py-2 z-50">
                  <a href="/stats" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors duration-200">
                    Profile & Stats
                  </a>
                  <a href="/settings" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors duration-200">
                    Settings
                  </a>
                  <hr className="border-gray-700/50 my-2" />
                  <a href="#" className="block px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-700/50 transition-colors duration-200">
                    Sign Out
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 bg-gray-800/60 hover:bg-gray-700/60 rounded-lg flex items-center justify-center transition-colors duration-200 border border-gray-600/30"
            >
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700/50 pt-4">
            <nav className="flex flex-col space-y-2">
              <a
                href="/"
                className={`transition-colors duration-200 font-medium py-2 ${
                  isActive("/")
                    ? "text-white bg-white/10 px-3 rounded-lg"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Practice
              </a>
              <a
                href="/stats"
                className={`transition-colors duration-200 font-medium py-2 ${
                  isActive("/stats")
                    ? "text-white bg-white/10 px-3 rounded-lg"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Stats
              </a>
              <a
                href="/leaderboard"
                className={`transition-colors duration-200 font-medium py-2 ${
                  isActive("/leaderboard")
                    ? "text-white bg-white/10 px-3 rounded-lg"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Leaderboard
              </a>
              <a
                href="/settings"
                className={`transition-colors duration-200 font-medium py-2 ${
                  isActive("/settings")
                    ? "text-white bg-white/10 px-3 rounded-lg"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Settings
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
