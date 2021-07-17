const btnTabs = document.querySelectorAll('.tabheader__item'),
      parentBtnTabs = document.querySelector('.tabheader__items'),
      contentTabs = document.querySelectorAll('.tabcontent');

parentBtnTabs.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains("tabheader__item") && !event.target.classList.contains("tabheader__item_active")) {
        
        btnTabs.forEach(item => item.classList.remove("tabheader__item_active"));
        contentTabs.forEach(item => item.classList.remove("activeTab"));

        btnTabs.forEach((item, index) => {
            if (item == event.target) {
                btnTabs[index].classList.add("tabheader__item_active");
                contentTabs[index].classList.add("activeTab");
            }
        });
    }
});

// Таймер

const deadline = "2021-07-20";
const timer = document.querySelector('.timer');

function setTimer(endTime, parentTimer) {
    let restTime;

    const daysBox = parentTimer.querySelector("#days"),
          hoursBox = parentTimer.querySelector("#hours"),
          minutesBox = parentTimer.querySelector("#minutes"),
          secondsBox = parentTimer.querySelector("#seconds");
    
    const timerInterwal = setInterval(renewalTimer, 1000);
    function renewalTimer() {
        restTime = Date.parse(endTime) - new Date();
        const days = Math.round(restTime / (1000 * 60 * 60 * 24)),
              hours = Math.round(restTime / (1000 * 60 * 60) % 24),
              minutes = Math.round(restTime / (1000 * 60) % 60),
              seconds = Math.round((restTime / 1000) % 60);

        daysBox.textContent = getZero(days);
        hoursBox.textContent = getZero(hours);
        minutesBox.textContent = getZero(minutes);
        secondsBox.textContent = getZero(seconds);
    }
    renewalTimer();

    if (restTime <= 0) {
        clearInterval(timerInterwal);
        daysBox.textContent = "00";
        hoursBox.textContent = "00";
        minutesBox.textContent = "00";
        secondsBox.textContent = "00";
    }
}
setTimer(deadline, timer);

function getZero(number) {
    if (number < 10) {
        return `0${number}`;
    } else {
        return number;
    }
}

// Модальное окно

const modal = document.querySelector(".modal");
const btnOpenModal = document.querySelectorAll("[data-modal]");
const timerOpenModal = setTimeout(codeShow, 60000);

