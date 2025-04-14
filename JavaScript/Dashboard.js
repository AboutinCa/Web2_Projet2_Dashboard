import Utilities from "./Utilities/00.Widget_Utilities.js";
import LocalSave from "./Utilities/01.Local_Save.js";

// Widgets
// https://www.youtube.com/watch?v=1notwooXE58

// Cool hover animation
// https://www.youtube.com/shorts/BiYBJ9PIbrw?feature=share

// [High Priority]
// TODO Modifier la structure de nos widget pour l'utilisation de "name", "width" , "height" et autres
// TODO Sauvegarder le contenu d'un widget (width, height, progression, etc..)

// TODO Un total de 5-6 widgets serait decent
// TODO Un bouton/function pour reset le dashboard (localStorage.clear())

// TODO Modifier le bouton remove dans le template pour qu'il l'efface egalement sur le localStorage
// TODO Trouver un moyen de mettre a niveau le widgetID quand on remove, sur le localStorage et dans notre app.

// TODO Options de rendre les widgets draggables
// TODO Options pour masquer un widgets (sans le supprimer)
// TODO Keybind pour On/Off le modal aka@Overlay

// [Low Priority]
// TODO Modal du bouton "Preferences" et petit message WIP
// TODO Modal du bouton "About us" et petit message WIP
// TODO Chiffrement des donnees sensibles en localStorage
// TODO Import/Export du dashboard
// Et plus encore dans la section "bonus" de la grille de correction

const MainContainer = document.getElementById("MainContainer");
const Modal = document.getElementById("Modal");
const OpenBoardButton = document.getElementById("OpenBoardButton");
const CloseModalBtn = document.getElementById("CloseModalBtn");
const googleInput = document.getElementById("GoogleBar");
const googleGo = document.getElementById("GoogleGo");
const board = document.getElementById("Dashboard");

let Dashboard = {
  widgetIndex: LocalSave.loadLocalStorageKey("WidgetID"),
  SavedWidgets: [],
};

//#region Dashboard modal
OpenBoardButton.addEventListener("click", () => {
  Modal.classList.add("show");
  MainContainer.classList.add("hidden");
  googleGo.style.display = "none";
});

CloseModalBtn.addEventListener("click", () => {
  Modal.classList.remove("show");
  MainContainer.classList.remove("hidden");
  googleGo.style.display = "inline-block";
});

document.addEventListener(
  "keydown",
  function (e) {
    if (e.shiftKey && e.key === "D") {
      if (Modal.classList.contains("show")) {
        Modal.classList.remove("show");
      } else {
        OpenBoardButton.click();
      }
    }
  },
  false
);

//#endregion

//#region Google bar
//Si on a du texte dans notre champ, et qu'on appuie sur enter, appelle submitGoogleSearch()
googleInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    submitGoogleSearch();
  }
});

//Le bouton Go appelle submitGoogleSearch()
googleGo.addEventListener("click", () => {
  submitGoogleSearch();
});

//Fonction qui fait la recherche google, copiée de ChatGPT
function submitGoogleSearch() {
  const googleQuery = googleInput.value.trim();
  if (googleQuery !== "") {
    const url = `https://www.google.com/search?q=${encodeURIComponent(
      googleQuery
    )}`;
    window.open(url, "_blank");
  }
}
//#endregion

export default Dashboard;
