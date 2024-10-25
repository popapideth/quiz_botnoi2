import React, { useState } from 'react';
import axios from 'axios';

function PokemonApp() {
  const [pokemonList, setPokemonList] = useState([]);
  const [showAllDetails, setShowAllDetails] = useState(false); // State to control showing all details

  // Fetch Pokémon list with details for each Pokémon
  const fetchPokemonListWithDetails = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151');
      const pokemonList = response.data.results;

      // Fetch details for each Pokémon
      const promises = pokemonList.map((pokemon) => axios.get(pokemon.url));
      const pokemonDetailsList = await Promise.all(promises);

      // Extract details from each response
      const detailedPokemonList = pokemonDetailsList.map((pokemonDetail) => pokemonDetail.data);
      setPokemonList(detailedPokemonList);
      setShowAllDetails(true); // Show all details after fetching
    } catch (error) {
      console.error("Error fetching Pokémon list:", error);
    }
  };

  return (
    <div>
      <h1>API Pokemon</h1>
      <button onClick={fetchPokemonListWithDetails}>
        Show All Pokemon Details
      </button>

      {showAllDetails && (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
          {/* Pokemon Details */}
          {pokemonList.map((pokemon, index) => (
            <div
              key={index}
              style={{backgroundColor: '#8BC34A',padding: '10px',marginBottom: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center',width:'25%'}}   
            >
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                style={{ marginRight: '20px', width: '100px', height: '100px' }}
              />
              <div>
                <h3>Name: {pokemon.name.toUpperCase()}</h3>
                <p>Type 1: {pokemon.types[0].type.name}</p>
                {pokemon.types[1] && <p>Type 2: {pokemon.types[1].type.name}</p>}
                <p>HP: {pokemon.stats[0].base_stat}</p>
                <p>Attack: {pokemon.stats[1].base_stat}</p>
                <p>Defense: {pokemon.stats[2].base_stat}</p>
                <p>Special Attack: {pokemon.stats[3].base_stat}</p>
                <p>Special Defense: {pokemon.stats[4].base_stat}</p>
                <p>Speed: {pokemon.stats[5].base_stat}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PokemonApp;
