# Dollie Tools v1.0

Upload these files directly to the root of `dolliebun/tools`.

## Fix in v1.0

The lower-right effect buttons now work correctly.

Cause:
- the buttons were inserted after the JavaScript had already searched for them

Fix:
- the control is now placed before the effect script
- initialization waits for `DOMContentLoaded`
- Sparkles, Petals, and Off remain mutually exclusive
- the selected effect is still remembered in the browser

Replace:
- `index.html`
- `bot-builder.html`
- `omegaverse-bot-builder.html`
