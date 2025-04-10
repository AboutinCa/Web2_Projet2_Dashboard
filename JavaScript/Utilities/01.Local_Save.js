import ExpSystem from "../Systems/01.User_Leveling.js";
import Widget_Container from "../Widgets/00.Widget_Container.js";
import Widget_ToDoList from "../Widgets/01.Widget_TodoList.js";

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

  loadWidgetID(key) {
    const ID = localStorage.getItem(key);
    return ID ? JSON.parse(ID) : null;
  },

  loadItem(key) {
    const value = localStorage.getItem(key);
    //if value existe, then JSON.parse, sinon null
    return value ? JSON.parse(value) : null;
  },

  loadWidget(key) {
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
  
    ExpSystem.Function.setXP(0);
    this.saveItem("xpTotal", 0);
  },
  

  //fonction autoload qui charge des données au loading de la page
  loadAllSavedData() {
    const savedXP = this.loadItem("xpTotal");
    if (savedXP !== null) {
      ExpSystem.Function.setXP(savedXP);
      this.saveItem("xpTotal", savedXP);
    }
  },

  loadAllWidgets() {
    // TODO Modifier pour que ca load les differents widgets
    const savedWidgets = this.loadWidget("Widgets");

    if (savedWidgets !== null) {
      const dataArray = [];

      dataArray.push(savedWidgets);

      savedWidgets.forEach(element => {
        new Widget_Container(
          element.index,
          element.id,
          DashboardNode,
          "Todo List"
        );
        new Widget_ToDoList(
          element.index,
          element.id,
          document.getElementById(`WidgetContent${element.index}`)
        );
      });
    }
  },
};
export default LocalSave;

document.addEventListener("DOMContentLoaded", () => {
  LocalSave.loadAllSavedData();
  LocalSave.loadAllWidgets();
  LocalSave.loadWidgetID("widgetID");
});

// section debug, pour qu'on puisse appeler les fonctions en console
// window.saveItem = saveItem;
// window.loadItem = loadItem;
// window.deleteItem = deleteItem;
// window.resetAll = resetAll;
// window.resetWidget = resetWidget;
// window.resetXP = resetXP;
