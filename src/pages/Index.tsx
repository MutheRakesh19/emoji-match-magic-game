
import React from 'react';
import Game from '@/components/Game';
import { CardProvider } from '@/context/CardContext';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center py-8 bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
      <h1 className="text-4xl font-bold mb-4 text-center px-4">Emoji Match Magic</h1>
      <p className="text-xl mb-8 text-center px-4">Match all the emoji pairs to win!</p>
      
      <CardProvider>
        <Game />
      </CardProvider>
      
      <footer className="mt-auto pt-8 pb-4 text-center text-sm text-indigo-200">
        <p>Created with ♥ | Find all the matching pairs to win!</p>
      </footer>
    </div>
  );
};

export default Index;
