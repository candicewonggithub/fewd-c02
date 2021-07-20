//Kelvin temperature is 293
const kelvin = 0;

//celsius is kelvin -273
const celsius = kelvin - 273;

//fahrenheit is celsius*(9/5)+32;
let fahrenheit = Math.floor(celsius*(9/5) + 32);

let newton = Math.floor(celsius * (33/100));

console.log(`The temperature is ${fahrenheit} degrees Fahrenheit.`);

console.log(`The temperature is ${newton} degrees newtown.`);




