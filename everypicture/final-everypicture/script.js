window.addEventListener('load', function () {
    'use strict';
    console.log('reading JS');
    
    const sections = document.querySelectorAll('section');
    const body = document.querySelector('body');
    const div = document.querySelector('div');
    let sectionTops = [];
    let pagetop;
    let counter = 0;
    let prevCounter = 1;
    //let doneResizing

    sections.forEach(function (eachSection) {
        sectionTops.push(Math.floor(eachSection.getBoundingClientRect().top) + window.scrollY);
    });
    
    console.log(sectionTops);

    window.addEventListener('scroll', function () {
        pagetop = window.scrollY + 100;
        //console.log(pagetop);

        if (pagetop > sectionTops[counter]) {
            counter++;
            console.log(`scrolling down ${counter}`);
        }
        else if (counter > 1 && pagetop < sectionTops[counter - 1]) {
            counter--;
            console.log(`scrolling up ${counter}`);
        }
    
        if (counter != prevCounter) {
            // do stuff to the page here
            console.log(`do something for section ${counter}`);
            /* body.style.backdropFilter = "blur(0px)"; */

            const clarity = `bglens${counter}`;
            document.querySelector('body').className = clarity;

            prevCounter = counter;
        }

    
    });
    
    
});
