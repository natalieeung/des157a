(function(){
    'use strict';
    console.log('reading js');

    let noun1 = "";
    let noun2 = "";
    let adverb = "";
    let adjective = "";

    let number1 = "";
    let container = "";
    let emotion = "";
    let shape = "";

    let number2 = "";
    let color = "";
    let noun3 = "";

    // Form 1 submission
    document.getElementById("next1").addEventListener("click", function (event) {
        event.preventDefault();
        noun1 = document.getElementById("noun1").value;
        noun2 = document.getElementById("noun2").value;
        adverb = document.getElementById("adverb").value;
        adjective = document.getElementById("adjective").value;

        document.getElementById("form1").style.display = "none";
        document.getElementById("form2").style.display = "block";
    });

    // Form 2 submission
    document.getElementById("next2").addEventListener("click", function (event) {
        event.preventDefault();
        number1 = document.getElementById("number1").value;
        container = document.getElementById("container").value;
        emotion = document.getElementById("emotion").value;
        shape = document.getElementById("shape").value;

        document.getElementById("form2").style.display = "none";
        document.getElementById("form3").style.display = "block";
    });

    // Form 3 submission
    document.getElementById("submit").addEventListener("click", function (event) {
        event.preventDefault();
        number2 = document.getElementById("number2").value;
        color = document.getElementById("color").value;
        noun3 = document.getElementById("noun3").value;

        // Updating the result section for unique elements  
        document.querySelector(".adverb-span").textContent = adverb;
        document.querySelector(".shape-span").textContent = shape;
        document.querySelector(".num2-span").textContent = number2;

        let noun1_list = document.querySelectorAll(".noun1-span");
        let noun2_list = document.querySelectorAll(".noun2-span");
        let adj_list = document.querySelectorAll(".adj-span");
        let num1_list = document.querySelectorAll(".num1-span");
        let container_list = document.querySelectorAll(".container-span");
        let emotion_list = document.querySelectorAll(".emotion-span");
        let color_list = document.querySelectorAll(".color-span");
        let noun3_list = document.querySelectorAll(".noun3-span");

        // Loop through and update the text of elements that share same classes
        noun1_list.forEach(space => space.textContent = noun1);
        noun2_list.forEach(space => space.textContent = noun2);
        adj_list.forEach(space => space.textContent = adjective);
        num1_list.forEach(space => space.textContent = number1);
        container_list.forEach(space => space.textContent = container);
        emotion_list.forEach(space => space.textContent = emotion);
        color_list.forEach(space => space.textContent = color);
        noun3_list.forEach(space => space.textContent = noun3);

        // Hide Form 3 and Title 1
        // Show Title 2 and Result
        document.getElementById("form3").style.display = "none";
        document.getElementById('title1').style.display = 'none';
        document.getElementById('title2').style.display = 'flex';
        document.getElementById("result").style.display = "block";  
    });

})();
