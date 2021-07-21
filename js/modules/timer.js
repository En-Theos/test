export default function timerFun(getZero) {
    const deadline = "2021-07-24";
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
}