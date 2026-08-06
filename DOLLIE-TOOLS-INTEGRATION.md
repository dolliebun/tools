# Add Copyright Evidence Builder to `dolliebun/tools`

This package is designed for the existing **Dollie Tools** repository. It does **not** replace the repository homepage.

## Files

- `copyright-evidence-builder.html` — add this as a new root-level tool page.
- `copyright-evidence-builder-index-card.html` — copy its single `<a>` card into the existing `<section class="cards">` in `index.html`, before the closing `</section>`.

## Suggested repository layout

```text
index.html
bot-builder.html
omegaverse-bot-builder.html
translate-to-dollie.html
copyright-evidence-builder.html
README.md
```

## Homepage card

```html
<a class="tool" href="copyright-evidence-builder.html"><span class="tag">Creator protection</span><h2>Copyright Evidence Builder</h2><p>Collect publication proof, copied links, dates, screenshots, comparisons, and local file hashes, then compile a private evidence report or DMCA-style notice draft.</p></a>
```

The tool links back to `index.html` through **← All Dollie Tools**. It remains a self-contained HTML file with no external libraries, server, account system, analytics, or evidence uploads.

© 2026 Dollie. Creators retain ownership of the evidence and content they enter.
