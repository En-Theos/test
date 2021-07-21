import calc from './modules/calc';
import card  from './modules/card';
import form  from './modules/form';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs  from './modules/tabs';
import timer from './modules/timer';

window.addEventListener('DOMContentLoaded', () => {
    calc();
    card();
    form();
    modal();
    slider();
    tabs();
    timer();
});