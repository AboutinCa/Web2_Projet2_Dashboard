import { Widget } from "./Widgets/Class_Widget.js";

/* GLOBALES VARIABLES */
const Dashboard = document.getElementById("Dashboard");
const AddWidgetBtn = document.getElementById("AddWidgetBtn");
const AllWidget = document.querySelectorAll(".widget");
const WidgetList = [];
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
  console.log("Widget created");
  console.log(widgetCounter);
  console.log(JSON.stringify(WidgetList));
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






































/* TENTATIVE(1) DRAG FUNCTION   */
/*#region*/

/**
 * Fonction appelée lorsque le drag commence
 * Ajoute la classe "dragging" à l'élément ciblé
 * @param {*} event : l'événement de drag & drop. Doit être passé en paramètre.
 * @param {*} index : l'index du produit à déplacer. Doit être passé en paramètre.
 * @returns {void}
 */
function dragStart(event, index) {
  draggedIndex = index;
  event.target.classList.add("dragging");
}

/**
 * Fonction appelée lorsque le drop est autorisé
 * Empêche le comportement par défaut de l'événement
 * @param {*} event : l'événement de drag & drop. Doit être passé en paramètre.
 * @returns {void}
 */
function allowDrop(event) {
  event.preventDefault();
}

/**
 * Fonction appelée lorsque le drop est effectué
 * Empêche le comportement par défaut de l'événement
 * Échange les produits aux index draggedIndex et index
 * @param {*} event : l'événement de drag & drop. Doit être passé en paramètre.
 * @param {*} index : l'index du produit cible. Doit être passé en paramètre.
 * @returns {void}
 */
function drop(event, index) {
  event.preventDefault();

  const temp = WidgetList[draggedIndex];
  WidgetList[draggedIndex] = WidgetList[index];
  WidgetList[index] = temp;
}

/* TENTATIVE(2) DRAG FUNCTION   */
// Draggable widgets
// Source https://www.youtube.com/watch?v=ymDjvycjgUM
// let newX = 0,
//   newY = 0,
//   startX = 0,
//   startY = 0;

// function mouseDown(e) {
//   startX = e.clientX;
//   startY = e.clientY;

//   document.addEventListener("mousemove", mouseMove);
//   document.addEventListener("mouseup", mouseUp);
// }

// AllWidget.forEach(widget => {
//   widget.addEventListener("mousedown", mouseDown);
//   });

// function mouseMove(e) {
//   newX = startX - e.clientX;
//   newY = startY - e.clientY;
//   startX = e.clientX;
//   startY = e.clientY;

//   AllWidget.forEach(widget => {
//     widget.style.top = (widget.offsetTop - newY) + "px";
//     widget.style.left = (widget.offsetLeft - newX) + "px";
//   });

//   console.log(newY, newX);
//   console.log(startX, startY);
// }

// function mouseUp() {
//   document.removeEventListener("mousemove", mouseMove);
//   document.removeEventListener("mouseup", mouseUp);
// }

// function qui resize , draggable
/*#endregion*/