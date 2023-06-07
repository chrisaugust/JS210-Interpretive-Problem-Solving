// PROBLEM
// A bank of switches, numbered 1 to n, connects to a series of lights
// which are initially off. You make a series of passes, toggling the
// switches. On the first pass every switch is toggled. On the second
// pass, every switch in the sequence 2, 4, 6... is toggled, on the
// third pass the switches in the sequence 3, 6, 9... are toggled, etc.
//
// Write a program that takes an argument representing total number of
// switches and returns an array of the lights that are on after n passes.
//
// Implicit requirements:
// input: number of switches, which equals the number of passes
// output: array representing lights that are on
//
// Rules:
// - all lights are initially off
// - for nth round, every switch which is a multiple of n
// - the argument specifying number of switches also dictates
//   the number of rounds
// - program should return an array of numbers, which represent the
//   lights which are on after all the passes have been completed
//
// EXAMPLES
// lightsOn(5);        // [1, 4]
// Detailed result of each round for `5` lights
// Round 1: all lights are on
// Round 2: lights 2 and 4 are now off;     1, 3, and 5 are on
// Round 3: lights 2, 3, and 4 are now off; 1 and 5 are on
// Round 4: lights 2 and 3 are now off;     1, 4, and 5 are on
// Round 5: lights 2, 3, and 5 are now off; 1 and 4 are on
//
// lightsOn(100);      // [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
//
// DATA STRUCTURE
// Array of boolean values represent the state of the switches/lights
//
// ALGORITHM
// loop through passes 1 to n:
//   - each pass is represented by variable 'pass', toggle switches
//   which are multiples of 'pass'
//   - return new array (created by map) representing state of switches/
//     lights after the round of toggling
//
// filter lights array to return new array of indices for lights
// that are on (value of element is true)
//
// CODE

function lightsOn(numberOfLights) {
  const passes = numberOfLights;
  let lights = createBankOfLights(numberOfLights);

  for (let pass = 1; pass <= passes; pass += 1) {
    lights.forEach((_, idx) => {
      if ((idx + 1) % pass === 0) {
        lights[idx] = !lights[idx];
      }
    });
  }

  let lightsThatAreOn = [];
  lights.forEach((light, idx) => {
    if (light === true) {
      lightsThatAreOn.push(idx + 1);
    }
  });

  return lightsThatAreOn;
}

function createBankOfLights(numberOfLights) {
  let bankOfLights = [];
  for (let num = 1; num <= numberOfLights; num += 1) {
    bankOfLights.push(false);
  }
  return bankOfLights;
}

// TESTS
console.log(createBankOfLights(5).length === 5);
console.log(createBankOfLights(100).length === 100);
console.log(String(lightsOn(5)) === String([1, 4]));
console.log(String(lightsOn(100)) ===
  String([1, 4, 9, 16, 25, 36, 49, 64, 81, 100]));
