const buttonColours = ['red', 'blue', 'yellow', 'green'];
let gamePattern = [];
let userPattern = [];
let level = 1;

$(document).keypress(function() {
    nextSequence();
});

$('.btn').click(function(e) {

    while ( userPattern.length < gamePattern.length ) {
        // Set variable to id of btn clicked
        let userChosenColour = e.target.id;
        // Add colour to userPattern
        userPattern.push(userChosenColour);

        if (userPattern.forEach(n => {
            if ( userPattern[n] != gamePattern[n] ) {
                // Game Over
                $('body').addClass('game-over');
                playSound('wrong');
    
                console.log(userPattern, gamePattern);
    
                gamePattern = [];
                userPattern = [];
                level = 1;
                $('#level-title').text('Press A Key to Start');
    
                return true;
            }
        })) {
            break;
        };
        

        playAnimation(userChosenColour);
        playSound(userChosenColour);

    }

    nextSequence();
})

function nextSequence () {
    // Set H1
    $('#level-title').text('Level ' + level);
    level += 1;
    // Generate random number for next button
    randomNum = Math.floor(Math.random() * 4);
    
    // Generate button from buttonColours array based on random number
    randomColour = buttonColours[randomNum];

    // Add random button to gamePattern array to keep track of button sequence
    gamePattern.push(randomColour);

    playAnimation(randomColour);
    playSound(randomColour);
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