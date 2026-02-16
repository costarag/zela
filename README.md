# Zela

Zela is a responsive single-page experience (built with Next.js App Router) to help families in Brazil find elder caregivers with confidence.

The product flow is:

- Landing page (`/`)
- Onboarding wizard (`/onboarding`)
- Dashboard (`/dashboard`)

All UI copy is in pt-BR.

## Tech Stack

- Next.js 16 (App Router)
- React + TypeScript
- Tailwind CSS
- Lucide React
- Recharts
- OpenAI SDK (`openai`)

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env.local
```

3. Start dev server:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Environment Variables

Defined in `.env.example`:

- `OPENAI_API_KEY`: required for the AI assistant
- `OPENAI_MODEL`: optional model override (default: `gpt-4.1-mini`)

If `OPENAI_API_KEY` is missing, the app shows a graceful fallback message in the assistant widget.

## Scripts

- `npm run dev` - start local dev server
- `npm run lint` - run ESLint
- `npm run build` - create production build
- `npm run start` - run production server

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import the project in Vercel.
3. Set environment variables:
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL` (optional)
4. Deploy.

## Built with Coding Assistants

This project was bootstrapped quickly with coding assistants.

- Primary workflow: `opencode`
- Model used: `GPT-5.3` (`openai/gpt-5.3-codex`)
