---
Name: learn-conventions
description: Automatically analyze codebase patterns and update CLAUDE.md CONVENTIONS section with imperative coding rules
argument-hint: <standard|deep> [optional: project focus area]
---

# Convention Learning Through Systematic Codebase Analysis

**Core Purpose:** Extract established patterns from codebase and transform them into imperative coding conventions for CLAUDE.md.

## Execution Flow

1. **File Sampling** → @pragmatic-engineer samples critical files using git history + mandatory paths
2. **Core Pattern Analysis** → @fullstack-engineer analyzes naming, structure, imports, types, async, errors
3. **Security Pattern Analysis** → @security-engineer analyzes auth, validation, SQL, secrets, API security
4. **Data Pattern Analysis** → @database-specialist analyzes state, API calls, database access, caching
5. **Convention Synthesis** → @claude-code-expert transforms patterns into imperative rules (>70% consistency)
6. **Security Baseline Application** → @security-engineer applies mandatory security rules
7. **CLAUDE.md Update** → @claude-code-expert updates CONVENTIONS section

## Step 1: Strategic File Sampling

**Execute via @pragmatic-engineer:** Sample codebase for pattern analysis

### Sampling Strategy Selection
Based on argument:
- **standard** → 10-15 files (quick analysis)
- **deep** → 20-50 files (comprehensive analysis)
- **full** → ALL significant files (exhaustive analysis: source code, scripts, configs, tests, docs)

**FULL MODE WARNING:** This mode analyzes hundreds to thousands of files and may take 30-60+ minutes depending on codebase size. Operation includes progress tracking, batch processing, and resumability features.

### Mandatory Critical Path Sampling
Execute these searches in order:

**For standard/deep modes:**
1. **Security/Auth paths:** `find . \( -path "*/auth/*" -o -path "*/security/*" \) | head -4`
2. **Core business paths:** `find . \( -path "*/models/*" -o -path "*/db/*" -o -path "*/api/*" \) | head -4`
3. **Configuration files:** `ls -la *config* .env* 2>/dev/null | head -2`

**For full mode - Comprehensive File Discovery:**
1. **Source Code Files:** `find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.py" -o -name "*.go" -o -name "*.rs" -o -name "*.java" -o -name "*.php" -o -name "*.rb" -o -name "*.cs" -o -name "*.cpp" -o -name "*.c" \) ! -path "*/node_modules/*" ! -path "*/vendor/*" ! -path "*/.git/*" ! -path "*/dist/*" ! -path "*/build/*"`
2. **Configuration Files:** `find . -type f \( -name "*.json" -o -name "*.yaml" -o -name "*.yml" -o -name "*.toml" -o -name "*.ini" -o -name "*.conf" -o -name "*config*" -o -name ".env*" \) ! -path "*/node_modules/*" ! -path "*/.git/*"`
3. **Build/Automation Scripts:** `find . -type f \( -name "*.sh" -o -name "*.bash" -o -name "*.zsh" -o -name "*.fish" -o -name "Makefile" -o -name "makefile" -o -name "*.mk" -o -name "*.ps1" -o -name "*.bat" -o -name "*.cmd" \) ! -path "*/.git/*"`
4. **Docker/Deployment:** `find . -type f \( -name "Dockerfile*" -o -name "docker-compose*" -o -name "*.dockerfile" -o -name "*.k8s.yaml" -o -name "*.k8s.yml" -o -name "helm-*" -o -name "Chart.yaml" \)`
5. **Package Management:** `find . -type f \( -name "package.json" -o -name "package-lock.json" -o -name "yarn.lock" -o -name "Pipfile*" -o -name "requirements*.txt" -o -name "Cargo.toml" -o -name "Cargo.lock" -o -name "go.mod" -o -name "go.sum" -o -name "composer.json" -o -name "Gemfile*" \)`
6. **CI/CD Configurations:** `find . -type f -path "*/.github/workflows/*" -o -path "*/.gitlab-ci*" -o -path "*/jenkins/*" -o -name ".travis.yml" -o -name "buildkite.yml" -o -name "azure-pipelines.yml"`
7. **Test Files:** `find . -type f \( -name "*.test.*" -o -name "*.spec.*" -o -path "*/test/*" -o -path "*/tests/*" -o -path "*/__tests__/*" -o -path "*/spec/*" \) ! -path "*/node_modules/*"`
8. **Documentation with Code:** `find . -type f -name "*.md" -path "*/docs/*" -o -name "README*.md" -o -name "CONTRIBUTING*.md" -o -name "CHANGELOG*.md"`

