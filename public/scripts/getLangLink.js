const langLinks = document.querySelectorAll(".lang-link");
const currentUrl = new URL(window.location.href);

// Set the cooke with the selected language
langLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const langValue = link.getAttribute("data-lang");
    document.cookie = `lang=${langValue}; max-age=86400; path=/`;
  });

  const langValue = link.getAttribute("data-lang");
  const newUrl = new URL(currentUrl);
  newUrl.searchParams.set("lang", langValue);
  link.href = newUrl.href;

  // Get the selected language preference from the cookie
  const langCookie = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith("lang="));
  const lang = langCookie ? langCookie.split("=")[1] : null;

  // Highlight the selected language preference
  if (lang === langValue) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});
