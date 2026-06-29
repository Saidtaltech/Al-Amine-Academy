import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Briefcase, 
  FileText, 
  Calculator, 
  Calendar, 
  Mail, 
  Phone, 
  Check, 
  Rocket, 
  Users, 
  Shield, 
  Store, 
  BookOpen, 
  MessageCircle, 
  CreditCard, 
  ChevronDown 
} from 'lucide-react';

const PropositionHawaFr: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isNavVisible, setIsNavVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Menu visible après le premier scroll
      setIsNavVisible(window.scrollY > 100);

      // Détection section active
      const sections = ['home', 'presentation', 'cahier-charges', 'devis', 'planning', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  const NavLink = ({ id, icon: Icon, label }: { id: string; icon: any; label: string }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
        activeSection === id
          ? 'bg-[#0D47A1] text-white shadow-lg'
          : 'text-gray-700 hover:bg-[#E3F2FD] hover:text-[#0D47A1]'
      }`}
    >
      <Icon size={16} />
      <span className="text-sm">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E3F2FD] via-[#F5F7FA] to-white font-sans">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-xl shadow-lg border-b-4 border-[#0D47A1] transition-all duration-300 ${
          isNavVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-2 text-[#0D47A1] text-xl font-black hover:text-[#1976D2] transition-all hover:scale-105 font-heading"
            >
              <Rocket size={20} />
              MeejoMange
            </button>

            <div className="hidden lg:flex items-center gap-2">
              <NavLink id="home" icon={Home} label="Accueil" />
              <NavLink id="presentation" icon={Briefcase} label="Présentation" />
              <NavLink id="cahier-charges" icon={FileText} label="Cahier des Charges" />
              <NavLink id="devis" icon={Calculator} label="Devis" />
              <NavLink id="planning" icon={Calendar} label="Planning" />
              <NavLink id="contact" icon={Mail} label="Contact" />
            </div>

            <button className="lg:hidden p-2 text-[#0D47A1]">
              <ChevronDown size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0D47A1] via-[#1976D2] to-[#2196F3] text-white py-24">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.15)_0%,transparent_50%)]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block bg-white/20 backdrop-blur-lg border border-white/30 rounded-full px-6 py-2 text-sm font-medium mb-4 animate-fade-in">
              <span className="inline-flex items-center gap-2">
                <span className="text-[#FFD93D]">👑</span> Proposition Exclusive - 5 Janvier 2026
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight font-heading" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
              Plateforme Membership<br />
              <span className="block mt-2">Féminine Premium</span>
            </h1>

            <div className="inline-block bg-white/25 backdrop-blur-lg rounded-full px-8 py-4 text-lg font-bold border border-white/30 shadow-xl">
              Marketplace Netflix + Contenus Intimes Sécurisés
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <button
                onClick={() => scrollToSection('devis')}
                className="px-8 py-4 bg-white text-[#0D47A1] rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                <Calculator size={20} />
                Découvrir le Devis
              </button>
              <button
                onClick={() => scrollToSection('cahier-charges')}
                className="px-8 py-4 bg-blue-900/40 border-2 border-white/30 text-white rounded-2xl font-black text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                <FileText size={20} />
                Cahier des Charges
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-12">
               <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl transform hover:scale-105 transition duration-500">
                <div className="text-4xl font-black text-[#0D47A1]">640 000</div>
                <div className="text-xs text-gray-500 font-black uppercase tracking-widest mt-2">XOF TTC Total</div>
              </div>
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl transform hover:scale-105 transition duration-500">
                <div className="text-4xl font-black text-[#0D47A1]">Mars 2026</div>
                <div className="text-xs text-gray-500 font-black uppercase tracking-widest mt-2">Lancement</div>
              </div>
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl transform hover:scale-105 transition duration-500">
                <div className="text-4xl font-black text-[#0D47A1]">30 jours</div>
                <div className="text-xs text-gray-500 font-black uppercase tracking-widest mt-2">Validité Offre</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Présentation */}
      <section id="presentation" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900 font-heading tracking-tight">Votre Projet, Notre Expertise</h2>
            <p className="text-xl text-gray-600 leading-relaxed font-medium">
              MeejoMange.com crée votre plateforme membership 100% féminine : interface Netflix limitée à la marketplace,
              contenus premium par épisodes sécurisés, e-commerce mixte et communauté modérée. Lancement Mars 2026 garanti.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Audience Premium',
                items: ['Femmes 18-44 ans francophones', 'International optimisé', 'Design intime & fun']
              },
              {
                icon: Shield,
                title: 'Sécurité Avancée',
                items: ['Contenus abonnés only', 'Anti-capture/partage', 'Modération professionnelle']
              },
              {
                icon: Store,
                title: 'Focus Littéraire',
                items: ['Romans par épisodes', 'Ebooks temporaires', 'Commentaires & confessions']
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-[2.5rem] p-10 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0D47A1] to-[#1976D2] rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-200">
                  <feature.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-black mb-6 text-gray-900 font-heading">{feature.title}</h3>
                <ul className="space-y-4 flex-grow">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 font-medium">
                      <div className="mt-1 bg-blue-50 rounded-full p-1"><Check className="text-[#0D47A1]" size={14} /></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cahier des Charges */}
      <section id="cahier-charges" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 opacity-50"></div>
              
              <div className="text-center mb-16 relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 text-[#0D47A1] rounded-3xl mb-6">
                    <FileText size={40} />
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-4 font-heading text-slate-900">
                  Cahier des Charges
                </h2>
                <p className="text-xl text-slate-500 font-bold uppercase tracking-[0.2em]">Version MVP Littéraire</p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mb-16 relative z-10">
                <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100">
                  <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-gray-900 font-heading">
                    <BookOpen className="text-[#0D47A1]" size={28} />
                    Contenus & Publication
                  </h3>
                  <div className="space-y-6">
                    {[
                      { title: 'Romans/Chroniques par tomes', desc: 'Drip content hebdomadaire automatisé' },
                      { title: 'Ebooks temporaires', desc: 'Accès 1-3 mois configurables' },
                      { title: 'Prévisualisations intelligentes', desc: '"En savoir plus" → Abonnement requis' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="mt-1 bg-green-100 rounded-full p-1"><Check className="text-green-600" size={16} /></div>
                        <div>
                          <p className="text-gray-900 font-black text-lg">{item.title}</p>
                          <p className="text-gray-500 font-medium">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100">
                  <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-gray-900 font-heading">
                    <MessageCircle className="text-[#0D47A1]" size={28} />
                    Communauté Sécurisée
                  </h3>
                  <div className="space-y-6">
                    {[
                      { title: 'Commentaires abonnés only', desc: 'Confessions, débats, Q&A mensuels' },
                      { title: 'Modération avancée', desc: 'Masquage, suppression, signalements' },
                      { title: 'Social features', desc: 'MP, réactions, profils sécurisés' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="mt-1 bg-green-100 rounded-full p-1"><Check className="text-green-600" size={16} /></div>
                        <div>
                          <p className="text-gray-900 font-black text-lg">{item.title}</p>
                          <p className="text-gray-500 font-medium">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {[
                  { icon: CreditCard, label: 'Monétisation', desc: 'Abonnements mensuels/annuels', color: 'bg-[#0D47A1]' },
                  { icon: Phone, label: 'Mobile-First', desc: 'Responsive optimisé', color: 'bg-green-600' },
                  { icon: Rocket, label: 'Technologies', desc: 'WordPress Pro SaaS Stack', color: 'bg-blue-600' }
                ].map((item, idx) => (
                  <div key={idx} className={`${item.color} text-white p-8 rounded-3xl text-center shadow-xl transform hover:-translate-y-1 transition duration-300`}>
                    <item.icon className="mx-auto mb-4" size={36} />
                    <h4 className="font-black text-xl mb-2 font-heading">{item.label}</h4>
                    <p className="text-sm opacity-90 font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Devis */}
      <section id="devis" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-slate-100">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 text-[#0D47A1] rounded-3xl mb-6">
                    <Calculator size={40} />
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-4 font-heading text-slate-900">
                  Budget Prévisionnel
                </h2>
                <p className="text-lg text-slate-500 font-bold uppercase tracking-widest">Facturation Transparente - TVA 18% incluse</p>
              </div>

              <div className="overflow-x-auto mb-12 rounded-[2rem] border border-slate-100 shadow-sm">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#0D47A1] to-[#1976D2] text-white">
                      <th className="px-8 py-6 font-black text-sm uppercase tracking-widest">Phase</th>
                      <th className="px-8 py-6 font-black text-sm uppercase tracking-widest">Description & Livrables</th>
                      <th className="px-8 py-6 text-center font-black text-sm uppercase tracking-widest">Montant (XOF)</th>
                      <th className="px-8 py-6 text-center font-black text-sm uppercase tracking-widest">%</th>
                      <th className="px-8 py-6 text-center font-black text-sm uppercase tracking-widest">Délai</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { phase: '1. Conception', desc: 'Maquettes partie littéraire + identité visuelle', montant: '192 000', pct: '30%', delai: '2 sem.' },
                      { phase: '2. Développement', desc: 'MemberPress + Forum + Anti-partage', montant: '256 000', pct: '40%', delai: '5-6 sem.' },
                      { phase: '3. Intégrations', desc: 'PayTech + Tests + CGU/RGPD + Pub', montant: '115 200', pct: '18%', delai: '3 sem.' },
                      { phase: '4. Formation', desc: 'Formation 4h + Support 1 mois + Mise en ligne', montant: '76 800', pct: '12%', delai: '2 sem.' }
                    ].map((row, idx) => (
                      <tr key={idx} className={`${idx % 2 === 0 ? 'bg-blue-50/30' : 'bg-white'} hover:bg-slate-50 transition duration-300`}>
                        <td className="px-8 py-6 font-black text-gray-900">{row.phase}</td>
                        <td className="px-8 py-6 text-gray-600 font-medium">{row.desc}</td>
                        <td className="px-8 py-6 text-center font-black text-[#0D47A1] text-lg">{row.montant} TTC</td>
                        <td className="px-8 py-6 text-center">
                          <span className="bg-[#0D47A1] text-white px-3 py-1 rounded-full text-xs font-black">{row.pct}</span>
                        </td>
                        <td className="px-8 py-6 text-center font-bold text-gray-500">{row.delai}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-900 text-white">
                    <tr>
                      <th colSpan={2} className="px-8 py-8 text-right text-xl font-black uppercase tracking-widest">TOTAL INVESTISSEMENT</th>
                      <th className="px-8 py-8 text-center text-3xl font-black text-blue-400">640 000 XOF TTC</th>
                      <th colSpan={2} className="px-8 py-8 text-center text-xs font-black text-slate-400 uppercase tracking-widest">TVA 18% incluse</th>
                    </tr>
                    <tr className="bg-slate-800/50">
                      <td colSpan={3} className="px-8 py-6">
                        <div className="flex flex-col sm:flex-row gap-12">
                          <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Licences Pro (Année 1)</p>
                            <p className="text-xl font-black text-white">254 400 XOF</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Maintenance Cloud</p>
                            <p className="text-xl font-black text-green-400">80 000 XOF/an</p>
                          </div>
                        </div>
                      </td>
                      <td colSpan={2}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="text-center">
                <a
                  href="mailto:contact@meejomange.com?subject=✅%20Acceptation%20Proposition%20MVP%20Littéraire%20640k&body=Bonjour%20MeejoMange,%0A%0AJ'accepte%20votre%20proposition%20commerciale%20du%205%20janvier%202026%20pour%20la%20création%20de%20ma%20plateforme%20membership%20féminine%20MVP%20littéraire.%0A%0ABudget%20total%20:%20640%20000%20XOF%20TTC%20(TVA%2018%%20incluse)%0ALancement%20:%20Mars%202026%0A%0AJe%20souhaite%20procéder%20à%20la%20signature%20du%20contrat%20et%20verser%20l'acompte%20de%2030%%20(192%20000%20XOF).%0A%0AQuand%20pouvons-nous%20planifier%20notre%20appel%20de%20confirmation%20?%0A%0AMerci%20!%0A%0A[Votre%20Nom]"
                  className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-[#0D47A1] to-[#1976D2] text-white rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 active:scale-95"
                >
                  <Check size={28} />
                  Valider la Proposition
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Planning */}
      <section id="planning" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-slate-100">
              <div className="text-center mb-20">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 text-[#0D47A1] rounded-3xl mb-6">
                    <Calendar size={40} />
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-4 font-heading text-slate-900">
                  Planning de Réalisation
                </h2>
                <p className="text-lg text-slate-500 font-bold uppercase tracking-widest">12 semaines intensives - Lancement Mars 2026</p>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                {[
                  { date: 'JANVIER 2026', title: 'Phase 1 - Conception', desc: 'Maquettes validées, stack technique WordPress Pro, achat des licences plugins.', color: 'bg-[#0D47A1]' },
                  { date: 'FÉVRIER 2026', title: 'Phase 2 - Développement', desc: 'Core fonctionnel Membership, Forum privé, Intégration PayTech, tests intensifs.', color: 'bg-green-600' },
                  { date: 'MARS 2026', title: 'Phase 3-4 - Lancement', desc: 'Production live, formation de l\'équipe, support post-lancement 30j.', color: 'bg-blue-600' }
                ].map((phase, idx) => (
                  <div key={idx} className="relative pl-10 border-l-4 border-slate-100 group">
                    <div className="absolute -left-[14px] top-0 w-6 h-6 bg-white border-4 border-[#0D47A1] rounded-full shadow-lg group-hover:scale-125 transition duration-500" />
                    <div className={`${phase.color} text-white inline-block px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest mb-4 shadow-lg`}>
                      {phase.date}
                    </div>
                    <h3 className="text-2xl font-black mb-3 text-gray-900 font-heading">{phase.title}</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">{phase.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-900 rounded-[3.5rem] p-10 md:p-20 shadow-2xl text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl -mr-48 -mt-48"></div>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black mb-12 text-white font-heading relative z-10">Prochaines Étapes</h2>

              <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-white/10 relative z-10">
                <h3 className="text-2xl font-black mb-8 text-[#0D47A1] flex items-center justify-center gap-3 font-heading uppercase tracking-tight">
                  <Mail size={32} />
                  Coordonnées Directes
                </h3>
                <div className="grid md:grid-cols-2 gap-10 text-left">
                  <div className="space-y-2">
                    <h4 className="font-black text-gray-900 text-xl font-heading">MeejoMange.com</h4>
                    <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">Développeur Fullstack WordPress</p>
                    <p className="text-gray-400 font-medium text-xs">Spécialiste Membership & E-commerce</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 group">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#0D47A1] transition group-hover:bg-[#0D47A1] group-hover:text-white"><Phone size={18} /></div>
                      <a href="tel:+221767629501" className="font-black text-gray-900 hover:text-[#0D47A1] transition">+221 76 762 95 01</a>
                    </div>
                    <div className="flex items-center gap-3 group">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#0D47A1] transition group-hover:bg-[#0D47A1] group-hover:text-white"><Mail size={18} /></div>
                      <a href="mailto:contact@meejomange.com" className="font-black text-gray-900 hover:text-[#0D47A1] transition">contact@meejomange.com</a>
                    </div>
                    <div className="flex items-center gap-3 group">
                      <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 transition group-hover:bg-green-600 group-hover:text-white">
                        <MessageCircle size={18} />
                      </div>
                      <a
                        href="https://wa.me/221767629501?text=Bonjour%20MeejoMange,%0AJe%20souhaite%20valider%20la%20proposition%20MVP%20littéraire%20640k"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-black text-green-600 hover:text-green-700 transition"
                      >
                        WhatsApp Business
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <p className="font-black text-lg mb-2 font-heading tracking-tight">MeejoMange.com</p>
              <p className="text-sm text-slate-500 font-medium">© 2026 - Tous droits réservés</p>
              <p className="text-xs text-slate-600 mt-1">
                <a href="https://behance.net/saidtall" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  Portfolio: behance.net/saidtall
                </a>
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a href="https://wa.me/221767629501" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300">
                <MessageCircle size={24} />
              </a>
              <a href="https://behance.net/saidtall" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300">
                <Briefcase size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PropositionHawaFr;