---
Name: refine-doc
description: Transform unstructured documents into professional specifications through systematic multi-agent refinement
argument-hint: <file_path|text>
---

## GLOBAL RULE: Smart Context Preservation
You HAVE TO save all results of your work to `.strategy/ideas/<idea_name>/`
You MUST always communicate and create documents in a language of the document provided or a user's language.
Get current date from the system.
When saving to `.strategy/ideas/<idea_name>/extracted-details.md`:
- DO NOT save raw conversation logs
- DO NOT write single-line checkmarks without context
- DO NOT save user's questions to the document
- DO save structured summaries with all critical details of user's answers:
  1. User's exact decisions (complete verbatim quotes) related to question
  2. Why each choice was made (reasoning)
  3. Implementation specifics discussed
  4. Dependencies and constraints identified
  5. Key insights that shaped decisions

Think of `.strategy/ideas/<idea_name>/extracted-details.md` as comprehensive meeting minutes - someone should understand all decisions and reasoning in 6 months.

## Step 1: Idea Folder Resolution

@stream-to-spec Read and analyze the document: $ARGUMENTS

Extract key concepts and potential project names from the document.

### Scan Existing Ideas
Check `.strategy/ideas/` directory for existing folders:
@stream-to-spec List all existing idea folders and their last modification dates.

### Present Options to User
IF existing folders found:
  Display options:
  ```
  Found existing ideas:
  1. [folder-name-1] (last modified: [date])
  2. [folder-name-2] (last modified: [date])
  3. [folder-name-3] (last modified: [date])
  4. [Create new folder]
  
  Based on your document, this could be related to: [suggested matches if any]
  ```
  
  Ask user: "Please choose an existing folder to continue work, or select 4 to create new:"
  Wait for user selection.
  
  IF user selects existing folder:
    Set <idea_name> = [selected-folder]
    Load existing progress if `.strategy/ideas/<idea_name>/extracted-details.md` exists
  ELSE:
    Ask user: "Enter name for new idea folder:"
    Wait for response
    Set <idea_name> = [user-provided-name]

IF no existing folders OR user chooses to create new:
  Suggest folder name based on document analysis
  Ask user: "Suggested folder name: '[suggested-name]'. Accept or provide alternative:"
  Wait for response
  Set <idea_name> = [final-name]

Create `.strategy/ideas/<idea_name>/` directory if doesn't exist.

Output: "✓ Working with idea: [<idea_name>]"

## Step 2: Initial Read and Type Detection

@stream-to-spec Read file: $ARGUMENTS

IF exists `.strategy/ideas/<idea_name>/extracted-details.md`: Load previous progress
ELSE: Create new `.strategy/ideas/<idea_name>/extracted-details.md` with header:
```markdown
# Document Refinement Record
## Original: [filename]
## Started: [timestamp]
## Type: [detected type]
## Core Concept: [one sentence]

## Process Metrics Dashboard
### Quality Metrics (Updated throughout process)
- **Contradictions Found**: Step 2 Pass 1: [X], Pass 2: [Y], Pass 3: [Z] | Total: [N]
- **Ambiguities Found**: Step 3 Pass 1: [X], Pass 2: [Y], Pass 3: [Z] | Total: [N]
- **Critical Issues Found**: Step 4: [X] issues identified, [Y] resolved
- **Improvements Found**: Step 6 Pass 1: [X], Pass 2: [Y], Pass 3: [Z] | Selected: [N]

### Extraction Metrics
- **Raw Details Extracted** (Step 5 Pass 1): [X] items
- **Enhanced with Context** (Step 5 Pass 2): [Y] items (+[Z] user context)
- **Organized Structure** (Step 5 Pass 3): [W] items in final structure
- **Extraction Completeness**: [W/Y * 100]% (Target: 100%)

### Document Creation Metrics
- **Draft Structure**: Created in [X] completeness iterations
- **Structured Document**: Created in [X] completeness iterations  
- **Final Specification**: Created in [X] completeness iterations
- **PRD** (if created): Created in [X] completeness iterations
- **UI/UX Wireframes** (if created): [X] screens designed, [Y] alternatives per screen, user choice: [Z]
- **Implementation Roadmap** (if created): [X] epics defined, [Y] complexity level, [Z] development weeks estimated

### Assessment Metrics (PRD Only)
- **Legal Assessment**: [X] regulatory risks identified, [Y] IP issues flagged, [Z] compliance requirements
- **Business Strategy & Economics**: Revenue projection [X], CAC/LTV ratio [Y], growth potential [Z/10]
- **Investment Assessment**: Market size (TAM) [X], investment decision [Y], proposed valuation [Z]
- **Competitive Analysis**: [X] competitors analyzed, market position [Y/10], differentiation score [Z/10]

### User Interaction Metrics
- **Total User Questions**: [X] asked across all steps
- **Response Rate**: [Y]/[X] questions answered ([%])
- **Clarification Attempts**: Step 2: [X], Step 3: [Y], Step 4: [Z], Step 6: [W]
- **Process Efficiency**: [X] total user touchpoints (Target: ≤3)

### Final Completeness Score
- **Original Details Preserved**: [X]/[Y] ([%])
- **User Decisions Implemented**: [X]/[Y] ([%])
- **Overall Process Quality**: [%] (Target: ≥95%)
```

Output findings and continue.

## Step 3: Find All Contradictions

@stream-to-spec Analyze the document for contradictions.

Find ALL conflicting statements, opposing options, or mutually exclusive choices. 
Take context of each statement into account. 
Use previous user's answers as a primary source of truth.

Format each as:
```
Contradiction #<number>: [Topic]
Context: "[Context summary]"
<number>.a) [Option A]
<number>.b) [Option B]
<number>.c) [Option C if exists]
```

IF contradictions found:
  Output all contradictions and STOP.
  
  ### User Response Handling (Up to 3 attempts)
  attempt_count = 1
  WHILE attempt_count <= 3 AND contradictions not fully resolved:
    IF attempt_count == 1:
      Ask user: "Please specify your choice for each contradiction (e.g., '1.a, 2.b, 3.a') or provide clarification."
    ELSE:
      Ask user: "Some contradictions still need clarification. Please help resolve the remaining [X] issues:"
      - Re-present unresolved contradictions with more context
      - Explain why each choice matters for the project
      - Offer suggested defaults if appropriate
    
    Wait for user response
    attempt_count++
    
    IF user provides partial answers:
      Record resolved contradictions
      Continue with remaining unresolved items
  
  IF after 3 attempts some contradictions remain unresolved:
    Record in extracted-details.md: "Unresolved contradictions after 3 attempts"
    Apply conservative defaults and note them
    Continue with process

