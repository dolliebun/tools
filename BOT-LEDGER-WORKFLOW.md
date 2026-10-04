# Bot Ledger section-update workflow

## Standing instruction for assistants
After each completed section approved by the user in a bot, handoff, collaboration or universe project, update the corresponding Bot Ledger checklist and progress in its Google Sheets backend. Read this instruction when resuming section-based project work.

1. Read the current project record and verify its identity.
2. Mark only the approved items complete. Preserve prior checks, custom templates, approved canon, visuals, tags, universe links and unrelated fields.
3. Record the section completed and next unfinished section. Change deadlines only when explicitly established by the user. Do not mark an entire project complete after one section.
4. Save through the ledger's authenticated, revision-aware workflow. Verify persistence before reporting success.
5. If access is unavailable, report the update as pending and prepare a precise import patch for the existing record. A prepared patch is not a completed Sheets update.

This is an assistant workflow instruction, not an installed automation or a guarantee that every AI session reads this file automatically.

## Evidence relationship
The Copyright Evidence Builder in this repository manages copyright cases. It can save case records to a separately configured private GitHub vault. Its existing case-save button does not update Google Sheets and should not be treated as an automatic production log.

An eventual section-evidence connection should retain Google Sheets as the operational checklist and record evidence in a private destination. Keep production evidence separate from infringement cases. Store only approved section identifiers, approval times, source references and verified save results; never publish private prompts, chat captures, account information or credentials to this public repository. Hashes identify file contents but do not independently prove authorship or approval.

Do not assume that Google Sheets and GitHub form one transaction. Track each save separately and report partial failures honestly. Repeated section events must be idempotent and must not duplicate approvals or overwrite newer progress.

## Current limits
This document installs no runtime synchronization, scheduled job or authentication bridge. Stats capture remains a reviewed saved-page import and is separate from section progress. A working automatic bridge requires authenticated access to the actual backing ledger and its current schema.
