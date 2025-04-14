import CreateElement from "../Utilities/00.Create_Element.js";
import Widget_Container from "./00.Widget_Container.js";
import LocalSave from "../Utilities/01.Local_Save.js";
import Dashboard from "../Dashboard.js";
import ExpSystem from "../Systems/01.User_Leveling.js";

const DashboardNode = document.getElementById("Dashboard");
const GameIcon = document.getElementById("IdleGameWidget");

class Widget_IdleGame {
  constructor(Index, Id, ParentNode) {
    this.index = Index;
    this.id = Id;
    this.container = this.createWidget(ParentNode);
    this.keyLastCollect = `IdleGame_Last_${this.id}`;
    this.lastCollect = this.loadLastCollect();
    this.interval = setInterval(() => this.updateDisplay(), 1000);
    if (localStorage.getItem("tutorialCompleted") === "true") {
      this.randomBonusSpawn();
    }
    this.bonusShown = false;
  }

  createWidget(parent) {
    const container = CreateElement.createDiv(
      `IdleGameContainer${this.index}`,
      "idle-game-container",
      parent
    );
    parent.setAttribute("data-type", "idleGame-widget");

    const title = CreateElement.createElementWithText("h3", "🏦", container);

    this.timerText = CreateElement.createDiv(
      `IdleTimer${this.index}`,
      "idle-timer",
      container
    );

    this.xpText = CreateElement.createDiv(
      `IdleXPText${this.index}`,
      "idle-xp",
      container
    );

    this.collectButton = CreateElement.createButton(
      `IdleCollect${this.index}`,
      "btn",
      "Récolter l'XP",
      this.collectXP.bind(this),
      container
    );

    this.updateDisplay();
    return container;
  }

  loadLastCollect() {
    const saved = localStorage.getItem(this.keyLastCollect);
    return saved ? new Date(saved) : new Date();
  }

  saveLastCollect(date) {
    localStorage.setItem(this.keyLastCollect, date.toISOString());
  }

  getElapsedTime() {
    const now = new Date();
    const diff = Math.floor((now - this.lastCollect) / 1000);
    const h = String(Math.floor(diff / 3600)).padStart(2, "0");
    const m = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
    const s = String(diff % 60).padStart(2, "0");
    return { diff, text: `${h}:${m}:${s}` };
  }

  updateDisplay() {
    const elapsed = this.getElapsedTime();
    const xp = Math.floor(elapsed.diff / 10) * 10; // xp en multiples de 10
    this.timerText.textContent = `Tu fais 36 choses en même temps depuis : ${elapsed.text}`;
    this.xpText.textContent = `XP cumulée depuis le dernier click : +${xp}`;
    if (xp >= 10) {
      this.collectButton.disabled = false;
      this.collectButton.classList.remove("disabled-btn");
    } else {
      this.collectButton.disabled = true;
      this.collectButton.classList.add("disabled-btn");
    }

    //au début, après 12 secondes, j'introduit le bouton bonus
    if (
      elapsed.diff >= 12 &&
      !this.bonusShown &&
      !localStorage.getItem("tutorialCompleted")
    ) {
      this.showTutorialBonusButton();
      this.bonusShown = true;
    }
  }

  collectXP() {
    const xp = Math.floor(this.getElapsedTime().diff / 10) * 10;
    if (xp < 10) return;

    ExpSystem.Function.addXP(xp);
    this.showFloatingXP(xp);
    this.lastCollect = new Date();
    this.saveLastCollect(this.lastCollect);
    this.updateDisplay();
  }

  showFloatingXP(xpAmount) {
    //AIA
    const floatText = document.createElement("div");
    floatText.className = "floating-xp";
    floatText.textContent = `+${xpAmount} XP`;

    const button = this.container.querySelector("button");
    const rect = button.getBoundingClientRect();

    floatText.style.left = `${rect.left + rect.width / 2}px`;
    floatText.style.top = `${rect.top - 10}px`;

    document.body.appendChild(floatText);

    setTimeout(() => {
      floatText.remove();
    }, 1000);
  }

  showTutorialBonusButton() {
    //le premier bonusButton est garanti a 12 secondes
    //lorsqu'il est cliqué, ça flag le tutorial comme étant complete
    //on passe ensuite aux boutons bonus qui spawn random selon un % de chance
    this.bonusButton = CreateElement.createButton(
      `IdleBonus${this.index}`,
      "btn",
      "Bonus!",
      this.collectBonusXP.bind(this),
      this.container
    );

    //positionnement du bouton à droite de collectButton
    const rect = this.collectButton.getBoundingClientRect();
    this.bonusButton.classList.add("btn-small");
    this.bonusButton.style.position = "absolute";
    this.bonusButton.style.left = `${rect.left + rect.width + 10}px`;
    this.bonusButton.style.top = `${rect.top}px`;

    setTimeout(() => {
      if (!localStorage.getItem("tutorialCompleted")) {
        this.bonusButton.style.display = "block";
      }
    }, 12000);
  }

  showRandomBonusButton() {
    if (this.bonusButton) return; //ne pas créer plusieurs en même temps

    this.bonusButton = CreateElement.createButton(
      `IdleBonus${this.index}`,
      "btn",
      "Bonus!",
      this.collectBonusXP.bind(this),
      this.container
    );

    const rect = this.collectButton.getBoundingClientRect();
    this.bonusButton.classList.add("btn-small");
    this.bonusButton.style.position = "absolute";
    this.bonusButton.style.left = `${rect.left + rect.width + 10}px`;
    this.bonusButton.style.top = `${rect.top}px`;

    setTimeout(() => {
      if (this.bonusButton) {
        this.bonusButton.remove();
        this.bonusButton = null;
      }
    }, 5000);
  }

  collectBonusXP() {
    ExpSystem.Function.addXP(30);
    this.showFloatingXP(30);
    localStorage.setItem("tutorialCompleted", "true");

    if (this.bonusButton) {
      this.bonusButton.remove();
      this.bonusButton = null;
    }

    this.randomBonusSpawn();
  }

  randomBonusSpawn() {
    setInterval(() => {
      const chance = Math.random();
      if (chance <= 0.05) {
        // 5% de chance de réapparaitre chaque seconde
        this.showRandomBonusButton();
      }
    }, 1000);
  }
}

export default Widget_IdleGame;

let newWidget = () => {
  Dashboard.widgetID++;
  let containerId = `Widget${Dashboard.widgetIndex}`;
  let widgetId = `IdleGame${Dashboard.widgetIndex}`;

  new Widget_Container(
    Dashboard.widgetID,
    containerId,
    DashboardNode,
    "Temple du TDAH"
  );

  new Widget_IdleGame(
    Dashboard.widgetID,
    widgetId,
    document.getElementById(`Widget${Dashboard.widgetIndex}`)
  );
};

let assignEvent = () => {
  GameIcon.addEventListener("click", () => {
    newWidget();
    LocalSave.saveDashboard();
  });
};
document.addEventListener("DOMContentLoaded", assignEvent);
