"use client";
import { useState, useEffect, useCallback } from "react";
import { Stats } from "./Stats";
import "../styles/TypingTest.css";

const TIMER_DURATION = 60;

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog. Programming is the art of telling another human what one wants the computer to do.",
  "Technology is best when it brings people together. Innovation distinguishes between a leader and a follower.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. The future belongs to those who believe in the beauty of their dreams.",
  "Life is like riding a bicycle. To keep your balance, you must keep moving forward. The only way to do great work is to love what you do."
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
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 0) {
            setIsRunning(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Separate effect for stat calculations
  useEffect(() => {
    if (isRunning && timer > 0) {
      calculateStats();
    }
  }, [text, timer, isRunning, calculateStats]);

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

    // Check if text is completed
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