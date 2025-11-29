# GitHub Setup & Repository Configuration
## Complete Guide for Monorepo Setup

**Time Required:** 15 minutes
**Prerequisites:** GitHub account

---

## 🎯 What You'll Achieve

- ✅ Create GitHub repository for monorepo
- ✅ Configure branch protection rules
- ✅ Set up GitHub Actions CI/CD
- ✅ Configure repository secrets
- ✅ Set up PR templates
- ✅ Enable security features

---

## 📝 Step-by-Step GitHub Setup

### Step 1: Create GitHub Repository (3 min)

1. **Go to GitHub:** https://github.com/new

2. **Repository Details:**
   ```
   Repository name: realtyeaseai-monorepo
   Description: Enterprise VA Platform with AI Tools - Multi-role Dashboard System
   Visibility: Private (recommended) or Public
   ```

3. **Initialize Repository:**
   - ❌ Don't add README (you already have one)
   - ❌ Don't add .gitignore (you already have one)
   - ❌ Don't choose a license yet

4. Click **"Create repository"**

---

### Step 2: Connect Local Repository to GitHub (2 min)

```bash
# Navigate to your monorepo
cd "C:\Users\Home\Documents\AI Dashboard for SaaS\monorepo"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Enterprise VA Platform monorepo

- 5 Next.js apps (web, admin, client, manager, va)
- Shared UI components and packages
- PostgreSQL + MongoDB hybrid database
- Comprehensive documentation
- Enterprise security architecture"

# Add remote origin (replace with your username)
git remote add origin https://github.com/YOUR_USERNAME/realtyeaseai-monorepo.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note:** Replace `YOUR_USERNAME` with your GitHub username.

---

### Step 3: Configure Branch Protection (2 min)

1. **Go to:** Repository → Settings → Branches

2. **Add Branch Protection Rule:**
   ```
   Branch name pattern: main
   ```

3. **Enable Protection Rules:**
   - ✅ Require a pull request before merging
   - ✅ Require approvals: 1 (if you have team members)
   - ✅ Require status checks to pass before merging
     - Select: `lint`, `build`, `test`, `security`
   - ✅ Require branches to be up to date before merging
   - ✅ Include administrators (optional)
   - ✅ Do not allow bypassing the above settings

4. Click **"Create"** or **"Save changes"**

---

### Step 4: Create GitHub Actions Workflow (5 min)

Create the `.github/workflows` directory structure:

```bash
# Create GitHub Actions directory
mkdir -p .github/workflows

# You'll create workflow files in the next step
```

I'll create the CI/CD workflow files for you.

---

### Step 5: Add GitHub Secrets (3 min)

1. **Go to:** Repository → Settings → Secrets and variables → Actions

2. **Click "New repository secret"** and add these secrets:

#### **Database Secrets**
```
DATABASE_URL
Value: postgresql://postgres.xxxxx:password@aws-0-us-west-1.pooler.supabase.com:5432/postgres

MONGODB_URI
Value: mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/realtyeaseai?retryWrites=true&w=majority
```

#### **Supabase Secrets**
```
NEXT_PUBLIC_SUPABASE_URL
Value: https://xxxxx.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGci...

SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGci...
```

#### **Auth Secrets**
```
NEXTAUTH_SECRET
Value: [your-generated-secret]

NEXTAUTH_URL
Value: https://realtyease.ai (production) or http://localhost:3000 (dev)
```

#### **PayPal Secrets**
```
PAYPAL_CLIENT_ID
Value: [your-paypal-client-id]

PAYPAL_CLIENT_SECRET
Value: [your-paypal-client-secret]

