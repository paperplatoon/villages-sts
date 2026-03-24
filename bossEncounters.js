//Boss Encounters - Village Wars
//Bosses gain +2 dev on default move

let bossMonsters = {
  boss1: {
    name: "Stormhold Citadel",
    type: "Air",
    Level: 1,
    XPGain: opponentXPGain*3,
    goldOnDefeat: Math.floor(opponentGold*10),
    maxHP: opponentMaxHP*25,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*25,
    encounterBlock: 0,
    attack: 0,
    defense: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    deflate: 10,
    boss: true,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseBlock: opponentBaseBlock,
    baseHeal: 0,
    avatar: "img/boss/thundercloud.png",
    powers: [{
      name: "Power: Crumble",
      text: `Loses 1 development after taking 10+ unblocked damage at once`
    }],
    moves: [
      {
        name: "Storm Gust",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*2) + 2 + array[index].attack} damage. Gain ${Math.floor(array[index].baseScale/3)} attack. +[EE:2]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*2)+2, index, false, 1)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].attack += Math.floor(array[index].baseScale/3);
            newState.opponentMonster[index].development += 2;
          })
          return stateObj;
        }
      },
      {
        name: "Lightning Barrage",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*3) + array[index].attack} damage. Gain ${Math.floor(array[index].baseScale/3)} attack. +[EE:1]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*3), index, false, 1)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].attack += Math.floor(array[index].baseScale/3);
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Meteor Shower",
        devRequirement: 6,
        text: (state, index, array) => {
          return `Deal ${(Math.floor(array[index].baseDamage/5)+1) + array[index].attack} damage 5 times. Reset [EE]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage/5)+1, index, false, 5);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  boss2: {
    name: "Dragon's Domain",
    type: "Fire",
    Level: 1,
    XPGain: opponentXPGain*3,
    goldOnDefeat: Math.floor(opponentGold*10),
    maxHP: opponentMaxHP*21,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*21,
    encounterBlock: 0,
    attack: 0,
    defense: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    angry: true,
    boss: true,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseBlock: opponentBaseBlock,
    baseHeal: 0,
    avatar: "img/boss/firedragon.png",
    powers: [{
      name: "Power: Fury",
      text: `Whenever this kingdom takes unblocked damage, gain 1 development`
    }],
    moves: [
      {
        name: "Tail Swipes",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage-2) + array[index].attack} damage 4 times. +[EE:2]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage-2), index, false, 4)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 2;
          })
          return stateObj;
        }
      },
      {
        name: "Dragon Breath",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*3) + array[index].attack} damage. +[EE:1]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*3), index, false, 1)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Inferno",
        devRequirement: 6,
        text: (state, index, array) => {
          return `Deal ${(Math.floor(array[index].baseDamage*5)) + array[index].attack} damage. Reset [EE]`
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

  boss3: {
    name: "Blade Kingdom",
    type: "Air",
    Level: 1,
    XPGain: opponentXPGain*3,
    goldOnDefeat: Math.floor(opponentGold*10),
    maxHP: opponentMaxHP*28,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*28,
    encounterBlock: 0,
    attack: 0,
    defense: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    offbalance: true,
    boss: true,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseBlock: opponentBaseBlock,
    baseHeal: 0,
    avatar: "img/boss/swordbird.png",
    powers: [{
      name: "Power: Double-edged",
      text: `Whenever you fully block an attack from this kingdom, reflect it`
    }],
    moves: [
      {
        name: "Lunging Strike",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*2)+2 + array[index].attack} damage. +[EE:2]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*2)+2, index, false, 1)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 2;
          })
          return stateObj;
        }
      },
      {
        name: "War Charge",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*3) + 3 + array[index].attack} damage. +[EE:1]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*3)+3, index, false, 1)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Spinning Blade Storm",
        devRequirement: 6,
        text: (state, index, array) => {
          return `Deal ${(Math.floor(array[index].baseDamage*6)) + array[index].attack} damage. Reset [EE]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage * 6), index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  boss4: {
    name: "Bear Clan Stronghold",
    type: "Air",
    XPGain: opponentXPGain*3,
    goldOnDefeat: Math.floor(opponentGold*5),
    Level: 1,
    maxHP: opponentMaxHP*18,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*18,
    encounterBlock: 0,
    attack: 0,
    defense: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    attackOnBlock: 1,
    boss: true,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/boss/flamingbear.png",
    powers: [{
      name: "Power: Embodied",
      text: `Gains 1 attack whenever your village gains fortification`
    }],
    moves: [
      {
        name: "Flaming Claws",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${Math.floor(array[index].baseDamage/4) + array[index].attack} damage 4 times. +[EE:2]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage/4), index, false, 4);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 2;
          })
          return stateObj;
        }
      },
      {
        name: "Rear Up",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Gain ${Math.floor(array[index].baseScale/3)} attack. +[EE:1]`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].attack += Math.floor(array[index].baseScale/3);
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Fire Slam",
        devRequirement: 6,
        text: (state, index, array) => {
          return `Deal ${Math.floor(array[index].baseDamage*6) + array[index].attack} damage. Reset [EE]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage*6), index, false, 1)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  boss5: {
    name: "Clockwork Citadel",
    type: "Air",
    XPGain: opponentXPGain*3,
    goldOnDefeat: Math.floor(opponentGold*5),
    Level: 1,
    maxHP: opponentMaxHP*25,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*25,
    encounterBlock: 0,
    attack: 0,
    defense: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    attackOnBlock: 1,
    boss: true,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/boss/silverdragon.png",
    moves: [
      {
        name: "Ticking Clock",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage + array[index].attack) * state.combatTurnNumber} damage. Drain 1 villager. +[EE:2]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage/4), index, false, 4);
          stateObj = immer.produce(stateObj, (newState) => {
            if (newState.playerMonster.encounterEnergy > 0) {
              newState.playerMonster.encounterEnergy -= 1;
            }
            newState.opponentMonster[index].development += 2;
          })
          return stateObj;
        }
      },
      {
        name: "Lightning Cloud",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Drain 2 villagers. Gain ${Math.floor(array[index].baseScale/3)} attack. +[EE:1]`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.encounterEnergy = Math.max(0, newState.playerMonster.encounterEnergy - 2);
            newState.opponentMonster[index].attack += Math.floor(array[index].baseScale/3);
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Thunderstorm",
        devRequirement: 6,
        text: (state, index, array) => {
          return `Deal ${Math.floor(array[index].baseDamage*6) + array[index].attack} damage. Reset [EE]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage*6), index, false, 1)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  healgymguard2: {
    name: "Shrine Guardian",
    type: "Air",
    XPGain: opponentXPGain,
    Level: 1,
    maxHP: opponentMaxHP*10,
    goldOnDefeat: Math.floor(opponentGold*3),
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*10,
    encounterBlock: 0,
    attack: 0,
    defense: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: 0,
    baseDamage: opponentBaseDamage,
    baseScale: 0,
    baseHeal: opponentBaseHeal,
    avatar: "img/earthevil.png",
    moves: [
      {
        name: "Mend",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Restore ${array[index].baseHeal} health. +[EE:1]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await healOpponent(stateObj, array[index].baseHeal, index)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Vine Strike",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*2) + array[index].attack} damage. +[EE:1]`
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
        name: "Seed Eruption",
        devRequirement: 6,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*3) + array[index].attack} damage. Reset [EE]`
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

  healgymboss: {
    name: "Ancient Grove",
    type: "Air",
    XPGain: opponentXPGain*3,
    goldOnDefeat: Math.floor(opponentGold*8),
    Level: 1,
    maxHP: opponentMaxHP*18,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*18,
    encounterBlock: 0,
    attack: 0,
    defense: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    boss: true,
    baseBlock: 0,
    baseDamage: opponentBaseDamage,
    baseScale: 0,
    baseHeal: opponentBaseHeal,
    avatar: "img/boss/tree1.png",
    moves: [
      {
        name: "Acid Rain",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*2) + array[index].attack} damage to ALL. Heal ${(array[index].baseHeal)} health. +[EE:2]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage*2, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            let calculatedDamage = (array[index].baseDamage*2) + array[index].attack;
            newState.opponentMonster.forEach(function (monsterObj, monsterIndex) {
              if (monsterObj.encounterBlock == 0) {
                monsterObj.currentHP -= calculatedDamage;
              } else if (monsterObj.encounterBlock >= calculatedDamage) {
                monsterObj.encounterBlock -= calculatedDamage;
              } else {
                monsterObj.currentHP -= (calculatedDamage - monsterObj.encounterBlock);
                monsterObj.encounterBlock = 0;
              }
            })
            newState.opponentMonster[index].development += 2;
          })
          stateObj = await healOpponent(stateObj, array[index].baseHeal, index)
          return stateObj;
        }
      },
      {
        name: "Thorned Growth",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*3) + array[index].attack} damage. Heal ${array[index].baseHeal*2} health. +[EE:1]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage*3, index, false, 1);
          stateObj = await healOpponent(stateObj, array[index].baseHeal*2, index)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Unleash Growth",
        devRequirement: 6,
        text: (state, index, array) => {
          return `Deal damage equal to total healed (${state.enemyFightHealTotal + array[index].attack}). Reset [EE]`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, stateObj.enemyFightHealTotal, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },
}
