import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Flashcard = ({ note }) => {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleCard = (cardId) => {
    setFlippedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 p-6">
      {note.flashcards[0]?.cards.map((card) => (
        <motion.div
          key={card.id}
          className="h-72 [perspective:1000px]"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 250 }}
        >
          <div
            className={`relative w-full h-full cursor-pointer transition-transform duration-700 [transform-style:preserve-3d] ${
              flippedCards[card.id] ? '[transform:rotateY(180deg)]' : ''
            }`}
            onClick={() => toggleCard(card.id)}
          >
            {/* Front of card */}
            <div className="absolute w-full h-full [backface-visibility:hidden] rounded-lg shadow-xl">
              <div className="w-full h-full bg-gradient-to-r from-[#E57106] to-[#FFA726] text-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center text-center border border-orange-300">
                <h3 className="font-bold text-xl leading-tight">
                  {card.front.content}
                </h3>
                <div className="mt-6 text-sm font-medium bg-white text-[#E57106] py-1 px-4 rounded-full">
                  Click to Flip
                </div>
              </div>
            </div>

            {/* Back of card */}
            <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-lg shadow-xl">
              <div className="w-full h-full bg-gradient-to-t from-orange-100 to-white text-gray-800 rounded-lg shadow-lg p-6 flex flex-col justify-center items-center text-center border border-orange-200">
                <p className="text-lg font-medium">{card.back.content}</p>
                <div className="mt-4 text-sm font-medium text-orange-600">
                  Flip to See Front
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Flashcard;