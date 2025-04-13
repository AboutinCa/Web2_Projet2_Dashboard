import CreateElement from "../Utilities/00.Create_Element.js";
import LocalSave from "../Utilities/01.Local_Save.js";
import Widget_Container from "./00.Widget_Container.js";
import Dashboard from "../Dashboard.js";

const DashboardNode = document.getElementById("Dashboard");
const NewWidget = document.getElementById("NewWidget");

class Widget_Template {
  constructor(Index, Id, ParentNode) {
    this.index = Index;
    this.id = Id;
    this.save;

    this.width = "fit-content";
    this.height = "fit-content";

    this.Content = this.createWidget(ParentNode);
  }

  // Cette methode est le contenu de notre widget qui s'initialise a la creation "new TodoListWidget()"
  createWidget(parentNode) {
    // Ici en dessous on ajoute l'extra (Division, Form, Tableau, etc)
    const TDlist = CreateElement.createDiv(
      `TDList${this.index}`,
      "todo-list",
      parentNode
    );

    CreateElement.createH3(
      `TDHeader${this.index}`,
      "todo-header",
      "Widget Template",
      TDlist
    );
  }
}

/**
 * Fonction de creation de mon frame et de mon contenu de widget TodoList
 * @module Widget_Template
 */
let newWidget = () => {
  Dashboard.widgetID++;
  let widgetId = `widget${Dashboard.widgetID}`;

  new Widget_Container(
    Dashboard.widgetID,
    widgetId,
    DashboardNode,
    "Widget Template"
  );

  new Widget_Template(
    Dashboard.widgetID,
    `widget${Dashboard.widgetID}`,
    document.getElementById(`WidgetContent${Dashboard.widgetID}`)
  );

  // Je "push" mon widget dans mon "savedWidgets" globale pour la sauvegarde future
  Dashboard.SavedWidgets.push({ index: Dashboard.widgetID, id: widgetId });

  // Sauvegarde de mon widget
  LocalSave.saveItem("widgetID", Dashboard.widgetID);
  LocalSave.saveItem("Widgets", Dashboard.SavedWidgets);
};
NewWidget.addEventListener("click", () => {
  newWidget();
});
