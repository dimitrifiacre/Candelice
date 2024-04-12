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

// SET DEFAULT THEME
document.addEventListener("DOMContentLoaded", () => {
    localStorage.getItem("theme") || localStorage.setItem("theme", "light");
    document.documentElement.classList.add(localStorage.getItem("theme") + "-theme");
});

// NAVBAR
const menuToggle = document.getElementById("menu-toggle");
const headerNavigation = document.querySelector(".header__navigation");
const nav = document.querySelector(".header__navigation ul");
const header = document.querySelector("header");
const navLinks = document.querySelectorAll(".header__navigation ul li a");
const menuToggleIcon = document.querySelector("#menu-toggle span");
const themeToggle = document.querySelectorAll(".theme-toggle");
const themeToggleIcons = document.querySelectorAll(".theme-toggle span");

// Close menu
function closeMenu() {
    headerNavigation.classList.remove("active");
    header.classList.remove("active");
    nav.style.top = "-290px";
}

// Toggle menu
menuToggle.addEventListener("click", () => {
    headerNavigation.classList.toggle("active");
    header.classList.toggle("active");

    // Change menu icon
    if (headerNavigation.classList.contains("active")) {
        nav.style.top = "0px";
        menuToggleIcon.classList.remove("icon-menu");
        menuToggleIcon.classList.add("icon-close");
    } else {
        nav.style.top = "-290px";
        menuToggleIcon.classList.remove("icon-close");
        menuToggleIcon.classList.add("icon-menu");
    }
});

// Close menu after clicking on link
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        closeMenu();
    });
});

// Close menu after clicking in blank
headerNavigation.addEventListener("click", (e) => {
    if (!e.target.closest("ul")) {
        closeMenu();
    }
});

// Toggle theme
themeToggle.forEach(toggle => {
    toggle.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark-theme");
        document.documentElement.classList.toggle("light-theme");

        // Set new theme
        const selectedTheme = document.documentElement.classList.contains("light-theme") ? "light" : "dark";
        localStorage.setItem("theme", selectedTheme);

        // Change theme icon
        themeToggleIcons.forEach(icon => {
            if (document.documentElement.classList.contains("dark-theme")) {
                icon.classList.remove("icon-sun");
                icon.classList.add("icon-moon");
            } else {
                icon.classList.remove("icon-moon");
                icon.classList.add("icon-sun");
            }
        });
    });
});

// COLLAPSE
const productsItems = document.querySelectorAll(".products__item");
const progressTime = 12000;
const productImage = document.querySelector(".products__picture");

// Update ative collapse
function activeCollapse(index) {
    productsItems.forEach(item => item.classList.remove("active"));
    const currentItem = productsItems[index];
    currentItem.classList.add("active");
    const imgPath = currentItem.getAttribute("data-img");
    productImage.setAttribute("src", imgPath);
    const progressBar = currentItem.querySelector(".progressbar__progression");
    progressBar.style.width = "0%";
    updateProgressBar(progressBar, Date.now());
    setTimeout(() => activeCollapse((index + 1) % productsItems.length), progressTime);
}

// Update progress bar
function updateProgressBar(progressBar, startTime) {
    const now = Date.now();
    const elapsedTime = now - startTime;
    const progress = Math.min(100, (elapsedTime / progressTime) * 100);
    progressBar.style.width = progress + "%";
    if (now - startTime < progressTime) {
        requestAnimationFrame(() => updateProgressBar(progressBar, startTime));
    }
}

// Start collapse system with first item
activeCollapse(0);

// CHANGE FAVICON
document.addEventListener("visibilitychange", () => {
    const favicon = document.querySelector("link[rel~='icon']");
    favicon.href = document.hidden ? "assets/img/favicon-inactive.png" : "assets/img/favicon.png";
});