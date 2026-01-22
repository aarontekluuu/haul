# Roadmap: Haul

## Overview

Haul delivers a complete thrift store discovery platform in 12 phases over 72 hours. Foundation phases (1-3) establish database, authentication, and smart contracts. The critical path phases (4-6) build the AI onboarding pipeline that processes store uploads in <2 minutes. Buyer experience phases (7-8) enable swipe discovery and crypto checkout. Fulfillment phases (9-10) close the loop with pickup confirmation and store management. Polish phases (11-12) ensure PWA functionality and demo readiness with end-to-end flow validation.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Project Setup & Core Infrastructure** - Database schema, API foundation, hosting
- [ ] **Phase 2: Authentication & Wallet Integration** - Privy SDK, embedded wallets, user onboarding
- [ ] **Phase 3: Smart Contract Deployment** - HaulEscrow contract on Base L2
- [ ] **Phase 4: Image Upload & Storage** - Cloudinary integration, batch upload flow
- [ ] **Phase 5: AI Processing Pipeline** - Background removal, GPT-4 Vision classification/description/pricing
- [ ] **Phase 6: Store Onboarding & Review Flow** - Upload to approval interface for stores
- [ ] **Phase 7: Buyer Discovery Interface** - Tinder-style swipe deck with smooth animations
- [ ] **Phase 8: Shopping Cart & Checkout** - Bag management, USDC payment via Privy
- [ ] **Phase 9: Pickup & Fulfillment** - Store dashboard, confirmation codes, escrow release
- [ ] **Phase 10: Store Dashboard & Management** - Revenue tracking, inventory management, sales feed
- [ ] **Phase 11: PWA Configuration & Polish** - Service worker, installability, mobile optimizations
- [ ] **Phase 12: Demo Data & End-to-End Testing** - Mock inventory, complete flow validation

## Phase Details

### Phase 1: Project Setup & Core Infrastructure
**Goal**: Foundation is ready for feature development
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02, INFRA-06, INFRA-08, INFRA-09
**Success Criteria** (what must be TRUE):
  1. Supabase database exists with tables for stores, items, users, transactions
  2. Express.js API server runs locally with basic health check endpoint
  3. React frontend renders with TailwindCSS styling
  4. Cloudinary account configured with upload credentials
  5. Environment variables documented and template exists
**Plans**: TBD

Plans:
- [ ] TBD (plans created during planning phase)

### Phase 2: Authentication & Wallet Integration
**Goal**: Users can sign up and receive embedded wallets
**Depends on**: Phase 1
**Requirements**: AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, AUTH-06, INFRA-03
**Success Criteria** (what must be TRUE):
  1. Store owner can sign up with Google/Apple via Privy and receive embedded wallet
  2. Store owner can enter business details (name, address, hours)
  3. Buyer can sign up with Google/Apple/Email via Privy and receive embedded wallet
  4. Buyer can complete preference quiz with categories, vibes, distance, price range
  5. User authentication persists across browser sessions
**Plans**: TBD

Plans:
- [ ] TBD (plans created during planning phase)

### Phase 3: Smart Contract Deployment
**Goal**: Escrow contract is live on Base L2 and ready for transactions
**Depends on**: Phase 2
**Requirements**: INFRA-07
**Success Criteria** (what must be TRUE):
  1. HaulEscrow Solidity contract compiles without errors
  2. Contract deployed to Base L2 testnet with verified address
  3. Contract can receive USDC deposits via test transaction
  4. Contract can release funds to store wallet (70%) and platform wallet (30%)
  5. Contract address and ABI available to frontend
**Plans**: TBD

Plans:
- [ ] TBD (plans created during planning phase)

### Phase 4: Image Upload & Storage
**Goal**: Stores can upload batch photos that persist in cloud storage
**Depends on**: Phase 1
**Requirements**: AI-01, AI-02
**Success Criteria** (what must be TRUE):
  1. Store can select up to 20 photos via camera or gallery on mobile device
  2. Photos upload to Cloudinary with progress indicators
  3. Each uploaded image receives unique tracking ID
  4. Uploaded images accessible via Cloudinary URLs
  5. Upload handles network errors gracefully with retry logic
**Plans**: TBD

Plans:
- [ ] TBD (plans created during planning phase)

### Phase 5: AI Processing Pipeline
**Goal**: Uploaded images are processed by AI in <30 seconds per item
**Depends on**: Phase 4
**Requirements**: AI-03, AI-04, AI-05, AI-06, AI-07, AI-08, INFRA-04, INFRA-05
**Success Criteria** (what must be TRUE):
  1. Background removed from product photos using Remove.bg or Cloudinary AI
  2. GPT-4 Vision classifies items into correct categories (tops/bottoms/shoes/outerwear/accessories)
  3. GPT-4 Vision assesses condition as excellent/good/fair based on image
  4. GPT-4 Vision generates Gen-Z friendly descriptions under 50 words
  5. System suggests prices based on category and condition lookup table
  6. Processing completes in under 30 seconds per item
**Plans**: TBD

Plans:
- [ ] TBD (plans created during planning phase)

### Phase 6: Store Onboarding & Review Flow
**Goal**: Stores can review AI-processed items and approve them for sale
**Depends on**: Phase 5
**Requirements**: AI-09, AI-10, AI-11, AI-12
**Success Criteria** (what must be TRUE):
  1. Store sees grid of processed items with AI-generated fields (photo, category, condition, description, price)
  2. Store can edit any field (price, description, category) before approval
  3. Store can approve all items with one-tap "Approve All" button
  4. Approved items marked as active and available in database
  5. Items go live immediately in buyer swipe deck after approval
