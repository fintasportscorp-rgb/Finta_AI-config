---
name: sport-performance-plan
description: Build a periodised performance plan for any sport. Use when an athlete or coach needs a structured annual or seasonal training plan covering physical preparation, technical skill development, psychological periodisation, and technology-supported monitoring — adapted to the sport's competitive calendar.
risk: safe
source: finta
date_added: "2026-05-29"
---

# Sport Performance Plan Builder

## Overview

Multi-sport skill combining **physical preparation**, **skill acquisition**, **sport neuroscience**, **mental preparation**, and **sport technology** to produce a complete periodised performance plan for any sport — from team sports to individual Olympic disciplines.

## When to Use

- Athlete or coach asks: "build a performance plan for my season", "design my training year", "how should I periodise for [sport]?"
- Preparing for a competitive season, tournament block, or qualification campaign
- Returning to structured training after off-season, injury, or competition break

## Required Inputs

1. **Sport and discipline** — specific sport + event/position if applicable
2. **Athlete profile** — age, training age (years of structured training), current performance level
3. **Competitive calendar** — key competitions dates, A/B/C priority classification
4. **Physical testing data** — any available: VO2max, strength tests, speed, power, anthropometrics
5. **Previous training history** — typical training volume, any recent injury history
6. **Goal for the season** — specific performance target (time, ranking, competition outcome)

## Workflow

### Step 1 — Competitive Calendar Analysis (Physical Preparation lens)
Read agent: `agents/finta_sport_physical-preparation.md`

- Map A, B, and C priority competitions across the season
- Design macrocycle structure: preparation period → specific preparation → pre-competition → competition → transition
- Determine peak performance targets (typically 1-2 true peaks per season)
- Calculate available training weeks and distribute volume/intensity accordingly

### Step 2 — Physical Development Priorities
Read agent: `agents/finta_sport_physical-preparation.md`

For this sport and athlete profile:
- Identify the primary physical qualities (energy systems, force-velocity profile, movement demands)
- Design a strength & conditioning framework appropriate to sport demands
- Specify load monitoring approach: which metrics to track (ACWR, CTL/ATL, TRIMP, RPE)
- Define training load targets for each macrocycle phase

### Step 3 — Technical / Skill Acquisition Plan
Read agent: `agents/finta_sport_skill-acquisition.md`

- Identify the 3-5 highest-leverage technical skills for performance in this sport
- Determine the acquisition stage for each skill (cognitive / associative / autonomous)
- Design representative learning environments specific to this sport
- Integrate technical work into the periodisation framework (high skill work in low fatigue blocks)

### Step 4 — Perceptual-Cognitive Performance Layer
Read agent: `agents/finta_sport_sport-neuroscience.md`

- Identify the key perceptual-cognitive demands of this sport (anticipation, pattern recognition, reaction time, decision speed)
- Recommend sport-specific perceptual-cognitive training approaches
- Integrate HRV monitoring into the athlete's daily readiness assessment
- Design any neurofeedback or attention training appropriate to the sport

### Step 5 — Psychological Periodisation
Read agent: `agents/finta_sport_mental-preparation.md`

- Design psychological skills development across the season phases
- Build competition-specific mental preparation protocols (IZOF, pre-competition routines)
- Plan for psychological stress management during peak training blocks
- Include mental recovery protocols in transition phases

### Step 6 — Technology and Monitoring Stack
Read agent: `agents/finta_sport_sport-technology.md`

- Recommend appropriate technology tools for this sport and level (GPS, video, HRV, force plates)
- Design a data collection and review cadence
- Specify key performance indicators to track across the season
- Build a simple dashboard framework for athlete + coach communication

### Step 7 — Seasonal Plan Document

```
PERFORMANCE PLAN
Athlete: [profile] | Sport: [X] | Season: [dates]
Performance Goal: [specific measurable target]

COMPETITIVE CALENDAR
A competitions: [dates + events]
B competitions: [dates + events]
C competitions: [dates + events]

MACROCYCLE STRUCTURE
Phase 1 — General Preparation: [dates / weeks / key focus]
Phase 2 — Specific Preparation: [dates / weeks / key focus]
Phase 3 — Pre-Competition: [dates / weeks / key focus]
Phase 4 — Competition Peak: [dates / weeks / key focus]
Phase 5 — Transition: [dates / weeks / key focus]

PHYSICAL DEVELOPMENT PLAN
Primary qualities to develop: [ranked list]
Weekly training volume targets by phase: [volume/intensity grid]
S&C framework: [key sessions per week]
Load monitoring: [metrics + thresholds]

TECHNICAL DEVELOPMENT PRIORITIES
Priority 1: [skill] — stage: [X] — training method: [X]
Priority 2: [skill] — stage: [X] — training method: [X]
Priority 3: [skill] — stage: [X] — training method: [X]

PSYCHOLOGICAL SKILLS PLAN
Preparation period: [focus]
Competition period: [focus]
Pre-competition routine: [structure]

MONITORING AND REVIEW
Daily: [HRV / subjective wellness]
Weekly: [load metrics review]
Monthly: [performance testing]
Key review dates: [aligned with phase transitions]

TECHNOLOGY STACK
Tracking: [tools selected]
Analysis: [tools selected]
KPIs: [3-5 key performance indicators]
```

## Output Quality Standards

- The plan must be periodisation-coherent: load, intensity, and skill complexity must follow a logical progression
- Technical work must be integrated with physical load — high-complexity skill work in high-fatigue states is contraindicated
- Every monitoring metric must have a defined action threshold — data without decision rules is noise
- The plan must be realistic for the athlete's training age and context — avoid professional-level periodisation for amateur athletes