function scrollOpenModal ()  {
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

// Динамическая генерация карточок на сайте

const containerCardMenu = document.querySelector(".menu__field .container");

class CardMenu {
    constructor({img, altimg, title, descr, price}) {
        this.img = img;
        this.altimg = altimg;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.tranfer = 27;
        this.UAHConvert();
    }

    UAHConvert () {
        this.price *= this.tranfer;
    }
     
    generatorCardMenu () {
        const div = document.createElement("div");
        div.classList.add("menu__item");
        
        div.innerHTML = `
            <img src="${this.img}" alt="${this.altimg}">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;

        containerCardMenu.append(div);
    }
}

async function getDataDB(url) {
    const data = await fetch(url);

    if (!data.ok) { 
        throw new Error(`Cloud not fetch  ${url}, status: ${data.status}`);
    }

    return data.json();
}

getDataDB("http://localhost:3000/menu")
    .then((data) => {
        data.forEach((item) => new CardMenu(item).generatorCardMenu());
    });

// Отправка данных форм

const forms = document.querySelectorAll("form");

const message = {
    success: 'Успешно отправлено',
    load: 'img/spinner.svg',
    failed: 'Ошибка отправки'
};

async function postData (urlDB, header, body) {
    const res = await fetch(urlDB, {
        method: "POST",
        headers: {
            "Content-type": header
        },
        body: body
    });

    return res.json();
}

forms.forEach(form => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const loadBox = document.createElement("img");
        loadBox.classList.add("messageText");
        loadBox.src = message.load;
        form.insertAdjacentElement("afterend", loadBox);

        const formData = new FormData(form);
        const postJSON = {};
        formData.forEach((value, key) => postJSON[key] = value);
        postData('http://localhost:3000/requests', "application/json", JSON.stringify(postJSON))
        .then((res) => {
            console.log(res);
            statusModal(message.success);
        }).catch(() => {
            statusModal(message.failed);
        }).finally(() => {
            loadBox.remove();
            form.reset();
        });
    });
});

function statusModal(messageText) {
    codeShow();
    const contentRepit = document.querySelector(".modal__dialog");
    contentRepit.style.display = "none";

    const messageRepit = document.createElement("div");
    messageRepit.classList.add("modal__dialog");
    messageRepit.innerHTML = `
        <div class="modal__content">
            <form action="#">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${messageText}</div>
            </form>
        </div>
    `;
    modal.append(messageRepit);

    setTimeout(() => {
        messageRepit.remove();
        contentRepit.style.display = "block";
        codeHiden();
    }, 3000);
}

// Слайдер
const windowSlide = document.querySelector(".offer__slider-wrapper"),
      tapeSlide = windowSlide.querySelector(".tapeSlide"),
      slides = tapeSlide.querySelectorAll(".offer__slide");
const btnSliderPrew = document.querySelector(".offer__slider-prev"),
      btnSliderNext = document.querySelector(".offer__slider-next");
const current = document.querySelector(".offer__slider-counter #current"),
      total = document.querySelector(".offer__slider-counter #total");

const widthSlide = +window.getComputedStyle(windowSlide).width.match(/\d+/g);
tapeSlide.style.width = widthSlide * slides.length + "px";
     
total.textContent = getZero(slides.length);
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
    current.textContent = getZero(auxiСurrent + 1);
    tapeSlide.style.transform = `translateX(-${bias}px)`;
}

btnSliderNext.addEventListener('click', () => switchingSlide(1));
btnSliderPrew.addEventListener('click', () =>  switchingSlide(-1));

// Калькулятор калорий
const peopleData = {};

function collectionData() {
    const genderBtn = document.querySelectorAll("#gender .calculating__choose-item");
    genderBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            peopleData.gender = btn.id;
            genderBtn.forEach(b => b.classList.remove("calculating__choose-item_active"));
            btn.classList.add("calculating__choose-item_active");
            еstablishingLocalSettings();
            calculationCalories(peopleData);
        });
    });
    document.querySelector(".calculating__choose_medium").addEventListener('input', (event) => {
        switch (event.target.id) {
            case "height":
                peopleData.height = correctness(event.target);
                break;
            case "weight":
                peopleData.weight = correctness(event.target);
                break;
            case "age":
                peopleData.age = correctness(event.target);
                break;
        }
        calculationCalories(peopleData);
    });
    function correctness(elem) {
        if (+elem.value) {
            elem.style.border = "solid 1px lawngreen";
            return +elem.value;
        } else if (elem.value == "") {
            elem.style.border = "none";
        } else {
            elem.style.border = "solid 1px red";
        }
    }
    document.querySelector(".calculating__choose_big").addEventListener('click', (event) => {
        document.querySelectorAll(".calculating__choose_big .calculating__choose-item").forEach(item => item.classList.remove("calculating__choose-item_active"));
        if (event.target.classList.contains("calculating__choose-item")) {
            switch (event.target.getAttribute("data-Coefficient")) {
                case "1.2":
                    peopleData.activity = 1.2;
                    event.target.classList.add("calculating__choose-item_active");
                    break;
                case "1.375":
                    peopleData.activity = 1.375;
                    event.target.classList.add("calculating__choose-item_active");
                    break;
                case "1.55":
                    peopleData.activity = 1.55;
                    event.target.classList.add("calculating__choose-item_active");
                    break;
                case "1.725":
                    peopleData.activity = 1.725;
                    event.target.classList.add("calculating__choose-item_active");
                    break;
            }
        } else {
            peopleData.activity = 0;
        }
        еstablishingLocalSettings();
        calculationCalories(peopleData);
    });
}
collectionData();

function еstablishingLocalSettings() {
    localStorage.setItem("gender", peopleData.gender);
    localStorage.setItem("activity", peopleData.activity);
}

function applyingLocalSettings(selector) {
    peopleData.gender = localStorage.getItem("gender") || "female";
    peopleData.activity = +localStorage.getItem("activity") || 1.375;

    const element = document.querySelectorAll(selector); 
    element.forEach(item => {
        if (item.getAttribute("data-Coefficient") == peopleData.activity) {
            item.classList.add("calculating__choose-item_active");
        }
        if (item.id == peopleData.gender) {
            item.classList.add("calculating__choose-item_active");
        }
    });
}
applyingLocalSettings(".calculating__choose_big .calculating__choose-item");
applyingLocalSettings("#gender .calculating__choose-item");

function calculationCalories({gender, height, weight, age, activity}) {
    let result;
    if (gender && height && weight && age && activity) {
        switch (gender) {
            case "female":
                result = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activity);
                break;
            case "male":
                result = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity);
                break;
        }
        document.querySelector(".calculating__result").innerHTML = `<span>${result}</span> ккал`; 
    } else {
        document.querySelector(".calculating__result").innerHTML = `Введите все данные`; 
    }
}