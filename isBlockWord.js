// PROBLEM
//
// Can you spell a word or not with the word blocks shown below? Write a function that 
// takes a word as argument and returns true or false.
//
// B:O   X:K   D:Q   C:P   N:A
// G:T   R:E   F:S   J:W   H:U
// V:I   L:Y   Z:M
//
// input: word
// output: boolean
//
// requirements:
// - case insensitivity
// - duplicate letters in argument word aren't spellable with blocks
// - if the pair of letters on a block both appear in the argument, that word isn't spellable
//
// mental model 1)
// If you use a block for a letter, you can't use the letter on the other side.
// So... for each letter in the argument word, check if the block's reverse side letter is 
// present in the word, and return false if it is. Also return false if a given letter occurs
// twice in the word.
//
// mental model 2)
// 'Blocks' are stored in an array, letters of the argument word are iterated over. For
// each letter, search for a block and remove it; if iteration is completed, return true. If there is 
// a letter for which a block can't be found, return false.
//
// mental model 3)
// Use regex to search for matches of the letters on a block. If there are more than one matches, 
// that word can't be spelled with the block.
//
// DATA STRUCTURES
// 1) object
// 2) array
// 3) array and regex
//
// 
// EXAMPLES
//
// isBlockWord('BATCH');      // true
// isBlockWord('BUTCH');      // false
// isBlockWord('jest');       // true
//
// DATA STRUCTURES
// 1) object
// 2) array
// 3) array and regex
//
// ALGORITHM
// object:
// 1) create blocks object; block letters are the key, value is boolean for if used or not
// 2) split word into letters
// 4) iterate over letters in word
// 5) for each letter, mark corresponding block as used (change value to true)
// 6) return true if iteration completes
//
// array:
// 1) create array of blocks
// 2) split word into letters (and upcase letters)
// 3) iterate over letters
// 4) iterate over blocks
// 5) remove corresponding block or return false if no block exists
// 6) return true
//
// regex:
// 1) create array of blocks
// 2) use map to create regex patterns
// 3) iterate over regex patterns
//    4) if number of matches is greater than 1, return false
// 5) return true
//
// CODE
// version 1
// function isBlockWord(word) {
//   const blocksUsed = {
//     'BO': false,
//     'XK': false,
//     'DQ': false,
//     'CP': false,
//     'NA': false,
//     'GT': false,
//     'RE': false,
//     'FS': false,   
//     'JW': false,   
//     'HU': false,
//     'VI': false,
//     'LY': false,
//     'ZM': false,
//   }
// 
//   const letters = word.split('').map(letter => letter.toUpperCase());
//   
//   for (let i = 0; i < letters.length; i += 1) {
//     for (const blockLetters in blocksUsed) {
//       if (blockLetters.match(letters[i])) {
//         if (blocksUsed[blockLetters] === true) {
//           return false;
//         } else {
//           blocksUsed[blockLetters] = true; 
//         }
//       }
//     } 
//   }
//   return true;
// }
//
// version 2
// function isBlockWord(word) {
//   const blocks = ['B:O', 'X:K', 'D:Q', 'C:P', 'N:A', 'G:T', 
//                   'R:E', 'F:S', 'J:W', 'H:U',' V:I', 'L:Y', 'Z:M'];
//   const letters = word.split('').map(letter => letter.toUpperCase());
//   for (let i = 0; i < letters.length; i += 1) {
//     let matchingBlock = blocks.filter(block => block.match(letters[i]))[0];
//     if (matchingBlock) {
//       blocks.splice(blocks.indexOf(matchingBlock), 1);
//     } else {
//       return false;
//     }
//   }
//   return true; 
// }
//
// version 3
function isBlockWord(word) {
  const blocks = ['B:O', 'X:K', 'D:Q', 'C:P', 'N:A', 'G:T', 
                   'R:E', 'F:S', 'J:W', 'H:U',' V:I', 'L:Y', 'Z:M'];
  const regexes = blocks.map(block => new RegExp(block.replace(':', '|'), 'gi'));
  return regexes.every(regex => (word.match(regex) || []).length < 2);
}
// TESTS
console.log(isBlockWord('BATCH') === true);
console.log(isBlockWord('batch') === true);
console.log(isBlockWord('BUTCH') === false);
console.log(isBlockWord('butch') === false);
console.log(isBlockWord('APPLE') === false);
console.log(isBlockWord('apple') === false);
console.log(isBlockWord('cat') === true);
console.log(isBlockWord('pact') === false);