NEXT_PUBLIC_PAYPAL_CLIENT_ID
Value: [your-paypal-client-id]
```

#### **Optional but Recommended**
```
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
SENTRY_DSN
NEXT_PUBLIC_SENTRY_DSN
```

---

## 🔄 CI/CD Pipeline Configuration

### GitHub Actions Workflow Files

I'll create these files for you now.

---

## 📂 Repository Structure

After setup, your GitHub repository will look like:

```
realtyeaseai-monorepo/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                    # Main CI pipeline
│   │   ├── deploy-web.yml            # Deploy web app
│   │   ├── deploy-admin.yml          # Deploy admin app
│   │   ├── deploy-client.yml         # Deploy client app
│   │   ├── deploy-manager.yml        # Deploy manager app
│   │   └── deploy-va.yml             # Deploy VA app
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── PULL_REQUEST_TEMPLATE.md
├── apps/
├── packages/
├── .gitignore
├── README.md
├── package.json
└── pnpm-workspace.yaml
```

---

## 🔐 Security Configuration

### Enable GitHub Security Features

1. **Go to:** Repository → Settings → Security

2. **Enable:**
   - ✅ Dependency graph
   - ✅ Dependabot alerts
   - ✅ Dependabot security updates
   - ✅ Code scanning (GitHub Advanced Security)
   - ✅ Secret scanning

3. **Configure Dependabot:**

Create `.github/dependabot.yml`:

```yaml
version: 2
updates:
  # Enable version updates for npm
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    versioning-strategy: increase

  # Monitor GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
```

---

## 🌿 Branch Strategy

### Recommended Git Flow

```
main (production)
  ↑
develop (staging)
  ↑
