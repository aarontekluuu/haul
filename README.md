# Haul

**Your local thrift, swiped right**

A mobile PWA that connects thrift store inventory to Gen-Z buyers through an addictive, location-based discovery experience powered by AI.

## Overview

**Problem:** 11 million tons of textiles are sent to landfills annually because thrift store inventory is invisible and discovery is slow.

**Solution:** Haul makes sustainable fashion accessible through:
- 🤖 AI-powered instant listing (stores upload photos → live in <2 minutes)
- 📱 Tinder-style swipe discovery (addictive, mobile-first UX)
- 💰 Crypto payments (USDC on Base L2, feels like Web2)
- 📍 Local pickup (discover nearby, pick up same-week)

## Hackathon

Built for **USC Social Impact Hackathon** (Jan 23-27, 2026)
- **Timeline:** 72 hours
- **Stack:** React, TypeScript, Node.js, Supabase, Privy, Base L2, GPT-4 Vision
- **Target:** Live demo with complete end-to-end flow

## Tech Stack

**Frontend:**
- React + TypeScript + Vite
- TailwindCSS
- Framer Motion (swipe gestures)
- Privy (embedded wallets)

**Backend:**
- Node.js + Express
- Supabase (PostgreSQL)
- OpenAI GPT-4 Vision
- Cloudinary (image CDN)
- Remove.bg (background removal)

**Blockchain:**
- Base L2 (Ethereum L2)
- USDC (stablecoin payments)
- HaulEscrow smart contract (Solidity)

**Infrastructure:**
- Vercel (hosting)
- GitHub (version control)

## Project Structure

```
.planning/          # GSD workflow planning
├── PROJECT.md      # Project context
├── REQUIREMENTS.md # 58 v1 requirements
├── ROADMAP.md      # 12-phase execution plan
├── STATE.md        # Project memory
└── config.json     # Workflow settings
```

## Development

**Prerequisites:**
- Node.js 20+
- Privy account
- Supabase project
- OpenAI API key
- Cloudinary account
- Remove.bg API key

**Environment:**
- Copy `backend/.env.example` → `backend/.env`
- Copy `frontend/.env.example` → `frontend/.env`
- Backend setup guide: `backend/SETUP.md`

**Next Steps:**
1. `/gsd:plan-phase 1` - Plan core infrastructure
2. `/gsd:execute-phase 1` - Build database + API foundation
3. Continue through 12 phases

## Phase 2 Quick Test (Auth + Wallet)

1. Set `VITE_PRIVY_APP_ID` in `frontend/.env` and `PRIVY_APP_ID` + `PRIVY_APP_SECRET` in `backend/.env`.
2. Start backend (`backend/`): `npm run dev`.
3. Start frontend (`frontend/`): `npm run dev`.
4. Visit `/buyer/auth`, log in via Privy, complete the buyer onboarding form.
5. Confirm a row appears in Supabase `users` with `preferences`.
6. Visit `/store/auth`, log in, fill store details, continue.
7. Confirm a row appears in Supabase `stores` with `wallet_address`, `name`, `address`.

## Social Impact

- Diverts textile waste from landfills
- Provides revenue stream for nonprofit thrift stores
- Makes sustainable fashion accessible to price-conscious Gen-Z
- Reduces fast fashion consumption

**North Star Metric:** Items rescued from landfill per month

## License

MIT

---

**Built with [Claude Code](https://claude.com/claude-code) + GSD workflow**
