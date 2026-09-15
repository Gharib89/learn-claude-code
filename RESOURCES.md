# Claude Code Mods Resources

Trust ranking for this topic, highest first:

1. The **bundled `plugin-authoring` skill** and the **`/plugin-types` output** from your own build.
2. The **installed binary** itself.
3. The **GitHub proposal thread**.
4. Everything else, which at the time of writing is secondhand.

The feature is pre-release and the API is explicitly provisional, so a source's
age matters more than usual. Anything written before your installed version
shipped may already be wrong.

## Knowledge

- **The bundled `plugin-authoring` skill** (ships inside Claude Code; appears in the skill list once function hooks are enabled)
  The single most authoritative prose description of the contract. Covers the module shape, `register(on, options)`, the `($, e, next)` signature, the `turn.step` async-generator special case, `ui.render` surfaces and validation, dispatch budgets and `next.signal`, and `$.tool.register`. Use for: anything about what a hook *is* and how the engine treats it. Prefer this over any blog.

- **`/plugin-types`** (slash command; writes to `.claude/types` by default)
  Generates `claude-code.d.ts`, `claude-code-plugins.d.ts` and `claude-code-mcp.d.ts` from the build you are actually running. The header carries a `tsconfig.json` that fits a hooks module. Use for: every event's exact input and result, every noun and method on `$`, every element and prop per surface. This is the reference; regenerate rather than edit it. Requires `CLAUDE_CODE_ENABLE_FUNCTION_HOOKS=1`.

- **`claude plugin validate <path>`** (CLI)
  Reads a plugin's manifest and hooks module source and reports what the module hooks and calls. Use for: the fastest check that the engine sees what you meant, before you even start a session.

- **`claude --debug`** (CLI)
  The debug log records every hook that was skipped and every result the engine refused, with the plugin, event and reason. Use for: a mod that appears to do nothing. It has almost always been told why. For drawing specifically, look for lines beginning `ui.render (<Component>): a hook returned a tree that does not validate`.

- **[GitHub issue #91870, the function hooks proposal](https://github.com/anthropics/claude-code/issues/91870)** (anthropics/claude-code)
  The public design proposal and the thread where the API is being argued out. Use for: design rationale, what Anthropic is still undecided on, and filing your own feedback. Anthropic stated the community response decides whether it ships, so this is also where influence lives.

- **[Claude Code hooks documentation](https://code.claude.com/docs/en/hooks)**
  Documents the *current* shell-command hooks, not function hooks. Use for: the "before" half of the comparison, and because your existing hooks still run under this model.

- **[anthropics/claude-code examples/hooks](https://github.com/anthropics/claude-code/tree/main/examples/hooks)**
  Official worked examples in the shell-hook style, including a Bash command validator. Use for: a concrete shell hook worth porting to a function hook as an exercise.

## Wisdom (Communities)

- **[GitHub issue #91870's comment thread](https://github.com/anthropics/claude-code/issues/91870)**
  Where the people building and stress-testing this are actually talking, including Anthropic engineers. Use for: asking a design question and having a real chance of an authoritative answer. Highest-signal community for this topic by a distance, and it is temporary, so use it while the proposal is open.

- **[r/ClaudeAI](https://reddit.com/r/ClaudeAI)**
  General-purpose, high traffic, variable signal. Use for: noticing what people are building, not for API truth.

- **[Anthropic Discord](https://www.anthropic.com/discord)**
  Use for: quick questions and finding others working on mods. Verify anything load-bearing against `/plugin-types`.

## Gaps

- **No official mods documentation exists yet.** There is no page on code.claude.com for function hooks. The bundled skill and the generated types are standing in for documentation, which is why they rank above everything published.
- **No published event catalogue.** The full event list had to be extracted from the binary. `/plugin-types` is the only sanctioned way to get it, and it reflects one build.
- **No security model writeup.** How `$` capability restriction actually works for an admin restricting third-party mods is described only in the proposal, not in reference documentation. This is a live gap for the "ship to my team" half of the mission and worth asking about directly in #91870.
- **No distribution story.** Whether mods reach a marketplace, and how an organisation pins or blocks one, is unsettled.

## Notes on sources to distrust

- **`anthropic-fonts` on npm** claims MIT and is a private repackaging of Anthropic's proprietary font binaries. The licence grant is void. The same applies to fontiko, cdnfonts, onlinewebfonts and "free Claude font download" pages.
- **Third-party "Claude mods" blog posts and repos.** Several were checked while building this workspace; at least one contained a self-contradictory claim, and another stated mods cannot touch the filesystem when `$.filesystem` exists. Treat all of them as leads to verify, never as reference.
