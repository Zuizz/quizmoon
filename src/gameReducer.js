import { PHASES, TOTAL_QUESTIONS } from './config';

export const initialState = {
  phase: PHASES.SETUP,
  teams: [
    { name: '', score: 0 },
    { name: '', score: 0 },
  ],
  currentQ: 0,
  currentTeam: 0,
  selectedAnswer: null,
  scoreResult: null,
  elapsedAtAnswer: null,
  questionOrder: [],
};

export function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_TEAM_NAME': {
      const teams = state.teams.map((t, i) =>
        i === action.teamIndex ? { ...t, name: action.name } : t
      );
      return { ...state, teams };
    }

    case 'START_MATCH': {
      return {
        ...state,
        phase: PHASES.TURN_INTRO,
        teams: state.teams.map(t => ({ ...t, score: 0 })),
        currentQ: 0,
        currentTeam: 0,
        selectedAnswer: null,
        scoreResult: null,
        elapsedAtAnswer: null,
        questionOrder: action.questionOrder,
      };
    }

    case 'PHASE_BOWLING':
      return { ...state, phase: PHASES.BOWLING, selectedAnswer: null, scoreResult: null, elapsedAtAnswer: null };

    case 'PHASE_QUESTION':
      return { ...state, phase: PHASES.QUESTION };

    case 'LOCK_ANSWER': {
      if (state.selectedAnswer !== null) return state;
      if (state.phase !== PHASES.QUESTION) return state;
      return {
        ...state,
        selectedAnswer: action.answerIndex,
        elapsedAtAnswer: action.elapsed,
      };
    }

    case 'PHASE_REVEAL': {
      return { ...state, phase: PHASES.REVEAL };
    }

    case 'PHASE_HITTING': {
      return { ...state, phase: PHASES.HITTING, scoreResult: action.scoreResult };
    }

    case 'PHASE_SCORE_UPDATE': {
      const result = state.scoreResult;
      const points = result === 'six' ? 6 : result === 'four' ? 4 : 0;
      const teams = state.teams.map((t, i) =>
        i === state.currentTeam ? { ...t, score: t.score + points } : t
      );
      return { ...state, phase: PHASES.SCORE_UPDATE, teams };
    }

    case 'NEXT_TURN': {
      const nextQ = state.currentQ + 1;
      if (nextQ >= TOTAL_QUESTIONS) {
        return { ...state, phase: PHASES.RESULT };
      }
      return {
        ...state,
        phase: PHASES.TURN_INTRO,
        currentQ: nextQ,
        currentTeam: (state.currentTeam + 1) % 2,
        selectedAnswer: null,
        scoreResult: null,
        elapsedAtAnswer: null,
      };
    }

    case 'REMATCH': {
      return {
        ...initialState,
        phase: PHASES.TURN_INTRO,
        teams: state.teams.map(t => ({ name: t.name, score: 0 })),
        currentQ: 0,
        currentTeam: 0,
        questionOrder: action.questionOrder,
      };
    }

    case 'PLAY_AGAIN': {
      return { ...initialState, phase: PHASES.SETUP };
    }

    default:
      return state;
  }
}