IF no contradictions:
  Continue to next step.

Record user's decisions to `.strategy/ideas/<idea_name>/extracted-details.md` with full context:

```markdown
## Step 3: Contradictions Resolved [timestamp]

### Contradiction #1: [Topic] 
**Context shown to user:**
"[Full context from original document that led to contradiction]"

**Options presented:**
1.a) [Option A with full description]
1.b) [Option B with full description] 
1.c) [Option C with full description if exists]

**User's choice:** "[User's exact response]"
**User's reasoning:** "[Why user chose this option - their words]"
**Additional context from user:** "[Any extra requirements or constraints mentioned]"
**Implementation impact:** "[What this choice means for the project]"

[Repeat for each contradiction]

### Unresolved after 3 attempts:
**Contradiction:** "[Description]"
**Status:** No clear choice provided
**Assumption used:** "[Conservative default applied]"
```

### Iterative Re-analysis (Critical for Accuracy)
iteration_count = 1
WHILE iteration_count <= 3:
  @stream-to-spec Re-read original document WITH new knowledge from user responses.
  Look for NEW contradictions that became visible after resolving previous ones.
  Mark new findings: "Found on iteration [X]:"
  
  IF new contradictions found:
    Present to user and wait for response
    Add to extracted-details.md
    iteration_count++
  ELSE:
    Break from loop
    
IF after 3 iterations still finding new issues:
  Note remaining ambiguities and proceed with best understanding.

## Step 4: Identify Ambiguities and Gaps

@stream-to-spec Find all ambiguous statements and missing critical information in the document provided originally, with the respect to the previous user's feedback.

List unclear points with context details that have multiple interpretations or too broad scope.

Format as:
```
Unclear #<number>: [Topic]
Current: "[quote]"
Context: "[Context summary]"
Options:
<number>.A) [Interpretation/suggestion]
<number>.B) [Interpretation/suggestion]
Needs clarification on: [specific aspect]
```

Output all ambiguities and STOP.

### User Response Handling (Up to 3 attempts)
attempt_count = 1
WHILE attempt_count <= 3 AND ambiguities not fully resolved:
  IF attempt_count == 1:
    Ask user: "Please clarify the above points. You can choose options (e.g., '1.A, 2.B') or provide specific answers."
  ELSE:
    Ask user: "Some ambiguities still need clarification. Please help resolve the remaining [X] unclear points:"
    - Re-present unresolved ambiguities with examples
    - Show impact of different interpretations on project
    - Suggest reasonable defaults where applicable
  
  Wait for user response
  attempt_count++
  
  IF user provides partial clarifications:
    Record resolved ambiguities
    Continue with remaining unclear items

IF after 3 attempts some ambiguities remain unresolved:
  Record in extracted-details.md: "Unresolved ambiguities after 3 attempts"
  Apply reasonable interpretations and document assumptions
  Continue with process

Record user's clarifications to `.strategy/ideas/<idea_name>/extracted-details.md` with full context:

```markdown
## Step 4: Ambiguities Clarified [timestamp]

### Unclear Point #1: [Topic]
**Original text:** "[Quote from document that was ambiguous]"
**Context:** "[Why this was unclear/what was missing]"

**Options presented:**
A) [Interpretation/suggestion A]
B) [Interpretation/suggestion B]

**User's clarification:** "[User's exact response]"
**User's reasoning:** "[Why user chose this interpretation]"
**Specific requirements added:** "[Any new details user provided]"
**Assumptions clarified:** "[What assumptions were resolved]"

[Repeat for each ambiguity]

### Unresolved after 3 attempts:
**Ambiguity:** "[Description]"
**Status:** No clear guidance provided
**Working assumption:** "[How we'll proceed without clarification]"
```

### Iterative Ambiguity Detection
iteration_count = 1
WHILE iteration_count <= 3:
  @stream-to-spec Re-read original document WITH all user decisions from steps 2-3.
  Look for NEW ambiguities that became apparent after clarifications.
  Mark new findings: "Ambiguity found on iteration [X]:"
  
  IF new ambiguities found:
    Present to user and wait for response
    Add to extracted-details.md
    iteration_count++
  ELSE:
    Break from loop
    
IF after 3 iterations still finding new ambiguities:
  Note remaining ambiguities and proceed with best understanding.

## Step 5: Critical Problems Review (Parallel)
Analyze criticaL problems in the original document with the respect to the user feedback, each issue must have 3 options to resolve the issue. Run these subagent in parallel :
- Subagent @risk-manager Identify ONLY critical risks that could cause project failure. For each issue offer 3 mitigation options 3-10 words each.
- Subagent @security-engineer Find ONLY critical security vulnerabilities. For each issue offer 3 mitigation options 3-10 words each.
- Subagent @legal-counsel Identify ONLY critical legal/compliance issues. For each issue offer 3 mitigation options 3-10 words each.
- Subagent @product-strategist Find ONLY critical product issues. For each issue offer 3 mitigation options 3-10 words each.
- Subagent @strategic-advisor Find ONLY business perspectives issues. For each issue offer 3 mitigation options 3-10 words each.
- IF it is a complicated technical product: Subagent @system-architect Find ONLY architectural issues and implementation blockers. For each issue offer 3 mitigation options 3-10 words each.
- IF product involves PII: Subagent @privacy-engineer Find ONLY critical privacy violations. For each issue offer 3 mitigation options 3-10 words each.
- IF product involves payments: Subagent @payment-specialist Identify ONLY critical payment/financial risks. For each issue offer 3 mitigation options 3-10 words each.
- IF product involves AI: Subagent @ai-architect Identify ONLY critical AI implementation risks. For each issue offer 3 mitigation options 3-10 words each.
- IF product involves Claude Code: Subagent @claude-code-expert identify CC implementation risks, provide 3 mitigation options
Compile ONLY critical issues (ignore minor suggestions).

IF critical issues found:
  Gather and organise it in a list options
  Output as numbered list with options and STOP.
  Check that issues are realistic and not overthought.
  Ask user: "Critical issues found. How would you address these?"
  Wait for response before proceeding.

