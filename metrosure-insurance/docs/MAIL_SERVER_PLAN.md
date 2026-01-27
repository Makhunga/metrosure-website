# Self-Hosted Mail Server Research & Plan

**Project:** Metrosure Internal Mail Server
**Domain:** metrosure.app
**Purpose:** Internal identification & authentication for agents/mystery shoppers
**Key Requirement:** High turnover accounts, no external deliverability concerns, whitelisted domain
**Date:** 27 January 2026

---

## Table of Contents

1. [Requirements Summary](#requirements-summary)
2. [Options Explored](#options-explored)
3. [Comparison Matrix](#comparison-matrix)
4. [Recommendation](#recommendation)
5. [VPS Specification](#vps-specification)
6. [Implementation Plan](#implementation-plan)
7. [Confirmed Requirements](#confirmed-requirements)
8. [Next Steps](#next-steps)

---

## Requirements Summary

| Requirement | Priority |
|-------------|----------|
| Easy account creation/deletion | High |
| Temporary email accounts for mystery shoppers | High |
| No Microsoft licensing costs | High |
| Internal use only (whitelisted) | High |
| Low maintenance | Medium |
| API for automation | Medium |
| Web-based admin panel | Medium |

---

## Options Explored

### Option 1: Mailcow (Docker-based)

**Overview:** A full-featured, Docker-based email suite combining Postfix, Dovecot, and SOGo.

| Aspect | Details |
|--------|---------|
| **Setup Time** | ~30 minutes |
| **VPS Requirements** | 2 CPU, 4GB RAM, 40GB SSD |
| **Web Admin** | Full-featured UI for domains, accounts, aliases |
| **Webmail** | SOGo (modern, calendar/contacts included) |
| **Account Management** | GUI-based, easy creation/deletion |
| **API** | Yes - REST API for automation |
| **Cost** | Free (open source) |

**Pros:**
- Excellent web UI for account management
- Docker containers = easy backup/restore
- Built-in 2FA, fail2ban, Let's Encrypt
- SOGo webmail is polished and functional
- Good documentation and active community

**Cons:**
- Higher resource requirements (Docker overhead)
- Requires Docker knowledge
- More complex than some alternatives

**Best for:** Organisations wanting a full email suite with minimal CLI work.

**Resources:** [Mailcow](https://mailcow.email/)

---

### Option 2: Mail-in-a-Box (Ubuntu)

**Overview:** Turn a fresh Ubuntu server into a complete mail server in minutes.

| Aspect | Details |
|--------|---------|
| **Setup Time** | ~15 minutes |
| **VPS Requirements** | 1 CPU, 1GB RAM, 20GB SSD |
| **Web Admin** | Basic control panel |
| **Webmail** | Roundcube |
| **Account Management** | Web panel + CLI |
| **API** | Limited (mostly CLI-based) |
| **Cost** | Free (open source) |

**Pros:**
- Easiest setup of all options
- Auto-configures DNS, SPF, DKIM, DMARC
- Includes Nextcloud for contacts/calendar
- Low resource requirements
- Great for beginners

**Cons:**
- Must be the only thing on the server (dedicated)
- Limited customisation
- No API for account automation
- Upgrades can be tricky

**Best for:** Small teams wanting a "set and forget" solution.

**Resources:** [Mail-in-a-Box](https://mailinabox.email/)

---

### Option 3: Stalwart Mail Server (Modern Rust-based)

**Overview:** A modern, all-in-one mail server written in Rust with enterprise features.

| Aspect | Details |
|--------|---------|
| **Setup Time** | ~20 minutes |
| **VPS Requirements** | 1 CPU, 2GB RAM, 20GB SSD |
| **Web Admin** | Modern web interface |
| **Webmail** | Built-in webmail |
| **Account Management** | Web UI + REST API |
| **API** | Full REST API |
| **Cost** | Free (AGPL) / Enterprise licence available |

**Pros:**
- Written in Rust = memory safe, fast, secure
- Modern architecture (supports JMAP, CalDAV, CardDAV)
- Scales from 5 to millions of mailboxes
- Built-in spam filtering with LLM support
- Active development (feature-complete as of 2025)
- Full REST API for automation

**Cons:**
- Newer project (less community content)
- Some enterprise features require licence
- Documentation still maturing

**Best for:** Teams wanting modern tech stack with automation capabilities.

**Resources:** [Stalwart](https://stalw.art/) | [GitHub](https://github.com/stalwartlabs/stalwart)

---

### Option 4: Poste.io (Docker, Commercial-friendly)

**Overview:** Complete mail server in a single Docker container with 5-minute setup.

| Aspect | Details |
|--------|---------|
| **Setup Time** | ~5 minutes |
| **VPS Requirements** | 1 CPU, 512MB-2GB RAM, 20GB SSD |
| **Web Admin** | Clean, intuitive UI |
| **Webmail** | Built-in modern webmail |
| **Account Management** | GUI-based |
| **API** | REST API available |
| **Cost** | Free tier / Pro from €4/month |

**Pros:**
- Fastest setup of all options
- Lowest resource requirements
- Single container = simple management
- Good UI for non-technical admins
- Can disable ClamAV to save RAM

**Cons:**
- Pro features (API, larger scale) require payment
- Less customisable than others
- Closed-source

**Best for:** Quick deployment with minimal technical overhead.

**Resources:** [Poste.io](https://poste.io/)

---

### Option 5: docker-mailserver (DMS)

**Overview:** A minimal, configuration-file-based mail server in Docker.

| Aspect | Details |
|--------|---------|
| **Setup Time** | ~45 minutes |
| **VPS Requirements** | 1 CPU, 1GB RAM, 20GB SSD |
| **Web Admin** | None (CLI/config files only) |
| **Webmail** | None (pair with Roundcube separately) |
| **Account Management** | CLI scripts + config files |
| **API** | None (scriptable via CLI) |
| **Cost** | Free (MIT licence) |

**Pros:**
- Extremely lightweight
- No database required (file-based config)
- Highly customisable
- Good for automation via scripts
- Doesn't use ports 80/443

**Cons:**
- No web UI (CLI only)
- Steeper learning curve
- Must add webmail separately
- Manual account management

**Best for:** DevOps teams comfortable with CLI who want full control.

**Resources:** [docker-mailserver](https://github.com/docker-mailserver/docker-mailserver)

---

## Comparison Matrix

| Feature | Mailcow | Mail-in-a-Box | Stalwart | Poste.io | DMS |
|---------|---------|---------------|----------|----------|-----|
| **Setup Ease** | ★★★☆☆ | ★★★★★ | ★★★★☆ | ★★★★★ | ★★☆☆☆ |
| **Web Admin** | ★★★★★ | ★★★☆☆ | ★★★★☆ | ★★★★☆ | ✗ |
| **API/Automation** | ★★★★☆ | ★★☆☆☆ | ★★★★★ | ★★★☆☆ | ★★☆☆☆ |
| **Resource Usage** | High | Low | Low | Very Low | Very Low |
| **Account Turnover** | ★★★★☆ | ★★★☆☆ | ★★★★★ | ★★★★☆ | ★★★☆☆ |
| **Maintenance** | Medium | Low | Low | Low | Medium |
| **Documentation** | Excellent | Excellent | Good | Good | Excellent |

---

## Recommendation

### Primary Recommendation: Stalwart Mail Server

Given the requirements for **high account turnover**, **internal use only**, and **avoiding licensing costs**, Stalwart is the optimal choice:

1. **Full REST API** - Automate account creation/deletion for agents and mystery shoppers programmatically. Integrate with existing systems.

2. **Modern & Lightweight** - Written in Rust, it's memory-safe and efficient. Runs well on a modest VPS (2GB RAM).

3. **Built-in Webmail** - No need to set up separate webmail; agents can access email via browser immediately.

4. **Scales Effortlessly** - From 5 to 5,000 accounts without architecture changes.

5. **Active Development** - Feature-complete in 2025, with CalDAV/CardDAV support if calendars/contacts are needed later.

6. **Free & Open Source** - AGPL licence, no per-user costs.

### Alternative Recommendation

If **maximum ease of setup** is preferred and heavy automation isn't needed:

**Poste.io** - 5-minute setup, clean UI, minimal maintenance. Upgrade to Pro (€4/month) if API access is needed.

---

## VPS Specification

### Recommended Specification (Under 50 accounts)

| Component | Specification | Notes |
|-----------|---------------|-------|
| CPU | 2 vCores | Sufficient for low volume |
| RAM | 2 GB | Can scale to 4GB if needed |
| Storage | 40 GB SSD | Ample for internal mail |
| OS | Ubuntu 22.04 LTS | |

### Recommended Providers

| Provider | Plan | Price | Location |
|----------|------|-------|----------|
| **Hetzner CX22** | 2 vCPU, 4GB RAM, 40GB | €4.35/month | Germany (low latency to SA) |
| **Vultr Cape Town** | 2 vCPU, 2GB RAM, 55GB | $14/month | South Africa (local) |

**Note:** Hetzner CX22 offers better value unless local hosting is required for compliance.

---

## Implementation Plan

### Phase 1: Infrastructure Setup

| Task | Details |
|------|---------|
| Provision VPS | Hetzner CX22 or Vultr Cape Town |
| Configure DNS | MX, A, SPF, DKIM, DMARC records for metrosure.app |
| Install Stalwart | Via Docker or native binary |
| Basic hardening | Firewall (UFW), SSH keys, fail2ban |

### Phase 2: Configuration

| Task | Details |
|------|---------|
| Configure domain | Set up metrosure.app in Stalwart |
| SSL/TLS | Let's Encrypt certificates |
| Authentication | Configure password policies |
| Testing | Internal send/receive verification |

### Phase 3: Account Management Workflow

| Task | Details |
|------|---------|
| Document processes | Account creation/deletion procedures |
| API integration | Scripts for bulk operations |
| Automation | Temporary account provisioning workflow |
| Training | Administrator onboarding |

### Phase 4: Integration

| Task | Details |
|------|---------|
| Whitelist domain | Configure across internal systems |
| SSO/LDAP | Optional integration if needed |
| Documentation | Agent/mystery shopper procedures |

---

## Confirmed Requirements

| Requirement | Answer |
|-------------|--------|
| **Account Volume** | Under 50 active accounts |
| **Account Management** | Web UI + API (both) |
| **VPS Provider** | Hetzner or Vultr SA |

---

## Next Steps (After Approval)

### 1. Domain Setup
- [ ] Confirm metrosure.app is registered (or select alternative TLD)
- [ ] Prepare DNS records (MX, A, SPF, DKIM, DMARC)

### 2. VPS Provisioning
- [ ] Create Hetzner CX22 (or Vultr Cape Town if SA hosting required)
- [ ] Install Ubuntu 22.04 LTS
- [ ] Basic hardening (firewall, SSH keys)

### 3. Stalwart Installation
- [ ] Install Stalwart via Docker or native binary
- [ ] Configure domain and SSL certificates
- [ ] Create admin account

### 4. API Integration
- [ ] Document REST API endpoints for account management
- [ ] Create example scripts for bulk operations
- [ ] Test account lifecycle (create → use → delete)

### 5. Documentation
- [ ] Admin procedures for account management
- [ ] Agent onboarding instructions
- [ ] Troubleshooting guide

---

## Appendix: DNS Records Template

Once the VPS IP is known, configure these DNS records:

```
; A Record
mail.metrosure.app.    IN  A       <VPS_IP>

; MX Record
metrosure.app.         IN  MX  10  mail.metrosure.app.

; SPF Record
metrosure.app.         IN  TXT     "v=spf1 mx ~all"

; DKIM Record (generated by Stalwart)
default._domainkey.metrosure.app.  IN  TXT  "<DKIM_PUBLIC_KEY>"

; DMARC Record
_dmarc.metrosure.app.  IN  TXT     "v=DMARC1; p=quarantine; rua=mailto:postmaster@metrosure.app"
```

---

## Appendix: Stalwart API Examples

### Create Account

```bash
curl -X POST https://mail.metrosure.app/api/v1/principal \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "agent.smith",
    "type": "individual",
    "secrets": ["password123"],
    "emails": ["agent.smith@metrosure.app"],
    "quota": 104857600
  }'
```

### Delete Account

```bash
curl -X DELETE https://mail.metrosure.app/api/v1/principal/agent.smith \
  -H "Authorization: Bearer <API_TOKEN>"
```

### List All Accounts

```bash
curl -X GET https://mail.metrosure.app/api/v1/principal \
  -H "Authorization: Bearer <API_TOKEN>"
```

---

*Document created: 27 January 2026*
*Last updated: 27 January 2026*
