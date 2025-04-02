
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCardContext } from '@/context/CardContext';
import { cn } from '@/lib/utils';

interface CardProps {
  index: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  onCardClick: (index: number) => void;
}

const Card = ({ index, emoji, isFlipped, isMatched, onCardClick }: CardProps) => {
  const [isRotated, setIsRotated] = useState(false);
  const { lockBoard } = useCardContext();

  useEffect(() => {
    setIsRotated(isFlipped || isMatched);
  }, [isFlipped, isMatched]);

  const handleClick = () => {
    if (!lockBoard && !isFlipped && !isMatched) {
      onCardClick(index);
    }
  };

  return (
    <div 
      className={cn(
        "relative h-24 sm:h-28 md:h-32 w-full perspective-1000 cursor-pointer",
        { "cursor-default": isMatched || lockBoard }
      )}
      onClick={handleClick}
    >
      <motion.div
        className="relative w-full h-full transition-transform duration-500 transform-style-3d"
        animate={{ rotateY: isRotated ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Card Front (Hidden) */}
        <div 
          className={cn(
            "absolute w-full h-full rounded-xl border-4 flex items-center justify-center text-2xl bg-gradient-to-br from-cyan-500 to-blue-600 border-cyan-300 backface-hidden",
            { "opacity-0": isRotated }
          )}
        >
          <span className="text-3xl">?</span>
        </div>

        {/* Card Back (Emoji) */}
        <div 
          className={cn(
            "absolute w-full h-full rounded-xl border-4 flex items-center justify-center text-4xl transform rotate-y-180 backface-hidden",
            isMatched 
              ? "bg-gradient-to-br from-green-400 to-green-600 border-green-300" 
              : "bg-gradient-to-br from-violet-400 to-indigo-600 border-indigo-300"
          )}
        >
          <span className="text-5xl">{emoji}</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
