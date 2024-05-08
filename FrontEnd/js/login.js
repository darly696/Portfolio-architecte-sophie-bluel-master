document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  //Gestion de soumission du formulaire de connexion
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const formDataJSON = Object.fromEntries(formData.entries());

    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        ContentType: "application/json",
      },
      body: JSON.stringify(formDataJSON),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Identifiants invalides");
        }
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          window.location.href = "index.html";
        } else {
          throw new Error("Token non trouvé dans la réponse");
        }
      })
      .catch((error) => {
        console.error("Erreur d authentification", error.message);
      });
  });

  //Verifier si utilisateur connecté
  const token = localStorage.getItem("token");
  if (token) {
    //Ajout bouton modifier au DOM
    const modifierButton = document.getElementById("modifierButton");
    modifierButton.textContent = "Modifier";
    modifierButton.id = "modifierButton";

    //Gestion au clic sur bouton modifier
    modifierButton.addEventListener("click", function () {
      //logique a implementer pour afficher modale
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
