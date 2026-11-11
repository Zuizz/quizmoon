// Game constants — edit these to tune the quiz
export const QUESTION_TIME = 30;      // seconds for each question
export const SIX_WINDOW = 10;         // answer within this many seconds => 6 points
export const SIX_POINTS = 6;
export const FOUR_POINTS = 4;
export const ZERO_POINTS = 0;

export const REVEAL_DURATION = 2000;  // ms to show correct/wrong highlight
export const HIT_ANIM_DURATION = 2500; // ms for batting animation
export const SCORE_UPDATE_DURATION = 1500; // ms before next turn starts
export const BOWLING_ANIM_DURATION = 2800; // ms for bowling animation

export const TOTAL_QUESTIONS = 10;
export const QUESTIONS_PER_TEAM = 5;

export const TEAM_COLORS = {
  team1: { primary: '#3B82F6', accent: '#93C5FD', glow: '#1D4ED8' },
  team2: { primary: '#F97316', accent: '#FED7AA', glow: '#C2410C' },
};

export const PHASES = {
  SETUP: 'SETUP',
  TURN_INTRO: 'TURN_INTRO',
  BOWLING: 'BOWLING',
  QUESTION: 'QUESTION',
  REVEAL: 'REVEAL',
  HITTING: 'HITTING',
  SCORE_UPDATE: 'SCORE_UPDATE',
  RESULT: 'RESULT',
};
