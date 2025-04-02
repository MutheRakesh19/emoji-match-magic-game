
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

// All emojis for the game
const emojis = [
  '🍆', '🌽', '🥕', '🍅', '🥒', '🍄', '🌶️', '🧄',
  '🍎', '🍌', '🍇', '🍉'
];

interface Card {
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface CardContextProps {
  cards: Card[];
  lockBoard: boolean;
  moves: number;
  matchedPairs: number;
  totalPairs: number;
  gameWon: boolean;
  flipCard: (index: number) => void;
  resetGame: () => void;
}

const CardContext = createContext<CardContextProps | undefined>(undefined);

// Shuffle function
const shuffleArray = (array: string[]): string[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const CardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [lockBoard, setLockBoard] = useState(false);
  const [firstCardIndex, setFirstCardIndex] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [totalPairs, setTotalPairs] = useState(8);
  const [gameWon, setGameWon] = useState(false);

  // Initialize game
  const initializeGame = useCallback((numPairs = 8) => {
    // Select random emojis based on number of pairs
    const selectedEmojis = emojis.slice(0, numPairs);
    
    // Create pairs and shuffle
    const shuffled = shuffleArray([...selectedEmojis, ...selectedEmojis]);
    
    const newCards = shuffled.map(emoji => ({
      emoji,
      isFlipped: false,
      isMatched: false
    }));
    
    setCards(newCards);
    setFirstCardIndex(null);
    setLockBoard(false);
    setMoves(0);
    setMatchedPairs(0);
    setTotalPairs(numPairs);
    setGameWon(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const flipCard = (index: number) => {
    // If card is already flipped or matched, do nothing
    if (cards[index].isFlipped || cards[index].isMatched) return;
    
    // Flip the card
    const updatedCards = [...cards];
    updatedCards[index] = { ...updatedCards[index], isFlipped: true };
    setCards(updatedCards);

    // First card flipped
    if (firstCardIndex === null) {
      setFirstCardIndex(index);
      return;
    }

    // Second card flipped
    setMoves(prev => prev + 1);
    setLockBoard(true);
    
    // Check for match
    const isMatch = cards[firstCardIndex].emoji === cards[index].emoji;
    
    if (isMatch) {
      // Mark cards as matched
      setTimeout(() => {
        const matchedCards = [...updatedCards];
        matchedCards[firstCardIndex as number] = { 
          ...matchedCards[firstCardIndex as number], 
          isMatched: true,
          isFlipped: false 
        };
        matchedCards[index] = { 
          ...matchedCards[index], 
          isMatched: true, 
          isFlipped: false 
        };
        
        setCards(matchedCards);
        setFirstCardIndex(null);
        setLockBoard(false);
        setMatchedPairs(prev => {
          const newValue = prev + 1;
          if (newValue === totalPairs) {
            setGameWon(true);
          }
          return newValue;
        });
      }, 600);
    } else {
      // Flip cards back
      setTimeout(() => {
        const unmatchedCards = [...updatedCards];
        unmatchedCards[firstCardIndex as number] = { 
          ...unmatchedCards[firstCardIndex as number], 
          isFlipped: false 
        };
        unmatchedCards[index] = { ...unmatchedCards[index], isFlipped: false };
        
        setCards(unmatchedCards);
        setFirstCardIndex(null);
        setLockBoard(false);
      }, 1000);
    }
  };

  const resetGame = () => {
    initializeGame();
  };

  const value = {
    cards,
    lockBoard,
    moves,
    matchedPairs,
    totalPairs,
    gameWon,
    flipCard,
    resetGame
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export const useCardContext = (): CardContextProps => {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error('useCardContext must be used within a CardProvider');
  }
  return context;
};
