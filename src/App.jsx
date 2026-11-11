import { useReducer, useCallback } from 'react';
import { gameReducer, initialState } from './gameReducer';
import { PHASES } from './config';
import { questions } from './data/questions';
import { useSound } from './hooks/useSound';
import SetupScreen from './components/SetupScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import './App.css';

function shuffleArray(arr) {
  const a = [...arr.keys()];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const sound = useSound();

  const handleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }, []);

  return (
    <div className="app-root">
      <div className="corner-controls">
        <button className="ctrl-btn" onClick={sound.toggleMute} title={sound.muted ? 'Unmute' : 'Mute'}>
          {sound.muted ? '🔇' : '🔊'}
        </button>
        <button className="ctrl-btn" onClick={handleFullscreen} title="Toggle fullscreen">⛶</button>
      </div>

      {state.phase === PHASES.SETUP && (
        <SetupScreen teams={state.teams} dispatch={dispatch} shuffleArray={shuffleArray} questions={questions} />
      )}
      {state.phase !== PHASES.SETUP && state.phase !== PHASES.RESULT && (
        <QuizScreen state={state} dispatch={dispatch} questions={questions} sound={sound} />
      )}
      {state.phase === PHASES.RESULT && (
        <ResultScreen state={state} dispatch={dispatch} shuffleArray={shuffleArray} questions={questions} />
      )}
    </div>
  );
}
