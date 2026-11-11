import { useMemo } from 'react';
import { TEAM_COLORS } from '../config';

export default function SetupScreen({ teams, dispatch, shuffleArray, questions }) {
  const team1Name = teams[0].name.trim();
  const team2Name = teams[1].name.trim();

  const validationMsg = useMemo(() => {
    if (!team1Name && !team2Name) return 'Enter names for both teams to begin.';
    if (!team1Name) return 'Team 1 needs a name.';
    if (!team2Name) return 'Team 2 needs a name.';
    if (team1Name.toLowerCase() === team2Name.toLowerCase()) return 'Teams must have different names.';
    return '';
  }, [team1Name, team2Name]);

  const canStart = !validationMsg;

  const handleStart = () => {
    if (!canStart) return;
    const questionOrder = shuffleArray(questions.map((_, i) => i));
    dispatch({ type: 'START_MATCH', questionOrder });
  };

  const teamDefs = [
    { label: 'Team 1', color: TEAM_COLORS.team1.primary, glow: TEAM_COLORS.team1.glow, index: 0 },
    { label: 'Team 2', color: TEAM_COLORS.team2.primary, glow: TEAM_COLORS.team2.glow, index: 1 },
  ];

  return (
    <div className="setup-screen">
      {/* Cricket ball SVG decoration */}
      <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden="true" style={{ marginBottom: '-0.5rem' }}>
        <circle cx="40" cy="40" r="38" fill="#c0392b" stroke="#8b1a1a" strokeWidth="2"/>
        <path d="M 10 40 Q 40 10 70 40" fill="none" stroke="#f8d7da" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 10 40 Q 40 70 70 40" fill="none" stroke="#f8d7da" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="22" y1="30" x2="26" y2="22" stroke="#f8d7da" strokeWidth="1.5"/>
        <line x1="30" y1="22" x2="32" y2="14" stroke="#f8d7da" strokeWidth="1.5"/>
        <line x1="58" y1="30" x2="54" y2="22" stroke="#f8d7da" strokeWidth="1.5"/>
        <line x1="50" y1="22" x2="48" y2="14" stroke="#f8d7da" strokeWidth="1.5"/>
        <line x1="22" y1="50" x2="26" y2="58" stroke="#f8d7da" strokeWidth="1.5"/>
        <line x1="30" y1="58" x2="32" y2="66" stroke="#f8d7da" strokeWidth="1.5"/>
        <line x1="58" y1="50" x2="54" y2="58" stroke="#f8d7da" strokeWidth="1.5"/>
        <line x1="50" y1="58" x2="48" y2="66" stroke="#f8d7da" strokeWidth="1.5"/>
      </svg>

      <h1 className="setup-title">🏏 Cricket Quiz</h1>
      <p className="setup-subtitle">Enter team names to get started</p>

      <div className="team-cards">
        {teamDefs.map(({ label, color, glow, index }) => (
          <div
            key={index}
            className="team-card"
            style={{ '--card-color': color, '--card-glow': `${glow}44` }}
          >
            <div className="team-card-label">{label}</div>
            <input
              type="text"
              maxLength={20}
              placeholder={`e.g. ${index === 0 ? 'Blazing Bat' : 'Thunder Eleven'}`}
              value={teams[index].name}
              onChange={e => dispatch({ type: 'SET_TEAM_NAME', teamIndex: index, name: e.target.value })}
              onKeyDown={e => { if (e.key === 'Enter' && canStart) handleStart(); }}
              autoFocus={index === 0}
            />
          </div>
        ))}
      </div>

      <div className="validation-msg" aria-live="polite">{validationMsg}</div>

      <button
        className="start-btn"
        disabled={!canStart}
        onClick={handleStart}
      >
        🏏 Start Match
      </button>
    </div>
  );
}
