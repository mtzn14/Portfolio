const images = ["slika1.jpg", "slika2.jpg", "slika3.jpg"]; // Dodaj putove do slika
let currentIndex = 0;

const imgElement = document.querySelector(".project-image");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    imgElement.src = images[currentIndex];
});

nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    imgElement.src = images[currentIndex];
});
