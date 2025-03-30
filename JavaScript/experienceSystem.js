/*Le but: 
    1. Afficher le niveau actuel : Lv. X (XPLevelBadge)
    2. Afficher l'xp actuel / xp requis (100/1000) (xpInLevel/xpForNextLevel)
    3. Afficher le % de progression (10%) (percent)
    4. Une belle barre d'xp cute (XPBarInner/XPBarOuter)
*/
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
  saveItem("xpTotal", totalXP);

  const resultLevel = calculateLevel(totalXP);
  console.log(
    `Level ${resultLevel.level} - ${resultLevel.xpInLevel} / ${resultLevel.xpForNextLevel} XP`
  );
  updateXPBar();1
}

function getXP() {
  return totalXP;
}

function updateXPBar() {
  const result = calculateLevel(totalXP);
  const percent = Math.round((result.xpInLevel / result.xpForNextLevel) * 100);
  const label = document.getElementById("XPLabel");
  const levelBadge = document.getElementById("XPLevelBadge");
  if (levelBadge) {
      levelBadge.textContent = `Lv.${result.level}`;
  }
  if (label) {
    label.textContent = `${result.xpInLevel} / ${result.xpForNextLevel} | ${percent}%`;
  }
  const bar = document.getElementById("XPBarInner");
  if (bar) {
    bar.style.width = `${percent}%`;
  }

}


///
document.addEventListener("DOMContentLoaded", () => {
      loadAllSavedData();
});