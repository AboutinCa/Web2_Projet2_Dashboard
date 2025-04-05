import CreateElement from "../Utilities/Obj_CreateElement.js";
import Widget_Container from "./0.Widget_Container.js";
import Dashboard from "../Dashboard.js";
import LocalSave from "../Utilities/Obj_LocalSave.js";

const DashboardNode = document.getElementById("Dashboard");
const TDListIcon = document.getElementById("ToDoList");

class Widget_ToDoList{
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
    const TDlist = CreateElement.createDiv(
      `TDList${this.index}`,
      "todo-list",
      parentNode
    );
    
    //#region HeaderDiv 
    const TDHeaderDiv = CreateElement.createDiv(
      `TDHeaderDiv${this.index}`,
      `flex-row justify-between`,
      TDlist
    );

    const TDHeader = CreateElement.createH3(
      `TDHeader${this.index}`,
      "todo-header color-vanilla",
      "Achats quotidiens",
      TDHeaderDiv
    );
    
    this.EditOnClick = () => { 
      // je save le titre actuel 
      let currentTitle = TDHeader.innerHTML;
      // je hide le header et le bouton de modification
      TDHeader.classList.add("hidden");
      this.EditBtn.classList.add("hidden");
      // je cree un input avec le titre actuel
      const input = CreateElement.createInput(
        `TDHeaderInput${this.index}`,
        "input-text color-vanilla",
        "text",
        "headerInput",
        currentTitle,
        TDHeaderDiv
      );
      input.focus();

      // je cree un bouton pour valider la modification du titre
      const saveBtn = CreateElement.createButton(
        `TDHeaderSave${this.index}`,
        `widget-btn color-flax opacity50`,
        ``,
        () => {
          // je veux verifier si l'input est vide avec un ternaire
          let newTitle = !input.value ? currentTitle : input.value;
                   
          console.log(`newTitle: ${newTitle}`);
          TDHeader.innerHTML = newTitle;
              
          // je supprime le bouton de sauvegarde et l'input          
          TDHeaderDiv.removeChild(saveBtn);
          TDHeaderDiv.removeChild(input);

          TDHeader.classList.remove("hidden");
          this.EditBtn.classList.remove("hidden");
        },
        TDHeaderDiv
      );
      saveBtn.innerHTML = `<span class="material-symbols-outlined">check</span>`;

    }
    this.EditBtn = CreateElement.createButton(
      `TDHeaderEdit${this.index}`,
      `widget-btn color-flax opacity50`,
      ``,
      this.EditOnClick,
      TDHeaderDiv
    );
    this.EditBtn.innerHTML = `<span class="material-symbols-outlined">edit</span>`;
    //#endregion

    //#region InputDiv
    const TDInputDiv = CreateElement.createDiv(
      `TDInputDiv${this.index}`,
      "todo-input-div flex-row",
      TDlist
    );

    const taskInput = CreateElement.createInput(
      `TDInput${this.index}`,
      "input-text color-vanilla",
      "text",
      "textInput",
      "Ajouter un achat",
      TDInputDiv
    );

    this.SaveInputBtn = CreateElement.createButton(
      `TDSaveInput${this.index}`,
      `widget-btn color-flax opacity50`,
      ``,
      () => {
        const li = document.createElement("li");
        li.classList = "todolist-li color-vanilla";
        li.style.textDecoration = "none";
        li.textContent = taskInput.value;
        list.appendChild(li);
        taskInput.value = "";
      },
      TDInputDiv
    )
    this.SaveInputBtn.innerHTML = `<span class="material-symbols-outlined">check</span>`;

    const list = document.createElement("ul");
    list.classList = "";

    TDlist.appendChild(list);
    //#endregion
  }
}
export default Widget_ToDoList;

/**
 * Fonction de creation de mon frame et de mon contenu de widget TodoList
 * @module Widget_Template
 */
//#region CreateEvent
let newWidget = () => {
  Dashboard.widgetID++
  let widgetId = `widget${Dashboard.widgetID}`;
  
  new Widget_Container(
    Dashboard.widgetID,
    widgetId,
    DashboardNode,
    "To-do list"
  );

  new Widget_ToDoList(
    Dashboard.widgetID,
    widgetId,
    document.getElementById(`WidgetContent${Dashboard.widgetID}`)
  );
  
  // Je save l'id du Dashboard
  LocalSave.saveItem("widgetID", Dashboard.widgetID)
  
  // Ajout du widget dans la liste des widgets pret a la sauvegarde
  Dashboard.SavedWidgets.push({ index: Dashboard.widgetID, id: widgetId });

  // Sauvegarde de mon widget dans ma key "Widgets" en localStorage
  LocalSave.saveItem("Widgets", Dashboard.SavedWidgets);
}
//#endregion
TDListIcon.addEventListener("click", () => {
  newWidget();
});
