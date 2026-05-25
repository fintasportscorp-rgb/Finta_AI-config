---
Name: docs
Description: Generate comprehensive project documentation with proper scope analysis and mode-specific templates
argument-hint: <ai|human|full|update>
---

# Documentation Generation Command

Generate comprehensive project documentation following proper modular architecture with embedded templates.

## Purpose

Create structured documentation that serves both AI agents (brief, contract-focused) and human users (detailed, explanatory) with proper scope analysis, template optimization, and evidence-based content.

## Usage

```bash
# AI-focused documentation (minimal, contract-focused)
claude --command docs ai

# Human-focused documentation (detailed, explanatory)
claude --command docs human

# Complete documentation (both AI and human versions)
claude --command docs full

# Update existing documentation preserving manual edits
claude --command docs update
```

## Parameters

- `ai` - Generate minimal interface-focused documentation optimized for AI agents
- `human` - Generate detailed explanatory documentation with examples and tutorials
- `full` - Generate both AI and human versions with complete cross-referencing
- `update` - Analyze and refresh existing documentation preserving manual customizations

## Output Structure

```
docs/
├── ai/                     # AI-optimized documentation
│   ├── architecture/       # System design contracts
│   ├── modules/           # Module interfaces
│   ├── files/             # File-level contracts
│   ├── api/               # API specifications
│   ├── features/          # Feature mappings
│   └── README.md          # Navigation index
└── human/                 # Human-readable documentation
    ├── architecture/       # System design explanations
    ├── modules/           # Module guides with examples
    ├── files/             # File tutorials
    ├── api/               # API documentation with examples
    ├── features/          # Feature descriptions
    ├── product/           # Product overview (human mode only)
    └── README.md          # Navigation guide
```

## Embedded Templates

### AI Mode File Template
```markdown
# {{file_path}}

**Type:** {{file_type}} | **Module:** {{parent_module}}

## Interface
{{exported_contracts}}

## Dependencies
{{import_statements}}

## Core Functions
{{function_signatures_only}}
```

### Human Mode File Template  
```markdown
# {{file_path}}

**Purpose:** {{primary_function}}
**Type:** {{file_type}}
**Module:** {{parent_module_path}}

## Overview
{{what_this_file_does}}

## Interface
{{exported_functions_classes_constants}}

## Dependencies
- Internal: {{internal_dependencies}}
- External: {{external_dependencies}}

## Implementation Details
{{key_algorithms_patterns}}

## Usage Examples
{{code_examples_with_explanations}}

## Integration Notes
{{how_other_files_use_this}}

## Troubleshooting
{{common_issues_solutions}}
```

### AI Mode Module Template
```markdown
# {{module_name}}

**Path:** {{module_path}} | **Type:** {{module_type}}

## Interface
{{public_api_contracts}}

## Files
{{file_list_with_purposes}}

## Dependencies
{{module_dependencies}}
```

### Human Mode Module Template
```markdown
# {{module_name}}

**Path:** {{module_path}}
**Type:** {{module_type}} (root|submodule|leaf)
**Parent:** {{parent_module}}

## Purpose
{{module_responsibility_and_boundaries}}

## Architecture
{{internal_structure_explanation}}

## Public Interface
{{api_contracts_with_examples}}

## Submodules
{{submodule_hierarchy_with_purposes}}

## Files
{{file_list_with_detailed_roles}}

## Dependencies
- Internal: {{internal_module_deps}}
- External: {{external_module_deps}}

## Usage Patterns
{{common_integration_scenarios}}

## Examples
{{real_world_usage_examples}}
```

### Architecture Template
```markdown
# System Architecture

**Pattern:** {{identified_pattern}}
**Entry Points:** {{main_interfaces}}

## Module Hierarchy
{{tree_structure_from_code}}

## Component Relationships
{{dependency_graph}}

## Data Flow
{{request_response_patterns}}

{{#if ai_mode}}
## Key Contracts
{{interface_definitions}}
{{else}}
## Design Decisions
{{architectural_choices_with_rationale}}

## Integration Points
{{external_system_interfaces}}

## Quality Attributes
{{performance_security_considerations}}
{{/if}}
```

