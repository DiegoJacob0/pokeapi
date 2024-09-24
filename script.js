document.getElementById('fetch-btn').addEventListener('click', fetchPokemon);

function fetchPokemon() {
    const pokemonName = document.getElementById('pokemon-name').value.toLowerCase();
    const pokemonImage = document.getElementById('pokemon-image');
    const pokemonTitle = document.getElementById('pokemon-title');
    const pokemonTypes = document.getElementById('pokemon-types');
    const pokemonAbilities = document.getElementById('pokemon-abilities');
    const pokemonWeight = document.getElementById('pokemon-weight');

    if (!pokemonName) {
        alert("Por favor, ingresa un nombre o ID de Pokémon");
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            return response.json();
        })
        .then(data => {
            pokemonTitle.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            pokemonTitle.style.display = 'block';
            
            pokemonImage.src = data.sprites.front_default;
            pokemonImage.style.display = 'block';

            const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
            pokemonTypes.textContent = `Tipo: ${types}`;
            pokemonTypes.style.display = 'block';

            const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');
            pokemonAbilities.textContent = `Habilidades: ${abilities}`;
            pokemonAbilities.style.display = 'block';

            pokemonWeight.textContent = `Peso: ${data.weight / 10} kg`;
            pokemonWeight.style.display = 'block';
        })
        .catch(error => {
            alert("Pokémon no encontrado. Inténtalo de nuevo.");
            pokemonTitle.style.display = 'none';
            pokemonImage.style.display = 'none';
            pokemonTypes.style.display = 'none';
            pokemonAbilities.style.display = 'none';
            pokemonWeight.style.display = 'none';
        });
}
