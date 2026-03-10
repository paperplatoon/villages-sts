// ====== Testing Card Pool ======
// Simple cards for testing and prototyping new mechanics.
// Each card demonstrates a system. Copy and remix to create new cards.
//
// ====== SYSTEMS REFERENCE ======
// Each system uses a PROPERTY on the card + a FUNCTION call in the action.
// This means global modifiers (like "reduce all tribute by 5") work automatically.
//
// SYSTEM           | CARD PROPERTY        | FUNCTION TO CALL                         | MODIFIABLE STATE VAR
// -----------------|----------------------|------------------------------------------|---------------------
// Damage           | baseDamage, baseHits | dealOpponentDamage(state, dmg, hits, cost, targetType) | strength (adds to dmg)
// Block            | baseBlock            | gainBlock(state, amount, cost)            | dex (adds to block)
// Structures       | cardType:"structure" | createStructure(state, structDef, "player") | buildCost on struct def
// Build Progress   | buildAmount          | buildSelectedStructure(state, amount)     | selectedPlayerStructure
// Treason          | treasonAmount        | applyTreason(state, amount)               | treason on enemy (ticks up each turn)
// Diplomacy        | diplomacyAmount      | gainDiplomacy(state, amount)              | diplomacy, diplomacyThreshold
// Tribute          | tribute              | payTribute(state, amount)                 | tributeDiscount (reduces cost)
// Destroy Dev      | devDestroy           | destroyEnergy(state, amount, cost, all)   | development on enemy
// Gift Dev         | devGift              | energyGift(state, amount, cost, all)      | development on enemy
// =====================================================================================================

