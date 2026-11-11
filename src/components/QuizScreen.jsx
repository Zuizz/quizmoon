import { useEffect, useRef, useCallback } from 'react';
import {
  PHASES,
  TEAM_COLORS,
  SIX_WINDOW,
  SIX_POINTS,
  FOUR_POINTS,
  BOWLING_ANIM_DURATION,
  REVEAL_DURATION,
  HIT_ANIM_DURATION,
  SCORE_UPDATE_DURATION,
} from '../config';
import Scoreboard from './Scoreboard';
import Pitch from './Pitch';
import QuestionCard from './QuestionCard';
import ResultOverlay from './ResultOverlay';

export default function QuizScreen({ state, dispatch, questions, sound }) {
  const { phase, currentQ, currentTeam, teams, selectedAnswer, scoreResult, questionOrder, elapsedAtAnswer } = state;
  const timerRef = useRef(null);
  const elapsedRef = useRef(0);

  const currentQuestion = questions[questionOrder[currentQ]];
  const teamColor = currentTeam === 0 ? TEAM_COLORS.team1 : TEAM_COLORS.team2;
  const teamName = teams[currentTeam].name;

  // Clear any pending timers on unmount
  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  // Helper: schedule a phase transition
  const schedulePhase = useCallback((action, delay) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => dispatch(action), delay);
  }, [dispatch]);

  // TURN_INTRO → BOWLING (after 2s)
  useEffect(() => {
    if (phase !== PHASES.TURN_INTRO) return;
    schedulePhase({ type: 'PHASE_BOWLING' }, 2000);
    return () => clearTimeout(timerRef.current);
  }, [phase, schedulePhase]);

  // BOWLING → QUESTION (after bowling animation)
  useEffect(() => {
    if (phase !== PHASES.BOWLING) return;
    schedulePhase({ type: 'PHASE_QUESTION' }, BOWLING_ANIM_DURATION);
    return () => clearTimeout(timerRef.current);
  }, [phase, schedulePhase]);

  // Handle answer locked in or timer expired
  const handleReveal = useCallback(() => {
    if (phase !== PHASES.QUESTION && phase !== PHASES.REVEAL) return;
    dispatch({ type: 'PHASE_REVEAL' });
  }, [phase, dispatch]);

  // When REVEAL phase starts, determine score result, then go to HITTING
  useEffect(() => {
    if (phase !== PHASES.REVEAL) return;
    const elapsed = elapsedAtAnswer;
    const isCorrect = selectedAnswer === currentQuestion?.correctIndex;
    let result = 'out';
    if (isCorrect) {
      // elapsed null means timeout — no answer
      if (elapsed !== null && elapsed <= SIX_WINDOW) {
        result = 'six';
        sound.play('six');
      } else if (elapsed !== null) {
        result = 'four';
        sound.play('four');
      }
    } else {
      sound.play('out');
    }

    schedulePhase({ type: 'PHASE_HITTING', scoreResult: result }, REVEAL_DURATION);
    return () => clearTimeout(timerRef.current);
  }, [phase, selectedAnswer, elapsedAtAnswer, currentQuestion, sound, schedulePhase]);

  // HITTING → SCORE_UPDATE
  useEffect(() => {
    if (phase !== PHASES.HITTING) return;
    schedulePhase({ type: 'PHASE_SCORE_UPDATE' }, HIT_ANIM_DURATION);
    return () => clearTimeout(timerRef.current);
  }, [phase, schedulePhase]);

  // SCORE_UPDATE → NEXT_TURN or RESULT
  useEffect(() => {
    if (phase !== PHASES.SCORE_UPDATE) return;
    schedulePhase({ type: 'NEXT_TURN' }, SCORE_UPDATE_DURATION);
    return () => clearTimeout(timerRef.current);
  }, [phase, schedulePhase]);

  // Handle timer tick to store elapsed
  const handleTimerTick = useCallback((elapsed) => {
    elapsedRef.current = elapsed;
  }, []);

  // Handle answer selection
  const handleAnswer = useCallback((answerIndex) => {
    if (state.selectedAnswer !== null) return; // already locked
    if (phase !== PHASES.QUESTION) return;
    const elapsed = elapsedRef.current;
    if (timerRef.current) clearTimeout(timerRef.current);
    dispatch({ type: 'LOCK_ANSWER', answerIndex, elapsed });
    dispatch({ type: 'PHASE_REVEAL' });
  }, [state.selectedAnswer, phase, dispatch]);

  // Handle timer expiry (no answer)
  const handleTimerExpire = useCallback(() => {
    if (phase !== PHASES.QUESTION) return;
    if (state.selectedAnswer !== null) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    dispatch({ type: 'LOCK_ANSWER', answerIndex: null, elapsed: null });
    dispatch({ type: 'PHASE_REVEAL' });
  }, [state.selectedAnswer, phase, dispatch]);

  const showPitch = [PHASES.BOWLING, PHASES.QUESTION, PHASES.REVEAL, PHASES.HITTING].includes(phase);
  const showQuestion = [PHASES.QUESTION, PHASES.REVEAL].includes(phase);
  const showHitResult = phase === PHASES.HITTING && scoreResult;

  return (
    <div
      style={{
        width: '100vw', height: '100vh',
        position: 'relative',
        '--team-color': teamColor.primary,
        '--team-glow': teamColor.glow,
      }}
    >
      <Scoreboard state={state}/>

      {/* TURN_INTRO */}
      {phase === PHASES.TURN_INTRO && (
        <div className="turn-intro" style={{ paddingTop: '80px' }}>
          <div className="turn-intro-banner">{teamName} is on Strike! 🏏</div>
          <div className="turn-intro-sub">Question {currentQ + 1} of 10</div>
        </div>
      )}

      {/* Pitch scene */}
      {showPitch && (
        <div style={{ position: 'absolute', inset: 0, top: '70px' }}>
          <Pitch phase={phase} scoreResult={scoreResult}/>
        </div>
      )}

      {/* Question card overlay */}
      {showQuestion && currentQuestion && (
        <div style={{ position: 'absolute', inset: 0, top: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <QuestionCard
            question={currentQuestion}
            phase={phase}
            selectedAnswer={selectedAnswer}
            onAnswer={handleAnswer}
            onTimerExpire={handleTimerExpire}
            onTimerTick={handleTimerTick}
          />
        </div>
      )}

      {/* Hit result overlay (SIX / FOUR / OUT) */}
      {showHitResult && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <ResultOverlay result={scoreResult}/>
        </div>
      )}

      {/* Score update display */}
      {phase === PHASES.SCORE_UPDATE && (
        <div style={{
          position: 'absolute', inset: 0, top: '70px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: '1rem',
        }}>
          <div style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 900,
            color: teamColor.primary,
            textShadow: `0 0 30px ${teamColor.glow}`,
            animation: 'fadeInScale 0.3s ease-out',
          }}>
            {scoreResult === 'six' ? '⚡ 6 Points!' : scoreResult === 'four' ? '🏃 4 Points!' : '💨 No Score'}
          </div>
          <div style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', color: '#9ca3af' }}>
            {teamName}: {teams[currentTeam].score} points
          </div>
        </div>
      )}
    </div>
  );
}
