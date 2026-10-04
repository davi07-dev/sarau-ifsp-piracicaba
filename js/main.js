/* =========================================================
   SARAU — MAIN JS
   Funcionalidades gerais do site
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. HEADER AO ROLAR A PÁGINA
    ===================================================== */

    const header = document.querySelector(".site-header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       2. MENU MOBILE
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-navigation");

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navigation.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

        });


        /* -----------------------------------------------
           Fechar menu ao clicar em um link
        ----------------------------------------------- */

        const navigationLinks =
            navigation.querySelectorAll("a");

        navigationLinks.forEach(link => {

            link.addEventListener("click", () => {

                navigation.classList.remove("open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        /* -----------------------------------------------
           Fechar menu ao apertar ESC
        ----------------------------------------------- */

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                navigation.classList.remove("open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });


        /* -----------------------------------------------
           Fechar menu ao clicar fora
        ----------------------------------------------- */

        document.addEventListener("click", event => {

            const clickedInsideHeader =
                event.target.closest(".site-header");

            if (!clickedInsideHeader) {

                navigation.classList.remove("open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });

    }


    /* =====================================================
   3. PÁGINA ATUAL NO MENU
===================================================== */

const currentPage =
    window.location.pathname
        .split("/")
        .pop() || "index.html";

const navLinks =
    document.querySelectorAll(
        ".main-navigation .nav-link"
    );


/*
 * Primeiro remove qualquer active
 * que tenha sido colocado diretamente no HTML.
 *
 * Dessa forma nunca teremos duas páginas
 * marcadas como ativas ao mesmo tempo.
 */

navLinks.forEach(link => {

    link.classList.remove("active");

    link.removeAttribute("aria-current");

});


/*
 * Agora identifica qual é a página atual
 * e coloca active somente nela.
 */

navLinks.forEach(link => {

    const href =
        link.getAttribute("href");

    if (!href) return;

    const linkPage =
        href.split("/").pop();

    if (
        linkPage === currentPage ||
        (
            currentPage === "" &&
            linkPage === "index.html"
        )
    ) {

        link.classList.add("active");

        link.setAttribute(
            "aria-current",
            "page"
        );

    }

});

    /* =====================================================
       4. FECHAR MENU SE A TELA FOR REDIMENSIONADA
    ===================================================== */

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 900 &&
            navigation
        ) {

            navigation.classList.remove("open");

            if (menuToggle) {

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        }

    });


    /* =====================================================
       5. SCROLL SUAVE PARA ÂNCORAS
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    anchorLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       6. FECHAR MENU QUANDO CLICAR EM UM BOTÃO
       QUE LEVA PARA OUTRA PÁGINA
    ===================================================== */

    const pageLinks =
        document.querySelectorAll(
            '.main-navigation a[href$=".html"]'
        );

    pageLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (!navigation || !menuToggle) {
                return;
            }

            navigation.classList.remove("open");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /* =====================================================
       7. ANO AUTOMÁTICO DO FOOTER
    ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );

    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       8. PREVENÇÃO DE CLIQUES EM LINKS "#"
    ===================================================== */

    const emptyLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );

    emptyLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

        });

    });


    /* =====================================================
       9. FEEDBACK VISUAL AO CLICAR NOS BOTÕES
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".button"
        );

    buttons.forEach(button => {

        button.addEventListener("mousedown", () => {

            button.classList.add("pressed");

        });

        button.addEventListener("mouseup", () => {

            button.classList.remove("pressed");

        });

        button.addEventListener("mouseleave", () => {

            button.classList.remove("pressed");

        });

    });

        /* =====================================================
       CRONÔMETRO DO SARAU
    ====================================================== */

    const countdown = document.querySelector("#countdown");

    if (countdown) {

        const eventDate = new Date(
            "2026-10-29T14:00:00-03:00"
        ).getTime();

        const daysElement = document.querySelector("#countdown-days");
        const hoursElement = document.querySelector("#countdown-hours");
        const minutesElement = document.querySelector("#countdown-minutes");
        const secondsElement = document.querySelector("#countdown-seconds");

        function updateCountdown() {

            const now = new Date().getTime();

            const difference = eventDate - now;

            if (difference <= 0) {

                daysElement.textContent = "00";
                hoursElement.textContent = "00";
                minutesElement.textContent = "00";
                secondsElement.textContent = "00";

                const label = countdown.querySelector(".countdown-label");

                if (label) {
                    label.textContent = "O SARAU COMEÇOU";
                }

                return;
            }

            const days = Math.floor(
                difference / (1000 * 60 * 60 * 24)
            );

            const hours = Math.floor(
                (difference / (1000 * 60 * 60)) % 24
            );

            const minutes = Math.floor(
                (difference / (1000 * 60)) % 60
            );

            const seconds = Math.floor(
                (difference / 1000) % 60
            );


            daysElement.textContent =
                String(days).padStart(2, "0");

            hoursElement.textContent =
                String(hours).padStart(2, "0");

            minutesElement.textContent =
                String(minutes).padStart(2, "0");

            secondsElement.textContent =
                String(seconds).padStart(2, "0");
        }

        updateCountdown();

        setInterval(updateCountdown, 1000);
    }

        /* =====================================================
       CONTADOR REGRESSIVO DO SARAU
    ====================================================== */

    const countdownDays = document.getElementById("countdown-days");
    const countdownHours = document.getElementById("countdown-hours");
    const countdownMinutes = document.getElementById("countdown-minutes");
    const countdownSeconds = document.getElementById("countdown-seconds");

    if (
        countdownDays &&
        countdownHours &&
        countdownMinutes &&
        countdownSeconds
    ) {

        /*
         * Data oficial do Sarau:
         * 29 de outubro de 2026 às 14h
         */

        const eventDate = new Date(
            "2026-10-29T14:00:00"
        ).getTime();


        function updateCountdown() {

            const now = new Date().getTime();

            const difference = eventDate - now;


            /* Evento já começou */

            if (difference <= 0) {

                countdownDays.textContent = "00";
                countdownHours.textContent = "00";
                countdownMinutes.textContent = "00";
                countdownSeconds.textContent = "00";

                return;
            }


            const days = Math.floor(
                difference / (1000 * 60 * 60 * 24)
            );


            const hours = Math.floor(
                (difference %
                    (1000 * 60 * 60 * 24))
                /
                (1000 * 60 * 60)
            );


            const minutes = Math.floor(
                (difference %
                    (1000 * 60 * 60))
                /
                (1000 * 60)
            );


            const seconds = Math.floor(
                (difference %
                    (1000 * 60))
                /
                1000
            );


            countdownDays.textContent =
                String(days).padStart(2, "0");

            countdownHours.textContent =
                String(hours).padStart(2, "0");

            countdownMinutes.textContent =
                String(minutes).padStart(2, "0");

            countdownSeconds.textContent =
                String(seconds).padStart(2, "0");
        }


        updateCountdown();

        setInterval(
            updateCountdown,
            1000
        );
    }

        /* =====================================================
       ANIMAÇÕES DE ENTRADA
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("revealed");
        });

    }
    
    /* =====================================================
       10. LOG NO CONSOLE
    ===================================================== */

    console.log(
        "Sarau — site carregado com sucesso."
    );

});