"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useTheme } from "./ThemeProvider";

const TIMER_DURATION = 60;

// Beginner-friendly text collections - much simpler and shorter
const TEXT_COLLECTIONS = {
  beginner: [
    "The cat sat on the mat. The dog ran in the park. Birds fly in the sky. Fish swim in the sea.",
    "I like to eat apples. She likes to eat pears. He likes to eat grapes. We like to eat fruit.",
    "The sun is hot. The moon is cool. The stars are bright. The sky is blue.",
    "Red is my favorite color. Blue is nice too. Green makes me happy. Yellow is fun.",
    "I can run fast. She can jump high. He can swim well. We can play games.",
    "The house is big. The car is red. The tree is tall. The flower is pretty.",
    "I have a pen. She has a book. He has a ball. We have toys.",
    "One two three four. Five six seven eight. Nine ten eleven twelve.",
    "A B C D E F G. H I J K L M N O P. Q R S T U V W X Y Z.",
    "My name is Sam. Her name is Pam. His name is Tom. Our names are fun.",
    "I like hot dogs. She likes ice cream. He likes pizza. We like food.",
    "The clock is on the wall. The chair is by the door. The lamp is on the desk."
  ],
  intermediate: [
    "The computer helps us work faster and more efficiently every day. The phone lets us talk to people anywhere in the world instantly. The internet connects everyone together and shares information globally. Technology makes life easier and opens up new possibilities for everyone.",
    "Learning new skills is always fun and rewarding when you put in the effort. Practice makes you better at any task if you stay consistent over time. Time and effort always pay off in the end when you work hard. Never stop trying to improve yourself and reach your full potential every day.",
    "Reading books is a great way to spend your free time and learn new things. Books teach us about different cultures, places, and interesting people from around the world. Stories take us on amazing adventures and expand our imagination. Knowledge grows every day when we keep learning and exploring new ideas.",
    "Exercise keeps our bodies healthy and strong in many different ways. Walking is good for your heart and helps you stay active throughout the day. Running builds strength in your legs and improves your overall fitness level. Sports are fun to play with friends and help us stay competitive and healthy.",
    "Travel shows us new places and cultures that we have never seen before. Different countries have unique traditions and ways of life that are fascinating. People speak many different languages and communicate in various ways. The world is big and beautiful with so many amazing places to discover and explore.",
    "Creativity helps us solve problems in new and innovative ways every day. New ideas come from thinking differently and looking at things from fresh perspectives. Art and music inspire us to express ourselves and share our feelings with others. Innovation changes the world by bringing new solutions and improvements to our lives.",
    "School teaches us important things that we need to know for the future. Math helps us count, measure, and solve problems in logical ways. Science explains how the world works and why things happen the way they do. History tells us about the past and helps us understand how we got to where we are today.",
    "Nature has many wonders that show us the beauty of the world around us. Mountains reach high into the sky and offer stunning views of the landscape. Rivers flow through the land and provide water for plants and animals. Forests are full of life with trees, animals, and beautiful natural scenery everywhere.",
    "Music brings people together from all different backgrounds and cultures. Songs tell stories and express feelings that everyone can understand and relate to. Different instruments make beautiful sounds that create harmony and rhythm together. Everyone enjoys good music because it touches our emotions and brings joy to our lives.",
    "Science answers many questions about the world and helps us understand how things work. Experiments test our ideas and help us learn what is true and what is not. Research helps us discover new information and advance our knowledge. Discovery changes our understanding of the world and opens up new possibilities.",
    "Art shows our imagination and creativity in beautiful and meaningful ways. Paintings capture beautiful scenes and emotions that words cannot express. Drawings express our thoughts and ideas in visual form for others to see. Creativity flows from within us and helps us share our unique perspectives with the world.",
    "Friends make life better by providing support and companionship every day. Good friends support each other through good times and difficult times alike. Sharing experiences creates strong bonds that last throughout our lives. Laughter brings happiness and joy that makes every day more enjoyable and meaningful.",
    "Cooking creates delicious meals that bring families and friends together. Recipes guide our cooking and help us create tasty dishes every time. Fresh ingredients taste the best and provide the most nutrition for our bodies. Sharing food brings people together and creates memories that last forever.",
    "Weather changes every day and affects our lives in many different ways. Sun brings warmth and light that helps plants grow and people feel happy. Rain helps plants grow by providing the water they need to survive. Wind moves through the air and can be gentle or strong depending on the day.",
    "Numbers help us count things and understand quantities in our world. Addition and subtraction are basic operations that we learn early in life. Multiplication makes bigger numbers and helps us with more complex calculations. Division shares things equally and helps us understand fractions and proportions."
  ],
  advanced: [
    "Advanced technology requires careful planning and strategic implementation to be successful. Complex systems need thorough testing and validation before deployment. Professional development demands dedication and continuous learning throughout careers. Expert knowledge comes from years of experience and practical application. Innovation drives progress forward and creates new opportunities for everyone involved.",
    "Artificial intelligence changes how we work and interact with technology every single day. Machine learning algorithms analyze vast amounts of data to find patterns and insights. Neural networks process information in ways that mimic human brain functions. Deep learning models predict outcomes with remarkable accuracy and reliability. Technology transforms our daily lives in ways we could never have imagined before.",
    "Quantum mechanics explains the behavior of particles at the smallest scales imaginable. Energy levels determine where electrons can exist within atomic structures. Wave functions describe the probability distributions of quantum particles. Quantum entanglement connects distant particles in mysterious and powerful ways. Physics reveals the fundamental secrets of how the universe actually works at its core.",
    "Climate change affects global weather patterns in complex and interconnected ways. Rising temperatures are causing polar ice caps to melt at alarming rates. Sea levels increase gradually over time, threatening coastal communities worldwide. Extreme weather events become more frequent and more destructive than ever before. Environmental protection becomes crucial for the survival of our planet and future generations.",
    "Blockchain technology enables secure and transparent transactions across the globe. Decentralized networks eliminate the need for central authorities and intermediaries. Cryptographic algorithms ensure data integrity and prevent unauthorized modifications. Smart contracts automate business processes and reduce the need for manual oversight. Digital currencies reshape financial systems and create new economic possibilities worldwide.",
    "Genetic engineering modifies organism traits at the fundamental level of life itself. CRISPR technology allows precise editing of DNA sequences with incredible accuracy. Biotechnology advances medical treatments and cures for previously incurable diseases. Ethical considerations guide scientific progress and ensure responsible development. Research explores new possibilities that could change medicine and agriculture forever."
  ]
};

