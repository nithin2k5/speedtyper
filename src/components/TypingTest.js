"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Stats } from "./Stats";
import { Achievements } from "./Achievements";
import { SettingsPanel } from "./SettingsPanel";
import { GoalsTargets } from "./GoalsTargets";
import { useTheme } from "./ThemeProvider";

const TIMER_DURATION = 60;

// Difficulty levels with different text complexities
const TEXT_COLLECTIONS = {
  beginner: [
    "The cat sat on the mat next to the dog who was sleeping peacefully. Birds flew high in the bright blue sky while fish swam happily in the clear water below. Children played games in the park and everyone enjoyed the beautiful sunny day together.",
    "I like to eat fresh red apples from the orchard. She likes to eat sweet juicy pears that grow on tall trees. He likes to eat purple grapes that come in big bunches. We like to eat different kinds of fruit every day to stay healthy and strong.",
    "The sun shines brightly during the day and gives us warmth. The moon comes out at night and shines with a soft cool light. The stars twinkle beautifully in the dark sky above our heads. The sky changes colors from blue to orange to purple every day.",
    "Red is my favorite color because it reminds me of ripe apples. Blue is nice too because it makes me think of the ocean waves. Green makes me happy because it reminds me of fresh grass. Yellow is fun because it looks like the bright sunshine.",
    "I can run fast across the playground with my friends. She can jump high over the rope during gym class. He can swim well underwater for a long time. We can play many different games together and have fun.",
    "The house is big with many rooms and a beautiful garden. The car is red and drives quickly on the smooth roads. The tree is tall and provides shade on hot summer days. The flower is pretty with colorful petals that bloom in spring.",
    "I have a pen that writes in smooth blue ink. She has a book with many interesting stories inside. He has a ball that bounces high when thrown hard. We have many toys that we play with every day.",
    "One two three four five six seven eight nine ten. Eleven twelve thirteen fourteen fifteen sixteen. Seventeen eighteen nineteen twenty twenty one. Twenty two twenty three twenty four twenty five.",
    "A B C D E F G H I J K L M N O P. Q R S T U V W X Y Z and the numbers. One two three four five six seven eight nine. Zero is also a number we use every day.",
    "My name is Sam and I like to play with my friends. Her name is Pam and she enjoys reading books. His name is Tom and he likes to play sports. Our names are fun and we all get along well together.",
    "I like hot dogs with mustard and ketchup on them. She likes ice cream with chocolate chips inside. He likes pizza with extra cheese and pepperoni. We like different kinds of food but we all eat together.",
    "The clock is on the wall and tells us what time it is. The chair is by the door and we sit on it when tired. The lamp is on the desk and gives us light to read. The room is comfortable with everything we need.",
    "I can see the sun shining brightly through the window. She can see the moon rising slowly in the evening. He can see the stars sparkling in the night sky. We can see many beautiful things in nature every day.",
    "Big and small objects are all around us everywhere. Tall and short people walk on the busy streets. Fast and slow cars drive on the highway together. Happy and sad feelings change throughout the day.",
    "Up and down the stairs we go every day. Left and right we turn when walking down the street. In and out of the house we come and go. Here and there we find interesting things to do."
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
    "Genetic engineering modifies organism traits at the fundamental level of life itself. CRISPR technology allows precise editing of DNA sequences with incredible accuracy. Biotechnology advances medical treatments and cures for previously incurable diseases. Ethical considerations guide scientific progress and ensure responsible development. Research explores new possibilities that could change medicine and agriculture forever.",
    "Space exploration expands human knowledge and pushes the boundaries of what is possible. Mars missions test long-duration space travel and habitation capabilities. Satellite technology monitors Earth systems and provides crucial environmental data. International cooperation advances scientific goals and unites humanity in exploration. Discovery drives technological innovation and inspires future generations of scientists and engineers.",
    "Cybersecurity protects digital information in an increasingly connected world. Encryption algorithms secure data transmission and prevent interception by unauthorized parties. Network firewalls prevent unauthorized access and protect sensitive systems. Authentication systems verify user identities and ensure proper access controls. Digital protection safeguards modern society and enables safe technological advancement.",
    "Renewable energy reduces carbon emissions and combats climate change effectively. Solar panels convert sunlight to electricity with increasing efficiency and decreasing costs. Wind turbines harness natural air currents and provide clean, sustainable power. Hydroelectric dams generate clean power from flowing water resources. Sustainable solutions address environmental challenges and create a better future for everyone.",
    "Machine vision recognizes visual patterns and interprets the world around us. Computer algorithms analyze image data with incredible speed and accuracy. Object detection identifies specific items within complex visual scenes. Facial recognition technology advances security and enables new applications. Artificial intelligence enhances visual processing and creates new possibilities for technology."
  ]
};

