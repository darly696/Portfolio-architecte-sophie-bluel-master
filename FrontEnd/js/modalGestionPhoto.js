document.addEventListener("DOMContentLoaded", function () {
  //selection galerie dans la modale
  const modalGallery = document.getElementById("modal-images");

  modalGallery.addEventListener("click", function (event) {
    //verification si cible au clic est corbeille
    if (event.target.classList.contains("fa-trash")) {
      //recuperation de l id de l image a supprimer
      const imageId = event.target.closest(".image-container").dataset.imageId;

      //suppression de l image associee
      fetch(`http://localhost:5678/api/works/&{imageId}`, {
        method: "DELETE",
      })
        .then((response) => {
          //garantie suppression reussie meme si pas de donnee renvoyee dans la reponse
          if (response.status === 204) {
            //suppression image du DOM si requête reussie
            const container = event.target.closest(".image-container");
            container.remove();
          } else {
            throw new Error("Erreur lors de la suppression de l image");
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de l image:", error);
        });
    }
  });

  //recuperation images API
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      //Effacement contenu precedent de la galerie
      modalGallery.innerHTML = "";

      //Parcours des données récupérées
      data.forEach((work) => {
        //creation du conteneur pour chaque paire image-corbeille
        const container = document.createElement("div");
        container.classList.add("image-container");

        //creation de l element html pour l image
        const img = document.createElement("img");

        img.src = work.imageUrl;
        img.alt = work.title;

        //creation de l element html pour les corbeilles
        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fa", "fa-trash");

        //stockage identifiant de l image
        container.dataset.imageId = work.id;

        //ajout image et corbeille au container
        container.appendChild(img);
        container.appendChild(trashIcon);

        //ajout du conteneur à la galerie modal
        modalGallery.appendChild(container);
      });

      //ajout gestionnaires pour fermer la modale
      const modal = document.getElementById("modalGestionPhoto");
      const closeModalButton = document.getElementById("closeModalButton");

      //fermeture modale avec closemodalButton
      closeModalButton.addEventListener("click", function () {
        modal.style.display = "none";
      });

      //fermeture modal clic exterieur
      window.addEventListener("click", function (event) {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      });
    })
    .catch((error) => {
      console.error("Erreur lors recuperation des données:", error);
    });
});
