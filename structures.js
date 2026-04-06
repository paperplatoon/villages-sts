// ====== Structure Definitions ======
// Enemy structures: have HP and block, can be targeted by demolish-type cards.

let structureDefinitions = {

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
      let damage = 5;
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
      let blockGain = 5;
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
      let healAmount = 5;
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
      let drainAmount = 1;
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
      let damage = 2;
      stateObj = await dealPlayerDamage(stateObj, damage, 0, false, 1);
      return stateObj;
    }
  },
}
