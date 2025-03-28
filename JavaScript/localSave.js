//Fonction 1 : Enregistrer une donnée (saveItem)
//Fonction 2 : Loader une donnée (loadItem)
//Fonction 3 : Supprimer une donnée (deleteItem)
//Fonction 4 : Reset les données d'un seul widget (resetWidget)
//Fonction 5 : Reset toutes les données du dashboard (resetAll)


//utilise une clé et une valeur
//localStorage peut juste stocker des strings, dont je fais stringify sur ma value
function saveItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}


function loadItem(key) {
    const value = localStorage.getItem(key);
    //if value existe, then JSON.parse, sinon null
    return value ? JSON.parse(value) : null;
}


function deleteItem(key) {
    localStorage.removeItem(key);
}


function resetWidget(widgetKey) {
    deleteItem(widgetKey);
}


function resetAll() {
    localStorage.clear();
    totalXP = 0;
    updateXPBar();
}

function resetXP() {
    const confirm1 = confirm("Êtes-vous SÛR de vouloir réinitialiser votre progression ?");
    if (!confirm1) return;
    const confirm2 = confirm("Êtes-vous VRAIMENT SÛR ?");
    if (!confirm2) return;
    totalXP = 0;
    saveItem("xpTotal", totalXP);
    updateXPBar();
}

//////section debug, pour qu'on puisse appeler les fonctions en console
window.saveItem = saveItem;
window.loadItem = loadItem;
window.deleteItem = deleteItem;
window.resetAll = resetAll;
window.resetWidget = resetWidget;
window.resetXP = resetXP;
///////
//fonction autoload qui charge des données au loading de la page
function loadAllSavedData() 
{
    const savedXP = loadItem("xpTotal");
    if (savedXP !== null) 
    {
        totalXP = savedXP;
        updateXPBar();
    }
}