### Iterative Critical Issues Re-analysis
iteration_count = 1
WHILE iteration_count <= 3:
  @stream-to-spec Re-analyze document WITH all previous user decisions.
  Run critical review agents again to find NEW issues that emerged from user choices.
  Mark new findings: "Critical issue found on iteration [X]:"
  
  IF new critical issues found:
    Present to user with mitigation options
    Wait for response and add to extracted-details.md
    iteration_count++
  ELSE:
    Break from loop

Save to `.strategy/ideas/<idea_name>/extracted-details.md`:
```markdown
## Step 5: Critical Issues Addressed [timestamp]

### Issue: [Problem from agent]
- Severity: Critical
- Mitigation selected: "[user's choice]"
- Why this approach: [user's reasoning if provided]
- Implementation impact: [what this means]
```

IF no critical issues:
  Continue to next step.

## Step 6: Extract and Systematize All Details (Adaptive)

### PRE-CHECK: Verify Step 5 completion
Before proceeding, confirm:
- Did you run agents review in Step 5?
- Did you wait for ALL agents to respond?
- Did you compile their findings?
- Did you save results to `.strategy/ideas/<idea_name>/extracted-details.md`?

IF any checkbox is NO: Return to Step 5 immediately.

### Core Extraction: Three-Pass Methodology (Critical for Accuracy)
On this step you can't generate any details, that are not listed in the original document or were not provided with the user feedback.
If you do not find details for any clause, just write literally: "No details found".

@stream-to-spec Perform extraction in THREE PASSES:

### Pass 1: Raw Data Collection (No Processing)
- Read through ENTIRE original document
- Extract EVERY statement, fact, number, name, condition, requirement
- Do NOT group, categorize, or interpret anything
- Keep exact wording and context
- Include seemingly minor details
- Create simple list: "Raw extractions from original document"

### Pass 2: Context Integration (Add User Decisions)
- Take Pass 1 raw extractions
- Overlay ALL user decisions from Steps 2-6
- Apply user clarifications to resolve ambiguous extractions
- Add user-provided specifics to vague statements  
- Create enhanced list: "Extractions with user context applied"

### Pass 3: Systematic Organization (Final Structure)
Now organize enhanced extractions into standard categories.
Extract fundamental elements present in ANY document:

```markdown
## Step 6: Complete Extraction [current date/time]

### CORE INTENT
- Primary Goal: [What's trying to be achieved]
- Problems Solved: [Issues being addressed]
- Success Criteria: [How we know it worked]
- Context: [Why this is needed now]

### SCOPE
- Included: [What's in scope]
- Excluded: [What's out of scope]
- Assumptions: [What we assume]
- Constraints: [Limitations]

### ACTORS
- Key Participants: [Who's involved]
- Responsibilities: [Who does what]
- Decision Makers: [Who approves]
- Affected Parties: [Who's impacted]
```

### Adaptive Extraction: Extract whatever is present

@stream-to-spec 
@process-architect
@ai-architect

Check document for presence of following elements and extract if found:

#### IF document contains PROCESSES/WORKFLOWS:
```markdown
### PROCESSES & WORKFLOWS FOUND

**Process Architecture:**
- Process Types: [Meta/Core/Applied/etc]
- Process Relationships: [How they connect]
- Trigger Conditions: [What starts each]

**Workflows Identified:**
[For each workflow found]
- Name: [Process name]
- Trigger: [What initiates]
- Steps: [Sequential actions]
- Decision Points: [Where choices made]
- Outputs: [What produces]
- State Management: [How state tracked]

**Rules & Conventions:**
- Must Follow: [Mandatory rules]
- Best Practices: [Recommendations]
- Exceptions: [When rules don't apply]

**Quality Gates:**
- Checkpoints: [Where verified]
- Criteria: [What must pass]
- Reviewers: [Who checks]
```

#### IF document contains FEATURES/PRODUCTS:
```markdown
### FEATURES & FUNCTIONALITY FOUND

**Core Features:**
[List with descriptions]

**Supporting Features:**
[List with relationships]

**User Interactions:**
- User Flows: [How users interact]
- Interface Elements: [UI components]
- User Stories: [If described]
```

#### IF document contains TECHNICAL DETAILS:
```markdown
### TECHNICAL SPECIFICATIONS FOUND

**Architecture:**
- Patterns: [Design patterns mentioned]
- Principles: [SOLID/DRY/etc]
- Structure: [Monolith/Microservices/etc]

**Technology Stack:**
- Languages: [Programming languages]
- Frameworks: [Development frameworks]
- Databases: [Data storage]
- Infrastructure: [Deployment/hosting]
- Tools: [Development/deployment tools]

**Technical Requirements:**
- Performance: [Speed/scale needs]
- Security: [Security requirements]
- Reliability: [Uptime/stability]

**File/Data Structures:**
- Directory Structure: [Folders/organization]
- File Formats: [Types and naming]
- Data Models: [If described]
```

#### IF document contains ORGANIZATIONAL elements:
```markdown
### ORGANIZATIONAL STRUCTURE FOUND

**Roles & Teams:**
- Defined Roles: [Positions/responsibilities]
- Team Structure: [How organized]
- Reporting Lines: [Who reports to whom]

**Organizational Changes:**
- Current State: [As is]
- Future State: [To be]
- Transition Plan: [How to get there]
```

#### IF document contains STRATEGIES/PLANS:
```markdown
### STRATEGIC ELEMENTS FOUND

**Strategic Goals:**
- Vision: [Long-term aspiration]
- Objectives: [Measurable goals]
- KPIs: [Success metrics]

**Planning:**
- Phases: [Project phases]
- Milestones: [Key checkpoints]
- Dependencies: [What depends on what]
- Timeline: [If specified]
```

#### IF document contains AUTOMATION/ORCHESTRATION:
```markdown
### AUTOMATION & ORCHESTRATION FOUND

**Automation:**
- Automated Steps: [What runs automatically]
- Triggers: [What initiates automation]
- Conditions: [When automation applies]

**Orchestration:**
- Coordination: [How parts work together]
- Parallel Execution: [What runs simultaneously]
- Sequential Execution: [What must be ordered]
```

#### IF document contains STATE MANAGEMENT:
```markdown
### STATE MANAGEMENT FOUND

**State Storage:**
- Location: [Where state saved]
- Format: [How state structured]
- Persistence: [How state preserved]

**State Transitions:**
- States: [Possible states]
- Transitions: [How states change]
- Recovery: [Resume after failure]
```

