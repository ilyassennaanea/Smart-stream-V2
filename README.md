# SMART STREAM TV V2
## Documentation technique – Technologies et concepts utilisés

### 1. JavaScript ES6+

JavaScript est le langage utilisé pour rendre l'application dynamique et interactive.

Dans cette version, nous utilisons plusieurs fonctionnalités modernes d'ES6+ :

- `const` et `let` : déclarer des variables.
- Les fonctions fléchées : simplifier l'écriture des fonctions.
- Les modules : organiser le code avec `import` et `export`.
- Les template literals : créer des chaînes dynamiques avec les backticks.
- Les paramètres de fonctions : transmettre des données entre les fonctions.

**Exemple :**
```javascript
const channels = ["2M", "Al Aoula", "Medi 1"];

const liveChannels = channels.filter(channel =>
    channel !== "Medi 1"
);
```

### 2. JSON (JavaScript Object Notation)

JSON est un format léger utilisé pour stocker et échanger des données entre une application et un serveur.

Dans Smart Stream TV V2, les informations des chaînes sont stockées sous forme d'objets JSON sur MockAPI.

Chaque chaîne contient notamment deux nouvelles propriétés :

- `isFavorite` : indique si la chaîne est dans les favoris.
- `isBlacklisted` : indique si la chaîne est dans la liste noire.

**Exemple :**
```json
{
    "id": "1",
    "channelNumber": 1,
    "name": "2M",
    "category": "General",
    "isFavorite": true,
    "isBlacklisted": false
}
```

Pour envoyer des données au serveur, nous utilisons `JSON.stringify()` afin de convertir un objet JavaScript en JSON.

Pour lire les données reçues, nous utilisons `response.json()`.

### 3. MockAPI

MockAPI est un service qui permet de créer une API REST pour simuler un backend.

Dans notre projet, MockAPI permet de stocker les informations des chaînes et de conserver les modifications effectuées par les utilisateurs.

Il prend en charge les opérations CRUD :

- Create : ajouter une chaîne.
- Read : récupérer les chaînes.
- Update : modifier les informations d'une chaîne.
- Delete : supprimer une chaîne.

**Exemple d'endpoint :**
```javascript
const API_URL = "YOUR_MOCKAPI_ENDPOINT";
```

L'endpoint est l'adresse URL qui permet d'accéder à une ressource de l'API.

### 4. Fetch API

Fetch est une fonction JavaScript qui permet d'envoyer des requêtes HTTP vers une API et de récupérer des données.

Elle retourne une Promise.

Dans V2, Fetch est utilisé pour communiquer avec MockAPI et gérer les différentes opérations sur les chaînes.

**Exemple :**
```javascript
fetch(API_URL)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
```

**Explication :**
- `fetch(API_URL)` : envoie une requête au serveur.
- `response` : représente la réponse du serveur.
- `response.json()` : transforme la réponse JSON en données JavaScript.
- `data` : contient les données récupérées.
- `catch()` : permet de gérer les erreurs.

### 5. Les méthodes HTTP (GET, POST, PUT, DELETE)

Les méthodes HTTP permettent de communiquer avec un serveur et de réaliser différentes opérations sur les données.

Dans notre projet, nous utilisons quatre méthodes principales.

**GET – Récupérer les chaînes**

GET permet de lire les données depuis MockAPI.

```javascript
fetch(API_URL)
    .then(response => response.json())
    .then(data => console.log(data));
```

**POST – Ajouter une chaîne**

POST permet d'envoyer une nouvelle chaîne au serveur.

```javascript
fetch(API_URL, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(newChannel)
});
```

**PUT – Modifier une chaîne**

PUT permet de modifier les informations d'une chaîne existante, notamment son état favori ou sa présence dans la liste noire.

```javascript
fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        isFavorite: true
    })
});
```

**DELETE – Supprimer une chaîne**

DELETE permet de supprimer définitivement une chaîne du serveur.

```javascript
fetch(`${API_URL}/${id}`, {
    method: "DELETE"
});
```

### 6. Async / Await

`async` et `await` permettent d'écrire du code asynchrone avec une syntaxe plus simple et plus lisible.

- `async` : indique qu'une fonction retourne une Promise.
- `await` : attend le résultat d'une Promise avant de continuer l'exécution de la fonction.

