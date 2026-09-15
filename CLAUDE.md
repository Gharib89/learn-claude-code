# learn-claude-code

Learning Claude Code: notes, experiments, and worked examples.

## Agent skills

### Issue tracker

Issues live as GitHub issues in `Gharib89/learn-claude-code`, managed via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles, using their default label strings. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

## Writing a lesson

Lessons live in `lessons/NNNN-<dash-case>.html` and are built from the shared
components in `assets/`. Never inline what a second lesson would duplicate.

Every lesson carries three things, in this order:

1. **An ELI5 opener** (`.eli5`): big type, few words, one concrete analogy,
   before any of the technical detail. Keep it short. An analogy buys fluency
   fast, and fluency feels like mastery without being it; the retrieval quiz is
   what builds retention.
2. **A hand-authored inline SVG diagram**, not ASCII art in a `<pre>`. Draw the
   mechanism, not its name, and if a sentence says it faster, write the sentence.
   Everything structural in `currentColor` so it themes; reserve clay
   (`#d97757`) for the single element the lesson turns on. Wrap it in `<figure>`
   with a `<figcaption>` stating the claim, plus `role="img"` and an
   `aria-label` carrying the same claim.
3. **An Artifact publish**, so the lesson is a link that can be handed to someone
   rather than a file in a clone.

```
python3 tools/stage-artifact.py lessons/<file>.html <staging-dir>
```

Then publish `<staging-dir>/index.html` with `root` set to the staging directory
and the four `assets/` files passed as the Artifact tool's `files`. The repo copy
is the source of truth; the artifact is a publish target.

`NOTES.md` holds the teaching preferences and the list of published lessons.

## Facts about Claude Code mods

Mods are pre-release, undocumented and default-off behind
`CLAUDE_CODE_ENABLE_FUNCTION_HOOKS=1`. Verify every claim against the bundled
`plugin-authoring` skill, `/plugin-types`, or the installed binary before writing
it into a lesson. Third-party posts on this topic are wrong in load-bearing ways.
Anything still secondhand is marked unverified in `reference/function-hooks.html`
and stays that way until checked.
