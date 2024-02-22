const buttonColours = ['red', 'blue', 'yellow', 'green'];
let gamePattern = [];
let userPattern = [];
let level = 1;
let gameActive = false;
let sequence = 0;

$(document).keypress(function() {
    // Only respond to the keypress if the game is not active
    if (!gameActive) {
        nextSequence();
        gameActive = true;
    }
});

$('.btn').click(function(e) {

    let pushedBtn = e.target.id;
    // Add the color of button to the userPattern array
    userPattern.push(pushedBtn);
    buttonPush(pushedBtn);
    // Verify that the user selections match the game's pattern.
    for (let i = 0; i < userPattern.length; i++) {
        if(userPattern[i] != gamePattern[i]){
            gameOver();
        }
    }
    // Verify that the selection sequence is over by comparing length of both arrays
    if (gameActive && (userPattern.length == gamePattern.length)) {
        setTimeout(function() {
            nextSequence();
        }, 200)
    }

})

function gameOver() {
    // Flash game-over style to body element
    $('body').addClass('game-over');
    setTimeout(function() {
        $('body').removeClass('game-over');
    }, 100)

    $('#level-title').text('Game Over, Press Any Key to Restart');
    // Reset game
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
