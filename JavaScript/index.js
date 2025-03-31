// Useful links

// Widgets
// https://www.youtube.com/watch?v=1notwooXE58

// Cool hover animation
// https://www.youtube.com/shorts/BiYBJ9PIbrw?feature=share


const MainContainer = document.getElementById("MainContainer");
const Modal = document.getElementById("Modal");
const OpenBoardButton = document.getElementById("OpenBoardButton");
const CloseModalBtn = document.getElementById("CloseModalBtn");
const googleInput = document.getElementById("GoogleBar");
const googleGo = document.getElementById("GoogleGo");


//#region Open/Close B
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
        const url = `https://www.google.com/search?q=${encodeURIComponent(googleQuery)}`;
        window.open(url, "_blank");
    }
}
//#endregion

