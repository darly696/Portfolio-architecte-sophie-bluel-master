//1) FONCTION POUR RECUPERER LES TRAVAUX DEPUIS API
function fetchCategories() {
  //REQUETE POUR OBTENIR LES CATEGORIES
  fetch("http://localhost:5678/api/categories")
    //SI REQUETE REUSSIT TRAITE LA REPONSE EN JSON
    .then((response) => response.json())

    //UNE FOIS CATEGORIES OBTENUES AJOUTE UNE CATEGORIE "TOUS" EN PREMIER
    .then((categories) => {
      categories.unshift({ id: "all", name: "Tous" });

      //PUIS GENERATION DU MENU
      generateCategoryMenu(categories);
    })
    //SI ERREUR RECUPERATION MESSAGE D ERREUR DANS LA CONSOLE
    .catch((error) => {
      console.error("Erreur lors de la recuperation des catégories:", error);
    });
}
//2) FONCTION GENERATION DU MENU DE CATEGORIES
function generateCategoryMenu(categories) {
  //SELECTION ELEMENT HTML REPRESENTANT LE CONTENEUR DU MENU
  var menu = document.getElementById("categories-menu");
  menu.innerHTML = "";

  //CREATION D UN ELEMENT DE LISTE POUR CHAQUE CATEGORIE ET AJOUT AU MENU
  categories.forEach((category, index) => {
    var listItem = document.createElement("li");
    listItem.textContent = category.name;
    listItem.setAttribute("data-category-id", category.id);

    if (index === 0) {
      listItem.classList.add("selected");
      filterWorksByCategory("all");
    }

    //AJOUT ECOUTEUR D EVENEMENT CLIC SUR UNE CATEGORIE
    listItem.addEventListener("click", function () {
      var selectedCategoryId = category.id;

      //FILTRE LES TRAVAUX PAR CATEGORIE EN FONCTION SELECTION
      filterWorksByCategory(selectedCategoryId);

      // SUPPRESSION CLASS SELECTED DE TOUS LES ELEMENTS DE LISTE DU MENU
      menu.querySelectorAll("li").forEach((li) => {
        li.classList.remove("selected");
      });
      //AJOUT CLASS SELECTED A ELEMENT DE LISTE CLIQUE
      listItem.classList.add("selected");
    });
    //AJOUT ELEMENT DE LISTE AU MENU
    menu.appendChild(listItem);
  });
}

//3) FONCTION FILTRAGE DES TRAVAUX PAR CATEGORIE
async function filterWorksByCategory(categoryId) {
  try {
    //RECUPERATION DE TOUS LES TRAVAUX (FIGURE) DE LA GALERIE
    const allWorks = document.querySelectorAll(".gallery figure");

    //PARCOURS DE TOUS LES TRAVAUX POUR FILTRAGE PAR CATEGORIE
    allWorks.forEach((work) => {
      //RECUPERATION DE L IDENTIFIANT DE CATEGORIE ASSOCIE A CHAQUE TRAVAIL
      const workCategoryId = parseInt(work.getAttribute("data-category-id"));

      //FILTRAGE DES TRAVAUX AFFICHES EN FONCTION CATEGORIE SELECTIONNE
      if (
        categoryId === "all" || //SI LA CATEGORIE EST "TOUS"
        (!isNaN(workCategoryId) && workCategoryId === parseInt(categoryId))
        // OU SI IDENTIFIANT  DE CATEGORIE CORRESPOND A CATEGORIE SELECTIONNE
      ) {
        work.style.display = "block"; //affiche le travail
      } else {
        work.style.display = "none"; //sinon caché
      }
    });
  } catch (error) {
    console.error("Error filtering works:", error);
    //POSSIBILITE AFFICHER MESSAGE D ERREUR POUR UTILISATEUR ???
  }
}
fetchCategories(); //4) APPEL DE LA FONCTION DEMARRAGE RECUPERATION ET GENERATION DES CATEGORIES
