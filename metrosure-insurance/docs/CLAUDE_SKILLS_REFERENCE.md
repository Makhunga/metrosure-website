# Claude Code Skills & Tools Reference

**Last Updated:** 11 January 2026
**Purpose:** Living document cataloguing all available skills, plugins, MCPs, and tools in the Claude Code environment.

---

## Quick Reference

### Slash Commands (Custom Skills)

| Command | Description |
|---------|-------------|
| `/commit-push` | Commit all changes and push to origin in one step |
| `/content-research-writer` | Research-backed writing assistance with citations |

### Superpowers Skills

| Skill | Invocation | When to Use |
|-------|------------|-------------|
| Brainstorming | `superpowers:brainstorming` | Before any creative work or feature implementation |
| Test-Driven Development | `superpowers:test-driven-development` | Before writing implementation code |
| Systematic Debugging | `superpowers:systematic-debugging` | When encountering bugs or test failures |
| Writing Plans | `superpowers:writing-plans` | When you have specs/requirements for multi-step tasks |
| Executing Plans | `superpowers:executing-plans` | When executing written implementation plans |
| Subagent-Driven Development | `superpowers:subagent-driven-development` | For independent tasks with two-stage review |
| Dispatching Parallel Agents | `superpowers:dispatching-parallel-agents` | When facing 2+ independent tasks |
| Using Git Worktrees | `superpowers:using-git-worktrees` | For isolated feature work |
| Requesting Code Review | `superpowers:requesting-code-review` | Before merging or completing major features |
| Receiving Code Review | `superpowers:receiving-code-review` | When receiving feedback on code |
| Verification Before Completion | `superpowers:verification-before-completion` | Before claiming work is complete |
| Finishing a Development Branch | `superpowers:finishing-a-development-branch` | When implementation is complete |
| Writing Skills | `superpowers:writing-skills` | When creating or editing skills |
| Using Superpowers | `superpowers:using-superpowers` | Introduction to the skills system |

### Other Plugins

| Skill | Invocation | When to Use |
|-------|------------|-------------|
| Frontend Design | `frontend-design:frontend-design` | Creating distinctive UI components |

---

## Custom Skills (Detailed)

### 1. Commit and Push

**Location:** `~/.claude/skills/commit-push/SKILL.md`

**Invocation:**
- `/commit-push`
- Say "commit and push" or "commit-push"

**Description:** Commits all staged/unstaged changes and pushes to remote in one step.

**Workflow:**
1. Shows `git status` and `git diff --stat`
2. Reviews recent commits to match style
3. Stages all changes with `git add -A`
4. Creates descriptive commit message
5. Pushes to origin

**Safety Rules:**
- Never force pushes to main/master
- Never skips hooks unless requested
- Never commits secrets (.env, credentials)
- Always shows what will be committed first

---

### 2. Content Research Writer

**Location:** `~/.claude/skills/content-research-writer/SKILL.md`

**Invocation:** Mention writing assistance needs (e.g., "Help me write an article about...")

**Description:** Assists in writing high-quality content with research, citations, and iterative feedback.

**Features:**
- Collaborative outlining
- Research assistance with citations
- Hook improvement
- Section-by-section feedback
- Voice preservation
- Full draft review and polish

**When to Use:**
- Blog posts, articles, newsletters
- Educational content, tutorials
- Thought leadership pieces
- Case studies with research
- Technical documentation with sources

---

## Superpowers Plugin Skills (Detailed)

**Plugin Version:** 4.0.3
**Location:** `~/.claude/plugins/cache/superpowers-marketplace/superpowers/4.0.3/skills/`

### Development Workflow Skills

#### Brainstorming
- **Invocation:** `superpowers:brainstorming`
- **Use:** Before any creative work - creating features, building components, adding functionality
- **Purpose:** Turn ideas into fully formed designs through Socratic dialogue

#### Writing Plans
- **Invocation:** `superpowers:writing-plans`
- **Use:** When you have specs/requirements before touching code
- **Purpose:** Create comprehensive implementation plans with bite-sized tasks (2-5 min each)

#### Executing Plans
- **Invocation:** `superpowers:executing-plans`
- **Use:** When you have a written implementation plan to execute
- **Purpose:** Batch execution with checkpoint reviews for architect feedback

#### Subagent-Driven Development
- **Invocation:** `superpowers:subagent-driven-development`
- **Use:** For plans with independent tasks in the current session
- **Purpose:** Dispatch fresh subagent per task with two-stage review

#### Dispatching Parallel Agents
- **Invocation:** `superpowers:dispatching-parallel-agents`
- **Use:** When facing 2+ independent tasks without shared state
- **Purpose:** Concurrent subagent workflows for efficiency

### Testing & Quality Skills

#### Test-Driven Development
- **Invocation:** `superpowers:test-driven-development`
- **Use:** Before writing implementation code
- **Purpose:** RED-GREEN-REFACTOR cycle - write failing test first

#### Systematic Debugging
- **Invocation:** `superpowers:systematic-debugging`
- **Use:** When encountering any bug, test failure, or unexpected behaviour
- **Purpose:** 4-phase root cause analysis before proposing fixes

#### Verification Before Completion
- **Invocation:** `superpowers:verification-before-completion`
- **Use:** Before claiming work is complete or creating PRs
- **Purpose:** Run verification commands and confirm output before success claims

### Code Review Skills

#### Requesting Code Review
- **Invocation:** `superpowers:requesting-code-review`
- **Use:** When completing tasks or before merging
- **Purpose:** Pre-review checklist to verify work meets requirements

