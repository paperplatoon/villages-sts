let opponentBaseDamage = 10;
let opponentBaseBlock = 10;
let opponentBaseHeal = 10;
let opponentBaseScale = 5;
let opponentMaxHP = 10;
let opponentXPGain = 5;
let opponentGold = 5;

let opponentMonsters = {

  blockbossguard2: {
    name: "Watchtower Outpost",
    type: "Air",
    Level: 1,
    XPGain: opponentXPGain,
    goldOnDefeat: Math.floor(opponentGold*4),
    maxHP: opponentMaxHP*6,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*6,
    encounterBlock: 0,
    strength: 0,
    dex: 2,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseDamage: opponentBaseDamage,
    baseBlock: opponentBaseBlock,
    baseScale: 0,
    baseHeal: 0,
    avatar: "img/airmask.png",
    moves: [
      {
        name: "Fortify Walls",
        devRequirement: 0,
        text: (state, index, array) => {
          return `All enemies gain +${Math.floor((array[index].baseBlock / 2)) + array[index].dex} fortification. +1 Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster.forEach(function (monsterObj) {
              monsterObj.encounterBlock += (Math.floor((array[index].baseBlock / 2)) + array[index].dex);
            })
            newState.opponentMonster[index].development += 1;
          })
          return stateObj;
        }
      },
      {
        name: "Arrow Barrage",
        devRequirement: 4,
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage) + array[index].strength} damage. +1 Dev`
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
        name: "Catapult Strike",
        devRequirement: 7,
        text: (state, index, array) => {
          return `Deal ${((array[index].baseDamage * 2) + 1) + array[index].strength} damage. Reset Dev`
        },
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage * 2) + 1, index, false, 1);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].development = 0;
          })
          return stateObj;
        }
      }
    ]
  },

  healgymguard1: {
    name: "Healer's Shrine",
    type: "Air",
    XPGain: opponentXPGain,
    goldOnDefeat: Math.floor(opponentGold*3),
    Level: 1,
    maxHP: opponentMaxHP*6,
    development: 0,
    opponentMoveIndex: 0,
    currentHP: opponentMaxHP*6,
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
    avatar: "img/easy/plant1.png",
    moves: [
      {
        name: "Mend Walls",
        devRequirement: 0,
        text: (state, index, array) => {
          return `Restore ${array[index].baseHeal} health. +1 Dev`
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
        name: "Burning Herbs",
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
        name: "Seed Explosion",
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
      },
    ]
  },
}
