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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 z-50">
      <div className="relative group max-w-lg w-full">
        <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-30 animate-pulse ${theme.glow}`}></div>

        <div className={`relative ${theme.cardBg} backdrop-blur-2xl ${theme.cardBorder} rounded-3xl p-8 shadow-2xl`}>
          {/* Progress indicator */}
          <div className="flex justify-center mb-6">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentStep
                      ? 'bg-indigo-500 scale-125'
                      : index < currentStep
                      ? 'bg-green-500'
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{steps[currentStep].icon}</div>
            <h2 className={`text-2xl font-bold ${theme.text} mb-4`}>
              {steps[currentStep].title}
            </h2>
            <p className={`${theme.textSecondary} leading-relaxed`}>
              {steps[currentStep].content}
            </p>
          </div>

          {/* Don't show again checkbox (only on first step) */}
          {currentStep === 0 && (
            <div className="flex items-center justify-center mb-6">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className={`text-sm ${theme.textSecondary}`}>
                  Don't show this tutorial again
                </span>
              </label>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                currentStep === 0
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : `bg-gray-700 hover:bg-gray-600 ${theme.text} hover:scale-105`
              }`}
            >
              Previous
            </button>

            <div className="text-sm text-gray-500">
              {currentStep + 1} of {steps.length}
            </div>

            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleClose}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Get Started!
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
