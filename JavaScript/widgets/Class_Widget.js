import CreateElement from "../Utilities/Obj_CreateElement.js";

// Je vais me faire une class de widget qui va contenir les fonctions de base pour créer un widget, le rendre draggable et resizable.
// Je vais aussi ajouter une fonction pour ajouter un triangle pour redimensionner le widget.

const widget = [];

export class Widget {
  constructor(parentNode, index, id, width, height) {
    this.parentNode = parentNode;
    this.index = index;
    this.id = id;
    this.width = width;
    this.height = height;
    // this.x = x;
    // this.y = y;
  }

  // Creation of the widget div
  // Liste globale de widgets pour pouvoir incrementer les id name
  createWidget() {
    const widget = CreateElement.createDiv(
      this.id,
      "widget flex-row",
      this.parentNode
    );
    widget.style.width = "fit-content";
    widget.style.height = "fit-content";
    widget.style.padding = "4px 4px";
    widget.style.border = "1px solid var(--color-cyan)";

    // mainDiv.style.left = this.x + "px";
    // mainDiv.style.top = this.y + "px";
    const headerDiv = CreateElement.createDiv(
      "HeaderDiv",
      "widget-header",
      widget
    );

    CreateElement.createH3(
      "HeaderTitle",
      "widget-title",
      "Widget Title" + ` ${this.index}`,
      headerDiv
    );

    const removeOnClick = () => {
      widget.remove();
      this.index--;
    };

    CreateElement.createButton(
      `RemoveBtn${this.index}`,
      "small-btn",
      "X",
      removeOnClick,
      headerDiv
    );

    // Content of the widget
    const contentDiv = CreateElement.createDiv(
      "ContentDiv",
      "widget-content",
      widget
    );
  }
}
