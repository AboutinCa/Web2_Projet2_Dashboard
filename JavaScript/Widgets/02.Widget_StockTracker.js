import CreateElement from "../Utilities/00.Create_Element.js";
import Widget_Container from "./00.Widget_Container.js";
import LocalSave from "../Utilities/01.Local_Save.js";
import Dashboard from "../Dashboard.js";
import Utilities from "../Utilities/00.Widget_Utilities.js";

const DashboardNode = document.getElementById("Dashboard");
const StockIcon = document.getElementById("StockTracker");

class Widget_StockTracker {
  constructor(Index, Id, ParentNode) {
    this.index = Index;
    this.id = Id;
    this.favorites = this.loadFavorites();
    this.content = this.createWidget(ParentNode);
  }

  createWidget(parent) {
    const container = CreateElement.createDiv(
      `StockContainer${this.index}`,
      "stock-tracker",
      parent
    );
    parent.setAttribute("data-type", "stock-widget");

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
      "small-btn",
      "Rechercher",
      null,
      container
    );

    const result = CreateElement.createDiv(
      `StockResult${this.index}`,
      "stock-result",
      container
    );

    this.history = this.loadHistory();
    this.historyContainer = CreateElement.createDiv(
      `StockHistory${this.index}`,
      "stock-history",
      container
    );

    this.favoritesContainer = CreateElement.createDiv(
      `StockFavorites${this.index}`,
      "stock-favorites",
      container
    );

    this.renderHistory();
    this.input = input;
    this.result = result;
    this.renderFavorites();

    button.addEventListener("click", () => {
      const ticker = input.value.trim().toUpperCase();
      if (ticker) this.getStockPrice(ticker, result);
      else result.textContent = "Veuillez entrer un symbole valide.";
    });

    input.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        button.click();
      }
    });
  }

  async getStockPrice(ticker, result) {
    const API_KEY = "cvmjq71r01ql90pucldgcvmjq71r01ql90pucle0";
    const url = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.c) {
        result.textContent = `${ticker} ➜ Prix actuel : $${data.c}`;
        this.updateHistory(ticker);
        this.renderHistory();
      } else {
        result.textContent = "Donnée introuvable";
      }
    } catch (error) {
      result.textContent = "Erreur de chargement";
      console.error(error);
    }
  }

  //section pour l'historique
  loadHistory() {
    const saved = localStorage.getItem("StockHistory");
    return saved ? JSON.parse(saved) : [];
  }

  saveHistory() {
    localStorage.setItem("StockHistory", JSON.stringify(this.history));
  }

  updateHistory(ticker) {
    if (this.favorites.includes(ticker)) return; //Ne pas ajouter dans l’historique si c’est un favori

    //Update l'historique en évitant les doublons
    this.history = this.history.filter(t => t !== ticker);
    this.history.unshift(ticker);
    //limite de 4 tickers dans l'history
    this.history = this.history.slice(0, 4);
    this.saveHistory();
  }

  renderHistory() {
    this.historyContainer.innerHTML = "<strong>Historique :</strong><br>";
    this.history.forEach(ticker => {
      const item = document.createElement("div");
      item.className = "stock-history-item";
      item.innerHTML = `- ${ticker} `;

      const star = document.createElement("span");
      star.textContent = this.favorites.includes(ticker) ? "⭐" : "☆";
      star.style.cursor = "pointer";
      star.style.marginLeft = "8px";

      star.onclick = e => {
        e.stopPropagation(); //empêche que le click lance la recherche
        this.toggleFavorite(ticker);
      };

      item.onclick = () => this.getStockPrice(ticker);
      item.appendChild(star);
      this.historyContainer.appendChild(item);
    });
  }
  loadFavorites() {
    const saved = localStorage.getItem("StockFavorites");
    return saved ? JSON.parse(saved) : [];
  }

  toggleFavorite(ticker) {
    if (!this.favorites.includes(ticker)) {
      this.favorites.push(ticker);
    } else {
      this.favorites = this.favorites.filter(t => t !== ticker);
    }
    localStorage.setItem("StockFavorites", JSON.stringify(this.favorites));
    this.renderHistory(); //pour mettre à jour les étoiles affichées
    this.renderFavorites();
  }

  renderFavorites() {
    this.favoritesContainer.innerHTML = "<strong>Favoris :</strong><br>";
    this.favorites.forEach(ticker => {
      const favItem = document.createElement("div");
      favItem.className = "stock-favorite-item";
      favItem.style.display = "flex";
      favItem.style.alignItems = "center";
      favItem.style.gap = "8px";

      //section qui fait en sorte que mon ticker est clickable
      const label = document.createElement("span");
      label.textContent = `- ${ticker}`;
      label.style.cursor = "pointer";
      label.style.color = "white";
      label.onclick = () => {
        this.input.value = ticker;
        this.getStockPrice(ticker, this.result);
      };

      // ptite étoile à droite
      const star = document.createElement("span");
      star.textContent = "⭐";
      star.style.cursor = "pointer";
      star.onclick = () => {
        this.toggleFavorite(ticker); //va aussi relancer renderFavorites
        this.renderHistory(); //pour mettre à jour l'autre étoile
      };

      favItem.appendChild(label);
      favItem.appendChild(star);
      this.favoritesContainer.appendChild(favItem);
    });
  }
}
export default Widget_StockTracker;

let newStockTracker = () => {
  Dashboard.widgetIndex++;
  let containerId = `Widget${Dashboard.widgetIndex}`;
  let widgetId = `Stock${Dashboard.widgetIndex}`;

  new Widget_Container(
    Dashboard.widgetIndex,
    containerId,
    DashboardNode,
    "Stock Tracker"
  );

  new Widget_StockTracker(
    Dashboard.widgetIndex,
    widgetId,
    document.getElementById(`Widget${Dashboard.widgetIndex}`)
  );
};

let assignEvent = () => {
  StockIcon.addEventListener("click", () => {
    newStockTracker();
    LocalSave.saveDashboard();
  });
};
document.addEventListener("DOMContentLoaded", assignEvent);