### API Template
```markdown
{{#each endpoints}}
## {{method}} {{path}}

**Source:** {{implementing_file}}

### Contract
```{{request_format}}
{{request_schema}}
```

**Response:**
```{{response_format}}
{{response_schema}}
```

{{#if ai_mode}}
**Errors:** {{error_codes}}
{{else}}
### Usage Example
```{{language}}
{{client_example}}
```

### Error Handling
{{error_scenarios_and_responses}}
{{/if}}

{{/each}}
```

### Features Template
```markdown
# {{feature_name}}

**Implementation:** {{implementing_modules}}
**APIs:** {{related_endpoints}}

## Functionality
{{observable_behavior}}

## Technical Mapping
- Modules: {{module_list}}
- Files: {{key_files}}
- APIs: {{endpoint_list}}

{{#if ai_mode}}
## Interface Points
{{user_interaction_contracts}}
{{else}}
## User Journey
{{step_by_step_workflow}}

## Implementation Approach
{{technical_details}}

## Business Value
{{why_feature_exists}}
{{/if}}
```

## Agent Orchestration

Execute phases sequentially with strict completion verification:

### Phase 1: Project Scope Analysis

**@system-architect**

CRITICAL IMPERATIVES: Determine complete project structure and documentation scope
- Analyze ENTIRE project directory structure from root
- Identify ALL directories and their purposes through file analysis
- Categorize directories by significance:
  - INCLUDE: src/, lib/, app/, components/, api/, scripts/, config/, templates/, tools/, tests/
  - EXCLUDE: .git/, node_modules/, dist/, build/, .next/, .cache/, .vscode/, .idea/, docs/
- Analyze configuration files (package.json, README, docker) for project understanding
- Create comprehensive scope definition with inclusion/exclusion rationale
- Generate project structure map with significance ratings (all code or configuration related components are important)

**Success Criteria:**
- Complete directory analysis with significance classification
- Clear inclusion/exclusion boundaries established
- Project purpose understood from configuration analysis
- Scope definition prevents documentation of technical artifacts

**Output:** `docs/.docs-progress/phase1-project-scope.md`

### Phase 2: File Inventory and Template Optimization

**@technical-writer + @pragmatic-engineer**

CRITICAL IMPERATIVES: Create complete file inventory and optimize documentation approach
- Import project scope from Phase 1 analysis
- **Generate concrete file-tracking-matrix.md with ALL 198 project files:**
  - Use `find . -name '*.md' -o -name '*.sh' -o -name '*.ps1'` for complete inventory
  - Create table with specific file paths (agents/Architecture/ai-architect.md, etc.), columns: " | File Path | Type | Agent | AI Mode | Human Mode | AI Status | Human Status | Priority |"
  - Assign agents based on file type (Agent Config → @technical-writer)
  - Determine mode requirements (templates ✗ Skip AI mode, ✓ Required Human mode)
  - Include status tracking columns with symbols (⏳ Pending, ✅ Complete)
- **@pragmatic-engineer**: Assess documentation efficiency vs code size
- Optimize AI template to focus on contracts/interfaces/logic overview only
- Ensure AI documentation remains under 50% of source file size
- Create mode-specific template approach (minimal AI, detailed Human)
- Test optimized templates on sample files for efficiency

**Success Criteria:**
- Concrete file-tracking-matrix.md with all files listed explicitly
- Each file assigned specific agent and mode requirements
- Optimized templates prevent documentation bloat
- AI templates focus on essential contracts only
- Template efficiency validated on sample files

**Output:** 
- `docs/.docs-progress/phase2-file-inventory.md`
- `docs/.docs-progress/phase2-template-optimization.md`
- `docs/.docs-progress/file-tracking-matrix.md` (concrete table with all files)
- `docs/.docs-progress/module-tracking-matrix.md` (module-file relationships)