#### IF document contains COMMANDS/APIS:
```markdown
### COMMANDS & INTERFACES FOUND

**Commands:**
[List all commands with syntax and purpose]

**APIs/Endpoints:**
[List all mentioned with parameters]

**Natural Language Processing:**
[If mentioned how system interprets user input]
```

#### IF document contains EXAMPLES/CASES:
```markdown
### EXAMPLES & CASES FOUND

**Use Cases:**
[Specific scenarios described]

**Examples Given:**
[Concrete examples with details]

**Edge Cases:**
[Special situations mentioned]

**Anti-patterns:**
[What NOT to do]
```

#### IF document contains RISKS/MITIGATIONS:
```markdown
### RISKS & MITIGATIONS FOUND

**Identified Risks:**
- Risk: [Description]
  - Impact: [What happens if realized]
  - Mitigation: [How to prevent/handle]
  - Contingency: [Backup plan]
```

#### IF document contains METRICS/MEASUREMENT:
```markdown
### METRICS & MEASUREMENT FOUND

**Success Metrics:**
[What's measured and how]

**Performance Indicators:**
[KPIs and targets]

**Quality Metrics:**
[Quality measurements]
```

### Extract ALL Specifics (ALWAYS do this)

Extract EVERY specific detail mentioned:

```markdown
### SPECIFIC DETAILS

**Named Items:**
- Products/Systems: [All named]
- People/Roles: [All mentioned]
- Files/Paths: [All specified]

**Numbers & Quantities:**
- Counts: [Specific numbers]
- Percentages: [All percentages]
- Limits: [Maximums/minimums]
- IDs/Versions: [Identifiers]

**Exact Text:**
- Definitions: "[Verbatim]"
- Rules: "[Exact wording]"
- Critical Requirements: "[As stated]"
- Formulas: "[Precisely]"

**Sequences & Order:**
- Step-by-step: [Exact order]
- Priority Lists: [Ranked items]
- Dependencies: [A before B]
```

### Identify Implicit Information (ALWAYS check)

```markdown
### IMPLICIT & UNSTATED

**Assumed Knowledge:**
[What reader should already know]

**Hidden Dependencies:**
[What's needed but not mentioned]

**Gaps & Ambiguities:**
[What needs clarification]

**Potential Issues:**
[What could be problematic]
```

### Create Systematic Structure (ALWAYS organize)

Organize ALL found information into logical layers:

```markdown
### SYSTEMATIC STRUCTURE

**Layer 1: Executive**
- One-line summary
- Core purpose
- Key stakeholders

**Layer 2: Strategic**
- Goals and problems
- Success metrics
- High-level approach

**Layer 3: Design**
- Solution architecture
- Key decisions made
- Design rationale

**Layer 4: Implementation**
- Detailed specifications
- Concrete steps
- Technical details

**Layer 5: Operational**
- How it works day-to-day
- Maintenance needs
- Evolution path

**Layer 6: Meta**
- Patterns observed
- Principles applied
- Lessons for future
```

### Final Verification

```markdown
### EXTRACTION COMPLETENESS

Elements Found:
✓ Processes/Workflows: [Yes/No - count if yes]
✓ Features/Products: [Yes/No - count if yes]
✓ Technical Details: [Yes/No - count if yes]
✓ Organizational: [Yes/No - count if yes]
✓ Strategic Elements: [Yes/No - count if yes]
✓ Automation: [Yes/No - count if yes]
✓ State Management: [Yes/No - count if yes]
✓ Commands/APIs: [Yes/No - count if yes]
✓ Examples: [Yes/No - count if yes]
✓ Risks: [Yes/No - count if yes]
✓ Metrics: [Yes/No - count if yes]

Total Unique Details Extracted: [count]
Document Completeness: [Assessment]
```

Save all to `.strategy/ideas/<idea_name>/extracted-details.md`

### Step 6.1: Three-Pass Verification
@stream-to-spec Verify completeness of extraction:

1. Count items in Pass 1 (raw extractions): [X]
2. Count items in Pass 2 (with user context): [Y] 
3. Count items in Pass 3 (organized): [Z]

Verification:
- Pass 1 should have most items (comprehensive raw extraction)  
- Pass 2 should have ≥ Pass 1 items (can only add, never remove)
- Pass 3 should have = Pass 2 items (just organized, nothing lost)

IF Pass 3 < Pass 2:
  Find missing items and add them to appropriate categories
  Re-run verification until Pass 3 = Pass 2

Record in extracted-details.md:
```markdown
### Extraction Verification
- Pass 1 (Raw): [X] items extracted
- Pass 2 (Enhanced): [Y] items with user context  
- Pass 3 (Organized): [Z] items in final structure
- Completeness: [Pass 3 = Pass 2? ✓/✗]
```

**UPDATE METRICS**: Update Extraction Metrics in Process Metrics Dashboard
- Raw Details Extracted: [X] from Pass 1
- Enhanced with Context: [Y] from Pass 2  
- Organized Structure: [Z] from Pass 3
- Extraction Completeness: [Z/Y * 100]%

Output: "✓ Extracted [total] details in 3 passes. Found elements in [X] categories: [list categories with content]"



## Step 7: Goal-Oriented Improvements (Parallel)

@stream-to-spec First identify the project's primary goal and success criteria.

Confirm goals with user and STOP
Format as:
```
Primary Goal: [main objective]
Secondary Goals:
[goal]
[goal]
Is this correct? Any goals to add/modify?
```
Wait for confirmation/corrections.
Save user's response to .strategy/ideas/<idea_name>/extracted-details.md:
```
## Step 7: Goals Confirmed [current date/time]

### User's Goal Confirmation
"[User's exact response]"

### Final Goals
1. [Goal as confirmed]: User emphasized "[key quote]"
2. [Additional goal]: "[User's words]"
```
Run these subagent IN PARALLEL:
FOR product ideas:
  - Subagent: @product-strategist Suggest improvements that directly support the stated goal
  - Subagent: @business-analyst Propose features that increase business value toward the goal
  - Subagent: @ux-researcher Recommend UX improvements that help achieve the goal
  - Subagent: @competitive-analyst Identify competitive advantages that support the goal
  - Subagent: @ai-architect propose AI-powered enhancements for the goal
  - Subagent: @process-architect suggest workflow optimizations

FOR technical:
  - Subagent: @solutions-architect Suggest architecture improvements for the goal
  - Subagent: @system-architect Propose system design enhancements
  - Subagent: @performance-engineer Recommend optimizations that support objectives
  - Subagent: @pragmatic-engineer Identify practical simplifications
  - Subagent: @ai-architect design intelligent components for the goal

