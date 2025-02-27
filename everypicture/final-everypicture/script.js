window.addEventListener('load', function () {
    'use strict';
    console.log('reading JS');
    
    const sections = document.querySelectorAll('section');
    const body = document.querySelector('body');

    const glassesImagesIds = ['round-glasses', 'clear-glasses', 'sunglasses', 'rect-glasses'];


    let sectionTops = [];
    let pagetop;
    let counter = 0;
    let prevCounter = 1;

    // Calculate section tops for scroll tracking
    sections.forEach(function (eachSection) {
        sectionTops.push(Math.floor(eachSection.getBoundingClientRect().top) + window.scrollY);
    });
    
    console.log(sectionTops);

    window.addEventListener('scroll', function () {
        pagetop = window.scrollY + 500;

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

    function add_popup_listeners(image) {

        const glassImage = document.querySelector(`#${image}`);
        const popupBox = document.querySelector(`#popup-${image}`);
        const closeButton = popupBox.querySelector('.fa-x');

        glassImage.addEventListener('click', function() {
            console.log(`${image} clicked`);
            popupBox.style.display = 'block'; // Show the popup box
            body.style.overflow = 'hidden'; // Disable scrolling
        });

        closeButton.addEventListener('click', function() {
            console.log(`Close button clicked for #popup-${image}`);
            popupBox.style.display = 'none'; // Hide the popup box
            body.style.overflow = 'auto'; // Re-enable scrolling
        });

    }

    glassesImagesIds.forEach(function(image) {
        add_popup_listeners(image);
    });
    

    });

    
});
