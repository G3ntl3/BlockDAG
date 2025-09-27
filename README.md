## BlockDAG

Simple Express/Mongo backend for a betting/leaderboard app. This README gives a quick setup guide and a routes reference your frontend team can use.

## Quick info
- Base URL (local): http://localhost:5000
- Default request/response content type: application/json

## Requirements
- Node.js (14+ recommended)
- MongoDB (local or remote)

## Install
1. Install dependencies:

```bash
npm install
```

2. Configure environment (create a `.env` file if needed) with at minimum your MongoDB connection string and PORT. Example keys used by the project:

- MONGO_URI
- PORT (default often 5000)

3. Start the server:

```bash
npm start
```

If your project uses `nodemon` for development, use `npm run dev` (if provided).

## Routes (API reference)

All endpoints return JSON unless stated otherwise. The routes below are mounted under the base URL.

### Root
- GET /
  - Description: Simple health/landing endpoint
  - Response: 200 text/plain
    - Body: "Blockdag endpoint"

### User routes (mounted at /user)
Controller file: `controllers/user.controller.js`

- POST /user/register
  - Purpose: create a new user or update username for an existing wallet
  - Request JSON:
    ```json
    { "wallet": "0x1234...", "username": "playerName", "avatar": "https://... (optional)" }
    ```
  - Success (200): returns created/updated user object
  - Possible errors: 400 missing fields or username taken, 500 internal error

- POST /user/recordWin
  - Purpose: increment wins and add earnings to a user's record
  - Request JSON:
    ```json
    { "wallet": "0x1234...", "amountWon": 25.5 }
    ```
  - Success: 200 updated user object
  - Errors: 404 user not found, 500 internal error

- POST /user/recordLoss
  - Purpose: increment a user's losses
  - Request JSON:
    ```json
    { "wallet": "0x1234..." }
    ```
  - Success: 200 updated user object

- GET /user/:wallet
  - Purpose: fetch a user's stats by wallet address
  - Example: GET /user/0x1234...
  - Success: 200 user object
  - Errors: 404 not found

Example user object returned (trimmed):

```json
{
  "_id": "64f...abc",
  "wallet": "0x1234...",
  "username": "playerName",
  "avatar": "https://...",
  "wins": 0,
  "losses": 0,
  "earnings": 0,
  "history": [],
  "__v": 0
}
```

### Leaderboard routes (mounted at /leaderboard)
Controller file: `controllers/leaderboard.controller.js`

- GET /leaderboard/earnings
  - Purpose: list users sorted by `earnings` (descending)
  - Success: 200 array of user objects (sorted)
  - Error: 500 internal error

- GET /leaderboard/wins
  - Purpose: list users sorted by `wins` (descending)

- GET /leaderboard/losses
  - Purpose: list users sorted by `losses` (descending)

- GET /leaderboard/winrate
  - Purpose: list users sorted by win rate (wins / (wins + losses), descending)
  - Success: 200 array of objects with winrate included (e.g. `winrate`: 0.83)

Example leaderboard response (earnings):

```json
[
  { "wallet":"0xA...","username":"top1","wins":10,"losses":2,"earnings":1200, "avatar":"https://..." },
  { "wallet":"0xB...","username":"top2","wins":8,"losses":3,"earnings":950 }
]
```

## Model summary
User model (file: `models/user_model.js`) fields returned in responses:

- wallet: string (unique)
- username: string (unique)
- avatar: string (optional URL)
- wins: number
- losses: number
- earnings: number
- history: array of bet objects (betId, marketId, bet, amount, status, payout)

Example history item:

```json
{
  "betId": 123,
  "marketId": "market_1",
  "bet": "home",
  "amount": 10,
  "status": "won",
  "payout": 20
}
```

## Notes for frontend
- Use JSON for request bodies and set Content-Type: application/json.
- All errors return JSON with an `error` or `message` field depending on the controller.
- Authentication: currently not present in the codebase. Protect endpoints externally if needed.

## Next steps / extras I can provide
- Export this routes specification as a Postman collection.
- Add example fetch/axios snippets per endpoint.
- Add TypeScript types or an OpenAPI spec.

If you want any of the above, tell me which one and I'll add it.