### Phase 3: File Documentation (Mode-Specific)

**Initial Setup**
1. Open `docs/.docs-progress/file-tracking-matrix.md`
2. Check if any files have status `⏳ Pending`
3. Determine documentation mode from user request (AI, Human, or Full)
4. For each file, use subagent from Agent column to process up to 10 files in parallel:
   - Read the source file content from its original location
   - Create documentation based on mode:
     - **AI Mode**: Create file at `docs/ai/files/{source_path}/{filename}.md` using contract template
     - **Human Mode**: Create file at `docs/human/files/{source_path}/{filename}.md` using detailed template  
     - **Full Mode**: Create both AI and Human versions

5. For each processed file update `docs/.docs-progress/file-tracking-matrix.md`:
   - Change file status to `✅ Complete`
   - Update the progress counter at the top (e.g., change "AI Mode: 5/140" to "AI Mode: 6/140")
   - Add current timestamp in the notes column
   - Save the matrix file

6. Return to step 1 (find next file) until all files are processed

**Success Criteria - Verification Steps**
7. Open `docs/.docs-progress/file-tracking-matrix.md` and analyze documentation assignments:
    - Go line by line and check for each:
       - Every file with "✓ Required" in "AI Mode" column should have "✅ Complete" in "AI Progress" column  
       - Every file with "✓ Required" in "Human Mode" column should have "✅ Complete" in "Human Progress" column


8. Count actual documentation files on disk:
9. Open `docs/.docs-progress/file-tracking-matrix.md` and analyze documentation completion:
    - Go line by line and check for each:
      - Each file with "✅ Complete" in "AI Progress" column should be documented in `.md` files in `docs/ai/files/<file_path>/<file name>.md`
      - Each file with "✅ Complete" in "Human Progress" column should be documented in `.md` files in `docs/human/files/<file_path>/<file name>.md`
    - **If files are marked "✅ Complete" but missing from disk:**
      - Change their status to "⏳ Pending" in matrix
      - Save matrix file
      - Return to step 1
    - **Only if all numbers match: declare successful completion**

**Error Handling**
- If unable to read a source file: Mark it as `❌ Failed` in matrix, continue with next file
- If documentation file creation fails: log error, ask for help
- Always save matrix after each status change to prevent data loss

**Output:** 
- `docs/.docs-progress/phase3-file-documentation.md`
- Updated `docs/.docs-progress/file-tracking-matrix.md` with real progress

### Phase 4: Module Structure Analysis

**@system-architect**

CRITICAL IMPERATIVES: Identify module boundaries from documented file relationships
- Use Phase 3 file documentation as authoritative source
- Identify module boundaries from ACTUAL import/export patterns
- Create module hierarchy from observed file dependencies
- Map every documented file to at least one module
- NEVER invent modules without code evidence
- Build module tree from bottom-up file analysis
- Validate all files have module assignments

**Success Criteria:**
- Module hierarchy based on actual code relationships
- Every documented file mapped to modules
- No speculative module creation
- Module structure derived from file evidence

**Output:** `docs/.docs-progress/phase4-module-analysis.md`

### Phase 5: Module Documentation

**@system-architect**

CRITICAL IMPERATIVES: Document modules using file evidence and mode-specific templates
- Document ONLY modules identified in Phase 4 analysis
- Use Phase 3 file documentation as content source
- Create `docs/{mode}/modules/{module_path}/README.md` for each module
- Apply mode-specific module templates (contract vs detailed)
- List ONLY files documented in Phase 3
- Document ONLY relationships evidenced in file analysis
- Reference actual code patterns and dependencies

**Success Criteria:**
- All identified modules documented per mode
- Module docs reference only evidenced files
- Content grounded in file analysis evidence
- Mode-appropriate detail level applied

**Output:** `docs/.docs-progress/phase5-module-documentation.md`

### Phase 6: Architecture Documentation

**@solutions-architect**

