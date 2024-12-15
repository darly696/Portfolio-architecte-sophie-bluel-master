import { openModalAjoutPhoto } from "./modalGestionPhoto.js";
const ModalAjoutPhoto = document.getElementById("modalAjoutPhoto");
const openFirstModalButton = document.getElementById("openFirstModalButton");
//FONCTION REINITIALISATION MODALE
function resetModal() {
  uploadForm.reset();
  imgPreview.style.display = "none";
  validateButton.classList.remove("active");
  fileInput = "";
}
openFirstModalButton.addEventListener("click", function () {
  console.log("Bouton 'ajouter ue photo' cliqué");
  openModalAjoutPhoto();
});

const modaleAjoutCloseButton = document.getElementById("closeModalAjoutPhoto");
modaleAjoutCloseButton.addEventListener("click", () => {
  console.log("Bouton 'fermer' cliqué");
  modalAjoutPhoto.close();
});
const modalAjoutbackButton = document.getElementById("backButton");
modalAjoutbackButton.addEventListener("click", () => {
  console.log("Bouton 'retour' cliqué");
  modalAjoutPhoto.close();
  modalGestionPhoto.showModal();
});
const titleInput = document.getElementById("titleInput");
const categoryInput = document.getElementById("categoryInput");
const validateButton = document.getElementById("validateButton");

//code pour uploader les images
//selecteur d elements
const addPhotoButton = document.getElementById("addPhotoButtonModal");
const fileInput = document.getElementById("fileInput");
const imgPreview = document.getElementById("imagePreview");

//variable pour stocker l url
let objectURL;

//fonction pour verifier si formulaire complet
function checkFormCompletion() {
  if (
    fileInput.files[0] &&
    titleInput.value &&
    categoryInput.selectedIndex > 0
  ) {
    console.log("Tous les champs sont remplis");
    validateButton.classList.add("active");
  } else {
    console.log("un ou plusieurs champs sont vides");
    validateButton.classList.remove("active");
  }
}

//clic bouton ouverture selecteur de fichier
addPhotoButton.addEventListener("click", function () {
  console.log("Bouton 'ajouter une photo'(dans la modale) cliqué");
  fileInput.click();
});

//gestion de la selection de fichiers
fileInput.addEventListener("change", function (event) {
  console.log("un fichier à été sélectionné");
  //liberation de l url temporaire si elle existe
  if (objectURL) {
    URL.revokeObjectURL(objectURL);
    objectURL = null;
  }

  const file = event.target.files[0];

  //verification taille des fichiers
  if (file.size > 4 * 1024 * 1024) {
    alert("le fichier doit être inférieur à 4Mo");
    return;
  }

  //verification type de fichiers
  const fileTypes = ["image/jpeg", "image/png"];
  if (!fileTypes.includes(file.type)) {
    alert("le fichier doit être jpeg ou png");
    return;
  }
  //creation d une nlle url temporaire pour l aperçu
  objectURL = URL.createObjectURL(file);
  imgPreview.src = objectURL;
  imgPreview.style.display = "block";

  //verifie si le formulaire est complet apres selection de l image
  checkFormCompletion();
});
//verification des champs de titre et de categorie
titleInput.addEventListener("input", () => {
  console.log("champ de titre modifié");
  checkFormCompletion();
});
categoryInput.addEventListener("change", () => {
  console.log("champ de categorie modifié");
  checkFormCompletion();
});

//DYNAMISER CAT2GORIE
//fonction pour recupérer les catégories de l API
async function loadCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();
    const categorySelect = document.getElementById("categoryInput");

    //Ajout des catégories dynamiquement
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      categoryInput.appendChild(option);
    });
  } catch (error) {
    console.error("Erreur lors du chargement des catégories :", error);
  }
}
//APPEL A LA FONCTION CHARGEMENT CATEGORIE
loadCategories();

//selection du formulaire et ajout ecouteur d evenement
const uploadForm = document.getElementById("uploadForm");
uploadForm.addEventListener("submit", (event) => {
  event.preventDefault();

  //verification si tous les champs sont remplis avant soumission
  if (!validateButton.classList.contains("active")) {
    alert("Veuillez remplir tous les champs");
    return;
  }

  //creation de form data
  const formData = new FormData(uploadForm);

  //ex d envoi du fichier au serveur
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      authorization: "Bearer ${token}",
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      //AJOUT DE RETOUR URL

      console.log("succes", data);
      //R2INITIALISATION DU FORMULAIRE
      uploadForm.reset();
      imgPreview.style.display = "none";
      validateButton.classList.remove("active");

      //liberation de l url si existante
      if (objectURL) {
        URL.revokeObjectURL(objectURL);
        objectURL = null;
      }
    })
    .catch((error) => {
      console.error("Erreur lors du chargement des catégories:", error);

      //reinitialisation du formulaire et bouton valider
    });
});
