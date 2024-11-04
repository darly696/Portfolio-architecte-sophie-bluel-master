//SELECTION DU FORMULAIRE DE CONNEXION PAR SON ID
const loginForm = document.getElementById("login-form");

//verification si formulaire présent
if (loginForm != null) {
  //Gestion de soumission du formulaire de connexion
  loginForm.addEventListener("submit", function (event) {
    //EMPECHE COMPORTEMENT PAR DEFAUT DU FORMULAIRE
    event.preventDefault();
    console.log("Formulaire soumis");

    //RECUPERATION DES DONNEES DU FORMULAIRE ET TRANSFORMATION EN JSON
    const formData = new FormData(loginForm);
    const formDataJSON = Object.fromEntries(formData.entries());

    //ENVOI DES DONNEES DU FORMULAIRE A L API
    console.log("Envoi des données au serveur", formDataJSON);
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataJSON),
    })
      //TRAITEMENT DE LA REPONSE DE LA REQUETE
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Erreur dans la réponse:", response.status);
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
}
