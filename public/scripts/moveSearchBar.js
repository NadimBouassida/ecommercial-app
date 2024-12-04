// Get the search bar element
const searchBar = document.querySelector(".search-bar");
const navbarBrand = document.querySelector(".navbar-brand");
const navbarLeft = document.querySelector(".navbar-left");

if (window.innerWidth < 768){
  navbarBrand.after(searchBar);
}

window.addEventListener("resize", () => {
  // Check if the window width is less than 768px
  if (window.innerWidth < 768) {
    navbarBrand.after(searchBar);
  }
  else{
    navbarLeft.after(searchBar);
  }
});
