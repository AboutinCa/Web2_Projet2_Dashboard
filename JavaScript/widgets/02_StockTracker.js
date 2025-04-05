import CreateElement from "../Utilities/Obj_CreateElement.js";
import Widget_Container from "./0.Widget_Container.js";
import LocalSave from "../Utilities/Obj_localSave.js";

const Dashboard = document.getElementById("Dashboard");
const StockIcon = document.getElementById("StockTracker");

class Widget_StockTracker {
    constructor(Index, Id, ParentNode) {
        this.index = Index;
        this.id = Id;
        this.content = this.createWidget(ParentNode);
    }

    createWidget(parentNode) {
        const container = CreateElement.createDiv(
            `StockContainer${this.index}`,
            "stock-tracker",
            parentNode
        );

        const input = CreateElement.createInput(
            `StockInput${this.index}`,
            "stock-input",
            "text",
            "stockTicker",
            "Entrez un symbole ex: AAPL",
            container
        );

        const button = CreateElement.createButton(
            `StockButton${this.index}`,
            "btn",
            "Rechercher",
            container
        );

        const result = CreateElement.createDiv(
            `StockResult${this.index}`,
            "stock-result",
            container
        );

        button.addEventListener("click", () => {
            const ticker = input.value.trim().toUpperCase();
            if (ticker) this.getStockPrice(ticker, result);
            else result.textContent = "Veuillez entrer un symbole valide.";
        });

        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                button.click();
            }
        });
        
    }

    async getStockPrice(ticker, result) {
        const API_KEY= "cvmjq71r01ql90pucldgcvmjq71r01ql90pucle0";
        const url = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${API_KEY}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.c) {
                result.textContent = `${ticker} ➜ Prix actuel : $${data.c}`;
            } else {
                result.textContent = "Donnée introuvable.";
            }
        } catch (error) {
            result.textContent = "Erreur de chargement.";
            console.error(error);
        }
    }
}
export default Widget_StockTracker;

let widgetIndex = 0;

let newWidget = () => {
  widgetIndex++;
  let widgetId = `widget${widgetIndex}`;
  
  new Widget_Container(widgetIndex, widgetId, Dashboard, "Stock Tracker");

  new Widget_StockTracker(
    widgetIndex,
    widgetId,
    document.getElementById(`WidgetContent${widgetIndex}`)
  );

  LocalSave.SavedWidgets.push({ index: widgetIndex, id: widgetId });
  LocalSave.saveItem("Widgets", LocalSave.SavedWidgets);
};

StockIcon.addEventListener("click", () => {
  newWidget();
});