### Git-Based Smart Sampling
Execute git analysis for frequently changed files:
1. **Most modified files:** `git log --pretty=format: --name-only -30 | sort | uniq -c | sort -rg | head -5`
2. **Recent changes:** `git diff HEAD~10 --name-only | grep -E '\.(ts|tsx|js|jsx|py|go|rs)$' | head -3`

### File Selection Protocol

**For standard/deep modes:**
Create file list `.strategy/conventions/sampled-files.txt` with:
- All mandatory critical path files found
- Top git-analyzed files
- Ensure coverage: frontend, backend, database, config, tests
- Target total: 10-15 (standard) or 20-50 (deep)

**For full mode:**
Execute comprehensive analysis with batch processing:

### Full Mode Execution Protocol
**Stage 1 - Discovery and Batching:**
1. **Execute all file discovery commands** listed above
2. **Merge results into master file list** `.strategy/conventions/full-files-master.txt`
3. **Filter out binaries, logs, and generated files** 
4. **Estimate total processing time** based on file count (avg 2-5 seconds per file)
5. **Split into batches** of 75-100 files each
6. **Create batch processing queue** `.strategy/conventions/batch-queue.txt`
7. **Initialize progress tracking** `.strategy/conventions/progress.json`

**Stage 2 - Batch Processing Loop:**
For each batch in queue:
1. **Mark batch as in-progress** in progress tracker
2. **Execute pattern analysis** on batch files using core analysis steps
3. **Save batch results** to `.strategy/conventions/batch-[n]-results.md`
4. **Update progress tracker** with completion status
5. **Clear memory/cache** between batches to prevent resource exhaustion
6. **Create checkpoint** every 3 batches for resumability

**Stage 3 - Consolidation and Synthesis:**
1. **Merge all batch results** into unified pattern analysis
2. **Calculate weighted consistency scores** (core files weighted higher than tests/configs)
3. **Generate comprehensive statistics** for all pattern categories
4. **Create detailed coverage report** showing analysis completeness
5. **Apply security baseline** and synthesize final conventions

**For full mode - Comprehensive File Collection:**

1. **Initialize Progress Tracking:**
   ```bash
   mkdir -p .strategy/conventions/full-mode
   echo "FULL_MODE_STATUS=INITIALIZING" > .strategy/conventions/full-mode/status.env
   echo "START_TIME=$(date '+%Y-%m-%d %H:%M:%S')" >> .strategy/conventions/full-mode/status.env
   echo "TOTAL_FILES=0" >> .strategy/conventions/full-mode/status.env
   echo "PROCESSED_FILES=0" >> .strategy/conventions/full-mode/status.env
   ```

2. **Collect All File Categories:**
   Create separate lists for each category:
   - `.strategy/conventions/full-mode/source-files.txt` (all source code)
   - `.strategy/conventions/full-mode/config-files.txt` (all configuration)
   - `.strategy/conventions/full-mode/script-files.txt` (all build/automation)
   - `.strategy/conventions/full-mode/docker-files.txt` (all deployment)
   - `.strategy/conventions/full-mode/package-files.txt` (all package management)
   - `.strategy/conventions/full-mode/ci-files.txt` (all CI/CD configs)
   - `.strategy/conventions/full-mode/test-files.txt` (all test files)
   - `.strategy/conventions/full-mode/doc-files.txt` (all documentation)

3. **Create Master File List:**
   Combine all category files into `.strategy/conventions/full-mode/all-files.txt`
   Calculate total count and update status:
   ```bash
   wc -l .strategy/conventions/full-mode/all-files.txt | cut -d' ' -f1 > .strategy/conventions/full-mode/total-count.txt
   echo "TOTAL_FILES=$(cat .strategy/conventions/full-mode/total-count.txt)" >> .strategy/conventions/full-mode/status.env
   ```

4. **Batch Size Configuration:**
   - **Small codebase (<100 files):** Process all at once
   - **Medium codebase (100-500 files):** Batches of 50 files
   - **Large codebase (500-2000 files):** Batches of 25 files  
   - **Huge codebase (>2000 files):** Batches of 15 files

5. **Memory Management Protocol:**
   - Process files in order of importance: source → config → scripts → tests → docs
   - Save progress after each batch to enable resumability
   - Clear temporary analysis data between batches
   - Use incremental pattern accumulation instead of holding all patterns in memory

