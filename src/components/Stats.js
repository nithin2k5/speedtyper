import { useTheme } from './ThemeProvider';

export function Stats({ timer, wpm, accuracy, mode = 'timed' }) {
  const { theme } = useTheme();

  // Ensure all values are valid numbers
  const displayTimer = isNaN(timer) ? 0 : timer;
  const displayWpm = isNaN(wpm) ? 0 : Math.round(wpm);
  const displayAccuracy = isNaN(accuracy) ? 100 : Math.round(accuracy);

  // For practice mode, show elapsed time instead of countdown
  const getTimeDisplay = () => {
    if (mode === 'practice') {
      // In practice mode, timer is -1, so we'll show a different message
      return 'Practice Mode';
    }
    return displayTimer;
  };

  const getTimeLabel = () => {
    if (mode === 'practice') {
      return 'Unlimited Time';
    }
    return 'Seconds Left';
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Timer Card */}
      <div className="group relative">
        <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300 ${theme.glow}`}></div>
        <div className={`relative ${theme.cardBg} backdrop-blur-xl ${theme.cardBorder} rounded-2xl p-5 sm:p-6 text-center`}>
          <div className="flex items-center justify-center mb-4">
            <div className={`${theme.accentBg} rounded-full ${theme.accentBorder}`}>
              <svg className={`w-6 h-6 ${theme.accentText}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
                 <div className={`text-4xl font-bold ${theme.text} mb-1 font-mono`}>
                   {getTimeDisplay()}
                 </div>
                 <div className={`text-xs ${theme.textMuted} uppercase tracking-wider font-medium`}>
                   {getTimeLabel()}
                 </div>
        </div>
      </div>

      {/* WPM Card */}
      <div className="group relative">
        <div className={`absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300 ${theme.glow}`}></div>
        <div className={`relative ${theme.cardBg} backdrop-blur-xl ${theme.cardBorder} rounded-2xl p-5 sm:p-6 text-center`}>
          <div className="flex items-center justify-center mb-4">
            <div className={`${theme.accentBg} rounded-full ${theme.accentBorder}`}>
              <svg className={`w-6 h-6 ${theme.accentText}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div className={`text-4xl font-bold ${theme.text} mb-1 font-mono`}>
            {displayWpm}
          </div>
          <div className={`text-xs ${theme.textMuted} uppercase tracking-wider font-medium`}>
            Words/Min
          </div>
        </div>
      </div>

      {/* Accuracy Card */}
      <div className="group relative">
        <div className={`absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300 ${theme.glow}`}></div>
        <div className={`relative ${theme.cardBg} backdrop-blur-xl ${theme.cardBorder} rounded-2xl p-5 sm:p-6 text-center`}>
          <div className="flex items-center justify-center mb-4">
            <div className={`${theme.accentBg} rounded-full ${theme.accentBorder}`}>
              <svg className={`w-6 h-6 ${theme.accentText}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className={`text-4xl font-bold ${theme.text} mb-1 font-mono`}>
            {displayAccuracy}
          </div>
          <div className={`text-xs ${theme.textMuted} uppercase tracking-wider font-medium`}>
            Accuracy %
          </div>
        </div>
      </div>
    </div>
  );
} 