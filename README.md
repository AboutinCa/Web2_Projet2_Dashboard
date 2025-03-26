# Web2_Projet2_Patate85

Alex Boutin (1063844) et Mathieu Gagne-Ouellet (6349821)

## Fonctionnalités (85 points)

### `dashboard.js`

- **Structure du Dashboard (12 pts)**

  - Création du bloc principal du dashboard (inspiré de lui de Google)
  - Gestion de l'overlay modulaire qui s'affiche avec un bouton ou keybind

  ### `widgetManagement.js`

- **Personnalisation des Modules (12 pts)**

  - Chaque widget est déplaçable, redimensionnable, possède un toggle (afficher/cacher), et les paramètres sont persistants
  - **Gestion des interactions (8 pts)**
  - Fonctions à prévoir => `addWidget()`, `deleteWidget()`, `editWidget()`, `moveWidget()`

  ### `01_widget_mywidget.js`

- **Implémentation de 10 modules minimum (22 pts)**

  - Un fichier par module (ex : `##_widget_todolist.js`, `##_widget_chatgpt.js`)
  - Chaque module doit être autonome et pertinent, on essaie d'en faire 2 principaux rapidement
  - Un fichier 00_widget_Template.js va nous donner un point de départ pour nos widgets avec une structure de base

  ### `localSave.js`

- **Sauvegarde locale (10 pts)**

  - Sauvegarde des préférences utilisateur avec `LocalStorage`, `SessionStorage` ou `IndexedDB`

  ### `experienceSystem.js`

- **Système de Gamification (8 pts)**

  - Ajout d'une barre d'XP visible dans le dashboard
  - Chaque module peut faire gagner de l'XP, petite gestion du level, si on a le temps, petite animation cute pour level up

  ### `styles.css`

- **Expérience utilisateur (8 pts)**

  - On va vouloir avoir une interface moderne, fluide, user-friendly
  - Branding à confirmer, pour l'instant on penche vers quelque chose de "gamer"
  - Transitions et animations incluses

  ### `userKeybind.js`

- **Gestion des raccourcis clavier (5 pts)**

  - Un keybind masque/affiche l'overlay, (shift+spacebar, maybe?)
  - Ensuite on pourrait utiliser WASD pour se déplacer dans le dashboard
  - Les autres touches doivent rester fonctionnelles

  ***

## Expérience Utilisateur et Design (15 points)

- **Interface intuitive et bien organisée (7 pts)**

  - Inclue dans Style.css

- **Personnalisation et ergonomie (5 pts)**

  - Basée sur les modèles des widgets Google

- **Transitions et animations fluides (3 pts)**
  - Effets CSS discrets mais agréables, on s'assure de rien avoir qui est envahissant ou cringe

---

## Structure des fichiers prévue

- CSS/
  - global.css
  - styles.css
- HTML/
  - index.html
- JavaScript/
  - widgets/
    - 00_widget_template.js
    - 01_widget_mywidget.js
  - dashboard.js
  - experienceSystem.js
  - localSave.js
  - userKeybind.js
  - widgetManagement.js
- .gitignore
- 420-W1R-SW-24 - Projet 2 - Grille de correction.pdf
- 420-W1R-SW-24 - Projet 2 (Équipe - 25%).pdf
- README.md
