import Dashboard from "../Dashboard.js";
import ExpSytem from "../Systems/01.User_Leveling.js";
import Widget_Container from "../Widgets/00.Widget_Container.js";
import Widget_ToDoList from "../Widgets/01.Widget_TodoList.js";
import Widget_StockTracker from "../Widgets/02.Widget_StockTracker.js";
import Utilities from "./00.Widget_Utilities.js";

const DashboardNode = document.getElementById("Dashboard");

//Fonction 1 : Enregistrer une donnée (saveItem)
//Fonction 2 : Loader une donnée (loadItem)
//Fonction 3 : Supprimer une donnée (deleteItem)
//Fonction 4 : Reset les données d'un seul widget (resetWidget)
//Fonction 5 : Reset toutes les données du dashboard (resetAll)
//Fonction 6 : Reset l'xp (resetXP)
//Fonction 7 : Autoload les données (loadAllSavedData)

//utilise une clé et une valeur
//localStorage peut juste stocker des strings, dont je fais stringify sur ma value
const LocalSave = {
  saveItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  loadLocalStorageKey(key) {
    const value = localStorage.getItem(key);
    //if value existe, then JSON.parse, sinon null
    return value ? JSON.parse(value) : null;
  },

  loadWidgetArray(key) {
    const widgetData = localStorage.getItem(key);
    return widgetData ? JSON.parse(widgetData) : [];
  },

  deleteItem(key) {
    localStorage.removeItem(key);
  },

  resetWidget(widgetKey) {
    this.deleteItem(widgetKey);
  },

  resetAll() {
    localStorage.clear();
    ExpSytem.totalXP = 0;
    ExpSytem.Function.updateXPBar();
  },

  resetXP() {
    const confirm1 = confirm(
      "Êtes-vous SÛR de vouloir réinitialiser votre progression ?"
    );
    if (!confirm1) return;
    const confirm2 = confirm("Êtes-vous VRAIMENT SÛR ?");
    if (!confirm2) return;
    ExpSytem.totalXP = 0;
    this.saveItem("xpTotal", ExpSytem.totalXP);
    ExpSytem.Function.updateXPBar();
  },

  //fonction autoload qui charge des données au loading de la page
  loadTotalXp() {
    const savedXP = this.loadLocalStorageKey("xpTotal");
    if (savedXP !== null) {
      ExpSytem.totalXP = savedXP;
      ExpSytem.Function.updateXPBar();
    }
  },

  saveDashboard() {
    const Board = document.getElementById("Dashboard");
    Dashboard.SavedWidgets = [];
    Dashboard.widgetIndex = 0;

    Array.from(Board?.children).forEach(widget => {
      Dashboard.widgetIndex++;
      Dashboard.SavedWidgets.push({
        index: Dashboard.widgetIndex,
        id: `Widget${Dashboard.widgetIndex}`,
        type: Utilities.GetType(widget),
        width: Utilities.GetWidth(widget),
        height: Utilities.GetHeight(widget),
        posX: Utilities.GetPosX(widget),
        posY: Utilities.GetPosY(widget),
        content: widget.innerHTML,
      });
    });

    LocalSave.saveItem("WidgetID", Dashboard.widgetIndex);
    LocalSave.saveItem("Widgets", Dashboard.SavedWidgets);
  },

  loadAllWidgets() {
    // TODO Modifier pour que ca load les differents widgets
    const savedWidgets = this.loadWidgetArray("Widgets");

    if (savedWidgets !== null) {
      savedWidgets.forEach(widget => {
        if (widget.type === "stock-widget") {
          new Widget_Container(
            widget.index,
            widget.id,
            DashboardNode,
            "Stock Tracker"
          );
          new Widget_StockTracker(
            widget.index,
            widget.id,
            document.getElementById(`Widget${widget.index}`)
          );
          const stockContainer = document.getElementById(
            `StockContainer${widget.index}`
          ).parentNode;

          stockContainer.style.position = "fixed";
          stockContainer.style.width = widget.width + "px";
          stockContainer.style.height = widget.height + "px";
          stockContainer.style.left = widget.posX + "px";
          stockContainer.style.top = widget.posY + "px";
        } else if (widget.type === "todolist-widget") {
          new Widget_Container(
            widget.index,
            widget.id,
            DashboardNode,
            "To-do list"
          );
          new Widget_ToDoList(
            widget.index,
            widget.id,
            document.getElementById(`Widget${widget.index}`)
          );
          const widgetTDList = document.getElementById(
            `TDList${widget.index}`
          ).parentNode;

          widgetTDList.style.position = "fixed";
          widgetTDList.style.width = widget.width + "px";
          widgetTDList.style.height = widget.height + "px";
          widgetTDList.style.left = widget.posX + "px";
          widgetTDList.style.top = widget.posY + "px";
        }
      });
    }
  },
};
export default LocalSave;

document.addEventListener("DOMContentLoaded", () => {
  LocalSave.loadTotalXp();
  LocalSave.loadAllWidgets();
  LocalSave.loadLocalStorageKey("WidgetID");
});

// section debug, pour qu'on puisse appeler les fonctions en console
// window.saveItem = saveItem;
// window.loadItem = loadItem;
// window.deleteItem = deleteItem;
// window.resetAll = resetAll;
// window.resetWidget = resetWidget;
// window.resetXP = resetXP;
