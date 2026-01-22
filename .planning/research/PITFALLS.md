# Pitfalls Research

**Domain:** Thrift/Resale Mobile PWA with AI Processing and Crypto Payments
**Researched:** 2026-01-21
**Confidence:** HIGH

## Critical Pitfalls

These mistakes kill demos in hackathon/72-hour scenarios. Each can consume hours or make core flows non-functional.

---

### Pitfall 1: HTTP Deployment Breaks Privy Wallets Silently

**What goes wrong:**
Privy embedded wallets work perfectly on localhost but completely fail after deployment if the URL uses `http://` instead of `https://`. No errors, no warnings during development—just total failure in production.

**Why it happens:**
Developers test locally where browsers treat `localhost` as a secure context. WebCrypto API (required for Privy wallets) only works in secure contexts (`https://` or `localhost`). When deploying to HTTP, wallets silently stop working.

**How to avoid:**
- Verify deployment URL uses HTTPS before integrating Privy
- For Vercel/Netlify: HTTPS is automatic
- For custom domains: Set up SSL certificate BEFORE implementing wallet features
- Test on actual deployment URL (not localhost) before demo day

**Warning signs:**
- Wallet operations work locally but fail after deploy
- Browser console shows WebCrypto API errors
- "Secure context required" messages

**Phase to address:**
Phase 1 (Infrastructure Setup) - Verify HTTPS is configured before any wallet integration begins.

**Severity:** BLOCKER - Demo cannot proceed without working crypto payments

---

### Pitfall 2: GPT-4 Vision Rate Limits Hit After 10-20 Uploads

**What goes wrong:**
Free tier OpenAI accounts hit rate limits far faster than expected. GPT-4 Vision has 10,000 tokens per minute (TPM) limits on free tier, which means roughly 5-10 image classifications per minute. Demo with 20+ item uploads = instant rate limit errors.

**Why it happens:**
- Each image classification uses ~1,500-2,500 tokens (image + prompt + response)
- Free tier: 10,000 TPM = 4-6 requests per minute max
- Solo developer testing + judges trying demo = easy to hit limits
- Rate limits are IP-based, so multiple testers from same network compound the issue