**Output:** Complete categorized file collection with batch processing plan and progress tracking system

## Step 2: Core Pattern Extraction

**Execute via @fullstack-engineer:** Analyze fundamental code patterns across sampled files

Read each file from sampled-files.txt and extract patterns in these categories:

### Naming Conventions Analysis
For each sampled file, identify:
- **Files:** PascalCase vs camelCase vs kebab-case vs snake_case
- **Variables:** Naming style, prefix/suffix patterns
- **Functions:** Naming conventions, verb patterns
- **Components:** Naming and organizational patterns
- **Constants:** ALL_CAPS vs camelCase patterns

### Structure Patterns Analysis
Examine:
- **Directory organization:** Feature-based vs layer-based
- **Module boundaries:** How responsibilities are separated
- **File organization:** Single vs multiple exports per file
- **Component structure:** How UI components are organized

### Import/Export Patterns Analysis
Document:
- **Import style:** Relative vs absolute paths
- **Path aliases:** Usage of @/ or other aliases
- **Export patterns:** Default vs named exports
- **Dependency organization:** How external vs internal imports are handled

### Type System Patterns Analysis
Identify:
- **TypeScript usage:** Interface vs type, any usage patterns
- **Type definitions:** Where and how types are defined
- **Generic usage:** Common generic patterns
- **Type safety:** Strict vs permissive patterns

### Async Patterns Analysis
Document:
- **Async handling:** async/await vs promises vs callbacks
- **Error boundaries:** How async errors are handled
- **Loading states:** How async loading is managed
- **Race conditions:** Prevention patterns identified

### Error Handling Patterns Analysis
Examine:
- **Error catching:** try-catch vs .catch vs error boundaries
- **Error logging:** Logging patterns and levels
- **User feedback:** How errors are communicated to users
- **Recovery patterns:** How applications recover from errors

**Output:** Structured pattern analysis saved to `.strategy/conventions/core-patterns.md`

### Pattern Consistency Calculation
For each pattern category:
1. Count total occurrences
2. Count most common variant occurrences
3. Calculate consistency percentage: (most_common / total) * 100
4. Mark patterns >70% consistency for conversion to rules

## Step 3: Security Pattern Deep Analysis

**Execute via @security-engineer:** Comprehensive security pattern analysis (NEVER SKIP THIS STEP)

### Authentication Patterns Analysis
Examine all auth-related files for:
- **Token handling:** JWT vs session vs OAuth patterns
- **Token storage:** localStorage vs cookies vs secure storage
- **Auth verification:** How endpoints verify authentication
- **Session management:** Session timeout and renewal patterns

### Authorization Patterns Analysis
Document:
- **Role verification:** How roles/permissions are checked
- **Resource access:** How access to specific resources is controlled
- **Permission patterns:** Permission checking patterns
- **Privilege escalation prevention:** How privilege escalation is prevented

### Input Validation Patterns Analysis
Identify:
- **Validation approach:** Client-side vs server-side vs both
- **Validation libraries:** What libraries are used for validation
- **Sanitization:** How user input is cleaned
- **XSS prevention:** Cross-site scripting prevention patterns

### SQL Security Patterns Analysis
Examine database access for:
- **Query construction:** Parameterized queries vs string concatenation
- **ORM usage:** How ORMs are used for query safety
- **Database access patterns:** Direct SQL vs ORM patterns
- **Injection prevention:** SQL injection prevention methods

### Secrets Management Analysis
Document:
- **Environment variables:** How secrets are stored and accessed
- **Hardcoded secrets:** Detection of any hardcoded sensitive data
- **Key rotation:** Patterns for managing secret rotation
- **Secret access:** How application code accesses secrets

### API Security Patterns Analysis
Identify:
- **Rate limiting:** How APIs prevent abuse
- **CORS configuration:** Cross-origin request handling
- **Input sanitization:** API input cleaning patterns
- **Error responses:** How APIs handle and report errors

**Output:** Security analysis saved to `.strategy/conventions/security-patterns.md`

### Security Pattern Validation
Mark ALL security patterns for mandatory rule creation regardless of consistency percentage.

## Step 4: Data Management Pattern Analysis

**Execute via @database-specialist:** Analyze data handling and persistence patterns

### State Management Patterns Analysis
Examine:
- **State libraries:** Redux vs Context vs Zustand vs local state
- **State structure:** How application state is organized
- **State updates:** Immutable vs mutable update patterns
- **State persistence:** How state is persisted between sessions