**Plans**: TBD

Plans:
- [ ] TBD (plans created during planning phase)

### Phase 7: Buyer Discovery Interface
**Goal**: Buyers can swipe through items in smooth, engaging interface
**Depends on**: Phase 6
**Requirements**: DISC-01, DISC-02, DISC-03, DISC-04, DISC-05, DISC-06, DISC-07, DISC-08, INFRA-11, INFRA-12
**Success Criteria** (what must be TRUE):
  1. Buyer sees full-screen Tinder-style card stack with item photos
  2. Swipe right adds item to bag with visual feedback animation
  3. Swipe left skips item with visual feedback animation
  4. Swipe gestures run smoothly at 60fps using Framer Motion
  5. Tap card opens details modal showing description, condition, store info, pickup window
  6. Card displays item photo, price, store name, distance calculated from buyer location
  7. Floating bag icon shows current item count
  8. Swipe deck filters items based on preference quiz and geolocation
**Plans**: TBD

Plans:
- [ ] TBD (plans created during planning phase)

### Phase 8: Shopping Cart & Checkout
**Goal**: Buyers can purchase items with crypto payment
**Depends on**: Phase 7, Phase 3
**Requirements**: TXN-01, TXN-02, TXN-03, TXN-04, TXN-05, TXN-06, TXN-07, TXN-08, TXN-09, TXN-10
**Success Criteria** (what must be TRUE):
  1. Buyer can view bag with all swiped items
  2. Bag shows subtotal and breakdown by store
  3. Buyer can remove items from bag before checkout
  4. Buyer can checkout with USDC on Base L2 via Privy embedded wallet
  5. Privy handles gasless transaction without manual gas fee management
  6. Smart contract escrow holds payment until pickup confirmation
  7. Transaction completes in under 5 seconds
  8. Success screen shows 6-digit confirmation code
  9. Success screen displays store address, map (Mapbox), and pickup window
  10. Buyer can add pickup appointment to device calendar
**Plans**: TBD

Plans:
- [ ] TBD (plans created during planning phase)

### Phase 9: Pickup & Fulfillment
**Goal**: Stores can confirm pickups and release escrowed funds
**Depends on**: Phase 8
**Requirements**: PICK-01, PICK-02, PICK-03, PICK-04, PICK-05
**Success Criteria** (what must be TRUE):
  1. Store dashboard shows list of pending pickups with confirmation codes
  2. Store can verify confirmation code via manual entry or scan
  3. Store can mark items as picked up
  4. Pickup confirmation triggers escrow release (70% to store wallet, 30% to platform)
  5. Transaction marked as complete in database with timestamp
**Plans**: TBD

Plans:
- [ ] TBD (plans created during planning phase)

### Phase 10: Store Dashboard & Management
**Goal**: Stores can manage inventory and track business metrics
**Depends on**: Phase 9
**Requirements**: DASH-01, DASH-02, DASH-03, DASH-04, DASH-05
**Success Criteria** (what must be TRUE):
  1. Store sees total revenue with 70% cut auto-calculated
  2. Store sees list of pending pickups
  3. Store can view all active inventory items
  4. Store can edit or delete active items
  5. Store sees real-time sales feed showing recent purchases
**Plans**: TBD

Plans:
- [ ] TBD (plans created during planning phase)

### Phase 11: PWA Configuration & Polish
**Goal**: App is installable and works offline as Progressive Web App
**Depends on**: Phase 10
**Requirements**: INFRA-10
**Success Criteria** (what must be TRUE):
  1. PWA manifest configured with app name, icons, theme colors
  2. Service worker registered and caching static assets
  3. App installable on iOS and Android home screens
  4. Offline fallback page displays when network unavailable
  5. App icons display correctly on all devices
**Plans**: TBD

Plans:
- [ ] TBD (plans created during planning phase)

### Phase 12: Demo Data & End-to-End Testing
**Goal**: Complete demo flow validated with mock data
**Depends on**: Phase 11
**Requirements**: (Validation of all requirements)
**Success Criteria** (what must be TRUE):
  1. Mock store account exists with realistic business details
  2. Database seeded with 50+ diverse mock inventory items
  3. End-to-end flow works: store upload → AI process → buyer swipe → crypto checkout → pickup confirmation
  4. Demo completes in under 3 minutes from start to finish
  5. All critical path features work without errors on mobile device
**Plans**: TBD

Plans:
- [ ] TBD (plans created during planning phase)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11 → 12

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Project Setup & Core Infrastructure | 0/TBD | Not started | - |
| 2. Authentication & Wallet Integration | 0/TBD | Not started | - |
| 3. Smart Contract Deployment | 0/TBD | Not started | - |
| 4. Image Upload & Storage | 0/TBD | Not started | - |
| 5. AI Processing Pipeline | 0/TBD | Not started | - |
| 6. Store Onboarding & Review Flow | 0/TBD | Not started | - |
| 7. Buyer Discovery Interface | 0/TBD | Not started | - |
| 8. Shopping Cart & Checkout | 0/TBD | Not started | - |
| 9. Pickup & Fulfillment | 0/TBD | Not started | - |
| 10. Store Dashboard & Management | 0/TBD | Not started | - |
| 11. PWA Configuration & Polish | 0/TBD | Not started | - |
| 12. Demo Data & End-to-End Testing | 0/TBD | Not started | - |

---
*Roadmap created: 2026-01-22*
*Last updated: 2026-01-22*
