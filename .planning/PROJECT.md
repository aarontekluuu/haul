# Haul

## What This Is

Haul is a mobile PWA that connects thrift store inventory to Gen-Z buyers through a Tinder-like swipe discovery experience. Thrift stores upload item photos which are processed by AI (background removal, classification, pricing, description generation) in <2 minutes. Gen-Z users swipe through curated local inventory, purchase with crypto (USDC on Base L2 via Privy), and pick up same-week. Built for USC Social Impact Hackathon (Jan 23-27, 2026) as a solo project.

## Core Value

The AI onboarding flow must work flawlessly - a thrift store uploads 10 photos and gets professionally listed items in under 2 minutes with zero manual work. If this fails, the entire value proposition collapses.

## Requirements

### Validated

(None yet — ship to validate)

### Active

**Store Side - AI Onboarding (Critical Path)**
- [ ] Store can create account via Privy social login (Google/Apple)
- [ ] Store can upload batch photos (up to 20 at once) via camera/gallery
- [ ] AI processes each photo: background removal (Remove.bg or Cloudinary)
- [ ] AI classifies item category using GPT-4 Vision (tops, bottoms, shoes, outerwear, accessories)
- [ ] AI assesses condition (excellent, good, fair)
- [ ] AI generates product description (concise, Gen-Z friendly)
- [ ] AI suggests price based on category + condition lookup table
- [ ] Processing completes in <30 seconds per item
- [ ] Store reviews grid of processed items with editable prices/descriptions
- [ ] Store approves items with one-tap "Approve All" button
- [ ] Items go live immediately in buyer swipe deck

**Buyer Side - Discovery & Purchase**
- [ ] Buyer creates account via Privy social login
- [ ] Buyer completes onboarding quiz (categories, vibes, distance, price range)
- [ ] Buyer sees full-screen swipe deck with item cards (Tinder-style)
- [ ] Swipe right adds to bag, swipe left skips (with smooth animations via Framer Motion)
- [ ] Tap card shows details modal (description, condition, store, pickup window)
- [ ] Bag shows all matched items with subtotal
- [ ] Checkout with crypto (USDC on Base L2 via Privy embedded wallet)
- [ ] Success screen shows 6-digit confirmation code + store details + pickup window

**Transaction & Pickup**
- [ ] Smart contract escrow holds payment until pickup confirmation
- [ ] Store dashboard shows pending pickups with confirmation codes
- [ ] Store can verify code and mark item as picked up
- [ ] Pickup confirmation releases funds to store wallet (70%) and platform (30%)

**Core Infrastructure**
- [ ] Supabase database with tables: stores, items, users, transactions
- [ ] Express.js API with endpoints for store/buyer flows
- [ ] Privy SDK integration for embedded wallets + gasless transactions
- [ ] OpenAI GPT-4 Vision API integration for image analysis
- [ ] Remove.bg or Cloudinary background removal
- [ ] Cloudinary image hosting and transformations
- [ ] HaulEscrow Solidity contract deployed to Base L2
- [ ] React frontend with TailwindCSS styling
- [ ] PWA configuration (installable, offline-capable)

### Out of Scope

- Real thrift store partnerships — using mock data for demo, real partnerships post-hackathon
- Real user acquisition during hackathon — will demo with test accounts and showcase potential
- Mystery bundles (TGTG-style) — nice-to-have, defer if time-constrained
- Peer-to-peer swapping — Phase 2 post-hackathon feature
- In-app chat — Phase 2 feature
- Push notifications — Phase 2 feature
- Social sharing — Phase 2 feature
- Advanced pricing ML model — using simple lookup table for v1, ML post-hackathon
- Depop/Poshmark API scraping — too complex for hackathon timeline
- Multiple payment methods — crypto-only for demo (no Stripe fallback)
- Real-time inventory subscriptions — nice-to-have, not critical for demo
- Admin dashboard for store verification — manual approval for hackathon
- Pickup no-show handling with auto-refunds — simplified flow for demo

## Context

**Developer Experience:** New to development, solo build, learning as building. This requires aggressive scope management and heavy reliance on Claude for implementation guidance.

**Hackathon Timeline:** 72 hours (Jan 23-27, 2026). Building starts now to maximize dev time. Demo day is Monday Jan 27.

**Target Demo:** Live walkthrough showing: (1) Store uploads jacket photo → (2) AI processes in <30s → (3) Item appears in buyer swipe deck → (4) Buyer swipes right, checks out with crypto → (5) Confirmation screen with pickup code. Focus on technical execution and UX polish over user metrics.

**Social Impact Angle:** 11 million tons of textiles sent to landfills annually because thrift store inventory is invisible. Haul makes it discoverable. Each transaction diverts ~2 lbs from landfills. At scale: 1M lbs/year.

**North Star Metric:** Number of items rescued from landfill per month (long-term). For hackathon: AI processing speed (<2 minutes from upload to live).

**Key Technical Challenges:**
- First-time blockchain integration (Privy abstracts complexity but still learning curve)
- GPT-4 Vision prompt engineering for consistent JSON output
- Framer Motion swipe gestures (need buttery smooth 60fps)
- Image processing pipeline orchestration (upload → Remove.bg → GPT-4 → Cloudinary)
- Smart contract escrow logic (hold → release on confirmation)

**Existing Resources:**
- Comprehensive PRD with full technical specifications
- Database schema defined
- API endpoints mapped out
- Smart contract code provided (HaulEscrow.sol)
- UI/UX specifications detailed
- Environment variables documented

## Constraints

- **Timeline**: 72 hours from now until demo day (aggressive scope cuts required)
- **Solo Development**: No team to parallelize work (must prioritize ruthlessly)
- **Skill Level**: New to development (heavy learning curve on all technologies)
- **Budget**: Free tiers only (Supabase 500MB, Remove.bg 500 credits/month, Privy free tier, Vercel free)
- **Demo Data**: Using mock inventory, not real thrift stores (reduces external dependencies)
- **Tech Stack Fixed**: React + TypeScript, Node.js + Express, Supabase, Privy, Base L2, GPT-4 Vision (per PRD)
- **Platform**: Mobile PWA only (no native apps, no desktop optimization)
- **Payment**: Crypto-only via Privy (no Stripe fallback to reduce complexity)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Crypto-only payments (no Stripe fallback) | Privy SDK abstracts complexity, crypto is demo wow-factor for hackathon | — Pending |
| Mock data instead of real stores | Removes dependency on external store acquisition, full control over demo | — Pending |
| All AI features critical (no cuts) | AI onboarding is core value prop, can't compromise on classification, description, pricing | — Pending |
| Solo build with Claude | No team available, Claude provides expert guidance for new developer | — Pending |
| Start building now (pre-hackathon) | Maximize dev time, 72 hours is tight for this scope | — Pending |
| Simple category-based pricing | ML model too complex for timeline, lookup table sufficient for demo | — Pending |
| Base L2 for blockchain | Low fees, fast finality, Privy has good Base support | — Pending |

---
*Last updated: 2026-01-21 after initialization*
