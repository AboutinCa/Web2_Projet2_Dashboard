const MainContainer = document.getElementById("MainContainer");
const Modal = document.getElementById("Modal");
const OpenboardButton = document.getElementById("OpenboardButton");
const CloseModalBtn = document.getElementById("CloseModalBtn");
const ModeButton = document.getElementById("ModeButton");

OpenboardButton.addEventListener("click", () => {
  Modal.classList.add("show");
  OpenboardButton.classList.add("hidden");
  ModeButton.classList.add("hidden");
});

CloseModalBtn.addEventListener("click", () => {
  Modal.classList.remove("show");
  OpenboardButton.classList.remove("hidden");
  ModeButton.classList.remove("hidden");
});

// Useful links

// Widgets
// https://www.youtube.com/watch?v=1notwooXE58

// Cool hover animation
// https://www.youtube.com/shorts/BiYBJ9PIbrw?feature=share
