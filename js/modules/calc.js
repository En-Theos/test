export default function calc() {
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

    function calculationCalories({ gender, height, weight, age, activity }) {
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
}

