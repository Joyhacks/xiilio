

## Mobile UX Audit - Issues Found & Fix Plan

Based on code review and the initial mobile screenshot (390px viewport), here are all the issues identified:

### Critical Issues

**1. Hero section has empty/wasted space on mobile**
- The logo area takes up a huge portion of the screen (`h-[14rem]`) with very little visible content above the fold. Users see mostly dark background before any content.

**2. `overscroll-behavior: none` on body blocks native scroll bounce**
- Combined with `-webkit-touch-callout: none` and `user-select` restrictions, this creates a "stuck" feeling on mobile web browsers. Users report scroll not working -- this is likely the cause.

**3. PullToRefresh intercepts all touch events at page top**
- The `PullToRefresh` wrapper captures `onTouchStart/Move/End` on the entire page. When `window.scrollY <= 0`, it starts tracking pulls. This can conflict with normal scrolling, especially if there's any rounding issue with `scrollY` being slightly negative or zero on bounce.

**4. Cookie consent banner overlaps bottom nav**
- From the screenshot, the cookie banner sits right on top of the bottom nav, making both hard to interact with.

**5. Hidden scrollbars globally breaks scroll affordance**
- `*::-webkit-scrollbar { display: none }` and `scrollbar-width: none` hide ALL scrollbars, including in chat views and settings where scrollbars help users understand there's more content.

### Medium Issues

**6. Notification bell not visible on mobile header**
- `NotificationCenter` is only in the desktop `hidden md:flex` section. Mobile users have no access to notifications.

**7. CalendlyEmbed uses `window.innerWidth` at render time (not reactive)**
- `const isMobile = window.innerWidth < 768;` doesn't update on resize/rotation, causing wrong height after orientation change.

**8. Docs page has ref warning (console error)**
- `SEO` and `Header` components are being passed refs but aren't wrapped in `forwardRef`, causing React warnings.

**9. Agent cards 2-column grid is tight on 320px screens**
- Cards at `grid-cols-2` with `gap-4` leaves very narrow cards (~155px). Agent names like "Executive Assistant Nicole" will wrap awkwardly.

**10. No sign-in access on mobile**
- The sign-in button is only in the desktop header section (`hidden md:flex`). Mobile users can't sign in without navigating to Settings.

### Minor Issues

**11. Footer bottom padding creates gap on regular mobile web**
- `pb-20 md:pb-4` is there for the bottom nav, but the footer also has `safe-area-bottom` calculations that can stack.

**12. WhatsApp link hardcoded fallback**
- `whatsappUrl || "https://wa.me/12345678900"` -- the fallback number is a placeholder.

**13. NavMenu duplicates bottom nav links**
- The `NavMenu` component within `TeamAgentsSection` shows the same links (Agents, Pricing, Docs) as the `BottomNav`, creating redundancy on mobile.

---

### Fix Plan

**Files to modify:**

1. **`src/index.css`** -- Remove `overscroll-behavior: none` from body (keep it only for specific containers like chat). Remove `-webkit-touch-callout: none` from body. Allow scrollbars in specific overflow containers.

2. **`src/components/PullToRefresh.tsx`** -- Add a guard: only activate pull-to-refresh when `window.scrollY === 0` AND the touch delta exceeds a threshold. Add `{ passive: false }` consideration and prevent the component from eating scroll events.

3. **`src/components/Header.tsx`** -- Add NotificationCenter and a sign-in/avatar button to the mobile header section (the `flex md:hidden` area).

4. **`src/components/CookieConsentBanner.tsx`** -- Add `bottom-16 md:bottom-0` or similar offset so the banner sits above the bottom nav on mobile.

5. **`src/pages/Contact.tsx`** -- Make CalendlyEmbed responsive by using a hook or CSS instead of static `window.innerWidth`.

6. **`src/components/Hero.tsx`** -- Reduce top padding on mobile to show content sooner. Consider `h-[12rem]` for the logo on small screens.

7. **`src/components/SEO.tsx`** -- Wrap in `forwardRef` to fix the console warning.

8. **`src/components/AgentCard.tsx`** -- Add `truncate` to agent name on mobile to prevent awkward wrapping.

9. **`src/components/NavMenu.tsx`** -- Hide on mobile (`hidden md:block`) since the bottom nav already provides these links.

10. **`src/components/Footer.tsx`** -- Simplify bottom padding logic to avoid double-padding from safe-area + bottom-nav offset.

