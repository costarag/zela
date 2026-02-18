# Zela
> The trusted marketplace for elderly home care in Brazil

[![Live](https://img.shields.io/badge/Live-zela--ashen.vercel.app-black?style=flat-square)](https://zela-ashen.vercel.app/) ![Next.js](https://img.shields.io/badge/Next.js_16-black?style=flat-square&logo=next.js) ![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)

![Zela screenshot](https://api.microlink.io/?url=https%3A%2F%2Fzela-ashen.vercel.app%2F&screenshot=true&meta=false&embed=screenshot.url)

**→ Live at [zela-ashen.vercel.app](https://zela-ashen.vercel.app/)**

---

## The Problem

Families in Brazil searching for elder caregivers face a fragmented, slow, and unsafe process. There's no reliable platform: finding a trustworthy caregiver means relying on informal referrals, with no transparency on background, pricing, or quality. Brazil has 32M+ elderly today — growing to 70M by 2050 — and a R$12B+ home care market with no digital reference.

## The Solution

Zela is a premium marketplace that transforms a stressful search into a safe, guided decision. Families get verified caregiver profiles, smart need-based matching, in-app communication, and AI-assisted care tracking. The core insight: trust is the product — everything in Zela is designed to reduce risk at every step of the hiring and care journey.

## Key Features

- **Verified caregiver profiles** with experience, availability, and ratings
- **Need-based matching** filtered by specialty, schedule, and budget
- **In-app messaging** and interview scheduling
- **AI care assistant** for day-to-day guidance (pt-BR)
- **Care progress tracking** — mood, mobility, medication, sleep indicators
- **Smart onboarding** that collects routine, needs, and budget to power recommendations

## Business Model

Hybrid model — recurring subscription + success fee:

| Segment | Model | Price |
|---------|-------|-------|
| Families (Plus) | Monthly subscription | R$149/mo |
| Families (Premium) | Subscription + concierge | R$249/mo |
| Families (Família Plus) | Multi-elderly | R$349/mo |
| Success fee (basic caregiver) | Per confirmed hire | R$299 |
| Success fee (specialized) | Per confirmed hire | R$590 |
| Success fee (live-in) | Per confirmed hire | R$1.290 |
| Caregiver Pro Plan | Profile boost + analytics | TBD |

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| AI | OpenAI `gpt-4.1-mini` |
| Language | TypeScript |
| Runtime | Bun |
| Styling | Tailwind CSS 4 |
| Charts | Recharts |
| Icons | Lucide React |
| Hosting | Vercel |

## Running Locally

```bash
bun install
cp .env.example .env.local  # add your OPENAI_API_KEY
bun dev
```

Open `http://localhost:3000`.

---

*Bootstrapped with AI coding assistants in hours, not weeks.*
