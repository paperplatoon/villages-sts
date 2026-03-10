//Medium Encounters - Village Wars
//Solo: 10 encounters, Multi: 4 encounters

let mediumSoloEncounters = {
  m1: {
    name: "Fortified Town",
    type: "Earth",
    XPGain: opponentXPGain*2,
    goldOnDefeat: Math.floor(opponentGold*3),
    Level: 1,
    maxHP: opponentMaxHP*16,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*16,
    encounterBlock: 0,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseHeal: opponentBaseHeal,
    baseBlock: 0,
    baseDamage: opponentBaseDamage,
    baseScale: 0,
    avatar: "img/medium/cuteearthbad.png",
    moves: [
      {
        name: "Rebuild Walls",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Restore ${array[index].baseHeal * 2} health. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await healOpponent(stateObj, array[index].baseHeal * 2, index)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Trident Volley",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${Math.floor(array[index].baseDamage*2) + 4 + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage*2) + 4, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Mega Drain",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal ${(4 * array[index].baseDamage) + array[index].strength} damage. Restore ${array[index].baseHeal*2} health. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (4 * array[index].baseDamage), index, false, 1);
          stateObj = await healOpponent(stateObj, array[index].baseHeal * 2, index)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  m2: {
    name: "War Camp",
    type: "Water",
    XPGain: opponentXPGain*2,
    goldOnDefeat: Math.floor(opponentGold*3),
    Level: 1,
    maxHP: opponentMaxHP*9,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*9,
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
    avatar: "img/medium/jellyfish1.png",
    moves: [
      {
        name: "Barricade",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Gain ${Math.floor(array[index].baseBlock *1.5) + array[index].dex} fortification. Gain ${Math.floor(array[index].baseScale/3)} walls. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += Math.floor((array[index].baseBlock*1.5) + array[index].dex);
            newState.opponentMonster[index].dex += Math.floor(array[index].baseScale/3);
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Strangle Hold",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*2) + 2 + array[index].dex + array[index].strength} damage. Scales with walls. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, ((array[index].baseDamage*2) + 2 + array[index].dex), index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Siege Breaker",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*4) + array[index].dex + array[index].strength} damage. Gain ${array[index].baseScale} walls. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*4) + array[index].dex, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].dex += array[index].baseScale;
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  m3: {
    name: "Thornwall Keep",
    type: "Air",
    XPGain: opponentXPGain*2,
    goldOnDefeat: Math.floor(opponentGold*3),
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
    deflate: 6,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/oldairmonster.png",
    powers: [{
      name: "Power: Crumble",
      text: `Loses 1 development after taking 6+ unblocked damage`
    }],
    moves: [
      {
        name: "Skirmish",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${array[index].baseDamage+3 + array[index].strength} damage. +1 Dev`
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
        name: "Thorn Volley",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*2) + 3 + array[index].strength} damage. Gain ${array[index].baseScale} walls. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*2) + 3, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].dex += array[index].baseScale;
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Soul Consume",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*4) + 2 + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*4) + 2, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  m4: {
    name: "Merchant Guild",
    type: "Fire",
    XPGain: opponentXPGain*2,
    goldOnDefeat: Math.floor(opponentGold*3),
    Level: 1,
    maxHP: opponentMaxHP*15,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*15,
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
    avatar: "img/medium/firecat5.png",
    powers: [{
      name: "Power: Enrage",
      text: `Gains 2 militia after taking unblocked damage`
    }],
    moves: [
      {
        name: "Flame Raid",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${array[index].baseDamage + 4 + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage+4, index, false, 1)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Blazing Assault",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${Math.floor(array[index].baseDamage) + array[index].strength} damage twice. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage), index, false, 2);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Inferno Strike",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*3) + array[index].strength} damage. Gain ${array[index].baseScale} militia. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage*3, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].strength += array[index].baseScale;
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  m5: {
    name: "Iron Forge",
    type: "Fire",
    XPGain: opponentXPGain*2,
    goldOnDefeat: Math.floor(opponentGold*3),
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
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/medium/firesheep.png",
    moves: [
      {
        name: "Sword Raid",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${array[index].baseDamage*2 + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*2), index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Forge Weapons",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Gain ${(array[index].baseBlock*2) + array[index].dex} fortification. Gain ${array[index].baseScale} militia. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += ((array[index].baseBlock*2) + array[index].dex);
            newState.opponentMonster[index].strength += array[index].baseScale;
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Arsenal Unleash",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*4) + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage*4, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  m6: {
    name: "Temple District",
    type: "Water",
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
    avatar: "img/medium/waterdevil.png",
    moves: [
      {
        name: "Rising Tide",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${array[index].baseDamage +3+ array[index].strength} damage. Gain ${Math.floor(array[index].baseScale)} walls. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage+3, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].dex += array[index].baseScale;
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Sea Wall",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Gain ${array[index].baseBlock + array[index].dex} fortification. Deal ${(array[index].baseDamage*2) + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += array[index].baseBlock + array[index].dex;
          })
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage*2, index, false, 1);
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
          return `Deal ${(array[index].baseDamage*4) + array[index].dex + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*4) + array[index].dex, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  m7: {
    name: "Harbor Town",
    type: "Water",
    XPGain: opponentXPGain*2,
    goldOnDefeat: Math.floor(opponentGold*3),
    Level: 1,
    maxHP: opponentMaxHP*15,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*15,
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
    avatar: "img/medium/dolphin1.png",
    moves: [
      {
        name: "Naval Raid",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*2) + 3 + array[index].strength} damage. Gain ${Math.ceil(array[index].baseScale/2)} walls. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*2) + 3, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].dex += Math.ceil(array[index].baseScale/2);
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Fortify Harbor",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Gain ${(array[index].baseBlock) + array[index].dex} fortification. Gain ${array[index].baseScale} militia & walls. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += array[index].baseBlock + array[index].dex;
            newState.opponentMonster[index].strength += array[index].baseScale;
            newState.opponentMonster[index].dex += array[index].baseScale;
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Broadside",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*4) + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage*4, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  m8: {
    name: "Walled City",
    type: "Water",
    XPGain: opponentXPGain*2,
    goldOnDefeat: Math.floor(opponentGold*3),
    Level: 1,
    maxHP: opponentMaxHP*12,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*12,
    encounterBlock: 0,
    prickles: 2,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/medium/pricklefish.png",
    powers: [{
      name: "Power: Thorned Walls",
      text: `Take 2 damage when attacking this village`
    }],
    moves: [
      {
        name: "Raise Walls",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Gain ${array[index].baseBlock+4 + array[index].dex} fortification. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            let blockToGain = array[index].baseBlock + 4 + array[index].dex
            if (blockToGain > 0) {
              newState.opponentMonster[index].encounterBlock += blockToGain;
            }
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Catapult Strike",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${Math.floor(array[index].baseDamage*2) + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage*2), index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Siege Smash",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal ${Math.floor(array[index].baseDamage*3) + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage*3), index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  m9: {
    name: "Siege Works",
    type: "Earth",
    XPGain: opponentXPGain*2,
    goldOnDefeat: Math.floor(opponentGold*3),
    Level: 1,
    maxHP: opponentMaxHP*18,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*18,
    encounterBlock: 0,
    shakedown: 1,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/medium/earthpsycho.png",
    powers: [{
      name: "Power: Plunder",
      text: `Gain 1 gold each time you deal unblocked damage to this village`
    }],
    moves: [
      {
        name: "Battering Ram",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage) + 1 + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage+1, index, false, 1)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Payback",
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
        name: "Golden Plunder",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal ${array[index].baseDamage + array[index].strength} damage 5 times. Steal 20 gold. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage, index, false, 5);
          stateObj = immer.produce(stateObj, (newState) => {
            if (stateObj.gold > 20) {
              newState.gold -= 20
            } else {
              newState.gold = 0
            }
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  m10: {
    name: "Arsenal Keep",
    type: "Fire",
    XPGain: opponentXPGain*2,
    goldOnDefeat: Math.floor(opponentGold*3),
    Level: 1,
    maxHP: opponentMaxHP*16,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*16,
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
    avatar: "img/flamingbaby.png",
    powers: [{
      name: "Power: Enrage",
      text: `Gains 2 militia after taking unblocked damage`
    }],
    moves: [
      {
        name: "Fire Raid",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${array[index].baseDamage + 6 + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage + 6, index, false, 1)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Retribution",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${Math.floor(array[index].baseDamage-2)} damage for each breach (${state.fightDamageCount}). Unaffected by militia. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage-2) - array[index].strength, index, false, stateObj.fightDamageCount);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Total War",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*4) + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage*4, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  m11: {
    name: "Builder's Outpost",
    type: "Earth",
    XPGain: opponentXPGain*2,
    goldOnDefeat: Math.floor(opponentGold*3),
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
    avatar: "img/medium/cuteearthbad.png",
    moves: [
      {
        name: "Erect Watchtower",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Build an Enemy Watchtower (15 HP, deals 5 damage/turn). +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = createStructure(stateObj, structureDefinitions.enemyWatchtower, "opponent");
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Fortify Position",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Build an Enemy Barricade (20 HP, grants 5 fort/turn). Gain ${array[index].baseBlock + array[index].dex} fortification. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = createStructure(stateObj, structureDefinitions.enemyBarricade, "opponent");
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += array[index].baseBlock + array[index].dex;
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Siege Assembly",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*3) + array[index].strength} damage. Build Enemy Watchtower + Barricade. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage*3, index, false, 1);
          stateObj = createStructure(stateObj, structureDefinitions.enemyWatchtower, "opponent");
          stateObj = createStructure(stateObj, structureDefinitions.enemyBarricade, "opponent");
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },
}

let mediumMultiEncounters = {
  mm1: {
    name: "Watchtower",
    type: "Air",
    Level: 1,
    XPGain: opponentXPGain,
    goldOnDefeat: Math.floor(opponentGold*2),
    maxHP: opponentMaxHP*11,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*11,
    encounterBlock: 0,
    strength: 0,
    dex: 3,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseDamage: opponentBaseDamage,
    baseBlock: opponentBaseBlock,
    baseScale: 0,
    baseHeal: 0,
    avatar: "img/medium/bird1.png",
    moves: [
      {
        name: "Fortify All",
        devRequirement: 0,
        text: (state, index, array) => {
          return `All enemies gain ${Math.floor(array[index].baseBlock) + 2 + array[index].dex} fortification. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster.forEach(function (monsterObj) {
              monsterObj.encounterBlock += (Math.floor(array[index].baseBlock) + 2 + array[index].dex);
            })
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Arrow Volley",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage * 2) + 3 + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage * 2) + 3, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Dive Strike",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage * 3) + 3 + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage * 3) + 3, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  mm2: {
    name: "Archer Tower",
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
    avatar: "img/medium/prettybird.png",
    moves: [
      {
        name: "Shield Wall",
        devRequirement: 0,
        text: (state, index, array) => {
          return `All enemies gain +${Math.floor(array[index].baseBlock) + 1 + array[index].dex} fortification. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster.forEach(function (monsterObj) {
              monsterObj.encounterBlock += (Math.floor(array[index].baseBlock) + 1 + array[index].dex);
            })
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Aimed Shot",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage * 2) + array[index].strength} damage. Weaken walls by 1. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage * 2), index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.dex -= 1;
            newState.playerMonster.fightDex -= 1;
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Deadly Plumage",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage* 3) + array[index].strength} damage. Weaken walls by 1. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage * 3), index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.dex -= 1;
            newState.playerMonster.fightDex -= 1;
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  mm3: {
    name: "Barracks",
    type: "Fire",
    XPGain: opponentXPGain,
    goldOnDefeat: Math.floor(opponentGold*2),
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
    avatar: "img/medium/firebaby.png",
    moves: [
      {
        name: "Rapid Strikes",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${Math.floor(array[index].baseDamage/2) + array[index].strength} damage 5 times. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage/2), index, false, 5);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Train Militia",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Gain ${array[index].baseBlock - 2 + array[index].dex} fortification. Gain ${Math.floor(array[index].baseScale/3)} militia. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += array[index].baseBlock - 2 + array[index].dex;
            newState.opponentMonster[index].strength += Math.floor(array[index].baseScale/3);
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Full Assault",
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

  mm4: {
    name: "Dock Yard",
    type: "Water",
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
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/medium/crab3.png",
    moves: [
      {
        name: "Left Broadside",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${Math.floor(array[index].baseDamage) + 3 + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage + 3), index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Right Broadside",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${Math.floor(array[index].baseDamage*2) + array[index].strength} damage. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage * 2), index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Full Broadside",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal ${Math.floor(array[index].baseDamage*3) + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage * 3), index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },
}
