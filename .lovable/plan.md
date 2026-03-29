

## Make Site Fully Responsive for Web Browsers

The site currently has mobile optimizations geared toward Capacitor/native, but regular web visitors on mobile and tablet need a polished responsive experience too. Here's the plan:

### Changes

**1. Fix BottomNav visibility for web vs native** (`src/components/BottomNav.tsx`, `src/pages/Index.tsx`)
- The bottom nav and `pb-20` padding are always shown on mobile, even for regular web users. Add a check so the bottom nav only shows in standalone/PWA mode, or keep it but ensure it doesn't interfere with regular scrolling.
- Actually, keeping the bottom nav for all mobile users is fine UX — just ensure the footer padding accounts for it properly.

**2. Hero section responsive refinements** (`src/components/Hero.tsx`)
- The logo uses fixed `h-[20rem]` on mobile which can be too tall on smaller screens (320px width). Add a smaller breakpoint: `h-[14rem] sm:h-[20rem] md:h-[28rem] lg:h-[34rem]`.
- The Team Overview card's avatar row can overflow on very small screens — already uses `flex-wrap`, which is good.

**3. Header responsive polish** (`src/components/Header.tsx`)
- Read full header to check if elements overflow on small screens (weather widget + clock + icons can crowd the 320-375px range).
- Conditionally hide non-essential header items (weather, clock) on very small screens using `hidden xs:flex` or similar.

**4. Agent cards grid** (`src/components/AgentCard.tsx`, `src/components/TeamAgentsSection.tsx`)
- The 2-column grid on mobile is good, but agent cards may have text overflow on 320px screens. Ensure card content uses proper text truncation and smaller font sizes.

**5. CTA Section** (`src/components/CTASection.tsx`)
- Padding `p-8` on mobile can be reduced. Use `p-5 md:p-8 md:p-10`.
- Button layout already uses `flex-col sm:flex-row` — good.

**6. Footer responsive fixes** (`src/components/Footer.tsx`)
- The footer has `pb-24 md:pb-4` plus safe-area-bottom calc — this creates excessive padding on regular mobile web. Simplify: use `pb-20 md:pb-4` consistently, with safe-area only added inside Capacitor context.
- The nav links grid (`flex-wrap gap-8`) can look cramped on mobile. Reduce gap to `gap-4 md:gap-8`.
- Siri/Google Assistant icons (w-12 h-12) are large for mobile footer — reduce to `w-10 h-10` on mobile.

**7. Streaming section** (`src/components/StreamingSection.tsx`)
- Verify icons don't overflow on small screens.

**8. Security section** (`src/components/SecuritySection.tsx`)
- The 2-column grid is fine on tablet+ but on mobile (< 640px) it should stack to 1 column: `grid-cols-1 sm:grid-cols-2`.

**9. Global CSS improvements** (`src/index.css`)
- The `p, span, a, li, td, th, label, div { font-size: max(inherit, 14px); }` rule can cause layout issues by forcing minimum sizes on elements that should be smaller. Remove or scope it more carefully.

### Files to modify
- `src/components/Hero.tsx` — smaller logo on tiny screens
- `src/components/Header.tsx` — hide clock/weather on very small screens  
- `src/components/CTASection.tsx` — tighter mobile padding
- `src/components/SecuritySection.tsx` — single column on small mobile
- `src/components/Footer.tsx` — fix padding, reduce gaps
- `src/index.css` — fix overly aggressive min font-size rule
- `src/components/AgentCard.tsx` — text truncation on small screens

