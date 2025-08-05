import React, { useEffect, useState, useRef } from 'react';
import { usePokemon } from './hooks/usePokemon';
import PokemonCard from './components/PokemonCard';
import Collection from './components/Collection';
import Header from './components/Header';

const App = () => {
  const [collection, setCollection] = useState(() => {
    const stored = localStorage.getItem('myCollection');
    return stored ? JSON.parse(stored) : [];
  });

  const [showCollection, setShowCollection] = useState(false);
  const loadMoreRef = useRef(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemon();

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('myCollection', JSON.stringify(collection));
  }, [collection]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className="min-h-screen">
      <Header
        collectionCount={collection.length}
        showCollection={showCollection}
        setShowCollection={setShowCollection}
      />
      <div className='px-[8rem] py-[2rem] bg-indigo-400'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          {showCollection ? (
            <Collection collection={collection} setCollection={setCollection} />
          ) : (
            data?.pages.flat().map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                pokemon={pokemon}
                isInCollection={collection.some((p) => p.name === pokemon.name)}
                onAdd={() => setCollection([...collection, pokemon])}
                onRemove={() =>
                  setCollection(collection.filter((p) => p.name !== pokemon.name))
                }
              />
            ))
          )}
        </div>
        {!showCollection && (
          <div ref={loadMoreRef} className=" text-center text-sm text-white mt-[3rem] ">
            {isFetchingNextPage ? 'Loading more Pokemon...' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;