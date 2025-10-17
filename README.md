# The Tooth Fae – Unofficial Field Manual

Welcome to the companion site for **The Tooth Fae**, a grim fairy stealth game about harvesting unique teeth from sleeping mortals. This project replaces the previous Crazy Cattle 3D template with fresh copy, guides, and resources tailored to the new game.

## About the Game

The Tooth Fae drops you into a two-phase heist loop:

- **Target Scouting (Town Map):** Hover over homes to learn each occupant’s age group and traits before committing to an extraction.
- **Extraction Interface:** Manage three tension meters while working:  
  - **Lucidity (yellow):** When it maxes out, the target wakes and the run is over.  
  - **Pain (red):** Too much agony risks killing the donor.  
  - **Fear (purple):** High fear accelerates lucidity, so keep them calm.  

Your long-term objective is to collect all 16 unique teeth for the **“My Perfect Lovelies”** cabinet. Common teeth are plentiful, but the rarest specimens demand careful trait hunting and precise execution.

### Toolkit Overview

- **Fairy Dust:** Calms lucidity and fear – your primary crowd-control loop.  
- **Hook:** Pries the mouth open and starts every operation; raises pain and lucidity slightly.  
- **Anesthetic Syringe:** Resets pain spikes; crucial against tough donors or multi-tooth runs.  
- **Dental Drill:** Loosens the target tooth quickly but ramps every meter – use in short bursts.  
- **Forceps:** The finishing move to claim your prize once the tooth is free.

### Advanced Planning Tips

- **Trait-based tactics:**  
  - *Heavy Sleeper* donors barely stir, perfect for practicing drill rhythm.  
  - *Tough* mortals demand long drill windows – stagger dust and anesthetic carefully.  
  - *Night Owl / Insomniac* targets start half-awake; work in quick cycles and dust immediately.  
  - *Fragile / Brittle* teeth shatter under pressure; keep drill exposure minimal.  
  - *Vampire / Ancient / Eldritch* encounters have bespoke quirks and hide unearthly rewards.
- **Anesthetic cadence:** Save it for extended drills, multi-tooth extractions, or whenever pain climbs beyond ~75%.
- **Golden rule:** *“Drill a bit, dust a bit.”* Greed wakes donors faster than anything else.

### Tooth Collection Index

Every tooth has a trigger condition. Highlights include:

- **Sparkling (Rare):** Child + Fragile trait.  
- **Glass (Rare):** Teen + Brittle trait.  
- **Sharp (Unearthly):** Vampire donors.  
- **Gemini (Unearthly):** Adults with both Fragile and Brittle traits.  
- **Watcher / Key (Unearthly):** Ancient and Eldritch homes hide the weirdest finds.  
- **Cracked / Dirty / Wooden:** Failure states or special traits that add color to the collection.

Refer to `help.md` for the full 16-item table and acquisition notes.

## Project Structure & Tech

- **Framework:** Next.js 15 (App Router), React 19, TypeScript.  
- **UI:** Tailwind CSS, Shadcn UI, Radix primitives.  
- **Data Layer:** MongoDB (with in-memory fallbacks for local development).  
- **Content:** Updated pages, blog posts, and downloads themed around The Tooth Fae.

## Getting Started

```bash
pnpm install
pnpm dev
```

Environment variables (`.env.local`):

```
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_BASE_URL=https://thetoothfae.online
```

## Deploying

1. Push to GitHub.
2. Import the repo into Vercel (or your preferred host).
3. Configure the environment variables above.
4. Deploy and enjoy your eldritch tooth-harvesting hub.

## License

This project remains proprietary. Please contact the maintainers before reusing assets or copy.
