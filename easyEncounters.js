// Easy Encounters - Village themed with 3-tier development system

let newTestOpponentMonsters = {
  test1: {
    name: "Test Hamlet",
    type: "Fire",
    XPGain: opponentXPGain,
    goldOnDefeat: 10,
    Level: 1,
    maxHP: 15,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 15,
    encounterBlock: 0,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: 2,
    baseDamage: 5,
    baseScale: 2,
    baseHeal: 0,
    avatar: "img/easy/adorablefire.png",
    moves: [
      {
        name: "Scout Raid",
        devRequirement: 0,
        text: (state, index, array) => {
            return `Deal ${array[index].baseDamage + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "War Party",
        devRequirement: 4,
        text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage * 2) + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage * 2, index, false, 1);
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
            return `Deal ${(array[index].baseDamage * 5) + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage * 5, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      },
    ]
  },

  test2: {
    name: "Test Outpost",
    type: "Earth",
    XPGain: opponentXPGain,
    goldOnDefeat: 10,
    Level: 1,
    maxHP: 18,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 18,
    encounterBlock: 0,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: 3,
    baseDamage: 4,
    baseScale: 1,
    baseHeal: 3,
    avatar: "img/easy/plant1.png",
    moves: [
      {
        name: "Patrol",
        devRequirement: 0,
        text: (state, index, array) => {
            return `Deal ${array[index].baseDamage + array[index].strength} damage. Gain ${array[index].baseBlock + array[index].dex} fortification. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += array[index].baseBlock + array[index].dex;
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Siege Engines",
        devRequirement: 4,
        text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage * 3) + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage * 3, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Battering Ram",
        devRequirement: 7,
        text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage * 6) + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage * 6, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      },
    ]
  },

  test3: {
    name: "Test Camp",
    type: "Water",
    XPGain: opponentXPGain,
    goldOnDefeat: 10,
    Level: 1,
    maxHP: 12,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 12,
    encounterBlock: 0,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: 2,
    baseDamage: 6,
    baseScale: 1,
    baseHeal: 0,
    avatar: "img/easy/bearcub1.png",
    moves: [
      {
        name: "Skirmish",
        devRequirement: 0,
        text: (state, index, array) => {
            return `Deal ${array[index].baseDamage + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Raiding Force",
        devRequirement: 4,
        text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage * 2) + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage * 2, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Pillage",
        devRequirement: 7,
        text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage * 4) + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage * 4, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      },
    ]
  },
};

// ===== EASY SOLO ENCOUNTERS =====

let easySoloEncounters = {
  // e1 - Militia village (strength focus)
  e1: {
    name: "Militia Post",
    type: "Fire",
    XPGain: opponentXPGain,
    goldOnDefeat: 13,
    Level: 1,
    maxHP: 13,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 13,
    encounterBlock: 0,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: 2,
    baseDamage: 5,
    baseScale: 2,
    baseHeal: 0,
    avatar: "img/easy/adorablefire.png",
    moves: [
      {
        name: "Raid",
        devRequirement: 0,
        text: (state, index, array) => {
            return `Deal ${array[index].baseDamage + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Inflame Militia",
        devRequirement: 4,
        text: (state, index, array) => {
            return `Gain ${array[index].baseBlock + array[index].dex} fortification. Gain ${Math.floor(array[index].baseScale)} militia. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += array[index].baseBlock + array[index].dex;
            newState.opponentMonster[index].strength += Math.floor(array[index].baseScale);
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Blazing Charge",
        devRequirement: 7,
        text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage * 5) + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage * 5, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      },
    ]
  },

  // e2 - Defensive village (block focus)
  e2: {
    name: "Border Hamlet",
    type: "Fire",
    XPGain: opponentXPGain,
    swordProtection: true,
    goldOnDefeat: 11,
    Level: 1,
    maxHP: 11,
    encounterBlock: 0,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 11,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: 3,
    baseDamage: 6,
    baseScale: 2,
    baseHeal: 0,
    avatar: "img/easy/bearcub1.png",
    moves: [
      {
        name: "Skirmish",
        devRequirement: 0,
        text: (state, index, array) => {
            return `Deal ${array[index].baseDamage + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Raise Palisades",
        devRequirement: 4,
        text: (state, index, array) => {
            return `ALL enemies gain ${array[index].baseBlock + array[index].dex} fortification. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster.forEach(function(monsterObj) {
              monsterObj.encounterBlock += array[index].baseBlock;
            });
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Sortie",
        devRequirement: 7,
        text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage * 4) + array[index].strength} damage. Gain ${array[index].baseBlock * 2} fortification. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage * 4, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += array[index].baseBlock * 2;
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      },
    ]
  },

  // e3 - Healing village
  e3: {
    name: "Farm Settlement",
    type: "Fire",
    XPGain: opponentXPGain,
    swordProtection: true,
    goldOnDefeat: 15,
    Level: 1,
    maxHP: 15,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 15,
    encounterBlock: 0,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: 3,
    baseDamage: 6,
    baseScale: 2,
    baseHeal: 5,
    avatar: "img/easy/plant1.png",
    moves: [
      {
        name: "Harvest",
        devRequirement: 0,
        text: (state, index, array) => {
            return `Restore ${array[index].baseHeal} health. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await healOpponent(stateObj, array[index].baseHeal, index);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Pitchfork Mob",
        devRequirement: 4,
        text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage * 2) + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage * 2, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Stampede",
        devRequirement: 7,
        text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage * 4) + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage * 4, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      },
    ]
  },

  // e4 - Scout village
  e4: {
    name: "Scout Outpost",
    type: "Air",
    XPGain: opponentXPGain,
    goldOnDefeat: 12,
    Level: 1,
    maxHP: 12,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 12,
    encounterBlock: 0,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: 4,
    baseDamage: 5,
    baseScale: 1,
    baseHeal: 0,
    avatar: "img/easy/adorablefire.png",
    moves: [
      {
        name: "Scout Ahead",
        devRequirement: 0,
        text: (state, index, array) => {
            return `Gain ${array[index].baseBlock + array[index].dex} fortification. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += array[index].baseBlock + array[index].dex;
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Ambush",
        devRequirement: 4,
        text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage * 2) + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage * 2, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Full Ambush",
        devRequirement: 7,
        text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage * 5) + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage * 5, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      },
    ]
  },

  // e5 - Mining village (strength scaling)
  e5: {
    name: "Mining Camp",
    type: "Earth",
    XPGain: opponentXPGain,
    goldOnDefeat: 14,
    Level: 1,
    maxHP: 16,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 16,
    encounterBlock: 0,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: 2,
    baseDamage: 4,
    baseScale: 2,
    baseHeal: 0,
    avatar: "img/easy/plant1.png",
    moves: [
      {
        name: "Mine Ore",
        devRequirement: 0,
        text: (state, index, array) => {
            return `Deal ${array[index].baseDamage + array[index].strength} damage. Gain ${array[index].baseScale} militia. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].strength += array[index].baseScale;
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Forge Weapons",
        devRequirement: 4,
        text: (state, index, array) => {
            return `Gain ${array[index].baseScale * 2} militia. Gain ${array[index].baseBlock * 2} fortification. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].strength += array[index].baseScale * 2;
            newState.opponentMonster[index].encounterBlock += array[index].baseBlock * 2;
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Avalanche",
        devRequirement: 7,
        text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage * 6) + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage * 6, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      },
    ]
  },

  // e6 - Lumber village
  e6: {
    name: "Lumber Mill",
    type: "Earth",
    XPGain: opponentXPGain,
    goldOnDefeat: 13,
    Level: 1,
    maxHP: 14,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 14,
    encounterBlock: 0,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: 3,
    baseDamage: 5,
    baseScale: 1,
    baseHeal: 0,
    avatar: "img/easy/bearcub1.png",
    moves: [
      {
        name: "Chop",
        devRequirement: 0,
        text: (state, index, array) => {
            return `Deal ${array[index].baseDamage + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Build Siege Tower",
        devRequirement: 4,
        text: (state, index, array) => {
            return `Gain ${array[index].baseBlock * 2 + array[index].dex} fortification. Deal ${array[index].baseDamage + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += array[index].baseBlock * 2 + array[index].dex;
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Timber Crush",
        devRequirement: 7,
        text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage * 5) + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage * 5, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      },
    ]
  },

  // e7 - Fishing village (water themed)
  e7: {
    name: "Fishing Village",
    type: "Water",
    XPGain: opponentXPGain,
    goldOnDefeat: 12,
    Level: 1,
    maxHP: 13,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 13,
    encounterBlock: 0,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: 2,
    baseDamage: 5,
    baseScale: 1,
    baseHeal: 3,
    avatar: "img/easy/adorablefire.png",
    moves: [
      {
        name: "Cast Nets",
        devRequirement: 0,
        text: (state, index, array) => {
            return `Deal ${array[index].baseDamage + array[index].strength} damage. Restore ${array[index].baseHeal} health. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage, index, false, 1);
          stateObj = await healOpponent(stateObj, array[index].baseHeal, index);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Harpoon Volley",
        devRequirement: 4,
        text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage * 2) + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage * 2, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Tidal Wave",
        devRequirement: 7,
        text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage * 5) + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage * 5, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      },
    ]
  },

  // e8 - Quarry town
  e8: {
    name: "Quarry Town",
    type: "Air",
    XPGain: opponentXPGain,
    goldOnDefeat: 14,
    Level: 1,
    maxHP: 18,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 18,
    encounterBlock: 0,
    strength: 0,
    dex: 1,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: 4,
    baseDamage: 4,
    baseScale: 1,
    baseHeal: 0,
    avatar: "img/easy/bearcub1.png",
    moves: [
      {
        name: "Quarry Stone",
        devRequirement: 0,
        text: (state, index, array) => {
            return `Gain ${array[index].baseBlock + array[index].dex} fortification. Deal ${array[index].baseDamage + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += array[index].baseBlock + array[index].dex;
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Boulder Throw",
        devRequirement: 4,
        text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage * 3) + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage * 3, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Rockslide",
        devRequirement: 7,
        text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage * 6) + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage * 6, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      },
    ]
  },
};

// ===== EASY MULTI ENCOUNTERS =====
let easyMultiEncounters = {
  em1: [easySoloEncounters.e1, easySoloEncounters.e2],
  em2: [easySoloEncounters.e3, easySoloEncounters.e4],
  em3: [easySoloEncounters.e5, easySoloEncounters.e6],
  em4: [easySoloEncounters.e7, easySoloEncounters.e8],
};
