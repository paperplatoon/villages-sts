# Village Wars - Project Instructions

## What This Is
A Slay the Spire-inspired card game with a village/kingdom warfare theme. Vanilla JS + Immer.js, no framework.

## Ongoing Conversion: Creatures → Villages
This game was originally built around creature-vs-creature battles with energy systems. It is being converted to village-vs-village warfare. The mechanics are similar but the aesthetics and naming are different. Many legacy names remain in the code from the creature era — variable names like `playerMonster`, `opponentMonster`, function names like `energyGift`, `opponentGainEnergy`, CSS classes like `.monster-block`, `.monster-hp`, and UI text. These should be updated to village-themed equivalents over time, but legacy aliases must be preserved for backward compatibility until all references are migrated. (`strength`/`dex` have been renamed to `attack`/`defense`.)

## Core Design Philosophy: Emergent Synergies
The most important principle: **cards interact with each other through shared properties and centralized resolution functions, creating multiplicative combos.**

### The Pattern
1. **Cards declare base properties** as object fields: `baseDamage`, `baseBlock`, `baseHeal`, `baseHits`, `energyDrain`, etc.
2. **Central functions resolve effects** and apply all modifiers automatically:
   - `dealOpponentDamage(stateObj, damage, attackNumber, energyCost, targetType)` — adds attack buff, checks hunted (2x), applies structure bonuses (doubleAttackDamage, extraAttackHit), triggers enemy traits (deflate, angry, shakedown, enrage)
   - `dealPlayerDamage(stateObj, damage, index, ...)` — enemy damage to player
   - `healPlayer(stateObj, amount)` — player healing
3. **New mechanics = new state flags or properties**, not new resolution logic. Structures set flags like `doubleAttackDamage`, `extraAttackHit`, `doubleBlock`. Central functions check these flags.

### Why This Matters
- A "deal 10 damage 3 times" card automatically benefits from every buff in the game
- Adding a new structure or buff doesn't require touching existing cards
- `baseDamage` can be permanently modified (upgraded, doubled) for deck-building depth
- The goal is that players discover powerful combos between cards, structures, and status effects

### When Writing New Cards/Mechanics
- **Route ALL state changes through central functions** — never modify state directly in `immer.produce` when a central function exists. This ensures reactive effects (like structures that trigger on development changes) fire automatically.
  - Damage: `dealOpponentDamage()` / `dealPlayerDamage()` / `dealStructureEffectDamage()`
  - Development: `gainDevelopment()` / `loseDevelopment()` (also `energyGift()` / `destroyEnergy()` for player-triggered changes)
  - Healing: `healPlayer()` / `healOpponent()`
  - Block: `gainBlock()`
- Add new combat modifiers as state flags checked in the central functions
- Use existing properties (`baseDamage`, `baseHits`, etc.) so cards automatically benefit from the modifier ecosystem
- Card `text` functions should dynamically calculate displayed values (e.g., `baseDamage + attack`) so the UI always shows the actual damage
- **NOTE:** The real encounter files (`easyEncounters.js`, `mediumEncounters.js`, `hardEncounters.js`, `bossEncounters.js`) still have ~280 direct `development` modifications that need to be routed through `gainDevelopment()`/`loseDevelopment()`. `EnemyTesting.js` has already been updated.

### Passive vs. Active Structures
- **Active structures** (watchtower, barricade, healingWell) use `onTurnEffect` — they do something each turn (deal damage, grant block, heal).
- **Passive structures** (seismicSpire) set state flags **on build completion** (in `buildStructureByIndex`/`buildSelectedStructure`), not via `onTurnEffect`. This ensures the effect is active immediately when the structure finishes building, not delayed until the next end-of-turn cycle. Example: `damageOnDevChange` is set the moment seismicSpire completes, so cards played that same turn benefit from it.

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
| Development (enemy energy, 0-6) | `development` |
| Attack (damage buff) | `attack` / `fightAttack` |
| Defense (block buff) | `defense` / `fightDefense` |
| Block | `encounterBlock` |

## UI Preferences
- **Minimal UI** — Avoid redundant labels, headers, and explanatory text. Let visuals and context communicate rather than adding extra words. If a card name already tells you what it builds, the card text doesn't need to repeat it. If structures are visually obvious, they don't need a "Your Structures" header.

## Structure Naming Philosophy
Structure names should be evocative, medieval, and immediately intuitive: the player should feel "of course that does that" without the name spelling out the mechanic. The best names imply the effect through a concrete in-world place or practice (Patent Office, Healer's Hut, Inventor's Workshop, Carnival Fireworks), not through literal rules text.

Avoid flat or generic labels that don't match the effect (e.g., Guard Tower, Seismic Spire). Prefer strong thematic hooks that hint at cause-and-effect without being on-the-nose, so the name itself carries the flavor and explains the behavior at a glance.

## Testing & Prototyping
- `CardPoolTesting.js` is a prototyping sandbox with test cards that mirror real cards. When changing patterns across card definitions (text format, property names, etc.), **both `basicCardPool.js` and `CardPoolTesting.js` must be updated** to stay in sync.

