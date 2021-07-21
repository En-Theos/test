export default function card(getDataDB) {
    const containerCardMenu = document.querySelector(".menu__field .container");

    class CardMenu {
        constructor({ img, altimg, title, descr, price }) {
            this.img = img;
            this.altimg = altimg;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.tranfer = 27;
            this.UAHConvert();
        }

        UAHConvert() {
            this.price *= this.tranfer;
        }

        generatorCardMenu() {
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

    getDataDB("http://localhost:3000/menu")
        .then((data) => {
            data.forEach((item) => new CardMenu(item).generatorCardMenu());
        });

}