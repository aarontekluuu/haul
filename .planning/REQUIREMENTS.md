# Requirements: Haul

**Defined:** 2026-01-21
**Core Value:** AI onboarding flow processes thrift store uploads (<2 minutes from photo to live listing)

## v1 Requirements

Requirements for hackathon demo (Jan 23-27, 2026). Each maps to roadmap phases.

### Authentication & Wallet

- [ ] **AUTH-01**: Store owner can sign up with Privy social login (Google/Apple)
- [ ] **AUTH-02**: Store owner receives embedded wallet automatically (gasless transactions)
- [ ] **AUTH-03**: Store owner can enter business details (name, address, hours)
- [ ] **AUTH-04**: Buyer can sign up with Privy social login (Google/Apple/Email)
- [ ] **AUTH-05**: Buyer receives embedded wallet automatically
- [ ] **AUTH-06**: Buyer can complete preference quiz (categories, vibes, distance, price range)

### AI Image Processing Pipeline

- [ ] **AI-01**: Store can upload batch photos (up to 20 images via camera/gallery)
- [ ] **AI-02**: System uploads images to Cloudinary and generates tracking IDs
- [ ] **AI-03**: System removes background from each image (Remove.bg or Cloudinary AI)
- [ ] **AI-04**: GPT-4 Vision classifies item category (tops/bottoms/shoes/outerwear/accessories)
- [ ] **AI-05**: GPT-4 Vision assesses condition (excellent/good/fair)
- [ ] **AI-06**: GPT-4 Vision generates product description (<50 words, Gen-Z friendly)
- [ ] **AI-07**: System suggests price based on category + condition lookup table
- [ ] **AI-08**: Processing completes in <30 seconds per item
- [ ] **AI-09**: Store sees grid of processed items with editable fields
- [ ] **AI-10**: Store can edit price, description, or category before approval
- [ ] **AI-11**: Store can approve all items with one-tap "Approve All" button
- [ ] **AI-12**: Approved items go live immediately in buyer swipe deck

### Discovery & Swipe Interface

- [ ] **DISC-01**: Buyer sees full-screen Tinder-style card stack
- [ ] **DISC-02**: Swipe right gesture adds item to bag with visual feedback
- [ ] **DISC-03**: Swipe left gesture skips item with visual feedback
- [ ] **DISC-04**: Swipe animations run at 60fps (Framer Motion)
- [ ] **DISC-05**: Tap card opens details modal (description, condition, store, pickup window)
- [ ] **DISC-06**: Swipe deck personalizes based on preference quiz + geolocation
- [ ] **DISC-07**: Floating bag icon shows item count
- [ ] **DISC-08**: Card displays item photo, price, store name, distance

### Transaction & Checkout

- [ ] **TXN-01**: Buyer can view bag with all matched items
- [ ] **TXN-02**: Bag shows subtotal and breakdown by store
- [ ] **TXN-03**: Buyer can remove items from bag
- [ ] **TXN-04**: Buyer can checkout with USDC on Base L2 via Privy
- [ ] **TXN-05**: Privy handles gasless transaction (embedded wallet)
- [ ] **TXN-06**: Smart contract escrow holds payment until pickup confirmation
- [ ] **TXN-07**: Transaction completes in <5 seconds
- [ ] **TXN-08**: Success screen shows 6-digit confirmation code
- [ ] **TXN-09**: Success screen shows store address, map, pickup window
- [ ] **TXN-10**: Buyer can add pickup to calendar

### Pickup & Fulfillment

- [ ] **PICK-01**: Store dashboard shows pending pickups with confirmation codes
- [ ] **PICK-02**: Store can verify confirmation code (scan or manual entry)
- [ ] **PICK-03**: Store can mark items as picked up
- [ ] **PICK-04**: Pickup confirmation releases escrow (70% to store, 30% platform)
- [ ] **PICK-05**: Transaction marked as complete in database

### Store Dashboard

- [ ] **DASH-01**: Store sees total revenue (70% cut auto-calculated)
- [ ] **DASH-02**: Store sees pending pickups list
- [ ] **DASH-03**: Store can view active inventory items
- [ ] **DASH-04**: Store can edit or delete active items
- [ ] **DASH-05**: Store sees real-time sales feed

### Core Infrastructure

- [ ] **INFRA-01**: Supabase database with tables (stores, items, users, transactions)
- [ ] **INFRA-02**: Express.js API with routes for store/buyer flows
- [ ] **INFRA-03**: Privy SDK integration for wallet creation and authentication
- [ ] **INFRA-04**: OpenAI GPT-4 Vision API integration
- [ ] **INFRA-05**: Remove.bg or Cloudinary AI background removal integration
- [ ] **INFRA-06**: Cloudinary image hosting and transformations
- [ ] **INFRA-07**: HaulEscrow Solidity contract deployed to Base L2
- [ ] **INFRA-08**: React frontend with TypeScript
- [ ] **INFRA-09**: TailwindCSS styling system
- [ ] **INFRA-10**: PWA configuration (installable, offline-capable, service worker)
- [ ] **INFRA-11**: Mapbox GL JS for store location display
- [ ] **INFRA-12**: Geospatial queries for distance-based filtering

## v2 Requirements

Deferred to post-hackathon. Tracked but not in current roadmap.