- Subagent: @claude-code-expert optimize agent interactions (if applicable)

FOR process-related:
  -- Subagent @project-lead to identify process consistency and points of improvement

FOR claude-code related:
  -- Subagent @claude-code-expert to checkthe project complience to Claude Code best practices and offer improvements

FOR ALL types:
  @strategic-advisor Provide top 3 strategic improvements for achieving the goal

Format improvements as:
```
Improvement: [What]
Why it helps the goal: [Direct connection to stated objective]
Implementation: [Brief how]
```

Compile improvements and show to user.
Ask: "Which improvements would you like to include? (List numbers or 'none')"
Wait for response.
IF user wants to discuss improvement:
  - Enter discussion mode with relevant agent
  - Present detailed explanation with pros/cons
  - Allow Q&A until user satisfied (max 5 rounds)

Add user's feedback and approved improvements to `.strategy/ideas/<idea_name>/extracted-details.md`.

### Iterative Improvements Re-analysis
iteration_count = 1
WHILE iteration_count <= 3:
  @stream-to-spec Re-analyze document WITH all previous decisions and selected improvements.
  Run improvement agents again to find NEW opportunities that emerged from user choices.
  Mark new findings: "Improvement opportunity found on iteration [X]:"
  
  IF new improvement opportunities found:
    Present to user with implementation details
    Wait for response and add to extracted-details.md
    iteration_count++
  ELSE:
    Break from loop

```
## Step 7: Improvements Selected [current date/time]

### Iteration Log
- Iteration 1: [X] improvements found, [Y] selected by user
- Iteration 2: [X] additional improvements found, [Y] selected by user  
- Iteration 3: [X] additional improvements found, [Y] selected by user

### User's Complete Response
"[COMPLETE response, every word]"

### What User Selected
Explicitly chosen: [numbered items]
Implicitly accepted: [items user didn't reject]
Modified items: [items user wants changed]
Rejected items: [items user said no to]

### Additional Requirements Mentioned
While discussing improvements, user also said:
- "[Any performance requirement]"
- "[Any cost constraint]"
- "[Any timeline mention]"
- "[Any integration need]"
- "[Any concern raised]"

### Subtle Preferences Detected
User prefers: [any preference implied]
User dislikes: [any negative reaction]
User assumes: [any assumption made]

### Selected Improvements Detail

**[Improvement Name] (Found on iteration X)**
- What: [Core functionality in one sentence]
- Why selected: "[User's reason in their words]"
- Implementation: [Technical approach with specifics]
- Dependencies: [Required systems/integrations]
- User requirement: "[Specific constraint mentioned]"
- Priority: [If discussed]

[Repeat for ALL selected improvements]

### Rejected/Modified Items
**[Item]**: [Why rejected/how modified] - "[user quote]"

### Implementation Priorities
1. [First] - Because: "[user's reasoning]"
2. [Second] - Because: "[user's reasoning]"
```

## Step 8: Create Structured Original Document with Logical Flow

@stream-to-spec Create a systematized version of the original document with proper logical organization.

