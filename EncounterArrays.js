// Town encounter arrays
// First 2 fights always pull from beginnerEncounterPool (defined in EnemyTesting.js)
// Remaining fights pull from moderateEncounterPool or harder pools

let town1 = [
  ...beginnerEncounterPool,
  ...moderateEncounterPool,
]

let town2 = [
  ...beginnerEncounterPool,
  ...moderateEncounterPool,
]

let town3 = [
  ...beginnerEncounterPool,
  ...moderateEncounterPool,
]

let town4 = [
  ...beginnerEncounterPool,
  ...moderateEncounterPool,
]

let towns = [town1, town2, town3, town4]

let easyEncounters = [
  [testEnemies.siegeCamp],
  [testEnemies.outpost],
  [testEnemies.fortifier],
]

let mediumEncounters = [
  [testEnemies.warCamp],
  [testEnemies.armoredGarrison],
  [testEnemies.plagueVillage],
]

let hardEncounters = [
  [testEnemies.siegeCamp],
  [testEnemies.outpost],
  [testEnemies.fortifier],
]


let bosses = [
    [bossMonsters.boss1],
    [bossMonsters.boss2],
    [bossMonsters.boss3],
    [bossMonsters.boss4],
    [bossMonsters.boss5],
    [bossMonsters.healgymboss, bossMonsters.healgymguard2],
]
