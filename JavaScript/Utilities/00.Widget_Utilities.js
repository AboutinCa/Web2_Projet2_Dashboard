import LocalSave from "./01.Local_Save.js";

const Utilities = {
  GetType(node) {
    return node.getAttribute("data-type") ?? "base";
  },
  GetWidth(node) {
    return node.getAttribute("data-witdh") ?? "base";
  },

  GetHeight(node) {
    return node.getAttribute("data-height") ?? "base";
  },

  GetPosX(node) {
    return node.getAttribute("data-posX") ?? "base";
  },

  GetPosY(node) {
    return node.getAttribute("data-posY") ?? "base";
  },
};

/* https://interactjs.io/docs/resizable/ */
/* https://interactjs.io/docs/draggable/ */
interact(".resizable").resizable({
  edges: { top: true, left: true, bottom: true, right: true },
  listeners: {
    move: function (event) {
      const target = event.target;
      let x = parseFloat(target.getAttribute("data-x")) || 0;
      let y = parseFloat(target.getAttribute("data-y")) || 0;

      target.style.width = `${event.rect.width}px`;
      target.style.height = `${event.rect.height}px`;

      x = event.deltaRect.left;
      y = event.deltaRect.top;

      target.setAttribute("data-witdh", event.rect.width);
      target.setAttribute("data-height", event.rect.height);
    },
    end() {
      LocalSave.saveDashboard();
    },
  },
});

interact(".draggable").draggable({
  dragAllow: ".drag-Allow",
  listeners: {
    move(event) {
      const target = event.target;
      let x = (parseFloat(target.getAttribute("data-posX")) || 0) + event.dx;
      let y = (parseFloat(target.getAttribute("data-posY")) || 0) + event.dy;

      target.style.transform = `translate(${x}px, ${y}px)`;

      target.setAttribute("data-posX", x);
      target.setAttribute("data-posY", y);
    },
    end() {
      LocalSave.saveDashboard();
    },
  },
});
export default Utilities;
