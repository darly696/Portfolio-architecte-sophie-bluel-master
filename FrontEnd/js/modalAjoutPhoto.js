const ModalAjoutPhoto = document.getElementById("modalAjoutPhoto");
const openFirstModalButton = document.getElementById("openFirstModalButton");
openFirstModalButton.addEventListener("click", function () {
  openModalAjoutPhoto();
});

const modaleAjoutCloseButton = document.getElementById("closeModalAjoutPhoto");
modaleAjoutCloseButton.addEventListener("click", () => {
  modalAjoutPhoto.close();
});
const modalAjoutbackButton = document.getElementById("backButton");
modalAjoutbackButton.addEventListener("click", () => {
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
  if (fileInput.files[0] && titleInput.value && categoryInput.value) {
    validateButton.classList.add("active");
  } else {
    validateButton.classList.remove("active");
  }
}

//clic bouton ouverture selecteur de fichier
addPhotoButton.addEventListener("click", function () {
  fileInput.click();
});

//gestion de la selection de fichiers
fileInput.addEventListener("change", function (event) {
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
titleInput.addEventListener("input", checkFormCompletion);
categoryInput.addEventListener("input", checkFormCompletion);

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
  fetch("/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("succes", data);

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
      console.error("Erreur:", error);

      //reinitialisation du formulaire et bouton valider
    });
});
