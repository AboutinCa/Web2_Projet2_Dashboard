const OpenButton = document.getElementById("OpenButton");
const CloseButton = document.getElementById("CloseButton");
const ModeButton = document.getElementById("ModeButton");
const ModalContainer = document.getElementById("ModalContainer");

OpenButton.addEventListener("click", () => {
  ModalContainer.classList.add("show");
  OpenButton.classList.add("hidden");
  ModeButton.classList.add("hidden");
});

CloseButton.addEventListener("click", () => {
  ModalContainer.classList.remove("show");
  OpenButton.classList.remove("hidden");
  ModeButton.classList.remove("hidden");
});
