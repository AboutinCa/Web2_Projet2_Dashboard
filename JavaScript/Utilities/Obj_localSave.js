import ExpSytem from "../ExperienceSystem.js";
import Widget_Container from "../Widgets/0.Widget_Container.js";
import Widget_ToDoList from "../Widgets/01.Todo_List.js";

const DashboardNode = document.getElementById("Dashboard");

//Fonction 1 : Enregistrer une donnée (saveItem)
//Fonction 2 : Loader une donnée (loadItem)
//Fonction 3 : Supprimer une donnée (deleteItem)
//Fonction 4 : Reset les données d'un seul widget (resetWidget)
//Fonction 5 : Reset toutes les données du dashboard (resetAll)
//Fonction 6 : Reset l'xp (resetXP)
//Fonction 7 : Autoload les données (loadAllSavedData)

//utilise une clé et une valeur
//localStorage peut juste stocker des strings, dont je fais stringify sur ma value
const LocalSave = {   
        
    saveItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    loadWidgetID(key) {
        const ID = localStorage.getItem(key);
        return ID ? JSON.parse(ID) : null;
    },

    loadItem(key) {
        const value = localStorage.getItem(key);
        //if value existe, then JSON.parse, sinon null
        return value ? JSON.parse(value) : null;
    },

    loadWidget(key) {
        const widgetData = localStorage.getItem(key);
        return widgetData ? JSON.parse(widgetData) : [];
    },

    deleteItem(key) {
        localStorage.removeItem(key);
    },

    resetWidget(widgetKey) {
        this.deleteItem(widgetKey);
    },

    resetAll() {
        localStorage.clear();
        ExpSytem.totalXP = 0;
        ExpSytem.Function.updateXPBar();
    },

    resetXP() {
        const confirm1 = confirm("Êtes-vous SÛR de vouloir réinitialiser votre progression ?");
        if (!confirm1) return;
        const confirm2 = confirm("Êtes-vous VRAIMENT SÛR ?");
        if (!confirm2) return;
        ExpSytem.totalXP = 0;
        this.saveItem("xpTotal", ExpSytem.totalXP);
        ExpSytem.Function.updateXPBar();
    },

    //fonction autoload qui charge des données au loading de la page
    loadAllSavedData() {
        const savedXP = this.loadItem("xpTotal");
        if (savedXP !== null) {
            ExpSytem.totalXP = savedXP;
            ExpSytem.Function.updateXPBar();
        }       
    },

    loadAllWidgets() {
        const savedWidgets = this.loadWidget("Widgets");
        console.log(savedWidgets[0]);
              
        // console.log(localStorage.getItem("Widgets"));
        // console.log(savedWidgets.length);
        
        const stringified = JSON.stringify(savedWidgets);
        console.log(stringified);
        
        if (savedWidgets !== null) {
            const dataArray = [];

            dataArray.push(savedWidgets);

            savedWidgets.forEach(element => {
                new Widget_Container(
                    element.index,
                    element.id,
                    DashboardNode,
                    "Todo List"
                );
                new Widget_ToDoList(
                    element.index,
                    element.id,
                    document.getElementById(`WidgetContent${element.index}`)
                );
            });

            // console.log(savedWidgets);
            // for (let i = 0; i < savedWidgets.length; i++) {               
            //     const element = savedWidgets[i];    
            //     new Widget_Template(
            //         element.index,
            //         element.id,
            //         Dashboard,
            //         "Todo List"
            //     );
            //     new Widget_ToDoList(
            //         element.index,
            //         element.id,
            //         document.getElementById(`WidgetContent${element.index}`)
            //     );
            // }           
        }
    }
}
export default LocalSave;

document.addEventListener("DOMContentLoaded", () => {
    LocalSave.loadAllSavedData();
    LocalSave.loadAllWidgets();
    LocalSave.loadWidgetID("widgetID");
});

// section debug, pour qu'on puisse appeler les fonctions en console
// window.saveItem = saveItem;
// window.loadItem = loadItem;
// window.deleteItem = deleteItem;
// window.resetAll = resetAll;
// window.resetWidget = resetWidget;
// window.resetXP = resetXP;