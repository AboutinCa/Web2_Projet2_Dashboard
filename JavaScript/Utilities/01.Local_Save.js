import Dashboard from "../Dashboard.js";
import ExpSystem from "../Systems/01.User_Leveling.js";
import Utilities from "./00.Widget_Utilities.js";
import Widget_Container from "../Widgets/00.Widget_Container.js";
import Widget_ToDoList from "../Widgets/01.Widget_TodoList.js";
import Widget_StockTracker from "../Widgets/02.Widget_StockTracker.js";
import Widget_StickyNote from "../Widgets/03.Widget_StickyNotes.js";
import Widget_StickyNotes from "../Widgets/03.Widget_StickyNotes.js";
import Widget_Weather from "../Widgets/04.Widget_Weather.js";
import Widget_IdleGame from "../Widgets/05.Widget_IdleGame.js";
import Widget_DailyQuote from "../Widgets/06.Widget_DailyQuote.js";
import Widget_Pomodoro from "../Widgets/07.Widget_Pomodoro.js";
import Widget_Calculator from "../Widgets/08.Widget_Calculator.js";

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
    ExpSystem.Function.setXP(0);
    this.saveItem("xpTotal", 0);
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
      ExpSystem.Function.setXP(savedXP);
      this.saveItem("xpTotal", savedXP);
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
        if (widget.type === "todolist-widget") {
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
            document.getElementById(widget.id)
          );
          const stockContainer = document.getElementById(
            `StockContainer${widget.index}`
          ).parentNode;

          stockContainer.style.position = "fixed";
          stockContainer.style.width = widget.width + "px";
          stockContainer.style.height = widget.height + "px";
          stockContainer.style.left = widget.posX + "px";
          stockContainer.style.top = widget.posY + "px";
        }
        if (widget.type === "stickynote-widget") {
          new Widget_Container(
            widget.index,
            widget.id,
            DashboardNode,
            "Sticky Note"
          );
          new Widget_StickyNotes(
            widget.index,
            widget.id,
            document.getElementById(widget.id)
          );

          const stickyNote = document.getElementById(
            `StickyNoteContainer${widget.index}`
          ).parentNode;
          stickyNote.style.position = "fixed";
          stickyNote.style.width = widget.width + "px";
          stickyNote.style.height = widget.height + "px";
          stickyNote.style.left = widget.posX + "px";
          stickyNote.style.top = widget.posY + "px";
        }
        if (widget.type === "weather-widget") {
          new Widget_Container(widget.index, widget.id, DashboardNode, "Météo");
          new Widget_Weather(
            widget.index,
            widget.id,
            document.getElementById(widget.id)
          );
          const weather = document.getElementById(
            `WeatherContainer${widget.index}`
          ).parentNode;
          weather.style.position = "fixed";
          weather.style.width = widget.width + "px";
          weather.style.height = widget.height + "px";
          weather.style.left = widget.posX + "px";
          weather.style.top = widget.posY + "px";
        }
        if (widget.type === "idleGame-widget") {
          new Widget_Container(
            widget.index,
            widget.id,
            DashboardNode,
            "Temple du TDAH"
          );
          new Widget_IdleGame(
            widget.index,
            widget.id,
            document.getElementById(widget.id)
          );

          const idleGame = document.getElementById(
            `IdleGameContainer${widget.index}`
          ).parentNode;
          idleGame.style.position = "fixed";
          idleGame.style.width = widget.width + "px";
          idleGame.style.height = widget.height + "px";
          idleGame.style.left = widget.posX + "px";
          idleGame.style.top = widget.posY + "px";
        }
        if (widget.type === "quote-widget") {
          new Widget_Container(
            widget.index,
            widget.id,
            DashboardNode,
            "Quote of the Day"
          );

          new Widget_DailyQuote(
            widget.index,
            widget.id,
            document.getElementById(widget.id)
          );

          const dailyQuote = document.getElementById(
            `QuoteContainer${widget.index}`
          ).parentNode;
          dailyQuote.style.position = "fixed";
          dailyQuote.style.width = widget.width + "px";
          dailyQuote.style.height = widget.height + "px";
          dailyQuote.style.left = widget.posX + "px";
          dailyQuote.style.top = widget.posY + "px";
        }
        if (widget.type === "pomodoro-widget") {
          new Widget_Container(
            widget.index,
            widget.id,
            DashboardNode,
            "Pomodoro"
          );
          new Widget_Pomodoro(
            widget.index,
            widget.id,
            document.getElementById(widget.id)
          );
          const pomodoro = document.getElementById(
            `PomodoroContainer${widget.index}`
          ).parentNode;
          pomodoro.style.position = "fixed";
          pomodoro.style.width = widget.width + "px";
          pomodoro.style.height = widget.height + "px";
          pomodoro.style.left = widget.posX + "px";
          pomodoro.style.top = widget.posY + "px";
        }
        if (widget.type === "calculator-widget") {
          new Widget_Container(
            widget.index,
            widget.id,
            DashboardNode,
            "Calculatrice"
          );

          new Widget_Calculator(
            widget.index,
            widget.id,
            document.getElementById(widget.id)
          );

          const calculator = document.getElementById(
            `CalculatorContainer${widget.index}`
          );
          calculator.style.position = "fixed";
          calculator.style.width = widget.width + "px";
          calculator.style.height = widget.height + "px";
          calculator.style.left = widget.posX + "px";
          calculator.style.top = widget.posY + "px";
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