## Backward Compatibility
- Preserve old animation selectors and function aliases during refactors. Classes like `.avatar`, `.monster-hp`, `.monster-top-row` exist on new elements specifically so existing animation code (`opponentDeathAnimation`, damage flash, etc.) keeps working.
- Legacy function aliases (`opponentGainEnergy()` → `gainDevelopment()`, `energyGift()`, `destroyEnergy()`) must be kept so older card code still functions.

## Animation Philosophy
- Every game action should have clear visual feedback: source glows/activates → visual effect travels to target → target reacts
- Animations should be snappy (0.3–0.5s) and never slow down gameplay

### The Critical Rule: Animate → State → Render
`changeState()` calls `renderScreen()` which **destroys and rebuilds the entire DOM**. Any in-flight animation elements (projectile divs, glow classes) are destroyed instantly. Therefore:
- **All animations must COMPLETE before any `changeState` call.** The sequence is always: play animation → `await pause()` → apply state via `immer.produce` → `changeState` to render.
- **Never put animation code inside functions that also call `changeState`.** If a function needs both animation and state changes, animate first, then change state.
- **Never use `async` inside `immer.produce`.** Immer producers are synchronous. `await` inside a producer causes the producer to return before the await resolves, creating race conditions with DOM animations.
- **State must be fully resolved before `changeState`.** If you change a field that other fields derive from (e.g., `development` → `opponentMoveIndex`), update the derived fields *immediately* — not after a later `changeState`. Every `changeState` call rebuilds the entire DOM from `stateObj`, so any stale derived state will briefly render on screen, causing flicker.

### Projectile Animation Pattern
The only reliable projectile pattern is **pre-created divs + CSS keyframe animations**:
1. Pre-create fireball divs during `renderScreen` (they exist in the DOM before animation starts)
2. Append to `#stats` (shared ancestor, escapes stacking contexts)
3. Position with CSS percentages, start `visibility: hidden`
4. Animate with `@keyframes` using `transform: translate()` + `visibility: visible`
5. Trigger by adding a class, clean up by removing it

**Do NOT** dynamically create divs with JS-calculated `left`/`top` positions and CSS transitions — this approach is fragile and has repeatedly failed.

### Other Animation Patterns
- Use **add-class → pause → remove-class** for sequenced animations, or **fire-and-forget** (add class before `immer.produce`, DOM rebuild on `changeState` removes it naturally) for synchronous functions
- CSS animations that should hold their end state need `animation-fill-mode: forwards` (not `animation-direction: forwards`)
- Enemy attack projectiles (purple) mirror player fireballs (orange) but fly right-to-left
- Structure activation uses a golden glow so players can see which structure fired
- Stat changes pulse the relevant display element — use `animateStatChange(selector, "up"|"down"|"neutral")`
- `gainBlock()` and `healPlayer()` use fire-and-forget pulses; first block gain of a turn won't animate (element doesn't exist yet — the number appearing is itself feedback)

### Structure Animations: Two Systems
- **Active structures** (onTurnEffect): animated by `fireStructureEffects` which handles glow → projectile → impact centrally, then calls `onTurnEffect` for pure state changes. Structures declare `projectileTarget: "opponent"` or `"opponent-all"` to get projectiles; structures without it get glow-only.
- **Passive/reactive structures** (state flags like `damageOnDevChange`): animated by `animatePassiveStructure(stateObj, propertyName)` called from the central function where the trigger is checked (e.g., `gainDevelopment`/`loseDevelopment`). These structures have NO `onTurnEffect` — they set flags on build completion and react through central resolution functions.
- **Structure fireball divs**: Pre-created for ALL completed structures (not just active ones), 6 slots with CSS position classes (`.structure-fireball-slot-0` through `-5`). Both active and passive structures can use them.

### Debugging Approach
- When first fix doesn't work, **immediately add console.log** to verify execution paths and values. Don't make multiple guesses — logs reveal the actual problem faster.

## Key Files
- `main.js` — Core game logic, rendering, combat resolution (~4000 lines)
- `basicCardPool.js` — Main card definitions (~4100 lines)
- `CardPoolTesting.js` — Test card pool + test player monster
- `structures.js` — Structure definitions (player and enemy)
- `EnemyTesting.js` — Test enemies with development-based move system
- `style.css` — All styling

## To-Do
- Fully convert names, variables, CSS classes, and UI text from creature/monster/energy terminology to village/warfare terminology

- Fix player card animations so they deal right to left
- add card rarity system
- Change encounter enemies to be more like villages and less like craetures.
- ~~come up with names for strength, dex~~ (done: renamed to attack/defense)
- Route remaining ~280 direct `development` modifications in encounter files (`easyEncounters.js`, `mediumEncounters.js`, `hardEncounters.js`, `bossEncounters.js`) through `gainDevelopment()`/`loseDevelopment()`
