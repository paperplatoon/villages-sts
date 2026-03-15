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

## Key Files
- `main.js` — Core game logic, rendering, combat resolution (~4000 lines)
- `basicCardPool.js` — Main card definitions (~4100 lines)
- `CardPoolTesting.js` — Test card pool + test player monster
- `structures.js` — Structure definitions (player and enemy)
- `EnemyTesting.js` — Test enemies with development-based move system
- `style.css` — All styling