**How to avoid:**
- Budget for Tier 1 OpenAI account ($5-20) which provides 150,000 TPM (30x increase)
- Implement request queuing with exponential backoff
- Cache AI results aggressively (same item shouldn't be classified twice)
- Add "AI processing, please wait..." UI to slow user input
- Test with realistic upload volume (20+ items) BEFORE demo day

**Warning signs:**
- HTTP 429 errors from OpenAI API
- "Rate limit exceeded" messages
- Processing works for first few items, then fails

**Phase to address:**
Phase 2 (AI Pipeline) - Implement rate limit handling, queueing, and caching as core features, not afterthoughts.

**Severity:** BLOCKER - Core flow (upload → classify → display) breaks after a few uses

---

### Pitfall 3: Swipe Gestures Feel Janky on Real Mobile Devices

**What goes wrong:**
Swipeable card interfaces work smoothly on desktop Chrome DevTools but feel laggy, unresponsive, or janky on actual iOS/Android devices. Cards stutter during drag, animations drop frames, touches don't register.

**Why it happens:**
- JavaScript-based gesture handling runs on main thread, not UI thread
- Re-renders triggered on every touch move event cause performance bottlenecks
- React state updates during drag = 2x slower rendering on mobile
- Desktop testing doesn't reveal mobile CPU/GPU constraints

**How to avoid:**
- Use `react-native-gesture-handler` (runs on native UI thread) instead of vanilla touch events
- For web PWA, use CSS transforms (not position changes) for card movement
- Minimize state updates during active gestures—batch at gesture end
- Test on actual devices (iPhone 12/13, mid-range Android) not just DevTools
- Use `will-change: transform` CSS property for performance hints

**Warning signs:**
- Cards lag behind finger movement
- Animations stutter or drop frames
- DevTools performance timeline shows long JavaScript tasks during gestures
- Works on desktop, fails on mobile

**Phase to address:**
Phase 3 (Swipe Discovery) - Build with performance-first approach from day one. Cannot retrofit smooth gestures after architecture is set.

**Severity:** CRITICAL - Poor UX makes app feel broken even if functionality works

---

### Pitfall 4: React useEffect Infinite Loop During AI Processing

**What goes wrong:**
AI processing triggers useEffect that updates state, which triggers useEffect again, creating infinite loop. App freezes, API gets hammered with duplicate requests, burns through rate limits instantly.

**Why it happens:**
Common pattern: `useEffect` with object/function dependency that updates state listed in dependencies:

```javascript
// WRONG - causes infinite loop
useEffect(() => {
  if (uploadedImage) {
    classifyImage(uploadedImage).then(result => {
      setClassification(result);  // triggers re-render
    });
  }
}, [uploadedImage, classification]);  // classification change triggers effect
```

**How to avoid:**
- Use functional state updates: `setCount(c => c + 1)` to avoid including state in dependencies
- Memoize objects with `useMemo`, functions with `useCallback`
- For API calls, use dependency array carefully—typically include only inputs, not outputs
- Add early returns/guards: `if (classification) return;`

**Warning signs:**
- Browser tab freezes or becomes unresponsive
- Same API request fires hundreds of times per second
- React DevTools shows rapidly incrementing render count
- Console error: "Maximum update depth exceeded"

**Phase to address:**
Phase 2 (AI Pipeline) - Implement API integration with correct dependency management from start.

**Severity:** BLOCKER - Can exhaust API rate limits in seconds, crash browser tab

---

### Pitfall 5: iOS PWA Storage Quota Exceeded on Upload

**What goes wrong:**
After uploading 3-5 high-res iPhone photos, PWA shows "Not enough storage" error on iOS. Images fail to save, app becomes unusable.

**Why it happens:**
- iOS Safari PWA storage limit: 50MB total (IndexedDB + Cache Storage + LocalStorage combined)
- Modern iPhone photos: 3-8MB each (HEIC compressed) or 10-15MB (uncompressed)
- Storing originals + thumbnails + metadata = quota exceeded after 5-7 items
- iOS doesn't show "request more storage" prompt like Android/desktop

**How to avoid:**
- Compress/resize images client-side BEFORE storing (target 200-500KB per image)
- Use WebP format (60-80% smaller than JPEG)
- Store only compressed versions, not originals
- Implement storage quota monitoring: `navigator.storage.estimate()`
- Show "storage nearly full" warning at 80% usage

**Warning signs:**
- QuotaExceededError on iOS Safari
- Images fail to upload after app has been used several times
- Works on Android, fails on iOS
- Works in desktop browser, fails on iPhone

**Phase to address:**
Phase 1 (Infrastructure) - Build image compression pipeline before upload feature. Cannot add compression after storage architecture is set.

**Severity:** BLOCKER - App becomes unusable after a few uploads on iOS (50% of mobile users)

---

### Pitfall 6: Testnet Transactions Work, Mainnet Transactions Fail

**What goes wrong:**
Demo works perfectly on Base Sepolia testnet during development. Switch to mainnet for demo day—transactions time out, fail silently, or show "insufficient funds for gas" despite wallet having ETH.

**Why it happens:**
- Testnet gas prices: near-zero or heavily subsidized
- Mainnet gas prices: volatile, can spike 10-100x during network congestion
- Testnet transactions: relaxed validation, more forgiving
- Mainnet transactions: strict validation, higher failure rate
- Testnet "works on first try" doesn't test error handling

**How to avoid:**
- Test on mainnet with small amounts BEFORE demo day
- Implement gas estimation with 20-30% buffer: `estimateGas() * 1.3`
- Handle transaction errors gracefully (timeout, reverted, insufficient gas)
- Monitor Base mainnet gas prices, have contingency for spikes
- Keep extra ETH in deployer wallet for gas—assume 2-3x expected usage

**Warning signs:**
- Transactions pending indefinitely on mainnet
- "Transaction underpriced" errors
- Works on testnet, hangs on mainnet
- Gas estimation errors

**Phase to address:**
Phase 4 (Crypto Payments) - Test mainnet transactions early. Budget for mainnet testing funds ($50-100 ETH equivalent).

**Severity:** BLOCKER - Demo looks broken if transactions don't complete

---

### Pitfall 7: AI Classification Produces Hilariously Wrong Results

**What goes wrong:**
GPT-4 Vision confidently categorizes vintage Levi's jeans as "electronics," basketball shoes as "home décor," or band t-shirt as "kitchen appliance." Confidence scores look high (0.85+) but results are nonsensical.

**Why it happens:**
- GPT-4 Vision isn't fine-tuned for clothing classification
- Poor quality images (blurry, bad lighting, odd angles) confuse model
- Generic prompts produce generic (wrong) results
- Model hallucinates categories not even in your taxonomy
- No validation that output category exists in your schema

**How to avoid:**
- Use structured prompts with explicit category list:
  ```
  Classify this clothing item into EXACTLY ONE of these categories:
  - Men's Tops
  - Women's Tops
  - Men's Bottoms
  - Women's Bottoms
  - Shoes
  - Accessories

  Respond with ONLY the category name, nothing else.
  ```
- Set minimum confidence threshold (0.70-0.80)
- Add manual review queue for low-confidence classifications
- Show "AI suggested: [X]" with manual override option
- Validate API response matches your category schema before saving

**Warning signs:**
- Reviewers laugh at classification results
- Many items in wrong categories
- High confidence scores on obviously wrong results
- Categories that don't exist in your app

**Phase to address:**
Phase 2 (AI Pipeline) - Build validation and confidence filtering into AI integration from start.

**Severity:** CRITICAL - Wrong classifications make app look like joke, users won't trust system

---

### Pitfall 8: PWA Installation Prompt Never Shows on iOS

**What goes wrong:**
PWA works great in browser, but judges/users can't install it on iOS. No "Add to Home Screen" prompt appears. Demo requires explaining "open in Safari, tap share, scroll down, tap Add to Home Screen"—kills momentum.

**Why it happens:**
- iOS Safari has NO automatic install prompt (unlike Android Chrome)
- PWAs only work in Safari on iOS—Chrome/Firefox on iOS can't install PWAs
- Users opening link from Instagram/Twitter/Facebook in-app browser can't install
- Apple requires manual 4-step process: Share button → scroll → Add to Home Screen

**How to avoid:**
- Accept that iOS PWA installation requires manual steps—can't fix this
- Show iOS-specific installation instructions with screenshots
- Detect non-Safari iOS browsers, show "Open in Safari" message
- Make PWA work well IN BROWSER on iOS as fallback (don't require installation)
- Focus demo on Android devices if PWA installation is critical feature

**Warning signs:**
- Users ask "how do I install this?"
- Demo attendees can't find install option
- Opening link in social media app browser
- Using Chrome on iPhone

**Phase to address:**
Phase 5 (PWA Features) - Design onboarding flow that works whether installed or not. Don't gate features behind installation on iOS.

**Severity:** HIGH - Doesn't break functionality but creates friction during demos

---

### Pitfall 9: Empty Marketplace (Cold Start Problem) Makes Demo Pointless

**What goes wrong:**
Demo day arrives, marketplace has 3 test items uploaded by developer. Judge swipes through 3 items in 10 seconds, asks "is that it?" Demo falls flat because there's nothing to browse/discover.

**Why it happens:**
- Two-sided marketplace needs supply AND demand
- Solo hackathon = no time to recruit real users/sellers
- Seeding data manually is time-consuming, forgotten until last minute
- Without inventory, swipe discovery feels empty and pointless

**How to avoid:**
- Build seed data script in Phase 1—run it as part of deployment
- Scrape/generate 50-100 realistic items (images + descriptions + prices)
- Use real product photos from Creative Commons sources (Unsplash, Pexels)
- Let GPT-4 Vision generate realistic descriptions for seed data
- Seed data should be DIVERSE (sizes, styles, prices) not repetitive
- Include items at multiple price points for variety

**Warning signs:**
- "Item count: 3" in database
- All test items uploaded by you
- Swipe session ends in < 30 seconds
- Judge feedback: "there's not much here"

**Phase to address:**
Phase 1 (Infrastructure) - Build seeding script early. Run it as last step before every demo.

**Severity:** CRITICAL - Empty marketplace makes demo uncompelling even if tech works

---

### Pitfall 10: Crypto Onboarding Confuses Non-Crypto Users

**What goes wrong:**
Judge/user tries to checkout, faces wall of crypto jargon: "Create wallet," "Seed phrase," "Approve transaction," "Gas fee: 0.0023 ETH ($4.87)." User abandons checkout, says "too complicated."

**Why it happens:**
- Privy/embedded wallets still expose crypto concepts to users
- Gas fees are unexpected cost (not included in item price)
- Transaction approval UI uses technical language
- First-time crypto users don't understand wallets, gas, confirmation times

**How to avoid:**
- Use Privy's email/social login—hide "wallet creation" entirely
- Show gas fees in USD, not ETH: "Transaction fee: $3.50" not "0.0023 ETH"
- Implement gas sponsorship (paymaster) if budget allows—absorb gas costs
- Simplify transaction flow: "Confirm Purchase" not "Sign Transaction"
- Add explainer tooltips for crypto concepts ("What's a transaction fee?")
- Show progress during transaction: "Processing payment... (~30 seconds)"

**Warning signs:**
- Users abandon at checkout step
- Questions about "what's a wallet?"
- Confusion over gas fees
- "This seems complicated" feedback

**Phase to address:**
Phase 4 (Crypto Payments) - Design UX that abstracts crypto complexity. Test with non-crypto users BEFORE demo.

**Severity:** HIGH - Doesn't break tech but creates UX barrier that loses users

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create problems in tight timelines.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Skip image compression, store originals | Faster to implement | Exceeds iOS storage quota after 5 uploads | Never—compression is non-negotiable on mobile |
| Use inline touch handlers instead of gesture library | Simpler code | Janky performance on real devices | Never for production; maybe for quick prototype |
| Skip rate limit handling in API calls | Works during solo testing | Demo breaks when multiple people use it | Never—implement exponential backoff from start |
| Test only on testnet, skip mainnet testing | Free, faster testing | Mainnet transaction failures during demo | Never—mainnet test is mandatory before demo |
| Skip seed data, manually upload test items | Less upfront work | Demo feels empty, unimpressive | Never—seed data script should be Phase 1 deliverable |
| Store AI results in component state, not cache | Easier to implement | Same item classified multiple times, burns rate limits | Acceptable for MVP; migrate to cache before demo |
| Use default Privy UI text | Zero configuration | Confusing crypto jargon for non-crypto users | Acceptable for hackathon; customize before launch |

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| OpenAI API | Not handling 429 rate limit errors | Implement exponential backoff with retry (3 attempts, 1s/2s/4s delays) |
| Privy Wallets | Testing only on localhost, deploying to HTTP | Verify HTTPS deployment before wallet integration |
| Base L2 | Assuming testnet behavior matches mainnet | Test on mainnet with real funds before demo day |
| PWA Installation | Expecting iOS auto-prompt like Android | Design app to work in-browser on iOS, installation optional |
| Image Upload | Storing full-resolution images on iOS | Compress to 200-500KB before storage, use WebP format |
| GPT-4 Vision | Trusting raw API output without validation | Validate category exists in schema, set confidence threshold |
| Embedded Wallets | Not explaining gas fees to users | Show fees in USD, add explanatory tooltips |

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Storing uncompressed images in PWA storage | App works for 1-2 items, then quota errors | Compress images to <500KB before storage | 5-7 uploads on iOS (50MB limit) |
| JavaScript gesture handlers in React | Works in DevTools, janky on device | Use CSS transforms + gesture library (react-native-gesture-handler) | First test on real mobile device |
| No rate limit handling on AI API | Works during solo testing | Implement request queue + exponential backoff | 10-20 API calls (free tier limit) |
| Loading all items at once in swipe view | Works with 10 test items | Implement pagination/lazy loading | 50+ items (memory issues) |
| Inline API calls in useEffect without guards | Works on first render | Add early returns, memoize dependencies | Immediate (infinite loop) |
| Not monitoring PWA storage quota | Works until it doesn't | Check `navigator.storage.estimate()`, show warnings | Varies by device (iOS: 50MB, Android: ~500MB) |

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Exposing OpenAI API key in client-side code | API key theft, unlimited usage on your account | Never expose keys—proxy through backend API |
| Not validating AI-generated categories | Injection attacks via crafted prompts | Validate output against whitelist of allowed categories |
| Storing private keys in localStorage | Wallet compromise if XSS vulnerability | Use Privy embedded wallets (keys stored encrypted) |
| Allowing unlimited uploads per user | Storage abuse, quota exhaustion | Rate limit uploads (e.g., 10/day), monitor storage usage |
| Not sanitizing AI-generated descriptions | XSS via malicious description content | Sanitize all AI output before rendering (use DOMPurify) |
| Hardcoding wallet addresses in code | Address spoofing if code is public | Load addresses from environment variables |

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| No loading state during AI processing | User thinks app froze, refreshes page (wasting API call) | Show "Analyzing image... ~15 seconds" with progress indicator |
| Hiding gas fees until checkout | Sticker shock, cart abandonment | Show "Total with fees: $X" on item page |
| Requiring PWA installation on iOS | User can't figure out how, abandons app | Make app fully functional in-browser, installation optional |
| Technical error messages ("QuotaExceededError") | User doesn't understand, blames app | Friendly messages: "Storage full. Please delete some items." |
| No empty state in swipe view | After swiping all items, blank screen—broken? | Show "You've seen everything! Check back later" |
| Asking for wallet creation upfront | Friction before user sees value | Let users browse first, require wallet only at checkout |
| Not explaining why crypto is used | "Why can't I use a credit card?" frustration | Add value prop: "Instant settlement, no middleman fees" |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **AI Classification:** Often missing validation that output category exists in schema—verify output against whitelist
- [ ] **Crypto Payments:** Often missing gas fee display in USD—verify fees shown in familiar currency
- [ ] **Swipe Gestures:** Often missing performance testing on real devices—verify on iPhone and Android, not just DevTools
- [ ] **PWA Storage:** Often missing quota monitoring—verify `navigator.storage.estimate()` check implemented
- [ ] **Privy Integration:** Often missing HTTPS on deployment—verify live URL uses HTTPS before demo
- [ ] **Rate Limit Handling:** Often missing exponential backoff—verify retry logic with 429 error test
- [ ] **Image Upload:** Often missing client-side compression—verify images compressed to <500KB before storage
- [ ] **Testnet vs Mainnet:** Often missing mainnet testing—verify at least 5 test transactions on mainnet
- [ ] **Seed Data:** Often missing or insufficient—verify 50+ diverse items in database before demo
- [ ] **Error Handling:** Often missing user-friendly messages—verify all error states have helpful text

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Hit OpenAI rate limits during demo | LOW | 1. Switch to Tier 1 account ($5 minimum) 2. Retry failed requests after 1 minute 3. Show cached results for previously classified items |
| HTTP deployment breaks Privy | MEDIUM | 1. Redeploy to Vercel/Netlify (auto-HTTPS) OR 2. Add SSL certificate to custom domain 3. Update Privy dashboard with new HTTPS URL |
| iOS storage quota exceeded | MEDIUM | 1. Add image compression library (browser-image-compression) 2. Recompress existing images in IndexedDB 3. Clear old cached data |
| Janky swipe gestures | HIGH | 1. Replace touch handlers with react-spring or framer-motion 2. Use CSS transforms instead of position changes 3. Test on real device (cannot fix without device testing) |
| Empty marketplace at demo | LOW | 1. Run seed data script (prepare beforehand) 2. Use GPT-4 to generate item descriptions 3. Download 50 images from Unsplash/Pexels |
| Mainnet transactions failing | HIGH | 1. Increase gas estimation buffer to 50% 2. Add manual gas price override 3. Use Base gas price API for real-time pricing |
| useEffect infinite loop | MEDIUM | 1. Add early return: `if (alreadyProcessed) return;` 2. Remove state from dependency array 3. Use useCallback/useMemo for object/function deps |
| Confusing crypto UX | MEDIUM | 1. Add tooltips explaining crypto terms 2. Show gas fees in USD 3. Implement "Confirm Purchase" flow instead of "Sign Transaction" |
| Wrong AI classifications | LOW | 1. Add manual override UI 2. Implement confidence threshold (0.70+) 3. Improve prompt with explicit category list |
| No PWA install on iOS | LOW | 1. Add iOS-specific installation instructions 2. Make app work in-browser (don't require install) 3. Demo on Android if install is critical |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| HTTP deployment breaks Privy | Phase 1: Infrastructure Setup | Deploy to production URL, verify wallet creation works |
| iOS storage quota exceeded | Phase 1: Infrastructure Setup | Upload 10 images on iPhone, verify storage usage <10MB |
| Empty marketplace at demo | Phase 1: Infrastructure Setup | Run seed script, verify 50+ items in database |
| GPT-4 Vision rate limits | Phase 2: AI Processing | Upload 20 items in <2 minutes, verify queueing works |
| AI classification wrong results | Phase 2: AI Processing | Test 20 classifications, verify 90%+ accuracy |
| useEffect infinite loop | Phase 2: AI Processing | Monitor console for render count, verify <3 renders per action |
| Janky swipe gestures | Phase 3: Swipe Discovery | Test on iPhone + Android, verify smooth 60fps scrolling |
| Testnet vs mainnet failures | Phase 4: Crypto Payments | Complete 5 test purchases on mainnet, verify success |
| Confusing crypto UX | Phase 4: Crypto Payments | User test with non-crypto person, verify checkout completion |
| No PWA install on iOS | Phase 5: PWA Features | Test on iPhone Safari, verify app works in-browser |

## Phase-Specific Research Flags

Phases likely to need deeper investigation during implementation.

| Phase | Likely Issues | When to Research |
|-------|---------------|------------------|
| Phase 1: Infrastructure | HTTPS setup on custom domains, PWA manifest configuration | If using custom domain (not Vercel/Netlify) |
| Phase 2: AI Processing | Prompt engineering for classification accuracy, structured output | When classification accuracy <80% |
| Phase 3: Swipe Discovery | Advanced gesture handling (multi-touch, velocity), animation performance | If gestures feel laggy on device testing |
| Phase 4: Crypto Payments | Gas price estimation strategies, transaction monitoring | When transactions fail on mainnet |
| Phase 5: PWA Features | iOS-specific caching strategies, offline functionality | If targeting offline-first experience |

## Sources

**GPT-4 Vision:**
- [Hitting rate limit on gpt-4-vision-preview with first query - OpenAI Developer Community](https://community.openai.com/t/hitting-rate-limit-on-gpt-4-vision-preview-with-first-query/479464)
- [Gpt-4-vision rate limited at 10k TPM and not 150k TPM - OpenAI Developer Community](https://community.openai.com/t/gpt-4-vision-rate-limited-at-10k-tpm-and-not-150k-tpm/505725/)
- [As OpenAI's multimodal API launches broadly, research shows it's still flawed | TechCrunch](https://techcrunch.com/2023/11/06/openai-gpt-4-with-vision-release-research-flaws/)

**Privy Wallets:**
- [Troubleshooting embedded wallets | Privy Docs](https://docs.privy.io/guide/react/troubleshooting/embedded-wallets)
- [Troubleshooting Common Login Issues - Privy KnowledgeBase](https://help.privy.com/article/203-troubleshoot-common-login-issues)

**Base L2:**
- [Test Networks - Base Documentation](https://docs.base.org/learn/deployment-to-testnet/test-networks)
- [Ethereum layer 2 networks struggle with increased transaction failures | Bitget News](https://www.bitget.com/news/detail/12560604172286)

**PWA iOS Limitations:**
- [GitHub - PWA-POLICE/pwa-bugs](https://github.com/PWA-POLICE/pwa-bugs)
- [PWA on iOS - Current Status & Limitations for Users [2025]](https://brainhub.eu/library/pwa-on-ios)
- [Service Worker Cache Storage Limit](https://love2dev.com/blog/what-is-the-service-worker-cache-storage-limit/)

**React Performance:**
- [React Native Gesture Handler: Swipe, long-press, and more - LogRocket Blog](https://blog.logrocket.com/react-native-gesture-handler-tutorial-examples/)
- [Slow FlatList render when list item contains Swipeable · Issue #3344](https://github.com/software-mansion/react-native-gesture-handler/issues/3344)
- [How to Solve the Infinite Loop of React.useEffect()](https://dmitripavlutin.com/react-useeffect-infinite-loop/)

**Marketplace Cold Start:**
- [Beat the cold start problem in a marketplace](https://www.reforge.com/blog/beat-the-cold-start-problem-in-a-marketplace)
- [Andrew Chen on marketplaces](https://stripe.com/guides/atlas/andrew-chen-marketplaces)

**Crypto UX:**
- [Usability and Difficult Onboarding are Major Entry Barriers for Crypto Users](https://rif.technology/content-hub/crypto-entry-barriers/)
- [Crypto UX Shift: 2026 Predictions And Market Takeaways | MEXC](https://blog.mexc.com/news/crypto-ux-shift-2026-predictions-and-market-takeaways/)
- [Onboarding the Next 1 Billion Users to Crypto: Improving The Crypto User Experience (UX)](https://medium.com/@_bablo_/onboarding-the-next-1-billion-users-to-crypto-improving-the-crypto-user-experience-ux-5afdc0bd1842)

**AI Classification:**
- [False Positives in AI Detection: Complete Guide 2026](https://proofademic.ai/blog/false-positives-ai-detection-guide/)
- [Confidence Score in AI/ML Explained | Ultralytics](https://www.ultralytics.com/glossary/confidence)

**Hackathon API Limits:**
- [Gemini API Free Tier Limits 2025: Complete Guide](https://www.aifreeapi.com/en/posts/gemini-api-free-tier-limit)
- [Gemini API Rate Limits Explained: Complete 2026 Guide](https://www.aifreeapi.com/en/posts/gemini-api-rate-limit-explained)

---

*Pitfalls research for: Haul - Thrift/Resale Mobile PWA*
*Researched: 2026-01-21*
*Context: 72-hour hackathon timeline, solo developer, demo-critical path*
