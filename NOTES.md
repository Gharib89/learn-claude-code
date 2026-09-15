# Notes

## Teaching preferences

- **Pacing**: one lesson, then react. Do not batch lessons or pre-publish a roadmap unless asked.
- **Baseline**: heavy Claude Code user who has already authored skills, hooks, and plugins. Do not re-teach extension fundamentals. Start at the mod API.
- **Prose**: concise, answer first, reasoning second. Challenge bad assumptions directly. No em dashes anywhere.

## Design direction (locked by the user)

- Lessons use Claude brand colors and Claude's own brand font, styled after claude.ai.
- The `frontend-design` skill flags cream + `#D97757` as the top AI-generated tell and names that exact hex as Anthropic's accent. The user's brief overrides this deliberately. Do not quietly drift away from Claude brand to avoid the tell; execute it with accurate tokens and a real type scale instead.
- Lessons must print well. Reusable components live in `./assets/`, never inlined per lesson.

## Lesson format (adopted 2026-09-15)

Every lesson carries three things now, in this order:

1. **An ELI5 opener.** Big type, few words, one concrete analogy before any of the
   detail. The `eli5` skill's house style: "explain like I'm someone who knows
   nothing, big pictures and few words." Styled as `.eli5` in `assets/claude.css`.
   Pedagogical caveat worth watching: a good analogy produces fluency fast, which
   can feel like mastery. It is the opener, never the lesson. The retrieval quiz
   is what actually builds storage strength.
2. **A real SVG diagram**, not ASCII art in a `<pre>`. Hand-authored inline SVG,
   `currentColor` for everything structural so it themes, one literal hue (clay)
   reserved for the element the lesson turns on. Wrapped in `<figure>` with a
   `<figcaption>` stating the claim, and `role="img"` plus `aria-label` carrying
   the same claim. Draw the mechanism, not its name; if a sentence is faster,
   write the sentence.
3. **Published as an Artifact**, so a lesson is a link that can be handed to the
   team rather than a file in a clone.

Staging for the artifact:

    python3 tools/stage-artifact.py lessons/<file>.html <staging-dir>

That rewrites `../assets/` to `assets/` and drops the repo-relative markdown
links, which do not exist on a hosted page. Publish `<staging-dir>/index.html`
with `root` set to the staging dir and the four asset files passed as `files`.
The repo copy stays the source of truth; the artifact is a publish target.

Published lessons:

- Lesson 0001, Wrapping not reacting: https://claude.ai/artifact/DH9kbhAoY1oCDrdzq111KX

## Open questions

- (none yet)
