const langLinks = document.querySelectorAll(".lang-link");
const currentUrl = new URL(window.location.href);

langLinks.forEach((link) => {
  const lang = link.getAttribute("data-lang");
  const newUrl = new URL(currentUrl);
  newUrl.searchParams.set("lang", lang);
  link.href = newUrl.href;
});
