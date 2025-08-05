import React from 'react';

const Header = ({ collectionCount, showCollection, setShowCollection }) => {
  return (
    <header className="text-center my-6">
      <h1 className="text-3xl font-bold">🔥 Pokemon Collection App</h1>
      <p className="text-gray-700 mb-4">Discover, collect, and organize your favorite Pokemon!</p>
      <div className="flex justify-center gap-4">
        <button
          className={`px-4 py-2 rounded-full font-medium ${!showCollection ? 'bg-purple-800 text-white' : 'bg-white border'
            }`}
          onClick={() => setShowCollection(false)}
        >
          🔍 Discover Pokemon
        </button>
        <button
          className={`px-4 py-2 rounded-full font-medium ${showCollection ? 'bg-indigo-400 text-white' : 'bg-white border'
            }`}
          onClick={() => setShowCollection(true)}
        >
           My Collection ({collectionCount})
        </button>
      </div>
    </header>

  );
};

export default Header;