### API Communication Patterns Analysis
Document:
- **HTTP libraries:** fetch vs axios vs other libraries
- **Request patterns:** How API requests are structured
- **Response handling:** How API responses are processed
- **Error handling:** How API errors are managed
- **Retry logic:** How failed requests are retried

### Database Access Patterns Analysis
Identify:
- **Database queries:** Raw SQL vs ORM vs query builder
- **Connection management:** How database connections are handled
- **Transaction patterns:** How database transactions are managed
- **Migration patterns:** How database schema changes are handled

### Caching Patterns Analysis
Examine:
- **Cache strategy:** What gets cached and when
- **Cache invalidation:** How cached data is updated
- **Cache storage:** Where cached data is stored
- **Cache consistency:** How cache consistency is maintained

**Output:** Data patterns saved to `.strategy/conventions/data-patterns.md`

## Content Routing Protocol

### CLAUDE.md Content (Imperative Rules Only):
- Naming conventions with >70% consistency
- File organization patterns with >70% consistency  
- Import/export patterns with >70% consistency
- Type definition patterns with >70% consistency
- Async patterns with >70% consistency
- Error handling patterns with >70% consistency
- Security baseline rules (mandatory, regardless of consistency)
- Data management patterns with >70% consistency

### CONVENTION_ANALYSIS.md Content (Assessments & Recommendations):
- Security findings and recommendations
- Pattern consistency statistics and percentages
- Architecture assessment and improvement suggestions
- Conflicting patterns with resolution guidance
- Files analyzed and coverage statistics
- Patterns below 70% consistency with recommendations
- Historical analysis and trend identification

## Step 5: Convention Rule Synthesis

**Execute via @claude-code-expert:** Transform identified patterns into imperative coding rules

### Pattern Filtering Protocol
For each identified pattern:
1. **Consistency check:** Only include patterns >70% consistent
2. **Clarity validation:** Ensure pattern is clearly defined
3. **Actionability test:** Confirm pattern can be expressed as imperative rule
4. **Conflict resolution:** Resolve conflicting patterns by choosing most consistent

### Imperative Rule Transformation
Convert each validated pattern to imperative format:
- **FROM:** "Components use PascalCase (85% consistent)"
- **TO:** "Use PascalCase for React components"

- **FROM:** "API calls use async/await (92% consistent)"
- **TO:** "Use async/await for API calls"

### Rule Organization
Group rules into logical categories:
- **Naming Conventions**
- **File Organization**
- **Import/Export Style**
- **Type Definitions**
- **Async Patterns**
- **Error Handling**
- **Security Practices**
- **Data Management**

**Output:** Synthesized rules saved to `.strategy/conventions/imperative-rules.md`

## Step 6a: Security Baseline Rule Integration

**Execute via @security-engineer:** Apply mandatory security rules for CLAUDE.md conventions

### Security Baseline Rules (ALWAYS APPLY TO CLAUDE.md)
Add these imperative rules to conventions regardless of current codebase patterns:

1. **Require authentication for protected endpoints**
2. **Validate all user input at application boundaries**
3. **Use parameterized queries for all database access**
4. **Enforce HTTPS in production environments**
5. **Manage secrets via environment variables only**
6. **Implement rate limiting on public APIs**
7. **Ensure error messages never leak system details**

**Output:** Security baseline rules added to `.strategy/conventions/imperative-rules.md`

## Step 6b: Security Assessment Documentation

**Execute via @security-engineer:** Document security findings and recommendations for CONVENTION_ANALYSIS.md

### Security Assessment Content
Document detailed security analysis findings:
1. **Security gaps identified** in current codebase patterns
2. **Risk assessment** for discovered security antipatterns
3. **Detailed recommendations** for security improvements
4. **Priority classification** of security fixes needed
5. **Implementation guidance** for security improvements
6. **Compliance assessment** against security baseline

### Security Integration Analysis
1. Review synthesized rules for security gaps
2. Identify security patterns below 70% consistency
3. Document security antipatterns found
4. Provide specific remediation steps

**Output:** Security assessment and recommendations in `.strategy/conventions/security-assessment.md`

## Step 7: CLAUDE.md Integration

**Execute via @claude-code-expert:** Update project CLAUDE.md with discovered conventions (create if absent)

### CONVENTIONS Section Update Protocol

