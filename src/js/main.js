'use strict';

window.addEventListener('DOMContentLoaded', function () {


    const conso = require('./index'),
        timerSet = require('./timerSet'),
        calc = require('./calc'),
        cards = require('./cards'),
        modal = require('./modal'),
        slider = require('./slider'),
        tabs = require('./tabs');

    timerSet();
    calc();
    cards();
    modal();
    slider();
    tabs();

})