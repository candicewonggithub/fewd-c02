let input = 'turpentine and turtles';
let vowels = ['a', 'e', 'i', 'o', 'u'];


let resultArray =[];

for (let i = 0; i < input.length; i++){
    console.log(`${i}: ${input[i]}`)

    for (let j = 0; j < vowels.length; j++){
        console.log(`${j}: ${vowels[j]}`)
        if (input[1]) == vowels[j] {
            resultArray.push(input[i])
            if (vowels[j] == 'u'){
                resultArray.push(vowels[j])
            } else if (vowels[j] == 'e'){
                resultArray.push(vowels[j])
            }
        }
    } 
}

resultArray = input.split('').filter( char => vowels.includes(char))

console.log(resultArray)


