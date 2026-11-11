# ReplaceableScore™ by PolicyPal AI

A satirical "Human Obsolescence Assessment™": a seven-question quiz that calculates how replaceable you are by AI, dramatizes the "analysis," and then upsells you an insurance plan to match your score (up to the **God Help You** tier).

PolicyPal AI is not a real insurance company. No coverage is issued. This is satire.

## Deployment

This site is deployed on **[Vercel](https://vercel.com)**.

- Vercel is connected to this GitHub repo through the Vercel GitHub App.
- Every push to `main` triggers a production deploy.
- Pull requests and other branches get their own preview deployments.
- There's no build step: Vercel serves `index.html`, `style.css`, and `app.js` as static files.

## Project structure

| File         | What it does                                                      |
|--------------|-------------------------------------------------------------------|
| `index.html` | All seven screens (landing, quiz, spinners, score, plans, confirm) |
| `app.js`     | Questions, scoring, tiers, and screen transitions                 |
| `style.css`  | Styling                                                           |

## Running locally

No dependencies. Open `index.html` in a browser, or serve the folder:

```sh
npx serve .
```
