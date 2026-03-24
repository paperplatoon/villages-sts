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
      let damage = 7;
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
      let damage = 3;
      stateObj = await dealPlayerDamage(stateObj, damage, 0, false, 1);
      return stateObj;
    }
  },

  warDrums: {
    name: "War Drums",
    owner: "opponent",
    maxHP: 12,
    currentHP: 12,
    encounterBlock: 0,
    effectText: "Grants 1 attack each turn",
    avatar: "img/structures/enemywatchtower.png",
    onTurnEffect: async function(stateObj, index, structures) {
      let stacks = 1;
      stateObj = immer.produce(stateObj, (newState) => {
        newState.opponentMonster.forEach(function (monster) {
          monster.attack += stacks;
        })
      })
      return stateObj;
    }
  },

  guardTower: {
    name: "Guard Tower",
    owner: "opponent",
    maxHP: 6,
    currentHP: 6,
    encounterBlock: 0,
    effectText: "Deals 3 damage to your village each turn",
    avatar: "img/structures/enemywatchtower.png",
    onTurnEffect: async function(stateObj, index, structures) {
      let damage = 3;
      stateObj = await dealPlayerDamage(stateObj, damage, 0, false, 1);
      return stateObj;
    }
  },

  spikedWall: {
    name: "Spiked Wall",
    owner: "opponent",
    maxHP: 14,
    currentHP: 14,
    encounterBlock: 0,
    effectText: "Grants 4 fortification each turn",
    avatar: "img/structures/enemybarricade.png",
    onTurnEffect: async function(stateObj, index, structures) {
      let stacks = 1;
      stateObj = immer.produce(stateObj, (newState) => {
        newState.opponentMonster.forEach(function (monster) {
          monster.encounterBlock += 4 * stacks;
        })
      })
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
    maxHP: 35,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 35,
    encounterBlock: 0,
    attack: 0,
    defense: 0,
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
          return `Deal ${3 + array[index].attack} damage. Gain 3 fortification. +[EE:2]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 3, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += 3;
          })
          stateObj = await gainDevelopment(stateObj, 2, index);
          return stateObj;
        }
      },
      {
        name: "Siege Strike",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${7 + array[index].attack} damage. +[EE:1]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 7, index, false, 1);
          stateObj = await gainDevelopment(stateObj, 1, index);
          return stateObj;
        }
      },
      {
        name: "Deploy Battering Ram",
        devRequirement: 6,
        text: (state, index, array) => {
          return `Build a Battering Ram (15 HP). Deals 7 damage each turn. Reset [EE]`
        },
        action: async (stateObj, index, array) => {
          stateObj = createStructure(stateObj, testEnemyStructures.batteringRam, "opponent");
          let currentDev = stateObj.opponentMonster[index].development;
          if (currentDev > 0) {
            stateObj = await loseDevelopment(stateObj, currentDev, index);
          }
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
    maxHP: 40,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 40,
    encounterBlock: 0,
    attack: 0,
    defense: 0,
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
          return `Deal ${4 + array[index].attack} damage. +[EE:2]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 4, index, false, 1);
          stateObj = await gainDevelopment(stateObj, 2, index);
          return stateObj;
        }
      },
      {
        name: "Charge",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${8 + array[index].attack} damage. +[EE:1]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 8, index, false, 1);
          stateObj = await gainDevelopment(stateObj, 1, index);
          return stateObj;
        }
      },
      {
        name: "Full Assault",
        devRequirement: 6,
        text: (state, index, array) => {
          return `Deal ${14 + array[index].attack} damage. Reset [EE]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 14, index, false, 1);
          let currentDev = stateObj.opponentMonster[index].development;
          if (currentDev > 0) {
            stateObj = await loseDevelopment(stateObj, currentDev, index);
          }
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
    maxHP: 35,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 35,
    encounterBlock: 0,
    attack: 0,
    defense: 0,
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
          return `Gain 5 fortification. +[EE:2]`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += 5;
          })
          stateObj = await gainDevelopment(stateObj, 2, index);
          return stateObj;
        }
      },
      {
        name: "Deploy Trebuchet",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Build a Mini Trebuchet (10 HP). Deals 3 damage each turn. +[EE:3]`
        },
        action: async (stateObj, index, array) => {
          stateObj = createStructure(stateObj, testEnemyStructures.miniTrebuchet, "opponent");
          stateObj = await gainDevelopment(stateObj, 2, index);
          return stateObj;
        }
      },
      {
        name: "Kamikaze Bombers",
        devRequirement: 6,
        text: (state, index, array) => {
          return `Deal 15 damage to enemy village. Deal 5 damage to self. Reset [EE]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 15, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].currentHP -= 5;
          })
          let currentDev = stateObj.opponentMonster[index].development;
          if (currentDev > 0) {
            stateObj = await loseDevelopment(stateObj, currentDev, index);
          }
          return stateObj;
        }
      }
    ]
  },

  // Enemy 4: Raider Camp (22 HP) — beginner
  // Simple attacker, fast dev gain, teaches "kill it before dev 7"
  // Default: 5 damage, +2 dev
  // Dev 4: 6 damage x2, +1 dev
  // Dev 7: 18 damage, reset dev
  raiderCamp: {
    name: "Raider Camp",
    type: "Fire",
    XPGain: 10,
    goldOnDefeat: 15,
    Level: 1,
    maxHP: 51,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 51,
    encounterBlock: 0,
    attack: 0,
    defense: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    treason: 0,
    baseHeal: 0,
    baseBlock: 0,
    baseDamage: 0,
    baseScale: 0,
    avatar: "img/easy/hornsfire.png",
    moves: [
      {
        name: "Pillage",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${6 + array[index].attack} damage. +[EE:2]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 5, index, false, 1);
          stateObj = await gainDevelopment(stateObj, 2, index);
          return stateObj;
        }
      },
      {
        name: "Double Raid",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${6 + array[index].attack} damage x2. +[EE:1]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 6, index, false, 1);
          stateObj = await dealPlayerDamage(stateObj, 6, index, false, 1);
          stateObj = await gainDevelopment(stateObj, 1, index);
          return stateObj;
        }
      },
      {
        name: "Raze",
        devRequirement: 6,
        text: (state, index, array) => {
          return `Deal ${18 + array[index].attack} damage. Reset [EE]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 18, index, false, 1);
          let currentDev = stateObj.opponentMonster[index].development;
          if (currentDev > 0) {
            stateObj = await loseDevelopment(stateObj, currentDev, index);
          }
          return stateObj;
        }
      }
    ]
  },

  // Enemy 5: Watchtower (28 HP) — beginner
  // Defensive enemy, teaches "block isn't enough, need damage"
  // Default: Gain 4 fortification, deal 2 damage, +1 dev
  // Dev 4: Gain 6 fortification, deal 5 damage, +2 dev
  // Dev 7: Gain 10 fortification, deal 10 damage, reset dev
  watchtower: {
    name: "Watchtower",
    type: "Earth",
    XPGain: 10,
    goldOnDefeat: 15,
    Level: 1,
    maxHP: 45,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 45,
    encounterBlock: 0,
    attack: 0,
    defense: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    treason: 0,
    baseHeal: 0,
    baseBlock: 0,
    baseDamage: 0,
    baseScale: 0,
    avatar: "img/easy/waterhelmet.png",
    moves: [
      {
        name: "Stand Guard",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Gain 2 fortification. Deal ${6 + array[index].attack} damage. +[EE:2]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 2, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += 4;
          })
          stateObj = await gainDevelopment(stateObj, 1, index);
          return stateObj;
        }
      },
      {
        name: "Arrow Volley",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Gain 6 fortification. Deal ${7 + array[index].attack} damage. +[EE:2]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 5, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += 6;
          })
          stateObj = await gainDevelopment(stateObj, 2, index);
          return stateObj;
        }
      },
      {
        name: "Fortified Barrage",
        devRequirement: 6,
        text: (state, index, array) => {
          return `Gain 10 fortification. Deal ${11 + array[index].attack} damage. Reset [EE]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 10, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += 10;
          })
          let currentDev = stateObj.opponentMonster[index].development;
          if (currentDev > 0) {
            stateObj = await loseDevelopment(stateObj, currentDev, index);
          }
          return stateObj;
        }
      }
    ]
  },

  // ====== MODERATE ENEMIES ======

  // Moderate 1: War Camp (40 HP)
  // Gains attack over time, hits harder and harder
  // Default: Deal 4 damage, gain 1 attack, +1 dev
  // Dev 4: Deal 8 damage, gain 2 attack, +2 dev
  // Dev 7: Build War Drums (grants 1 attack/turn), reset dev
  warCamp: {
    name: "War Camp",
    type: "Fire",
    XPGain: 15,
    goldOnDefeat: 20,
    Level: 1,
    maxHP: 40,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 40,
    encounterBlock: 0,
    attack: 0,
    defense: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    treason: 0,
    baseHeal: 0,
    baseBlock: 0,
    baseDamage: 0,
    baseScale: 0,
    avatar: "img/medium/firecat5.png",
    moves: [
      {
        name: "Rally Troops",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${4 + array[index].attack} damage. Gain 1 attack. +[EE:1]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 4, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].attack += 1;
          })
          stateObj = await gainDevelopment(stateObj, 1, index);
          return stateObj;
        }
      },
      {
        name: "War Cry",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${8 + array[index].attack} damage. Gain 2 attack. +[EE:2]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 8, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].attack += 2;
          })
          stateObj = await gainDevelopment(stateObj, 2, index);
          return stateObj;
        }
      },
      {
        name: "Sound the War Drums",
        devRequirement: 6,
        text: (state, index, array) => {
          return `Build War Drums (12 HP). Grants 1 attack each turn. Reset [EE]`
        },
        action: async (stateObj, index, array) => {
          stateObj = createStructure(stateObj, testEnemyStructures.warDrums, "opponent");
          let currentDev = stateObj.opponentMonster[index].development;
          if (currentDev > 0) {
            stateObj = await loseDevelopment(stateObj, currentDev, index);
          }
          return stateObj;
        }
      }
    ]
  },

  // Moderate 2: Armored Garrison (45 HP)
  // Tanky, slow dev, blocks a lot, punishes if you let it reach dev 7
  // Default: Gain 8 fortification, +1 dev
  // Dev 4: Deal 6 damage, gain 6 fortification, +2 dev
  // Dev 7: Build Spiked Wall (grants 4 fort/turn), deal 12 damage, reset dev
  armoredGarrison: {
    name: "Armored Garrison",
    type: "Earth",
    XPGain: 15,
    goldOnDefeat: 20,
    Level: 1,
    maxHP: 45,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 45,
    encounterBlock: 0,
    attack: 0,
    defense: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    treason: 0,
    baseHeal: 0,
    baseBlock: 0,
    baseDamage: 0,
    baseScale: 0,
    avatar: "img/medium/earthpsycho.png",
    moves: [
      {
        name: "Reinforce",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Gain 8 fortification. +[EE:1]`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += 8;
          })
          stateObj = await gainDevelopment(stateObj, 1, index);
          return stateObj;
        }
      },
      {
        name: "Garrison Strike",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${6 + array[index].attack} damage. Gain 6 fortification. +[EE:2]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 6, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += 6;
          })
          stateObj = await gainDevelopment(stateObj, 2, index);
          return stateObj;
        }
      },
      {
        name: "Fortify and Crush",
        devRequirement: 6,
        text: (state, index, array) => {
          return `Build Spiked Wall (14 HP, 4 fort/turn). Deal ${12 + array[index].attack} damage. Reset [EE]`
        },
        action: async (stateObj, index, array) => {
          stateObj = createStructure(stateObj, testEnemyStructures.spikedWall, "opponent");
          stateObj = await dealPlayerDamage(stateObj, 12, index, false, 1);
          let currentDev = stateObj.opponentMonster[index].development;
          if (currentDev > 0) {
            stateObj = await loseDevelopment(stateObj, currentDev, index);
          }
          return stateObj;
        }
      }
    ]
  },

  // Moderate 3: Plague Village (35 HP)
  // Applies poison, wears you down over time
  // NOTE: player poison resolution doesn't exist yet — poison is set but won't tick damage until that's added
  // Default: Deal 3 damage, apply 2 poison, +2 dev
  // Dev 4: Deal 5 damage, apply 4 poison, +1 dev
  // Dev 7: Deal 10 damage, apply 6 poison, reset dev
  plagueVillage: {
    name: "Plague Village",
    type: "Water",
    XPGain: 15,
    goldOnDefeat: 20,
    Level: 1,
    maxHP: 35,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 35,
    encounterBlock: 0,
    attack: 0,
    defense: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    treason: 0,
    baseHeal: 0,
    baseBlock: 0,
    baseDamage: 0,
    baseScale: 0,
    avatar: "img/medium/pricklefish.png",
    moves: [
      {
        name: "Spread Plague",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${3 + array[index].attack} damage. Apply 2 poison. +[EE:2]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 3, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.poison += 2;
          })
          stateObj = await gainDevelopment(stateObj, 2, index);
          return stateObj;
        }
      },
      {
        name: "Toxic Assault",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${5 + array[index].attack} damage. Apply 4 poison. +[EE:1]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 5, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.poison += 4;
          })
          stateObj = await gainDevelopment(stateObj, 1, index);
          return stateObj;
        }
      },
      {
        name: "Pandemic",
        devRequirement: 6,
        text: (state, index, array) => {
          return `Deal ${10 + array[index].attack} damage. Apply 6 poison. Reset [EE]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 10, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.poison += 6;
          })
          let currentDev = stateObj.opponentMonster[index].development;
          if (currentDev > 0) {
            stateObj = await loseDevelopment(stateObj, currentDev, index);
          }
          return stateObj;
        }
      }
    ]
  },

  // Enemy 6: Bandit Camp (25 HP) — beginner
  // Scaling attack that steals gold equal to unblocked damage. Resets at dev 4.
  // Default: Deal baseDamage, steal gold = unblocked damage, +1 to baseDamage, +1 dev
  // Dev 4: Reset baseDamage to 6, gain 6 block, lose all dev
  banditCamp: {
    name: "Bandit Camp",
    type: "Fire",
    XPGain: 10,
    goldOnDefeat: 15,
    Level: 1,
    maxHP: 25,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 25,
    encounterBlock: 0,
    attack: 0,
    defense: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    treason: 0,
    baseHeal: 0,
    baseBlock: 0,
    baseDamage: 6,
    baseScale: 0,
    avatar: "img/easy/firecub1.png",
    moves: [
      {
        name: "Shakedown",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${array[index].baseDamage + array[index].attack} damage. Steal gold equal to unblocked damage. +[EE:1]`
        },
        action: async (stateObj, index, array) => {
          let totalDamage = array[index].baseDamage + array[index].attack;
          let playerBlock = stateObj.playerMonster.encounterBlock;
          let unblockedDamage = Math.max(0, totalDamage - playerBlock);
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.gold = Math.max(0, newState.gold - unblockedDamage);
            newState.opponentMonster[index].baseDamage += 1;
          })
          stateObj = await gainDevelopment(stateObj, 1, index);
          return stateObj;
        }
      },
      {
        name: "Regroup",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Reset attack damage to 6. Gain 6 fortification. Lose all [EE]`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].baseDamage = 6;
            newState.opponentMonster[index].encounterBlock += 6;
          })
          let currentDev = stateObj.opponentMonster[index].development;
          if (currentDev > 0) {
            stateObj = await loseDevelopment(stateObj, currentDev, index);
          }
          return stateObj;
        }
      }
    ]
  },

  // Enemy 7: Stockade (30 HP) — beginner
  // Simple 3-phase attacker/blocker
  // Default: Deal 6 damage, +2 dev
  // Dev 4: Gain 8 block, +3 dev
  // Dev 7: Deal 13 damage, lose all dev
  stockade: {
    name: "Stockade",
    type: "Earth",
    XPGain: 10,
    goldOnDefeat: 15,
    Level: 1,
    maxHP: 36,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 36,
    encounterBlock: 0,
    attack: 0,
    defense: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    treason: 0,
    baseHeal: 0,
    baseBlock: 0,
    baseDamage: 0,
    baseScale: 0,
    avatar: "img/easy/plant1.png",
    moves: [
      {
        name: "Skirmish",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${6 + array[index].attack} damage. +[EE:2]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 6, index, false, 1);
          stateObj = await gainDevelopment(stateObj, 2, index);
          return stateObj;
        }
      },
      {
        name: "Hunker Down",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Gain 8 fortification. +[EE:3]`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += 8;
          })
          stateObj = await gainDevelopment(stateObj, 2, index);
          return stateObj;
        }
      },
      {
        name: "Sortie",
        devRequirement: 6,
        text: (state, index, array) => {
          return `Deal ${13 + array[index].attack} damage. Reset [EE]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 13, index, false, 1);
          let currentDev = stateObj.opponentMonster[index].development;
          if (currentDev > 0) {
            stateObj = await loseDevelopment(stateObj, currentDev, index);
          }
          return stateObj;
        }
      }
    ]
  },

  // Moderate: Garrison Village (35 HP)
  // Starts with 2 guard towers (3 dmg each, 6 HP each)
  // Default: Gain 3 block, +1 dev
  // Dev 5: Deal 16 damage, reset dev
  garrisonVillage: {
    name: "Garrison Village",
    type: "Fire",
    XPGain: 15,
    goldOnDefeat: 20,
    Level: 1,
    maxHP: 35,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 35,
    encounterBlock: 0,
    attack: 0,
    defense: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    treason: 0,
    baseHeal: 0,
    baseBlock: 0,
    baseDamage: 0,
    baseScale: 0,
    avatar: "img/medium/firecat5.png",
    startingStructures: [testEnemyStructures.guardTower, testEnemyStructures.guardTower],
    moves: [
      {
        name: "Fortify",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Gain ${3 + array[index].defense} fortification. +[EE:1]`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += 3;
          })
          stateObj = await gainDevelopment(stateObj, 1, index);
          return stateObj;
        }
      },
      {
        name: "Volley",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${16 + array[index].attack} damage. Reset [EE]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 16, index, false, 1);
          let currentDev = stateObj.opponentMonster[index].development;
          if (currentDev > 0) {
            stateObj = await loseDevelopment(stateObj, currentDev, index);
          }
          return stateObj;
        }
      }
    ]
  },
}


// ====== DIFFICULTY POOLS ======
// Swap enemies between pools to test different progression curves

let beginnerEncounterPool = [
  [testEnemies.outpost],
  [testEnemies.fortifier],
  [testEnemies.siegeCamp],
  //[testEnemies.banditCamp],
  [testEnemies.stockade],
]

let moderateEncounterPool = [
  [testEnemies.warCamp],
  [testEnemies.armoredGarrison],
  [testEnemies.watchtower],
  [testEnemies.raiderCamp],
  [testEnemies.plagueVillage],
  [testEnemies.siegeCamp],
  [testEnemies.fortifier],
  [testEnemies.garrisonVillage],
]


