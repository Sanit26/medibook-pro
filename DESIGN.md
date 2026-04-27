# Design Brief: Patient Appointment Booking System

**Theme**: Dark glassmorphism with neon accents. Premium SaaS aesthetic for healthcare technology.

## Tone & Differentiation
Luxury tech meets healthcare accessibility. Bold, confident, ultra-modern. Glassmorphism creates depth and visual intrigue. Neon accents (cyan/purple/lime) signal interactivity and create distinctive visual signature. High contrast ensures medical app clarity.

## Color Palette

| Token | OKLCH | Purpose |
|-------|-------|---------|
| Background | 0.10 0 0 | Deep black canvas, pure darkness |
| Card | 0.12 0.02 270 | Subtle blue-tinted dark glass, ~2% chroma |
| Primary (Cyan) | 0.70 0.18 200 | Vibrant neon cyan, CTAs, active states |
| Secondary (Purple) | 0.65 0.18 290 | Electric purple, secondary actions |
| Accent (Lime) | 0.75 0.19 120 | Bright lime, highlights, success states |
| Foreground | 0.92 0 0 | Off-white text on dark |
| Border | 0.25 0.03 260 | Subtle blue-tinted dividers |
| Destructive | 0.62 0.19 15 | Rich red for alerts |
| Muted | 0.20 0.02 270 | Dark glass for muted/disabled states |

## Typography
**Display**: General Sans (geometric, tech-forward, bold weights 600–700 for headings)
**Body**: Inter (neutral, highly readable, 400–500 weights)
**Mono**: JetBrains Mono (code, timestamps, data fields)

## Elevation & Depth
**Surface Layers**: Background (pure black) → Card (0.12 lightness, 0.02 chroma blue tint) → Popover (0.15 lightness, slightly elevated)
**Glass Effect**: backdrop-filter: blur(12px) on cards, blur(20px) on modals. Semi-transparent overlays (80% opacity on cards, 60% on thick overlays).
**Shadows**: Glow shadows (cyan/purple/lime) on interactive hover states. No drop shadows — only colored glows for neon accent.

## Structural Zones

| Zone | Surface | Border | Notes |
|------|---------|--------|-------|
| Header/Nav | 0.12 light card with glass + cyan glow on scroll | Subtle 0.25 lightness border-top | Logo + nav links + user indicator |
| Main Content | 0.10 background, card sections use glass | Border cards with 0.15 opacity | Hero section with gradient accent, content grid |
| Cards | 0.12 card with backdrop blur, 0.2 hue 270 tint | 0.25 border / 0.15 opacity | Doctor profiles, appointment slots, predictions |
| Modals/Popovers | 0.15 glass thick with 20px blur | 0.25 border / 0.2 opacity | Booking confirmation, alerts, chat overlay |
| Footer | 0.12 card with glass effect | Border-top 0.25 lightness | Simple links, copyright |

## Spacing & Rhythm
**Grid**: 4px base unit. Cards use 24px padding, sections use 32px gap. 
**Density**: Breathing room between cards (16–24px). Compact form inputs (12px vertical, 16px horizontal).

## Component Patterns
- **Buttons**: Gradient primary (cyan→purple), solid secondary (purple), outline accent (lime). Hover: +glow, slight scale (1.02x). Active: brightness up, glow intensifies.
- **Cards**: Glass effect (12px blur, 0.8 opacity) with border. Hover: scale(1.02), shadow-glow-cyan. Content inside: flex column, dark text on light background.
- **Inputs**: Card color (0.12) background, border (0.25), focus: ring cyan with 0.3 opacity glow.
- **Time Slots**: Grid layout, glass cards with lime accent border on available, muted on booked. Hover: scale, lime glow pulse.
- **Calendar**: Card container, day cells with glass, selected date: cyan glow, today: subtle lime border.

## Motion & Animation
**Page Transitions**: fade-in (0.4s ease-out) + scale-in (0.4s cubic-bezier). All page entries use stagger (children offset +50ms each).
**Hover Micro-interactions**: Card scale 1.02x + shadow-glow color. Button brightness +20%, glow intensifies. Slot pulse ring animation on available slots.
**Chat/Toast**: slide-in-up (0.3s) from bottom. Notification badge: pulse (1.5s ease-out).
**Loading**: Skeleton cards with shimmer via glow-pulse animation (3s).

## Constraints
- No full-page gradients. Use gradient accents (buttons, hero text) only.
- Glassmorphism on interactive surfaces only (cards, modals, overlay). Never on text or primary content blocks.
- Neon accents used sparingly: CTAs, highlights, active states. Not on every element.
- High contrast: text always 0.92 foreground on 0.10–0.15 background (exceeds WCAG AAA).
- Border radius: 0.5rem (8px) standard. Buttons 0.25rem (4px) for precision. Full circles for avatars only.

## Signature Detail
**Neon glow on interaction**: Every interactive element (button, link, input focus, card hover) triggers a colored glow shadow matching its accent color (cyan/purple/lime). Creates distinctive, signature SaaS premium feel. Glows are additive (not replacing shadows), layered for depth.

## Key Features UI
- **Hero Section**: Black background, large gradient-text headline, animated cyan glow accent strip behind main CTA.
- **Doctor Cards**: Glass container, avatar (lime border), name/specialty (cyan text), rating (purple star), hover: scale + glow-purple shadow.
- **Calendar**: Grid of glass cells, selected date: cyan background + glow, available slots: lime border pulse, booked: muted disabled state.
- **Chatbot Overlay**: Fixed bottom-right, floating glass container with blur, header: purple gradient, chat messages: alternating card colors.
- **Dashboard Stats**: Card grid, each stat has icon (lime or cyan), number (large bold), label (muted). Hover: glow + micro animation.
- **Loading Shimmer**: Skeleton screens use glass cards with animated glow-pulse at 3s ease-in-out (simulates loading state).
