'use strict';
'esversion: 6';

window.addEventListener('DOMContentLoaded', function () {
    // console.log("DOM succes loaded");

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContents = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContents.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i) {
        tabsContents[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    };
    hideTabContent();
    showTabContent(0);

    tabsParent.addEventListener('click', function (event) {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    const deadline = '2022-02-09';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor((t / (1000 * 60 * 60 * 24))),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60) % 24));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');


    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }



    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 5000000000);


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);



    // class MenuCard {
    //     constructor(src, alt, title, descr, price, parentId, ...classes) {
    //         this.src = src;
    //         this.alt = alt;
    //         this.title = title;
    //         this.descr = descr;
    //         this.price = price;
    //         this.classes = classes;
    //         this.parent = document.querySelector(parentId);
    //         this.transfer = 27;
    //         this.changeToUAH();
    //     }

    //     changeToUAH() {
    //         this.price = this.price * this.transfer;
    //     }

    //     render() {
    //         const element = document.createElement('div');

    //         if (this.classes.length === 0) {
    //             this.classes = "menu__item";
    //             element.classList.add(this.classes);
    //         } else {
    //             this.classes.forEach(className => element.classList.add(className));
    //         }

    //         element.innerHTML = `
    //         <img src=${this.src} alt=${this.alt}>
    //         <h3 class="menu__item-subtitle">${this.title}</h3>
    //         <div class="menu__item-descr">${this.descr}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
    //         </div>
    //     `;
    //         this.parent.append(element);
    //     }
    // }



    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postsData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
        console.log('ok');
        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                         display: block;
                         margin: 0 auto;`;
            form.insertAdjacentElement('afterend', statusMessage);


            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));



            postsData("http://localhost:3000/requests", json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
        });

        function showThanksModal(message) {
            const prevModalDialog = document.querySelector('.modal__dialog');
            prevModalDialog.classList.add('hide');
            openModal();
            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
                <div class="modal__content">
                      <div class="modal__close" data-close>&times;</div>
                      <div class="modal__title">${message} </div>
                 </div>`;

            document.querySelector('.modal').append(thanksModal);
            setTimeout(() => {
                thanksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                closeModal();
            }, 4000);
        }
    };

    const getResource = async (url) => {
        const res = await fetch(url);
        console.log('ok');
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };


    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    // getResource('http://localhost:3000/programs')
    //     .then(data => {
    //         data.forEach(({
    //             img,
    //             altimg,
    //             title,
    //             descr,
    //             price
    //         }) => {
    //             new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
    //         });
    //     });

    // getResource('http://localhost:3000/programs')
    // .then(data => {
    //     data.forEach(({img, alt, title, descr, price}) => {
    // new MenuCard(img, alt, title, descr, price, '#menu-container').render();
    //     });
    // });


    // getResource('http://localhost:3000/programs').then(data => console.log(data))
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({
    //         img,
    //         alt,
    //         title,
    //         descr,
    //         price
    //     }) => {

    //         const element = document.createElement('div');
    //         element.classList.add('menu_item');
    //         element.innerHTML = `
    //          <img src=${img} alt=${alt}>
    //              <h3 class="menu__item-subtitle">${title}</h3>
    //              <div class="menu__item-descr">${descr}</div>
    //              <div class="menu__item-divider"></div>
    //              <div class="menu__item-price">
    //              <div class="menu__item-cost">Цена:</div>
    //              <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //          </div>`;
    //         document.querySelector('.menu-container').append(element);
    //     });
    // };



    // fetch('http://localhost:3000/programs')
    //     .then(data => data.json())
    //     .then(res => console.log(res));

    axios.get("http://localhost:3000/programs")
        .then(data => {
            data.data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
            })
        });

    const next = document.querySelector(".offer__slider-next"),
        prev = document.querySelector('.offer__slider-prev'),
        slider = document.querySelector('.offer__slider'),
        total = document.querySelector("#total"),
        current = document.querySelector("#current"),
        sliderWrapper = document.querySelector(".offer__slider-wrapper"),
        img = document.querySelectorAll('.offer__slide'),
        slideField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slider).width;

    let slideIndex = 1;
    let offSet = 0;


    function dotOn() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function checkTotalIndex() {
        if (img.length < 10) {
            current.textContent = `0${slideIndex}`;

        } else {
            current.textContent = slideIndex;
        };

    };

    slideField.style.width = 100 * img.length + '%';
    slideField.style.display = 'flex';
    slideField.style.transition = '0.8s all';

    sliderWrapper.style.overflow = 'hidden';

    console.log(img.length);

    function text() {
        if (img.length < 10) {
            total.textContent = `0${img.length}`;
            current.textContent = `0${slideIndex}`;
        } else {
            total.textContent = img.length;
            current.textContent = slideIndex;
        };
    };

    text();

    img.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');

    slider.append(indicators);

    for (let i = 0; i < img.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', function () {
        if (offSet == +width.replace(/px/, '') * (img.length - 1)) {
            offSet = 0;
        } else {
            offSet += +width.replace(/px/, '');
        };

        slideField.style.transform = `translateX(-${offSet}px)`;

        if (slideIndex == img.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        };

        console.log(+width.replace(/px/, ''));

        checkTotalIndex();

        dotOn();
    });

    prev.addEventListener('click', function () {

        if (offSet == 0) {
            offSet = +width.replace(/px/, '') * (img.length - 1);
        } else {
            offSet -= +width.replace(/px/, '');
        };

        slideField.style.transform = `translateX(-${offSet}px)`;

        if (slideIndex == 1) {
            slideIndex = img.length;
        } else {
            slideIndex--;
        };

        checkTotalIndex();

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const target = e.target,
                slideTo = target.getAttribute('data-slide-to');

            slideIndex = slideTo;

            offSet = +width.replace(/px/, '') * (slideTo - 1);

            slideField.style.transform = `translateX(-${offSet}px)`;

            checkTotalIndex();

            dotOn();

        });
    });


    const result = document.querySelector('.calculating__result span');



    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    };

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = '1.375';
        localStorage.setItem('ratio', '1.375');
    };

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '...';
            return;
        };

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();



    function initLocalSetting(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });

    };

    initLocalSetting('#gender div', 'calculating__choose-item_active');
    initLocalSetting('.calculating__choose_big div', 'calculating__choose-item_active');

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    };

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';

            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');


