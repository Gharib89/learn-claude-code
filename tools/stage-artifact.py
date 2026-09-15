#!/usr/bin/env python3
"""Stage a lesson for publishing as an Artifact.

Artifact pages are served from their own root, so a lesson's `../assets/` paths
and its repo-relative markdown links do not survive the move. This rewrites both
into a staging directory, leaving the repo copy untouched.

    python3 tools/stage-artifact.py lessons/0001-wrapping-not-reacting.html <staging-dir>

Then publish <staging-dir>/index.html with the four asset files passed as the
Artifact tool's `files`, and `root` set to <staging-dir>.
"""
import pathlib
import re
import shutil
import sys

ASSETS = ["claude.css", "quiz.css", "quiz.js", "toc.js"]
REPO_URL = "https://github.com/Gharib89/learn-claude-code"


def main(lesson: str, staging: str) -> None:
    root = pathlib.Path(__file__).resolve().parent.parent
    out = pathlib.Path(staging)
    (out / "assets").mkdir(parents=True, exist_ok=True)

    html = (root / lesson).read_text()
    html = html.replace('"../assets/', '"assets/')
    # MISSION.md and RESOURCES.md are repo files with no hosted equivalent.
    html = re.sub(r'<a href="\.\./(MISSION|RESOURCES)\.md">.*?</a>\s*', "", html)
    html = re.sub(r'<a href="\.\./reference/[^"]+">[^<]*</a>',
                  f'<a href="{REPO_URL}">Repo</a>', html)
    (out / "index.html").write_text(html)

    for name in ASSETS:
        shutil.copyfile(root / "assets" / name, out / "assets" / name)

    print(f"staged {lesson} -> {out}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
