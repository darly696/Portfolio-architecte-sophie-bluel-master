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

//code pour uploader les images
//selecteur d elements
const addPhotoButton = document.getElementById("addPhotoButtonModal");
const fileInput = document.getElementById("fileInput");

//clic bouton ouverture selecteur de fichier
addPhotoButton.addEventListener("click", function () {
  fileInput.click();
});

//gestion de la selection de fichiers
fileInput.addEventListener("change", function (event) {
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

  //proceder au telechargement
  const formData = new FormData();
  formData.append("photo", file);

  //ex d envoi du fichier au serveur
  fetch("/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("succes", data);
    })
    .catch((error) => {
      console.error("Erreur:", error);
    });
});