Dans notre projet, cette syntaxe est utilisée pour attendre les réponses de MockAPI.

**Exemple :**
```javascript
export async function getChannels() {
    const response = await fetch(API_URL);

    const data = await response.json();

    return data;
}
```

Cette méthode permet de récupérer les données étape par étape.

### 7. Try / Catch et gestion des erreurs

`try/catch` permet de gérer les erreurs qui peuvent apparaître pendant l'exécution du code.

- `try` : contient le code à exécuter.
- `catch` : récupère une erreur si elle se produit.

**Exemple :**
```javascript
async function getChannels() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error("Erreur :", error);
    }
}
```

Dans notre application, cette gestion permet d'afficher un message clair lorsque les chaînes ne peuvent pas être récupérées.

### 8. HTTP et response.ok

HTTP est un protocole utilisé pour communiquer entre le navigateur et un serveur.

Quelques codes de réponse importants :

| Code | Signification |
|---|---|
| 200 | OK – Requête réussie |
| 201 | Created – Ressource créée |
| 400 | Bad Request – Requête incorrecte |
| 404 | Not Found – Ressource introuvable |
| 500 | Internal Server Error – Erreur serveur |

La propriété `response.ok` permet de vérifier si le statut HTTP est compris entre 200 et 299.

**Important :** Fetch ne considère pas automatiquement les réponses 404 ou 500 comme des erreurs Promise. Il faut vérifier `response.ok` manuellement.

### 9. CRUD (Create, Read, Update, Delete)

CRUD représente les quatre opérations fondamentales de gestion des données.

Dans Smart Stream TV V2, ces opérations correspondent aux fonctionnalités suivantes :

| Opération | Méthode HTTP | Fonctionnalité |
|---|---|---|
| Create | POST | Ajouter une nouvelle chaîne |
| Read | GET | Récupérer les chaînes |
| Update | PUT | Modifier les favoris et la liste noire |
| Delete | DELETE | Supprimer une chaîne |

Grâce à CRUD, les utilisateurs peuvent gérer leurs chaînes et conserver leurs modifications sur le serveur.

### 10. DOM (Document Object Model)

Le DOM représente la structure HTML de la page sous forme d'objets manipulables avec JavaScript.

Il permet de modifier dynamiquement le contenu et l'apparence de l'application.

Méthodes utilisées :

- `document.getElementById()` : sélectionner un élément par son ID.
- `document.querySelector()` : sélectionner un élément avec un sélecteur CSS.
- `document.createElement()` : créer un élément HTML.
- `element.innerHTML` : modifier le contenu HTML.
- `element.classList.add()` : ajouter une classe CSS.
- `element.classList.remove()` : supprimer une classe CSS.

Dans notre projet, le DOM permet notamment de mettre à jour les étoiles des favoris et d'afficher les chaînes dans les différentes sections.

### 11. Event Listeners

Les événements permettent de détecter les actions de l'utilisateur.

`addEventListener()` permet d'exécuter une fonction lorsqu'un événement se produit.

**Exemple :**
```javascript
star.addEventListener("click", () => {
    console.log("Favorite clicked");
});
```

Dans Smart Stream TV V2, les événements permettent de :

- Ajouter ou retirer une chaîne des favoris.
- Cacher une chaîne dans la liste noire.
- Restaurer une chaîne.
- Supprimer une chaîne.
- Ajouter une nouvelle chaîne avec le formulaire.
- Filtrer les chaînes selon le choix de l'utilisateur.

### 12. Array Methods (Méthodes des tableaux)

JavaScript propose plusieurs méthodes pour manipuler les tableaux.

Dans V2, ces méthodes sont particulièrement utiles pour filtrer et rechercher les chaînes.

| Méthode | Utilisation |
|---|---|
| `map()` | Transformer les éléments d'un tableau |
| `filter()` | Filtrer les chaînes selon une condition |
| `find()` | Trouver une chaîne selon son identifiant |
| `forEach()` | Parcourir les éléments d'un tableau |
| `includes()` | Vérifier si une valeur existe |

**Exemple : afficher uniquement les favoris**
```javascript
const favorites = channels.filter(channel =>
    channel.isFavorite === true
);
```

**Exemple : exclure les chaînes de la liste noire**
```javascript
const visibleChannels = channels.filter(channel =>
    channel.isBlacklisted === false
);
```

