

## Capacitor-Ready Conversion with Native Splash Screen

### What this does
Prepares your app for native iOS/Android conversion via Capacitor, and adds an animated splash screen that gives it a polished, native-app feel on launch.

### Plan

**1. Add Capacitor configuration file**
- Create `capacitor.config.ts` with:
  - `appId`: `app.lovable.e4c2ff06faec40a28aebc6afdc9c244f`
  - `appName`: `xiilio`
  - `webDir`: `dist`
  - Hot-reload server pointing to sandbox preview URL
  - Splash screen plugin config (auto-hide after app loads, fade duration, background color matching theme `#1a1610`)

**2. Add Capacitor dependencies to package.json**
- `@capacitor/core`, `@capacitor/ios`, `@capacitor/android`
- `@capacitor/cli` (dev dependency)
- `@capacitor/splash-screen` (native splash screen control)
- `@capacitor/status-bar` (native status bar styling)

**3. Create animated splash screen component**
- New `src/components/SplashScreen.tsx` — full-screen overlay with:
  - Dark warm background matching app theme
  - Xilio logo (using existing `logo-xilio-new.png`) with fade-in + scale animation
  - Subtle tagline text fade-in
  - Auto-dismisses after ~2 seconds with a smooth fade-out
- Works in both browser and native contexts

**4. Integrate splash screen into App.tsx**
- Show `SplashScreen` component on initial load
- After splash animation completes, render the main app
- Call `SplashScreen.hide()` from `@capacitor/splash-screen` when running natively to dismiss the native splash and show the web splash

**5. Add native status bar styling**
- In `App.tsx` or `main.tsx`, detect Capacitor native platform and configure status bar to dark content with transparent background, blending with the app header

**6. Update index.css for native feel**
- Add `-webkit-touch-callout: none` and `user-select: none` on interactive elements to prevent non-native behaviors
- Ensure `overscroll-behavior: none` on body to kill rubber-banding outside scroll containers
- Add `tap-highlight-color: transparent` globally

### After implementation — what you need to do locally

1. Export project to GitHub via the "Export to GitHub" button
2. Clone the repo and run `npm install`
3. Run `npx cap add ios` and/or `npx cap add android`
4. Run `npx cap update ios` / `npx cap update android`
5. Run `npm run build && npx cap sync`
6. Run `npx cap run ios` (requires Mac + Xcode) or `npx cap run android` (requires Android Studio)

For detailed guidance, see the [Lovable Capacitor blog post](https://lovable.dev/blog/lovable-capacitor).

### Files to create/modify
- **Create**: `capacitor.config.ts`, `src/components/SplashScreen.tsx`
- **Modify**: `package.json`, `src/App.tsx`, `src/index.css`

