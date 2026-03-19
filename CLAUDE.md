# Village Wars - Project Instructions

## What This Is
A Slay the Spire-inspired card game with a village/kingdom warfare theme. Vanilla JS + Immer.js, no framework.

## Core Design Philosophy: Emergent Synergies
The most important principle: **cards interact with each other through shared properties and centralized resolution functions, creating multiplicative combos.**

### The Pattern
1. **Cards declare base properties** as object fields: `baseDamage`, `baseBlock`, `baseHeal`, `baseHits`, `energyDrain`, etc.
2. **Central functions resolve effects** and apply all modifiers automatically:
   - `dealOpponentDamage(stateObj, damage, attackNumber, energyCost, targetType)` — adds militia (strength), checks hunted (2x), applies structure bonuses (doubleAttackDamage, extraAttackHit), triggers enemy traits (deflate, angry, shakedown, enrage)
   - `dealPlayerDamage(stateObj, damage, index, ...)` — enemy damage to player
   - `healPlayer(stateObj, amount)` — player healing
3. **New mechanics = new state flags or properties**, not new resolution logic. Structures set flags like `doubleAttackDamage`, `extraAttackHit`, `doubleBlock`. Central functions check these flags.

### Why This Matters
- A "deal 10 damage 3 times" card automatically benefits from every buff in the game
- Adding a new structure or buff doesn't require touching existing cards
- `baseDamage` can be permanently modified (upgraded, doubled) for deck-building depth
- The goal is that players discover powerful combos between cards, structures, and status effects

### When Writing New Cards/Mechanics
- Always route damage through `dealOpponentDamage()` / `dealPlayerDamage()` — never hardcode damage math in individual cards
- Add new combat modifiers as state flags checked in the central functions
- Use existing properties (`baseDamage`, `baseHits`, etc.) so cards automatically benefit from the modifier ecosystem
- Card `text` functions should dynamically calculate displayed values (e.g., `baseDamage + strength`) so the UI always shows the actual damage

## Card Properties & Mutability

**All gameplay-relevant values belong on the card object, not on external definitions.** This includes `baseDamage`, `baseBlock`, `baseCost`, `baseHits`, `buildCost`, etc.

### Why
- Card objects can be modified per-card during a run (events, upgrades, discounts). If a value lives on an external definition (like `structureDefinitions.watchtower.buildCost`), you can't discount one copy of a card without affecting all copies.
- Card text functions read values via `array[index].propertyName`, so the UI always reflects the current value automatically.
- Immer isolates combat changes for free: `encounterHand`/`encounterDeck` start as shallow copies of `playerDeck` sharing the same card object references, but the moment Immer mutates a card through one path, it forks into a separate copy. So combat-only changes (like temporarily increasing damage) don't persist to `playerDeck` unless you explicitly write to both.

### The Pattern
1. **Declare values as card properties**: `baseCost: 2`, `buildCost: 3`, `baseDamage: 5`
2. **Read via `array[index]`** in both `text` and `action` functions — never hardcode numbers or read from external definitions
3. **Combat-only changes**: Just mutate `encounterHand[index]` — Immer isolates it automatically
4. **Persistent changes** (should survive combat): Must explicitly update `playerDeck` too:
   ```js
   newState.encounterHand[index].baseDamage += 5;
   newState.playerDeck.find(card => card.name === array[index].name).baseDamage += 5;
   ```
5. **Structure cards**: `buildCost` lives on the card. The card action passes it through to `createStructure` (which copies it onto the structure instance).

## Theme Glossary
| Game Term | Internal Variable |
|---|---|
| Villagers (player energy) | `encounterEnergy` |
| Development (enemy energy, 0-7) | `development` |
| Militia (player strength) | `strength` / `fightStrength` |
| Walls (player dex) | `dex` / `fightDex` |
| Fortification (block) | `encounterBlock` |

## UI Preferences
- **Minimal UI** — Avoid redundant labels, headers, and explanatory text. Let visuals and context communicate rather than adding extra words. If a card name already tells you what it builds, the card text doesn't need to repeat it. If structures are visually obvious, they don't need a "Your Structures" header.

## Testing & Prototyping
- `CardPoolTesting.js` is a prototyping sandbox with test cards that mirror real cards. When changing patterns across card definitions (text format, property names, etc.), **both `basicCardPool.js` and `CardPoolTesting.js` must be updated** to stay in sync.

## Backward Compatibility
- Preserve old animation selectors and function aliases during refactors. Classes like `.avatar`, `.monster-hp`, `.monster-top-row` exist on new elements specifically so existing animation code (`opponentDeathAnimation`, damage flash, etc.) keeps working.
- Legacy function aliases (`opponentGainEnergy()` → `gainDevelopment()`, `energyGift()`, `destroyEnergy()`) must be kept so older card code still functions.

## Animation Philosophy
- Every game action should have clear visual feedback: source glows/activates → visual effect travels to target → target reacts
- Animations should be snappy (0.3–0.5s) and never slow down gameplay
- Use the **add-class → pause → remove-class** pattern for sequenced animations, or **fire-and-forget** (add class before `immer.produce`, DOM rebuild on `changeState` removes it naturally) for synchronous functions
- Enemy attack projectiles (purple) mirror player fireballs (orange) but fly right-to-left
- Structure activation uses a golden glow so players can see which structure fired
- Stat changes pulse the relevant display element — use `animateStatChange(selector, "up"|"down"|"neutral")`
- `gainBlock()` and `healPlayer()` use fire-and-forget pulses; first block gain of a turn won't animate (element doesn't exist yet — the number appearing is itself feedback)

## Key Files
- `main.js` — Core game logic, rendering, combat resolution (~4000 lines)
- `basicCardPool.js` — Main card definitions (~4100 lines)
- `CardPoolTesting.js` — Test card pool + test player monster
- `structures.js` — Structure definitions (player and enemy)
- `EnemyTesting.js` — Test enemies with development-based move system
- `style.css` — All styling
