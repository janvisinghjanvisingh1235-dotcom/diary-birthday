document.addEventListener("DOMContentLoaded", function () {

    const cover = document.getElementById("cover");
    const diary = document.getElementById("diary");

    const openDiary = document.getElementById("openDiary");
    const closeDiary = document.getElementById("closeDiary");

    const nextButton = document.getElementById("next");
    const prevButton = document.getElementById("prev");

    const pages = document.querySelectorAll(".page");
    const dots = document.querySelectorAll(".dot");
    const pageNumber = document.getElementById("pageNumber");

    let currentPage = 0;


    function showPage(number) {

        if (number < 0) {
            number = 0;
        }

        if (number >= pages.length) {
            number = pages.length - 1;
        }

        currentPage = number;

        pages.forEach(function (page, index) {

            if (index === currentPage) {
                page.classList.add("active");
            } else {
                page.classList.remove("active");
            }

        });


        dots.forEach(function (dot, index) {

            if (index === currentPage) {
                dot.classList.add("selected");
            } else {
                dot.classList.remove("selected");
            }

        });


        pageNumber.textContent =
            String(currentPage + 1).padStart(2, "0");


        prevButton.disabled = currentPage === 0;
        nextButton.disabled =
            currentPage === pages.length - 1;
    }


    /* ================= OPEN DIARY ================= */

    openDiary.addEventListener("click", function () {

        /* First show the diary */
        diary.classList.add("show");

        /* Then hide the cover */
        setTimeout(function () {
            cover.classList.add("hide");
        }, 200);

        showPage(0);
    });


    /* ================= NEXT ================= */

    nextButton.addEventListener("click", function () {

        if (currentPage < pages.length - 1) {
            showPage(currentPage + 1);
        }

    });


    /* ================= PREVIOUS ================= */

    prevButton.addEventListener("click", function () {

        if (currentPage > 0) {
            showPage(currentPage - 1);
        }

    });


    /* ================= DOTS ================= */

    dots.forEach(function (dot) {

        dot.addEventListener("click", function () {

            const number =
                Number(dot.getAttribute("data-page"));

            showPage(number);

        });

    });


    /* ================= KEYBOARD ================= */

    document.addEventListener("keydown", function (event) {

        if (!diary.classList.contains("show")) {
            return;
        }

        if (event.key === "ArrowRight") {

            if (currentPage < pages.length - 1) {
                showPage(currentPage + 1);
            }

        }

        if (event.key === "ArrowLeft") {

            if (currentPage > 0) {
                showPage(currentPage - 1);
            }

        }

    });


    /* ================= CLOSE DIARY ================= */

    closeDiary.addEventListener("click", function () {

        /*
           First hide the diary.
           Then bring the cover back.
        */

        diary.classList.remove("show");

        setTimeout(function () {

            cover.classList.remove("hide");

            showPage(0);

        }, 600);

    });


    /* ================= START ================= */

    showPage(0);

});
