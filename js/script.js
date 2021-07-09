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

const deadline = "2021-07-11";
const timer = document.querySelector('.timer');

function setTimer(endTime, parentTimer) {
    let restTime;

    const daysBox = parentTimer.querySelector("#days"),
          hoursBox = parentTimer.querySelector("#hours"),
          minutesBox = parentTimer.querySelector("#minutes"),
          secondsBox = parentTimer.querySelector("#seconds");
    
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

    const timerInterwal = setInterval(renewalTimer, 1000);
    if (restTime <= 0) {
        clearInterval(timerInterwal);
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