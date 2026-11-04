# Halley beta signup

The GitHub Pages form sends only an email to `POST /signup` on this Worker.
Craft credentials stay in Worker secrets. Entries go to **Waitlist** in the
**Halley** document: Email (item title), Date Added (UTC), Status (`Requested`),
and Source (`omaredu.com / Halley`).

## Deploy

From this directory:

```sh
npm ci
npm test
npx wrangler deploy --dry-run
npx wrangler secret put CRAFT_API_URL
# Only if the Craft connection requires bearer authentication:
npx wrangler secret put CRAFT_API_TOKEN
npx wrangler deploy
```

Create the Craft API connection for the Halley document with **Get Collection
Items** and **Add Collection Items** enabled. Store the complete API base URL
(ending in `/api/v1`) as `CRAFT_API_URL`. Never use a `VITE_` variable for it.

Set the GitHub repository variable `VITE_HALLEY_WAITLIST_URL` to the deployed
Worker URL plus `/signup`. The existing Pages build injects this public endpoint.
The frontend and backend deploy independently; deploying the Worker does not
publish the site's local changes.

## Local development

Store local Craft settings in this directory's ignored `.dev.vars` file.
Run `npm run dev -- --var ALLOWED_ORIGINS:http://localhost:5173` and set
`VITE_HALLEY_WAITLIST_URL=http://localhost:8787/signup` in the root `.env.local`.

## Behavior

- Validates and normalizes email; rejects bodies above 1 KiB.
- Allows only configured browser origins and limits requests to 10/minute per IP
  per Cloudflare location. This is a basic abuse limit, not a bot challenge.
- Reads existing titles before inserting, returning the same success for repeat
  emails without changing their status. Concurrent requests can still race;
  Craft does not provide a unique constraint for email.
- Reads at most 2 MiB of collection data. If the list grows beyond that, requests
  fail safely until lookup storage is changed.
- Confirms a saved Craft item before returning success; timeouts and upstream
  errors produce a retryable error. Emails and Craft credentials are not logged.
- No confirmation email is sent automatically.