CRITICAL IMPERATIVES: Create system architecture from module evidence
- Build architecture view from Phase 5 module documentation
- Document ONLY relationships visible in module analysis
- Create component diagrams from documented module interactions
- Record ONLY architectural patterns evidenced in code
- Map external integrations with documented evidence
- Apply architecture template with factual content only
- Generate `docs/{mode}/architecture/system-overview.md`

**Success Criteria:**
- Architecture derived from documented modules
- Component relationships based on code evidence
- No speculative architectural decisions
- Mode-appropriate architecture detail

**Output:** `docs/.docs-progress/phase6-architecture-documentation.md`

### Phase 7: API Documentation

**@api-architect**

CRITICAL IMPERATIVES: Document APIs found in code with implementing file evidence
- Scan Phase 3 file documentation for API definitions
- Document ONLY endpoints/interfaces found in actual code
- Map each API to implementing file from documentation
- Extract request/response patterns from code analysis
- Group APIs by code organization, not assumed function
- Apply API template with observed patterns only
- Generate `docs/{mode}/api/` directory structure

**Success Criteria:**
- All code-evidenced APIs documented
- Each API mapped to implementing files
- Request/response patterns from actual code
- No hypothetical API examples

**Output:** `docs/.docs-progress/phase7-api-documentation.md`

### Phase 8: Feature Documentation

**@product-strategist**

CRITICAL IMPERATIVES: Map user-facing features to technical implementation
- Identify features from documented interface code
- Deep dive into the code to collect important details and justify identified features
- Map features ONLY to documented modules/APIs
- Describe functionality from observable interface elements
- Create traceability matrix using documented components
- Apply features template with technical evidence
- Generate `docs/{mode}/features/` directory
- NEVER assume business value beyond interface evidence

**Success Criteria:**
- Features mapped to documented technical components
- Functionality described from interface observation
- Technical mapping traceable to previous phases
- No assumed business requirements

**Output:** `docs/.docs-progress/phase8-feature-documentation.md`

### Phase 9: Product Overview (Human Mode Only)

**@product-strategist** (Execute only for human or full modes)

CRITICAL IMPERATIVES: Create product overview AFTER technical documentation complete
- Execute ONLY for human mode or full mode
- Use completed documentation to understand product purpose
- Generate `docs/human/product/overview.md` with:
  - Product purpose from documented feature analysis
  - Core capabilities from documented APIs
  - User value from implemented functionality
  - Target audience from interface analysis
- Reference ONLY documented components from previous phases
- Base all claims on documented technical evidence

**Success Criteria:**
- Product overview based on documented functionality
- All claims traceable to technical documentation
- Human-readable format for non-technical audience
- Evidence-based product description

**Output:** `docs/.docs-progress/phase9-product-overview.md`

### Phase 10: Navigation and Final Verification

**@technical-writer**

CRITICAL IMPERATIVES: Create navigation and verify complete coverage
- Generate navigation for ALL documented components
- Verify documentation counts match Phase 2 inventory per mode
- Create cross-links between documented components only
- Validate all internal links resolve correctly
- Generate mode-specific `docs/{mode}/README.md` files
- Create master completeness report with verification
- Archive progress tracking for future reference

**Success Criteria:**
- Complete navigation with working internal links
- Documentation count verification per mode shows 100% coverage
- All documented components cross-referenced appropriately
- Progress tracking archived for audit trail

**Output:** 
- `docs/.docs-progress/phase10-final-verification.md`
- `docs/ai/README.md` and/or `docs/human/README.md`

## Completion Tracking System

### Progress Tracking Infrastructure
Create tracking directory: `docs/.docs-progress/`

### Concrete File Tracking Tables