### Mystery Bundles (TGTG Model)

- **BNDL-01**: Store can select 3-5 items to create mystery bundle
- **BNDL-02**: Store can set bundle price (suggested 20% discount)
- **BNDL-03**: Bundle appears as single swipe card
- **BNDL-04**: Bundle purchase follows same checkout flow

### Notifications

- **NOTIF-01**: Buyer receives push notification for pickup reminders
- **NOTIF-02**: Store receives push notification for new sales
- **NOTIF-03**: Buyer can configure notification preferences

### Social Features

- **SOC-01**: Buyer can share haul to Instagram from success screen
- **SOC-02**: Buyer can share app referral link
- **SOC-03**: Swipe up gesture shares item to friends

### Analytics & Insights

- **ANLYT-01**: Store sees conversion rate (purchases / views)
- **ANLYT-02**: Store sees item view counts
- **ANLYT-03**: Swipe behavior tracked for algorithm improvement
- **ANLYT-04**: Platform tracks items rescued from landfill

### Advanced Features

- **ADV-01**: Auto-refund for no-show pickups (80% refund, 20% restocking fee)
- **ADV-02**: Real-time inventory subscriptions (sold items disappear immediately)
- **ADV-03**: Advanced pricing ML model (Depop/Poshmark scraping)
- **ADV-04**: Yelp API auto-verification for stores
- **ADV-05**: Multi-store checkout (one transaction, multiple pickup locations)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Real store partnerships during hackathon | Too risky - using mock data for demo, partnerships post-hackathon |
| Demo credits ($5 bonus) | Not needed for demo flow, adds complexity |
| Stripe payment fallback | Crypto-only simplifies scope, Privy handles UX |
| Native mobile apps | PWA sufficient for hackathon, native later |
| Shipping integration | Local pickup only (core differentiator) |
| Peer-to-peer trading | Store-to-buyer only for v1, P2P is Phase 2 vision |
| In-app chat | Not needed for simple pickup flow |
| User reviews/ratings | Post-transaction feedback deferred |
| Multi-language support | English only for USC demo |
| Admin dashboard | Manual approval sufficient for hackathon |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 | Phase 2 | Pending |
| AUTH-02 | Phase 2 | Pending |
| AUTH-03 | Phase 2 | Pending |
| AUTH-04 | Phase 2 | Pending |
| AUTH-05 | Phase 2 | Pending |
| AUTH-06 | Phase 2 | Pending |
| AI-01 | Phase 4 | Pending |
| AI-02 | Phase 4 | Pending |
| AI-03 | Phase 5 | Pending |
| AI-04 | Phase 5 | Pending |
| AI-05 | Phase 5 | Pending |
| AI-06 | Phase 5 | Pending |
| AI-07 | Phase 5 | Pending |
| AI-08 | Phase 5 | Pending |
| AI-09 | Phase 6 | Pending |
| AI-10 | Phase 6 | Pending |
| AI-11 | Phase 6 | Pending |
| AI-12 | Phase 6 | Pending |
| DISC-01 | Phase 7 | Pending |
| DISC-02 | Phase 7 | Pending |
| DISC-03 | Phase 7 | Pending |
| DISC-04 | Phase 7 | Pending |
| DISC-05 | Phase 7 | Pending |
| DISC-06 | Phase 7 | Pending |
| DISC-07 | Phase 7 | Pending |
| DISC-08 | Phase 7 | Pending |
| TXN-01 | Phase 8 | Pending |
| TXN-02 | Phase 8 | Pending |
| TXN-03 | Phase 8 | Pending |
| TXN-04 | Phase 8 | Pending |
| TXN-05 | Phase 8 | Pending |
| TXN-06 | Phase 8 | Pending |
| TXN-07 | Phase 8 | Pending |
| TXN-08 | Phase 8 | Pending |
| TXN-09 | Phase 8 | Pending |
| TXN-10 | Phase 8 | Pending |
| PICK-01 | Phase 9 | Pending |
| PICK-02 | Phase 9 | Pending |
| PICK-03 | Phase 9 | Pending |
| PICK-04 | Phase 9 | Pending |
| PICK-05 | Phase 9 | Pending |
| DASH-01 | Phase 10 | Pending |
| DASH-02 | Phase 10 | Pending |
| DASH-03 | Phase 10 | Pending |
| DASH-04 | Phase 10 | Pending |
| DASH-05 | Phase 10 | Pending |
| INFRA-01 | Phase 1 | Pending |
| INFRA-02 | Phase 1 | Pending |
| INFRA-03 | Phase 2 | Pending |
| INFRA-04 | Phase 5 | Pending |
| INFRA-05 | Phase 5 | Pending |
| INFRA-06 | Phase 1 | Pending |
| INFRA-07 | Phase 3 | Pending |
| INFRA-08 | Phase 1 | Pending |
| INFRA-09 | Phase 1 | Pending |
| INFRA-10 | Phase 11 | Pending |
| INFRA-11 | Phase 7 | Pending |
| INFRA-12 | Phase 7 | Pending |

**Coverage:**
- v1 requirements: 58 total
- Mapped to phases: 58 (100% coverage)
- Unmapped: 0

---
*Requirements defined: 2026-01-21*
*Last updated: 2026-01-22 after roadmap creation*
