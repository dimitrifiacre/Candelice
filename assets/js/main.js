// SCROLL DETECTION
function onScroll() {
    const header = document.querySelector("header");
    const scrollPosition = window.scrollY;

    // Change style menu on first scroll
    const isScrolled = scrollPosition > 0;
    header.classList.toggle("scrolled", isScrolled);

    // Slide scroll animation
    const productsSlides = document.querySelector(".products__slides");
    const translateValue = scrollPosition * 0.1;
    productsSlides.style.transform = `rotate(-3deg) translateX(${-translateValue}px)`;
}

window.addEventListener("scroll", onScroll);

// MENU ON CLICK
const navbarToggle = document.getElementById("navbar-toggle");
const headerNavigation = document.querySelector(".header__navigation");
const nav = document.querySelector(".header__navigation ul");
const header = document.querySelector("header");
const navLinks = document.querySelectorAll(".header__navigation ul li a");

// Fermer le menu
function closeMenu() {
    headerNavigation.classList.remove("active");
    header.classList.remove("active");
    nav.style.top = "-252px";
}

// Toggle le menu
navbarToggle.addEventListener("click", () => {
    headerNavigation.classList.toggle("active"); 
    header.classList.toggle("active");

    if (headerNavigation.classList.contains("active")) {
        nav.style.top = "0px";
    } else {
        nav.style.top = "-252px";
    }
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        closeMenu();
    });
});

headerNavigation.addEventListener("click", (e) => {
    if (!e.target.closest("ul")) {
        closeMenu();
    }
});

// COLLAPSE
const productsItems = document.querySelectorAll(".products__item");

function activeCollapse(index) {
    productsItems.forEach(item => {
        item.classList.remove("active");
    });

    productsItems[index].classList.add("active");
    const progressBar = productsItems[index].querySelector(".progressbar__progression");
    progressBar.style.width = "0%";

    const progressTime = 10000;

    let startTime = Date.now();
    let endTime = startTime + progressTime;

    function updateProgressBar() {
        const now = Date.now();
        const elapsedTime = now - startTime;
        const progress = Math.min(100, (elapsedTime / progressTime) * 100);

        progressBar.style.width = progress + "%";

        if (now < endTime) {
            requestAnimationFrame(updateProgressBar);
        }
    }

    updateProgressBar();

    setTimeout(() => {
        activeCollapse((index + 1) % productsItems.length);
    }, progressTime);
}

activeCollapse(0);