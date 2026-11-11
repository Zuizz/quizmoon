import { useEffect, useCallback } from 'react';
import { PHASES } from '../config';
import Timer from './Timer';

const LABELS = ['A', 'B', 'C', 'D'];

export default function QuestionCard({ question, phase, selectedAnswer, onAnswer, onTimerExpire, onTimerTick }) {
  const isLocked = selectedAnswer !== null || phase === PHASES.REVEAL;
  const isReveal = phase === PHASES.REVEAL;

  // Keyboard handler: only active during QUESTION phase
  const handleKey = useCallback((e) => {
    if (phase !== PHASES.QUESTION) return;
    if (selectedAnswer !== null) return;
    const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3, 'a': 0, 'b': 1, 'c': 2, 'd': 3 };
    const idx = keyMap[e.key.toLowerCase()];
    if (idx !== undefined) {
      e.preventDefault();
      onAnswer(idx);
    }
  }, [phase, selectedAnswer, onAnswer]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const getOptionClass = (idx) => {
    let cls = 'option-btn';
    if (!isReveal) {
      if (selectedAnswer === idx) cls += ' selected';
      return cls;
    }
    // Reveal phase: show correct/wrong
    if (idx === question.correctIndex) {
      cls += ' correct';
    } else if (idx === selectedAnswer && selectedAnswer !== question.correctIndex) {
      cls += ' wrong selected';
    }
    return cls;
  };

  return (
    <div className="question-overlay">
      <div className="question-card">
        <Timer
          active={phase === PHASES.QUESTION}
          onExpire={onTimerExpire}
          onTick={onTimerTick}
        />
        <p className="question-text">{question.question}</p>
        <div className="options-grid">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              className={getOptionClass(idx)}
              disabled={isLocked}
              onClick={() => !isLocked && onAnswer(idx)}
            >
              <span className="option-label">{LABELS[idx]}</span>
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
