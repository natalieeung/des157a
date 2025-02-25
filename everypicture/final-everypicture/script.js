window.addEventListener('load', function () {
    'use strict';
    console.log('reading JS');
    
    const sections = document.querySelectorAll('section');
    const body = document.querySelector('body');
    const glasses = document.querySelectorAll('section img');
    const popup = document.querySelectorAll('.popup');
    let sectionTops = [];
    let pagetop;
    let counter = 0;
    let prevCounter = 1;

    // Calculate section tops for scroll tracking
    sections.forEach(function (eachSection) {
        sectionTops.push(Math.floor(eachSection.getBoundingClientRect().top) + window.scrollY);
    });
    
    console.log(sectionTops);

    // Scroll event handler
    window.addEventListener('scroll', function () {
        pagetop = window.scrollY + 100;

        if (pagetop > sectionTops[counter]) {
            counter++;
            console.log(`scrolling down ${counter}`);
        } else if (counter > 1 && pagetop < sectionTops[counter - 1]) {
            counter--;
            console.log(`scrolling up ${counter}`);
        }

        if (counter !== prevCounter) {
            const clarity = `bglens${counter}`;
            body.className = clarity;

            prevCounter = counter;
        }
    });

    glasses.forEach((glass, index) => {
        glass.addEventListener('click', function () {
            console.log(`Image ${index} clicked`);
            if (popups[index]) {
                popups[index].style.display = 'block';
            }
        });
    });
});
