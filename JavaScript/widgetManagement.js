import { Widget } from "./Widgets/Class_Widget.js";

/* GLOBALES VARIABLES */
const WidgetContainer = document.getElementById("WidgetContainer");
const AddWidgetBtn = document.getElementById("AddWidgetBtn");
export let WidgetList = [];

// class WidgetManager
// TODO Mettre a l'interieur de la classe
let widgetCounter = 0;

let addOnClick = () => {
  WidgetList = new Widget(
    WidgetContainer,
    widgetCounter,
    `widget${widgetCounter}`,
    200,
    200
  );
  WidgetList.createWidget(WidgetContainer);
  widgetCounter++;
  console.log("Widget created");
  console.log(widgetCounter);
};
AddWidgetBtn.addEventListener("click", addOnClick);

// function qui resize , draggable
