const OpenButton = document.getElementById("OpenButton");
const CloseModalBtn = document.getElementById("CloseModalBtn");
const ModeButton = document.getElementById("ModeButton");
const ModalContainer = document.getElementById("ModalContainer");

OpenButton.addEventListener("click", () => {
  ModalContainer.classList.add("show");
  OpenButton.classList.add("hidden");
  ModeButton.classList.add("hidden");
});

CloseModalBtn.addEventListener("click", () => {
  ModalContainer.classList.remove("show");
  OpenButton.classList.remove("hidden");
  ModeButton.classList.remove("hidden");
});

// Useful links

// Widgets
// https://www.youtube.com/watch?v=1notwooXE58

// Cool hover animation
// https://www.youtube.com/shorts/BiYBJ9PIbrw?feature=share
