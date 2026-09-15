export function register(on) {
  on("tool.call", { tool: "Bash" }, async ($, e, next) => {
    const command = e.command ?? "";

    // Answer for ourselves: never call next, so the engine never runs it.
    if (/git\s+push\b.*(--force|-f)\b/.test(command)) {
      return {
        output: "Refused by my-guardrail: force push. Use --force-with-lease.",
        isError: true,
      };
    }

    // Wrap: hold the result, annotate it, hand it back up.
    const result = await next(e);
    if (/git\s+push\b/.test(command)) {
      $.store.set("last-push", new Date().toISOString());
    }
    return result;
  });
}
