---
name: retrospective
description:
    Capture project lessons after corrections, surprises, or substantial React Template sessions. Updates AGENTS.md (Lessons or
    Conventions) or README.md.
---

# Session Retrospective

## When to use

- User corrects a wrong path, wrong stack assumption, or wrong approach
- A tool limitation or project constraint affects the workflow
- User says "remember this", "add to lessons", or "document that"
- End of a substantial session with reusable project knowledge

## Steps

1. Identify what would have prevented the issue
2. Read `AGENTS.md`
3. Put the lesson where it belongs: gotchas in `AGENTS.md` `## Lessons` (create the section before
   `## AI workflow layout` if it is missing), conventions in `AGENTS.md` `## Conventions`, operational facts (setup,
   local services, scripts) in `README.md`
4. Update an existing entry instead of duplicating it, and remove entries that are no longer true
5. Keep it as current fact/invariant, not a narrated history of the session
6. Do not create a new documentation file

## What not to capture

- Trivial typo fixes
- One-off task details
- Information already obvious from the current code or the error message
