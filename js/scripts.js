
let pokemonRepository = (function () {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'detailsUrl' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('pokemon is not correct');
        }
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('poke-button');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        // Call EventListener Function – Console Pokemon Object
        buttonEventListener(button, pokemon);
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    function buttonEventListener(button, pokemon) {
        // Event Listener for Button
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        buttonEventListener: buttonEventListener,
        loadList: loadList,
        loadDetails: loadDetails
    };

})();



pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon)
    });
});






// ----------------------- ARCHIVE EXERCISES -----------------------  
// Exercise 1.2
    /*
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
    */

        
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

  //PART 02
pokemonRepository.getAll().forEach(function (pokemon) {
    if (pokemon.height > 0.6) {
        document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ')' + '<span class="message">' + ' – Wow, that\'s big!' + '</span>' + '</p>');
    }

    else {
        document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ')' + '</p>');
    }
})

// Bonus Task
pokemonRepository.add({
    name: 'test',
    type: ['type01', 'type02'],
    species: 'new species',
    height: 0.5,
    abilities: ['a', 'b']
});
*/
