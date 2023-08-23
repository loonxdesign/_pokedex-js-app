// Exercise 1.2

let pokemonList = [];
pokemonList = [
    {
        name: 'Bulbasaur',
        type: ['Grass', 'Poison'],
        species: 'Seed Pokémon',
        height: '0.7',
        abilities: ['Chlorophyll', 'Overgrow']
    },

    {
        name: 'Charmander',
        type: ['Fire'],
        species: 'Lizard Pokémon',
        height: '0.6',
        abilities: ['Blaze', 'Solar-Power']
    },

    {
        name: 'Squirtle',
        type: ['Water'],
        species: 'Young Turtle Pokémon',
        height: '0.5',
        abilities: ['Rain-Dish', 'Torrent']
    },

    {
        name: 'Pidgey',
        type: ['Flying', 'Normal'],
        species: 'Small Bird Pokémon',
        height: '0.3',
        abilities: ['Keen-Eye', 'Tangled-Feet', 'Big-Pecks']
    },

    {
        name: 'Pikachu',
        type: ['Electric'],
        species: 'Mouse Pokémon',
        height: '0.4',
        abilities: ['Static', 'Lightningrod']
    }
]

// Exercise 1.3

for (let i = 0;i < pokemonList.length; i++){
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + "<br><br>");
    // if a pokemon's height is greater than 0.6 – add text
    if (pokemonList[i].height >'0.6'){
        document.write(" – Wow, that\'s big!" + "<br><br>");
        }
    } 
    