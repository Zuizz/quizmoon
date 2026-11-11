# 🏏 Cricket Quiz — Classroom Edition

A cricket-themed two-team quiz for classroom projectors. Built with React + Vite. Works fully offline after `npm install`.

## Quick Start

```bash
npm install
npm run dev
```

Then open the URL shown (usually http://localhost:5173) on your laptop. Project to the classroom display.

## How to Play

1. **Setup**: Enter names for Team 1 and Team 2, then click **Start Match**.
2. **Each turn**: A bowling animation plays, then the question pops up.
3. **Answer**: Click an option (A/B/C/D) or press **1–4** or **A–D** on the keyboard.
4. **Scoring**:
   - ✅ Correct answer **within the first 10 seconds** → **6 points** (SIX!)
   - ✅ Correct answer **after 10 seconds** (up to 30s) → **4 points** (FOUR!)
   - ❌ Wrong answer or **no answer** by 30s → **0 points** (OUT!)
5. Teams alternate for 10 questions (5 each). The team with the most points wins.

## Controls

| Key / Button | Action |
|---|---|
| `1` / `A` | Select option A |
| `2` / `B` | Select option B |
| `3` / `C` | Select option C |
| `4` / `D` | Select option D |
| 🔊 / 🔇 button | Toggle sound effects |
| ⛶ button | Toggle fullscreen |

## Editing Questions

Open **`src/data/questions.js`**. Each question is an object:

```js
{
  id: 1,
  question: 'Your question here?',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctIndex: 2,   // 0 = A, 1 = B, 2 = C, 3 = D
}
```

You can add, remove, or reorder questions. Keep exactly 4 options per question and update `correctIndex`. The quiz always picks 10 questions (all of them if you have exactly 10, random 10 if you have more).

## Editing Time & Score Constants

Open **`src/config.js`**:

| Constant | Default | Meaning |
|---|---|---|
| `QUESTION_TIME` | `30` | Seconds per question |
| `SIX_WINDOW` | `10` | Seconds at start for a 6-point answer |
| `SIX_POINTS` | `6` | Points for fast correct answer |
| `FOUR_POINTS` | `4` | Points for slow correct answer |
| `REVEAL_DURATION` | `2000` | ms to show correct/wrong before hit animation |
| `HIT_ANIM_DURATION` | `2500` | ms for the batting animation |
| `SCORE_UPDATE_DURATION` | `1500` | ms on score screen before next turn |
| `BOWLING_ANIM_DURATION` | `2800` | ms for the bowling animation |

## Project Structure

```
src/
├── config.js              # All game constants (edit timing & scoring here)
├── gameReducer.js         # State machine (phases: SETUP → TURN_INTRO → BOWLING → QUESTION → REVEAL → HITTING → SCORE_UPDATE → RESULT)
├── App.jsx                # Root component
├── App.css                # All styles
├── data/
│   └── questions.js       # Quiz questions (edit here)
├── hooks/
│   ├── useGameTimer.js    # Drift-resistant countdown timer
│   └── useSound.js        # Web Audio API sound effects
└── components/
    ├── SetupScreen.jsx    # Team name entry
    ├── Scoreboard.jsx     # Persistent top bar
    ├── Pitch.jsx          # SVG cricket pitch & animations
    ├── Timer.jsx          # Countdown bar with six-zone marker
    ├── QuestionCard.jsx   # Question + options + keyboard shortcuts
    ├── ResultOverlay.jsx  # SIX / FOUR / OUT animation with confetti
    ├── QuizScreen.jsx     # Main quiz orchestrator
    └── ResultScreen.jsx   # Final scores & Play Again / Rematch
```

## Running for Production (Optional)

```bash
npm run build
npm run preview
```

The `dist/` folder is fully self-contained and can be served from any static host.
