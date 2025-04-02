
import React from 'react';
import Card from './Card';
import { useCardContext } from '@/context/CardContext';
import { motion } from 'framer-motion';

const GameBoard = () => {
  const { cards, flipCard } = useCardContext();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const item = {
    hidden: { scale: 0.8, opacity: 0 },
    show: { scale: 1, opacity: 1 }
  };

  return (
    <motion.div 
      className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl bg-indigo-800/40 backdrop-blur-sm"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {cards.map((card, index) => (
        <motion.div key={index} variants={item}>
          <Card
            index={index}
            emoji={card.emoji}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onCardClick={flipCard}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default GameBoard;
