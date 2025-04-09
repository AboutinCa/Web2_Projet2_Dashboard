import CreateElement from "../Utilities/00.Create_Element.js";
import Widget_Container from "./00.Widget_Container.js";
import LocalSave from "../Utilities/01.Local_Save.js";

const Dashboard = document.getElementById("Dashboard");
const StickyIcon = document.getElementById("StickyNotes");

class Widget_StickyNotes {
  constructor(Index, Id, ParentNode) {
    this.index = Index;
    this.id = Id;
    this.content = this.createWidget(ParentNode);
    this.noteKey = `StickyNote_${this.id}`;
  }

  createWidget(parentNode) {
    const container = CreateElement.createDiv(
      `StickyNoteContainer${this.index}`,
      "sticky-note-container",
      parentNode
    );

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

let widgetIndex = 0;

let newWidget = () => {
  widgetIndex++;
  let widgetId = `widget${widgetIndex}`;

  new Widget_Container(widgetIndex, widgetId, Dashboard, "Sticky Note");

  new Widget_StickyNotes(
    widgetIndex,
    widgetId,
    document.getElementById(`WidgetContent${widgetIndex}`)
  );

  if (!LocalSave.SavedWidgets) {
    LocalSave.SavedWidgets = [];
  }
  LocalSave.SavedWidgets.push({ index: widgetIndex, id: widgetId });
  LocalSave.saveItem("Widgets", LocalSave.SavedWidgets);
};

StickyIcon.addEventListener("click", () => {
  newWidget();
});
