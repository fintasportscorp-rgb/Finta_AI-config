---
name: football-training-session
description: Design a complete, periodisation-aligned football training session. Use when a coach asks to build a session, plan training for a specific objective (pressing, transitions, set pieces, physical load), or needs a structured session with warm-up, main block, game activity, and cool-down — grounded in skill acquisition science and biomechanical safety.
risk: safe
source: finta
date_added: "2026-05-29"
---

# Football Training Session Designer

## Overview

Orchestrates four expert domains — **coaching philosophy**, **physical preparation**, **skill acquisition**, and **biomechanics** — to produce a complete, science-grounded football training session that is periodisation-aware, technically sound, and safe.

## When to Use

- Coach asks: "design a training session on…", "build me a pressing session", "I need Thursday's session"
- User provides a training objective (tactical, technical, physical, or mixed)
- User wants a session adapted to a specific squad profile (age, level, fatigue, microcycle day)

## Required Inputs

Ask for these before starting if not provided:

1. **Training objective** — what is the primary focus? (e.g., high pressing trigger, short combinations, aerial duels, transition speed)
2. **Squad context** — age group, level (amateur / semi-pro / professional), approximate squad size
3. **Microcycle position** — MD-5 / MD-4 / MD-3 / MD-2 / MD+1 / MD+2 (or simply: heavy day / moderate day / activation day)
4. **Session duration** — total time available (e.g., 75 min, 90 min)
5. **Any constraints** — pitch size, injury concerns, equipment available

## Workflow

### Step 1 — Periodisation Check (Physical Preparation lens)
Read agent: `agents/finta_coaching_physical-preparation.md`

- Map the microcycle day to the appropriate load target (volume, intensity, neuromuscular demand)
- Identify which physical qualities to develop vs. preserve vs. avoid today
- Set the session's RPE target and total contact time with the ball

### Step 2 — Tactical Objective Framing (Complex Systems / Coaching Philosophy lens)
Read agents: `agents/finta_coaching_philosophy-development.md`, `agents/finta_coaching_complex-systems.md`

- Define the specific tactical principle to be trained (in possession / out of possession / transition)
- Break the objective into sub-principles that can be isolated in training exercises
- Frame the coaching approach: guided discovery vs. direct instruction vs. constraints manipulation

### Step 3 — Session Architecture (Skill Acquisition lens)
Read agent: `agents/finta_coaching_skill-acquisition.md`

Design the session structure using representative learning design principles:

| Block | Duration | Purpose |
|---|---|---|
| Activation / Rondo | 10–15 min | Physical + cognitive warm-up, ball familiarity |
| Analytical Phase | 10–15 min | Isolated technical element (if needed) |
| Structured Game Form | 20–30 min | SSG / MSS / position game targeting the principle |
| Integrated Game | 15–20 min | Large-sided game — full tactical expression |
| Cool-down / Review | 5–10 min | Physical recovery + cognitive consolidation |

For each exercise specify:
- **Format**: players, pitch size, rules/constraints
- **Coaching focus**: one primary observation point
- **Progression trigger**: when to advance or regress
- **Key questions** for guided discovery moments

### Step 4 — Biomechanical Safety Layer (Biomechanics lens)
Read agent: `agents/finta_coaching_biomechanics.md`

- Flag any exercises with elevated injury risk given the squad context or microcycle day
- Confirm warm-up activates the required musculo-tendinous chains for the session's demands
- Recommend any movement prep or mobility drills specific to this session's physical demands

### Step 5 — Session Document Assembly

Produce the complete session document:

```
SESSION PLAN
Objective: [primary focus]
Duration: [total] | Microcycle: [MD-X] | RPE Target: [x/10]

WARM-UP [X min]
[Exercise 1] — [format] — [coaching focus]

ANALYTICAL PHASE [X min] (if applicable)
[Exercise] — [format] — [coaching focus]

MAIN BLOCK [X min]
[Exercise name]
Format: [players / pitch / rules]
Constraints: [key rule or task constraint]
Coaching focus: [one observation]
Progressions: [trigger + next variant]

INTEGRATED GAME [X min]
[Exercise name] — [format] — [scoring system if applicable]

COOL-DOWN / REVIEW [X min]
[Recovery activity + review questions]

LOAD SUMMARY
Volume: [total active time]
Intensity: [RPE target + any high-intensity periods]
Biomechanical flags: [any notes]
```

## Output Quality Standards

- Every exercise must have an identifiable link to the session's primary objective
- No exercise should violate the microcycle load profile
- The session must be executable by a coach with standard equipment
- Progressions and regressions must be specified for each key exercise
- The integrated game must allow the trained principle to emerge naturally (do not over-constrain)
