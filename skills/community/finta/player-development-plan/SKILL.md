---
name: player-development-plan
description: Build a personalised, multi-domain player development plan for a football player. Use when a coach or player needs a structured development roadmap covering technical skills, physical qualities, psychological skills, and tactical understanding — with clear priorities, timelines, and measurable milestones.
risk: safe
source: finta
date_added: "2026-05-29"
---

# Player Development Plan Builder

## Overview

Combines **skill acquisition**, **biomechanics**, **physical preparation**, **sport neuroscience**, and **mental preparation** to create a complete, individualised Player Development Plan (PDP) with prioritised actions, training prescriptions, and progress markers.

## When to Use

- Coach or player asks: "build a development plan for…", "what should this player work on?", "create a PDP for…"
- You have a player profile (position, age, current level, identified strengths/weaknesses)
- Preparing for a development conversation between coach and player

## Required Inputs

Collect before starting:

1. **Player profile** — name/alias, age, position, current level of play
2. **Performance data** — any available: video observations, test results, coach assessments, GPS data
3. **Identified strengths** — what the player does well (at least 2)
4. **Development priorities** — coach/player view on areas to improve (at least 2)
5. **Development horizon** — timeframe: 3 months / 6 months / 1 season
6. **Available training time** — sessions per week available for development work

## Workflow

### Step 1 — Player Profile Analysis
Read agents: `agents/finta_coaching_biomechanics.md`, `agents/finta_coaching_physical-preparation.md`

Assess the physical development profile:
- Identify key physical qualities for the position (e.g., explosive power for central defenders, repeated sprint ability for wide players)
- Note any movement quality issues based on position demands and available data
- Map chronological vs. biological age if youth player (relative age effect consideration)
- Identify physical development priorities (what is limiter vs. what is already a strength)

### Step 2 — Technical / Tactical Skill Gap Analysis
Read agent: `agents/finta_coaching_skill-acquisition.md`

- Map the player's technical skill profile against the demands of their position
- Identify the skills that are: (a) ready for performance, (b) in acquisition, (c) not yet present
- Prioritise skills by: impact on performance × current gap × trainability
- Specify the learning stage for each priority skill (cognitive / associative / autonomous)

### Step 3 — Cognitive and Perceptual Development
Read agent: `agents/finta_coaching_sport-neuroscience.md`

- Identify perceptual-cognitive demands of the player's position (anticipation, decision speed, spatial awareness)
- Assess current cognitive performance indicators if available
- Recommend specific perceptual-cognitive training approaches appropriate to the player's level

### Step 4 — Psychological Skills Foundation
Read agent: `agents/finta_coaching_mental-preparation.md`

- Assess psychological skills profile: confidence, focus, emotional control, motivation orientation
- Identify the psychological skill most limiting current performance
- Design a basic psychological skills development component appropriate to the player's age and level

### Step 5 — Plan Architecture

Produce the structured PDP:

```
PLAYER DEVELOPMENT PLAN
Player: [profile] | Position: [X] | Level: [X] | Age: [X]
Development Horizon: [timeframe] | Review Date: [date]

PLAYER PROFILE SUMMARY
Strengths: [2-3 genuine strengths to build on]
Development Priorities: [ranked 1-3]

DEVELOPMENT GOALS (SMART)
Goal 1: [Technical/Tactical]
  Target: [specific measurable outcome]
  Timeline: [by when]
  Success indicator: [how we will know]

Goal 2: [Physical]
  Target: [specific measurable outcome]
  Timeline: [by when]
  Success indicator: [how we will know]

Goal 3: [Psychological/Cognitive]
  Target: [specific measurable outcome]
  Timeline: [by when]
  Success indicator: [how we will know]

WEEKLY DEVELOPMENT PRESCRIPTION
Priority 1 work: [X] sessions/week — [specific exercise/drill/practice type]
Priority 2 work: [X] sessions/week — [specific exercise/drill/practice type]
Priority 3 work: [X] sessions/week — [specific exercise/drill/practice type]

PHASE STRUCTURE
Phase 1 ([weeks 1-X]): [focus + key activities]
Phase 2 ([weeks X-X]): [focus + key activities]
Phase 3 ([weeks X-X]): [focus + key activities]

PROGRESS MONITORING
Week 4 review: [what to assess]
Mid-point review: [what to assess]
End-point assessment: [what to assess + how]

COACH-PLAYER CONVERSATION GUIDE
Opening question: [specific question to engage player ownership]
Development conversation structure: [3 key points to discuss]
```

## Output Quality Standards

- Each development goal must be SMART: Specific, Measurable, Achievable, Relevant, Time-bound
- Physical, technical, and psychological goals must be integrated — not treated as separate silos
- The weekly prescription must be realistic given the player's available training time
- At least one goal must be player-owned (identified by the player, not only the coach)
- The plan must include a review mechanism — development plans without review cycles are rarely implemented
