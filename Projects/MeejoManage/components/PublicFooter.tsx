
import React from 'react';
import { LogoIcon, FacebookIcon, InstagramIcon, TikTokIcon } from './Icons';

const PublicFooter: React.FC = () => {
  const navigate = (hash: string) => {
    window.location.hash = hash;
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-slate-800 relative z-10 font-sans">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div>
                    <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigate('#')}>
                        <LogoIcon className="w-6 h-6 text-blue-500" />
                        <span className="font-bold text-xl">Meejo</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        La solution tout-en-un pour les commerçants visionnaires. Gérez, vendez et grandissez avec Meejo.
                    </p>
                    <div className="flex gap-4 mt-6">
                        <div className="p-2 bg-white/5 rounded-full hover:bg-white/10 cursor-pointer transition">
                            <FacebookIcon className="w-4 h-4 text-gray-400 hover:text-white" />
                        </div>
                        <div className="p-2 bg-white/5 rounded-full hover:bg-white/10 cursor-pointer transition">
                            <InstagramIcon className="w-4 h-4 text-gray-400 hover:text-white" />
                        </div>
                        <div className="p-2 bg-white/5 rounded-full hover:bg-white/10 cursor-pointer transition">
                            <TikTokIcon className="w-4 h-4 text-gray-400 hover:text-white" />
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-6">Produit</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li onClick={() => navigate('#create-account')} className="hover:text-white cursor-pointer transition">Fonctionnalités</li>
                        <li onClick={() => navigate('#create-account')} className="hover:text-white cursor-pointer transition">Tarifs</li>
                        <li onClick={() => navigate('#mall')} className="hover:text-white cursor-pointer transition">Marché en ligne</li>
                        <li onClick={() => navigate('#calculator')} className="hover:text-white cursor-pointer transition">Calculateur CBM</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-6">Entreprise</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li onClick={() => navigate('#services')} className="hover:text-white cursor-pointer transition">Services Digital</li>
                        <li onClick={() => navigate('#')} className="hover:text-white cursor-pointer transition">À propos</li>
                        <li onClick={() => navigate('#')} className="hover:text-white cursor-pointer transition">Blog</li>
                        <li onClick={() => navigate('#')} className="hover:text-white cursor-pointer transition">Contact</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-6">Légal</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li className="hover:text-white cursor-pointer transition">Conditions d'utilisation</li>
                        <li className="hover:text-white cursor-pointer transition">Politique de confidentialité</li>
                        <li className="hover:text-white cursor-pointer transition">Mentions légales</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4">
                <p>&copy; {new Date().getFullYear()} Meejo Manage. Tous droits réservés.</p>
                <p>Fait avec ❤️ à Dakar, Sénégal.</p>
            </div>
        </div>
    </footer>
  );
};

export default PublicFooter;