function myModule() {
    this.hello = function () {
console.log('hello');
    };
    this.goodbye = function () {
        console.log('goodbye');
    }
}

module.exports = myModule;






    // showSlides(slideIndex);

    // function test () {
    //     if (img.length < 10) {
    //         total.textContent = (`0${+img.length}`);
    //     }else{total.textContent = img.length;
    //     };
    // };

    // function showSlides(n) {
    //     if (n > img.length) {
    //         slideIndex = 1;
    //     };
    //     if (n < 1) {
    //         slideIndex = img.length;
    //     };
    //     if (img.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     }else{current.textContent = slideIndex;
    //     };
    //     img.forEach(div => div.style.display = 'none');
    //     function show () {
    //         img[slideIndex - 1].classList.remove('display_none');
    //         img[slideIndex - 1].classList.add('display_block');
    //     };
    //     img[slideIndex - 1].style.display = 'block';
    //     current.textContent = `0${slideIndex}`;
    // };

    // function PlusSlides(n) {
    //     showSlides(slideIndex += n);
    // };
    // next.addEventListener('click', function(){
    //     PlusSlides(1);
    // });
    // prev.addEventListener('click', function(){
    //     PlusSlides(-1);
    // });




    // promise ES6


    //     console.log('Запрос данных');

    //     const req = new Promise(function (resolve, reject) {
    //         setTimeout(() => {
    //             console.log("Подготовка данных");

    //             const product = {
    //                 name: 'TV',
    //                 price: 2000
    //             };

    //             resolve(product);
    //         }, 2000);
    //     });

    //     req.then((product) => {
    //         return new Promise((resolve, reject) => {
    //             setTimeout(() => {
    //                 product.order = 'status';
    //                 resolve(product);
    //             }, 2000);
    //         }).then(data => {
    //             data.modify = true;
    //             return (data);
    //         }).then(data => {
    //             console.log(data);
    //         }).catch( () => {
    //             console.error('Произошла ошибка');
    //         }).finally(() => {
    // console.log('Finally');
    //         }, 2000);

    //     });




    // const test = time => {
    //     return new Promise(resolve => {
    //         setTimeout(() => resolve(), time);
    //     })
    // };
    // test(1000).then(() => console.log('1000 ms'));
    // test(2000).then(() => console.log('2000 ms'));

    // Promise.all([test(1000),  test(2000)]).then(()  => {
    // console.log('All');
    // });

    // Promise.race([test(1000), test(2000)]).then(() => {
    //     console.log('All');
    // });





    //     fetch('https://jsonplaceholder.typicode.com/posts', {
    // method: "POST",
    // body: JSON.stringify({name: 'Alexandr'}),
    // headers: {
    //     'content-type': 'application/json'
    // }
    //     })
    //         .then(response => response.json())
    //         .then(json => console.log(json));

    // const arr = [1, 5, 8, 1];
    // const res = arr.reduce((sum, current) => sum + current);
    // console.log(res);

});