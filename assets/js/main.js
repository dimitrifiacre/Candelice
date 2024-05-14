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
                icon.classList.remove("icon-moon");
                icon.classList.add("icon-sun");
            } else {
                icon.classList.remove("icon-sun");
                icon.classList.add("icon-moon");
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
    const storyTop = document.querySelector(".story").getBoundingClientRect().top;

    // Change current step according to progress into story section
    if (storyTop <= 0) {
        let currentStep = Math.floor(-storyTop / 800);
        currentStep = Math.min(3, currentStep);
        const storyStep = document.querySelectorAll(".story__steps > .story__step");

        for (let i = 0; i < storyStep.length; i++) {
            if (i === currentStep) {
                storyStep[i].style.opacity = 1;
                storyStep[i].querySelector('.story__picture').style.transform = "scale(1)";
            } else {
                storyStep[i].style.opacity = 0;
                storyStep[i].querySelector('.story__picture').style.transform = "scale(0.9)";
            }
        }
    }

    // Change size's candle during scrolling
    const candleBody = document.querySelector('.candle-body');
    const candleTop = document.querySelector('.candle-top');

    const scrollPercentage = Math.min(1, Math.max(0, -storyTop / 3200));

    const translateCandleBody = scrollPercentage * 51.5;
    const translateCandleTop = scrollPercentage * 50;
    const scaleCandleTop = 1 - (scrollPercentage * 0.064);

    candleBody.style.transform = `translateY(${translateCandleBody}%)`;
    candleTop.style.transform = `translateY(${translateCandleTop}%) scale(${scaleCandleTop})`;
}

window.addEventListener("scroll", detectScrollPosition);

detectScrollPosition();