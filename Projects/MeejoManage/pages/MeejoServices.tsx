
import React from 'react';
import { CodeIcon, UsersIcon, SearchCheckIcon, MegaphoneIcon, SparklesIcon } from '../components/Icons';
import PublicFooter from '../components/PublicFooter';

const MeejoServices: React.FC = () => {
  
  const handleSiteWebContact = () => {
    const email = "contact@meejomanage.com";
    const subject = "Demande de Devis - Création Site Web";
    const body = `Bonjour l'équipe Meejo Manage,\n\nJe souhaite obtenir un devis pour la création d'un site web.\n\nType de site: [Vitrine / E-commerce / Blog / Sur-mesure]\nNombre de pages estimé: [...]\nFonctionnalités souhaitées: [...]\nBudget approximatif: [...]\nDélai souhaité: [...]\n\nMes coordonnées:\nNom/Entreprise: [...]\nTéléphone: [...]\nEmail: [...]\n\nMerci de me recontacter rapidement.\n\nCordialement`;
    
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleCommunityContact = () => {
    const email = "contact@meejomanage.com";
    const subject = "Demande - Community Management";
    const body = `Bonjour,\n\nJe souhaite des informations sur vos packs de Community Management.\n\nRéseaux à gérer: [Facebook / Instagram / TikTok / LinkedIn]\nFréquence de publication souhaitée: [...]\nObjectifs: [Notoriété / Ventes / Engagement]\n\nCoordonnées:\nNom: [...]\nTéléphone: [...]\n\nMerci`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSeoContact = () => {
    const email = "contact@meejomanage.com";
    const subject = "Demande - SEO & Référencement";
    const body = `Bonjour,\n\nJe souhaite améliorer la visibilité de mon activité sur Google.\n\nSite actuel (si existant): [...]\nZone géographique ciblée: [...]\n\nCoordonnées:\nNom: [...]\nTéléphone: [...]\n\nMerci`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleAdsContact = () => {
    const email = "contact@meejomanage.com";
    const subject = "Demande - Campagne Publicitaire (Ads)";
    const body = `Bonjour,\n\nJe souhaite lancer une campagne publicitaire.\n\nPlateforme: [Facebook / Instagram / Google / TikTok]\nBudget mensuel envisagé: [...]\nProduit/Service à promouvoir: [...]\n\nCoordonnées:\nNom: [...]\nTéléphone: [...]\n\nMerci`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleFormationContact = () => {
    const email = "contact@meejomanage.com";
    const subject = "Demande d'Information - Formation";
    const body = `Bonjour,\n\nJe souhaite en savoir plus sur vos formations.\n\nFormation souhaitée: [Web Development / Design / Marketing Digital / Logiciels Professionnels / Autre]\nNiveau actuel: [Débutant / Intermédiaire / Avancé]\nFormat préféré: [Présentiel / En ligne / Hybride]\nNombre de participants: [...]\nBudget: [...]\n\nCoordonnées:\n[...]\n\nMerci`;
    
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <div className="flex-grow pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 font-heading mb-4">Meejo Digital Services</h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Propulsez votre marque avec notre expertise technique et marketing. 
              Des solutions sur mesure pour les entrepreneurs ambitieux.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-start hover:shadow-2xl transition duration-300">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <CodeIcon />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-4 font-heading">Site Web & E-commerce</h2>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Offrez à vos clients une expérience d'achat professionnelle avec un site web moderne, rapide et optimisé pour le mobile.
              </p>
              <ul className="space-y-3 mb-8 text-sm text-slate-500 flex-grow">
                <li className="flex items-center gap-2"><span className="text-blue-500">●</span> Design unique et responsive</li>
                <li className="flex items-center gap-2"><span className="text-blue-500">●</span> Paiements (Wave, OM)</li>
              </ul>
              <button 
                onClick={handleSiteWebContact} 
                className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition text-sm active:scale-95"
              >
                Demander un devis
              </button>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-start hover:shadow-2xl transition duration-300">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <UsersIcon />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-4 font-heading">Community Management</h2>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Nous créons du contenu engageant, répondons aux messages et faisons grandir votre communauté sur les réseaux.
              </p>
              <ul className="space-y-3 mb-8 text-sm text-slate-500 flex-grow">
                <li className="flex items-center gap-2"><span className="text-purple-500">●</span> Visuels attractifs</li>
                <li className="flex items-center gap-2"><span className="text-purple-500">●</span> TikTok, Instagram, FB</li>
                <li className="flex items-center gap-2"><span className="text-purple-500">●</span> Gestion réputation</li>
              </ul>
              <button 
                onClick={handleCommunityContact} 
                className="w-full px-6 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition text-sm active:scale-95"
              >
                Voir nos packs
              </button>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-start hover:shadow-2xl transition duration-300">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <SearchCheckIcon />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-4 font-heading">SEO & Référencement</h2>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Soyez visible quand vos clients vous cherchent sur Google. Nous optimisons votre présence locale.
              </p>
              <ul className="space-y-3 mb-8 text-sm text-slate-500 flex-grow">
                <li className="flex items-center gap-2"><span className="text-orange-500">●</span> Fiche Google Business</li>
                <li className="flex items-center gap-2"><span className="text-orange-500">●</span> Contenu SEO</li>
                <li className="flex items-center gap-2"><span className="text-orange-500">●</span> Audit technique</li>
              </ul>
              <button 
                onClick={handleSeoContact} 
                className="w-full px-6 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition text-sm active:scale-95"
              >
                Booster ma visibilité
              </button>
            </div>

            {/* Service 4 */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-start hover:shadow-2xl transition duration-300">
              <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mb-6">
                <MegaphoneIcon />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-4 font-heading">Publicité (Ads)</h2>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Accélérez vos ventes avec des campagnes ciblées. Nous gérons votre budget pour un ROI maximal.
              </p>
              <ul className="space-y-3 mb-8 text-sm text-slate-500 flex-grow">
                <li className="flex items-center gap-2"><span className="text-pink-500">●</span> Facebook & Instagram Ads</li>
                <li className="flex items-center gap-2"><span className="text-pink-500">●</span> Google Ads</li>
                <li className="flex items-center gap-2"><span className="text-pink-500">●</span> Reporting conversions</li>
              </ul>
              <button 
                onClick={handleAdsContact} 
                className="w-full px-6 py-3 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-700 transition text-sm active:scale-95"
              >
                Lancer une campagne
              </button>
            </div>

            {/* Service 5 - NEW FORMATION CARD */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-start hover:shadow-2xl transition duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-xl">Nouveau</div>
              <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mb-6">
                <SparklesIcon />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-4 font-heading">Formations & Coaching</h2>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Montez en compétence. Nous formons vos équipes sur les outils numériques essentiels à votre activité.
              </p>
              <ul className="space-y-3 mb-8 text-sm text-slate-500 flex-grow">
                <li className="flex items-center gap-2"><span className="text-yellow-500">●</span> Logiciels Professionnels</li>
                <li className="flex items-center gap-2"><span className="text-yellow-500">●</span> Maîtrise de Meejo Manage</li>
                <li className="flex items-center gap-2"><span className="text-yellow-500">●</span> Bureautique & IA</li>
              </ul>
              <button 
                onClick={handleFormationContact} 
                className="w-full px-6 py-3 bg-yellow-500 text-white font-bold rounded-xl hover:bg-yellow-600 transition text-sm shadow-yellow-200 shadow-lg active:scale-95"
              >
                Voir le catalogue
              </button>
            </div>

          </div>
        </div>
      </div>
      <PublicFooter />
    </div>
  );
};

export default MeejoServices;
