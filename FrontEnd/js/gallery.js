document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.getElementById("gallery");

  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((work) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        img.src = work.imageUrl;
        img.alt = work.title;
        figcaption.textContent = work.title;

        //set data category
        figure.setAttribute("data-category-id", work.categoryId);

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
      });
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des données:", error);
    });
});
