# Ledger compaction

The production ledger and the source archive serve different purposes. Never delete approved canon to make a runtime smaller.

## Recovery point
The complete pre-compaction repository is preserved at `archive/bot-ledger-before-slim-20260907`. The original browser ledger uses `dollie-bot-ledger-v1` and version 3 JSON records. Preserve its storage key, all unknown record fields, linked bot IDs, notes, checklists and archive flags in any replacement.

## Immediate priorities
1. Reduce browser rendering work through pagination and rendering only the active view. Keep note history collapsed until requested.
2. Preserve the shared `getLedger` / `saveLedger` contract, revision hash and conflict protection. Never overwrite a newer shared revision automatically.
3. Keep one active production manifest per bot. Move superseded drafts and historical exports to an archive only after an exact source inventory and checksum verification.
4. Keep shared Blackbriar World Books authoritative. Do not duplicate or delete canon merely to reduce tokens.
5. Separate large media from the bot source archive. The two animated site assets account for roughly 14.9 MB, but must not be removed without replacing their live references and preserving the original bytes.

## Important distinction
Removing files from the current Git tree does not erase their historical Git objects. A smaller working tree is not the same as a smaller clone or repository history. History rewriting requires a separately verified backup and an explicit migration plan.

## Deployment rule
Back up the current ledger JSON before changing storage code. Do not reset, clear, migrate destructively or replace user records with sample data. Preserve the original page on the recovery branch until the replacement has been tested with real exports and shared-saving behavior.
