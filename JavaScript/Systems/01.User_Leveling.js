import LocalSave from "../Utilities/01.Local_Save.js";



/*Le but: 
    1. Afficher le niveau actuel : Lv. X (XPLevelBadge)
    2. Afficher l'xp actuel / xp requis (100/1000) (xpInLevel/xpForNextLevel)
    3. Afficher le % de progression (10%) (percent)
    4. Une belle barre d'xp cute (XPBarInner/XPBarOuter)
*/
const DEFAULT_LEVEL = 1;
const DEFAULT_XP = 0;
let totalXP = DEFAULT_XP;
const Function = {
  
  getNeededXPForLevel(level) {
    const baseXP = 100;
    const scaling = 1.2;
    return Math.round(baseXP * Math.pow(scaling, level - 1));
  },

  calculateLevel(expPoint) {
    let level = 1;
    let xpRemaining = expPoint;

    while (xpRemaining >= this.getNeededXPForLevel(level)) {
      xpRemaining -= this.getNeededXPForLevel(level);
      level++;
    }

    return {
      level: level,
      xpInLevel: xpRemaining,
      xpForNextLevel: this.getNeededXPForLevel(level),
    };
  },

  addXP(amountXP) {
    totalXP += amountXP;
    LocalSave.saveItem("xpTotal", totalXP);

    const resultLevel = this.calculateLevel(totalXP);
    console.log(
      `Level ${resultLevel.level} - ${resultLevel.xpInLevel} / ${resultLevel.xpForNextLevel} XP`
    );
    this.updateXPBar();1
  },

  getXP() {
    return totalXP;
  },

  updateXPBar() {
    const result = this.calculateLevel(totalXP);
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
  },
  setXP(newXP) {
    totalXP = newXP;
    this.updateXPBar();
  }
}

const ExpSystem = {
  Function,
  DEFAULT_XP,
  totalXP
}

export default ExpSystem;