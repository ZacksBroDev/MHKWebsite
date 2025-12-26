# Replace Mock Auth with AWS Cognito

## 🎯 Feature Description

Replace the current mock authentication system (localStorage-based) with **AWS Cognito** for production-grade user management, including real email/password validation, MFA support, and secure JWT token handling.

## 💡 Motivation

**Current State:**
- Any email/password combination works (no validation)
- Auth tokens stored in localStorage (no server verification)
- No password reset, email verification, or account recovery
- Security risk: client-side auth bypass

**Business Value:**
- **Security:** Industry-standard authentication with AWS-managed security
- **Scalability:** Support 10,000+ users without custom backend auth code
- **Features:** Password reset, email verification, MFA, social login (Google/Facebook)
- **Compliance:** HIPAA/SOC2 ready with Cognito's security certifications

## 🛠️ Technical Approach

### 1. AWS Cognito Setup
```bash
# Create Cognito User Pool
aws cognito-idp create-user-pool \
  --pool-name mhk-training-users \
  --policies "PasswordPolicy={MinimumLength=8,RequireUppercase=true,RequireNumbers=true}" \
  --auto-verified-attributes email

# Create Cognito App Client
aws cognito-idp create-user-pool-client \
  --user-pool-id <pool-id> \
  --client-name mhk-web-app
```

### 2. Frontend Integration (React)
- Install `amazon-cognito-identity-js` or `@aws-amplify/auth`
- Update `src/contexts/AuthContext.jsx`:
  - Replace `localStorage` token with Cognito session tokens
  - Add `signUp`, `confirmSignUp`, `forgotPassword` methods
  - Implement token refresh logic

### 3. API Configuration
- Update `src/config/api.js` to include Cognito-issued JWT tokens in `Authorization` headers
- Add token validation middleware (future backend)

### 4. Migration Path
- Keep mock auth behind feature flag: `VITE_USE_COGNITO=true`
- Gradual rollout with A/B testing

## ✅ Acceptance Criteria

- [ ] Cognito User Pool created with email verification enabled
- [ ] Sign up requires valid email format and strong password (8+ chars, uppercase, number)
- [ ] Email verification flow works (user receives code, confirms account)
- [ ] Login returns real JWT token (expires in 1 hour, refresh token valid 30 days)
- [ ] Password reset flow implemented (forgot password → email code → reset)
- [ ] Invalid credentials show "Incorrect username or password" error
- [ ] JWT token automatically refreshes before expiration
- [ ] Protected routes validate token with Cognito (not just localStorage check)
- [ ] Admin role mapped via Cognito user groups (`mhk-admins` group)
- [ ] Session persists across browser tabs (Cognito session storage)
- [ ] Unit tests for auth context methods (sign up, login, logout, refresh)
- [ ] Documentation: `.env.example` updated with Cognito config keys

## 📅 Timeline

**Target:** Q1 2026  
**Estimate:** 16-20 hours
- Setup: 2-3 hours
- Frontend integration: 8-10 hours
- Testing & bug fixes: 4-5 hours
- Documentation: 2 hours

## 📚 Resources

- [AWS Cognito Developer Guide](https://docs.aws.amazon.com/cognito/latest/developerguide/)
- [Amplify Auth Library](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/)
- [JWT Token Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)

## 🔗 Related Issues

- #2 Backend integration (Cognito requires backend API for user profile storage)
- #3 Admin CRUD (Admin role permissions via Cognito user groups)

---

**Labels:** `enhancement`, `security`, `roadmap`, `q1-2026`  
**Priority:** High (security improvement)
