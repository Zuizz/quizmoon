import { useMemo } from 'react';
import { TEAM_COLORS } from '../config';
import ResultOverlay from './ResultOverlay';

export default function ResultScreen({ state, dispatch, shuffleArray, questions }) {
  const { teams } = state;
  const t0 = teams[0].score;
  const t1 = teams[1].score;
  const tied = t0 === t1;
  const winner = !tied ? (t0 > t1 ? 0 : 1) : null;

  const handlePlayAgain = () => dispatch({ type: 'PLAY_AGAIN' });
  const handleRematch = () => {
    const questionOrder = shuffleArray(questions.map((_, i) => i));
    dispatch({ type: 'REMATCH', questionOrder });
  };

  return (
    <div className="result-screen" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Full-screen confetti for winner */}
      {!tied && <ResultOverlay result="six" showText={false} />}

      <div className="match-over-title">🏏 Match Over!</div>

      {tied ? (
        <div className="winner-banner" style={{ color: '#FBBF24' }}>
          🤝 Match Tied!
        </div>
      ) : (
        <>
          <div className="winner-trophy">🏆</div>
          <div
            className="winner-banner"
            style={{ color: TEAM_COLORS[winner === 0 ? 'team1' : 'team2'].primary }}
          >
            {teams[winner].name} Wins!
          </div>
        </>
      )}

      <div className="final-scores">
        {teams.map((team, i) => {
          const colorKey = i === 0 ? 'team1' : 'team2';
          const isWinner = winner === i;
          return (
            <div
              key={i}
              className="final-score-box"
              style={{
                '--team-color': TEAM_COLORS[colorKey].primary,
                outline: isWinner ? `3px solid ${TEAM_COLORS[colorKey].primary}` : 'none',
              }}
            >
              <div className="final-score-name">{team.name}</div>
              <div className="final-score-num">{team.score}</div>
              {isWinner && <div style={{ fontSize: '1.5rem', marginTop: '0.3rem' }}>🏆</div>}
            </div>
          );
        })}
      </div>

      <div className="result-buttons">
        <button className="result-btn play-again" onClick={handlePlayAgain}>
          🔄 Play Again
        </button>
        <button className="result-btn rematch" onClick={handleRematch}>
          ⚔️ Rematch
        </button>
      </div>
    </div>
  );
}