**File Tracking Matrix: `docs/.docs-progress/file-tracking-matrix.md`**
```markdown
# File Documentation Progress Tracking

## Files Inventory and Status

| File Path | Type | Agent | AI Mode | Human Mode | AI Progress | Human Progress | Notes |
|-----------|------|-------|---------|------------|-------------|----------------|-------|
| agents/Architecture/ai-architect.md | Config | @technical-writer | ✓ Required | ✓ Required | ⏳ Pending | ⏳ Pending | Core agent definition |
| agents/Architecture/api-architect.md | Config | @technical-writer | ✓ Required | ✓ Required | ⏳ Pending | ⏳ Pending | Core agent definition |
| commands/docs.md | Command | @technical-writer | ✓ Required | ✓ Required | ⏳ Pending | ⏳ Pending | Documentation system |
| setup.sh | Script | @technical-writer | ✓ Required | ✓ Required | ⏳ Pending | ⏳ Pending | Installation script |
| templates/wal_entry.md | Template | @technical-writer | ✗ Skip | ✓ Required | - | ⏳ Pending | Template file |

**Status Symbols:**
- ✓ Required - File must be documented in this mode
- ✗ Skip - File excluded from this mode
- ✅ Complete - Documentation finished and verified
- ⏳ Pending - Not yet started
- 🔄 In Progress - Currently being documented
- ❌ Failed - Documentation attempt failed, needs retry

**Progress Summary:**
- AI Mode: 0/45 files complete (0%)
- Human Mode: 0/45 files complete (0%)
- Total Files Identified: 45
```

**Module Tracking Matrix: `docs/.docs-progress/module-tracking-matrix.md`**
```markdown
# Module Documentation Progress Tracking

## Module-File Relationships

| Module Path | Type | Files Count | File List | AI Status | Human Status | Responsible Agent |
|-------------|------|-------------|-----------|-----------|--------------|------------------|
| agents/Architecture/ | Directory | 11 | ai-architect.md, api-architect.md, cloud-architect.md, ... | ⏳ Pending | ⏳ Pending | @system-architect |
| agents/Engineering/ | Directory | 15 | ai-engineer.md, data-engineer.md, fullstack-engineer.md, ... | ⏳ Pending | ⏳ Pending | @system-architect |
| commands/ | Directory | 6 | docs.md, develop-idea.md, learn-conventions.md, ... | ⏳ Pending | ⏳ Pending | @system-architect |
| templates/ | Directory | 5 | wal_entry.md, EPIC-001-Security-Mitigation.md, ... | ⏳ Pending | ⏳ Pending | @system-architect |

**Module Progress Summary:**
- Total Modules: 8
- AI Mode Complete: 0/8 (0%)
- Human Mode Complete: 0/8 (0%)
```

### Phase Completion Format
Each phase creates: `docs/.docs-progress/phase{N}-{name}.md`

**Standard Tracking Format:**
```markdown
# Phase {N}: {Name}

## Completion Status: [IN_PROGRESS|COMPLETE|FAILED]

## Assigned Agent: @{agent-name}

## Success Criteria Checklist:
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Deliverables:
- [ ] Output 1: path/to/output
- [ ] Output 2: path/to/output

## Verification:
- [ ] Deliverable count matches expectation
- [ ] Content quality meets evidence standards
- [ ] Next phase inputs ready

## File Count Verification:
- Files in tracking matrix: {X}
- Files actually documented: {Y}
- Match status: [✅ PASS | ❌ FAIL]

## Completion Summary:
{Final results with metrics}
```

### Real-Time Progress Tracking

**Individual File Progress: `docs/.docs-progress/file-progress-detail.md`**
```markdown
# Individual File Documentation Progress

## Currently In Progress

### agents/Architecture/ai-architect.md
- **Agent:** @technical-writer
- **Started:** 2025-01-22 14:30
- **AI Mode:** 🔄 In Progress (Contract analysis complete, dependencies pending)
- **Human Mode:** ⏳ Pending
- **Estimated Completion:** 2025-01-22 15:00

### commands/docs.md
- **Agent:** @technical-writer  
- **Started:** 2025-01-22 14:45
- **AI Mode:** 🔄 In Progress (Interface extraction 80% complete)
- **Human Mode:** ⏳ Pending
- **Estimated Completion:** 2025-01-22 15:15

## Completed Today
[List of files completed with timestamps]

## Failed/Blocked
[List of files that failed documentation with reasons]
```

