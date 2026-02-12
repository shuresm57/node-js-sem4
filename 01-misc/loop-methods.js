// .forEach .filter .reduce .map .sort .find .indexOf

// JavaScript rules - does not necessarily apply to other langs
// rule 1: use loop methods whenever possible
// rule 2: use map over forEach if you need the data afterwards
// rule 3: only use for loops in JavaScript for finger counting

// task: double the numbers

const numbers = [1, 2, 3, 4, 5];

// for(let i = 0; i < numbers.length; i++){
//     const multipliedNumbers = []
//     multipliedNumbers.push(numbers[i] * 2)
//     console.log(multipliedNumbers);
// }

// .map maps 1.1 to a new array

const doubledNumbers = numbers.map((number) => {
  return number * 2;
});
console.log(doubledNumbers);

const balloonAnimals = [
  { type: 'Koala', difficulty: 5.0 },
  { type: 'Dog', difficulty: 2.5 },
  { type: 'Giraffe', difficulty: 1.0, isTall: true },
];

// task: make all the difficulty levels 3.0 except for koala

const updatedBalloonAnimals = balloonAnimals.map((ballonAnimal) => {
  if (ballonAnimal.type !== 'Koala') {
    ballonAnimal.difficulty = 3.0;
  }
  return ballonAnimal;
});

console.log(updatedBalloonAnimals);

const oneLinerUpdatedBalloonAnimals = balloonAnimals.map((balloonAnimal) => ({
  difficulty: balloonAnimal.type !== 'Koala' ? 3.0 : balloonAnimal.difficulty,
  ...balloonAnimal,
}));

console.log(oneLinerUpdatedBalloonAnimals);

numbers.map((element, index, originalArray) =>
  console.log(element, index, originalArray)
);

// Practice these loop methods