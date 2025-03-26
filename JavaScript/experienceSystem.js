const DEFAULT_XP = 0;
const DEFAULT_LEVEL = 1;
let totalXP = DEFAULT_XP;

function getNeededXPForLevel(level) {
  const baseXP = 100;
  const scaling = 1.2;
  return Math.round(baseXP * Math.pow(scaling, level - 1));
}

function calculateLevel(totalXP) {
  let level = 1;
  let xpRemaining = totalXP;

  while (xpRemaining >= getNeededXPForLevel(level)) {
    xpRemaining -= getNeededXPForLevel(level);
    level++;
  }

  return {
    level: level,
    xpInLevel: xpRemaining,
    xpForNextLevel: getNeededXPForLevel(level),
  };
}

function addXP(amountXP) {
  totalXP += amountXP;
  const resultLevel = calculateLevel(totalXP);
  console.log(
    `Level ${resultLevel.level} - ${resultLevel.xpInLevel} / ${resultLevel.xpForNextLevel} XP`
  );
}

function getXP() {
  return totalXP;
}