### Mode-Aware Tracking
Track progress separately for each mode:

**AI Mode:** `PROGRESS_AI: X/Y files documented` with specific file list
**Human Mode:** `PROGRESS_HUMAN: X/Y files documented` with specific file list
**Full Mode:** Track both AI and Human progress separately with individual file status

### Automated Progress Management Commands

**Generate Initial File Matrix:**
```bash
# Create comprehensive file tracking matrix
@technical-writer "Generate complete file-tracking-matrix.md with ALL project files:
- Scan entire project structure (agents/, commands/, templates/, etc.)
- List EVERY .md, .sh, .ps1 file with full path
- Assign appropriate agent based on file type
- Determine AI/Human mode requirements
- Create table with current project file count: $(find . -name '*.md' -o -name '*.sh' -o -name '*.ps1' | wc -l) files
- Save to docs/.docs-progress/file-tracking-matrix.md"
```

**Update Progress Status:**
```bash
# Mark file as complete
@technical-writer "Update file-tracking-matrix.md:
- Change {file_path} AI Progress from ⏳ to ✅
- Update progress summary counters
- Add completion timestamp to notes"

# Mark file as in progress  
@technical-writer "Update file-tracking-matrix.md:
- Change {file_path} AI Progress from ⏳ to 🔄
- Add current timestamp and progress details to notes"
```

**Generate Module Matrix:**
```bash
# Create module-file mapping matrix
@system-architect "Generate complete module-tracking-matrix.md:
- Identify all directory modules (agents/Architecture/, agents/Engineering/, etc.)
- Count exact files per module
- List ALL files explicitly (no '...' placeholders)
- Calculate total files per module
- Save to docs/.docs-progress/module-tracking-matrix.md"
```

**Progress Verification Commands:**
```bash
# Verify documentation completeness
@technical-writer "Cross-check documentation vs tracking matrix:
- Count documented files in docs/ai/files/ and docs/human/files/
- Compare against file-tracking-matrix.md totals
- Report any missing files with specific paths
- Update progress percentages"

# Daily progress report
@technical-writer "Generate daily-progress-report.md:
- Files completed today with timestamps
- Files currently in progress with estimated completion
- Blocked files with reasons
- Updated overall progress percentages"
```

### Quality Gates
Each phase must achieve 100% completion before next phase starts:
- **File Coverage:** Documentation count MUST equal inventory count per mode
- **Evidence Requirement:** All content describes only observable code
- **Template Compliance:** Mode-specific templates applied correctly
- **Cross-Phase Validation:** Later phases reference only previous phase outputs

### Restart Procedures
**Phase Restart:** Clear incomplete work, reset tracking, re-run until 100% complete
**Full Restart:** Archive failed attempt, create fresh tracking, restart from Phase 1

## Success Criteria Summary

**Scope Requirements:**
- Complete project structure analyzed with significance determination
- Only significant directories included, technical directories excluded
- Project understanding based on configuration file analysis

**File Coverage Requirements:**
- 100% documentation of inventoried files per mode
- Documentation paths mirror source structure exactly
- Mode-specific templates applied consistently
- Completion verified through cross-phase tracking

**Quality Requirements:**
- All documentation describes only observable code elements
- No speculative content or assumed functionality
- Empty/unclear files documented as "no identifiable elements"
- Evidence-based content throughout all phases

**Template Optimization:**
- AI documentation optimized for contracts/interfaces only
- AI docs remain under 50% of source file size
- Human documentation provides educational context
- Template efficiency validated on sample files

**Structural Integrity:**
- Module hierarchy derived from actual code relationships
- API documentation maps to implementing files
- Feature documentation traces to observable interfaces
- Architecture reflects documented module relationships

**Navigation Completeness:**
- Working internal links between all documented components
- Mode-specific navigation optimized for intended audience
- Complete cross-referencing of related components
- Final verification confirms 100% coverage per mode