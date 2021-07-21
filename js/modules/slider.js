export default function slider() {
    const windowSlide = document.querySelector(".offer__slider-wrapper"),
        tapeSlide = windowSlide.querySelector(".tapeSlide"),
        slides = tapeSlide.querySelectorAll(".offer__slide");
    const btnSliderPrew = document.querySelector(".offer__slider-prev"),
        btnSliderNext = document.querySelector(".offer__slider-next");
    const current = document.querySelector(".offer__slider-counter #current"),
        total = document.querySelector(".offer__slider-counter #total");

    const widthSlide = +window.getComputedStyle(windowSlide).width.match(/\d+/g);
    tapeSlide.style.width = widthSlide * slides.length + "px";

    total.textContent = slides.length;
    let auxiСurrent = 0;
    const maxAuxiСurrent = slides.length - 1;
    let bias = 0;
    const maxBias = widthSlide * (slides.length - 1);

    const arrBtnNav = [];

    for (const item of slides) {
        arrBtnNav.push(document.createElement("div"));
        arrBtnNav.forEach(btn => {
            btn.classList.add("navBtn");
            document.querySelector(".navigationSlider").append(btn);
        });
    }

    arrBtnNav.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            auxiСurrent = 0;
            bias = 0;
            switchingSlide(i);
        });
    });
    arrBtnNav[0].classList.add("activeNavBtn");

    function switchingSlide(n) {
        auxiСurrent += n;
        bias = widthSlide * auxiСurrent;

        if (auxiСurrent > maxAuxiСurrent) {
            auxiСurrent = 0;
            bias = 0;
        }
        if (auxiСurrent < 0) {
            auxiСurrent = maxAuxiСurrent;
            bias = maxBias;
        }

        arrBtnNav.forEach(b => b.classList.remove("activeNavBtn"));
        arrBtnNav[auxiСurrent].classList.add("activeNavBtn");
        current.textContent = auxiСurrent + 1;
        tapeSlide.style.transform = `translateX(-${bias}px)`;
    }

    btnSliderNext.addEventListener('click', () => switchingSlide(1));
    btnSliderPrew.addEventListener('click', () => switchingSlide(-1));
}