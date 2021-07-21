export default function modalFun() {
    const modal = document.querySelector(".modal");
    const btnOpenModal = document.querySelectorAll("[data-modal]");
    const timerOpenModal = setTimeout(codeShow, 60000);

    function scrollOpenModal() {
        const scrollFull = document.documentElement.scrollHeight - 1;
        const scrollDo = document.documentElement.clientHeight + document.documentElement.scrollTop;

        if (scrollFull <= scrollDo) {
            codeShow();
            window.removeEventListener('scroll', scrollOpenModal);
        }
    }

    function codeShow() {
        clearTimeout(timerOpenModal);
        modal.style.display = 'block';
        document.body.style.overflow = "hidden";
        window.removeEventListener('scroll', scrollOpenModal);
    }

    function codeHiden() {
        modal.style.display = 'none';
        document.body.style.overflow = "";
    }

    btnOpenModal.forEach(btn => btn.addEventListener('click', codeShow));

    modal.addEventListener('click', (event) => {
        if (event.target && event.target == modal || event.target.getAttribute("data-close") == "") {
            codeHiden();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code == "Escape") {
            codeHiden();
        }
    });

    window.addEventListener('scroll', scrollOpenModal);
}