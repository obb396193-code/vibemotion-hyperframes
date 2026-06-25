# NOTICE — third-party assets & attributions

vibemotion's own code/docs are MIT (see `LICENSE`). The bundled third-party
assets below keep their **own upstream licenses**. If you redistribute this
repo, keep this file.

## Fonts (bundled)
| Font | Where | License | Source |
|---|---|---|---|
| **IBM Plex Mono** | `assets/purple/fonts/IBMPlexMono-500.woff2` | SIL Open Font License 1.1 | https://github.com/IBM/plex |
| **Press Start 2P** | `examples/pixel-skill-adventure/assets/PressStart2P.woff2` | SIL Open Font License 1.1 | https://fonts.google.com/specimen/Press+Start+2P |
| **Zpix (最像素)** | `examples/pixel-skill-adventure/assets/Zpix.ttf` | MIT | https://github.com/SolidZORO/zpix-pixel-font |
| **Alibaba PuHuiTi (阿里巴巴普惠体)** | `assets/purple/fonts/AliPuHui.woff2` | Free for commercial use, © Alibaba | https://www.alibabafonts.com/ |

> The warm theme loads **Noto Serif/Sans SC, DM Serif Display, DM Sans, IBM Plex Mono**
> at runtime via Google Fonts (not bundled) — all SIL OFL 1.1.

## Design spec excerpt
- `references/claude-design-spec.md` is an excerpt/adaptation of **HeyGen's HyperFrames
  "Claude Design" guide** (`docs/guides/claude-design-hyperframes.md`).
  Source: https://github.com/heygen-com/hyperframes — © HeyGen, used for reference;
  see their repo for license terms. Engine docs reference the HyperFrames runtime
  (`@hyperframes/core`) and GSAP (https://github.com/greensock/GSAP, free since 2024).

## Sprites / images
- `examples/pixel-skill-adventure/assets/*.png` — **CC0 / public-domain** pixel-art
  sprites sourced online (run/idle/jump, terrain, fruit). Free to use; no attribution
  required, credited here for transparency.

## Engines referenced (not bundled)
- **HyperFrames** runtime — `@hyperframes/core` (loaded via CDN in compositions).
- **GSAP** + plugins (SplitText / DrawSVG / MorphSVG / MotionPath) — free since the
  2024 Webflow acquisition; loaded via CDN.
