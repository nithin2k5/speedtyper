"use client";
import { useState, useEffect, useCallback } from "react";
import { Stats } from "./Stats";
import "../styles/TypingTest.css";

const TIMER_DURATION = 60;

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog. Programming is the art of telling another human what one wants the computer to do. But it's much more than just a sequence of instructions. It's about creativity, problem-solving, and the ability to think critically, shaping ideas into tangible solutions. Whether you're writing a simple script or designing an intricate application, the fundamental skill is the same: clear and precise communication.",
  
  "Technology is best when it brings people together. It has the power to break down barriers, enabling us to connect with anyone, anywhere, at any time. However, with great power comes great responsibility. As innovators and creators, we must use technology to promote understanding, foster collaboration, and ultimately improve the quality of life for people across the globe. Innovation distinguishes between a leader and a follower, and it's those who are forward-thinking and brave enough to take risks that lead the way in shaping the future.",
  
  "Success is not final, failure is not fatal: it is the courage to continue that counts. The future belongs to those who believe in the beauty of their dreams. Success doesn't come overnight, and often it's the journey, not the destination, that holds the most value. Along the way, you will face setbacks and obstacles, but they are merely opportunities for growth. True success comes from resilience and the unwavering belief that anything is possible if you keep pushing forward.",
  
  "Life is like riding a bicycle. To keep your balance, you must keep moving forward. When challenges arise and the road gets tough, it's tempting to stop or give up. But the key to overcoming adversity is persistence. The only way to do great work is to love what you do. Passion fuels the drive that keeps you going, even when the going gets rough. Keep moving, keep learning, and keep striving for excellence.",
  
  "You miss 100% of the shots you don't take. Whether you think you can or think you can't, you're right. Life is full of choices, and often, the most important decisions are the ones that require us to step outside our comfort zone. The most successful people are the ones who take chances, who seize opportunities, and who trust in their abilities, even when the outcome is uncertain. In the end, it's the risks you take that lead to the greatest rewards.",
  
  "In three words I can sum up everything I've learned about life: it goes on. No matter what happens, no matter how many failures or setbacks you encounter, life continues to move forward. It doesn't stop, and neither should you. It does not matter how slowly you go as long as you do not stop. Every step you take, no matter how small, is progress toward your goal. Keep going, keep growing, and keep believing in yourself.",
  
  "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. Society often tries to define who we are and what we should strive for, but the real success lies in staying true to our authentic selves. Embrace your individuality and understand that your uniqueness is your strength. It's the courage to live in alignment with your values and purpose that will bring you the deepest fulfillment.",
  
  "Success usually comes to those who are too busy to be looking for it. Don't watch the clock; do what it does. Keep going. In a world obsessed with instant gratification, real success is built through persistence, patience, and hard work. While others may be looking for shortcuts, those who remain focused on their goals will rise above the noise. Time doesn't wait for anyone, so make the most of every moment you have. The key to achieving success is to stay engaged and committed, no matter what.",
  
  "It always seems impossible until it's done. The only way to achieve the impossible is to believe it is possible. You may face doubts and skepticism, but the true measure of success is not in the ease of the journey, but in the strength to continue despite the odds. The biggest obstacle we face is our own fear of failure. By believing in yourself and your vision, you unlock the power to make the impossible a reality.",
  
  "You are never too old to set another goal or to dream a new dream. Age is just a number; it is the mindset and determination that truly define us. Life is a continuous adventure, and it's never too late to start something new, to chase a new dream, or to reinvent yourself. Whether you're pursuing a new career, learning a new skill, or exploring a new passion, there's always room to grow and evolve.",
  
  "Keep your face always toward the sunshine—and shadows will fall behind you. Positive thinking can shape the way we view the world, especially during tough times. When we focus on the possibilities rather than the obstacles, we find solutions rather than problems. It's not always easy, but choosing optimism will not only make life more enjoyable, it will also lead to greater achievements. No matter the challenges, remember that the light is always within reach.",
  
  "It does not matter how slowly you go as long as you do not stop. Life is 10% what happens to us and 90% how we react to it. How we respond to life's difficulties often determines our success. It's not the pace at which we progress that matters most, but the consistency with which we move forward. Every small effort, every incremental step brings us closer to our goals. Keep moving, and the destination will eventually be reached.",
  
  "The only limit to our realization of tomorrow is our doubts of today. Do not wait to strike till the iron is hot, but make it hot by striking. Doubts and fears are often the biggest obstacles to achieving our dreams. The key to success is not waiting for the perfect moment but creating the conditions for success through bold actions. The future is shaped by the decisions we make today, so act now and turn your dreams into reality.",
  
  "Life is 10% what happens to us and 90% how we react to it. You have to learn the rules of the game. And then you have to play better than anyone else. Life can be unpredictable, but we are always in control of how we respond. Success is not determined by external circumstances, but by the attitude we bring to them. Once we master the mindset of resilience, there is no challenge we cannot face.",
  
  "You will face many defeats in life, but never let yourself be defeated. The best way to predict the future is to create it. Challenges are inevitable, but it is how we face them that defines us. When we view obstacles as opportunities for growth, we change our perspective on failure. Every setback is a stepping stone, and every challenge offers a lesson. By embracing the future with determination and an open mind, we can shape it into something extraordinary.",
  
  "The only way to do great work is to love what you do. If you love what you are doing, you will be successful. Passion fuels excellence. When you are deeply engaged in your work and genuinely excited by what you do, it shows in the results. Great work is born from dedication, creativity, and a true desire to make a difference. Find something you love, and success will follow naturally.",
  
  "Believe you can and you're halfway there. The road to success and the road to failure are almost exactly the same. The only difference is the mindset we carry along the way. Confidence in your abilities and a belief in your potential can carry you further than anything else. The key is persistence and the willingness to continue even when things get tough. With self-belief, no challenge is too great.",
  
  "Don't watch the clock; do what it does. Keep going. Success is not the key to happiness. Happiness is the key to success. It's easy to get caught up in the hustle and bustle of chasing success, but true fulfillment comes from within. When we focus on doing what we love and pursuing what makes us happy, success follows naturally. Happiness fuels motivation and leads to greater achievement than chasing success for the sake of achievement alone.",
  
  "Strive not to be a success, but rather to be of value. The only place where success comes before work is in the dictionary. Real fulfillment comes not from personal accomplishments, but from the positive impact we have on others. The value we bring to the world, whether through service, creativity, or kindness, is what defines true success. Strive to make a difference, and success will follow.",
  
  "Happiness is not something ready made. It comes from your own actions. Don't count the days, make the days count. The pursuit of happiness isn't a passive experience—it's an active process. Happiness is cultivated through the choices we make, the actions we take, and the attitude we choose to adopt. Life is full of opportunities to find joy, and it's up to us to seize them.",
  
  "Success is not in what you have, but who you are. Life isn't about finding yourself. Life is about creating yourself. The true measure of success is not in the material possessions we accumulate, but in the kind of person we become. Our character, values, and contributions define us far more than anything we own. The path to success is an inner journey of self-discovery and growth.",
  
  "You have within you right now, everything you need to deal with whatever the world can throw at you. Strength, resilience, creativity, and determination—these qualities are already part of you. The challenges you face are simply opportunities to tap into your inner power. By believing in yourself and your ability to navigate difficulties, you will find solutions to any obstacle that comes your way.",
  
  "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it. Our self-imposed limitations are often the biggest barriers to our success. The stories we tell ourselves about our abilities, our worth, and our potential shape our reality. By changing the narrative and replacing doubt with belief, we unlock the full range of possibilities that lie ahead.",
  
  "Act as if what you do makes a difference. It does. It's not whether you get knocked down, it's whether you get up. Every action we take, no matter how small, contributes to the bigger picture. The difference you make, whether in someone's life or in the world at large, matters. Stay resilient, stay determined, and remember that every effort counts.",
  
  "What lies behind us and what lies before us are tiny matters compared to what lies within us. Don't wait for the perfect moment. Take the moment and make it perfect. The past is done, and the future is uncertain. The only thing we truly control is our present. The power lies within us to shape the future through our actions in the here and now. Seize the moment and create something extraordinary from it.",
  
  "The best way to find yourself is to lose yourself in the service of others. Great things are not done by impulse, but by a series of small things brought together. True fulfillment comes not from personal gain, but from the impact we have on others. By serving others, we discover our true purpose and grow in ways we never imagined.",
  
  "It's not the years in your life that count. It's the life in your years. You miss 100% of the shots you don't take. The value of life is not measured by the length of time, but by the experiences, relationships, and moments that make it meaningful. Every opportunity to live fully is precious, and the key is to make each day count.",
  
  "Success is not final, failure is not fatal: it is the courage to continue that counts. Challenges are what make life interesting and overcoming them is what makes life meaningful. Every failure is an opportunity for growth, and every success is a stepping stone toward greater achievements. Embrace both, learn from both, and continue moving forward.",
  
  "The only way to achieve the impossible is to believe it is possible. Don't be pushed around by the fears in your mind. Be led by the dreams in your heart. Dreams are not just fantasies—they are blueprints for the future. By believing in their possibility, we summon the strength and determination needed to turn them into reality. Let your dreams guide you and your actions will follow."
];


