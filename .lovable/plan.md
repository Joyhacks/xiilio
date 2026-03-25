

## Native Mobile Experience Optimization

### What this does
Transforms the app from a website feel to a native Android/iOS app experience with hidden scrollbars, bottom navigation bar, full-screen layout, mobile-optimized touch targets, and dark background to eliminate white flash.

### Plan

**1. Hide all scrollbars globally** (`src/index.css`)
- Add webkit/Firefox/IE scrollbar-hide CSS rules to `html` and all scrollable elements
- Content remains scrollable, just no visible scrollbar chrome

**2. Set background to `#030712` to prevent white flash** (`index.html` + `src/index.css`)
- Add `style="background-color: #030712"` to `<body>` and `<html>` in `index.html`
- Update CSS `--background` variable in dark mode to match `#030712`
- Update `meta[name="theme-color"]` to `#030712`

**3. Create a bottom navigation bar component** (`src/components/BottomNav.tsx`)
- Fixed to bottom with safe-area padding
- 5 icon tabs: Home, Agents, Pricing, Docs, Settings/More
- Active state indicator, 48px+ touch targets
- WhatsApp/Instagram-style: icons with small labels underneath
- Only visible on mobile (`md:hidden`)

**4. Refactor Header for mobile** (`src/components/Header.tsx`)
- Remove hamburger menu and mobile nav links (moved to bottom nav)
- Keep: logo/weather left, clock center, share+whatsapp right
- Ensure header doesn't overlap content — add proper `pt-[header-height]` spacer to pages

**5. Add content spacers for fixed header + bottom nav** (`src/pages/Index.tsx` + other pages)
- Add `pb-20` (bottom nav height) on mobile to all page containers
- Verify `pt-16` or equivalent for fixed header offset

**6. Mobile-optimize all buttons** (`src/components/ui/button.tsx` + `src/index.css`)
- Add responsive variant: on mobile (`max-md`), all buttons get `min-h-[48px]`
- CTA/primary buttons get `w-full` on mobile
- Apply via CSS media query in index.css for broad coverage

**7. Remove hover effects on touch devices** (`src/index.css`)
- Wrap all hover utilities (`.hover-lift:hover`, `.hover-glow:hover`, `.card-hover:hover`) in `@media (hover: hover)` so they only apply on devices with a real pointer
- Remove inline `hover:` classes from glass utilities on touch

**8. Fix font sizes for mobile readability** (`src/index.css`)
- Set `body` base font to `16px` minimum
- Ensure no text is smaller than `14px` on mobile via CSS rule
- Bump muted-foreground contrast slightly for readability

**9. Prevent horizontal scrolling** (`src/index.css`)
- Add `max-width: 100vw; overflow-x: hidden` to `html`, `body`, and `#root`
- Add `overflow-x: hidden` to common container selectors

**10. Mobile-optimize form inputs** (`src/components/ui/input.tsx` + `src/components/ui/textarea.tsx`)
- Increase mobile height to `h-12` (48px) with `text-base` (16px prevents iOS zoom)
- Add `rounded-xl` for native feel

**11. Make all images responsive** (`src/index.css`)
- Add global `img { max-width: 100%; height: auto; }` rule

**12. Update Footer** (`src/components/Footer.tsx`)
- Add `pb-24` on mobile to account for bottom nav bar overlay
- Simplify mobile layout to single column

### Files to create/modify
- **Create**: `src/components/BottomNav.tsx`
- **Modify**: `src/index.css`, `index.html`, `src/components/Header.tsx`, `src/components/ui/button.tsx`, `src/components/ui/input.tsx`, `src/components/ui/textarea.tsx`, `src/components/Footer.tsx`, `src/App.tsx`, `src/pages/Index.tsx`

