# Claude Web Development Playbook

> A practical checklist-style guide for building beautiful websites with Claude Code.
> Created: January 2026 | Last Updated: Session 93

---

## Quick Start: One-Time Setup

### Step 1: Essential MCP Servers

Run these commands once to install the recommended MCPs:

```bash
# Chrome DevTools (browser automation & testing)
claude mcp add chrome-devtools npx chrome-devtools-mcp@latest

# Up-to-date documentation (React, Next.js, Tailwind, etc.)
claude mcp add context7 npx -y @upstash/context7-mcp

# Cross-browser testing
claude mcp add playwright npx @anthropic/mcp-playwright

# Web scraping (optional - needs API key from firecrawl.dev)
claude mcp add-json "firecrawl" '{"command":"mcp-server-firecrawl","env":{"FIRECRAWL_API_KEY":"your-key"}}'
```

### Step 2: Claude for Chrome Extension

1. Go to Chrome Web Store → Search "Claude for Chrome" by Anthropic
2. Install the extension
3. Verify Claude Code version 2.0.73+ (`claude --version`)

**What this adds:**
- ✅ Access authenticated pages (logged-in sessions)
- ✅ Multi-tab orchestration
- ✅ Record GIFs of actions
- ✅ Scheduled daily/weekly checks

### Step 3: Create Custom Commands

Create these files for reusable workflows:

**`~/.claude/commands/design-review.md`** (available in all projects)
```markdown
Review the current page for design consistency:
1. Check colour contrast (WCAG 2.1 AA)
2. Verify typography hierarchy
3. Test responsive breakpoints: 375px, 768px, 1024px
4. Validate dark mode appearance
5. List any visual issues found
$ARGUMENTS
```

**`~/.claude/commands/perf-audit.md`**
```markdown
Run a performance audit on $ARGUMENTS:
1. Start a performance trace with page reload
2. Stop trace and analyse results
3. Report Core Web Vitals (LCP, CLS, INP)
4. Suggest specific optimisations with code changes
```

**`~/.claude/commands/extract-design.md`**
```markdown
Extract design system from $ARGUMENTS:
1. Navigate to the URL
2. Take a screenshot
3. Extract: colours (as CSS variables), typography scale, spacing, shadows, radii
4. Output as JSON or Tailwind config format
```

---

## Playbook: Building a Beautiful Website

### Phase 1: Gather Inspiration

**Checklist:**
- [ ] Browse Awwwards.com, Dribbble.com, or production sites you admire
- [ ] Screenshot 2-3 designs that match your vision
- [ ] Paste screenshots into Claude Code (Ctrl+V on Linux/Windows)

**Prompt template:**
```
Analyse this screenshot and extract a complete design system:
- Colour palette (primary, secondary, neutrals) as CSS variables
- Typography scale (families, sizes, weights, line-heights)
- Spacing scale (margin/padding values)
- Border radius values
- Shadow definitions
- Key component patterns
Output as a JSON file I can reference.
```

**Using MCPs for inspiration:**
```bash
# Navigate to an inspiration site and capture it
"Use Chrome DevTools to navigate to awwwards.com/websites/nominated,
take a screenshot, and list 5 interesting design patterns"

# Or scrape with Firecrawl
"Use Firecrawl to scrape stripe.com and extract their design system"
```

### Phase 2: Research Content

**Invoke skill:** `/content-research-writer`

**Checklist:**
- [ ] Define target audience
- [ ] Research competitors (use WebSearch)
- [ ] Create content outline (hook → body → CTA)
- [ ] Iterate section by section
- [ ] Review for flow and clarity

**Prompt template:**
```
I'm building a [type of website] for [audience].
Research [industry/topic] and create:
1. A compelling hero headline (10 words max)
2. 3 subheadings for key benefits
3. Social proof ideas
4. Strong CTA copy
Use British English. Include citations.
```

### Phase 3: Design & Build

**Invoke skill:** `frontend-design` (automatic for UI work)

**Be specific about aesthetics:**

| ❌ Vague | ✅ Specific |
|---------|-----------|
| "Make it modern" | "Brutalist with monospace fonts and raw borders" |
| "Make it pretty" | "Luxury editorial: serif headlines, muted palette, generous whitespace" |
| "Clean design" | "Nordic minimal: Scandinavian palette, geometric sans, subtle shadows" |

**Aesthetic directions to try:**
- Brutally minimal
- Maximalist/expressive
- Retro-futuristic
- Organic/natural
- Luxury/refined
- Editorial/magazine
- Art deco/geometric
- Soft/pastel
- Industrial/utilitarian

