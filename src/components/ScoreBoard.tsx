
import React from 'react';
import { useCardContext } from '@/context/CardContext';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

const ScoreBoard = () => {
  const { moves, matchedPairs, totalPairs, gameWon } = useCardContext();
  const progress = (matchedPairs / totalPairs) * 100;

  return (
    <div className="mb-6 p-4 rounded-lg bg-indigo-800/40 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-2">
        <div className="text-indigo-200">Moves: <span className="font-bold text-white">{moves}</span></div>
        <div className="text-indigo-200">
          Matches: <span className="font-bold text-white">{matchedPairs}/{totalPairs}</span>
        </div>
      </div>
      
      <div className="relative">
        <Progress value={progress} className="h-3 bg-indigo-950" />
        {gameWon && (
          <motion.div 
            className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-bold">COMPLETE! 🎉</span>
          </motion.div>
        )}
      </div>
      
      {gameWon && (
        <motion.div 
          className="mt-2 text-center text-green-300 font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          You matched all pairs in {moves} moves!
        </motion.div>
      )}
    </div>
  );
};

export default ScoreBoard;
