(function(){
    'use strict'
    console.log('reading JS');

    const startGame = document.querySelector('#startgame');
    const soundOff = document.querySelector('.sound');
    const soundOn = document.querySelector('.nosound');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game');
    const score = document.querySelector('#score');
    const p1Score = document.querySelector('#scores #player1 h4');
    const p2Score = document.querySelector('#scores #player2 h4');
    const actionArea = document.querySelector('#actions');
    const table = document.querySelector('.table');
    const tablep1 = document.querySelector('.tablep1');
    const tablep2 = document.querySelector('.tablep2');
    const p1Turn = document.querySelector('#player1 div');
    const p2Turn = document.querySelector('#player2 div');
    const clickSound = new Audio('sounds/Click.mp3');
    const rollSound = new Audio('sounds/Dice.mp3');

    const gameData = {
        dice: ['1die.png', '2die.png', '3die.png', 
               '4die.png', '5die.png', '6die.png'],
        players: ['Player 1', 'Player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    /* sound */
    let isMuted = false; // Track sound state

    /* sound */
    soundOff.addEventListener('click', function() {
        soundOff.style.display = "none";
        soundOn.style.display = "block";

        isMuted = true;
        clickSound.muted = true;
        rollSound.muted = true;
    });

    soundOn.addEventListener('click', function() {
        soundOff.style.display = "block";
        soundOn.style.display = "none";

        isMuted = false;
        clickSound.muted = false;
        rollSound.muted = false;
    });



    /* Slider */    
    const sliderContent = document.querySelector('.a');

    // How wide is the original set of images?
    const sliderWidth = sliderContent.offsetWidth;

    // clone the set of images and assign them the class name of '.b'
    const cloned = sliderContent.cloneNode(true);
    cloned.className = "b";

    // add the clone to the DOM
    document.querySelector('#slider').appendChild(cloned);

    //get the :root element
    let root = document.querySelector(':root');

    // set the end of the left position based on the width of the slider
    const endLeftPos = `-${sliderWidth}px`;    
    root.style.setProperty('--sliderwidth', endLeftPos);

    //Add the animate class to start animating the slider
    document.querySelector('#slider').classList.add("animate");

    
    startGame.addEventListener('click', function() {
        clickSound.play();
        gameControl.style.display = "none";

        //Randomly set the gameData.index here, which will choose the player
        gameData.index = Math.round(Math.random());
        console.log(gameData.index);

        document.querySelector('#quit').addEventListener('click', function(){
            clickSound.play();
            location.reload();
        })

        //console.log('set up the turn');
        setUpTurn();
    });

    function setUpTurn() {
        //console.log('set up the turn');
        gameControl
        game.innerHTML = `<h2 id="rollinst">Roll the dice for the ${gameData.players[gameData.index]}</h2>`; /*get player from game data here*/
        
        if (gameData.index === 0) {
            p1Turn.style.display = 'flex';
            p2Turn.style.display = 'none';
            tablep1.style.display = "block";
            tablep2.style.display = "none";
            table.style.display = "none";
        } else {
            p1Turn.style.display = 'none';
            p2Turn.style.display = 'flex';
            tablep1.style.display = "none";
            tablep2.style.display = "block";
            table.style.display = "none";
        }

        actionArea.innerHTML = '<button id="roll">Roll</button>';
        document.querySelector('#roll').addEventListener('click', function() {
            //console.log('Roll the dice!');
            rollSound.play();
            throwDice();
        });
    }

    function throwDice(){
        rollSound.play();
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1; // using cell could result in 0
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        //console.log(gameData.roll1);
        //console.log(gameData.roll2);
        game.innerHTML = `<p id="turntext">${gameData.players[gameData.index]
        } Turn</p>`; //Get Player
        
        game.innerHTML += `<div id="dicecell"><img src="images/${gameData.dice[gameData.roll1-1]}"> <img src="images/${gameData.dice[gameData.roll2-1]}"><div>`; //Get Dice Images
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        //if two 1's are rolled
        if (gameData.rollSum === 2){
            //console.log('snake eyes');
            game.innerHTML += '<p>Oh snap! Snake eyes!</p>';
             //zero out the score
            gameData.score[gameData.index] = 0;
            //switch player using ternary operator
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            //we will add showCurrentScore() function here...
            showCurrentScore();

            //Wait 2 seconds...
            setTimeout(setUpTurn, 3000);

        //if either die is a 1
        } else if (gameData.roll1 === 1 | gameData.roll2 === 1) {
            //console.log('one of the two dice rolled a 1');
            
            //switch player using ternary operator
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<p>You rolled a <strong>1, switching to ${gameData.players[gameData.index]}</p>`;
            
            setTimeout(setUpTurn, 3000);

        //if neither die is a 1...
        } else {
            //console.log('neither die was a 1, game continues...');
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = '<div id="playoptions"><button id="rollagain">Roll</button><button id="pass">Pass</button><div>';

            document.querySelector('#pass').addEventListener('click', function(){
                clickSound.play();
            });

            document.querySelector('#rollagain').addEventListener('click', function() {
                //setUpTurn(); //You can set up turn again, but you can also just throw dice again
                throwDice();
            });

            document.querySelector('#pass').addEventListener('click', function(){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });
            //checkWinningCondition function will be added here
            checkWinningCondition();
        }
    }


    function checkWinningCondition() {
        if (gameData.score[gameData.index] > gameData.gameEnd) { //current player score > game end points
            score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;

            actionArea.innerHTML = '';
            document.querySelector('#quit').innerHTML = 'Start a new game?';

        } else {
            //showCurrentScore() function will go here
            showCurrentScore();
        }
    }

    function showCurrentScore () {
        p1Score.innerHTML = `${gameData.score[0]}`;
        p2Score.innerHTML = `${gameData.score[1]}`;
    }

})();