### Phase 4: Iterate & Verify

**Build-Test-Fix Loop with Chrome DevTools MCP:**

```bash
# Start dev server
npm run dev

# Then ask Claude:
"Navigate to localhost:3000, take a snapshot and screenshot,
check console for errors, and review the layout"
```

**Quick commands:**

| What you want | DevTools MCP tool |
|---------------|-------------------|
| See page structure | `take_snapshot` |
| Visual check | `take_screenshot` |
| Console errors | `list_console_messages` |
| Network issues | `list_network_requests` |
| Test a form | `fill_form` + `click` |
| Performance profile | `performance_start_trace` |
| Resize viewport | `resize_page` |

### Phase 5: Cross-Browser & Responsive

**Checklist:**
- [ ] Test at 375px (mobile)
- [ ] Test at 768px (tablet)
- [ ] Test at 1024px (laptop)
- [ ] Test at 1440px (desktop)
- [ ] Verify dark mode
- [ ] Run Playwright for Firefox/Safari (if installed)

**Prompt:**
```
Use Chrome DevTools to resize the page to 375px width,
take a screenshot, then check for layout issues.
Repeat for 768px and 1024px.
```

### Phase 6: Polish & Ship

**Checklist:**
- [ ] Run `/design-review` (custom command)
- [ ] Run `/perf-audit` (custom command)
- [ ] Check WCAG 2.1 colour contrast
- [ ] Verify all links work
- [ ] Run `npm run build`
- [ ] Deploy

---

## Quick Reference

### Chrome DevTools MCP Tools

| Tool | Use |
|------|-----|
| `take_snapshot` | Get page accessibility tree |
| `take_screenshot` | Capture visual |
| `click` | Click element by uid |
| `fill` | Type in input |
| `fill_form` | Fill multiple fields |
| `navigate_page` | Go to URL |
| `resize_page` | Change viewport |
| `list_console_messages` | Check errors |
| `list_network_requests` | Debug API calls |
| `performance_start_trace` | Profile performance |
| `evaluate_script` | Run custom JS |

### Claude Skills

| Skill | When to use |
|-------|-------------|
| `frontend-design` | Any UI/component work |
| `content-research-writer` | Copy, messaging, research |
| `brainstorming` | Before building new features |
| `systematic-debugging` | When something breaks |

### Community Resources

| Resource | URL |
|----------|-----|
| Claude Plugins Registry | [claude-plugins.dev](https://claude-plugins.dev) |
| Awesome Claude Skills | [github.com/travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) |
| Production Commands | [github.com/wshobson/commands](https://github.com/wshobson/commands) |
| Claude Command Suite | [github.com/qdhenry/Claude-Command-Suite](https://github.com/qdhenry/Claude-Command-Suite) |

### Design Inspiration Sites

| Site | Best for |
|------|----------|
| [Awwwards.com](https://awwwards.com) | Award-winning designs |
| [Dribbble.com](https://dribbble.com) | UI components, concepts |
| [Behance.net](https://behance.net) | Full case studies |
| [Mobbin.com](https://mobbin.com) | Mobile app patterns |
| [Land-book.com](https://land-book.com) | Landing pages |
| [Godly.website](https://godly.website) | Modern web design |

---

## Tips for Beautiful Websites

1. **Typography is 95%** - Invest time in font choices
2. **Be specific about aesthetics** - "Luxury editorial" not "modern"
3. **Extract real systems** - Analyse actual sites, don't guess
4. **Motion matters** - Staggered reveals create delight
5. **Test in context** - Real content, dark mode, mobile
6. **Use the loop** - Code → DevTools preview → iterate

---

## Sources

**Official:**
- [Claude Code Chrome Integration](https://code.claude.com/docs/en/chrome)
- [Claude for Chrome](https://claude.com/chrome)
- [Chrome DevTools MCP](https://github.com/anthropics/anthropic-quickstarts/tree/main/mcp-devtools-server)
- [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Slash Commands Docs](https://code.claude.com/docs/en/slash-commands)

**Skills & Plugins:**
- [Claude Plugins Registry](https://claude-plugins.dev/)
- [Awesome Claude Skills](https://github.com/travisvn/awesome-claude-skills)

**MCPs:**
- [Firecrawl MCP](https://docs.firecrawl.dev/developer-guides/mcp-setup-guides/claude-code)
- [Context7 MCP](https://github.com/upstash/context7)

**Commands:**
- [Production Slash Commands](https://github.com/wshobson/commands)
- [Claude Command Suite](https://github.com/qdhenry/Claude-Command-Suite)
