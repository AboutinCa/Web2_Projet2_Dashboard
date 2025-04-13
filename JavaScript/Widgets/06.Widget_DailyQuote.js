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

  createWidget(parentNode) {
    const container = CreateElement.createDiv(
      `QuoteDiv${this.index}`,
      "quote-container",
      parentNode
    );
    const title = CreateElement.createElementWithText("h3", "😌", container);

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
      const response = await fetch ("./data/Quotes.json");
      const data = await response.json();

      const quotes = data.quotes;
      const randomIndex = Math.floor(Math.random() * quotes.length);
      this.quoteText.textContent = quotes[randomIndex];
    } 
    catch (error) {
      console.error("Erreur de chargement des quotes")
      this.quoteText.textContent = "";
    }
  }
}

export default Widget_DailyQuote;

let newWidget = () => {
  Dashboard.widgetID++;
  let widgetId = `widget${Dashboard.widgetID}`;

  new Widget_Container(
    Dashboard.widgetID,
    widgetId,
    DashboardNode,
    "Quote of the Day"
  );

  new Widget_DailyQuote(
    Dashboard.widgetID,
    widgetId,
    document.getElementById(`WidgetContent${Dashboard.widgetID}`)
  );

  if (!LocalSave.SavedWidgets) {
    LocalSave.SavedWidgets = [];
  }
  LocalSave.SavedWidgets.push({index: Dashboard.widgetID, id:widgetId});
  LocalSave.saveItem("Widgets", LocalSave.SavedWidgets);
};
DailyQuoteIcon.addEventListener("click", () => {
  newWidget();
});
