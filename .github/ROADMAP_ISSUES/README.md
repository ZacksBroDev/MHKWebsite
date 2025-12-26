# 🗺️ Roadmap Issues - Quick Setup Guide

This folder contains detailed specifications for 3 key roadmap features. Follow these steps to create GitHub Issues from these files.

## 📋 How to Create Issues

### Option 1: Manual Creation (Recommended for First Time)

1. Go to your repo: `https://github.com/ZacksBroDev/MHKWebsite/issues/new`
2. Copy content from each `.md` file below
3. Create 3 issues with these titles:

**Issue #1:** `Replace Mock Auth with AWS Cognito`
- **Labels:** `enhancement`, `security`, `roadmap`, `q1-2026`
- **Milestone:** Q1 2026
- **Content:** Copy from `01-cognito-auth.md`

**Issue #2:** `Persist Events and User Data to Database`
- **Labels:** `enhancement`, `backend`, `database`, `roadmap`, `q1-2026`
- **Milestone:** Q1 2026
- **Content:** Copy from `02-database-persistence.md`

**Issue #3:** `Implement Admin CRUD Operations`
- **Labels:** `enhancement`, `frontend`, `backend`, `admin`, `roadmap`, `q2-2026`
- **Milestone:** Q2 2026
- **Content:** Copy from `03-admin-crud.md`

### Option 2: GitHub CLI (Fastest)

```bash
# Install GitHub CLI if not already: brew install gh

# Authenticate
gh auth login

# Create issues from files
gh issue create --title "Replace Mock Auth with AWS Cognito" \
  --body-file .github/ROADMAP_ISSUES/01-cognito-auth.md \
  --label "enhancement,security,roadmap,q1-2026"

gh issue create --title "Persist Events and User Data to Database" \
  --body-file .github/ROADMAP_ISSUES/02-database-persistence.md \
  --label "enhancement,backend,database,roadmap,q1-2026"

gh issue create --title "Implement Admin CRUD Operations" \
  --body-file .github/ROADMAP_ISSUES/03-admin-crud.md \
  --label "enhancement,frontend,backend,admin,roadmap,q2-2026"
```

### Option 3: Automation Script

```bash
#!/bin/bash
# create-roadmap-issues.sh

for file in .github/ROADMAP_ISSUES/*.md; do
  title=$(grep -m 1 "^# " "$file" | sed 's/^# //')
  gh issue create --title "$title" --body-file "$file" --label "roadmap"
done
```

## 🎯 Why These Issues Matter

**For Recruiters:**
- ✅ Shows planned ownership (not just "done and abandoned")
- ✅ Demonstrates technical planning ability (architecture decisions)
- ✅ Proves you understand production concerns (security, scalability)
- ✅ Timeline estimates show project management awareness

**For Yourself:**
- Clear roadmap prevents feature creep
- Acceptance criteria make features testable
- Technical approach documents can be reused in future projects

## 📊 Expected Impact

Once created, your repo will show:
```
Issues (3 open)
├─ #1 Replace Mock Auth with AWS Cognito [q1-2026]
├─ #2 Persist Events and User Data to Database [q1-2026]
└─ #3 Implement Admin CRUD Operations [q2-2026]
```

**Recruiter Perception:**
- Before: "Nice demo, but no ongoing development"
- After: "Active project with clear technical roadmap"

## 🚀 Next Steps

1. Create the 3 issues (5 minutes)
2. Pin issue #1 and #2 to top of issues page (shows priorities)
3. Add project board (optional): Kanban with "Planned" / "In Progress" / "Done"
4. Link issues in README roadmap section

---

💡 **Pro Tip:** When you start working on an issue, convert it to a Draft PR. This shows active development even if not complete.
