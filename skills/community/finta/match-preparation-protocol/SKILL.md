---
name: match-preparation-protocol
description: Build a complete match preparation protocol for a football team or player. Use when a coach needs a structured MD-2/MD-1/MD-0 preparation cycle covering tactical briefing, mental activation, physical readiness, set piece review, and pre-match routine — optimised for the specific opponent and context.
risk: safe
source: finta
date_added: "2026-05-29"
---

# Match Preparation Protocol Builder

## Overview

Combines **decision science**, **mental preparation**, **complex systems** (tactical), **physical preparation**, and **team culture** to produce a structured, opponent-specific match preparation protocol covering the 48-72 hours before kick-off.

## When to Use

- Coach asks: "how do we prepare for [opponent]?", "build the pre-match week", "design our MD-1 session"
- User has information about the upcoming opponent
- Preparing a final activation session, team meeting structure, or dressing room protocol

## Required Inputs

1. **Match context** — competition type (league / cup / tournament), importance level, home/away
2. **Opponent profile** — known strengths, weaknesses, tactical system, key players
3. **Own team context** — squad availability, recent form, fatigue state (last match + training load)
4. **Preparation window** — how many days until match (MD-3, MD-2, MD-1, or same day)
5. **Focus areas** — coach's top 2-3 priorities for this specific match

## Workflow

### Step 1 — Opponent Analysis Frame (Decision Science lens)
Read agent: `agents/finta_coaching_decision-science.md`

Structure the opponent analysis to avoid confirmation bias:
- Identify the 3 most significant tactical threats from the opponent
- Identify the 3 most exploitable weaknesses or patterns
- Flag any assumptions being made that should be challenged
- Recommend the specific decision-making moments to prepare players for

### Step 2 — Tactical Preparation Plan (Complex Systems lens)
Read agent: `agents/finta_coaching_complex-systems.md`

- Design the tactical adjustments specific to this opponent
- Identify the 2-3 key principles of play that will determine the match
- Structure the tactical communication approach: what to emphasise vs. what to leave flexible
- Design the in-possession and out-of-possession shape adjustments

### Step 3 — Physical Readiness Plan (Physical Preparation lens)
Read agent: `agents/finta_coaching_physical-preparation.md`

For each preparation day:
- MD-2: specify session type (technical + tactical, moderate load, no neuromuscular depletion)
- MD-1: specify activation session structure (short, explosive, confidence-building)
- MD-0 (match day): specify warm-up protocol timing, intensity curve, and psychological activation sequence

### Step 4 — Mental Preparation Protocol (Mental Preparation lens)
Read agent: `agents/finta_coaching_mental-preparation.md`

Design the psychological preparation sequence:
- Pre-match mental routine (48h out → match day)
- Team meeting structure: narrative arc, emotional activation, tactical clarity
- Individual player activation considerations (high-anxiety players vs. underactivated players)
- IZOF positioning: what activation level does this squad typically need?
- Dressing room protocol: timing, structure, coach final message framework

### Step 5 — Team Culture and Communication (Team Culture lens)
Read agent: `agents/finta_coaching_team-culture-leadership.md`

- Frame the match narrative: what is the meaning of this game for the squad?
- Identify the team values to activate pre-match
- Design the captain / leadership group role in preparation
- Handle any selection decisions or squad rotation communication sensitively

### Step 6 — Protocol Document Assembly

```
MATCH PREPARATION PROTOCOL
Opponent: [X] | Competition: [X] | Venue: [H/A] | Date: [X]
Squad availability: [key absences] | Fatigue state: [low/medium/high]

OPPONENT INTELLIGENCE SUMMARY
Key threats: [3 points]
Exploitable patterns: [3 points]
Decision moments to prepare for: [2-3 specific situations]

TACTICAL ADJUSTMENTS
In possession: [key principle + specific adjustment]
Out of possession: [key principle + specific adjustment]
Set pieces: [attacking + defending priorities]
Transitions: [specific trigger + response]

PREPARATION SCHEDULE
MD-2 Session: [duration / focus / load targets]
MD-1 Session: [duration / focus / load targets]
MD-0 Warm-up: [timing / structure / key moments]

TEAM MEETING STRUCTURE (MD-1)
Opening: [narrative hook — why this match matters]
Tactical block: [max 15 min — 2 key messages only]
Video: [2-3 clips max — show the opportunity, not only the threat]
Closing activation: [emotional register to finish on]

MATCH DAY MENTAL PROTOCOL
Dressing room arrival: [environment, music, tone]
Pre-warm-up: [team huddle or individual routine]
Post warm-up: [final team moment, captain message]
Coach final words: [3 sentences max — the one message]

CONTINGENCY PLANS
If losing at HT: [tactical + psychological adjustment]
If winning at HT: [how to protect without retreating]
```

## Output Quality Standards

- Opponent analysis must be evidence-based — flag speculation vs. confirmed observation
- Tactical adjustments must be specific and executable, not generic principles
- Mental preparation must match the squad's known psychological profile
- Match day timing must be precise — vague "do a warm-up" is insufficient
- Every intervention must have a clear purpose — nothing in the protocol just because it is traditional
