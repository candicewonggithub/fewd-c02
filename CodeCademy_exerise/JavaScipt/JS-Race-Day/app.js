let raceNumber = Math.floor(Math.random() * 1000);

let earlyRegister = false;
let age = 18;

if (age > 18 && earlyRegister){
  raceNumber = raceNumber + 1000;
}

// if-else approach
if (age > 18 && earlyRegister){
  console.log(`${raceNumber}: Race start at 9:30am`)
} else if (age > 18 && !earlyRegister) {
  console.log(`${raceNumber}: Race start at 11:00am`)
} else if (age < 18) {
  console.log(`${raceNumber}: Race start at 12:30am`)
} else {
  console.log(`Please go to registration desk`)
}

// switch-case approach
switch ( (age < 18) ? 'child': 'adult' ) {
  case 'child':
    console.log(`${raceNumber}: Race start at 12:30am`)
  break;
  case 'adult':
    earlyRegister ? 
    (age > 18) && console.log(`${raceNumber}: Race start at 9:30am`) :
    (age > 18) && console.log(`${raceNumber}: Race start at 11:00am`);
    (age == 18) && console.log(`Please go to registration desk`)
  break;
}