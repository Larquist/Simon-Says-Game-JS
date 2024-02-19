const buttonColours = ['red', 'blue', 'yellow', 'green'];
let gamePattern = [];
let userPattern = [];
let level = 1;
let gameActive = false;
let sequence = 0;

$(document).keypress(function() {
    if (!gameActive) {
        nextSequence();
        gameActive = true;
    }
});

$('.btn').click(function(e) {

    let pushedBtn = e.target.id;
    userPattern.push(pushedBtn);

    buttonPush(pushedBtn);


    for (let i = 0; i < userPattern.length; i++) {
        if(userPattern[i] != gamePattern[i]){
            gameOver();
        }
    }
    
    if (gameActive && (userPattern.length == gamePattern.length)) {
        setTimeout(function() {
            console.log(gameActive && userPattern.length == gamePattern.length)
            nextSequence();
        }, 200)
    }

})

function gameOver() {
    console.log(userPattern[userPattern.length - 1], gamePattern[userPattern.length - 1], userPattern[userPattern.length - 1] != gamePattern[userPattern.length - 1]);
    $('body').addClass('game-over');
    setTimeout(function() {
        $('body').removeClass('game-over');
    }, 100)

    $('#level-title').text('Game Over, Press Any Key to Restart');
    gamePattern = [];
    userPattern = [];
    gameActive = false;
    level = 1;
}

function nextSequence () {
    gameActive = true;
    // Set H1
    $('#level-title').text('Level ' + level);
    level += 1;
    // Generate random number for next button
    randomNum = Math.floor(Math.random() * 4);
    
    // Generate button from buttonColours array based on random number
    randomColour = buttonColours[randomNum];

    // Add random button to gamePattern array to keep track of button sequence
    gamePattern.push(randomColour);

    buttonPush(randomColour);
    userPattern = [];
}

function buttonPush(colour) {
    playSound(colour);
    playAnimation(colour);
}

function playSound(colour) {
    // Button sound play
    var audio = new Audio('./sounds/' + colour + '.mp3');
    audio.play();
}

function playAnimation (colour) {
    $('#' + colour).addClass('pressed');
    setTimeout(function() {
        $('#' + colour).removeClass('pressed');
    }, 100)
}