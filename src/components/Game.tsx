
import React, { useEffect } from 'react';
import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';
import { useCardContext } from '@/context/CardContext';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Game = () => {
  const { resetGame, moves, matchedPairs, totalPairs, gameWon } = useCardContext();
  const { toast } = useToast();
  
  useEffect(() => {
    if (gameWon) {
      toast({
        title: "🎉 Congratulations!",
        description: `You won in ${moves} moves!`,
        duration: 5000,
      });
    }
  }, [gameWon, moves, toast]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <ScoreBoard />
      
      <GameBoard />
      
      <div className="mt-6 flex justify-center">
        <Button 
          onClick={resetGame} 
          variant="outline" 
          className="flex items-center gap-2 bg-indigo-800 text-white hover:bg-indigo-700 border-indigo-600"
        >
          <RefreshCw size={16} />
          New Game
        </Button>
      </div>
    </div>
  );
};

export default Game;
