Introducing, the tool that can lock your websites from unwanted people.

Admin routes (require `x-admin-secret` header matching `ADMIN_SECRET`):
- POST /lock/admin/issue ; Issue a token for a website using a username (body: `user`, optional `site`, optional `expiresInSeconds`) → returns `{ id, token, activate_uri }`
- POST /lock/admin/revoke ; Revoke a token by ID (body: `id`)
- GET /lock/admin/tokens ; List all tokens

Public routes:
- GET /lock/verify ; Verify a token (header `x-access-token`, optional `x-site`)
- GET /lock/activate ; Activate a token/cookie (query `token`)

The admin panel proxies to `/lock/admin/*`. The /verify endpoint should be used in a middleware to verify a token / cookie. An example response is:
```json
{
  "id": 1,
  "valid": true,
  "user": "test",
  "site": "example.com",
  "expiresAt": 1788135052
}
```