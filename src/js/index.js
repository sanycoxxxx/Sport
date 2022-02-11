'use strict';

 const consol = 'hello';

function conso() {
    this.hello = function () {
console.log('hello');
    };
    this.goodbye = function () {
        console.log('goodbye');
    }
};

module.exports = conso;
