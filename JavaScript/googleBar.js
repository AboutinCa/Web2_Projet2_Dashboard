document.addEventListener("DOMContentLoaded",() => {
    const googleInput = document.getElementById("GoogleBar");
    const googleGo = document.getElementById("GoogleGo");

    //Si du texte est présent dans notre search bar, le bouton GoogleGo s'affiche
    googleInput.addEventListener("input", () => {
        if (googleInput.value.trim() !== "") {
            googleGo.style.display = "inline-block";
        } else {
            googleGo.style.display = "none";
        }
    });

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
});

