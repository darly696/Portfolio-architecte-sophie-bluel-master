import { generateMainGallery } from "./gallery.js";

//selection galerie dans la modale
const modalGallery = document.getElementById("modal-images");
const token = localStorage.getItem("token");
const modalGestionPhoto = document.getElementById("modalGestionPhoto");

//FONCTION POUR CHARGER LES IMAGES DS LA MODALE
export function loadModalImages() {
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      modalGallery.innerHTML = "";

      //PARCOURS DES DONNEES RECUPEREES
      data.forEach((work) => {
        //creation du conteneur pour chaque paire image-corbeille
        const container = document.createElement("div");
        container.classList.add("modal-image-container");

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
    })
    .catch((error) => {
      console.error("Erreur lors de la recup des donnees :", error);
    });
}

//GESTION DE LA SUPPRESSION DES IMAGES
modalGallery.addEventListener("click", function (event) {
  //verification si cible au clic est corbeille
  if (event.target.classList.contains("fa-trash")) {
    //recuperation de l id de l image a supprimer
    const imageId = event.target.closest(".modal-image-container").dataset
      .imageId;

    //suppression de l image associee
    fetch(`http://localhost:5678/api/works/${imageId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        //garantie suppression reussie meme si pas de donnee renvoyee dans la reponse
        if (response.status === 204) {
          //suppression image du DOM si requête reussie
          const container = event.target.parentElement;
          container.remove();
          generateMainGallery();
        } else {
          throw new Error("Erreur lors de la suppression de l image");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l image:", error);
      });
  }
});

//ajout gestionnaires pour fermer la modale
const closeModalButton = document.getElementById("closeModalButton");
//fermeture modale avec closemodalButton
closeModalButton.addEventListener("click", function () {
  modalGestionPhoto.close();
  loadModalImages();
});

//fermeture modale clic exterieur

window.addEventListener("click", function (event) {
  //verification si modale ouverte
  if (modalGestionPhoto.open && !modalGestionPhoto.contains(event.target)) {
    //fermeture modale
    modalGestionPhoto.close();
    loadModalImages();
  }
});

//ouverture modalAjoutPhoto
function openModalAjoutPhoto() {
  modalGestionPhoto.close();

  const modalAjoutPhoto = document.getElementById("modalAjoutPhoto");
  modalAjoutPhoto.showModal();
}

const openFirstModalButton = document.getElementById("openFirstModalButton");
openFirstModalButton.addEventListener("click", function () {
  openModalAjoutPhoto();
});
