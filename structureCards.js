// ====== Player Structure Cards ======
// These cards fully define their own structure stats and effects.

let playerStructureCards = {

  buildwatchtower: {
    cardID: 200,
    name: "Ballista",
    buildCost: 3,
    baseDamage: 10,
    projectileTarget: "opponent",
    effectText: "Deals 10 damage to targeted enemy each turn",
    avatar: "img/structures/watchtower.png",
    onTurnEffect: async function(stateObj, index, structures) {
      if (stateObj.opponentMonster.length > 0) {
        stateObj = await dealOpponentDamage(stateObj, structures[index].baseDamage, 1, false, "specific");
      }
      return stateObj;
    },
    text: (state, index, array) => {
      return `Deals ${array[index].baseDamage} damage to front enemy each turn. (Build cost: ${array[index].buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, array[index], "player");
      return stateObj;
    }
  },

  buildbarricade: {
    cardID: 201,
    name: "Build Barricade",
    buildCost: 3,
    baseBlock: 5,
    effectText: "Grants 5 fortification each turn",
    avatar: "img/structures/barricade.png",
    onTurnEffect: async function(stateObj, index, structures) {
      stateObj = immer.produce(stateObj, (newState) => {
        newState.playerMonster.encounterBlock += structures[index].baseBlock;
      });
      return stateObj;
    },
    text: (state, index, array) => {
      return `Grants ${array[index].baseBlock} fortification each turn. (Build cost: ${array[index].buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, array[index], "player");
      return stateObj;
    }
  },

  buildtraininggrounds: {
    cardID: 202,
    name: "Build Training Grounds",
    buildCost: 2,
    baseAttackBuff: 1,
    effectText: "Grants 1 attack each turn",
    avatar: "img/structures/traininggrounds.png",
    onTurnEffect: async function(stateObj, index, structures) {
      stateObj = immer.produce(stateObj, (newState) => {
        newState.playerMonster.fightAttack += structures[index].baseAttackBuff;
        newState.playerMonster.attack += structures[index].baseAttackBuff;
      });
      return stateObj;
    },
    text: (state, index, array) => {
      return `Grants ${array[index].baseAttackBuff} attack each turn. (Build cost: ${array[index].buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, array[index], "player");
      return stateObj;
    }
  },

  buildhealingwell: {
    cardID: 203,
    name: "Build Healing Well",
    buildCost: 2,
    baseHeal: 3,
    effectText: "Restores 3 HP each turn",
    avatar: "img/structures/healingwell.png",
    onTurnEffect: async function(stateObj, index, structures) {
      stateObj = await healPlayer(stateObj, structures[index].baseHeal);
      return stateObj;
    },
    text: (state, index, array) => {
      return `Restores ${array[index].baseHeal} HP each turn. (Build cost: ${array[index].buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "water",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, array[index], "player");
      return stateObj;
    }
  },

  buildpoisontrap: {
    cardID: 204,
    name: "Build Poison Trap",
    buildCost: 2,
    basePoison: 2,
    projectileTarget: "opponent",
    effectText: "Applies 2 poison to targeted enemy each turn",
    avatar: "img/structures/poisontrap.png",
    onTurnEffect: async function(stateObj, index, structures) {
      if (stateObj.opponentMonster.length > 0) {
        let target = stateObj.targetedMonster || 0;
        stateObj = immer.produce(stateObj, (newState) => {
          newState.opponentMonster[target].poison += structures[index].basePoison;
        });
      }
      return stateObj;
    },
    text: (state, index, array) => {
      return `Applies ${array[index].basePoison} poison to front enemy each turn. (Build cost: ${array[index].buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "water",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, array[index], "player");
      return stateObj;
    }
  },

  finalassault: {
    cardID: 211,
    name: "Final Assault",
    buildCost: 4,
    baseDamage: 35,
    singleUse: true,
    projectileTarget: "opponent",
    effectText: "When complete: deal 35 damage. Then removed.",
    avatar: "img/structures/watchtower.png",
    onTurnEffect: async function(stateObj, index, structures) {
      stateObj = await dealStructureEffectDamage(stateObj, structures[index].baseDamage, 0);
      return stateObj;
    },
    text: (state, index, array) => {
      return `Single use. Deals ${array[index].baseDamage} damage when complete. (Build cost: ${array[index].buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, array[index], "player");
      return stateObj;
    }
  },

  buildEntrepreneur: {
    cardID: 212,
    name: "Build Entrepreneur",
    buildCost: 2,
    goldOnCardPlay: 1,
    goldOnCardPlayCap: 20,
    effectText: "Gain 1 gold every time you play a card (up to 20 per game)",
    avatar: "img/structures/watchtower.png",
    text: (state, index, array) => {
      return `Gain ${array[index].goldOnCardPlay} gold per card played, up to ${array[index].goldOnCardPlayCap}/game. (Build cost: ${array[index].buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, array[index], "player");
      return stateObj;
    }
  },

  buildDiplomatOffice: {
    cardID: 213,
    name: "Build Diplomat's Office",
    buildCost: 3,
    baseDiplomacy: 1,
    effectText: "Gain 1 diplomacy at end of turn",
    avatar: "img/structures/watchtower.png",
    onTurnEffect: async function(stateObj, index, structures) {
      stateObj = await gainDiplomacy(stateObj, structures[index].baseDiplomacy);
      return stateObj;
    },
    text: (state, index, array) => {
      return `Gain ${array[index].baseDiplomacy} diplomacy each turn. (Build cost: ${array[index].buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "water",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, array[index], "player");
      return stateObj;
    }
  },

  buildSpymaster: {
    cardID: 214,
    name: "Build Spymaster",
    buildCost: 2,
    baseTreason: 3,
    projectileTarget: "opponent",
    effectText: "Enemy gains 3 treason at end of turn",
    avatar: "img/structures/watchtower.png",
    onTurnEffect: async function(stateObj, index, structures) {
      if (stateObj.opponentMonster.length > 0) {
        stateObj = await applyTreason(stateObj, structures[index].baseTreason);
      }
      return stateObj;
    },
    text: (state, index, array) => {
      return `Apply ${array[index].baseTreason} treason each turn. (Build cost: ${array[index].buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, array[index], "player");
      return stateObj;
    }
  },

  buildCarnivalFireworks: {
    cardID: 215,
    name: "Build Carnival Fireworks",
    buildCost: 2,
    baseDamage: 12,
    baseGoldCost: 3,
    projectileTarget: "opponent-all",
    effectText: "Spend 3 gold to deal 12 damage to ALL enemies",
    avatar: "img/structures/watchtower.png",
    onTurnEffect: async function(stateObj, index, structures) {
      if (stateObj.gold < structures[index].baseGoldCost) return stateObj;
      stateObj = immer.produce(stateObj, (newState) => {
        newState.gold -= structures[index].baseGoldCost;
      });
      if (stateObj.opponentMonster.length > 0) {
        stateObj = await dealOpponentDamage(stateObj, structures[index].baseDamage, 1, false, "all");
      }
      stateObj = immer.produce(stateObj, (newState) => {
        newState.opponentStructures.forEach(function(struct) {
          if (struct.currentHP > 0) {
            struct.currentHP -= structures[index].baseDamage;
          }
        });
      });
      return stateObj;
    },
    text: (state, index, array) => {
      return `Spend ${array[index].baseGoldCost} gold to deal ${array[index].baseDamage} to ALL enemies and structures. (Build cost: ${array[index].buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, array[index], "player");
      return stateObj;
    }
  },

  buildRaidingParty: {
    cardID: 216,
    name: "Build Raiding Party",
    buildCost: 2,
    goldOnUnblockedDamage: 2,
    effectText: "Gain 2 gold every time you deal unblocked attack damage",
    avatar: "img/structures/watchtower.png",
    text: (state, index, array) => {
      return `Gain ${array[index].goldOnUnblockedDamage} gold per unblocked hit. (Build cost: ${array[index].buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, array[index], "player");
      return stateObj;
    }
  },

  buildPatentOffice: {
    cardID: 217,
    name: "Build Patent Office",
    buildCost: 2,
    onStructureComplete: "copyToHand",
    effectText: "When you finish building a structure, add a copy to your hand (build cost +2)",
    avatar: "img/structures/watchtower.png",
    text: (state, index, array) => {
      return `When you finish building a structure, add a copy to hand with +2 build cost. (Build cost: ${array[index].buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "water",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, array[index], "player");
      return stateObj;
    }
  },

  buildInventorWorkshop: {
    cardID: 218,
    name: "Build Inventor's Workshop",
    buildCost: 3,
    baseDamage: 11,
    baseBlock: 11,
    baseAttackBuff: 2,
    effectText: "At end of turn, randomly: deal 11 damage, gain 11 block, or gain +2 attack",
    avatar: "img/structures/watchtower.png",
    onTurnEffect: async function(stateObj, index, structures) {
      let roll = Math.floor(Math.random() * 3);
      if (roll === 0 && stateObj.opponentMonster.length > 0) {
        stateObj = await dealOpponentDamage(stateObj, structures[index].baseDamage, 1, false, "specific");
      } else if (roll === 1) {
        stateObj = gainBlock(stateObj, structures[index].baseBlock);
      } else {
        stateObj = immer.produce(stateObj, (newState) => {
          newState.playerMonster.fightAttack += structures[index].baseAttackBuff;
          newState.playerMonster.attack += structures[index].baseAttackBuff;
        });
      }
      return stateObj;
    },
    text: (state, index, array) => {
      return `Each turn, randomly: deal ${array[index].baseDamage} damage, gain ${array[index].baseBlock} block, or +${array[index].baseAttackBuff} attack. (Build cost: ${array[index].buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, array[index], "player");
      return stateObj;
    }
  },

  buildDynamiteHeap: {
    cardID: 219,
    name: "Build Dynamite Heap",
    buildCost: 6,
    baseDamage: 50,
    projectileTarget: "opponent",
    fireOnComplete: true,
    effectText: "When complete: deal 50 damage to targeted enemy. Then removed.",
    avatar: "img/structures/watchtower.png",
    text: (state, index, array) => {
      return `When complete: deal ${array[index].baseDamage + state.playerMonster.attack} damage. Then removed. (Build cost: ${array[index].buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, array[index], "player");
      return stateObj;
    }
  },
};


// ====== Test Structure Cards ======

let testStructureCards = {

  testTower: {
    cardID: 302,
    name: "Guard Tower",
    rarity: "common",
    buildCost: 1,
    baseDamage: 3,
    projectileTarget: "opponent",
    effectText: "Deals 3 damage to targeted enemy each turn",
    avatar: "img/avatars/guardtower.png",
    onTurnEffect: async function(stateObj, index, structures) {
      if (stateObj.opponentMonster.length > 0) {
        stateObj = await dealOpponentDamage(stateObj, structures[index].baseDamage, 1, false, "specific");
      }
      return stateObj;
    },
    text: (state, index, array) => {
      return `Deals ${array[index].baseDamage} damage each turn. (Build cost: ${array[index].buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, array[index], "player");
      return stateObj;
    }
  },

  testWall: {
    cardID: 303,
    name: "Great Wall",
    rarity: "uncommon",
    buildCost: 2,
    baseBlock: 6,
    effectText: "Grants 6 fortification each turn",
    avatar: "img/avatars/greatwall.png",
    onTurnEffect: async function(stateObj, index, structures) {
      stateObj = immer.produce(stateObj, (newState) => {
        newState.playerMonster.encounterBlock += structures[index].baseBlock;
      });
      return stateObj;
    },
    text: (state, index, array) => {
      return `Grants ${array[index].baseBlock} fortification each turn. (Build cost: ${array[index].buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, array[index], "player");
      return stateObj;
    }
  },

  // ====== ESCALATING STRUCTURE ======
  // Deals damage that doubles each turn. Damage tracked on the structure instance itself.
  testCannon: {
    cardID: 311,
    name: "Tinkerworks",
    buildCost: 3,
    baseDamage: 2,
    escalatingDamage: 2,
    projectileTarget: "opponent-all",
    effectText: "Deals 2 damage to all enemies. Doubles each turn",
    avatar: "img/avatars/escalatingcannon.png",
    onTurnEffect: async function(stateObj, index, structures) {
      if (stateObj.opponentMonster.length > 0) {
        let dmg = structures[index].escalatingDamage || structures[index].baseDamage || 0;
        stateObj = immer.produce(stateObj, (newState) => {
          newState.opponentMonster.forEach(function(monsterObj) {
            if (monsterObj.encounterBlock > 0) {
              if (monsterObj.encounterBlock >= dmg) {
                monsterObj.encounterBlock -= dmg;
              } else {
                let remainder = dmg - monsterObj.encounterBlock;
                monsterObj.encounterBlock = 0;
                monsterObj.currentHP -= remainder;
              }
            } else {
              monsterObj.currentHP -= dmg;
            }
          });
          newState.playerStructures[index].escalatingDamage = dmg * 2;
        });
      }
      return stateObj;
    },
    text: (state, index, array) => {
      return `Deals ${array[index].baseDamage} damage to all enemies each turn, doubling each turn. (Build cost: ${array[index].buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, array[index], "player");
      return stateObj;
    }
  },

  // ====== BLOCK DOUBLING STRUCTURE ======
  // Sets doubleBlock flag + directly doubles encounterBlock at end of turn.
  testFortress: {
    cardID: 312,
    name: "Fortress Wall",
    buildCost: 2,
    effectText: "Doubles your fortification at end of turn",
    avatar: "img/avatars/fortifyworkshop.png",
    onTurnEffect: async function(stateObj, index, structures) {
      stateObj = immer.produce(stateObj, (newState) => {
        newState.doubleBlock = true;
        newState.playerMonster.encounterBlock = newState.playerMonster.encounterBlock * 2;
      });
      return stateObj;
    },
    text: (state, index, array) => {
      return `Doubles your fortification at end of turn. (Build cost: ${array[index].buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, array[index], "player");
      return stateObj;
    }
  },

  // ====== EXTRA HIT STRUCTURE ======
  // Sets extraAttackHit flag. dealOpponentDamage adds +1 to attackNumber.
  testDrums: {
    cardID: 313,
    name: "War Drums",
    buildCost: 2,
    effectText: "Your attacks hit an extra time",
    avatar: "img/avatars/wardrum.png",
    onTurnEffect: async function(stateObj, index, structures) {
      stateObj = immer.produce(stateObj, (newState) => {
        newState.extraAttackHit = true;
      });
      return stateObj;
    },
    text: (state, index, array) => {
      return `Your attacks hit an extra time. (Build cost: ${array[index].buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, array[index], "player");
      return stateObj;
    }
  },

  // ====== DOUBLE DAMAGE STRUCTURE ======
  // Sets doubleAttackDamage flag. dealOpponentDamage doubles damageNumber.
  testWorkshop: {
    cardID: 314,
    name: "Siege Workshop",
    buildCost: 3,
    effectText: "Your attacks deal double damage",
    avatar: "img/avatars/trebuchet.png",
    onTurnEffect: async function(stateObj, index, structures) {
      stateObj = immer.produce(stateObj, (newState) => {
        newState.doubleAttackDamage = true;
      });
      return stateObj;
    },
    text: (state, index, array) => {
      return `Your attacks deal double damage. (Build cost: ${array[index].buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, array[index], "player");
      return stateObj;
    }
  },

  // ====== HEALER'S HUT ======
  // Structure: heal 1 HP every time you play a card. Stacks with multiple copies.
  testHealersHut: {
    cardID: 315,
    name: "Healer's Hut",
    buildCost: 1,
    baseHeal: 1,
    healOnCardPlay: 1,
    effectText: "Heal 1 HP every time you play a card",
    avatar: "img/avatars/healershut.png",
    text: (state, index, array) => {
      return `Heal ${array[index].baseHeal} HP every time you play a card. (Build cost: ${array[index].buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "water",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, array[index], "player");
      return stateObj;
    }
  },

  // ====== CATAPULT ======
  // Structure: deal 4 damage/turn. Each replay permanently increases damage by 1.
  testCatapult: {
    cardID: 316,
    name: "Catapult",
    buildCost: 5,
    baseDamage: 15,
    projectileTarget: "opponent",
    effectText: "Deals 15 damage to targeted enemy each turn",
    avatar: "img/avatars/catapult.png",
    onTurnEffect: async function(stateObj, index, structures) {
      if (stateObj.opponentMonster.length > 0) {
        stateObj = await dealOpponentDamage(stateObj, structures[index].baseDamage, 1, false, "specific");
      }
      return stateObj;
    },
    text: (state, index, array) => {
      let existing = state.playerStructures.find(s => s.name === "Catapult" && s.buildProgress >= s.buildCost);
      let dmg = existing ? existing.baseDamage : array[index].baseDamage;
      return existing
        ? `Upgrade Catapult to ${dmg + 1} damage per turn`
        : `Deal ${array[index].baseDamage} damage to targeted enemy each turn. (Build cost: ${array[index].buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      let existingIndex = stateObj.playerStructures.findIndex(s => s.name === "Catapult" && s.buildProgress >= s.buildCost);
      if (existingIndex >= 0) {
        stateObj = immer.produce(stateObj, (newState) => {
          newState.playerStructures[existingIndex].baseDamage += 1;
          newState.playerStructures[existingIndex].effectText = `Deals ${newState.playerStructures[existingIndex].baseDamage} damage to targeted enemy each turn`;
        });
      } else {
        stateObj = createStructure(stateObj, array[index], "player");
      }
      return stateObj;
    }
  },

  // ====== SEISMIC SPIRE ======
  // Structure: whenever enemy gains or loses development, deal 4 damage.
  testSeismicSpire: {
    cardID: 318,
    name: "Worksite Raiders",
    buildCost: 2,
    baseDamage: 4,
    damageOnDevChange: 4,
    effectText: "Whenever enemy gains or loses [E], deal 4 damage",
    avatar: "img/avatars/batteringram.png",
    text: (state, index, array) => {
      return `Whenever enemy gains or loses [E], deal ${array[index].baseDamage} damage. (Build cost: ${array[index].buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "earth",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, array[index], "player");
      return stateObj;
    }
  },

  // ====== NEW HOUSING ======
  // Structure: once built, permanently gain 5 max HP and heal 5.
  testMoreHousing: {
    cardID: 317,
    name: "New Housing",
    buildCost: 3,
    baseHPGain: 5,
    effectText: "Increases max HP by 5 and heals 5",
    avatar: "img/structures/healingwell.png",
    onTurnEffect: async function(stateObj, index, structures) {
      if (!structures[index].applied) {
        stateObj = immer.produce(stateObj, (newState) => {
          newState.playerMonster.maxHP += structures[index].baseHPGain;
          newState.playerMonster.currentHP += structures[index].baseHPGain;
          newState.playerStructures[index].applied = true;
        });
      }
      return stateObj;
    },
    text: (state, index, array) => {
      return `Gain ${array[index].baseHPGain} max HP and heal ${array[index].baseHPGain}. (Build cost: ${array[index].buildCost})`
    },
    minReq: (state, index, array) => { return 0; },
    upgrades: 0,
    baseCost: 0,
    cost: (state, index, array) => { return 0; },
    cardType: "structure",
    elementType: "earth",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = createStructure(stateObj, array[index], "player");
      return stateObj;
    }
  },
};


// Attach player structure cards to the main card pool
Object.assign(cards, playerStructureCards);
