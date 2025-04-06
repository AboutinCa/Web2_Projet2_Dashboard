import CreateElement from "../Utilities/00.Create_Element.js";
import Widget_Container from "./00.Widget_Container.js";
import Dashboard from "../Dashboard.js";
import LocalSave from "../Utilities/01.Local_Save.js";

const DashboardNode = document.getElementById("Dashboard");
const TDListIcon = document.getElementById("ToDoList");

/**
 * Class of Widget_ToDoList, contains the function and the event required to add into the dashboard.
 * @property {this.index} Use a globale "widgetID" and is used to increment/decrement div id.
 * @property {this.id} Use "this.index" plus a name for the div container.
 * @property {this.content} Is a function that create the widget frame.
 * @constructor (Index, Id, ParentNode)
 * @param Index Is used to set the widget property index.
 * @param Id Is used to set the widget property id.
 * @param ParentNode Is used to set the widget property parentNode. 
 */
class Widget_ToDoList{
  constructor(Index, Id, ParentNode) {
    this.index = Index;
    this.id = Id;
    // TODO this.width;
    // TODO this.height;
    
    this.Content = this.createWidget(ParentNode);
  }
   
  /**
   * Function that add HTLM/CSS/JS as a To-do list widget to the dashboard.
   * @param parentNode This is the parentNode when our widget will be inserted.
   */
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
      let currentTitle = TDHeader.innerHTML;     
      TDHeader.classList.add("hidden");
      this.EditBtn.classList.add("hidden");

      // Input pour editer le titre
      const input = CreateElement.createInput(
        `TDHeaderInput${this.index}`,
        "input-text color-vanilla",
        "text",
        "headerInput",
        currentTitle,
        TDHeaderDiv
      );
      input.focus();
      input.style.border = "2px solid var(--color-raisin-black)";
      input.style.borderRadius = "8px";

      // Bouton de sauvegarde de mofification du titre
      const saveBtn = CreateElement.createButton(
        `TDHeaderSave${this.index}`,
        `widget-btn color-flax opacity50`,
        ``,
        () => {
          // Verification si l'input est vide
          let newTitle = !input.value ? currentTitle : input.value;                 
          TDHeader.innerHTML = newTitle;
              
          // Suppression de l'input et du bouton   
          TDHeaderDiv.removeChild(saveBtn);
          TDHeaderDiv.removeChild(input);

          TDHeader.classList.remove("hidden");
          this.EditBtn.classList.remove("hidden");
        },
        TDHeaderDiv
      );
      saveBtn.innerHTML = `<span class="material-symbols-outlined">check</span>`;

      const dumpTaskBtn = document.querySelectorAll(".dump-btn");
      dumpTaskBtn.forEach((btn) => {
        btn.classList.remove("hidden");
      });
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
      "todo-input-div flex-row small-padding-y",
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
    taskInput.style.border = "2px solid var(--color-raisin-black)";
    taskInput.style.borderRadius = "8px";

    // Function to save the input value into the list
    this.saveOnClick = () => { 
      let isInputEmpty = taskInput.value == "" ? true : false;
      
      if (!isInputEmpty) {
        const taskDiv = CreateElement.createDiv(
          `taskDiv${this.index}`,
          "flex-row align-center justify-between",
          list
        );

        const li = document.createElement("li");
        li.classList = "width100 color-vanilla";
        li.style.textDecoration = "none";      
        li.textContent = taskInput.value;
        taskInput.value = "";
        taskDiv.appendChild(li);

        const delTaskBtn = CreateElement.createButton(
          `deleteBtn${this.index}`,
          `dump-btn`,
          `X`,
          () => {
            taskDiv.removeChild(li);
            taskDiv.removeChild(delTaskBtn);
          },
          taskDiv
        );
      }
      else {
        taskInput.classList.add("flash_border_red");
        setTimeout(() => {
          taskInput.classList.remove("flash_border_red");
        }, 1500);
      }
    }
    // Confirm task with "Enter" key
    window.onkeydown = (event) => {
      if (event.key === "Enter" && taskInput.matches(":focus")) {
        this.saveOnClick();
      }
    }
    
    this.SaveInputBtn = CreateElement.createButton(
      `TDSaveInput${this.index}`,
      `widget-btn color-flax opacity50`,
      ``,
      this.saveOnClick,
      TDInputDiv
    )
    this.SaveInputBtn.innerHTML = `<span class="material-symbols-outlined">check</span>`;

    const list = document.createElement("ul");
    list.classList = "text-xsmall";

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
  
  // Je "push" mon widget dans mon "savedWidgets" globale pour la sauvegarde future
  Dashboard.SavedWidgets.push({ index: Dashboard.widgetID, id: widgetId });
  
  // Sauvegarde de mon widget
  LocalSave.saveItem("widgetID", Dashboard.widgetID)
  LocalSave.saveItem("Widgets", Dashboard.SavedWidgets);
}
//#endregion
TDListIcon.addEventListener("click", () => {
  newWidget();
});
