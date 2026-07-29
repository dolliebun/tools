# Dollie Tools v1.4.1

## Picture Reader
- Translate to Dollie can now read visible text from screenshots and photos.
- Supports camera/photo-library selection on mobile, drag and drop on desktop, and pasted images.
- English mode uses English OCR; Polish mode uses Polish OCR.
- Images are processed in the browser. The OCR library and language files are downloaded from the Tesseract.js CDN when the reader is first used.
- Large camera photos are resized in-browser before OCR to reduce mobile memory use.

## Mobile optimisation
- All pages use iPhone-safe viewport and safe-area spacing.
- Inputs use mobile-safe text sizing to prevent unwanted iOS zoom.
- Buttons and controls have larger touch targets.
- Builder grids, navigation, exports, traits, kink controls, cards, and outputs collapse cleanly on narrow screens.
- Translate controls and the new picture reader stack comfortably on mobile.
- Particle count is reduced on mobile for smoother performance.
- The Dreams redirect is now a complete responsive page with a manual fallback link.

## Builder structure
- Regular and Omegaverse builders remain separate.
- v1.3 features are merged with the v1.4 production suite.
- Soft floating sparkles are the default atmosphere; petals and off remain available on the homepage, Translate to Dollie, and both builders.
- Personality is built from the searchable trait library and behavior engine rather than a duplicate free-text field.
- Surface Goal, Hidden Goal, and Backstory are separate clear fields.
- Intimacy uses Dollie-friendly fields for feeling, likes, initiation, ask-first items, soft limits, hard limits, and aftercare.
- Workbook, Role Card integration, opening images, stress testing, World Book generation, token hygiene, and production export appear in their appropriate steps.
