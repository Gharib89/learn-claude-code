# Ahmed already authors skills, hooks, and plugins

Stated at workspace setup: he is a heavy Claude Code user who has written skills, hooks, and plugins himself, and asked to skip extension fundamentals. Lessons should therefore start at the function-hook API and use his existing shell hooks as the anchor for every new idea, teaching by delta rather than from first principles.

## Implications

- The productive framing is "what does this let you do that your shell hook could not", not "here is what a hook is".
- Lesson 0001 exploits this directly: it ports a force-push guardrail he already runs as a shell hook.
- Do not spend lesson time on plugin packaging, `plugin.json`, or marketplace mechanics. He knows them.
- Open question for a future session: whether he has written any TypeScript-heavy extension, since function hook modules run with no Node and no DOM. If his plugin work has been shell-first, the `$`-only environment is the likelier stumbling block, not the middleware shape.
