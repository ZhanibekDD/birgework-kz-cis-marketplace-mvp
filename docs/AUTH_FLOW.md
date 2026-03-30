# Auth flow

1. User logs in/registers via `/api/auth/login` or `/api/auth/register`.
2. Backend returns `accessToken` + `refreshToken`.
3. Frontend stores tokens in localStorage (`bw_access_token`, `bw_refresh_token`).
4. Protected requests send `Authorization: Bearer <accessToken>`.
5. On 401, frontend calls `/api/auth/refresh` and retries original request.
6. Logout invalidates server session and clears client tokens.

Roles:
- `buyer`
- `seller`
- `guest` is frontend local fallback when `/auth/me` is unavailable.
