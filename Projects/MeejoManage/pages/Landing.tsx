
import React, { useState, useEffect } from 'react';
import PublicFooter from '../components/PublicFooter';
import { 
  LogoIcon, 
  ChartBarIcon, 
  Cube, 
  AlertIcon, 
  WalletIcon, 
  SparklesIcon, 
  HistoryIcon, 
  GlobeIcon, 
  MegaphoneIcon,
  SearchIcon,
  CartIcon,
  ProductIcon,
  UsersIcon,
  SettingsIcon,
  DashboardIcon,
  CargoIcon
} from '../components/Icons';
import { StorageService } from '../services/storage';
import { BlogPost } from '../types';

const Landing: React.FC = () => {
  const navigate = (hash: string) => { 
    window.location.hash = hash; 
    window.scrollTo(0, 0);
  };
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const posts = await StorageService.getBlogPosts();
        setBlogs(posts.filter(p => p.published).slice(0, 3));
      } catch (error) {
        console.error("Error loading blog posts:", error);
      }
    };
    load();
  }, []);

  const partners = ["Alibaba Global", "Wave CI", "Dakar Logistics", "Orange Money", "Free Money"];

  const faqItems = [
    {
      q: "Est-ce que Meejo Manage convient aux petites boutiques ?",
      a: "Absolument. Meejo a été conçu pour accompagner aussi bien le commerçant qui débute avec un seul point de vente que l'entrepreneur gérant plusieurs succursales."
    },
    {
      q: "Puis-je utiliser le logiciel sans connexion internet ?",
      a: "Meejo est une application Cloud pour permettre le pilotage à distance. Une connexion internet (même 3G/4G) est nécessaire pour synchroniser vos ventes et votre stock en temps réel."
    },
    {
      q: "Comment fonctionne la synchronisation Alibaba ?",
      a: "Vous pouvez importer vos factures et détails de colis directement. Meejo calcule automatiquement votre prix de revient en incluant le transport et les frais annexes."
    },
    {
      q: "Mes données sont-elles sécurisées ?",
      a: "Nous utilisons des protocoles de sécurité bancaire. Vos données financières et vos inventaires sont cryptés et accessibles uniquement par vous et vos collaborateurs autorisés."
    }
  ];

  const advantages = [
    { 
        icon: <DashboardIcon className="w-8 h-8" />, 
        title: "Écosystème Tout-en-un", 
        desc: "L'intelligence de votre business centralisée. De la caisse physique à votre stock e-commerce.",
        color: "bg-blue-50 text-blue-600",
        badge: "VITAL"
    },
    { 
        icon: <SparklesIcon className="w-8 h-8" />, 
        title: "Assistant Vocal IA", 
        desc: "Gagnez un temps précieux. Interrogez votre business à la voix pour obtenir vos stocks ou votre CA sans rien écrire.",
        color: "bg-amber-50 text-amber-600",
        badge: "OPTIMISATION"
    },
    { 
        icon: <ChartBarIcon className="w-8 h-8" />, 
        title: "Audit en Temps Réel", 
        desc: "Prenez des décisions basées sur des faits, pas des suppositions. Vos rapports sont à jour à chaque clic.",
        color: "bg-green-50 text-green-600",
        badge: "STRATÉGIQUE"
    },
    { 
        icon: <GlobeIcon className="w-8 h-8" />, 
        title: "Gestion Multi-Sites", 
        desc: "Pilotez vos succursales depuis votre téléphone, n'importe où dans le monde. La distance n'est plus un frein.",
        color: "bg-purple-50 text-purple-600",
        badge: "EXPANSION"
    },
    { 
        icon: <CargoIcon className="w-8 h-8" />, 
        title: "Sourcing Alibaba Sync", 
        desc: "Éliminez les surprises. Calculez vos prix de revient et suivez vos cargos automatiquement.",
        color: "bg-orange-50 text-orange-600",
        badge: "INÉDIT"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-blue-100 overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#2E86DE] via-[#1e40af] to-[#0f172a] pt-32 pb-12 md:pt-48 md:pb-40 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left space-y-8 animate-slide-in">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 shadow-sm">
                 <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-100">La performance africaine enfin accessible</span>
              </div>
              
              <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.05] font-heading drop-shadow-lg">
                Vendez plus, <br/>
                <span className="text-blue-300 font-black">gérez moins.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-blue-100/90 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                La plateforme tout-en-un qui simplifie votre stock, vos ventes et vos imports Alibaba dans une interface moderne et une IA prête à répondre à vos questions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <button onClick={() => navigate('#create-account')} className="px-8 py-4 bg-white text-[#2E86DE] rounded-2xl font-black text-lg hover:scale-105 active:scale-95 shadow-xl transition duration-300">
                  Se lancer maintenant
                </button>
                <button onClick={() => navigate('#calculator')} className="px-8 py-4 bg-blue-900/40 border border-white/30 text-white rounded-2xl font-black text-lg hover:bg-white/10 active:scale-95 transition">
                  Simuler un Import
                </button>
              </div>
            </div>

            {/* Dashboard Mockup Simulation */}
            <div className="relative group perspective-1000 animate-fade-in delay-300 max-w-lg mx-auto lg:max-w-none">
                <div className="bg-slate-50 rounded-[2.5rem] p-6 md:p-8 shadow-2xl border border-white/50 transform lg:rotate-2 group-hover:rotate-0 transition duration-700">
                    <div className="flex items-center gap-2 mb-8 border-b border-slate-200 pb-4">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        <div className="flex-1 text-center text-[10px] text-slate-400 font-bold tracking-widest bg-slate-100 rounded-lg py-1">dashboard.meejo.io</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mb-3 w-fit"><WalletIcon /></div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Bénéfice Réel</p>
                            <p className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">845k <span className="text-[10px]">CFA</span></p>
                        </div>
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                            <div className="p-2 bg-orange-50 rounded-lg text-orange-600 mb-3 w-fit"><Cube /></div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Stock Bas</p>
                            <p className="text-xl md:text-2xl font-black text-slate-800">4 Alertes</p>
                        </div>
                        <div className="col-span-2 bg-slate-900 p-6 rounded-[2rem] h-40 flex flex-col justify-end overflow-hidden">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-white text-xs font-bold">Flux des Ventes</p>
                                <span className="text-[10px] text-green-400 font-bold">OPTIMISÉ</span>
                            </div>
                            <div className="w-full h-full flex items-end gap-1.5">
                                {[30, 55, 45, 90, 75, 100, 85, 55, 110].map((h, i) => (
                                    <div key={i} className="flex-1 bg-blue-500 rounded-t-lg" style={{ height: `${h}%` }}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON - Le Chaos vs La Maîtrise */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-heading">Le Chaos vs La Maîtrise.</h2>
                <p className="text-slate-500 text-lg">Meejo remplace les cahiers par la clarté totale.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* CHAOS */}
                <div className="bg-slate-50 rounded-[3rem] p-10 flex flex-col border-2 border-slate-100 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition duration-500">
                    <h3 className="text-2xl font-black text-slate-400 mb-8 uppercase tracking-widest">Sans Meejo</h3>
                    <div className="space-y-6">
                        <div className="flex gap-4 items-start">
                            <span className="text-red-500 text-xl font-bold">✖</span>
                            <p className="font-bold text-slate-600">Calculs d'imports au hasard sur papier.</p>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="text-red-500 text-xl font-bold">✖</span>
                            <p className="font-bold text-slate-600">Encaissements sur WhatsApp sans trace.</p>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="text-red-500 text-xl font-bold">✖</span>
                            <p className="font-bold text-slate-600">Vols de stock invisibles à l'oeil nu.</p>
                        </div>
                    </div>
                    <button onClick={() => navigate('#create-account')} className="mt-12 py-5 border-2 border-slate-300 text-slate-500 font-black rounded-2xl hover:bg-slate-200 transition">Éviter l'échec</button>
                </div>

                {/* MAITRISE */}
                <div className="bg-blue-600 rounded-[3rem] p-10 flex flex-col shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-bl-full"></div>
                    <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-widest relative z-10">Avec Meejo Manage</h3>
                    <div className="space-y-6 relative z-10">
                        <div className="flex gap-4 items-start">
                            <span className="text-green-300 text-xl font-bold">✔</span>
                            <p className="font-bold text-white">Simulation précise des coûts maritime/air.</p>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="text-green-300 text-xl font-bold">✔</span>
                            <p className="font-bold text-white">Site e-commerce lié à votre stock réel.</p>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="text-green-300 text-xl font-bold">✔</span>
                            <p className="font-bold text-white">Inventaire sécurisé et audit d'employés.</p>
                        </div>
                    </div>
                    <button onClick={() => navigate('#create-account')} className="mt-12 py-5 bg-white text-blue-600 font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition relative z-10">Passer au niveau supérieur</button>
                </div>
            </div>
        </div>
      </section>

      {/* ADVANTAGES SECTION - Optimized Design */}
      <section className="py-24 bg-blue-50/30 border-y border-slate-100 relative">
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-20 space-y-4">
                <span className="text-blue-600 font-black uppercase text-[10px] tracking-[0.3em]">Votre Guide Business</span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-heading">Pourquoi choisir Meejo ?</h2>
                <p className="text-slate-500 font-medium max-w-2xl mx-auto">Conçu spécifiquement pour dominer les défis du commerce physique et digital en Afrique.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {advantages.map((adv, i) => (
                    <div key={i} className="group bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 flex flex-col relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-slate-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 opacity-50"></div>
                        
                        <div className={`w-14 h-14 ${adv.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-transform group-hover:rotate-6`}>
                            {adv.icon}
                        </div>
                        
                        <span className="text-[9px] font-black tracking-[0.2em] text-blue-400 mb-2">{adv.badge}</span>
                        <h4 className="font-black text-lg text-slate-900 mb-4 font-heading">{adv.title}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed font-medium">{adv.desc}</p>
                        
                        <div className="mt-8 h-1 w-0 bg-blue-600 group-hover:w-full transition-all duration-700 rounded-full"></div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* PROCESS SECTION - 1-2-3 Steps */}
      <section className="py-24 bg-slate-900 text-white">
          <div className="container mx-auto px-4 text-center max-w-5xl">
              <h2 className="text-3xl md:text-5xl font-black font-heading mb-20">Lancez-vous en 3 étapes.</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  <div className="space-y-6">
                      <div className="w-20 h-20 rounded-3xl bg-blue-600 text-white font-black text-3xl flex items-center justify-center mx-auto shadow-xl">1</div>
                      <h4 className="font-black text-2xl">Connexion</h4>
                      <p className="text-slate-400 text-sm">Créez votre compte en 2 minutes. Pas de carte bancaire.</p>
                  </div>
                  <div className="space-y-6">
                      <div className="w-20 h-20 rounded-3xl bg-blue-800 text-white font-black text-3xl flex items-center justify-center mx-auto">2</div>
                      <h4 className="font-black text-2xl">Imports</h4>
                      <p className="text-slate-400 text-sm">Configurez vos stocks et simulez vos prix de revient.</p>
                  </div>
                  <div className="space-y-6">
                      <div className="w-20 h-20 rounded-3xl bg-blue-900 text-white font-black text-3xl flex items-center justify-center mx-auto">3</div>
                      <h4 className="font-black text-2xl">Ventes</h4>
                      <p className="text-slate-400 text-sm">Ouvrez votre caisse et votre site web. Encaissez partout.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* PARTNERS LOGO */}
      <section className="py-16 bg-gray-50 border-b border-slate-100">
        <div className="container mx-auto px-4 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-10">Partenaires techniques & Collaborateurs</p>
            <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 opacity-40 grayscale hover:opacity-100 transition duration-500">
                {partners.map(p => (
                    <span key={p} className="text-xl md:text-2xl font-black font-heading text-slate-900 tracking-tighter">{p}</span>
                ))}
            </div>
        </div>
      </section>

      {/* BLOG FEED - Expert Tips */}
      <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
              <div className="flex justify-between items-end mb-16 gap-6">
                  <div className="space-y-2">
                      <span className="text-blue-600 font-black uppercase text-[10px] tracking-widest">Le Guide de l'Entrepreneur</span>
                      <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-heading">Conseils d'Experts.</h2>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {blogs.length > 0 ? blogs.map(post => (
                      <div key={post.id} className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
                          <div className="aspect-video bg-slate-200 overflow-hidden">
                              {post.imageUrl ? (
                                  <img src={post.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" />
                              ) : (
                                  <div className="w-full h-full flex items-center justify-center text-slate-400"><MegaphoneIcon className="w-12 h-12" /></div>
                              )}
                          </div>
                          <div className="p-8 flex-1 flex flex-col">
                            <h4 className="font-black text-xl text-slate-800 mb-4 group-hover:text-[#2E86DE] transition">{post.title}</h4>
                            <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed mb-6">{post.content}</p>
                            <span className="text-[#2E86DE] font-bold text-sm mt-auto">Lire l'article →</span>
                          </div>
                      </div>
                  )) : (
                    <div className="col-span-full py-16 text-center text-slate-400 border-2 border-dashed border-slate-100 rounded-[3rem] italic font-bold">
                        Les secrets des leaders arrivent bientôt...
                    </div>
                  )}
              </div>
          </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-white relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
              <div className="absolute top-40 -left-64 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute bottom-20 -right-64 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50"></div>
          </div>

          <div className="container mx-auto px-4 max-w-3xl relative z-10">
              <div className="text-center mb-20 space-y-6">
                  <span className="text-blue-600 font-black uppercase text-[10px] tracking-[0.3em]">Support & Aide</span>
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-heading tracking-tight">Questions Fréquentes</h2>
                  <p className="text-slate-500 text-lg font-medium max-w-xl mx-auto">
                      Nous avons anticipé vos interrogations pour vous permettre de démarrer sans zone d'ombre.
                  </p>
              </div>

              <div className="space-y-6">
                  {faqItems.map((item, idx) => (
                      <div 
                        key={idx} 
                        className={`group rounded-3xl transition-all duration-300 border ${openFaq === idx ? 'bg-white border-blue-200 shadow-xl shadow-blue-100/50 scale-[1.02]' : 'bg-gray-50 border-transparent hover:bg-white hover:border-gray-200 hover:shadow-lg'}`}
                      >
                          <button 
                            onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                            className="w-full flex items-center justify-between p-8 text-left focus:outline-none"
                          >
                              <span className={`font-bold text-lg transition-colors ${openFaq === idx ? 'text-blue-600' : 'text-slate-800'}`}>
                                {item.q}
                              </span>
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === idx ? 'bg-blue-600 text-white rotate-180' : 'bg-white border border-gray-200 text-slate-400 group-hover:border-blue-200 group-hover:text-blue-600'}`}>
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                  </svg>
                              </div>
                          </button>
                          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                              <div className="p-8 pt-0 text-slate-500 leading-relaxed font-medium">
                                  {item.a}
                              </div>
                          </div>
                      </div>
                  ))}
              </div>

              <div className="mt-20">
                  <div className="relative bg-slate-900 rounded-[3rem] p-12 text-center overflow-hidden">
                      {/* Abstract Shapes */}
                      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
                          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
                      </div>

                      <div className="relative z-10 flex flex-col items-center">
                          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-900/50 text-white">
                              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                          </div>
                          <h3 className="text-2xl md:text-3xl font-black text-white mb-4 font-heading">Une question spécifique ?</h3>
                          <p className="text-blue-200 mb-10 max-w-md mx-auto text-lg">
                              Notre équipe support est basée à Dakar et vous répond en moins de 5 minutes sur WhatsApp.
                          </p>
                          <button 
                            onClick={() => window.open('https://wa.me/221787935555', '_blank')} 
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-lg shadow-2xl hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
                          >
                              <span>Discuter avec un expert</span>
                              <svg className="w-5 h-5 text-green-500 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/></svg>
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default Landing;
