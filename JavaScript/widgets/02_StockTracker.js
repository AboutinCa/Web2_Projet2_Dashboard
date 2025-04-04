function StockTracker_Widget(id, container) {
    const self = Widget_Template(id, container, "Stock Tracker");

    const input = document.createElement("input");
    input.placeholder = "Entrez un ticker (ex: AAPL)";
    input.className = "input-text";

    const result = document.createElement("div");
    result.textContent = "Résultat ici...";
    result.className = "text-small";

    const button = document.createElement("button");
    button.className = "btn";
    button.textContent = "Rechercher";

    button.onclick = () => {
        const ticker = input.value.trim().toUpperCase();
        if (ticker !== "") getStockPrice(ticker, result);
        else result.textContent = "Veuillez entrer un ticker valide.";
    };

    self.content.appendChild(input);
    self.content.appendChild(button);
    self.content.appendChild(result);

    return self;
}

async function getStockPrice(ticker) {
    const API_KEY= "cvmjq71r01ql90pucldgcvmjq71r01ql90pucle0";
    const url = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.c) {
            result.textContent = `${ticker} ➜ Prix actuel : $${data.c}`;
        } else {
            result.textContent = "Donnée introuvable.";
        }
    } catch (error) {
        result.textContent = "Erreur de chargement.";
        console.error(error);
    }
}