### Purpose of this step:
Create `.strategy/ideas/<idea_name>/structured.md` - the original document but:
- With **logical, sequential organization** of ideas
- With contradictions resolved (using user's choices)
- With ambiguities clarified (using user's answers)
- With critical issues addressed (using selected mitigations)
- With selected improvements integrated
- Preserving original voice and style (but not chaotic structure)

### Process:

1. **Analyze logical flow of ideas**
   ```markdown
   Identify:
   - Core concept (what's the main idea)
   - Context/background (why needed)
   - Goals/objectives (what to achieve)
   - Solution approach (how to do it)
   - Implementation details (specifics)
   - Next steps (what happens next)
   ```

2. **Reorganize content following logical sequence**
   
   **Standard logical flow patterns:**
   
   For **Product/Feature** documents:
   ```
   1. Problem/Opportunity
   2. Vision/Goal
   3. Target Users
   4. Core Solution
   5. Key Features (grouped logically)
   6. Technical Approach
   7. Success Metrics
   8. Implementation Plan
   ```
   
   For **Process/Workflow** documents:
   ```
   1. Purpose & Context
   2. Scope & Boundaries
   3. Key Principles
   4. Process Overview
   5. Detailed Steps (in execution order)
   6. Roles & Responsibilities
   7. Quality Controls
   8. Continuous Improvement
   ```
   
   For **Technical** documents:
   ```
   1. System Overview
   2. Architecture Principles
   3. Components (high-level → detailed)
   4. Data Flow
   5. Technical Stack
   6. Implementation Details
   7. Testing Strategy
   8. Deployment & Operations
   ```
   
   For **Strategy** documents:
   ```
   1. Current State
   2. Desired Future State
   3. Gap Analysis
   4. Strategic Approach
   5. Key Initiatives
   6. Success Metrics
   7. Risks & Mitigations
   8. Roadmap
   ```

3. **Group related ideas together**
   ```markdown
   Original (scattered):
   "Need auth. Price $15. Use React. OAuth important. Competitors charge $5-25. 
   Google login required. Maybe add Facebook. Stripe for payments."
   
   Structured (grouped):
   ## Authentication
   - Google login required (OAuth)
   - Consider Facebook login
   
   ## Pricing & Payments
   - Price: $15/month
   - Competitors: $5-25 range
   - Payment processor: Stripe
   
   ## Technology
   - Frontend: React
   ```

4. **Apply narrative coherence**
   - Each section flows naturally to the next
   - Ideas build upon previous concepts
   - No forward references to unexplained concepts
   - Progressive disclosure (general → specific)

5. **Integrate all refinements naturally**
   While reorganizing, incorporate:
   - Resolved contradictions from Step 3
   - Clarifications from Step 4
   - Critical issue mitigations from Step 5
   - Selected improvements from Step 7

### Reorganization principles:

**DO:**
- Start with WHY (context/problem)
- Then WHAT (solution/approach)
- Then HOW (implementation)
- Group related concepts together
- Follow dependencies (define before use)
- Build complexity gradually
- Use consistent terminology throughout

**DON'T:**
- Jump between unrelated topics
- Mix abstraction levels randomly
- Leave orphaned ideas
- Create circular references
- Assume knowledge not yet introduced

### Quality checks before saving:

✓ Ideas flow logically from general to specific
✓ Related concepts are grouped together
✓ No forward references to undefined concepts
✓ Each section builds on previous ones
✓ Original voice preserved (just organized)
✓ All content from original is included
✓ All refinements integrated naturally

Output: "✓ Created structured document with logical flow: [X] ideas reorganized into [Y] coherent sections"

Save to `.strategy/ideas/<idea_name>/structured.md`

### Structured Document Completeness Check (Automatic up to 5 iterations)
@stream-to-spec Perform completeness verification:

1. Load original document
2. Load all decisions from `.strategy/ideas/<idea_name>/extracted-details.md`
3. Create mental "reference document" = original + all user decisions
4. Compare structured.md against this reference
5. List ANY missing details, decisions, or refinements

completion_iteration = 1
WHILE completion_iteration <= 5:
  IF missing elements found:
    Update structured.md to include missing items
    Record in extracted-details.md: "Added to structured.md on iteration [X]: [list]"
    Re-run completeness check
    completion_iteration++
    Output: "🔄 Structured.md iteration [X]: Added [Y] missing items, re-checking..."
  ELSE:
    Break from loop
    
IF after 5 iterations still missing items:
  Record remaining gaps in extracted-details.md
  Output: "⚠️ [X] items still missing in structured.md after 5 iterations"
  
Final Output: "✓ Structured document completeness verified in [X] iterations"

## Step 9: Completeness Check

@stream-to-spec Perform completeness verification:

1. Load original document
2. Load all decisions from `.strategy/ideas/<idea_name>/extracted-details.md`
3. Create mental "reference document" = original + all user decisions
4. Compare draft-structure.md against this reference
5. List ANY missing details, requirements, or decisions

### Automatic Re-processing (Up to 5 iterations)
completion_iteration = 1
WHILE completion_iteration <= 5:
  IF missing elements found:
    Update draft-structure.md to include missing items
    Record in extracted-details.md: "Added on completion check iteration [X]: [list]"
    Re-run completeness check
    completion_iteration++
    Output: "🔄 Iteration [X]: Added [Y] missing items, re-checking..."
  ELSE:
    Break from loop
    
IF after 5 iterations still missing items:
  Record remaining gaps in extracted-details.md
  Output: "⚠️ [X] items still missing after 5 iterations - may need manual review"
  
Final Output: "✓ Draft structure completeness verified in [X] iterations"

## Step 10: Improvement step (Conditional)

IF technical/software project:
Ask user: "Do you want to work on details or design (wireframes)?"

  Run these subagent in parallel:
  - Subagent @product-strategist Find all points in the document that are not specific enough and should to have more details, provide options for every issue found
  - Subagent @process-architect review workflow specifications, suggest improvements
  - IF technical document with API details: Subagent @api-architect Check if API specification should be improved, provide options for every issue found
  - IF document declares cloud infrastructure: Subagent @cloud-architect Check if infrastructure specification should be improved, provide options for every issue found
  - IF document describes AI product: Subagent @ai-architect Check if AI specification should be improved, provide options for every issue found
  - IF document involves Claude Code: Subagent @claude-code-expert review agent design and suggest optimizations

Format improvements as:
```
Spec improvement: [What]
Why it helps the goal: [Direct connection to stated objective]
Implementation: [Brief how]
```

Compile improvements and show to user.
Ask: "Which improvements would you like to include? (List numbers or 'none')"
Wait for response.
IF user wants to discuss improvement:
  Start interactive session:
  User: [question about improvement]
  @relevant-agent: [detailed explanation]
  Show response and ask: "Continue discussion or accept/reject?"
  IF continue: Loop with agent
  IF accept/reject: Record decision and proceed
  Update `.strategy/ideas/<idea_name>/draft-structure.md` with details.

## Step 11: Technical Deep Dive (Conditional)

@stream-to-spec First determine document type:

IF document is about **software/technical development** (has coding, architecture, systems):

  Run in parallel:
  - Subagent @data-architect Design data models based on requirements
  - Subagent @api-architect Design APIs (if applicable)
  - Subagent @cloud-architect Suggest infrastructure (if applicable)
  - Subagent @devops-engineer Propose deployment approach (if applicable)
  - Subagent @qa-engineer Define testing strategy
  - Subagent @ai-architect detail ML pipelines (if AI features present)
  - Subagent @process-architect define operational workflows
  - Subagent @claude-code-expert design agent architecture (if Claude Code project)

  Compile technical specifications into `technical-specs.md`.

ELSE:
  Output: "✓ Document is not technical/development-related. Skipping technical deep dive."

## Step 12: UI/UX Design & Wireframes (Conditional)

@stream-to-spec First determine if UI design is needed:

IF document is about **software/application development** AND has user-facing interfaces:

  @ui-designer + @ux-researcher Create comprehensive UI/UX design:

  ### UX Research & Analysis
  
  1. **User Journey Mapping**
     - Identify primary user workflows from specifications
     - Map user personas to interface requirements  
     - Define key interaction points and decision moments
     - Establish usability goals and success metrics

  2. **Information Architecture**
     - Create site/app navigation structure
     - Define content hierarchy and organization
     - Map user flow between screens/pages
     - Identify reusable UI components

  ### Visual Wireframe Design
  
  For each major screen, create 3 design alternatives with ASCII wireframes:
  
  **Screen Design Template:**
  ```
  ## Screen: [Screen Name] - Alternative [1/2/3]
  
  **UX Strategy**: [User goal and approach for this design]
  **Design Philosophy**: [UI approach - minimalist/dense/interactive]
  
  ### ASCII Wireframe:
  ┌─────────────────────────────────────────────┐
  │ Logo    [Navigation Menu]    [User] [Menu] │
  ├─────────────────────────────────────────────┤
  │                                             │
  │  [Main Heading]                             │
  │                                             │
  │  ┌─────────────┐  ┌─────────────────────┐   │
  │  │   Image/    │  │   Primary Content   │   │
  │  │    Icon     │  │                     │   │
  │  │             │  │   • Feature 1       │   │
  │  └─────────────┘  │   • Feature 2       │   │
  │                   │   • Feature 3       │   │
  │  [Call-to-Action] │                     │   │
  │                   └─────────────────────┘   │
  │                                             │
  ├─────────────────────────────────────────────┤
  │ Footer Links  |  Contact  |  Legal        │
  └─────────────────────────────────────────────┘

  **Mobile Responsive**:
  ┌─────────────────┐
  │ ☰  Logo   👤    │
  ├─────────────────┤
  │ [Main Heading]  │
  │ ┌─────────────┐ │
  │ │    Image    │ │
  │ └─────────────┘ │
  │ Primary Content │
  │ [   Button   ]  │
  └─────────────────┘
  
  **User Interaction Flow**:
  1. [Primary user action]
  2. [System response]
  3. [Next steps]
  
  **Accessibility Notes**:
  - [Keyboard navigation]
  - [Screen reader support]
  - [Color contrast requirements]
  
  **Technical Implementation**:
  - Components needed: [List]
  - API integrations: [Endpoints]
  - State management: [Data flow]
  ```

  ### Design System Foundation
  - Color palette and brand consistency
  - Typography hierarchy and readability
  - Component library specification
  - Responsive breakpoint strategy  
  - Accessibility compliance (WCAG 2.1)

  ### Screen Prioritization Matrix
  
  **Critical (MVP)**: Core user workflows
  **Important (Phase 2)**: Enhanced functionality  
  **Nice-to-have (Phase 3)**: Advanced features

  Save to `.strategy/ideas/<idea_name>/ui-ux-wireframes.md`

  ### User Validation
  Present 3 wireframe approaches and ask:
  "Here are 3 design directions for your interface. Which approach aligns best with your vision?
  1. [Alternative 1 summary]
  2. [Alternative 2 summary] 
  3. [Alternative 3 summary]
  
  You can also request a hybrid combining elements from different alternatives."

  Output: "✓ UI/UX design with wireframes completed for [X] screens, [Y] alternatives ready for development"

ELSE:
  Output: "✓ Project does not require user interface. Skipping UI/UX design."

## Step 13: Create Final Specification

@stream-to-spec Merge all inputs into final professional specification.

@technical-writer Review for clarity, completeness, and professional tone. Keep all details!

**FINAL CHECK**: Re-read ALL user responses from extracted-details.md
Verify EVERY requirement mentioned is in final spec.

Structure based on type:
- Product → Product Specification
- Feature → Feature Requirements Document  
- Bug → Issue Report with Resolution Plan
- Process → Process Documentation
- Technical → Technical Specification

Save to `.strategy/ideas/<idea_name>/final-spec.md`.

### Step 12.1: Final Specification Completeness Check (Automatic up to 5 iterations)
@stream-to-spec Perform completeness verification:

1. Load original document
2. Load all decisions from `.strategy/ideas/<idea_name>/extracted-details.md`
3. Create mental "reference document" = original + all user decisions
4. Compare final-spec.md against this reference
5. List ANY missing details, requirements, or decisions

completion_iteration = 1
WHILE completion_iteration <= 5:
  IF missing elements found:
    Update final-spec.md to include missing items
    Record in extracted-details.md: "Added to final-spec.md on iteration [X]: [list]"
    Re-run completeness check
    completion_iteration++
    Output: "🔄 Final-spec iteration [X]: Added [Y] missing items, re-checking..."
  ELSE:
    Break from loop
    
IF after 5 iterations still missing items:
  Record remaining gaps in extracted-details.md
  Output: "⚠️ [X] items still missing in final-spec.md after 5 iterations"
  
Final Output: "✓ Final specification completeness verified in [X] iterations"

## Step 14: PRD Generation (Conditional)

@stream-to-spec First determine document type:

IF document is about **product/service/feature development** (has users, market, business model):
  Show summary to user and ask: "This appears to be a product document. Would you like to create PRD with business analysis? (yes/no)"
  
  IF user answers "yes":

  @product-strategist Create PRD structure with sections:
  - Executive Summary
  - Problem & Opportunity
  - Goals & Success Metrics
  - User Personas (if applicable)
  - Core Features with priorities
  - User Journey (if applicable)
  - Technical Architecture
  - Development Phases (scope only, no timelines)
  - Dependencies & Risks
  - Appendix A: Legal Assessment (regulatory risks, IP protection, licensing, compliance requirements)
  - Appendix B: Business Strategy & Economics (sales channels, unit economics, revenue projections, growth strategy)  
  - Appendix C: Investment Assessment (market potential, competitive advantages, investment decision, valuation terms)
  - Appendix D: Competitive Analysis (competitor comparison, market positioning, differentiation strategy)
  
  Run these subagents in parallel for content:
  - Subagent @project-lead Define phases and dependencies
  - Subagent @product-strategist Refine product vision and strategy
  - Subagent @solutions-architect Detail technical architecture
  - Subagent @ai-architect design intelligent features (if AI components)
  - Subagent @process-architect define operational processes
  - Subagent @claude-code-expert specify agent interactions (if Claude Code project)
  - Subagent @legal-counsel Evaluate legal implications and compliance requirements (Appendix A)
  - Subagent @strategic-sales-advisor Develop commercial strategy (Appendix B)
  - Subagent @strategic-sales-advisor Evaluate as investment fund (Appendix C)
  - Subagent @competitive-analyst Compare with competitors and market positioning (Appendix D)
  
  Save to `.strategy/ideas/<idea_name>/PRD.md`.
  
  ### Step 13.1: PRD Completeness Check (Automatic up to 5 iterations)
  @stream-to-spec Perform completeness verification:
  
  1. Load original document
  2. Load all decisions from `.strategy/ideas/<idea_name>/extracted-details.md`
  3. Create mental "reference document" = original + all user decisions
  4. Compare PRD.md against this reference (PRD can be more selective)
  5. List ANY missing CRITICAL details or decisions
  
  completion_iteration = 1
  WHILE completion_iteration <= 5:
    IF missing critical elements found:
      Update PRD.md to include missing items
      Record in extracted-details.md: "Added to PRD.md on iteration [X]: [list]"
      Re-run completeness check
      completion_iteration++
      Output: "🔄 PRD iteration [X]: Added [Y] missing critical items, re-checking..."
    ELSE:
      Break from loop
      
  Final Output: "✓ PRD completeness verified in [X] iterations"

ELSE:
  Output: "✓ Document is not product-related. Skipping PRD generation."

## Step 15: Final Verification

@stream-to-spec Perform comprehensive final verification using corrected algorithm:

### Phase 1: Create Reference Document (Critical)
1. Load original document
2. Load ALL decisions from `.strategy/ideas/<idea_name>/extracted-details.md`
3. Create mental "Complete Reference Document" = original + all user decisions + all clarifications
4. This reference is the GOLD STANDARD - everything in it MUST appear in final documents

### Phase 2: Document-by-Document Verification
For EACH final document (structured.md, final-spec.md, PRD.md if exists):

**Step A: Comprehensive Content Mapping**
- Take Complete Reference Document
- Go through EVERY fact, decision, requirement, constraint
- Find where each appears in the document being checked
- Mark as ✓ (found) or ✗ (missing)

**Step B: Missing Items Analysis**
- List ALL missing items with context
- Categorize: Critical/Important/Minor
- For Critical items: MUST be added
- For Important items: Should be added with user note
- For Minor items: Can be noted as acceptable omission

**Step C: User Decision Audit** 
- For each user decision in extracted-details.md:
  - Verify main choice is implemented correctly
  - Check reasoning is reflected in implementation approach
  - Confirm additional constraints are applied
  - Ensure side preferences are incorporated

### Phase 3: Correctness Validation
- Check for NO invented features (nothing not in reference)
- Verify NO contradictions with user decisions  
- Confirm NO logical inconsistencies between documents
- Validate ALL cross-references are accurate

### Phase 4: Completeness Scoring
Calculate actual completeness metrics:
- Original details preserved: [X/Y] ([%])
- User decisions implemented: [X/Y] ([%])  
- Requirements captured: [X/Y] ([%])
- Overall completeness: [%]

**UPDATE METRICS**: Update Final Completeness Score in Process Metrics Dashboard:
- Original Details Preserved: [X/Y] ([%])
- User Decisions Implemented: [X/Y] ([%])
- Overall Process Quality: [weighted average %]

### Phase 5: Gap Resolution (If needed)
IF any Critical or Important items missing:
  - Add missing items to appropriate documents
  - Re-run verification for updated sections
  - Continue until completeness ≥ 95%

Output verification:
```
✓ All [X] original details included
✓ [Y] contradictions resolved per user choice
✓ [Z] ambiguities clarified
✓ [N] improvements incorporated
✓ User Responses Processed: [count]
✓ All Requirements Captured: [checklist]
✓ Side Comments Addressed: [list]
✓ No unsupported additions made
✓ Nothing Lost in Translation
```

Display final summary:
```
📁 Project Location: .strategy/ideas/<idea_name>/
📄 Documents Created:
- extracted-details.md - Complete decision record with ALL user input
- structured.md - Original document refined with all improvements
- draft-structure.md - Initial structure
- final-spec.md - Complete specification incorporating EVERY requirement
- PRD.md - Product Requirements Document (if applicable)
- technical-specs.md - Technical details (if applicable)

## 📊 Final Process Metrics Report
### Quality Achieved
- **Overall Process Quality**: [X]% (Target: ≥95%)
- **Original Details Preserved**: [X]/[Y] ([%])
- **User Decisions Implemented**: [X]/[Y] ([%])
- **Extraction Completeness**: [X]%

### Process Efficiency  
- **User Touchpoints**: [X] (Target: ≤3)
- **Total Iterations**: Contradictions: [X], Ambiguities: [Y], Improvements: [Z]
- **Document Creation Efficiency**: Avg [X] iterations per document
- **Response Rate**: [X]/[Y] questions answered ([%])

### Discovery Summary
- **Issues Found & Resolved**: [X] contradictions, [Y] ambiguities, [Z] critical issues
- **Improvements Added**: [X]/[Y] proposed improvements accepted
- **Process Learning**: [insights about what worked/didn't work]

🤝 Agents Consulted: [list all agents used]
⚠️ Special Attention Items: [any unusual requirements noticed]
⚡ Process Efficiency Score: [X]/10 (based on iterations and user touchpoints)
```

## Step 16: Implementation Roadmap (Conditional)

@stream-to-spec First determine document type:

IF document is about **software/technical development** AND has been refined with technical specifications:

  @product-strategist + @solutions-architect Create implementation roadmap:

  ### Epic Breakdown Structure
  
  For each major feature/component, create epics with:
  
  **Epic Template:**
  ```
  ## Epic [X]: [Epic Name]
  
  **Description**: [What this epic accomplishes]
  **Business Value**: [Why this is needed]
  **Acceptance Criteria**: 
  - [ ] [Specific deliverable 1]
  - [ ] [Specific deliverable 2]
  - [ ] [Specific deliverable 3]
  
  **Technical Components**:
  - Backend: [What needs to be built]
  - Frontend: [UI/UX components needed]  
  - Database: [Schema changes/models]
  - Infrastructure: [Deployment/scaling needs]
  - Testing: [Test coverage requirements]
  
  **Roles Required**:
  - [ ] Product Manager (define requirements)
  - [ ] Backend Developer (implement APIs)
  - [ ] Frontend Developer (build UI)
  - [ ] DevOps Engineer (deployment)
  - [ ] QA Engineer (testing)
  - [ ] [Other specialists as needed]
  
  **Complexity**: [Low/Medium/High]
  **Dependencies**: [Other epics that must complete first]
  **Risk Level**: [Low/Medium/High] 
  **Risk Mitigations**: [How to address identified risks]
  
  **Ready for Development Checklist**:
  - [ ] Requirements fully defined
  - [ ] Technical approach agreed
  - [ ] Dependencies resolved
  - [ ] Team capacity available
  - [ ] Success metrics defined
  ```
  
  ### Implementation Sequence
  
  Order epics by:
  1. **Foundation First**: Core infrastructure and data models
  2. **Dependencies**: Prerequisites for other features
  3. **User Value**: Highest impact features prioritized
  4. **Risk Management**: Riskiest components tackled early
  
  ### Resource Planning
  
  - **Team Composition**: [Recommended team structure]
  - **Timeline Estimate**: [Development phases with rough durations]
  - **Capacity Planning**: [Developer weeks needed per epic]
  - **Parallel Development**: [Which epics can run simultaneously]
  
  Save to `.strategy/ideas/<idea_name>/implementation-roadmap.md`.
  
  Output: "✓ Implementation roadmap created with [X] epics ready for development"

ELSE:
  Output: "✓ Document is not a development project. Skipping implementation roadmap."

## Discussion Protocol (When Needed)

When user requests discussion on any topic:
1. Identify relevant agent(s)
2. Present agent's detailed perspective
3. Allow user to ask follow-up questions
4. Agent provides clarification
5. Continue until user satisfied or decides to move on
6. Document final decision in `.strategy/ideas/<idea_name>/extracted-details.md`