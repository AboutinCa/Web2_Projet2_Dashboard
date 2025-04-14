import CreateElement from "../Utilities/00.Create_Element.js";
import Widget_Container from "./00.Widget_Container.js";
import LocalSave from "../Utilities/01.Local_Save.js";

const DashboardNode = document.getElementById("Dashboard");
const StickyIcon = document.getElementById("StickyNotes");

class Widget_StickyNotes {
  constructor(Index, Id, ParentNode) {
    this.index = Index;
    this.id = Id;
    this.content = this.createWidget(ParentNode);
    this.noteKey = `StickyNote_${this.id}`;
  }

  createWidget(parent) {
    const container = CreateElement.createDiv(
      `StickyNoteContainer${this.index}`,
      "sticky-note-container",
      parent
    );
    parent.setAttribute("data-type", "stickynote-widget");

    const textarea = CreateElement.createTextArea(
      `StickyNoteArea${this.index}`,
      "sticky-note-textarea",
      "Écris ta note ici...",
      container
    );

    textarea.value = this.loadNote();

    textarea.addEventListener("input", () => {
      this.saveNote(textarea.value);
    });
  }

  saveNote(content) {
    localStorage.setItem(this.noteKey, content);
  }

  loadNote() {
    return localStorage.getItem(this.noteKey) || "";
  }
}

export default Widget_StickyNotes;

let newWidget = () => {
  Dashboard.widgetID++; // Incrémenter l’ID central
  //let widgetId = `widget${Dashboard.widgetID}`;
  let containerId = `Widget${Dashboard.widgetIndex}`;
  let widgetId = `StickyNote${Dashboard.widgetIndex}`;

  new Widget_Container(
    Dashboard.widgetIndex,
    containerId,
    DashboardNode,
    "Sticky Note"
  );

  new Widget_StickyNotes(
    Dashboard.widgetID,
    widgetId,
    document.getElementById(`Widget${Dashboard.widgetIndex}`)
  );
};

let assignEvent = () => {
  StickyIcon.addEventListener("click", () => {
    newWidget();
    LocalSave.saveDashboard();
  });
};
document.addEventListener("DOMContentLoaded", assignEvent);