export function TypingTest() {
  const [text, setText] = useState("");
  const [timer, setTimer] = useState(TIMER_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [sampleText, setSampleText] = useState(SAMPLE_TEXTS[0]);
  
  // Add state for character status
  const [charStatus, setCharStatus] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [finalStats, setFinalStats] = useState({ wpm: 0, accuracy: 0 });

  const calculateStats = useCallback(() => {
    const correctChars = text.split('').filter((char, i) => char === sampleText[i]).length;
    const minutes = (TIMER_DURATION - timer) / 60;
    
    // Calculate WPM based on correct characters
    const grossWpm = Math.round((text.length / 5) / minutes);
    const netWpm = Math.round((correctChars / 5) / minutes);
    const currentWpm = Math.max(0, netWpm); // Prevent negative WPM
    
    const accuracyPercent = Math.round((correctChars / text.length) * 100) || 100;
    
    setWpm(currentWpm);
    setAccuracy(accuracyPercent);
  }, [text, timer, sampleText]);

  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      // Start the interval immediately when isRunning becomes true
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            // Handle test completion
            setIsRunning(false);
            setFinalStats({ wpm, accuracy });
            setShowResults(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    // Cleanup function
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]); // Only depend on isRunning to prevent unnecessary re-renders

  // Separate effect for stats calculation
  useEffect(() => {
    if (isRunning && timer > 0) {
      const correctChars = text.split('').filter((char, i) => char === sampleText[i]).length;
      const minutes = (TIMER_DURATION - timer) / 60;
      const netWpm = Math.round((correctChars / 5) / minutes);
      const currentWpm = Math.max(0, netWpm);
      const accuracyPercent = Math.round((correctChars / text.length) * 100) || 100;
      
      setWpm(currentWpm);
      setAccuracy(accuracyPercent);
    }
  }, [text, timer, isRunning, sampleText]);

  const handleInput = (e) => {
    const newText = e.target.value;
    if (!isRunning && newText.length === 1) {
      setIsRunning(true);
    }
    setText(newText);

    // Update character status for highlighting
    const newCharStatus = newText.split('').map((char, i) => {
      if (i >= sampleText.length) return 'extra';
      return char === sampleText[i] ? 'correct' : 'incorrect';
    });
    setCharStatus(newCharStatus);

    // Calculate stats immediately on input
    if (isRunning) {
      calculateStats();
    }

    // Show results if text is completed before timer ends
    if (newText.length === sampleText.length) {
      setIsRunning(false);
      setFinalStats({ wpm, accuracy });
      setShowResults(true);
    }
  };

  const resetTest = () => {
    setText("");
    setTimer(TIMER_DURATION);
    setIsRunning(false);
    setWpm(0);
    setAccuracy(100);
    setCharStatus([]);
    setShowResults(false);
    const randomIndex = Math.floor(Math.random() * SAMPLE_TEXTS.length);
    setSampleText(SAMPLE_TEXTS[randomIndex]);
  };

  return (
    <div className="typing-container">
      <Stats timer={timer} wpm={wpm} accuracy={accuracy} />
      
      <div>
        <p className="sample-text">
          {sampleText.split('').map((char, index) => (
            <span
              key={index}
              className={charStatus[index]}
            >
              {char}
            </span>
          ))}
        </p>
        
        <textarea
          value={text}
          onChange={handleInput}
          disabled={timer === 0 || showResults}
          className="typing-input"
          placeholder="Start typing here..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>

      {showResults && (
        <div className="results-overlay">
          <div className="results-popup">
            <h2>Test Complete!</h2>
            <div className="results-stats">
              <div className="result-item">
                <span>WPM:</span>
                <span className="result-value">{finalStats.wpm}</span>
              </div>
              <div className="result-item">
                <span>Accuracy:</span>
                <span className="result-value">{finalStats.accuracy}%</span>
              </div>
            </div>
            <button onClick={resetTest} className="reset-button">
              Try Again
            </button>
          </div>
        </div>
      )}

      <button
        onClick={resetTest}
        className="reset-button"
      >
        Reset Test
      </button>
    </div>
  );
} 