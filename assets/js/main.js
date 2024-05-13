// SCROLL DETECTION
let lastScrollTop = 0;
let isScrollingDown = false;

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

window.addEventListener("scroll", () => requestAnimationFrame(onScroll));

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
};

// Toggle menu
menuToggle.addEventListener("click", () => {
    headerNavigation.classList.toggle("active");
    header.classList.toggle("active");

    changeMenuIcon();
});

function changeMenuIcon() {
    if (headerNavigation.classList.contains("active")) {
        nav.style.top = "0px";
        menuToggleIcon.classList.remove("icon-menu");
        menuToggleIcon.classList.add("icon-close");
    } else {
        nav.style.top = "-290px";
        menuToggleIcon.classList.remove("icon-close");
        menuToggleIcon.classList.add("icon-menu");
    }
};

// Close menu after clicking on link
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        closeMenu();
        changeMenuIcon();
    });
});

// Close menu after clicking in blank
headerNavigation.addEventListener("click", (e) => {
    if (!e.target.closest("ul")) {
        closeMenu();
        changeMenuIcon();
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
const productImage = document.querySelector(".products__picture");
const progressTime = 12000;

// Update active collapse
function activeCollapse(i) {
    const currentItem = productsItems[i];
    const imgPath = currentItem.getAttribute("data-img");
    const progressBar = currentItem.querySelector(".progressbar__progression");

    productsItems.forEach(item => item.classList.remove("active"));
    currentItem.classList.add("active");
    productImage.setAttribute("src", imgPath);
    updateProgressBar(progressBar, Date.now());
    setTimeout(() => activeCollapse((i + 1) % productsItems.length), progressTime);
};

// Update progress bar
function updateProgressBar(progressBar, startTime) {
    const dateNow = Date.now();
    const elapsedTime = dateNow - startTime;
    const progress = Math.min(100, (elapsedTime / progressTime) * 100);

    progressBar.style.width = progress + "%";

    if (dateNow - startTime < progressTime) {
        requestAnimationFrame(() => updateProgressBar(progressBar, startTime));
    }
};

// Start collapse system with first item
activeCollapse(0);

// CHANGE FAVICON
document.addEventListener("visibilitychange", () => {
    const favicon = document.querySelector("link[rel~='icon']");
    favicon.href = document.hidden ? "assets/img/favicon-inactive.png" : "assets/img/favicon.png";
});


// STORY SECTION
function detectScrollPosition() {
    const story = document.querySelector(".story");
    const storyTop = story.getBoundingClientRect().top;

    if (storyTop <= 0) {
        const scrollPosition = window.scrollY;
        const storyHeight = story.clientHeight;
        const sectionHeight = storyHeight / 2.8;
        const firstVisibleSectionTop = Math.max(0, storyTop + 80);
        let currentStep = Math.floor((scrollPosition - firstVisibleSectionTop) / sectionHeight);

        currentStep = Math.min(2, currentStep);
        const storyStep = document.querySelectorAll(".story__steps > .story__step");

        storyStep.forEach((step, i) => {
            if (i === currentStep) {
                step.style.opacity = 1;
            } else {
                step.style.opacity = 0;
            }
        });
    }
}

window.addEventListener("scroll", detectScrollPosition);

detectScrollPosition();