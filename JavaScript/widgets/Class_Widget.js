import CreateElement from "../Utilities/Obj_CreateElement.js";

export class Widget {
  constructor(Index, Id, ParentNode) {
    this.index = Index;
    this.id = Id;
    this.parentNode = ParentNode;
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
    const editOnClick = () => { // Callback function du Edit button
      EditBtn.classList.add("hidden");
      DragBtn.classList.remove("hidden");
      ResizeBtn.classList.remove("hidden");
      RemoveBtn.classList.remove("hidden");      
      SaveBtn.classList.remove("hidden");      
    }
    const EditBtn = CreateElement.createButton( // Edit button
      `EditBtn${this.index}`,
      `widget-btn color-flax opacity50`,
      ``,
      editOnClick,
      ButtonsDiv
    )
    EditBtn.innerHTML = `<span class="material-symbols-outlined">settings</span>`;


    const draggableOnClick = () => { // TODO Callback function du Drag button 
      console.log('draggable function to code');
    }
    const DragBtn = CreateElement.createButton( 
      `DragBtn${this.index}`,
      `widget-btn color-flax opacity50 fade-in hidden`,
      ``,
      draggableOnClick,
      ButtonsDiv
    )
    DragBtn.innerHTML = `<span class="material-symbols-outlined">drag_pan</span>`;

    const resizeOnClick = () => { // Callback function du Resize button
      widget.style.resize = "both";
    }
    const ResizeBtn = CreateElement.createButton( // Resize button
      `ResizeBtn${this.index}`,
      `widget-btn color-flax opacity50 fade-in hidden`,
      ``,
      resizeOnClick,
      ButtonsDiv
    )
    ResizeBtn.innerHTML = `<span class="material-symbols-outlined">aspect_ratio</span>`;

    const removeOnClick = () => { // Callback function du Remove button
      widget.remove();
      this.index--;
    };
    const RemoveBtn = CreateElement.createButton( // Remove button
      `RemoveBtn${this.index}`,
      `widget-btn color-flax opacity50 fade-in hidden`,
      ``,
      removeOnClick,
      ButtonsDiv
    );
    RemoveBtn.innerHTML = `<span class="material-symbols-outlined"> delete </span>`;

    const saveOnClick = () => { // Callback function du Save button
      EditBtn.classList.remove("hidden");
      DragBtn.classList.add("hidden");
      ResizeBtn.classList.add("hidden");
      RemoveBtn.classList.add("hidden");      
      SaveBtn.classList.add("hidden");   
    }
    const SaveBtn = CreateElement.createButton( // Save Button
      `SaveBtn${this.index}`,
      `widget-btn color-green opacity50 pulse hidden`,
      ``,
      saveOnClick,
      ButtonsDiv
    )
    SaveBtn.innerHTML = `<span class="material-symbols-outlined">check</span>`;

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
