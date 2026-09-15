export function register(on) {
  on("tool.call", { tool: "Bash" }, async ($, e, next) => {
    const command = e.command ?? "";

    // --force and -f as whole arguments. --force-with-lease is deliberately
    // exempt: it is what the refusal tells you to use, and a plain /--force\b/
    // matches it too, which would make that advice impossible to follow.
    const forcePush = /\bgit\s+push\b.*?(?:\s--force(?!-with-lease)|\s-f)\b/;

    // Answer for ourselves: never call next, so the engine never runs it.
    if (forcePush.test(command)) {
      return { deny: "Refused by my-guardrail: force push. Use --force-with-lease." };
    }

    // Wrap: hold the result, annotate it, hand it back up.
    const result = await next(e);
    if (/git\s+push\b/.test(command)) {
      $.store.set("last-push", new Date().toISOString());
    }
    return result;
  });
}
