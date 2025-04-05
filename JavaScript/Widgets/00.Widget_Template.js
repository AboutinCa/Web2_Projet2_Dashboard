import CreateElement from "../Utilities/00.Create_Element.js";
import Widget_Container from "./00.Widget_Container.js";
import Dashboard from "../Dashboard.js";

const DashboardNode = document.getElementById("Dashboard");
const NewWidget = document.getElementById('NewWidget')

class WidgetTemplate{
  constructor(Index, Id, ParentNode) {
    this.index = Index;
    this.id = Id;
    this.save
    // this.width;
    // this.height;
    
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
export default NewWidget;

// Variables externes pour l'incrementation de l'id
let widgetIndex = 0;

/**
 * Fonction de creation de mon frame et de mon contenu de widget TodoList
 * @module Widget_Template
 */
let newWidget = () => {
  widgetIndex++;
  let widgetId = `widget${widgetIndex}`;
  
  new Widget_Container(
    widgetIndex,
    `widget${widgetIndex}`,
    DashboardNode,
    "Widget Template"
  );

  new WidgetTemplate(
    widgetIndex,
    `widget${widgetIndex}`,
    document.getElementById(`WidgetContent${widgetIndex}`)
  );
  
  // Ajout du widget dans la liste des widgets pret a la sauvegarde
  // LocalSave.SavedWidgets.push({ index: widgetIndex, id: widgetId });
  // Sauvegarde de la liste en localStorage
  // LocalSave.saveItem("Widgets", LocalSave.SavedWidgets);
 
  // console.log(JSON.stringify(LocalSave.SavedWidgets));
}
NewWidget.addEventListener("click", () => {
  newWidget();
});
