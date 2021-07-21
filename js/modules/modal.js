export default function modalFun(timerOpenModal, codeShow, codeHiden) {
    const modal = document.querySelector(".modal");
    const btnOpenModal = document.querySelectorAll("[data-modal]");

    function scrollOpenModal() {
        const scrollFull = document.documentElement.scrollHeight - 1;
        const scrollDo = document.documentElement.clientHeight + document.documentElement.scrollTop;

        if (scrollFull <= scrollDo) {
            codeShow(".modal", timerOpenModal, scrollOpenModal);
            window.removeEventListener('scroll', scrollOpenModal);
        }
    }
    
    btnOpenModal.forEach(btn => btn.addEventListener('click', () => codeShow(".modal", timerOpenModal, scrollOpenModal)));

    modal.addEventListener('click', (event) => {
        if (event.target && event.target == modal || event.target.getAttribute("data-close") == "") {
            codeHiden(".modal");
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code == "Escape") {
            codeHiden(".modal");
        }
    });

    window.addEventListener('scroll', scrollOpenModal);
}