### 13. LocalStorage

LocalStorage est une fonctionnalité du navigateur qui permet de sauvegarder des informations sous forme de chaînes de caractères.

Contrairement aux variables JavaScript, les données enregistrées dans LocalStorage restent disponibles après le rechargement de la page.

Dans notre projet, LocalStorage permet de conserver le dernier filtre sélectionné par l'utilisateur entre :

- Toutes.
- Mes Favoris.

**Exemple :**
```javascript
// Sauvegarder le filtre sélectionné
localStorage.setItem("filter", "favorites");

// Récupérer le dernier filtre
const savedFilter = localStorage.getItem("filter");
```

Cela permet de restaurer automatiquement le dernier affichage choisi lorsque l'utilisateur revient sur l'application.

### 14. FormData et validation des formulaires

FormData est un objet JavaScript qui permet de récupérer facilement les valeurs des champs d'un formulaire HTML.

Dans notre projet, il peut être utilisé pour récupérer les informations nécessaires à l'ajout d'une nouvelle chaîne.

**Exemple :**
```javascript
const formData = new FormData(form);

const newChannel = {
    channelNumber: formData.get("channelNumber"),
    name: formData.get("name"),
    category: formData.get("category"),
    logo: formData.get("logo")
};
```

La validation permet de vérifier que les champs obligatoires sont remplis avant d'envoyer les données avec POST.

### 15. Confirm()

`confirm()` est une fonction JavaScript qui affiche une boîte de dialogue demandant à l'utilisateur de confirmer ou d'annuler une action.

Dans notre projet, elle est utilisée avant la suppression définitive d'une chaîne depuis la liste noire.

**Exemple :**
```javascript
const result = confirm("Voulez-vous supprimer cette chaîne ?");

if (result) {
    deleteChannel(id);
}
```

Cela évite les suppressions accidentelles.

### 16. Tailwind CSS

Tailwind CSS est un framework CSS basé sur des classes utilitaires.

Il permet de styliser directement les éléments HTML sans devoir écrire une classe CSS personnalisée pour chaque élément.

**Exemple :**
```html
<div class="bg-gray-900 text-white p-4 rounded-lg">
    Smart Stream TV
</div>
```

- `bg-gray-900` : couleur de fond.
- `text-white` : couleur du texte.
- `p-4` : espacement intérieur.
- `rounded-lg` : coins arrondis.

Dans notre projet, Tailwind CSS permet de créer une interface moderne et de gérer les différents éléments visuels de l'application.

### 17. Git et GitHub

Git est un système de gestion de versions qui permet de suivre les modifications du code.

GitHub est une plateforme qui permet d'héberger les dépôts Git et de collaborer sur un projet.

Dans cette version, nous utilisons des branches pour séparer le développement des différentes fonctionnalités.

**Branches utilisées :**
```bash
git checkout -b feature/favorites
git checkout -b feature/blacklist
git checkout -b feature/add-channel
```

**Commandes principales :**
```bash
git add .
git commit -m "feat: add favorites functionality"
git push origin feature/favorites
```

Les Pull Requests permettent de proposer l'intégration du code dans la branche `develop` et de demander une vérification par un autre membre de l'équipe.

**Conventional Commits :**

- `feat` : nouvelle fonctionnalité.
- `fix` : correction d'un bug.
- `docs` : documentation.
- `style` : modifications de style.
- `refactor` : amélioration du code sans changer son comportement.

---

## Conclusion

Smart Stream TV V2 permet de mettre en pratique plusieurs concepts importants du développement JavaScript et de la communication avec une API REST.

L'utilisation de MockAPI, Fetch API et des méthodes HTTP GET, POST, PUT et DELETE permet de gérer les données des chaînes directement sur un serveur.

Les fonctionnalités des favoris, de la liste noire, de l'ajout et de la suppression des chaînes permettent également de pratiquer la manipulation du DOM, les méthodes des tableaux, les événements et LocalStorage.

Cette version représente une étape importante dans l'apprentissage du développement frontend et de la gestion des données avec une API REST.

**SMART STREAM TV — Your channels, your choice! 📺**

---

**Remarque :** cette documentation présente les technologies et concepts étudiés dans le cadre du projet. Les exemples de code sont illustratifs et doivent être adaptés à l'implémentation réelle de l'application.
