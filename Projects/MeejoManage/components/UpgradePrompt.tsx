
import React from 'react';
import { AlertIcon } from './Icons';

interface UpgradePromptProps {
  feature: string;
  requiredPack: string;
}

const UpgradePrompt: React.FC<UpgradePromptProps> = ({ feature, requiredPack }) => {
  return (
    <div className="flex items-center justify-center h-full min-h-[60vh] p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100 dark:border-gray-700">
        <div className="bg-orange-100 dark:bg-orange-900/30 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertIcon className="w-12 h-12 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Fonctionnalité Premium</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Le module <span className="font-bold">{feature}</span> nécessite le pack <span className="font-bold text-blue-600">{requiredPack}</span> ou supérieur.
        </p>
        <button 
            onClick={() => window.open('https://wa.me/221787935555', '_blank')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold shadow-lg transition transform hover:scale-105"
        >
          Mettre à niveau mon Pack
        </button>
      </div>
    </div>
  );
};

export default UpgradePrompt;
