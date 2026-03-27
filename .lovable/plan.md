

## Integrate Calendly Link

### What this does
Replaces internal `/contact` navigation for "Schedule Demo" buttons with the Calendly link (`https://calendly.com/itsgotime-24twelve`), so users go directly to your booking page. Also adds a "Book a Call" option on the Contact page.

### Changes

**1. CTA Section** (`src/components/CTASection.tsx`)
- Change "Schedule Demo" button from `<Link to="/contact">` to `<a href="https://calendly.com/itsgotime-24twelve" target="_blank" rel="noopener noreferrer">`

**2. About page** (`src/pages/About.tsx`)
- Change "Contact Us" button to "Schedule a Call" linking to Calendly

**3. Contact page** (`src/pages/Contact.tsx`)
- Add a prominent "Schedule a Call" card/button at the top that opens the Calendly link, giving visitors a quick path to book directly

**4. Agent detail pages** (`src/pages/AgentDetail.tsx`)
- If there's a "Schedule" or "Book" action, point it to the Calendly link

**5. Docs page** (`src/pages/Docs.tsx`)
- Change "Contact Support" button to link to Calendly

### Files to modify
- `src/components/CTASection.tsx`
- `src/pages/About.tsx`
- `src/pages/Contact.tsx`
- `src/pages/Docs.tsx`

