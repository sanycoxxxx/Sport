'use strict';

function slider(sliderSelector, nextArrow, prevArrow, totalSelector, currentSelector, imgSlide, slide_field, slider_wraper) {
    const next = document.querySelector(nextArrow),
        prev = document.querySelector(prevArrow),
        slider = document.querySelector(sliderSelector),
        total = document.querySelector(totalSelector),
        current = document.querySelector(currentSelector),
        sliderWrapper = document.querySelector(slider_wraper),
        img = document.querySelectorAll(imgSlide),
        slideField = document.querySelector(slide_field),
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


};

export default slider;