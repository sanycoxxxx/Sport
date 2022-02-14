'use strict';

function tabs(tab, tab_content, tab_parent) {
    const tabs = document.querySelectorAll(tab),
        tabsContents = document.querySelectorAll(tab_content),
        tabsParent = document.querySelector(tab_parent);

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

};

export default tabs;