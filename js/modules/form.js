export default function formFun() {
    const forms = document.querySelectorAll("form");
    const modal = document.querySelector(".modal");

    const message = {
        success: 'Успешно отправлено',
        load: 'img/spinner.svg',
        failed: 'Ошибка отправки'
    };

    async function postData(urlDB, header, body) {
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
                .then(() => {
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
}