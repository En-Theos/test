const { throws } = require("assert");

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

const deadline = "2021-07-13";
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

    function getZero(number) {
        if (number < 10) {
            return `0${number}`;
        } else {
            return number;
        }
    }
}
setTimer(deadline, timer);

// Модальное окно

const modal = document.querySelector(".modal");
const btnOpenModal = document.querySelectorAll("[data-modal]");
const timerOpenModal = setTimeout(codeShow, 60000);

function codeShow() {
    clearTimeout(timerOpenModal);
    modal.style.display = 'block';
    document.body.style.overflow = "hidden";
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

window.addEventListener('scroll', function scrollOpenModal ()  {
    const scrollFull = document.documentElement.scrollHeight - 1;
    const scrollDo = document.documentElement.clientHeight + document.documentElement.scrollTop;

    if (scrollFull <= scrollDo) {
        codeShow();
        window.removeEventListener('scroll', scrollOpenModal);
    }
});

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
