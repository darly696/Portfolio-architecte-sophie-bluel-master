import "./gallery.js";
//Verifier si utilisateur connecté
const token = localStorage.getItem("token");

if (token) {
  //SI TOKEN PRESENT ACTIONS A VENIR:
  //CREATION DU BOUTON MODIFIER
  const modifierButton = document.createElement("button");
  modifierButton.id = "modifierButton";
  modifierButton.textContent = "Modifier";

  //Ajout icone
  const icon = document.createElement("i");
  icon.classList.add("far", "fa-pen-to-square");

  modifierButton.insertBefore(icon, modifierButton.firstChild);

  const portfolioSection = document.getElementById("portfolio");
  const h2Element = portfolioSection.querySelector("h2");

  h2Element.insertAdjacentElement("afterend", modifierButton);

  //Gestion au clic sur bouton modifier
  modifierButton.addEventListener("click", function () {
    // afficher modale
    const modal = document.getElementById("modalGestionPhoto");

    modal.showModal();
  });

  //Affichage bandeau "mode édition

  const editModeBanner = document.getElementById("editModeBanner");

  //clonage de l icône
  const clonedIcon = icon.cloneNode(true);

  const editModeText = editModeBanner.querySelector("p");

  //Ajout du clone au bandeau
  editModeBanner.insertBefore(clonedIcon, editModeText);

  //Modification "Login" en "Logout"
  const loginLink = document.getElementById("loginLink");
  loginLink.innerHTML = '<a href="#">Logout</a>';

  //GESTION DECONNEXION UTILISATEUR AU CLIC SUR LOGOUT
  loginLink.addEventListener("click", function () {
    //SUPPRESSION DU TOKEN
    localStorage.removeItem("token");

    //Redirection vers page de connexion (login.html)
    window.location.href = "login.html";
  });
  if (modifierButton) {
    modifierButton.style.display = "block";
  }
  if (editModeBanner) {
    editModeBanner.style.display = "flex";
  }
} else {
  //si token pas present elements cachés
  const modifierButton = document.getElementById("modifierButton");
  if (modifierButton) {
    modifierButton.style.display = "none";
  }

  const editModeBanner = document.getElementById("editModeBanner");
  if (editModeBanner) {
    editModeBanner.style.display = "none";
  }

  const loginLink = document.getElementById("loginLink");
  if (loginLink) {
    loginLink.innerHTML = '<a href="login.html">Login</a>';
  }
}
