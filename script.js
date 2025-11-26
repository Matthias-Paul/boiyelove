// Animated text changer
const texts = [
  "stay running",
  "stay protected",
];
let currentIndex = 0;
const changingText = document.getElementById("changing-text");

function changeText() {
  changingText.style.opacity = "0";
  setTimeout(() => {
    changingText.textContent = texts[currentIndex];
    changingText.style.opacity = "1";
    currentIndex = (currentIndex + 1) % texts.length;
  }, 500);
}

changingText.style.transition = "opacity 0.5s ease";
changeText();
setInterval(changeText, 3000);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
