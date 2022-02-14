import conso from './index';
import timerSet from './timerSet';
import calc from './calc';
import cards from './cards';
import modal from './modal';
import slider from './slider';
import tabs from './tabs';

window.addEventListener('DOMContentLoaded', function () {

    timerSet('2023-12-09');
    calc('.calculating__result span');
    cards(28.3);
    modal('[data-modal]', '.modal');
    slider('.offer__slider', ".offer__slider-next", '.offer__slider-prev', "#total", "#current", '.offer__slide', '.offer__slider-inner', ".offer__slider-wrapper");
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items');
conso.hello();


 console.log(conso);


})