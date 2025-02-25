import "../styles/Stats.css";

export function Stats({ timer, wpm, accuracy }) {
  // Ensure all values are valid numbers
  const displayTimer = isNaN(timer) ? 0 : timer;
  const displayWpm = isNaN(wpm) ? 0 : Math.round(wpm);
  const displayAccuracy = isNaN(accuracy) ? 100 : Math.round(accuracy);

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <p className="stat-label">Time Left</p>
        <p className="stat-value">{displayTimer}s</p>
      </div>
      <div className="stat-card">
        <p className="stat-label">WPM</p>
        <p className="stat-value">{displayWpm}</p>
      </div>
      <div className="stat-card">
        <p className="stat-label">Accuracy</p>
        <p className="stat-value">{displayAccuracy}%</p>
      </div>
    </div>
  );
} 