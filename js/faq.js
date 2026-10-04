document.addEventListener("DOMContentLoaded", () => {

    const faqItems = document.querySelectorAll(".faq-item");


    faqItems.forEach((item) => {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");


        if (!question || !answer) return;


        question.addEventListener("click", () => {

            const isOpen =
                item.classList.contains("active");


            /* =================================================
               FECHA TODOS OS ITENS
            ================================================== */

            faqItems.forEach((otherItem) => {

                otherItem.classList.remove("active");

                const otherQuestion =
                    otherItem.querySelector(".faq-question");

                if (otherQuestion) {

                    otherQuestion.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            });


            /* =================================================
               ABRE O ITEM SELECIONADO
            ================================================== */

            if (!isOpen) {

                item.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });

});