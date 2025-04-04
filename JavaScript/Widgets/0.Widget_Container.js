import CreateElement from "../Utilities/Obj_CreateElement.js";

// Variables qui permet de savoir si un widget est en cours d'edition
let isCurrentEdit = null;


// Nom de class a changer selon le type de widget.
class Widget_Container {
  constructor(Index, Id, ParentNode, Title) {
    this.index = Index;
    this.id = Id;
    this.parentNode = ParentNode;
    this.title = Title;
    
    this.isEditing = false;
    this.content = this.addHtmlFrame(this.title);
    // On peut ajouer des proprietés ici
  }

  // Creation of the widget div
  // Liste globale de widgets pour pouvoir incrementer les id name
  // Ajoute les parametres necessaire pour ton widget
  addHtmlFrame(widgetTitle) {   
    //#region Frame de base

    const widgetParent = () => {
      const widget = CreateElement.createDiv(this.id, "widget", this.parentNode);

      const header = CreateElement.createDiv( // Widget Header
        `Header${this.index}`,
        "widget-header",
        widget
      );

      CreateElement.createH3( // Widget Title
        `HeaderTitle${this.index}`,
        "widget-title",
        widgetTitle,
        header
      );

      const ButtonsDiv = CreateElement.createDiv( // Widget manage buttons 
        `buttons${this.index}`,
        `widget-buttons`,
        header
      )

      this.editOnClick = () => { // Callback function du Edit button
        if (isCurrentEdit && isCurrentEdit !== this) {
          isCurrentEdit.saveOnClick(); // Auto-save du widget 
        }
  
        this.isEditing = true;
        isCurrentEdit = this;

        this.EditBtn.classList.add("hidden");
        this.DragBtn.classList.remove("hidden");
        this.ResizeBtn.classList.remove("hidden");
        this.RemoveBtn.classList.remove("hidden");
        this.SaveBtn.classList.remove("hidden");
      }
      this.EditBtn = CreateElement.createButton( // Edit button
        `EditBtn${this.index}`,
        `widget-btn color-flax opacity50`,
        ``,
        this.editOnClick,
        ButtonsDiv
      )
      this.EditBtn.innerHTML = `<span class="material-symbols-outlined">settings</span>`;

      // TODO Callback function du Drag button
      // TUTO https://codepen.io/Tnatal/pen/KKKXPwE
      const draggableOnClick = () => {
        console.log('draggable function to code');
      }
      this.DragBtn = CreateElement.createButton(
        `DragBtn${this.index}`,
        `widget-btn color-flax opacity50 fade-in hidden`,
        ``,
        draggableOnClick,
        ButtonsDiv
      )
      this.DragBtn.innerHTML = `<span class="material-symbols-outlined">drag_pan</span>`;

      // Resize button
      // Callback function du Resize button
      this.resizeOnClick = () => {
        widget.style.resize = "both";
      }
      this.ResizeBtn = CreateElement.createButton(
        `ResizeBtn${this.index}`,
        `widget-btn color-flax opacity50 fade-in hidden`,
        ``,
        this.resizeOnClick,
        ButtonsDiv
      )
      this.ResizeBtn.innerHTML = `<span class="material-symbols-outlined">aspect_ratio</span>`;

      // Remove button
      // Callback function du Remove button
      this.removeOnClick = () => {
        widget.remove();
        this.index--;
      };
      this.RemoveBtn = CreateElement.createButton(
        `RemoveBtn${this.index}`,
        `widget-btn color-flax opacity50 fade-in hidden`,
        ``,
        this.removeOnClick,
        ButtonsDiv
      );
      this.RemoveBtn.innerHTML = `<span class="material-symbols-outlined"> delete </span>`;

      // Save Button
      // Callback function du Save button
      this.saveOnClick = () => {
        if (!this.isEditing) return;
        this.isEditing = false;
        isCurrentEdit = null;

        this.EditBtn.classList.remove("hidden");
        this.DragBtn.classList.add("hidden");
        this.ResizeBtn.classList.add("hidden");
        this.RemoveBtn.classList.add("hidden");
        this.SaveBtn.classList.add("hidden");
        widget.style.resize = "none";
      }
      this.SaveBtn = CreateElement.createButton(
        `SaveBtn${this.index}`,
        `widget-save-btn color-green opacity50 pulse hidden`,
        ``,
        this.saveOnClick,
        ButtonsDiv
      )
      this.SaveBtn.innerHTML = `<span class="material-symbols-outlined">check</span>`;

      // Main content div of the widget
      this.widgetContentDiv = CreateElement.createDiv(
        `WidgetContent${this.index}`,
        `widget-content`,
        widget
      );
      //#endregion
    }
    return widgetParent();
  }
}
export default Widget_Container;