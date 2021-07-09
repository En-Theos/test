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