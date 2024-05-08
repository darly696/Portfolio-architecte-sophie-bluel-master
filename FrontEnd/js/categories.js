document.addEventListener("DOMContentLoaded", function () {
  function fetchCategories() {
    fetch("http://localhost:5678/api/categories")
      .then((response) => response.json())
      .then((categories) => {
        categories.unshift({ id: "all", name: "Tous" });
        generateCategoryMenu(categories);
      })
      .catch((error) => {
        console.error("Erreur lors de la recuperation des catégories:", error);
      });
  }

  function generateCategoryMenu(categories) {
    var menu = document.getElementById("categories-menu");

    categories.forEach((category) => {
      var listItem = document.createElement("li");
      listItem.textContent = category.name;
      listItem.setAttribute("data-category-id", category.id);

      listItem.addEventListener("click", function () {
        var selectedCategoryId = category.id;
        filterWorksByCategory(selectedCategoryId);

        menu.querySelectorAll("li").forEach((li) => {
          li.classList.remove("selected");
        });

        listItem.classList.add("selected");
      });
      menu.appendChild(listItem);
    });
  }
  function addCategoryListeners() {
    const categoryLinks = document.querySelectorAll("#categories-menu li");

    categoryLinks.forEach((link) => {
      link.addEventListener("click", function () {
        const categoryId = this.getAttribute("data-category-id");
        filterWorksByCategory(categoryId);
      });
    });
  }
  fetchCategories();
});

//FONCTION FILTRAGE DES TRAVAUX PAR CATEGORIE
async function filterWorksByCategory(categoryId) {
  try {
    const allWorks = document.querySelectorAll(".gallery figure");

    //Parcours des travaux pour filtrer par categorie
    allWorks.forEach((work) => {
      const workCategoryId = work.dataset.categoryId;
      console.log("Work category ID:", workCategoryId);
      //filtrage des travaux affichés en fonction categorie selectionnee
      if (
        categoryId === "all" ||
        (workCategoryId && workCategoryId === categoryId)
      ) {
        work.style.display = "block"; //affiche le travail si categorie correspond ou all
      } else {
        work.style.display = "none"; //sinon caché
      }
    });
  } catch (error) {
    console.error("Error filtering works:", error);
  }
}
