
let pokemonRepository = (function () {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';


    function getAll() {
        return pokemonList;
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
        let pokemonList = $('.list-group');
        let listItem = $('<li></li>');
        listItem.addClass('list-group-item');
        let button = $('<button class="btn btn-primary" data-toggle="modal" data-target="#pokemonModal"></button>');
        button.innerText = pokemon.name;
        listItem.append(button);
        pokemonList.append(listItem); 
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
            item.types = [];
                for (var i = 0; i < details.types.length; i++) {
                    item.types.push(details.types[i].type.name);
                }
            item.abilities = [];
                for (var i = 0; i < details.abilities.length; i++) {
                    item.abilities.push(details.abilities[i].ability.name);
                }
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
            console.log(pokemon);
        });
    }


    //ADD SHOW MODAL FUNCTION
    function showModal(pokemon) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal.title');
        let modalHeader = $('.modal-header');
      
        // Clear all existing modal content
        modalTitle.empty();
        modalBody.empty();
      
        //Add Modal Content
        let nameElement = $('<h1>' + pokemon.name + '</h1>');

        let imageElement = $('<img class="modal-img" style="70%">');
        imageElement.src = pokemon.imageUrl;

        let heightElement = $('<p>' + 'HEIGHT: ' + pokemon.height + '</p>');

        let typesElement = $('<p>' + 'TYPES: ' + pokemon.types.join(', ') + '</p>');

        let abilitiesElement = $('<p>' + 'ABILITIES: ' + pokemon.abilities.join(', ') + '</p>');


        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);
      
        modalContainer.classList.add('is-visible');    
    }



    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
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
