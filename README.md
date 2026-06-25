# vibemotion

A reusable **Claude skill** for making "Claude-design-style, pure-code videos" — short, polished motion-graphics clips written as HTML + a paused GSAP timeline and rendered to MP4 via **HyperFrames**. One skill, three validated themes, shared rules.

> This is an **agent skill**: the entry point is [`SKILL.md`](SKILL.md), which Claude (Claude Code / compatible agents) reads to drive the workflow. The README is the human-facing overview.

## Themes
| Theme | Vibe | Good for |
|---|---|---|
| **purple-glass** | Aurora + chrome 3D titles + glassmorphism | product / hype / flashy concepts |
| **warm-serif** | Claude warm-orange + cream/dark + serif | explainers, knowledge, calm narration |
| **pixel-arcade** | Retro pixel / arcade | game metaphors, progress/score cards |

Aspect ratio is **not** hard-coded — pick `landscape` / `portrait` / `square` per platform.

## Engine
- **HyperFrames** (`@hyperframes/core`) renders a paused GSAP timeline frame-by-frame → MP4.
- **GSAP** + its now-free plugins (SplitText / DrawSVG / MorphSVG / MotionPath) — see [`references/gsap-plugins.md`](references/gsap-plugins.md).
- Optional **HyperShader** cinematic transitions and the Claude Design spec — see [`references/`](references).

```bash
# render a composition directory to MP4
npx hyperframes render . -o out.mp4 -w 1 --resolution portrait   # or landscape / square
```

## Install
Drop it into your skills directory:
```bash
git clone https://github.com/obb396193-code/vibemotion.git ~/.claude/skills/vibemotion
```
Then ask your agent to use it (e.g. "用 vibemotion 做一条 …"). It also works with the
open skills ecosystem (`npx skills`).

## Layout
- `SKILL.md` — agent entry (themes, flow, determinism rules, debug table, red lines).
- `references/` — structure & rules, per-theme specs, GSAP plugins, Claude Design spec, realistic-UI pipeline, asset sourcing.
- `assets/` — purple & warm kits (CSS/JS/fonts).
- `examples/` — runnable reference projects (`warm-transformer`, `pixel-skill-adventure`, `purple-product`, `gsap-plugins`).
- `templates/` — starter HTML per theme.

## Philosophy
vibemotion is **method + authoritative sources + validated starting points — not a frozen catalog.** Each render can differ: go find what you need (in `references/`, `examples/`, upstream repos), or generate something new from the spec — as long as you keep the structure contract, determinism rules, and anti-AI-slop self-check. *Listing N things ≠ only N things.*

## License & attribution
Original code/docs: **MIT** ([`LICENSE`](LICENSE)). Bundled fonts, the HeyGen HyperFrames / Claude Design spec excerpt, and CC0 sprites keep their own upstream licenses — see [`NOTICE.md`](NOTICE.md).
