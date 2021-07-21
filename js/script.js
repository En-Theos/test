import calc from './modules/calc';
import card  from './modules/card';
import form  from './modules/form';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs  from './modules/tabs';
import timer from './modules/timer';
import {codeShow, codeHiden, getZero, postData, getDataDB} from './services/services';


window.addEventListener('DOMContentLoaded', () => {
    const timerOpenModal = setTimeout(codeShow, 60000);

    calc();
    card(getDataDB);
    form(codeShow, codeHiden, postData);
    modal(timerOpenModal, codeShow, codeHiden);
    slider(getZero);
    tabs();
    timer(getZero);
});