import CreateElement from "../Utilities/00.Create_Element.js";
import Widget_Container from "./00.Widget_Container.js";
import Dashboard from "../Dashboard.js";
import LocalSave from "../Utilities/01.Local_Save.js";

const DashboardNode = document.getElementById("Dashboard");
const PomodoroIcon = document.getElementById("PomodoroWidget");

class Widget_Pomodoro {
  constructor(Index, Id, ParentNode) {
    this.index = Index;
    this.id = Id;
    this.duration = 25 * 60; // 25 minutes
    this.remainingTime = this.duration;
    this.interval = null;
    this.content = this.createWidget(ParentNode);
  }
  createWidget(parent) {
    const container = CreateElement.createDiv(
      `PomodoroContainer${this.index}`,
      "pomodoro-widget",
      parent
    );
    parent.setAttribute("data-type", "pomodoro-widget");

    const title = document.createElement("h3");
    title.textContent = "Pomodoro Timer";
    container.appendChild(title);

    this.timerText = CreateElement.createDiv(
      `PomodoroTimer${this.index}`,
      "pomodoro-timer",
      container
    );

    this.updateDisplay();

    const startButton = CreateElement.createButton(
      `PomodoroStart${this.index}`,
      "btn",
      "Démarrer",
      this.startTimer.bind(this),
      container
    );

    const resetButton = CreateElement.createButton(
      `PomodoroReset${this.index}`,
      "btn",
      "Réinitialiser",
      this.resetTimer.bind(this),
      container
    );

    return container;
  }
  updateDisplay() {
    const minutes = String(Math.floor(this.remainingTime / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(this.remainingTime % 60).padStart(2, "0");
    this.timerText.textContent = `${minutes}:${seconds}`;
  }
  startTimer() {
    if (this.interval) return; // Empêche de relancer un timer déjà actif

    this.interval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
        this.updateDisplay();
      } else {
        this.completeTimer();
      }
    }, 1000);
  }
  resetTimer() {
    clearInterval(this.interval);
    this.interval = null;
    this.remainingTime = this.duration;
    this.updateDisplay();
  }
  completeTimer() {
    clearInterval(this.interval);
    this.interval = null;
    alert("Session terminée! Bon travail! 🍅");
    this.remainingTime = this.duration;
    this.updateDisplay();
  }
}
export default Widget_Pomodoro;

let newWidget = () => {
  Dashboard.widgetID++;
  let containerId = `Widget${Dashboard.widgetIndex}`;
  let widgetId = `Pomodoro${Dashboard.widgetIndex}`;

  new Widget_Container(
    Dashboard.widgetIndex,
    containerId,
    DashboardNode,
    "Pomodoro"
  );

  new Widget_Pomodoro(
    Dashboard.widgetIndex,
    widgetId,
    document.getElementById(`Widget${Dashboard.widgetIndex}`)
  );
};

let assignEvent = () => {
  PomodoroIcon.addEventListener("click", () => {
    newWidget();
    LocalSave.saveDashboard();
  });
};
document.addEventListener("DOMContentLoaded", assignEvent);
