## Description
<!-- Describe your changes in detail -->

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Related Issue
<!-- Link to the issue: Fixes #123 -->
Fixes #

## Affected Apps
<!-- Check all that apply -->
- [ ] apps/web (Marketing site)
- [ ] apps/client (Client dashboard)
- [ ] apps/admin (Admin dashboard)
- [ ] apps/manager (Manager dashboard)
- [ ] apps/va (VA dashboard)
- [ ] packages/ui (Shared components)
- [ ] packages/database (Prisma schema)
- [ ] packages/mongodb (MongoDB models)
- [ ] Other: _______________

## How Has This Been Tested?
<!-- Describe the tests you ran -->
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Manual testing
- [ ] Tested in preview deployment

**Test Configuration:**
- Node version: 20.x
- Database: PostgreSQL + MongoDB
- Browser(s): Chrome, Firefox, Safari

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published
- [ ] I have updated the .env.example if new environment variables are needed
- [ ] I have run `pnpm build` successfully for affected apps
- [ ] I have tested the changes on a preview deployment

## Database Changes
<!-- If this PR includes database changes -->
- [ ] Prisma schema updated
- [ ] MongoDB models updated
- [ ] Migration created
- [ ] Seed data updated
- [ ] No database changes

**Migration command:**
```bash
# Add migration command if applicable
npx prisma migrate dev --name migration_name
```

## Security Considerations
<!-- Any security implications? -->
- [ ] No security implications
- [ ] Security review required
- [ ] Includes authentication changes
- [ ] Includes authorization changes
- [ ] Includes payment logic changes
- [ ] Includes data privacy changes

## Screenshots (if applicable)
<!-- Add screenshots to help explain your changes -->

### Before:
<!-- Screenshot or description of before state -->

### After:
<!-- Screenshot or description of after state -->

## Performance Impact
<!-- Describe any performance implications -->
- [ ] No performance impact
- [ ] Improves performance
- [ ] May affect performance (explain below)

**Details:**
<!-- Explain performance considerations -->

## Breaking Changes
<!-- List any breaking changes and migration steps -->
- [ ] No breaking changes
- [ ] Breaking changes (describe below)

**Migration steps for breaking changes:**
1.
2.
3.

## Additional Notes
<!-- Any additional information -->

## Deployment Notes
<!-- Special instructions for deployment -->
- [ ] Requires environment variable changes
- [ ] Requires database migration
- [ ] Requires cache invalidation
- [ ] Requires third-party service configuration
- [ ] No special deployment steps

**Deployment checklist:**
- [ ] Update environment variables in Vercel
- [ ] Run database migrations
- [ ] Clear CDN cache
- [ ] Update documentation
- [ ] Notify team

---

**Reviewer Guidelines:**
1. Check code quality and style
2. Verify tests pass
3. Review security implications
4. Test on preview deployment
5. Approve only if all checks pass
