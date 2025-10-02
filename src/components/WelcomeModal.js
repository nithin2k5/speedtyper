"use client";
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

export function WelcomeModal({ onClose }) {
  const { theme } = useTheme();
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to SpeedType!",
      content: "Learn to type faster and more accurately with our interactive typing test. This tutorial will show you everything you need to know.",
      icon: "👋"
    },
    {
      title: "How to Start",
      content: "Simply click on the text area and start typing! The timer will begin automatically when you type your first character.",
      icon: "⌨️"
    },
    {
      title: "Test Modes",
      content: "Choose between Timed Test (60 seconds) or Practice Mode (unlimited time). Select difficulty levels from Beginner to Advanced.",
      icon: "🎯"
    },
    {
      title: "Real-time Feedback",
      content: "Watch your WPM (Words Per Minute) and accuracy update in real-time. Green text shows correct typing, red shows errors.",
      icon: "📊"
    },
    {
      title: "Keyboard Tips",
      content: "Use proper finger positioning for better speed. Focus on accuracy first - speed will come naturally with practice.",
      icon: "👆"
    }
  ];

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('speedtype-welcome-seen', 'true');
    }
    onClose();
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900/95 via-blue-900/90 to-purple-900/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6 z-50 animate-fade-in">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-500/15 to-green-500/15 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative group max-w-md sm:max-w-lg w-full animate-bounce-in">
        {/* Enhanced glow effect */}
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 rounded-3xl blur-xl animate-pulse-glow"></div>

        <div className="relative bg-gray-900/90 backdrop-blur-2xl border border-gray-700/50 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
          {/* Glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10"></div>
          {/* Content */}
          <div className="relative text-center mb-8">
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 text-2xl animate-bounce animation-delay-1000">✨</div>
            <div className="absolute -top-2 -right-4 text-xl animate-bounce animation-delay-2000">⭐</div>

            <div className="text-5xl sm:text-6xl mb-6 animate-scale-in">{steps[currentStep].icon}</div>

            {/* Progress indicator */}
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentStep
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 scale-125 animate-pulse'
                        : index < currentStep
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 animate-fade-in">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {steps[currentStep].content}
            </p>
          </div>

          {/* Don't show again checkbox (only on first step) */}
          {currentStep === 0 && (
            <div className="flex items-center justify-center mb-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={dontShowAgain}
                    onChange={(e) => setDontShowAgain(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${
                    dontShowAgain
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 border-purple-500'
                      : 'bg-gray-800 border-gray-600 group-hover:border-purple-400'
                  }`}>
                    {dontShowAgain && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200">
                  Don't show this tutorial again
                </span>
              </label>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between items-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`px-4 sm:px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
                currentStep === 0
                  ? 'bg-gray-800/60 text-gray-500 cursor-not-allowed border border-gray-700/50'
                  : 'bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 hover:text-white border border-gray-600/50 hover:border-gray-500/50 shadow-lg hover:shadow-xl'
              }`}
            >
              <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-500 font-medium">
                {currentStep + 1} of {steps.length}
              </div>
            </div>

            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleClose}
                className="px-4 sm:px-6 py-3 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-400 hover:via-green-400 hover:to-teal-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 animate-pulse-glow"
              >
                Get Started!
                <svg className="w-4 h-4 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:from-purple-400 hover:via-blue-400 hover:to-cyan-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Next
                <svg className="w-4 h-4 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