1. **Backup existing CLAUDE.md** to `.strategy/conventions/claude-backup-[timestamp].md`
2. **Locate CONVENTIONS section** in CLAUDE.md or create if missing
3. **Preserve custom rules** - any rules marked as "custom" or "manual"
4. **Filter content by type:**
   - CLAUDE.md gets ONLY imperative rules with >70% consistency + security baseline
   - CONVENTION_ANALYSIS.md gets assessments, statistics, recommendations, and findings
5. **Separate analytical content** - move all assessments to CONVENTION_ANALYSIS.md
6. **Add analysis metadata** - timestamp, files analyzed, consistency thresholds

### CONVENTIONS Section Structure
```markdown
## CONVENTIONS
<!-- Auto-updated by learn-conventions.md process -->
<!-- Generated: [timestamp] -->
<!-- Files analyzed: [count] | Consistency threshold: >70% -->
<!-- Next analysis recommended: [current_date + 30 days] -->

### Naming Conventions
[Imperative rules for naming]

### File Organization
[Imperative rules for structure]

### Import/Export Style
[Imperative rules for imports]

### Type Definitions
[Imperative rules for types]

### Async Patterns
[Imperative rules for async]

### Error Handling
[Imperative rules for errors]

### Security Practices
[Imperative security rules]

### Data Management
[Imperative data rules]

### Custom Rules (Manual)
<!-- These rules are manually maintained -->
[Preserve any existing custom rules]
```

### CONVENTION_ANALYSIS.md Structure Template
**Always create when deep analysis is triggered or when assessments need documentation:**

```markdown
# Convention Analysis Report
<!-- Generated: [timestamp] -->
<!-- Files analyzed: [count] | Analysis mode: [standard|deep] -->
<!-- Consistency threshold: >70% for rules -->

## Executive Summary
[Brief overview of codebase consistency and major findings]

## Pattern Consistency Analysis
### Naming Conventions
- **Consistency Score:** [percentage]
- **Dominant Pattern:** [pattern description]
- **Exceptions:** [list of inconsistent cases]

### File Organization
- **Consistency Score:** [percentage]  
- **Dominant Pattern:** [pattern description]
- **Structural Issues:** [identified problems]

### Import/Export Patterns
- **Consistency Score:** [percentage]
- **Dominant Pattern:** [pattern description]
- **Import Issues:** [problematic patterns found]

### Type System Usage
- **Consistency Score:** [percentage]
- **TypeScript Adoption:** [usage level]
- **Type Safety Issues:** [problems identified]

### Async Patterns
- **Consistency Score:** [percentage]
- **Dominant Pattern:** [async/await vs promises vs callbacks]
- **Race Condition Risks:** [identified issues]

### Error Handling
- **Consistency Score:** [percentage]
- **Error Strategy:** [try-catch vs .catch vs boundaries]
- **Logging Consistency:** [analysis of error logging]

## Security Assessment
[Content from Step 6b security assessment]
### Identified Security Gaps
[List of security issues found]

### Risk Assessment
[High/Medium/Low risk categorization]

### Recommended Security Improvements
[Specific actionable recommendations]

## Architecture Evaluation
### Structural Analysis
[Overall architecture assessment]

### Technical Debt Indicators
[Areas needing improvement]

### Scalability Concerns
[Potential scaling issues identified]

## Coverage Report
### Files Analyzed
**Total Files:** [count]
**Coverage Areas:**
- Frontend: [file count and percentage]
- Backend: [file count and percentage] 
- Database: [file count and percentage]
- Configuration: [file count and percentage]
- Tests: [file count and percentage]

### Analysis Limitations
[Files that couldn't be analyzed and reasons]

### Gaps in Coverage
[Areas needing more analysis]

## Pattern Strength Classification
### Strong Conventions (>90% consistency)
[Patterns that are well-established]

### Emerging Conventions (70-90% consistency)  
[Patterns that are mostly consistent]

### No Clear Convention (<70% consistency)
[Areas needing standardization]

## Recommendations
### Immediate Actions (High Priority)
[Critical improvements needed]

### Short-term Improvements (Medium Priority)
[Improvements to consider in next iteration]

### Long-term Standardization (Low Priority)
[Broader architectural improvements]

### Implementation Guidance
[Specific steps for implementing recommendations]

## Historical Analysis
[If git history was analyzed - trends and evolution]

## Appendix
### Conflicting Patterns
[Detailed analysis of pattern conflicts and resolution recommendations]

### Statistical Details
[Detailed breakdown of consistency calculations]
```

### Deep Analysis Additional Output
If mode is "deep", also include:
- Enhanced statistical analysis with trend identification
- Detailed conflict resolution guidance
- Implementation priority matrix