feature/* (feature branches)
  ↑
hotfix/* (urgent fixes)
```

### Branch Naming Convention

```bash
# Features
feature/add-payment-integration
feature/ai-credits-wallet

# Bug fixes
fix/login-error
fix/subscription-renewal

# Hotfixes
hotfix/critical-security-patch

# Releases
release/v1.0.0
```

### Commit Message Convention

```bash
# Format: <type>(<scope>): <subject>

# Examples:
git commit -m "feat(auth): add Google OAuth integration"
git commit -m "fix(payments): resolve PayPal webhook issue"
git commit -m "docs(readme): update installation instructions"
git commit -m "refactor(database): optimize Prisma queries"
git commit -m "test(api): add integration tests for user routes"
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes

---

## 📋 Pull Request Template

Create `.github/PULL_REQUEST_TEMPLATE.md`:

```markdown
## Description
<!-- Describe your changes in detail -->

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Related Issue
<!-- Link to the issue: Fixes #123 -->

## How Has This Been Tested?
<!-- Describe the tests you ran -->
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published

## Screenshots (if applicable)
<!-- Add screenshots to help explain your changes -->

## Additional Notes
<!-- Any additional information -->
```

---

## 🎯 GitHub Actions Workflows

### Workflow 1: Main CI Pipeline

Create `.github/workflows/ci.yml` - I'll create this file now.

---

## 📊 GitHub Repository Settings Checklist

### General Settings
- [ ] Repository name: `realtyeaseai-monorepo`
- [ ] Description added
- [ ] Topics added: `nextjs`, `typescript`, `turborepo`, `monorepo`, `saas`
- [ ] Issues enabled
- [ ] Projects enabled
- [ ] Wiki disabled (use README instead)
- [ ] Discussions disabled (optional)

### Branch Protection
- [ ] Main branch protected
- [ ] Require PR reviews
- [ ] Require status checks
- [ ] Enforce on administrators

### Security
- [ ] Dependency graph enabled
- [ ] Dependabot alerts enabled
- [ ] Dependabot security updates enabled
- [ ] Code scanning enabled
- [ ] Secret scanning enabled

### Secrets
- [ ] All database URLs added
- [ ] All API keys added
- [ ] Auth secrets added
- [ ] Payment credentials added

### Actions
- [ ] GitHub Actions enabled
- [ ] Workflow permissions: Read and write
- [ ] Allow GitHub Actions to create PRs

---

## 🚀 Quick Setup Commands

Run these commands to set up everything:

```bash
# 1. Initialize repository (if not done)
cd "C:\Users\Home\Documents\AI Dashboard for SaaS\monorepo"
git init

# 2. Create GitHub workflows directory
mkdir -p .github/workflows

# 3. Add all files
git add .

# 4. Create initial commit
git commit -m "Initial commit: Enterprise VA Platform

Features:
- Multi-role dashboards (Admin, Manager, Client, VA)
- Shared UI component library
- PostgreSQL + MongoDB hybrid database
- Enterprise security architecture
- AI credits wallet system
- Comprehensive documentation"

# 5. Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/realtyeaseai-monorepo.git

# 6. Push to GitHub
git branch -M main
git push -u origin main

# 7. Create develop branch
git checkout -b develop
git push -u origin develop
```

---

## 🔧 Repository Maintenance

### Regular Tasks

**Weekly:**
- Review and merge Dependabot PRs
- Check GitHub Actions workflow runs
- Review security alerts

**Monthly:**
- Audit repository access
- Review and update documentation
- Clean up stale branches

**Quarterly:**
- Review and update dependencies
- Security audit
- Performance review

---

## 🎓 Best Practices

### DO ✅

1. **Use Meaningful Commit Messages**
   ```bash
   # Good
   git commit -m "feat(auth): implement 2FA with TOTP"

   # Bad
   git commit -m "fixed stuff"
   ```

2. **Keep Main Branch Stable**
   - Always merge through PRs
   - Require status checks to pass
   - Use develop branch for integration

3. **Tag Releases**
   ```bash
   git tag -a v1.0.0 -m "Release v1.0.0: Initial production release"
   git push origin v1.0.0
   ```

4. **Write Descriptive PR Descriptions**
   - Explain what and why
   - Include screenshots for UI changes
   - Link related issues

5. **Review Code Before Merging**
   - Check for security issues
   - Ensure tests pass
   - Verify documentation updated

### DON'T ❌

1. **Don't Commit Secrets**
   - Use GitHub Secrets instead
   - Check .gitignore includes .env files
   - Use git-secrets or similar tools

2. **Don't Push Directly to Main**
   - Always use PRs
   - Get code reviewed
   - Ensure CI passes

3. **Don't Commit Large Files**
   - Use Git LFS for large files
   - Keep images optimized
   - Don't commit node_modules

4. **Don't Skip CI Checks**
   - Fix linting errors
   - Ensure tests pass
   - Address security warnings

---

## 📞 Troubleshooting

### Issue 1: Push Rejected

**Error:** `! [rejected] main -> main (fetch first)`

**Fix:**
```bash
git pull origin main --rebase
git push origin main
```

---

### Issue 2: Merge Conflicts

**Fix:**
```bash
# Update your branch
git fetch origin
git merge origin/main

# Resolve conflicts in files
# Then commit
git add .
git commit -m "Resolve merge conflicts"
git push
```

---

### Issue 3: Accidental Commit of Secrets

**Fix:**
```bash
# Remove from history (use with caution!)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (only if you're sure!)
git push origin --force --all

# Then rotate all exposed secrets immediately!
```

---

## 🎯 Next Steps

After GitHub setup is complete:

1. ✅ Repository created and code pushed
2. ✅ Branch protection configured
3. ✅ GitHub Actions workflows added
4. ✅ Repository secrets configured
5. ⏩ **Next:** Set up Vercel deployment (see VERCEL_DEPLOYMENT.md)

---

## 📚 Useful GitHub Commands

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/realtyeaseai-monorepo.git

# Create new branch
git checkout -b feature/new-feature

# Push branch to GitHub
git push -u origin feature/new-feature

# Pull latest changes
git pull origin main

# View commit history
git log --oneline --graph --all

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Create release tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# Delete remote branch
git push origin --delete feature/old-feature
```

---

**GitHub Repository Ready! Time to Deploy! 🚀**

**Next:** Follow VERCEL_DEPLOYMENT.md to deploy your apps
