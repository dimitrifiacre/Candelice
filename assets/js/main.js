window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    const headerLogo = document.querySelector(".header__logo svg path");

    const scrollPosition = window.scrollY;

    // Prévoir condition pour dark mode
    if (scrollPosition > 0) {
        header.classList.add("scrolled");
        headerLogo.style.fill = "#F0725C";
    } else {
        header.classList.remove("scrolled");
        headerLogo.style.fill = "#FCFCFC";
    }
});