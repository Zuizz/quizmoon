import { TEAM_COLORS, PHASES } from '../config';

const PHASE_LABELS = {
  [PHASES.TURN_INTRO]: 'Next Up',
  [PHASES.BOWLING]: 'Bowling…',
  [PHASES.QUESTION]: 'Question',
  [PHASES.REVEAL]: 'Revealing…',
  [PHASES.HITTING]: 'Shot!',
  [PHASES.SCORE_UPDATE]: 'Scoring…',
};

export default function Scoreboard({ state }) {
  const { teams, currentTeam, currentQ, phase } = state;
  const totalQ = 10;

  return (
    <div className="scoreboard">
      {/* Team 1 */}
      <div
        className={`score-team ${currentTeam === 0 ? 'active' : ''}`}
        style={{ '--team-color': TEAM_COLORS.team1.primary, '--team-glow': TEAM_COLORS.team1.glow }}
      >
        <div className="score-team-name">{teams[0].name || 'Team 1'}</div>
        <div className="score-team-score">{teams[0].score}</div>
      </div>

      {/* Center info */}
      <div className="scoreboard-center">
        <div className="q-counter">Question {currentQ + 1} of {totalQ}</div>
        <div className="phase-label">{PHASE_LABELS[phase] || ''}</div>
      </div>

      {/* Team 2 */}
      <div
        className={`score-team ${currentTeam === 1 ? 'active' : ''}`}
        style={{ '--team-color': TEAM_COLORS.team2.primary, '--team-glow': TEAM_COLORS.team2.glow }}
      >
        <div className="score-team-name">{teams[1].name || 'Team 2'}</div>
        <div className="score-team-score">{teams[1].score}</div>
      </div>
    </div>
  );
}
