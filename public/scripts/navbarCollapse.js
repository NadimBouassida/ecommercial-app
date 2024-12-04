const nav_toggle = document.querySelector(".navbar-toggler");
nav_toggle.addEventListener("click", () => {
  document.querySelector(".navbar-collapse").classList.toggle("show");
});
