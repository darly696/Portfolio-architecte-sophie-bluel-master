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

//code pour uploader les images
//selecteur d elements
const addPhotoButton = document.getElementById("addPhotoButtonModal");
const fileInput = document.getElementById("fileInput");
const imgPreview = document.getElementById("imagePreview");
fileInput.style.display = "none";
//clic bouton ouverture selecteur de fichier
addPhotoButton.addEventListener("click", function () {
  fileInput.click();
});

//gestion de la selection de fichiers
fileInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  let objectUrl;

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
  //creation objet filereader pour lire le fichier
  const reader = new FileReader();

  reader.onload = function (e) {
    objectUrl = URL.createObjectURL(e.target.result);
    imagePreview.src = objectURL;
    imagePreview.style.display = "block";
  };
  reader.readAsDataURL(file);

  //selection du formulaire et ajout ecouteur d evenement
  const uploadForm = document.getElementById("uploadForm");
  uploadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    //recuperation données du formulaire
    const title = document.getElementById("titleInput").value;
    const category = document.getElementById("categorySelect").value;
  });
  //creation de form data
  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", file);

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
  //liberation url temporaire quand selection d un nouveau fichier
  fileInput.addEventListener("change", () => {
    if (objectURL) {
      URL.revokeObjectURL(objectUrl);
      objectUrl = null;
    }
  });
});