#### Receiving Code Review
- **Invocation:** `superpowers:receiving-code-review`
- **Use:** When receiving feedback, especially if unclear or questionable
- **Purpose:** Technical rigor in responding - not blind implementation

### Git & Branch Management

#### Using Git Worktrees
- **Invocation:** `superpowers:using-git-worktrees`
- **Use:** For feature work needing isolation from current workspace
- **Purpose:** Create isolated git worktrees with smart directory selection

#### Finishing a Development Branch
- **Invocation:** `superpowers:finishing-a-development-branch`
- **Use:** When implementation is complete and tests pass
- **Purpose:** Guide completion with options for merge, PR, or cleanup

### Meta Skills

#### Writing Skills
- **Invocation:** `superpowers:writing-skills`
- **Use:** When creating or editing skills
- **Purpose:** TDD applied to process documentation

#### Using Superpowers
- **Invocation:** `superpowers:using-superpowers`
- **Use:** Introduction to the skills system
- **Purpose:** Establish how to find and use skills

---

## Frontend Design Plugin

**Location:** `~/.claude/plugins/cache/claude-plugins-official/frontend-design/`
**Author:** Anthropic

**Invocation:** `frontend-design:frontend-design`

**Description:** Creates distinctive, production-grade frontend interfaces that avoid generic AI aesthetics.

**Features:**
- Bold aesthetic choices
- Distinctive typography
- Context-aware colour palettes
- High-impact animations
- Production-ready code

**When to Use:**
- Building web components, pages, or applications
- Creating polished UI that stands out
- Following Frontend Aesthetics Cookbook patterns

---

## MCP Servers

### 1. Chrome DevTools MCP

**Purpose:** Browser automation, testing, and performance analysis

**Available Tools:**

| Tool | Description |
|------|-------------|
| `mcp__chrome-devtools__navigate_page` | Navigate to URL, back, forward, or reload |
| `mcp__chrome-devtools__take_snapshot` | Take accessibility tree snapshot of page |
| `mcp__chrome-devtools__take_screenshot` | Capture screenshot of page or element |
| `mcp__chrome-devtools__click` | Click on element by UID |
| `mcp__chrome-devtools__fill` | Type text into input or select option |
| `mcp__chrome-devtools__fill_form` | Fill multiple form elements at once |
| `mcp__chrome-devtools__hover` | Hover over element |
| `mcp__chrome-devtools__press_key` | Press key or key combination |
| `mcp__chrome-devtools__drag` | Drag element onto another |
| `mcp__chrome-devtools__evaluate_script` | Execute JavaScript in page |
| `mcp__chrome-devtools__list_pages` | List open browser pages |
| `mcp__chrome-devtools__select_page` | Select page as context |
| `mcp__chrome-devtools__new_page` | Open new page |
| `mcp__chrome-devtools__close_page` | Close page |
| `mcp__chrome-devtools__resize_page` | Resize page dimensions |
| `mcp__chrome-devtools__wait_for` | Wait for text to appear |
| `mcp__chrome-devtools__handle_dialog` | Accept or dismiss browser dialogs |
| `mcp__chrome-devtools__upload_file` | Upload file through input |
| `mcp__chrome-devtools__list_network_requests` | List network requests |
| `mcp__chrome-devtools__get_network_request` | Get network request details |
| `mcp__chrome-devtools__list_console_messages` | List console messages |
| `mcp__chrome-devtools__get_console_message` | Get console message details |
| `mcp__chrome-devtools__emulate` | Emulate network, CPU, geolocation |
| `mcp__chrome-devtools__performance_start_trace` | Start performance recording |
| `mcp__chrome-devtools__performance_stop_trace` | Stop performance recording |
| `mcp__chrome-devtools__performance_analyze_insight` | Analyse performance insight |

### 2. IDE MCP (VS Code)

**Purpose:** Editor integration for diagnostics and code execution

**Available Tools:**

| Tool | Description |
|------|-------------|
| `mcp__ide__getDiagnostics` | Get language diagnostics (errors, warnings) |
| `mcp__ide__executeCode` | Execute Python code in Jupyter kernel |

---

## Configuration Locations

| Configuration | Location |
|---------------|----------|
| Global settings | `~/.claude/settings.json` |
| Installed plugins | `~/.claude/plugins/installed_plugins.json` |
| Custom skills | `~/.claude/skills/` |
| Plugin cache | `~/.claude/plugins/cache/` |
| Project CLAUDE.md | `./CLAUDE.md` (per project) |

---

## How to Add/Update Skills

### Creating a New Custom Skill

1. Create skill directory:
   ```bash
   mkdir -p ~/.claude/skills/my-skill-name
   ```

2. Create SKILL.md with frontmatter:
   ```markdown
   ---
   name: my-skill-name
   description: Use when [specific triggering conditions]
   ---

   # Skill Title

   ## Overview
   What this skill does.

   ## Workflow
   Steps to follow.
   ```

3. Skill is automatically available via `/my-skill-name` or natural language

### Updating an Existing Skill

1. Edit the SKILL.md file directly:
   ```bash
   nano ~/.claude/skills/skill-name/SKILL.md
   ```

2. Changes take effect immediately in new conversations

### Installing Plugins

Plugins are managed through the Claude Code settings. Check `~/.claude/plugins/installed_plugins.json` for current installations.

---

## Changelog

| Date | Change |
|------|--------|
| 11 Jan 2026 | Initial document created with 2 custom skills, 14 superpowers skills, 1 frontend-design skill, 2 MCP servers |

---

*This is a living document. Update when adding new skills, plugins, or MCPs.*
