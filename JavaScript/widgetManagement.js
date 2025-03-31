import { Widget } from "./Widgets/Class_Widget.js";

/* GLOBALES VARIABLES */
const Dashboard = document.getElementById("Dashboard");
const AddWidgetBtn = document.getElementById("AddWidgetBtn");
const AllWidget = document.querySelectorAll(".widget");
export const WidgetList = [];
// class WidgetManager
// TODO Mettre a l'interieur de la classe
let draggedIndex = null;
let widgetCounter = 1;
let addOnClick = () => {
  let newWidget = new Widget(
    widgetCounter,
    `widget${widgetCounter}`,
    Dashboard
  );
  newWidget.createWidget();
  //newWidget.draggable = "true";
  WidgetList.push(newWidget);

  widgetCounter++;
};
  AddWidgetBtn.addEventListener("click", () => {
  addOnClick();
  // WidgetList.forEach((widget, index) => {
  //   widget.dragStart = dragStart(event, index);
  //   widget.ondragover = allowDrop(event);
  //   widget.ondrop = drop(event, index);
  // })
  }
);