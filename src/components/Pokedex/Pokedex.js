import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pokedex.css';

function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then((response) => {
        setPokemonList(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handlePokemonClick = (pokemon) => {
    axios.get(pokemon.url)
      .then((response) => {
        setSelectedPokemon(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="Pokedex">
      <header className="Pokedex-header">
        <h1>Pokedex</h1>
      </header>
      <div className="pokemon-list">

        
        {pokemonList.map((pokemon) => (
          <div key={pokemon.name} className="pokemon-item" onClick={() => handlePokemonClick(pokemon)}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} alt={pokemon.name} />
            <div className="pokemon-name">{pokemon.name}</div>
          </div>
        ))}
      </div>
      {selectedPokemon && (
        <div className="pokemon-details">
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`} alt={selectedPokemon.name} />
          <h2>{selectedPokemon.name}</h2>
          <div className="pokemon-moves">
            <h3>Moves:</h3>
            <ul>
              {selectedPokemon.moves.map((move) => (
                <li key={move.move.name}>{move.move.name}</li>
              ))}
            </ul>
          </div>
          <div className="pokemon-evolutions">
            <h3>Evolutions:</h3>
            <p>Coming soon!</p>
          </div>
          <div className="pokemon-items">
            <h3>Held Items:</h3>
            <ul>
              {selectedPokemon.held_items.length > 0 ? (
                selectedPokemon.held_items.map((item) => (
                  <li key={item.item.name}>{item.item.name}</li>
                ))
              ) : (
                <li>None</li>
              )}
            </ul>
          </div>
          <div className="pokemon-stats">
            <h3>Stats:</h3>
            <table>
              <tbody>
                {selectedPokemon.stats.map((stat) => (
                  <tr key={stat.stat.name}>
                    <td>{stat.stat.name}</td>
                    <td>{stat.base_stat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      </div>
  
  );
}

export default Pokedex;
