Introducing, the tool that can lock your websites from unwanted people.

It gives you three routes to work with:
- POST /lock/issue ; To issue a token for a website using a username
- POST /lock/revoke ; Revokes a token by ID
- GET /lock/verify ; Verifies a token

You can set up an admin panel that would issue / revoke access to tokens. The /verify endpoint should be used in a middleware to verify a token / cookie. An example response is:
```json
{
  "id": 1,
  "valid": true,
  "user": "test",
  "site": "example.com",
  "expiresAt": 1788135052
}
```
