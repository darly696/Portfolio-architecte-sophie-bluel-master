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
