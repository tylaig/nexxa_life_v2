# NexxaLife Brand Guide

## Brand idea

**NexxaLife** is a personal evolution operating system. The identity should feel calm, intelligent and directional — less “habit tracker”, more “strategic life cockpit”.

Core phrase:

> Clarity · Execution · Evolution

## Logo concept

The mark combines three ideas:

1. **N / Nexxa** — the main monogram.
2. **Life loop** — the curved inner stroke represents cycles of diagnosis, action and review.
3. **North-star point** — the gold dot represents direction, insight and next action.

## Assets

Primary assets live in:

```text
public/brand/
```

Files:

- `nexxalife-mark.svg` — primary app/logo mark.
- `nexxalife-logo-horizontal.svg` — horizontal lockup.
- `nexxalife-logo-stacked.svg` — presentation/social lockup.
- `nexxalife-mark-mono-light.svg` — monochrome mark for dark backgrounds.
- `nexxalife-mark-mono-dark.svg` — monochrome mark for light backgrounds.
- `nexxalife-app-icon-1024.png` — high-resolution app icon.
- `nexxalife-app-icon-512.png` — app icon.
- `nexxalife-app-icon-192.png` — PWA icon.

Root app icons:

- `public/icon.svg`
- `public/favicon.ico`
- `public/apple-icon.png`
- `public/icon-192.png`
- `public/icon-512.png`
- `public/manifest.webmanifest`

## Color system

Primary palette:

- Deep OS: `#071B1F`
- Nexxa Teal: `#16B8A6`
- Signal Cyan: `#4BC7F5`
- Growth Emerald: `#18C58F`
- Life Mint: `#DDFBF4`
- North Star Gold: `#D7B56D`
- Ink: `#101820`
- Paper: `#F7FBFA`

Existing app theme uses OKLCH tokens in `app/globals.css`. Keep using semantic Tailwind tokens (`primary`, `accent`, `background`, `foreground`) in components.

## Usage rules

Do:

- Use the mark for favicon/app icon/sidebar compact state.
- Use the horizontal lockup in marketing pages and larger headers.
- Keep enough clear space around the mark.
- Prefer calm, spacious layouts with precise hierarchy.

Avoid:

- Stretching the logo.
- Recoloring the primary mark randomly.
- Using the gold dot as a generic decoration without purpose.
- Placing the full-color mark on noisy/high-chroma backgrounds.

## React components

Reusable components:

```text
components/brand/nexxalife-logo.tsx
```

Exports:

- `NexxaLifeMark`
- `NexxaLifeWordmark`
- `NexxaLifeLogoLockup`

## Product tone

Human, calm and strategic.

Words that fit:

- clarity;
- cycle;
- execution;
- evolution;
- direction;
- operating system;
- personal cockpit;
- next action.

Words to avoid:

- hustle;
- grind;
- generic productivity;
- vague transformation;
- hype language.