let testCardPool = {

  // ====== DAMAGE ======
  // Animation sequence for attack cards:
  //   1. await addDiscardAnimation(index)
  //   2. await addDealOpponentDamageAnimation(stateObj, damage, isAll)
  //   3. await pause(350)
  //   4. await finishDiscardAnimation(index)
  //   5. await removeDealOpponentDamageAnimation(stateObj, damage, isAll)
  //   6. stateObj = await dealOpponentDamage(state, damage, hits, cost, targetType)
  // targetType: "front" (first enemy), "specific" (targeted), "all" (AOE)
  testStrike: {
    cardID: 300,
    name: "Raid",
    baseDamage: 5,
    baseHits: 1,
    text: (state, index, array) => {
      return `Deal ${array[index].baseDamage + state.playerMonster.strength} damage`
    },
    minReq: (state, index, array) => { return array[index].baseCost; },
    upgrades: 0,
    baseCost: 1,
    cost: (state, index, array) => { return array[index].baseCost; },
    cardType: "attack",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await addDiscardAnimation(index);
      await addDealOpponentDamageAnimation(stateObj, array[index].baseDamage);
      await pause(350);
      await finishDiscardAnimation(index);
      await removeDealOpponentDamageAnimation(stateObj, array[index].baseDamage);
      stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage, array[index].baseHits, array[index].baseCost, "front");
      return stateObj;
    }
  },

  // ====== BLOCK (FORTIFICATION) ======
  // gainBlock(state, blockAmount, energyCost)
  testBlock: {
    cardID: 301,
    name: "Fortify",
    baseBlock: 5,
    text: (state, index, array) => {
      return `Gain ${array[index].baseBlock + state.playerMonster.dex} fortification`
    },
    minReq: (state, index, array) => { return array[index].baseCost; },
    upgrades: 0,
    baseCost: 1,
    cost: (state, index, array) => { return array[index].baseCost; },
    cardType: "ability",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = gainBlock(stateObj, array[index].baseBlock, array[index].baseCost);
      return stateObj;
    }
  },

  // ====== STRUCTURE (BUILDING) ======
  // createStructure(state, structureDefinitions.XXXX, "player")
  // Structure definitions live in structures.js. cardType must be "structure".
  // Cards are FREE to play. Player spends villagers via Build button over time.
  testTower: {
    cardID: 302,
    name: "Guard Tower",
    text: (state, index, array) => {
      return `Build a Guard Tower. Deals 4 damage to targeted enemy each turn. (Build cost: ${structureDefinitions.testTower.buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, structureDefinitions.testTower, "player");
      return stateObj;
    }
  },

  testWall: {
    cardID: 303,
    name: "Great Wall",
    text: (state, index, array) => {
      return `Build a Great Wall. Grants 6 fortification each turn. (Build cost: ${structureDefinitions.testWall.buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, structureDefinitions.testWall, "player");
      return stateObj;
    }
  },

  // ====== ESCALATING STRUCTURE ======
  // Deals damage that doubles each turn. Damage tracked on the structure instance itself.
  testCannon: {
    cardID: 311,
    name: "Escalating Cannon",
    text: (state, index, array) => {
      return `Build an Escalating Cannon. Deals 2 damage to all enemies each turn, doubling each turn. (Build cost: ${structureDefinitions.escalatingCannon.buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, structureDefinitions.escalatingCannon, "player");
      return stateObj;
    }
  },

  // ====== BLOCK DOUBLING STRUCTURE ======
  // Sets doubleBlock flag + directly doubles encounterBlock at end of turn.
  testFortress: {
    cardID: 312,
    name: "Fortress Wall",
    text: (state, index, array) => {
      return `Build a Fortress Wall. Doubles your fortification at end of turn. (Build cost: ${structureDefinitions.fortressWall.buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, structureDefinitions.fortressWall, "player");
      return stateObj;
    }
  },

  // ====== EXTRA HIT STRUCTURE ======
  // Sets extraAttackHit flag. dealOpponentDamage adds +1 to attackNumber.
  testDrums: {
    cardID: 313,
    name: "War Drums",
    text: (state, index, array) => {
      return `Build War Drums. Your attacks hit an extra time. (Build cost: ${structureDefinitions.warDrums.buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, structureDefinitions.warDrums, "player");
      return stateObj;
    }
  },

  // ====== DOUBLE DAMAGE STRUCTURE ======
  // Sets doubleAttackDamage flag. dealOpponentDamage doubles damageNumber.
  testWorkshop: {
    cardID: 314,
    name: "Siege Workshop",
    text: (state, index, array) => {
      return `Build a Siege Workshop. Your attacks deal double damage. (Build cost: ${structureDefinitions.siegeWorkshop.buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, structureDefinitions.siegeWorkshop, "player");
      return stateObj;
    }
  },

  // ====== BUILD PROGRESS (from card effect) ======
  // buildSelectedStructure(state, amount) — adds build progress to selected structure
  // Combine with other effects for multi-purpose cards
  testResearch: {
    cardID: 307,
    name: "Military Research",
    baseDamage: 4,
    baseHits: 1,
    buildAmount: 1,
    text: (state, index, array) => {
      return `Deal ${array[index].baseDamage + state.playerMonster.strength} damage. Build ${array[index].buildAmount} on selected structure`
    },
    minReq: (state, index, array) => { return array[index].baseCost; },
    upgrades: 0,
    baseCost: 1,
    cost: (state, index, array) => { return array[index].baseCost; },
    cardType: "attack",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await addDiscardAnimation(index);
      await addDealOpponentDamageAnimation(stateObj, array[index].baseDamage);
      await pause(350);
      await finishDiscardAnimation(index);
      await removeDealOpponentDamageAnimation(stateObj, array[index].baseDamage);
      stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage, array[index].baseHits, array[index].baseCost, "front");
      stateObj = buildSelectedStructure(stateObj, array[index].buildAmount);
      return stateObj;
    }
  },

  // ====== AOE DAMAGE ======
  // Same as damage but targetType: "all"
  testAOE: {
    cardID: 304,
    name: "Firestorm",
    baseDamage: 7,
    baseHits: 1,
    text: (state, index, array) => {
      return `Deal ${array[index].baseDamage + state.playerMonster.strength} damage to ALL enemies`
    },
    minReq: (state, index, array) => { return array[index].baseCost; },
    upgrades: 0,
    baseCost: 2,
    cost: (state, index, array) => { return array[index].baseCost; },
    cardType: "attack",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await addDiscardAnimation(index);
      await addDealOpponentDamageAnimation(stateObj, array[index].baseDamage, true);
      await pause(350);
      await finishDiscardAnimation(index);
      await removeDealOpponentDamageAnimation(stateObj, array[index].baseDamage, true);
      stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage, array[index].baseHits, array[index].baseCost, "all");
      return stateObj;
    }
  },

  // ====== DESTROY DEVELOPMENT ======
  // destroyEnergy(state, amountToDestroy, villagerCost, all)
  // all=false targets selected enemy, all=true hits all enemies
  testSabotage: {
    cardID: 305,
    name: "Saboteurs",
    baseDamage: 2,
    baseHits: 1,
    devDestroy: 1,
    text: (state, index, array) => {
      return `Deal ${array[index].baseDamage + state.playerMonster.strength} damage. Destroy ${array[index].devDestroy} enemy development`
    },
    minReq: (state, index, array) => { return array[index].baseCost; },
    upgrades: 0,
    baseCost: 1,
    cost: (state, index, array) => { return array[index].baseCost; },
    cardType: "attack",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await addDiscardAnimation(index);
      await addDealOpponentDamageAnimation(stateObj, array[index].baseDamage);
      await pause(350);
      await finishDiscardAnimation(index);
      await removeDealOpponentDamageAnimation(stateObj, array[index].baseDamage);
      stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage, array[index].baseHits, array[index].baseCost, "front");
      stateObj = await destroyEnergy(stateObj, array[index].devDestroy, false, false);
      return stateObj;
    }
  },

  // ====== GIFT DEVELOPMENT (to enemy) ======
  // energyGift(state, amountToGift, villagerCost, all)
  // Downside cards that give enemy dev in exchange for strong effects
  testPact: {
    cardID: 306,
    name: "Uneasy Pact",
    baseBlock: 12,
    devGift: 1,
    text: (state, index, array) => {
      return `Gain ${array[index].baseBlock + state.playerMonster.dex} fortification. Enemy gains ${array[index].devGift} development`
    },
    minReq: (state, index, array) => { return array[index].baseCost; },
    upgrades: 0,
    baseCost: 1,
    cost: (state, index, array) => { return array[index].baseCost; },
    cardType: "ability",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = gainBlock(stateObj, array[index].baseBlock, array[index].baseCost);
      stateObj = await energyGift(stateObj, array[index].devGift, false, false);
      return stateObj;
    }
  },

  // ====== TREASON ======
  // applyTreason(state, amount, targetIndex)
  // Treason ticks UP by 1 each turn. Snowballing damage-over-time.
  // targetIndex is optional — defaults to stateObj.targetedMonster
  testTreason: {
    cardID: 308,
    name: "Incite Treason",
    treasonAmount: 1,
    text: (state, index, array) => {
      return `Apply ${array[index].treasonAmount} treason to targeted enemy`
    },
    minReq: (state, index, array) => { return array[index].baseCost; },
    upgrades: 0,
    baseCost: 1,
    cost: (state, index, array) => { return array[index].baseCost; },
    cardType: "ability",
    elementType: "water",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = immer.produce(stateObj, (newState) => {
        newState.playerMonster.encounterEnergy -= array[index].baseCost;
      });
      stateObj = applyTreason(stateObj, array[index].treasonAmount);
      return stateObj;
    }
  },

  // ====== DIPLOMACY ======
  // gainDiplomacy(state, amount)
  // When diplomacy >= diplomacyThreshold, auto-win the fight.
  // Threshold starts at 3, increases by 1 each diplomacy win.
  testDiplomacy: {
    cardID: 309,
    name: "Send Envoy",
    diplomacyAmount: 1,
    text: (state, index, array) => {
      return `Gain ${array[index].diplomacyAmount} diplomacy`
    },
    minReq: (state, index, array) => { return array[index].baseCost; },
    upgrades: 0,
    baseCost: 1,
    cost: (state, index, array) => { return array[index].baseCost; },
    cardType: "ability",
    elementType: "water",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = immer.produce(stateObj, (newState) => {
        newState.playerMonster.encounterEnergy -= array[index].baseCost;
      });
      stateObj = await gainDiplomacy(stateObj, array[index].diplomacyAmount);
      return stateObj;
    }
  },

  // ====== TRIBUTE ======
  // Card property: tribute (gold cost). Checked automatically for playability.
  // payTribute(state, tributeAmount) — subtracts gold after tributeDiscount.
  // getEffectiveTribute(state, amount) — returns cost after discount (for display).
  // canAffordTribute(state, amount) — checked automatically by card rendering.
  testTribute: {
    cardID: 310,
    name: "Mercenary Assault",
    tribute: 10,
    baseDamage: 20,
    baseHits: 1,
    text: (state, index, array) => {
      let cost = getEffectiveTribute(state, array[index].tribute);
      return `Pay ${cost} tribute. Deal ${array[index].baseDamage + state.playerMonster.strength} damage`
    },
    minReq: (state, index, array) => { return array[index].baseCost; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return array[index].baseCost; },
    cardType: "attack",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await addDiscardAnimation(index);
      stateObj = await payTribute(stateObj, array[index].tribute);
      await addDealOpponentDamageAnimation(stateObj, array[index].baseDamage);
      await pause(350);
      await finishDiscardAnimation(index);
      await removeDealOpponentDamageAnimation(stateObj, array[index].baseDamage);
      stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage, array[index].baseHits, false, "front");
      return stateObj;
    }
  },
}


// ====== Test Player Monster (Coastal Settlement) ======
let testPlayerMonster = {
  name: "Coastal Settlement",
  type: "water",
  cardPool: testCardPool,
  encounterEnergy: 0,
  startingEnergy: 0,
  encounterBlock: 0,
  opponentMoveIndex: false,
  maxHP: 50,
  currentHP: 50,
  strength: 0,
  dex: 0,
  tempStrength: 0,
  tempDex: 0,
  fightStrength: 0,
  fightDex: 0,
  turnEnergy: 3,
  turnCards: 6,
  avatar: "img/watertongue.png",
  startingDeck: [
    testCardPool.testStrike,
    testCardPool.testStrike,
    testCardPool.testBlock,
    testCardPool.testBlock,
    testCardPool.testTower,
    testCardPool.testWall,
    testCardPool.testAOE,
    testCardPool.testSabotage,
    testCardPool.testPact,
    testCardPool.testResearch,
    testCardPool.testTreason,
    testCardPool.testDiplomacy,
    testCardPool.testTribute,
    testCardPool.testCannon,
    testCardPool.testFortress,
    testCardPool.testDrums,
    testCardPool.testWorkshop,
  ]
}
