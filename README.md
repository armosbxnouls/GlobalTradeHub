# GlobalTradeHub — Twilio SMS backend

Small server that sends and checks one-time SMS codes using Twilio's Verify API,
so phone-number registration in GlobalTradeHub can send real SMS instead of the
demo code.

## Why this is a separate server

Twilio's account SID and auth token are secret credentials. They must never be
placed in frontend/browser code (including a React artifact) — anyone viewing
the page's source could steal them and send SMS on your account's bill. This
server keeps those secrets on the backend and exposes two safe HTTP endpoints
for the frontend to call.

## 1. Get Twilio credentials

1. Create a free account at https://www.twilio.com/try-twilio
2. From the [Twilio Console](https://console.twilio.com), copy your
   **Account SID** and **Auth Token**.
3. Go to **Verify > Services** (https://console.twilio.com/us1/develop/verify/services)
   and create a new Verify Service. Copy its **Service SID** (starts with `VA`).
   Verify handles code generation, expiry, retries and rate limiting for you —
   no need to build that yourself.
4. Trial accounts can only send SMS to phone numbers you've verified in the
   console under **Phone Numbers > Verified Caller IDs**. Upgrade the account
   to send to any number.

## 2. Configure

```bash
cp .env.example .env
# then edit .env and paste your real SID / token / service SID
```

## 3. Install and run

```bash
npm install
npm start
```

The server starts on `http://localhost:3001` (or the `PORT` you set).

Check it's alive:

```bash
curl http://localhost:3001/health
```

## 4. Deploy it somewhere reachable from the internet

Options that work well for a small Node server: Render, Railway, Fly.io, a
plain VPS with PM2, or a serverless function platform adapted to Express
(e.g. Vercel with a small wrapper). Whatever you choose, note the public
HTTPS URL it gives you.

## 5. Point the frontend at it

In `GlobalTradeHub.jsx`, near the top of the file, set:

```js
const API_BASE_URL = "https://your-deployed-backend.example.com";
```

Leave it as an empty string `""` to keep the frontend in local demo mode
(no real SMS, the code is shown in an on-screen notification instead).

## Endpoints

### `POST /api/send-code`
Body: `{ "phone": "+37411234567" }`
Sends an SMS with a one-time code to that number.

### `POST /api/verify-code`
Body: `{ "phone": "+37411234567", "code": "1234" }`
Response: `{ "verified": true }` or `{ "verified": false }`

## Security notes for production

- Add rate limiting (e.g. `express-rate-limit`) on `/api/send-code` to stop
  abuse that could run up your Twilio bill.
- Validate phone number format (e.g. with `libphonenumber-js`) before calling
  Twilio.
- Restrict CORS (`cors()` is wide open here for convenience) to your actual
  frontend domain.
- Put this behind HTTPS in production (most hosting platforms do this for
  you automatically).
