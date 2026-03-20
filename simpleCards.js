let basicCardsNew = {

swordSlash: {
    cardID: 24,
    name: "Raiding Party",
    text: (state, index, array) => { 
        let textString = `Deal ${array[index].baseDamage + (array[index].upgrades*5) + state.playerMonster.strength} damage`;
      if (array[index].baseHits > 1) {
        textString += ` ${array[index].baseHits} times` 
      } 
      if (array[index].targetType === "front") {
        textString += ` to the enemy in front`
      } else if (array[index].targetType === "all") {
        textString += ` to ALL enemies`
      } 
      return textString
  },
  minReq: (state, index, array) => {
    return array[index].baseCost;
  },
    baseCost: 1,
    cost:  (state, index, array) => {
      return array[index].baseCost;
    },
    targetType: "front",
    upgrades: 0,
    baseDamage: 8,
    baseHits: 1,
    cardType: "attack",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      let calculatedDamage = array[index].baseDamage + (array[index].upgrades*5)
      await addDiscardAnimation(index)
      await addDealOpponentDamageAnimation(stateObj, calculatedDamage)
      await pause(800)
      await finishDiscardAnimation(index)
      await removeDealOpponentDamageAnimation(stateObj, calculatedDamage)

      stateObj = await dealOpponentDamage(stateObj, calculatedDamage, array[index].baseHits, array[index].baseCost, array[index].targetType)
      return stateObj;
    }
  },

  overheadSwing: {
    cardID: 24,
    name: "Cavalry Charge",
    text: (state, index, array) => { 
        let textString = `Deal ${array[index].baseDamage + (array[index].upgrades*5) + state.playerMonster.strength} damage`;
      if (array[index].baseHits > 1) {
        textString += ` ${array[index].baseHits} times` 
      } 
      if (array[index].targetType === "front") {
        textString += ` to the enemy in front`
      } else if (array[index].targetType === "all") {
        textString += ` to ALL enemies`
      } 
      return textString
  },
  minReq: (state, index, array) => {
    return array[index].baseCost;
  },
    baseCost: 2,
    cost:  (state, index, array) => {
      return array[index].baseCost;
    },
    targetType: "front",
    upgrades: 0,
    baseDamage: 13,
    baseHits: 1,
    cardType: "attack",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      let calculatedDamage = array[index].baseDamage + (array[index].upgrades*5)
      await addDiscardAnimation(index)
      await addDealOpponentDamageAnimation(stateObj, calculatedDamage)
      await pause(800)
      await finishDiscardAnimation(index)
      await removeDealOpponentDamageAnimation(stateObj, calculatedDamage)

      stateObj = await dealOpponentDamage(stateObj, calculatedDamage, array[index].baseHits, array[index].baseCost, array[index].targetType)
      return stateObj;
    }
  },

  bowShot: {
    cardID: 24,
    name: "Archer Volley",
    text: (state, index, array) => { 
        let textString = `Deal ${array[index].baseDamage + (array[index].upgrades*5) + state.playerMonster.strength} damage`;
      if (array[index].baseHits > 1) {
        textString += ` ${array[index].baseHits} times` 
      } 
      if (array[index].targetType === "specific") {
        textString += ` to the targeted enemy`
      } else if (array[index].targetType === "all") {
        textString += ` to ALL enemies`
      } 
      return textString
  },
  minReq: (state, index, array) => {
    return array[index].baseCost;
  },
    baseCost: 1,
    cost:  (state, index, array) => {
      return array[index].baseCost;
    },
    targetType: "specific",
    upgrades: 0,
    baseDamage: 5,
    baseHits: 1,
    cardType: "attack",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      let calculatedDamage = array[index].baseDamage + (array[index].upgrades*5)
      await addDiscardAnimation(index)
      await addDealOpponentDamageAnimation(stateObj, calculatedDamage)
      await pause(800)
      await finishDiscardAnimation(index)
      await removeDealOpponentDamageAnimation(stateObj, calculatedDamage)

      stateObj = await dealOpponentDamage(stateObj, calculatedDamage, array[index].baseHits, array[index].baseCost, array[index].targetType)
      return stateObj;
    }
  },

  shieldBlock: {
    cardID: 6,
    name: "Raise Walls",
    text: (state, index, array) => { 
      return `Gain ${array[index].baseBlock + state.playerMonster.dex + (5*array[index].upgrades)} block` 
    },
    minReq: (state, index, array) => {
      return array[index].baseCost;
    },
    upgrades: 0,
    baseCost: 1,
    cost:  (state, index, array) => {
      return array[index].baseCost;
    },
    baseBlock: 6,
    cardType: "ability",
    elementType: "fire",
    action: async (stateObj, index, array) => {
      await cardAnimationDiscard(index);
      stateObj = gainBlock(stateObj, array[index].baseBlock + (5*array[index].upgrades), array[index].baseCost)
      //stateObj = gainEnergy(stateObj, array[index].baseBlock + (5*array[index].upgrades), array[index].baseCost)
      return stateObj;
    }
  },

}