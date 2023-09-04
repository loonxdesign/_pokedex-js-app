
let pokemonRepository = (function () {



pokemonList = [
    {
        name: 'Bulbasaur',
        type: ['Grass', 'Poison'],
        species: 'Seed Pokémon',
        height: 0.7,
        abilities: ['Chlorophyll', 'Overgrow']
    },

    {
        name: 'Charmander',
        type: ['Fire'],
        species: 'Lizard Pokémon',
        height: 0.6,
        abilities: ['Blaze', 'Solar-Power']
    },

    {
        name: 'Squirtle',
        type: ['Water'],
        species: 'Young Turtle Pokémon',
        height: 0.5,
        abilities: ['Rain-Dish', 'Torrent']
    },

    {
        name: 'Pidgey',
        type: ['Flying', 'Normal'],
        species: 'Small Bird Pokémon',
        height: 0.3,
        abilities: ['Keen-Eye', 'Tangled-Feet', 'Big-Pecks']
    },

    {
        name: 'Pikachu',
        type: ['Electric'],
        species: 'Mouse Pokémon',
        height: 0.4,
        abilities: ['Static', 'Lightningrod']
    }
]

function getAll() {
    return pokemonList;
  }

function add(pokemon) {
    pokemonList.push(pokemon);
  }


return {
    add: add,
    getAll: getAll
  };

})();

//PART 02
pokemonRepository.getAll().forEach(function(pokemon){
    if (pokemon.height > 0.6) {
        document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ')' + '<span class="message">' + ' – Wow, that\'s big!' + '</span>' + '</p>');
    }

    else {
        document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ')'  + '</p>');
    }
  })

// How do I call the add-function correctly and add some value to pokemonList?
// document.write(pokemonRepository.add('fish'));

/*
// Exercise 1.5
// PART 01
pokemonList.forEach(function(pokemon){
    if (pokemon.height > 0.6) {
        document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ')' + '<span class="message">' + ' – Wow, that\'s big!' + '</span>' + '</p>');
    }

    else {
        document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ')'  + '</p>');
    }
  })
*/






// ----------------------- ARCHIVE EXERCISES -----------------------  
// Exercise 1.3
/*
for (let i = 0; i < pokemonList.length; i++) {
    let pokemonInfo = pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')'

    // if a pokemon's height is greater than 0.6 – add text
    if (pokemonList[i].height > 0.6) {
        document.write(pokemonInfo + '<span class="message">' + ' – Wow, that\'s big!' + '</span>');
    }

    else {
        document.write('<p>' + pokemonInfo + '</p>');
    }
} 
*/


// Exercise 1.4 
/*
function divide(dividend, divisor){
    if (divisor === 0){
        return 'You’re trying to divide by zero.';
    }
    else{
        let result = dividend/divisor;
        return result;
    }
}

document.write('<p>' + divide(4, 2) + '</p>');
document.write('<p>' + divide(7, 0) + '</p>');
document.write('<p>' + divide(1, 4) + '</p>');
document.write('<p>' + divide(12, -3) + '</p>');
*/
// TASK RESULT: https://replit.com/@loonxdesign/CalculatorTask-Result#script.js
