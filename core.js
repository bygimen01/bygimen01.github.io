document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navigation");
    const banner = document.querySelector(".banner");
    const bannerText = document.querySelector(".banner .text-center");
    const animatedElements = document.querySelectorAll(".animate");
    const form = document.getElementById("my-form");
    const status = document.getElementById("my-form-status");

    let isAnimating = false;

    const toggleNavbarShadow = () => {
        const bannerHeight = banner.offsetHeight;
        navbar.classList.toggle("navbar-shadow", window.scrollY > bannerHeight);
    };

    const handleBannerParallax = () => {
        if (banner) {
            banner.classList.toggle("scrolled", window.scrollY > 50);
        }
    };

    const animateVisibleElements = () => {
        if (isAnimating) return;

        const visibleElements = Array.from(animatedElements).filter((el) => {
            const rect = el.getBoundingClientRect();
            return (
                rect.top < window.innerHeight - 50 &&
                rect.bottom + 50 > 0 &&
                !el.classList.contains("visible")
            );
        });

        if (visibleElements.length > 0) {
            isAnimating = true;

            visibleElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add("visible");

                    if (index === visibleElements.length - 1) {
                        isAnimating = false;
                    }
                }, index * 100);
            });
        }
    };

    const markAllVisibleOnScrollEnd = () => {
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
            animatedElements.forEach((el) => el.classList.add("visible"));
            isAnimating = false;
        }
    };

    const handleScroll = () => {
        toggleNavbarShadow();
        handleBannerParallax();
        animateVisibleElements();
        markAllVisibleOnScrollEnd();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: formData,
                headers: { Accept: "application/json" },
            });

            if (response.ok) {
                status.textContent = "Thanks for your submission!";
                form.reset();
            } else {
                const data = await response.json();
                status.textContent = data.errors
                    ? data.errors.map((error) => error.message).join(", ")
                    : "Oops! There was a problem submitting your form.";
            }
        } catch {
            status.textContent = "Oops! There was a problem submitting your form.";
        }
    };

    window.scrollTo(0, 0);

    window.addEventListener("scroll", handleScroll);
    form.addEventListener("submit", handleSubmit);
    handleScroll();
});

$(document).ready(function () {
    const contactNav = $(".contact-nav");
    const menuTogglerButton = $("#menuToggleButton");

    function moveUnderline(up) {
        let underline = $(".container-underline");
        let currentTop = parseInt(underline.css("top"));
        let height = parseInt($(".burger-menu").css('height'));
        let targetTop = up ? currentTop - height : currentTop + height;
        let step = up ? -3 : 3;
        let interval = setInterval(() => {
            currentTop += step;
            underline.css("top", currentTop + "px");

            if ((up && currentTop <= targetTop) || (!up && currentTop >= targetTop)) {
                underline.css("top", targetTop + "px");
                clearInterval(interval);
            }
        }, 1);
    }

    function hideNavContactNumber() {
        moveUnderline(false);
        contactNav.slideUp(1);
    }

    function showNavContactNumber() {
        moveUnderline(true);
        contactNav.slideDown(700);
    }

    function toggleMenuButtonEvent() {
        if (menuTogglerButton.hasClass('collapsed')) {
            showNavContactNumber();
            console.log("Showing");
        } else {
            hideNavContactNumber();
            console.log("Hiding");
        }
    }

    menuTogglerButton.on('click', toggleMenuButtonEvent);
});
