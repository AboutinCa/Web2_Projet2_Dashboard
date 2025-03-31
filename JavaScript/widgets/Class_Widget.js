import CreateElement from "../Utilities/Obj_CreateElement.js";

let isCurrentEdit = null;
export class Widget {
  constructor(Index, Id, ParentNode) {
    this.index = Index;
    this.id = Id;
    this.parentNode = ParentNode;
    this.isEditing = false;
    // this.width = width;
    // this.height = height;
    // this.x = x;
    // this.y = y;
  }
  // Creation of the widget div
  // Liste globale de widgets pour pouvoir incrementer les id name
  createWidget() {
    const widget = CreateElement.createDiv(this.id, "widget", this.parentNode);

    const header = CreateElement.createDiv( // Widget Header
      `Header${this.index}`,
      "widget-header",
      widget
    );

    CreateElement.createH3( // Widget Title
      `HeaderTitle${this.index}`,
      "widget-title",
      "Widget Title" + ` ${this.index}`,
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

    const draggableOnClick = () => { // TODO Callback function du Drag button 
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

    this.resizeOnClick = () => { // Callback function du Resize button
      widget.style.resize = "both";
    }
    this.ResizeBtn = CreateElement.createButton( // Resize button
      `ResizeBtn${this.index}`,
      `widget-btn color-flax opacity50 fade-in hidden`,
      ``,
      this.resizeOnClick,
      ButtonsDiv
    )
    this.ResizeBtn.innerHTML = `<span class="material-symbols-outlined">aspect_ratio</span>`;

    this.removeOnClick = () => { // Callback function du Remove button
      widget.remove();
      this.index--;
    };
    this.RemoveBtn = CreateElement.createButton( // Remove button
      `RemoveBtn${this.index}`,
      `widget-btn color-flax opacity50 fade-in hidden`,
      ``,
      this.removeOnClick,
      ButtonsDiv
    );
    this.RemoveBtn.innerHTML = `<span class="material-symbols-outlined"> delete </span>`;

    this.saveOnClick = () => { // Callback function du Save button
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
    this.SaveBtn = CreateElement.createButton( // Save Button
      `SaveBtn${this.index}`,
      `widget-save-btn color-green opacity50 pulse hidden`,
      ``,
      this.saveOnClick,
      ButtonsDiv
    )
    this.SaveBtn.innerHTML = `<span class="material-symbols-outlined">check</span>`;

    const widgetContent = CreateElement.createDiv( // Content div of the widget
      `WidgetContent${this.index}`,
      "widget-content",
      widget
    );

    CreateElement.createPara( // Tempprary content 
      `Content${this.index}`,
      "widget-content text-xsmall",
      `Widget Content here`,
      widgetContent
    );
  }
}