export function TypingArea() {
  const { theme } = useTheme();
  const [text, setText] = useState("");
  const [sampleText, setSampleText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [difficulty, setDifficulty] = useState("beginner");
  const [mode, setMode] = useState("timed");
  const [isBeginnerMode, setIsBeginnerMode] = useState(true);
  const [showResults, setShowResults] = useState(false);

  const startTimeRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize sample text
  useEffect(() => {
    const texts = TEXT_COLLECTIONS[difficulty];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    setSampleText(randomText);
  }, [difficulty]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isActive && mode === "timed" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsActive(false);
            setIsFinished(true);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, mode, timeLeft]);

  // Check if test is finished
  useEffect(() => {
    if (mode === "practice" && text.length === sampleText.length) {
      setIsFinished(true);
      setIsActive(false);
    }
  }, [text, sampleText, mode]);

  // Save test results when finished
  useEffect(() => {
    if (isFinished && startTimeRef.current) {
      const wpm = calculateWPM();
      const accuracy = calculateAccuracy();
      const testDuration = mode === "timed" ? TIMER_DURATION : Math.round((Date.now() - startTimeRef.current) / 1000);

      // Load existing stats
      const existingStats = JSON.parse(localStorage.getItem('speedtype-user-stats') || '{}');

      const newTotalTests = (existingStats.totalTests || 0) + 1;
      const totalWpmSum = (existingStats.totalWpmSum || 0) + wpm;

      // Update stats
      const updatedStats = {
        totalTests: newTotalTests,
        bestWpm: Math.max(existingStats.bestWpm || 0, wpm),
        bestAccuracy: Math.max(existingStats.bestAccuracy || 0, accuracy),
        averageWpm: Math.round(totalWpmSum / newTotalTests),
        totalWpmSum: totalWpmSum, // Store the sum for accurate average calculation
        totalTime: (existingStats.totalTime || 0) + testDuration,
        currentStreak: accuracy >= 80 ? (existingStats.currentStreak || 0) + 1 : 0,
        longestStreak: accuracy >= 80
          ? Math.max(existingStats.longestStreak || 0, (existingStats.currentStreak || 0) + 1)
          : existingStats.longestStreak || 0
      };

      // Save to localStorage
      localStorage.setItem('speedtype-user-stats', JSON.stringify(updatedStats));
    }
  }, [isFinished, mode]);

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;

    if (!isActive && !isFinished) {
      setIsActive(true);
      startTimeRef.current = Date.now();
    }

    if (isFinished) return;

    setText(value);
    setCurrentIndex(value.length);

    // Check if user has finished
    if (value.length === sampleText.length) {
      setIsFinished(true);
      setIsActive(false);
    }
  }, [isActive, isFinished, sampleText.length]);

  const resetTest = () => {
    setText("");
    setCurrentIndex(0);
    setStartTime(null);
    setTimeLeft(TIMER_DURATION);
    setIsActive(false);
    setIsFinished(false);
    startTimeRef.current = null;

    // Get new sample text
    const texts = TEXT_COLLECTIONS[difficulty];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    setSampleText(randomText);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const calculateWPM = () => {
    if (!startTimeRef.current || text.length === 0) return 0;
    const timeElapsed = (Date.now() - startTimeRef.current) / 1000 / 60; // Convert to minutes

    // For WPM, we should count correctly typed characters only (standard practice)
    let correctChars = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === sampleText[i]) correctChars++;
    }

    // WPM = (correct characters / 5) / time in minutes
    const wpm = (correctChars / 5) / timeElapsed;
    return Math.round(wpm);
  };

  const calculateAccuracy = () => {
    if (text.length === 0) return 100;
    let correct = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === sampleText[i]) correct++;
    }
    return Math.round((correct / text.length) * 100);
  };

  // Calculate raw WPM (all characters typed, including mistakes)
  const calculateRawWPM = () => {
    if (!startTimeRef.current || text.length === 0) return 0;
    const timeElapsed = (Date.now() - startTimeRef.current) / 1000 / 60;
    return Math.round((text.length / 5) / timeElapsed);
  };

  const getCurrentChar = () => {
    return sampleText[currentIndex] || "";
  };

  const renderSampleText = () => {
    return sampleText.split("").map((char, index) => {
      let className = "transition-all duration-200 ";

      if (index < text.length) {
        className += text[index] === char
          ? "bg-green-500/30 text-green-200"
          : "bg-red-500/30 text-red-200";
      } else if (index === text.length) {
        className += "bg-blue-500/40 text-blue-200 border-b-2 border-blue-400 animate-pulse";
      } else {
        className += "text-gray-400";
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-slide-in-left">
      {/* Mode Selection */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-scale-in">
        <div className="flex items-center space-x-3 hover-scale">
          <label className="text-gray-300 font-medium">Difficulty:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="bg-gray-800/60 border border-gray-600/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-700/60 transition-all duration-200"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="flex items-center space-x-3 hover-scale">
          <label className="text-gray-300 font-medium">Mode:</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="bg-gray-800/60 border border-gray-600/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-700/60 transition-all duration-200"
          >
            <option value="timed">Timed (60s)</option>
            <option value="practice">Practice</option>
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <label className="text-gray-300 font-medium">Mode:</label>
          <button
            onClick={() => setIsBeginnerMode(!isBeginnerMode)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover-scale hover-lift ${
              isBeginnerMode
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isBeginnerMode ? "Beginner" : "Advanced"}
          </button>
        </div>
      </div>

      {/* Timer/Progress */}
      {mode === "timed" && (
        <div className="text-center">
          <div className="inline-flex items-center space-x-4 bg-gray-800/60 backdrop-blur-xl rounded-2xl px-8 py-4 border border-gray-700/50">
            <div className="text-3xl font-bold text-white">
              {timeLeft}s
            </div>
            <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
                style={{ width: `${(timeLeft / TIMER_DURATION) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Sample Text Display */}
      <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-700/50 shadow-2xl hover-lift animate-bounce-in">
        <div className="text-lg sm:text-xl lg:text-2xl leading-relaxed font-mono text-center max-h-48 sm:max-h-64 overflow-y-auto custom-scrollbar animate-fade-in">
          {renderSampleText()}
        </div>

        {/* Next Character Hint */}
        {isBeginnerMode && getCurrentChar() && (
          <div className="mt-6 text-center animate-scale-in">
            <div className="inline-flex items-center space-x-3 bg-blue-900/40 rounded-xl px-6 py-3 border border-blue-500/30 hover-glow">
              <span className="text-blue-200 text-sm font-medium">Next:</span>
              <span className="text-3xl font-bold text-blue-300 bg-blue-800/60 rounded-lg px-3 py-1 border border-blue-400/50 animate-pulse">
                {getCurrentChar()}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="space-y-4">
        <textarea
          ref={inputRef}
          value={text}
          onChange={handleInputChange}
          disabled={isFinished}
          placeholder={isFinished ? "Test completed! Click reset to try again." : "Start typing here..."}
          className="w-full h-24 sm:h-32 bg-gray-800/60 backdrop-blur-xl border border-gray-600/50 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-base sm:text-lg"
        />

        {/* Real-time Stats */}
        {isActive && (
          <div className="flex justify-center space-x-8">
            <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl px-6 py-3 border border-gray-700/50">
              <div className="text-2xl font-bold text-blue-400">{calculateWPM()}</div>
              <div className="text-sm text-gray-400">WPM</div>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl px-6 py-3 border border-gray-700/50">
              <div className="text-2xl font-bold text-green-400">{calculateAccuracy()}%</div>
              <div className="text-sm text-gray-400">Accuracy</div>
            </div>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={resetTest}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 sm:px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            {isFinished ? "Try Again" : "Reset"}
          </button>

          {isFinished && (
            <button
              onClick={() => setShowResults(true)}
              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold px-6 sm:px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              View Results
            </button>
          )}
        </div>
      </div>

      {/* Results Modal */}
      {showResults && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 z-50 animate-fade-in">
          <div className="relative group max-w-md w-full animate-bounce-in">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 rounded-3xl blur-xl animate-pulse-glow"></div>

            <div className="relative bg-gray-900/90 backdrop-blur-2xl border border-gray-700/50 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
              {/* Glass overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10"></div>

              <div className="relative text-center">
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Test Results</h2>
                  <p className="text-gray-400">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} • {mode === 'timed' ? '60s Timer' : 'Practice Mode'}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/30">
                    <div className="text-xl sm:text-2xl font-bold text-blue-400">{calculateWPM()}</div>
                    <div className="text-xs sm:text-sm text-gray-400">WPM</div>
                  </div>
                  <div className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/30">
                    <div className="text-xl sm:text-2xl font-bold text-green-400">{calculateAccuracy()}%</div>
                    <div className="text-xs sm:text-sm text-gray-400">Accuracy</div>
                  </div>
                  <div className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/30">
                    <div className="text-xl sm:text-2xl font-bold text-purple-400">{calculateRawWPM()}</div>
                    <div className="text-xs sm:text-sm text-gray-400">Raw WPM</div>
                  </div>
                  <div className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/30">
                    <div className="text-xl sm:text-2xl font-bold text-orange-400">{text.length}</div>
                    <div className="text-xs sm:text-sm text-gray-400">Chars</div>
                  </div>
                </div>

                {/* Performance Analysis */}
                <div className="bg-gray-800/40 rounded-xl p-4 mb-6 border border-gray-700/30">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Performance Analysis
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-cyan-400">{calculateWPM() * 5}</div>
                      <div className="text-xs text-gray-400">CPM</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-green-400">{text.split('').filter((char, i) => char === sampleText[i]).length}</div>
                      <div className="text-xs text-gray-400">Correct</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-red-400">{text.split('').filter((char, i) => i < sampleText.length && char !== sampleText[i]).length}</div>
                      <div className="text-xs text-gray-400">Errors</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-white">{sampleText.split(' ').length}</div>
                      <div className="text-xs text-gray-400">Words</div>
                    </div>
                  </div>

                  {/* Time taken */}
                  <div className="mt-4 pt-4 border-t border-gray-700/50">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Time Taken:</span>
                      <span className="text-sm font-semibold text-white">
                        {mode === 'timed' ? TIMER_DURATION : Math.round((Date.now() - startTimeRef.current) / 1000)}s
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setShowResults(false);
                      resetTest();
                    }}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => setShowResults(false)}
                    className="flex-1 bg-gray-700/60 hover:bg-gray-600/60 text-white font-semibold py-3 px-6 rounded-xl border border-gray-600/50 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
