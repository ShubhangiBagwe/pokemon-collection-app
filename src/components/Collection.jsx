import React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DraggableCard = ({ pokemon, index, moveCard }) => {
    const [, ref] = useDrag({ type: 'CARD', item: { index } });
    const [, drop] = useDrop({
        accept: 'CARD',
        hover: (item) => {
            if (item.index !== index) moveCard(item.index, index);
        },
    });
    return (
        <div
            ref={(node) => ref(drop(node))}
            className="flex items-center gap-4 p-3 bg-white rounded-xl shadow-md cursor-move"
        >
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-14 h-14" />
            <p className="capitalize font-semibold text-lg">{pokemon.name}</p>
        </div>

    );
};

const Collection = ({ collection, setCollection }) => {
    const moveCard = (from, to) => {
        const updated = [...collection];
        const [moved] = updated.splice(from, 1);
        updated.splice(to, 0, moved);
        setCollection(updated);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex flex-col gap-4">
                {collection.map((p, i) => (
                    <DraggableCard
                        key={p.name}
                        pokemon={p}
                        index={i}
                        moveCard={moveCard}
                    />
                ))}
            </div>

        </DndProvider>
    );
};

export default Collection;