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
const btnOpenModal = document.querySelectorAll("[data-modal]"),
      btnCloseModal = document.querySelector("[data-close]");
//const timerOpenModal = setTimeout(codeShow, 5000);


function codeShow() {
    //clearTimeout(timerOpenModal);
    modal.style.display = 'block';
    document.body.style.overflow = "hidden";
}

function codeHiden() {
    modal.style.display = 'none';
    document.body.style.overflow = "";
}

btnOpenModal.forEach(btn => btn.addEventListener('click', codeShow));
btnCloseModal.addEventListener('click', codeHiden);

modal.addEventListener('click', (event) => {
    if (event.target && event.target == modal) {
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
    constructor(src, alt, title, descr, price) {
        this.src = src;
        this.alt = alt;
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
            <img src="${this.src}" alt="${this.alt}">
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

new CardMenu(
    "img/tabs/vegy.jpg", 
    "vegy", 
    'Меню "Фитнес"', 
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    229
).generatorCardMenu();

new CardMenu(
    "img/tabs/elite.jpg", 
    "elite", 
    'Меню “Премиум”', 
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    550
).generatorCardMenu();  
                            
new CardMenu(
    "img/tabs/post.jpg", 
    "post", 
    'Меню "Постное"', 
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
    430
).generatorCardMenu();

// Отправка данных форм

const forms = document.querySelectorAll("form");

const message = {
    success: 'Успешно отправлено',
    load: 'Загрузка',
    failed: 'Ошибка отправки'
};

forms.forEach(form => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const mesageBox = document.createElement("div");
        mesageBox.classList.add("messageText");
        mesageBox.textContent = message.load;
        form.append(mesageBox);

        const formData = new FormData(form);
        const postJSON = {};
        formData.forEach((value, key) => postJSON[key] = value);

        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(postJSON));

        request.addEventListener('load', () => {
            if (request.status == 200) {
                mesageBox.textContent = message.success;
                setTimeout(() => mesageBox.remove(), 2000);
                form.reset();
            } else {
                mesageBox.textContent = message.failed;
                setTimeout(() => mesageBox.remove(), 2000);
            }
        });
    });
});