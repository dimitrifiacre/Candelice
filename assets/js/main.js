// CHANGE STYLE MENU ON FIRST SCROLL
function menuOnScroll() {
    const header = document.querySelector("header");
    const scrollPosition = window.scrollY;
    const isScrolled = scrollPosition > 0;

    header.classList.toggle("scrolled", isScrolled);
}

window.addEventListener("scroll", menuOnScroll);

// MENU ON CLICK
const navbarToggle = document.getElementById("navbar-toggle");
const headerNavigation = document.querySelector(".header__navigation");
const nav = document.querySelector(".header__navigation nav");
const header = document.querySelector("header");

navbarToggle.addEventListener("click", () => {
    headerNavigation.classList.toggle("active"); 
    header.classList.toggle("active");

    if (headerNavigation.classList.contains("active")) {
        nav.style.top = "0px";
    } else {
        nav.style.top = "-252px";
    }
});

headerNavigation.addEventListener("click", (e) => {
    if (!e.target.closest("nav")) {
        headerNavigation.classList.remove("active");
        header.classList.remove("active");
        nav.style.top = "-252px";
    }
});