import React from 'react';

const PokemonCard = ({ pokemon, isInCollection, onAdd, onRemove }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 text-center relative border-t-4 border-orange-300">
      <div className="absolute top-2 right-2 ">
        {isInCollection ? (
          <button
            type='input'
            className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm"
            onClick={onRemove}
          >
            ×
          </button>
        ) : (
          <button
            className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm"
            onClick={onAdd}
          >
            +
          </button>
        )}
      </div>
      <div className="flex justify-center mb-2 ">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-20 h-20 bg-gradient-to-tl from-pink-500 to-pink-200 p-3 rounded-full" />
      </div>
      <h3 className="capitalize text-lg font-bold">{pokemon.name}</h3>
      <div className="flex justify-center gap-2 flex-wrap my-2">
        {pokemon.types.map(({ type }) => (
          <span
            key={type.name}
            className={`text-xs px-2 py-1 rounded-full font-semibold text-white ${{
              fire: 'bg-red-500',
              water: 'bg-blue-400',
              grass: 'bg-green-500',
              electric: 'bg-yellow-500 text-black',
              flying: 'bg-gray-400',
              poison: 'bg-purple-500',
              psychic: 'bg-pink-500',
              dragon: 'bg-green-700',
            }[type.name] || 'bg-gray-300'
              }`}
          >
            {type.name.toUpperCase()}
          </span>
        ))}
      </div>
      <div className="flex justify-between text-sm text-gray-700 mt-3">
        <p className='font-bold'>
          <span className="text-blue-500">{pokemon.stats[0].base_stat}</span>
          <h4>HP</h4>
        </p>
        <p className='font-bold'>
          <span className="text-blue-500">{pokemon.stats[1].base_stat}</span>
          <h4>Attack</h4>
        </p>
        <p className='font-bold'>
          <span className="text-blue-500">{pokemon.stats[2].base_stat}</span>
          <h4>Defense</h4>
        </p>
      </div>
    </div>
  );
};

export default PokemonCard;