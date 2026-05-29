---
name: athlete-psychological-profile
description: Build a comprehensive psychological performance profile for an athlete. Use when a sport psychologist, coach, or athlete needs a structured assessment of mental performance strengths and development areas — covering arousal regulation, attention, confidence, motivation, and resilience — with a targeted psychological skills development plan.
risk: safe
source: finta
date_added: "2026-05-29"
---

# Athlete Psychological Profile Builder

## Overview

Combines **mental preparation**, **sport neuroscience**, **decision science**, and **complex systems** to build a comprehensive psychological performance profile and individualised mental skills development plan for athletes across any sport.

## When to Use

- Sport psychologist or coach asks: "profile this athlete's mental game", "design a psych skills programme for…"
- An athlete reports: mental blocks, performance anxiety, inconsistent competition performance, concentration issues, burnout signs
- Pre-season psychological assessment
- Post-competition review identifying psychological factors in performance decline

## Required Inputs

1. **Athlete profile** — sport, position/event, age, competition level, training age
2. **Performance pattern** — describe the performance pattern: consistent in training, inconsistent in competition? Clutch performer? Struggles after errors?
3. **Athlete self-report** — any self-described psychological challenges or strengths
4. **Critical incidents** — 2-3 specific performance situations (good and poor) that illustrate psychological patterns
5. **Competition context** — upcoming competition timeline and its significance

## Workflow

### Step 1 — Psychological Performance Profile (Mental Preparation lens)
Read agent: `agents/finta_sport_mental-preparation.md`

Assess the athlete across six psychological performance domains:

| Domain | Assessment Questions |
|---|---|
| **Confidence** | Source of confidence (mastery vs. outcome)? Fragility under adversity? |
| **Arousal Regulation** | IZOF profile: optimal zone? Over/under-arousal patterns? |
| **Attention & Focus** | Attentional style: broad-internal? Narrow-external? Error response patterns |
| **Motivation** | Autonomous vs. controlled? Goal orientation: task vs. ego? |
| **Resilience** | Adversity response: rebound time, coping style, support seeking |
| **Pre-competition Routine** | Structured or unstructured? Effective or counterproductive? |

### Step 2 — Neuroscience of Performance Layer
Read agent: `agents/finta_sport_sport-neuroscience.md`

- Map the athlete's perceptual-cognitive performance profile
- Identify any attentional or arousal regulation issues at the neurological level
- Assess HRV data if available as a stress/recovery biomarker
- Recommend any perceptual-cognitive training relevant to the sport and the profile

### Step 3 — Decision Making Under Pressure (Decision Science lens)
Read agent: `agents/finta_sport_decision-science.md`

- Analyse decision-making quality across the critical incidents
- Identify cognitive biases affecting performance: outcome bias, loss aversion, confirmation bias in self-assessment
- Assess how pressure affects decision speed and accuracy
- Design decision-quality training interventions where needed

### Step 4 — Performance Environment Analysis (Complex Systems lens)
Read agent: `agents/finta_sport_complex-systems.md`

- Examine the broader performance environment: team dynamics, coach relationship, competitive pressure sources
- Identify systemic factors contributing to psychological performance patterns
- Assess the constraints affecting psychological performance (are issues individual or environmental?)

### Step 5 — Psychological Skills Development Plan

```
ATHLETE PSYCHOLOGICAL PROFILE
Athlete: [profile] | Sport: [X] | Date: [X]
Assessed by: [coach/sport psychologist/self]

PSYCHOLOGICAL PERFORMANCE SUMMARY
Confidence: [strength / development area / rating 1-10]
Arousal regulation: [strength / development area / rating 1-10]
Attention & focus: [strength / development area / rating 1-10]
Motivation: [strength / development area / rating 1-10]
Resilience: [strength / development area / rating 1-10]
Pre-competition routine: [strength / development area / rating 1-10]

PERFORMANCE PATTERN ANALYSIS
Training–competition gap: [Y/N + description]
Critical incident analysis: [pattern across the 2-3 examples]
Primary psychological limiter: [the one thing most constraining performance]

IZOF PROFILE
Optimal arousal zone: [low/medium/high]
Typical pre-competition state: [over/under/in zone]
Arousal regulation strategy needed: [activation vs. de-activation]

PSYCHOLOGICAL SKILLS DEVELOPMENT PLAN
Priority 1: [skill] — Technique: [X] — Practice: [frequency/context]
Priority 2: [skill] — Technique: [X] — Practice: [frequency/context]
Priority 3: [skill] — Technique: [X] — Practice: [frequency/context]

PRE-COMPETITION ROUTINE
T-24h: [mental preparation activity]
Match day morning: [routine elements]
Warm-up: [psychological activation sequence]
Final 5 minutes: [focus cue + activation state]

POST-PERFORMANCE PROTOCOL
Positive: [3-step review process]
Negative: [reframe process + recovery timeline]

PROGRESS INDICATORS
[3 observable behaviours that signal psychological skills development]
Review schedule: [when to reassess]
```

## Output Quality Standards

- The profile must identify a hierarchy of psychological development priorities — not all six domains simultaneously
- Every psychological skill recommendation must be matched to a specific evidence-based technique (not generic "develop confidence")
- The pre-competition routine must be concrete, timed, and immediately implementable
- Performance environment factors must be included — individual psychological development without addressing contextual stressors is incomplete
- The plan must include how progress will be observed and measured
