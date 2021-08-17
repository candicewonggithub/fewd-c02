const prompt = require('prompt-sync')({ sigint: true });
const Field = require('./Field');

// field game config
let fieldHeight = 4;
let fieldWidth = 4;
let userLevel = 1;
let holePctPerLevel = 10;

// randomly generate field
// Have the character start on a random location that’s not the upper-left corner.
let field = Field.generateField(fieldHeight, fieldWidth, holePctPerLevel * userLevel);

// print out player level and field grid
field.print();
console.log('Your level is ' + userLevel.toString() + "!");

// start game
let continueMoving = true;
while (continueMoving) {
    const direction = prompt('Which way?');
    continueMoving = field.move(direction);

    // stop moving when player
    // Wins by finding their hat
    // Loses by landing on (and falling in) a hole.
    // Attempts to move “outside” the field.    
    if (!continueMoving) {
        // upgrade player level if they successfully completed the game and print out the latest player level
        if (field.getGameState() === 'success') {
            ++userLevel;
            console.log('Your level is up to ' + userLevel.toString() + '!');
        } else
            console.log('Your level is still ' + userLevel.toString() + '!');

        // ask if player want to play again        
        let playAgain = prompt('Play Again(Y/N)?');
        playAgain = playAgain.toString().toUpperCase();

        // player want to play again
        if (playAgain === 'Y') {
            // Create a “hard mode” where one or more holes are added after certain turns.
            field = Field.generateField(fieldWidth, fieldWidth, Math.min(holePctPerLevel * userLevel, 80));
            field.print();
            continueMoving = true;
        }
        // player does not want to play again, exit the game
        else {
            console.dir('Game End!');
        }
    }
}
process.exit(1)