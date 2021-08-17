const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const up = 'U';
const down = 'D';
const left = 'L';
const right = 'R';

module.exports = class Field {
    constructor(field = []) {
        // construct the field game according to the input
        this.field = field;
        this.fieldHeight = this.field.length;
        if (this.field.length > 0)
            this.fieldWidth = this.field[0].length;
        else
            this.fieldWidth = 0;

        //  get player start position  according to the input
        this.playerHPosition = -100;
        this.playerWPosition = -100;
        for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field[0].length; j++) {
                const fieldValue = field[i][j];
                if (fieldValue == pathCharacter) {
                    this.playerHPosition = i + 1;
                    this.playerWPosition = j + 1;
                    break;
                }
            }
        }

        this.gameState = 'pending';
    }

    // print out the field to console
    print() {
        console.clear();
        this.field.forEach(row => {
            let rowInfo = '';
            row.forEach(col => { rowInfo = rowInfo + col; });
            console.log(rowInfo);
        });
        console.log('\n');
    }

    // player input a direction and trigger a update to the field 
    move(direction) {
        direction = direction.toString().toUpperCase();
        // check if input is out of bounds
        if (!(direction === up || direction === down || direction === left || direction === right)) {
            console.log('Out of bounds instruction!');
            this.gameState = 'fail';
            return false;
        }

        // update player position in the field
        switch (direction) {
            case (up):
                this.playerHPosition--;
                break;
            case (down):
                this.playerHPosition++;
                break;
            case (left):
                this.playerWPosition--;
                break;
            case (right):
                this.playerWPosition++;
                break;
        }

        // check if player move outside the field
        if (this.playerHPosition > this.fieldHeight || this.playerHPosition < 1 || this.playerWPosition > this.fieldWidth || this.playerWPosition < 1) {
            console.log('Sorry, you move outside the field!');
            this.gameState = 'fail';
            return false;
        }

        const userLocationValue = this.field[this.playerHPosition - 1][this.playerWPosition - 1];
        // player move to the next path charactor, keep moving
        if (userLocationValue === fieldCharacter) {
            this.field[this.playerHPosition - 1][this.playerWPosition - 1] = pathCharacter;
            this.print();
            this.gameState = 'moving';
            return true;

        }
        // player fall down to a hole, failed and stop
        else if (userLocationValue === hole) {
            this.print();
            console.log('Sorry, you fell down a hole!');
            this.gameState = 'fail';
            return false;
        }
        // player move back to previous path charactor, failed and stop
        else if (userLocationValue === pathCharacter) {
            this.print();
            console.log('Sorry, cannot move back!');
            this.gameState = 'fail';
            return false;
        }
        // player find the hat, succeeded and stop
        else if (userLocationValue === hat) {
            this.print();
            console.log('Congrats, you find the hat!');
            this.gameState = 'success';
            return false;
        }
    }

    // get the latest game state
    getGameState() {
        return this.gameState;
    }

    // generate a field randomly according to settings
    static generateField(height, width, holePct) {
        if (holePct < 0 || holePct > 100)
            console.log('Sorry, percentage should be within 0 and 100!');

        // fill whole field with field character '░'
        let fieldGenerated = [];
        for (let h = 0; h < height; h++) {
            let rowField = [];
            for (let w = 0; w < width; w++) {
                rowField.push(fieldCharacter);
            }
            fieldGenerated.push(rowField);
        }

        // randomly fill the player start position('*') to the field
        const playerHPosition = this.getRandomPos(1, height);
        const playerWPosition = this.getRandomPos(1, width);
        fieldGenerated[playerHPosition - 1][playerWPosition - 1] = pathCharacter;

        // randomly fill hat('^') to the field
        let filledHat = false;
        while (!filledHat) {
            const hatHPosition = this.getRandomPos(1, height);
            const hatWPosition = this.getRandomPos(1, width);
            let fieldValue = fieldGenerated[hatHPosition - 1][hatWPosition - 1];
            // fill the '^' only when the field position is a field character '░'
            if (fieldValue == fieldCharacter) {
                fieldGenerated[hatHPosition - 1][hatWPosition - 1] = hat;
                filledHat = true;
            }
        }

        // randomly fill hole('O') according to the hole coverage percentage
        const noOfHoles = Math.round(height * width * (holePct / 100));
        let filledHoles = 0;
        while (filledHoles < noOfHoles) {
            const holeHPosition = this.getRandomPos(1, height);
            const holeWPosition = this.getRandomPos(1, width);
            let fieldValue = fieldGenerated[holeHPosition - 1][holeWPosition - 1];
            if (fieldValue == fieldCharacter) {
                fieldGenerated[holeHPosition - 1][holeWPosition - 1] = hole;
                filledHoles++;
            }
        }

        return new Field(fieldGenerated);
    }

    // randomly generate a field position within the field length and width
    static getRandomPos(from, to) {
        return Math.floor(Math.random() * (to - from + 1)) + from;
    }
}




