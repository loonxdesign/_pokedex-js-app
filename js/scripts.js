
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
        button.addEventListener('click', () => {
            showDetails(pokemon);
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
        let modalContainer = document.querySelector('#modal-container');
      
        // Clear all existing modal content
        modalContainer.innerHTML = '';
      
        let modal = document.createElement('div');
        modal.classList.add('modal');
      
        //Add Modal Content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
      
        let nameElement = document.createElement('h1');
        nameElement.innerText = pokemon.name;

        let imageElement = document.createElement('img');
        imageElement.src = pokemon.imageUrl;

        let heightElement = document.createElement('p');
        heightElement.innerText = 'HEIGHT: ' + pokemon.height;

        let typesElement = document.createElement('p');
        typesElement.innerText = 'TYPES: ' + pokemon.types.join(', ');

        let abilitiesElement = document.createElement('p');
        abilitiesElement.innerText = 'ABILITIES: ' + pokemon.abilities.join(', ');

      
        modal.appendChild(closeButtonElement);
        modal.appendChild(nameElement);
        modal.appendChild(imageElement);
        modal.appendChild(heightElement);
        modal.appendChild(typesElement);
        modal.appendChild(abilitiesElement);
        modalContainer.appendChild(modal);
      
        modalContainer.classList.add('is-visible');
        
        // Close Modal by clicking outside of the modal
        modalContainer.addEventListener('click', (e) => {
          // Since this is also triggered when clicking INSIDE the modal
          // We only want to close if the user clicks directly on the overlay
          let target = e.target;
          if (target === modalContainer) {
            hideModal();
          }
        });
    
    }

    // ClOSE MODAL
    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
      }
    
      window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
      });
    



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
