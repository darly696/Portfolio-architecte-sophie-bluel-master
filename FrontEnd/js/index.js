import "./gallery.js";
import { loadModalImages } from "./modalGestionPhoto.js";

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  //selection element loginLink dans le DOM
  const loginLink = document.querySelector("#loginLink a");

  updateUI();

  function updateUI() {
    const isLoggedIn = !!token;
    loginLink.textContent = isLoggedIn ? "Logout" : "Login";
    //FONCTION CREATION ET INSERTION BANDEAU EDITION
    if (isLoggedIn) {
      //APPELER LES FONCTIONS DE CREATION ELEMENTS
      creerEtAfficherBandeauEdition();
      creerEtAfficherBoutonModifier();
    }
  }
  //ECOUTEUR D EVENEMENT AU CLIC SUR LIEN
  loginLink.addEventListener("click", () => {
    localStorage.removeItem("token");
  });

  //CREER LE BANDEAU
  function creerEtAfficherBandeauEdition() {
    const editModeBanner = document.createElement("div");
    editModeBanner.id = "editModeBanner";
    editModeBanner.classList.add("edit-mode-banner");

    //CREER L ICONE
    const icon = document.createElement("i");
    icon.classList.add("far", "fa-edit");

    //CREER LE TEXTE
    const modeEditionP = document.createElement("p");
    modeEditionP.textContent = "Mode édition";

    //AJOUTER ICONE ET TEXTE AU BANDEAU
    editModeBanner.appendChild(icon);
    editModeBanner.appendChild(modeEditionP);

    //INSERTION BANDEAU AU DEBUT DU BODY
    const body = document.body;
    body.insertBefore(editModeBanner, body.firstChild);
  }

  //FONCTION CREATION ET INSERTION BOUTON MODIFIER
  function creerEtAfficherBoutonModifier() {
    const modifierButton = document.createElement("button");
    modifierButton.id = "modifierButton";
    modifierButton.textContent = "Modifier";
    modifierButton.classList.add("modifierButton");

    //AJOUTER ICONE
    const icon = document.createElement("i");
    icon.classList.add("far", "fa-pen-to-square");
    modifierButton.insertBefore(icon, modifierButton.firstChild);

    //INSERTION BOUTON DANS CONTAINER
    const modifierButtonContainer = document.getElementById(
      "modifierButtonContainer"
    );

    if (modifierButtonContainer) {
      modifierButtonContainer.appendChild(modifierButton);
      console.log("Bouton Modifier ajouté au DOM");
      //gestionnaire d evenements pour ouverture modale
      modifierButton.addEventListener("click", () => {
        console.log("Bouton Modifier Cliqué !");
        //afficher modale
        const modalGestionPhoto = document.getElementById("modalGestionPhoto");
        modalGestionPhoto.showModal();
        loadModalImages();
      });
    }
  }
});