export function TypingTest() {
  const { theme } = useTheme();

  const [difficulty, setDifficulty] = useState('beginner');
  const [mode, setMode] = useState('timed'); // 'timed' or 'practice'
  const [text, setText] = useState("");
  const [timer, setTimer] = useState(TIMER_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [sampleText, setSampleText] = useState(TEXT_COLLECTIONS.beginner[0]);
  
  // Add state for character status
  const [charStatus, setCharStatus] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [finalStats, setFinalStats] = useState({ wpm: 0, accuracy: 0 });
  const [userStats, setUserStats] = useState({
    bestWpm: 0,
    bestAccuracy: 0,
    totalTests: 0,
    averageWpm: 0,
    averageAccuracy: 0,
    totalTimeTyped: 0
  });

  // Track when typing actually started
  const startTimeRef = useRef(null);
  const timerIntervalRef = useRef(null);

  // Load user statistics from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('speedtype-user-stats');
    if (savedStats) {
      try {
        setUserStats(JSON.parse(savedStats));
      } catch (error) {
        console.error('Error loading user stats:', error);
      }
    }
  }, []);

  // Save user statistics to localStorage
  const saveUserStats = (stats) => {
    localStorage.setItem('speedtype-user-stats', JSON.stringify(stats));
    setUserStats(stats);
  };

  // Update user statistics after completing a test
  const updateUserStats = (wpm, accuracy, timeTaken) => {
    if (mode === 'practice') return; // Don't track practice mode stats

    const newStats = { ...userStats };
    newStats.totalTests += 1;
    newStats.totalTimeTyped += timeTaken;

    // Update best scores
    if (wpm > newStats.bestWpm) {
      newStats.bestWpm = wpm;
    }
    if (accuracy > newStats.bestAccuracy) {
      newStats.bestAccuracy = accuracy;
    }

    // Update averages
    newStats.averageWpm = Math.round((newStats.averageWpm * (newStats.totalTests - 1) + wpm) / newStats.totalTests);
    newStats.averageAccuracy = Math.round((newStats.averageAccuracy * (newStats.totalTests - 1) + accuracy) / newStats.totalTests);

    saveUserStats(newStats);
  };

  const calculateStats = useCallback(() => {
    if (!startTimeRef.current || !isRunning) return;

    const elapsedMs = Date.now() - startTimeRef.current;
    const elapsedMinutes = elapsedMs / (1000 * 60);

    const correctChars = text.split('').filter((char, i) => char === sampleText[i]).length;

    // Calculate WPM: (correct characters / 5) / elapsed minutes
    const currentWpm = elapsedMinutes > 0 ? Math.round((correctChars / 5) / elapsedMinutes) : 0;

    // Calculate accuracy
    const accuracyPercent = text.length > 0 ? Math.round((correctChars / text.length) * 100) : 100;
    
    setWpm(currentWpm);
    setAccuracy(accuracyPercent);
  }, [text, sampleText, isRunning]);

  // Update sample text when difficulty changes
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * TEXT_COLLECTIONS[difficulty].length);
    setSampleText(TEXT_COLLECTIONS[difficulty][randomIndex]);
  }, [difficulty]);

  // Update timer when mode changes
  useEffect(() => {
    setTimer(mode === 'practice' ? -1 : TIMER_DURATION);
  }, [mode]);

  useEffect(() => {
    if (isRunning && mode === 'timed') {
      // Start the timer interval only for timed mode
      timerIntervalRef.current = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            // Handle test completion - use current state values
            setIsRunning(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else {
      // Clear the interval when not running or in practice mode
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }

    // Cleanup function
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [isRunning, mode]);

  // Handle test completion when timer reaches 0 (only for timed mode)
  useEffect(() => {
    if (timer === 0 && isRunning && mode === 'timed') {
      setIsRunning(false);
      const timeTaken = TIMER_DURATION; // Full 60 seconds for timed mode
      updateUserStats(wpm, accuracy, timeTaken);
      setFinalStats({ wpm, accuracy });
      setShowResults(true);
    }
  }, [timer, isRunning, wpm, accuracy, mode, updateUserStats]);

  // Update stats in real-time
  useEffect(() => {
    if (isRunning && text.length > 0) {
      calculateStats();
    }
  }, [text, calculateStats, isRunning]);

  const handleInput = (e) => {
    const newText = e.target.value;

    // Start the test when user begins typing
    if (!isRunning && newText.length === 1) {
      setIsRunning(true);
      startTimeRef.current = Date.now();
    }

    setText(newText);

    // Update character status for highlighting
    const newCharStatus = newText.split('').map((char, i) => {
      if (i >= sampleText.length) return 'extra';
      return char === sampleText[i] ? 'correct' : 'incorrect';
    });
    setCharStatus(newCharStatus);

    // Show results if text is completed (practice mode) or timer runs out (timed mode)
    if (newText.length === sampleText.length && isRunning) {
      setIsRunning(false);
      const timeTaken = mode === 'timed' ? (TIMER_DURATION - timer) : Math.round((Date.now() - startTimeRef.current) / 1000);
      if (mode === 'timed') {
        updateUserStats(wpm, accuracy, timeTaken);
      }
      setFinalStats({ wpm, accuracy });
      setShowResults(true);
    }
  };

  const getErrorCorrectionHint = (typedText, targetText) => {
    // Find the first error position
    const errorIndex = typedText.split('').findIndex((char, index) =>
      index < targetText.length && char !== targetText[index]
    );

    if (errorIndex === -1) return null;

    const expectedChar = targetText[errorIndex];
    const typedChar = typedText[errorIndex];

    // Common typing mistakes and suggestions
    const commonMistakes = {
      'a': { alternatives: ['q', 's', 'z'], suggestion: 'A is next to S on the keyboard' },
      's': { alternatives: ['a', 'd', 'w'], suggestion: 'S is in the home row' },
      'd': { alternatives: ['s', 'f', 'e'], suggestion: 'D is next to S on the home row' },
      'f': { alternatives: ['d', 'g', 'r'], suggestion: 'F is next to D on the home row' },
      'j': { alternatives: ['h', 'k', 'u'], suggestion: 'J is next to H on the home row' },
      'k': { alternatives: ['j', 'l', 'i'], suggestion: 'K is next to J on the home row' },
      'l': { alternatives: ['k', ';', 'o'], suggestion: 'L is next to K on the home row' },
      'e': { alternatives: ['w', 'r', 'd'], suggestion: 'E is above D in the top row' },
      'r': { alternatives: ['e', 't', 'f'], suggestion: 'R is next to E and above F' },
      't': { alternatives: ['r', 'y', 'g'], suggestion: 'T is next to R and above G' },
      'y': { alternatives: ['t', 'u', 'h'], suggestion: 'Y is next to T and above H' },
      'u': { alternatives: ['y', 'i', 'j'], suggestion: 'U is next to Y and above J' },
      'i': { alternatives: ['u', 'o', 'k'], suggestion: 'I is next to U and above K' },
      'o': { alternatives: ['i', 'p', 'l'], suggestion: 'O is next to I and above L' },
      'p': { alternatives: ['o', '[', ';'], suggestion: 'P is next to O in the top row' },
    };

    if (commonMistakes[expectedChar]) {
      const mistake = commonMistakes[expectedChar];
      if (mistake.alternatives.includes(typedChar)) {
        return mistake.suggestion;
      }
    }

    // General suggestions based on character type
    if (expectedChar === typedChar.toLowerCase() && typedChar !== expectedChar) {
      return expectedChar === expectedChar.toUpperCase()
        ? "Don't forget to use Shift for capital letters"
        : "Try using the correct case for this letter";
    }

    if (expectedChar === ' ') {
      return "Press the spacebar between words";
    }

    if (typedChar === ' ') {
      return "Don't add extra spaces - wait for the word to end";
    }

    if (expectedChar.match(/[0-9]/)) {
      return "Use the number keys at the top of your keyboard";
    }

    if (expectedChar.match(/[.!?,;:]/)) {
      return "Use the punctuation keys - they're usually next to the letters";
    }

    // Default helpful hint
    return `You typed '${typedChar}' but the correct letter is '${expectedChar}'. Take your time and focus on accuracy!`;
  };

  const getEncouragingMessage = (wpm, accuracy) => {
    if (mode === 'practice') {
      return "Great practice session! Keep building your skills.";
    }

    if (accuracy >= 95 && wpm >= 60) {
      return "Outstanding! You're a typing champion! 🏆";
    } else if (accuracy >= 90 && wpm >= 40) {
      return "Excellent work! You're getting really fast! 🚀";
    } else if (accuracy >= 85 && wpm >= 25) {
      return "Great job! Your speed and accuracy are improving! 💪";
    } else if (accuracy >= 80) {
      return "Good progress! Focus on accuracy to go even faster! 🎯";
    } else if (accuracy >= 70) {
      return "Nice effort! Keep practicing to improve your accuracy! 📈";
    } else if (accuracy >= 60) {
      return "You're getting there! Take your time and focus on each character! ⏱️";
    } else {
      return "Keep practicing! Every expert was once a beginner! 🌱";
    }
  };

  const resetTest = () => {
    setText("");
    setTimer(mode === 'practice' ? -1 : TIMER_DURATION);
    setIsRunning(false);
    setWpm(0);
    setAccuracy(100);
    setCharStatus([]);
    setShowResults(false);
    startTimeRef.current = null;
    const randomIndex = Math.floor(Math.random() * TEXT_COLLECTIONS[difficulty].length);
    setSampleText(TEXT_COLLECTIONS[difficulty][randomIndex]);
  };

  return (
    <div className="w-full">
      {/* Main Layout with Stats on the Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
        {/* Typing Interface - Takes up 2/3 of the space */}
        <div className="lg:col-span-2 flex justify-center">
          <div className="relative group w-full max-w-4xl">
            <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500 ${theme.glow}`}></div>

            <div className={`relative ${theme.cardBg} backdrop-blur-2xl ${theme.cardBorder} rounded-3xl p-6 shadow-2xl`}>
              {/* Mode and Difficulty Selector */}
              <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowProgress(true)}
                    className={`px-3 py-1 ${theme.inputBg} ${theme.inputBorder} rounded-lg text-sm ${theme.text} hover:bg-gray-600 transition-colors duration-200`}
                    title="View your progress statistics"
                  >
                    📊 Progress
                  </button>
                  <button
                    onClick={() => setShowSettings(true)}
                    className={`px-3 py-1 ${theme.inputBg} ${theme.inputBorder} rounded-lg text-sm ${theme.text} hover:bg-gray-600 transition-colors duration-200`}
                    title="Customize your settings"
                  >
                    ⚙️ Settings
                  </button>
                </div>

                {/* Mode and Difficulty Selectors */}
                <div className="flex items-center space-x-4">
                  {/* Mode Selector */}
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${theme.textSecondary} font-medium`}>Mode:</span>
                    <select
                      value={mode}
                      onChange={(e) => setMode(e.target.value)}
                      disabled={isRunning}
                      className={`px-3 py-1 ${theme.inputBg} ${theme.inputBorder} rounded-lg text-sm ${theme.text} focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50`}
                    >
                      <option value="timed">Timed (60s)</option>
                      <option value="practice">Practice</option>
                    </select>
                  </div>

                  {/* Difficulty Selector */}
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${theme.textSecondary} font-medium`}>Level:</span>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      disabled={isRunning}
                      className={`px-3 py-1 ${theme.inputBg} ${theme.inputBorder} rounded-lg text-sm ${theme.text} focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50`}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                {/* Progress indicator */}
                <div className={`text-xs ${theme.textMuted} font-mono`}>
                  {text.length}/{sampleText.length} chars
                </div>
              </div>

              {/* Header with status */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse`}></div>
                  <span className={`text-sm ${theme.textSecondary} font-medium uppercase tracking-wider`}>
                    {isRunning ? (mode === 'practice' ? 'Practice Mode' : 'Live Test') : 'Ready to Start'}
                  </span>
                </div>
                {mode === 'timed' && (
                  <div className={`text-sm ${theme.textMuted} font-mono`}>
                    Timer: {timer}s
                  </div>
                )}
              </div>

              {/* Sample Text Display */}
              <div className={`mb-6 p-8 ${theme.buttonBg} rounded-2xl ${theme.cardBorder} min-h-[220px]`}>
                {/* Keyboard Hint */}
                {!isRunning && text.length === 0 && (
                  <div className="mb-6 text-center">
                    <div className="inline-flex items-center space-x-2 bg-indigo-500/20 border border-indigo-400/30 rounded-lg px-4 py-2">
                      <span className="text-base text-indigo-300 font-medium">Next key:</span>
                      <kbd className="px-3 py-2 bg-indigo-600 text-white rounded text-base font-mono font-bold">
                        {sampleText[0]}
                      </kbd>
                    </div>
                  </div>
                )}

                <div className={`${theme.text} text-xl leading-relaxed font-mono select-none overflow-y-auto max-h-[300px] whitespace-pre-wrap break-words`}>
                  {sampleText.split('').map((char, index) => {
                    let charClass = 'transition-all duration-200 relative ';

                    if (index < charStatus.length) {
                      if (charStatus[index] === 'correct') {
                        charClass += 'text-emerald-400';
                      } else if (charStatus[index] === 'incorrect') {
                        charClass += 'text-red-400 bg-red-400/20 rounded px-0.5';
                      } else if (charStatus[index] === 'extra') {
                        charClass += 'text-red-400 bg-red-400/30 underline decoration-2';
                      }
                    } else if (index >= text.length) {
                      charClass += theme.textMuted;
                    } else {
                      charClass += theme.textSecondary;
                    }

                    // Current character indicator
                    if (index === text.length && isRunning) {
                      charClass += ' relative';
                      return (
                        <span key={index} className={charClass}>
                          <span className="absolute inset-0 bg-cyan-400/30 rounded animate-pulse"></span>
                          <span className="relative z-10">{char === ' ' ? '\u00A0' : char}</span>
                        </span>
                      );
                    }

                    return (
                      <span key={index} className={charClass}>
                        {char === ' ' ? '\u00A0' : char}
            </span>
                    );
                  })}
                </div>

                {/* Error Correction Hint */}
                {isRunning && charStatus.includes('incorrect') && (
                  <div className="mt-6 p-4 bg-amber-500/10 border border-amber-400/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-amber-400 text-xl">💡</span>
                      <div className="flex-1">
                        <div className={`text-base font-medium ${theme.text} mb-2`}>
                          Typing Tip
                        </div>
                        <div className={`text-base ${theme.textSecondary} leading-relaxed`}>
                          {getErrorCorrectionHint(text, sampleText)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="relative mb-4">
        <textarea
          value={text}
          onChange={handleInput}
          disabled={timer === 0 || showResults}
                  className={`w-full h-20 ${theme.inputBg} ${theme.inputBorder} rounded-xl p-4 text-lg font-mono ${theme.text} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-inner`}
                  placeholder={isRunning ? "Continue typing..." : `Click here to start ${mode === 'practice' ? 'practice' : 'timed test'}...`}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />

                {/* Status indicator */}
                {isRunning && (
                  <div className="absolute top-3 right-3 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className={`text-xs ${theme.textMuted} font-medium`}>Active</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={resetTest}
                  className={`px-6 py-3 ${theme.buttonBg} ${theme.buttonHover} text-white font-medium rounded-xl ${theme.cardBorder} transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900`}
                >
                  {isRunning ? 'Reset' : 'New Test'}
                </button>

                {isRunning && mode === 'timed' && (
                  <div className={`px-4 py-3 ${theme.accentBg} ${theme.accentBorder} rounded-xl`}>
                    <span className={`${theme.accentText} text-sm font-medium`}>Test in Progress</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Sidebar - Takes up 1/3 of the space */}
        <div className="lg:col-span-1 flex justify-center lg:justify-start">
          <div className="w-full max-w-sm">
            <Stats timer={timer} wpm={wpm} accuracy={accuracy} mode={mode} />
          </div>
        </div>
      </div>

      {/* Results Modal */}
      {showResults && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="relative group max-w-4xl w-full">
            <div className={`absolute -inset-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-3xl blur opacity-30 animate-pulse ${theme.glow}`}></div>

            <div className={`relative ${theme.cardBg} backdrop-blur-2xl ${theme.cardBorder} rounded-3xl p-8 shadow-2xl`}>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <h2 className={`text-4xl font-bold ${theme.text} mb-3`}>🎉 Test Complete!</h2>
                <div className={`text-lg ${theme.textSecondary} mb-2`}>
                  Difficulty: <span className="font-semibold text-indigo-400 capitalize">{difficulty}</span> |
                  Mode: <span className="font-semibold text-indigo-400">{mode === 'timed' ? '60s Timed' : 'Practice'}</span>
                </div>
                <p className={`${theme.textSecondary} text-xl leading-relaxed max-w-2xl mx-auto`}>
                  {getEncouragingMessage(finalStats.wpm, finalStats.accuracy)}
                </p>
              </div>

              {/* Main Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                  <div className={`relative bg-gray-800/60 rounded-2xl p-6 ${theme.cardBorder} text-center`}>
                    <div className="text-4xl font-bold text-purple-400 font-mono mb-2">
                      {finalStats.wpm}
                    </div>
                    <div className={`text-sm ${theme.textMuted} uppercase tracking-wider font-medium`}>
                      Words/Minute
                    </div>
                    {finalStats.wpm === userStats.bestWpm && finalStats.wpm > 0 && (
                      <div className="mt-2 text-xs text-yellow-400 font-medium">🏆 Personal Best!</div>
                    )}
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                  <div className={`relative bg-gray-800/60 rounded-2xl p-6 ${theme.cardBorder} text-center`}>
                    <div className="text-4xl font-bold text-emerald-400 font-mono mb-2">
                      {finalStats.accuracy}%
                    </div>
                    <div className={`text-sm ${theme.textMuted} uppercase tracking-wider font-medium`}>
                      Accuracy
                    </div>
                    {finalStats.accuracy === userStats.bestAccuracy && finalStats.accuracy > 0 && (
                      <div className="mt-2 text-xs text-yellow-400 font-medium">🏆 Personal Best!</div>
                    )}
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                  <div className={`relative bg-gray-800/60 rounded-2xl p-6 ${theme.cardBorder} text-center`}>
                    <div className="text-4xl font-bold text-blue-400 font-mono mb-2">
                      {Math.round(sampleText.split(' ').length)}
                    </div>
                    <div className={`text-sm ${theme.textMuted} uppercase tracking-wider font-medium`}>
                      Words Typed
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                  <div className={`relative bg-gray-800/60 rounded-2xl p-6 ${theme.cardBorder} text-center`}>
                    <div className="text-4xl font-bold text-orange-400 font-mono mb-2">
                      {mode === 'timed' ? TIMER_DURATION : Math.round((Date.now() - startTimeRef.current) / 1000)}s
                    </div>
                    <div className={`text-sm ${theme.textMuted} uppercase tracking-wider font-medium`}>
                      Time Taken
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Performance Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Performance Breakdown */}
                <div className={`bg-gray-800/40 rounded-2xl p-6 ${theme.cardBorder}`}>
                  <h3 className={`text-xl font-bold ${theme.text} mb-4 flex items-center`}>
                    <span className="mr-2">📊</span> Performance Analysis
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${theme.textSecondary}`}>Characters Correct:</span>
                      <span className="text-green-400 font-mono font-semibold">
                        {text.split('').filter((char, i) => char === sampleText[i]).length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${theme.textSecondary}`}>Characters Incorrect:</span>
                      <span className="text-red-400 font-mono font-semibold">
                        {text.split('').filter((char, i) => i < sampleText.length && char !== sampleText[i]).length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${theme.textSecondary}`}>Total Characters:</span>
                      <span className={`font-mono font-semibold ${theme.text}`}>
                        {sampleText.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${theme.textSecondary}`}>Raw WPM:</span>
                      <span className="text-cyan-400 font-mono font-semibold">
                        {Math.round((text.length / 5) / ((Date.now() - startTimeRef.current) / (1000 * 60))) || 0}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Comparison */}
                <div className={`bg-gray-800/40 rounded-2xl p-6 ${theme.cardBorder}`}>
                  <h3 className={`text-xl font-bold ${theme.text} mb-4 flex items-center`}>
                    <span className="mr-2">📈</span> Your Progress
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${theme.textSecondary}`}>Best WPM:</span>
                      <span className={`font-mono font-semibold ${finalStats.wpm >= userStats.bestWpm ? 'text-yellow-400' : theme.text}`}>
                        {userStats.bestWpm || 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${theme.textSecondary}`}>Best Accuracy:</span>
                      <span className={`font-mono font-semibold ${finalStats.accuracy >= userStats.bestAccuracy ? 'text-yellow-400' : theme.text}`}>
                        {userStats.bestAccuracy ? `${userStats.bestAccuracy}%` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${theme.textSecondary}`}>Average WPM:</span>
                      <span className={`font-mono font-semibold ${theme.text}`}>
                        {userStats.averageWpm || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${theme.textSecondary}`}>Total Tests:</span>
                      <span className={`font-mono font-semibold ${theme.text}`}>
                        {userStats.totalTests}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetTest}
                  className="flex-1 py-4 px-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  🎯 Try Another Test
                </button>

                <button
                  onClick={() => setShowProgress(true)}
                  className="flex-1 py-4 px-8 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 hover:from-blue-500 hover:via-cyan-500 hover:to-teal-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  📊 View Full Progress
                </button>

                <button
                  onClick={() => setShowResults(false)}
                  className={`py-4 px-8 ${theme.inputBg} ${theme.inputBorder} rounded-2xl font-medium transition-all duration-200 hover:bg-gray-700/60`}
                >
                  Close Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}

      {/* Progress Modal */}
      {showProgress && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 z-50">
          <div className="relative group max-w-2xl w-full">
            <div className={`absolute -inset-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-3xl blur opacity-30 animate-pulse ${theme.glow}`}></div>

            <div className={`relative ${theme.cardBg} backdrop-blur-2xl ${theme.cardBorder} rounded-3xl p-8 shadow-2xl`}>
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">📊</div>
                <h2 className={`text-3xl font-bold ${theme.text} mb-2`}>Your Progress</h2>
                <p className={`${theme.textSecondary} mb-6`}>
                  Track your typing improvement over time!
                </p>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className={`bg-gray-800/60 rounded-2xl p-4 ${theme.cardBorder} text-center`}>
                  <div className="text-2xl font-bold text-purple-400 font-mono mb-1">
                    {userStats.bestWpm}
                  </div>
                  <div className={`text-xs ${theme.textMuted} uppercase tracking-wider`}>
                    Best WPM
                  </div>
                </div>

                <div className={`bg-gray-800/60 rounded-2xl p-4 ${theme.cardBorder} text-center`}>
                  <div className="text-2xl font-bold text-emerald-400 font-mono mb-1">
                    {userStats.bestAccuracy}%
                  </div>
                  <div className={`text-xs ${theme.textMuted} uppercase tracking-wider`}>
                    Best Accuracy
                  </div>
                </div>

                <div className={`bg-gray-800/60 rounded-2xl p-4 ${theme.cardBorder} text-center`}>
                  <div className="text-2xl font-bold text-blue-400 font-mono mb-1">
                    {userStats.totalTests}
                  </div>
                  <div className={`text-xs ${theme.textMuted} uppercase tracking-wider`}>
                    Total Tests
                  </div>
                </div>

                <div className={`bg-gray-800/60 rounded-2xl p-4 ${theme.cardBorder} text-center`}>
                  <div className="text-2xl font-bold text-orange-400 font-mono mb-1">
                    {userStats.averageWpm}
                  </div>
                  <div className={`text-xs ${theme.textMuted} uppercase tracking-wider`}>
                    Average WPM
                  </div>
                </div>

                <div className={`bg-gray-800/60 rounded-2xl p-4 ${theme.cardBorder} text-center`}>
                  <div className="text-2xl font-bold text-pink-400 font-mono mb-1">
                    {userStats.averageAccuracy}%
                  </div>
                  <div className={`text-xs ${theme.textMuted} uppercase tracking-wider`}>
                    Average Accuracy
                  </div>
                </div>

                <div className={`bg-gray-800/60 rounded-2xl p-4 ${theme.cardBorder} text-center`}>
                  <div className="text-2xl font-bold text-cyan-400 font-mono mb-1">
                    {Math.floor(userStats.totalTimeTyped / 60)}m
                  </div>
                  <div className={`text-xs ${theme.textMuted} uppercase tracking-wider`}>
                    Total Time
                  </div>
                </div>
              </div>

              {/* Achievements Section */}
              <div className="mb-6">
                <Achievements userStats={userStats} />
              </div>

              {/* Goals & Targets Section */}
              <div className="mb-6">
                <GoalsTargets userStats={userStats} />
              </div>

              {/* Progress Message */}
              {userStats.totalTests > 0 && (
                <div className="mb-6 p-4 bg-indigo-500/10 border border-indigo-400/30 rounded-xl">
                  <p className={`${theme.textSecondary} text-center`}>
                    {userStats.totalTests === 1
                      ? "Great start! Keep practicing to improve your scores."
                      : userStats.bestWpm >= 40 && userStats.bestAccuracy >= 90
                      ? "Outstanding progress! You're becoming a typing expert! 🏆"
                      : userStats.averageWpm > userStats.bestWpm * 0.7
                      ? "Consistent performance! Keep up the great work! 💪"
                      : "You're improving! Focus on accuracy to boost your speed. 📈"
                    }
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowProgress(false)}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Continue Practicing
                </button>

                {userStats.totalTests > 0 && (
      <button
                    onClick={() => {
                      localStorage.removeItem('speedtype-user-stats');
                      setUserStats({
                        bestWpm: 0,
                        bestAccuracy: 0,
                        totalTests: 0,
                        averageWpm: 0,
                        averageAccuracy: 0,
                        totalTimeTyped: 0
                      });
                    }}
                    className={`px-6 py-3 ${theme.inputBg} ${theme.inputBorder} text-red-400 hover:bg-red-900/20 rounded-xl transition-all duration-200`}
                  >
                    Reset Stats
      </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
