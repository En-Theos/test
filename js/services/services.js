export function codeShow(sel, ...rest) {
    const modal = document.querySelector(sel);

    clearTimeout(rest[0]);
    modal.style.display = 'block';
    document.body.style.overflow = "hidden";
    window.removeEventListener('scroll', rest[1]);
}

export function codeHiden(sel) {
    const modal = document.querySelector(sel);

    modal.style.display = 'none';
    document.body.style.overflow = "";
}

export function getZero(number) {
    if (number < 10) {
        return `0${number}`;
    } else {
        return number;
    }
}

export async function postData(urlDB, header, body) {
    const res = await fetch(urlDB, {
        method: "POST",
        headers: {
            "Content-type": header
        },
        body: body
    });

    return res.json();
}

export async function getDataDB(url) {
    const data = await fetch(url);

    if (!data.ok) {
        throw new Error(`Cloud not fetch  ${url}, status: ${data.status}`);
    }

    return data.json();
}