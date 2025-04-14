import CreateElement from "../Utilities/00.Create_Element.js";
import LocalSave from "../Utilities/01.Local_Save.js";
import Widget_Container from "./00.Widget_Container.js";
import Dashboard from "../Dashboard.js";

const DashboardNode = document.getElementById("Dashboard");
const DailyQuoteIcon = document.getElementById("DailyQuoteWidget");

class Widget_DailyQuote {
  constructor(Index, Id, ParentNode) {
    this.index = Index;
    this.id = Id;
    this.container = this.createWidget(ParentNode);
  }

  createWidget(parent) {
    const container = CreateElement.createDiv(
      `QuoteContainer${this.index}`,
      "quote-container",
      parent
    );
    parent.setAttribute("data-type", "quote-widget");

    CreateElement.createElementWithText("h3", "😌", container);

    this.quoteText = CreateElement.createPara(
      `QuoteText${this.index}`,
      "quote-text",
      "",
      container
    );

    this.displayRandomQuote();
    return container;
  }

  async displayRandomQuote() {
    try {
      const response = await fetch("./data/Quotes.json");
      const data = await response.json();

      const quotes = data.quotes;
      const randomIndex = Math.floor(Math.random() * quotes.length);
      this.quoteText.textContent = quotes[randomIndex];
    } catch (error) {
      console.error("Erreur de chargement des quotes");
      this.quoteText.textContent = "";
    }
  }
}

export default Widget_DailyQuote;

let newWidget = () => {
  Dashboard.widgetID++;
  let containerId = `Widget${Dashboard.widgetIndex}`;
  let widgetId = `Quote${Dashboard.widgetIndex}`;

  new Widget_Container(
    Dashboard.widgetIndex,
    containerId,
    DashboardNode,
    "Quote of the Day"
  );

  new Widget_DailyQuote(
    Dashboard.widgetIndex,
    widgetId,
    document.getElementById(`Widget${Dashboard.widgetIndex}`)
  );
};

let assignEvent = () => {
  DailyQuoteIcon.addEventListener("click", () => {
    newWidget();
    LocalSave.saveDashboard();
  });
};
document.addEventListener("DOMContentLoaded", assignEvent);
