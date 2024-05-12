document.addEventListener("DOMContentLoaded", function () {
  //SELECTION DU FORMULAIRE DE CONNEXION PAR SON ID
  const loginForm = document.getElementById("login-form");

  //Gestion de soumission du formulaire de connexion
  loginForm.addEventListener("submit", function (event) {
    //EMPECHE COMPORTEMENT PAR DEFAUT DU FORMULAIRE
    event.preventDefault();
    //RECUPERATION DES DONNEES DU FORMULAIRE ET TRANSFORMATION EN JSON
    const formData = new FormData(loginForm);
    const formDataJSON = Object.fromEntries(formData.entries());
    console.log("données envoyées:", JSON.stringify(formDataJSON));

    //ENVOI DES DONNEES DU FORMULAIRE A L API
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataJSON),
    })
      //TRAITEMENT DE LA REPONSE DE LA REQUETE
      .then((response) => {
        console.log("2tat de la réponse:", response.status);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Identifiants invalides");
        }
      })
      .then((data) => {
        if (data.token) {
          //SI TOKEN PRESENT DANS LES DONNEES STOCKAGE DANS LOCAL STORAGE
          localStorage.setItem("token", data.token);
          //ET REDIRECTION VERS INDEX.HTML
          window.location.href = "index.html";
        } else {
          throw new Error("Token non trouvé dans la réponse");
        }
      })
      .catch((error) => {
        console.error("Erreur d authentification", error.message);
        alert("Identifiants Invalides");
      });
  });

  //Verifier si utilisateur connecté
  const token = localStorage.getItem("token");
  if (token) {
    //SI TOKEN PRESENT ACTIONS A VENIR:
    //Ajout bouton modifier au DOM
    const modifierButton = document.getElementById("modifierButton");
    modifierButton.textContent = "Modifier";

    //Gestion au clic sur bouton modifier
    modifierButton.addEventListener("click", function () {
      // afficher modale
      const modal = document.getElementById("modalgestionPhoto");
      modal.classList.add("show");
    });

    //Ajout icone
    const icon = document.createElement("i");
    icon.classList.add("far", "fa-pen-to-square");
    modifierButton.appendChild(icon);

    //Ajout bouton apres h2
    const portfolioSection = document.getElementById("portfolio");
    portfolioSection.insertBefore(
      modifierButton,
      portfolioSection.querySelector("h2").nextSibling
    );

    //Affichage bandeau "mode édition
    const editModeBanner = document.getElementById("editModeBanner");
    editModeBanner.style.display = "block";

    //Modification "Login" en "Logout"
    const loginLink = document.getElementById("loginLink");
    loginLink.innerHTML = '<a href="#">Logout</a>';
    loginLink.addEventListener("click", function () {
      //Deconnexion de l utilisateur
      localStorage.removeItem("token");

      //Redirection vers page de connexion (login.html)
      window.location.href = "login.html";
    });
  }
});
