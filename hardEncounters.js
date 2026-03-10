//Hard Encounters - Village Wars
//Solo: 10 encounters

let hardSoloEncounters = {
  h1: {
    name: "Warlord's Citadel",
    type: "Air",
    Level: 1,
    XPGain: opponentXPGain*3,
    goldOnDefeat: Math.floor(opponentGold*5),
    maxHP: opponentMaxHP*12,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*12,
    encounterBlock: 0,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseBlock: opponentBaseBlock,
    baseHeal: 0,
    avatar: "img/hard/hugeair.png",
    moves: [
      {
        name: "Rally Troops",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*2) + array[index].strength} damage. All enemies gain ${Math.floor(array[index].baseScale/2)} militia. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*2), index, false, 1)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster.forEach(function(monsterObj) {
              monsterObj.strength += Math.floor(array[index].baseScale/2);
            })
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "War March",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*3) + array[index].strength} damage. All enemies gain ${Math.floor(array[index].baseScale/2)} militia. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*3), index, false, 1)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster.forEach(function(monsterObj) {
              monsterObj.strength += Math.floor(array[index].baseScale/2);
            })
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Siege Bombardment",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage * 5) + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage * 5), index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  h2: {
    name: "Berserker Camp",
    type: "Fire",
    XPGain: opponentXPGain*3,
    goldOnDefeat: Math.floor(opponentGold*5),
    Level: 1,
    maxHP: opponentMaxHP*12,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*12,
    encounterBlock: 0,
    enrage: 3,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/hard/firebeard.png",
    powers: [{
      name: "Power: Enrage",
      text: `Gains 3 militia after taking unblocked damage`
    }],
    moves: [
      {
        name: "Fiery Raid",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${array[index].baseDamage + 3 + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage+3, index, false, 1)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Vengeance",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${Math.floor(array[index].baseDamage-2) + array[index].strength} damage for each breach (${state.fightDamageCount}). +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage-2), index, false, stateObj.fightDamageCount);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Unleash Fury",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal damage equal to total damage taken (${state.fightDamageTotal + array[index].strength}). Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, stateObj.fightDamageTotal, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  h3: {
    name: "Forge Kingdom",
    type: "Fire",
    XPGain: opponentXPGain*3,
    goldOnDefeat: Math.floor(opponentGold*5),
    Level: 1,
    maxHP: opponentMaxHP*14,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*14,
    encounterBlock: 0,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/hard/firemuscles.png",
    moves: [
      {
        name: "Channel Flames",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${array[index].baseDamage + array[index].strength} damage. Gain ${array[index].baseScale*2} militia. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].strength += array[index].baseScale*2;
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Iron Shield",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Gain ${array[index].baseBlock + array[index].strength + array[index].dex} fortification. Scales with militia. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += array[index].baseBlock + array[index].strength + array[index].dex;
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Body Blows",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal militia value (${array[index].strength}) two times. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 0, index, false, 2);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  h4: {
    name: "Siege Engine",
    type: "Fire",
    offbalance: true,
    XPGain: opponentXPGain*3,
    goldOnDefeat: Math.floor(opponentGold*5),
    Level: 1,
    maxHP: opponentMaxHP*12,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*12,
    encounterBlock: 0,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/hard/robocroc.png",
    powers: [{
      name: "Power: Double-edged",
      text: `Whenever you fully block an attack from this village, reflect it`
    }],
    moves: [
      {
        name: "Cannon Blast",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*3) + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage*3, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Bombard",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*4) + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage*4, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Reload & Fire",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Gain ${array[index].baseBlock + array[index].dex} fortification. Gain ${Math.ceil(array[index].baseScale/2)} militia. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].strength += Math.ceil(array[index].baseScale/2);
            newState.opponentMonster[index].encounterBlock += array[index].baseBlock + array[index].dex;
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  h5: {
    name: "Sky Fortress",
    type: "Air",
    XPGain: opponentXPGain*3,
    goldOnDefeat: Math.floor(opponentGold*5),
    Level: 1,
    maxHP: opponentMaxHP*11,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*11,
    encounterBlock: 0,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    deflate: 6,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/hard/airdemon1.png",
    powers: [{
      name: "Power: Crumble",
      text: `Loses 1 development after taking 6+ unblocked damage`
    }],
    moves: [
      {
        name: "Gain Altitude",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Gain ${(array[index].baseBlock*2) + array[index].dex} fortification. Deal ${(array[index].baseDamage) + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += ((array[index].baseBlock*2) + array[index].dex);
          })
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage), index, false, 1)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Storm Strike",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*3) + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*3), index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Dive Bomb",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*4) + 2 + array[index].strength} damage. Gain ${array[index].baseScale} walls. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*4) + 2, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].dex += array[index].baseScale;
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  h6: {
    name: "Embattled Port",
    type: "Water",
    XPGain: opponentXPGain*3,
    goldOnDefeat: Math.floor(opponentGold*5),
    Level: 1,
    maxHP: opponentMaxHP*10,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*10,
    encounterBlock: 0,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    strengthOnBlock: 1,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/hard/poke1.png",
    powers: [{
      name: "Power: Embodied",
      text: `Gains 1 militia whenever your village gains fortification`
    }],
    moves: [
      {
        name: "Splash Attack",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${array[index].baseDamage + 3 + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage+3, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Tidal Defense",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Gain ${(array[index].baseBlock) + array[index].dex} fortification. Gain ${array[index].baseScale + 2} walls. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += array[index].baseBlock + array[index].dex;
            newState.opponentMonster[index].dex += array[index].baseScale + 2;
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Kraken Strike",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*4) + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*4), index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  h7: {
    name: "Dragon's Roost",
    type: "Air",
    XPGain: opponentXPGain*3,
    goldOnDefeat: Math.floor(opponentGold*5),
    Level: 1,
    maxHP: opponentMaxHP*14,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*14,
    encounterBlock: 0,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    deflate: 6,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/hard/airdragon2.png",
    powers: [{
      name: "Power: Crumble",
      text: `Loses 1 development after taking 6+ unblocked damage`
    }],
    moves: [
      {
        name: "Claw Strike",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${array[index].baseDamage + 1 + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage + 1, index, false, 1)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Jaw Clamp",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage) + 6 + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage) + 6, index, false, 1)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Crushing Bite",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*4) + 2 + array[index].strength} damage. Gain ${array[index].baseScale} walls. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*4) + 2, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].dex += array[index].baseScale;
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  h8: {
    name: "Sacred Grove",
    type: "Earth",
    XPGain: opponentXPGain,
    goldOnDefeat: Math.floor(opponentGold*2),
    Level: 1,
    maxHP: opponentMaxHP*8,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*8,
    encounterBlock: 0,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: 0,
    baseDamage: opponentBaseDamage,
    baseScale: 0,
    baseHeal: opponentBaseHeal,
    avatar: "img/hard/evilplant.png",
    moves: [
      {
        name: "Regrow",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Heal 25 health. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await healOpponent(stateObj, 25, index)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Vine Whip",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*2) + 4 + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*2) + 4, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Seed Eruption",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*4) + 4 + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*4) + 4, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  h9: {
    name: "Raider Outpost",
    type: "Air",
    Level: 1,
    XPGain: opponentXPGain,
    goldOnDefeat: Math.floor(opponentGold*2),
    maxHP: opponentMaxHP*12,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*12,
    encounterBlock: 0,
    strength: 0,
    dex: 1,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseDamage: opponentBaseDamage,
    baseBlock: opponentBaseBlock,
    baseScale: 0,
    baseHeal: 0,
    avatar: "img/hard/electricbee.png",
    moves: [
      {
        name: "Pillage",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*2) + 2 + array[index].strength} damage. Drain 1 villager. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*2) + 2, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            if (newState.playerMonster.encounterEnergy > 0) {
              newState.playerMonster.encounterEnergy -= 1
            }
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Sabotage",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage + 2) + array[index].strength} damage. Drain all villagers. Gain 5 militia. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage + 2), index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.encounterEnergy = 0;
            newState.opponentMonster[index].strength += 5;
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Total Raid",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*3) + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage *3), index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  h10: {
    name: "Supply Depot",
    type: "Air",
    Level: 1,
    XPGain: opponentXPGain,
    goldOnDefeat: Math.floor(opponentGold*2),
    maxHP: opponentMaxHP*10,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*10,
    encounterBlock: 0,
    strength: 0,
    dex: 1,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseDamage: opponentBaseDamage,
    baseBlock: opponentBaseBlock,
    baseScale: 0,
    baseHeal: 0,
    avatar: "img/hard/evilstork.png",
    moves: [
      {
        name: "Supply Line",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Grant 3 extra villagers. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.encounterEnergy += 3;
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Ambush",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${array[index].baseDamage + 3 + array[index].strength} damage twice. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage + 3), index, false, 2);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Triple Strike",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal ${array[index].baseDamage + 3 + array[index].strength} damage 3 times. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage + 3), index, false, 3);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  // Legacy hard multi-encounters kept as solos with adjusted keys
  m4: {
    name: "Razing Camp",
    type: "Fire",
    XPGain: opponentXPGain*2,
    goldOnDefeat: Math.floor(opponentGold*3),
    Level: 1,
    maxHP: opponentMaxHP*9,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*9,
    encounterBlock: 0,
    enrage: 2,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/evilfirebaby.png",
    powers: [{
      name: "Power: Enrage",
      text: `Gains 2 militia after taking unblocked damage`
    }],
    moves: [
      {
        name: "Fire Strike",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${array[index].baseDamage + 2 + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage+2, index, false, 1)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Retaliation",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${Math.floor(array[index].baseDamage-3) + array[index].strength} damage for each breach (${state.fightDamageCount}). +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage-3), index, false, stateObj.fightDamageCount);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Scorched Earth",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*3) + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage*3, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  m6: {
    name: "River Fort",
    type: "Fire",
    XPGain: opponentXPGain*2,
    goldOnDefeat: Math.floor(opponentGold*3),
    Level: 1,
    maxHP: 40,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: 40,
    encounterBlock: 0,
    strength: 0,
    baseScale: opponentBaseScale,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    avatar: "img/watersprite.png",
    moves: [
      {
        name: "Rising Tide",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${array[index].baseDamage +3+ array[index].strength} damage. Gain ${array[index].baseScale} militia. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage+3, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].strength += array[index].baseScale;
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Water Jets",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal militia damage (${array[index].strength}) twice. Gain ${1+(array[index].baseBlock*2)} fortification. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, 0, index, false, 2);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += 1+(array[index].baseBlock*2);
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Tsunami",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage * 3) + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*3), index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },
}
