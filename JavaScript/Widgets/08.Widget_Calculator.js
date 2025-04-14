import CreateElement from "../Utilities/00.Create_Element.js";
import Widget_Container from "./00.Widget_Container.js";
import Dashboard from "../Dashboard.js";
import LocalSave from "../Utilities/01.Local_Save.js";

const DashboardNode = document.getElementById("Dashboard");
const CalculatorIcon = document.getElementById("CalculatorWidget");

class Widget_Calculator {
  constructor(Index, Id, ParentNode) {
    this.index = Index;
    this.id = Id;
    this.content = this.createWidget(ParentNode);
  }
  createWidget(parent) {
    const container = CreateElement.createDiv(
      `CalculatorContainer${this.index}`,
      "calculator-widget",
      parent
    );
    parent.setAttribute("data-type", "calculator-widget");

    const title = document.createElement("h3");
    title.textContent = "Calculatrice";
    container.appendChild(title);

    this.input = CreateElement.createInput(
      `CalculatorInput${this.index}`,
      "calculator-input",
      "text",
      "expression",
      "Calculatrice",
      container
    );

    this.result = CreateElement.createDiv(
      `CalculatorResult${this.index}`,
      "calculator-result",
      container
    );

    this.input.addEventListener("input", () => {
      this.calculateExpression();
    });

    return container;
  }

  //user tape un string "1+2*3^4"
  //on remplace ^ par ** (exposant en js)
  //on transforme la string en Function qui va juste prendre la string et en faire un retour
  //return (1+2*3**4)
  //return (1+2*81)
  //return (1+162)
  // return (163)
  calculateExpression() {
    const expression = this.input.value;
    const validExpression = /^[0-9+\-*/().\s^]*$/.test(expression);

    if (!validExpression || expression.trim() === "") {
      this.result.textContent = ". . .";
      return;
    }

    try {
      const safeExpression = expression.replace(/\^/g, "**"); //exposant en js -> ** (et pas ^ (10^2))
      const result = Function(`"use strict"; return (${safeExpression})`)();

      //si c'est pas un nombre -> erreur
      if (isNaN(result)) {
        this.result.textContent = ". . .";
      } else {
        //je veux que 2/2 = 1 et 1/2 = 0.5 (pas 1.000 et 0.500)
        const finalResult = Number.isInteger(result)
          ? result
          : parseFloat(result.toFixed(4)); //toFixed(4) assure 4 chiffres max après le point
        this.result.textContent = `Résultat : ${finalResult}`;
      }
    } catch {
      this.result.textContent = ". . .";
    }
  }
}

export default Widget_Calculator;

let newWidget = () => {
  Dashboard.widgetID++;
  let containerId = `Widget${Dashboard.widgetIndex}`;
  let widgetId = `Calculator${Dashboard.widgetIndex}`;

  new Widget_Container(
    Dashboard.widgetIndex,
    containerId,
    DashboardNode,
    "Calculatrice"
  );

  new Widget_Calculator(
    Dashboard.widgetIndex,
    widgetId,
    document.getElementById(`Widget${Dashboard.widgetIndex}`)
  );
};

let assignEvent = () => {
  CalculatorIcon.addEventListener("click", () => {
    newWidget();
    LocalSave.saveDashboard();
  });
};
document.addEventListener("DOMContentLoaded", assignEvent);