### Validation and Completion
1. **Verify CLAUDE.md syntax** is correct
2. **Test convention rules** are actionable and clear
3. **Confirm security baseline** is complete
4. **Validate file backup** was created successfully

**Output:** Updated CLAUDE.md with extracted conventions and analysis files in `.strategy/conventions/`

## Mode-Specific Behavior

### Standard Mode (Default)
- Sample 10-15 files using mandatory + git-based selection
- Focus on most critical patterns
- Generate core convention rules
- Complete analysis in single session

### Deep Analysis Mode
**ALWAYS create CONVENTION_ANALYSIS.md when:**
- User specifies "deep", "thorough", or "comprehensive"
- More than 15 files are analyzed
- Security recommendations need to be documented
- Any assessments or statistics are generated

### Full Analysis Mode
**MANDATORY for "full" mode operations:**
- **ALWAYS create CONVENTION_ANALYSIS.md** with comprehensive statistics
- **Enable batch processing** with progress tracking and resumability
- **Generate detailed coverage reports** showing analysis completeness
- **Include weighted pattern consistency** (core files weighted higher)
- **Document resource usage** and processing time statistics
- **Provide batch-by-batch breakdown** of discovered patterns
- **Create implementation timeline** based on pattern complexity and consistency

**Deep Analysis Mode Execution:**
- Sample 20-50 files with extended coverage
- Include architectural and team patterns from git history
- Generate comprehensive CONVENTION_ANALYSIS.md with detailed statistics
- Classify patterns as strong/emerging/no convention
- Provide prioritized recommendations for improving consistency
- Include implementation guidance and timeline suggestions

**Standard Mode with CONVENTION_ANALYSIS.md:**
Even in standard mode, create CONVENTION_ANALYSIS.md if:
- Security assessment findings exist
- Pattern inconsistencies need documentation
- Architectural recommendations are identified

## Project Focus Areas (Optional)
When user specifies focus area:
- **frontend** → Emphasize React/UI patterns, component conventions
- **backend** → Focus on API, database, service patterns
- **security** → Deep dive on auth, validation, secrets management
- **data** → Emphasize database, state management, API patterns

Adjust file sampling and analysis depth based on specified focus.

## Error Handling and Recovery

### Pattern Conflicts
When patterns conflict (multiple conventions with similar consistency):
1. **Security patterns** always take precedence
2. **Most recent patterns** (git history) preferred over legacy
3. **Framework/library conventions** preferred over custom patterns
4. **Document conflicts** in analysis files for user review

### Insufficient Pattern Data
When <70% consistency found:
1. **Note pattern inconsistency** in analysis
2. **Skip rule generation** for inconsistent patterns
3. **Apply security baseline** regardless
4. **Recommend pattern standardization** in analysis

### Analysis Completion Guarantee
Ensure all seven steps complete even if individual steps encounter issues:
1. **Continue with partial data** if file sampling fails
2. **Apply security baseline** even if pattern analysis incomplete
3. **Update CLAUDE.md** with whatever rules were successfully extracted
4. **Document any issues** in analysis files

## Quality Assurance

### Before CLAUDE.md Update - Content Validation
- [ ] Only imperative rules with >70% consistency included in CLAUDE.md
- [ ] Security baseline rules included (regardless of consistency)
- [ ] NO assessments, statistics, or recommendations in CLAUDE.md
- [ ] All analytical content routed to CONVENTION_ANALYSIS.md
- [ ] Rules are imperative format (start with action verbs)
- [ ] No conflicting or contradictory rules
- [ ] Custom rules section preserved
- [ ] Backup created successfully

### Before CONVENTION_ANALYSIS.md Creation
- [ ] All security findings and recommendations included
- [ ] Pattern consistency statistics documented
- [ ] Architecture assessment completed
- [ ] Implementation recommendations provided
- [ ] Coverage gaps identified and documented
- [ ] Priority classification applied to recommendations

### Analysis Completeness Check
- [ ] Core patterns analyzed (naming, structure, imports, types, async, errors)
- [ ] Security patterns analyzed (auth, validation, SQL, secrets, API)
- [ ] Data patterns analyzed (state, API, database, caching)
- [ ] Pattern consistency calculated (>70% threshold applied)
- [ ] Security baseline applied regardless of consistency

**Session Output:** Updated CLAUDE.md with codebase-derived conventions and complete analysis documentation in `.strategy/conventions/`