// ====== Structure Definitions ======
// Player structures: built over multiple turns by spending villagers. No HP (can't be targeted by enemies).
// Enemy structures: have HP and block, can be targeted by demolish-type cards.

let structureDefinitions = {

  // ====== PLAYER STRUCTURES ======
  // Player structures have buildCost and are constructed over time.
  // They don't fire until fully built (buildProgress >= buildCost).
  // They have no HP — enemies cannot target or destroy them.

  watchtower: {
    name: "Watchtower",
    owner: "player",
    buildCost: 2,
    effectText: "Deals 4 damage to targeted enemy each turn",
    avatar: "img/structures/watchtower.png",
    onTurnEffect: async function(stateObj, index, structures) {
      if (stateObj.opponentMonster.length > 0) {
        stateObj = await dealOpponentDamage(stateObj, 4, 1, false, "specific");
      }
      return stateObj;
    }
  },

  barricade: {
    name: "Barricade",
    owner: "player",
    buildCost: 3,
    effectText: "Grants 5 fortification each turn",
    avatar: "img/structures/barricade.png",
    onTurnEffect: async function(stateObj, index, structures) {
      stateObj = immer.produce(stateObj, (newState) => {
        newState.playerMonster.encounterBlock += 5;
      });
      return stateObj;
    }
  },

  poisonTrap: {
    name: "Poison Trap",
    owner: "player",
    buildCost: 2,
    effectText: "Applies 2 poison to targeted enemy each turn",
    avatar: "img/structures/poisontrap.png",
    onTurnEffect: async function(stateObj, index, structures) {
      if (stateObj.opponentMonster.length > 0) {
        let target = stateObj.targetedMonster || 0;
        stateObj = immer.produce(stateObj, (newState) => {
          newState.opponentMonster[target].poison += 2;
        });
      }
      return stateObj;
    }
  },

  trainingGrounds: {
    name: "Training Grounds",
    owner: "player",
    buildCost: 4,
    effectText: "Grants 1 militia each turn",
    avatar: "img/structures/traininggrounds.png",
    onTurnEffect: async function(stateObj, index, structures) {
      stateObj = immer.produce(stateObj, (newState) => {
        newState.playerMonster.fightStrength += 1;
        newState.playerMonster.strength += 1;
      });
      return stateObj;
    }
  },

  healingWell: {
    name: "Healing Well",
    owner: "player",
    buildCost: 3,
    effectText: "Restores 3 HP each turn",
    avatar: "img/structures/healingwell.png",
    onTurnEffect: async function(stateObj, index, structures) {
      stateObj = await healPlayer(stateObj, 3);
      return stateObj;
    }
  },

  // ====== TEST STRUCTURES (for CardPoolTesting.js) ======

  testTower: {
    name: "Guard Tower",
    owner: "player",
    buildCost: 2,
    effectText: "Deals 4 damage to targeted enemy each turn",
    avatar: "img/structures/watchtower.png",
    onTurnEffect: async function(stateObj, index, structures) {
      if (stateObj.opponentMonster.length > 0) {
        stateObj = await dealOpponentDamage(stateObj, 4, 1, false, "specific");
      }
      return stateObj;
    }
  },

  testWall: {
    name: "Great Wall",
    owner: "player",
    buildCost: 3,
    effectText: "Grants 6 fortification each turn",
    avatar: "img/structures/barricade.png",
    onTurnEffect: async function(stateObj, index, structures) {
      stateObj = immer.produce(stateObj, (newState) => {
        newState.playerMonster.encounterBlock += 6;
      });
      return stateObj;
    }
  },

  // ====== OPPONENT STRUCTURES ======
  // Enemy structures have HP and block. Can be targeted by demolish-type cards.

  enemyWatchtower: {
    name: "Enemy Watchtower",
    owner: "opponent",
    maxHP: 15,
    currentHP: 15,
    encounterBlock: 0,
    effectText: "Deals 5 damage to your village each turn",
    avatar: "img/structures/enemywatchtower.png",
    onTurnEffect: async function(stateObj, index, structures) {
      let damage = 5 * (structures[index].stackCount || 1);
      stateObj = await dealPlayerDamage(stateObj, damage, 0, false, 1);
      return stateObj;
    }
  },

  enemyBarricade: {
    name: "Enemy Barricade",
    owner: "opponent",
    maxHP: 20,
    currentHP: 20,
    encounterBlock: 0,
    effectText: "Grants 5 fortification to all enemies each turn",
    avatar: "img/structures/enemybarricade.png",
    onTurnEffect: async function(stateObj, index, structures) {
      let blockGain = 5 * (structures[index].stackCount || 1);
      stateObj = immer.produce(stateObj, (newState) => {
        newState.opponentMonster.forEach(function(monsterObj) {
          monsterObj.encounterBlock += blockGain;
        });
      });
      return stateObj;
    }
  },

  enemyHealShrine: {
    name: "Enemy Heal Shrine",
    owner: "opponent",
    maxHP: 12,
    currentHP: 12,
    encounterBlock: 0,
    effectText: "Heals all enemies for 5 HP each turn",
    avatar: "img/structures/enemyhealshrine.png",
    onTurnEffect: async function(stateObj, index, structures) {
      let healAmount = 5 * (structures[index].stackCount || 1);
      for (let i = 0; i < stateObj.opponentMonster.length; i++) {
        stateObj = await healOpponent(stateObj, healAmount, i);
      }
      return stateObj;
    }
  },

  enemyDrainTower: {
    name: "Enemy Drain Tower",
    owner: "opponent",
    maxHP: 10,
    currentHP: 10,
    encounterBlock: 0,
    effectText: "Drains 1 villager each turn",
    avatar: "img/structures/enemydraintower.png",
    onTurnEffect: async function(stateObj, index, structures) {
      let drainAmount = 1 * (structures[index].stackCount || 1);
      stateObj = immer.produce(stateObj, (newState) => {
        newState.playerMonster.encounterEnergy = Math.max(0, newState.playerMonster.encounterEnergy - drainAmount);
      });
      return stateObj;
    }
  },

  enemyPoisonTrap: {
    name: "Enemy Poison Trap",
    owner: "opponent",
    maxHP: 8,
    currentHP: 8,
    encounterBlock: 0,
    effectText: "Applies 2 poison to your village each turn",
    avatar: "img/structures/enemypoisontrap.png",
    onTurnEffect: async function(stateObj, index, structures) {
      let damage = 2 * (structures[index].stackCount || 1);
      stateObj = await dealPlayerDamage(stateObj, damage, 0, false, 1);
      return stateObj;
    }
  },
}
