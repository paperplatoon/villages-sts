// ====== Enemy Testing ======
// Test enemies and structures for prototyping encounters

// ====== TEST ENEMY STRUCTURES ======

let testEnemyStructures = {

  batteringRam: {
    name: "Battering Ram",
    owner: "opponent",
    maxHP: 15,
    currentHP: 15,
    encounterBlock: 0,
    effectText: "Deals 7 damage to your village each turn",
    avatar: "img/structures/enemywatchtower.png",
    onTurnEffect: async function(stateObj, index, structures) {
      let damage = 7 * (structures[index].stackCount || 1);
      stateObj = await dealPlayerDamage(stateObj, damage, 0, false, 1);
      return stateObj;
    }
  },

  miniTrebuchet: {
    name: "Mini Trebuchet",
    owner: "opponent",
    maxHP: 10,
    currentHP: 10,
    encounterBlock: 0,
    effectText: "Deals 3 damage to your village each turn",
    avatar: "img/structures/enemywatchtower.png",
    onTurnEffect: async function(stateObj, index, structures) {
      let damage = 3 * (structures[index].stackCount || 1);
      stateObj = await dealPlayerDamage(stateObj, damage, 0, false, 1);
      return stateObj;
    }
  },
}


// ====== TEST ENEMIES ======

let testEnemies = {

  // Enemy 1: Siege Camp
  // Default: 3 damage, 3 block, +2 dev
  // Dev 4: 7 damage, +1 dev
  // Dev 7: Build Battering Ram (15 HP, 7 dmg/turn)
  siegeCamp: {
    name: "Siege Camp",
    type: "Fire",
    XPGain: 10,
    goldOnDefeat: 15,
    Level: 1,
    maxHP: 30,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 30,
    encounterBlock: 0,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    treason: 0,
    baseHeal: 0,
    baseBlock: 0,
    baseDamage: 0,
    baseScale: 0,
    avatar: "img/medium/cuteearthbad.png",
    moves: [
      {
        name: "Skirmish",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${3 + array[index].strength} damage. Gain 3 fortification. +2 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 3, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += 3;
            newState.opponentMonster[index].development += 2;
          })
          return stateObj;
        }
      },
      {
        name: "Siege Strike",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${7 + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 7, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Deploy Battering Ram",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Build a Battering Ram (15 HP). Deals 7 damage each turn. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = createStructure(stateObj, testEnemyStructures.batteringRam, "opponent");
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  // Enemy 2: Outpost (simple, 25 HP)
  // Default: 4 damage, +1 dev
  // Dev 4: 8 damage, +1 dev
  // Dev 7: 14 damage, reset dev
  outpost: {
    name: "Outpost",
    type: "Earth",
    XPGain: 10,
    goldOnDefeat: 15,
    Level: 1,
    maxHP: 25,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 25,
    encounterBlock: 0,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    treason: 0,
    baseHeal: 0,
    baseBlock: 0,
    baseDamage: 0,
    baseScale: 0,
    avatar: "img/easy/cuteearth.png",
    moves: [
      {
        name: "Raid",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${4 + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 4, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Charge",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${8 + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 8, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Full Assault",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal ${14 + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 14, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  // Enemy 3: Fortifier (20 HP)
  // Default: Gain 5 fortification, +2 dev
  // Dev 4: +3 dev, build Mini Trebuchet (10 HP, 3 dmg/turn)
  // Dev 7: Kamikaze Bombers — deal 15 damage to player, 5 damage to self
  fortifier: {
    name: "Fortifier",
    type: "Water",
    XPGain: 10,
    goldOnDefeat: 15,
    Level: 1,
    maxHP: 20,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 20,
    encounterBlock: 0,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    treason: 0,
    baseHeal: 0,
    baseBlock: 0,
    baseDamage: 0,
    baseScale: 0,
    avatar: "img/easy/cutewater.png",
    moves: [
      {
        name: "Dig In",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Gain 5 fortification. +2 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += 5;
            newState.opponentMonster[index].development += 2;
          })
          return stateObj;
        }
      },
      {
        name: "Deploy Trebuchet",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Build a Mini Trebuchet (10 HP). Deals 3 damage each turn. +3 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = createStructure(stateObj, testEnemyStructures.miniTrebuchet, "opponent");
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 3;
          })
          return stateObj;
        }
      },
      {
        name: "Kamikaze Bombers",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal 15 damage to enemy village. Deal 5 damage to self. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 15, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].currentHP -= 5;
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },
}


