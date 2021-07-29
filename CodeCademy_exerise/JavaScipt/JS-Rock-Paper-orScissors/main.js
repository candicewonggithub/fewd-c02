const getUserChoice = userInput => {
    userInput = userInput.toLowerCase();
    
    
    if (userInput === 'rock' || userInput === 'paper' || userInput === 'scissors' || userInput ==='bomb' ) {
      return userInput;
    } else {console.log('Error!');
    }
    }
    
    const getComputerChoice = () => {
      const randomNumber = Math.floor(Math.random() * 3);
    switch (randomNumber) {
     case 0:
        return 'rock';
     case 1:
       return 'paaper';
     case 2:
       return 'scissors';
     }
    };
    
    const determineWinner = (userChoice, computerChoice) => {
      if (userChoice === computerChoice){
        return 'THis game is a tie!';
    }
    if (userChoice === 'rock') {
      if (compterChoice === 'paper') {
        return "Sorry, computer won!";
        } else {
          return "Congratulations, you won";
    }
    }
    
    if (userChoice === 'paper') {
      if (computerChoice === 'scissors'){
        return "Sorry, computer won";
        } else {
          return "Congratulations, you won!"
        }
      }
      if (userChoice === 'scissors') {
        if (compterChoice === 'rock'){
          return "Sorry, compter won!";
        } else {
          return "Congratulations, you won!"
        }
    
      }
      if (userChoice === 'bomb') {
        return 'Congratulation, you won!'
      }
    };
    
    const playGame = () => {
     const userChoice = getUserChoice('paper');
     const computerChoice = getComputerChoice();
     console.log('You threw: ' + userChoice);
     console.log('The computer threw: ' + computerChoice);
     console.log(determineWinner(userChoice, computerChoice));
    };
    
    playGame()