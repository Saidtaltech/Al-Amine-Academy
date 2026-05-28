# -*- coding: utf-8 -*-
"""Patch programme-cours-en-ligne.html:
   1. Add animation CSS
   2. Add data-i18n to Tarifs section
   3. Add data-i18n to 5 Niveaux section
"""
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

path = r'C:\Users\7MAKSACOD PC\Desktop\Daara Al Amine Academy\SITE WEB AAA\programme-cours-en-ligne.html'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

# ─── 1. ADD ANIMATION CSS ─────────────────────────────────────────────────────
OLD_STYLE = """  body { font-family: 'Montserrat', sans-serif; }
        .arabic-text { font-family: 'Amiri', serif; direction: rtl; }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.12); }
  </style>"""

NEW_STYLE = """  body { font-family: 'Montserrat', sans-serif; }
        .arabic-text { font-family: 'Amiri', serif; direction: rtl; }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.12); }

        /* ── Tarif card hover lift ── */
        .tarif-card { transition: transform .25s ease, box-shadow .25s ease; }
        .tarif-card:hover { transform: translateY(-6px); box-shadow: 0 24px 40px rgba(30,122,154,.15); }

        /* ── Level card hover ── */
        .level-card { transition: transform .2s ease, box-shadow .2s ease; }
        .level-card:hover { transform: translateX(4px); box-shadow: 0 8px 24px rgba(30,122,154,.10); }

        /* ── POPULAIRE badge pulse ── */
        @keyframes badgePulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(245,158,11,.5); }
          50%      { box-shadow: 0 0 0 8px rgba(245,158,11,0); }
        }
        .badge-pulse { animation: badgePulse 2.4s ease-in-out infinite; }

        /* ── PDF button float ── */
        @keyframes floatBtn {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-4px); }
        }
        .tarif-pdf-btn { animation: floatBtn 3s ease-in-out infinite; }
        .tarif-pdf-btn:hover { animation: none; transform: translateY(-2px); }

        /* ── Level number circle pop on reveal ── */
        @keyframes circlePop {
          0%   { transform: scale(0.6); opacity: 0; }
          80%  { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .level-card .level-num { animation: circlePop .5s cubic-bezier(.34,1.56,.64,1) both; }
  </style>"""

# ─── 2. TARIFS SECTION ────────────────────────────────────────────────────────
OLD_TARIFS = """  <!-- ══════════════ TARIFS ══════════════ -->
  <section class="py-20 bg-white" id="tarifs">
   <div class="container mx-auto px-4">
    <div class="text-center mb-14 reveal">
     <span class="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
      <i class="fas fa-circle-check"></i> Aucun frais d'inscription
     </span>
     <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-3 reveal">Nos Tarifs</h2>
     <p class="text-slate-500 max-w-xl mx-auto mb-6">Choisissez la formule qui correspond à votre rythme — collectif ou individuel.</p>
     <a href="assets/pdf/fiche-cours-en-ligne-al-amine-academy.pdf" download
        class="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-2xl transition shadow-md text-sm cursor-pointer">
      <i class="fas fa-file-pdf"></i> Télécharger la fiche de renseignements (PDF)
     </a>
    </div>

    <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">

     <!-- ── Collectif ── -->
     <div class="bg-slate-50 border border-slate-200 rounded-3xl p-8 reveal soft-card">
      <p class="text-xs font-bold text-primary uppercase tracking-widest mb-5">Cours Collectifs</p>
      <div class="flex items-end gap-1 mb-1">
       <span class="text-4xl font-extrabold text-slate-900">10 000</span>
       <span class="text-sm text-slate-500 mb-1.5">FCFA / mois</span>
      </div>
      <p class="text-xs text-slate-400 mb-7">12 apprenants max · Tous niveaux</p>
      <ul class="space-y-3 text-sm text-slate-600">
       <li class="flex items-center gap-2"><i class="fas fa-check text-primary text-xs"></i> Cours en direct Google Meet</li>
       <li class="flex items-center gap-2"><i class="fas fa-check text-primary text-xs"></i> Suivi WhatsApp de groupe</li>
       <li class="flex items-center gap-2"><i class="fas fa-check text-primary text-xs"></i> Samedis &amp; Dimanches</li>
       <li class="flex items-center gap-2"><i class="fas fa-check text-primary text-xs"></i> Tous niveaux confondus</li>
      </ul>
      <a href="https://wa.me/221777857089" target="_blank" rel="noopener"
         class="mt-8 block text-center border border-primary text-primary font-semibold px-5 py-3 rounded-2xl hover:bg-primary hover:text-white transition text-sm cursor-pointer">
       S'inscrire
      </a>
     </div>

     <!-- ── Individuel Option 1 ── -->
     <div class="bg-slate-50 border border-slate-200 rounded-3xl p-8 reveal reveal-delay-2 soft-card">
      <p class="text-xs font-bold text-primary uppercase tracking-widest mb-5">Individuel — Option 1</p>
      <p class="text-lg font-bold text-slate-900 mb-1">Lecture du Coran</p>
      <p class="text-xs text-slate-400 mb-6">Rythme adapté à l'enfant</p>

      <div class="space-y-3 mb-7">
       <div class="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-slate-100">
        <div>
         <p class="text-sm font-medium text-slate-700">3h / mois</p>
         <p class="text-xs text-slate-400">45 min / séance</p>
        </div>
        <span class="text-lg font-extrabold text-primary">25 000 F</span>
       </div>
       <div class="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-slate-100">
        <div>
         <p class="text-sm font-medium text-slate-700">5h / mois</p>
         <p class="text-xs text-slate-400">1h / séance</p>
        </div>
        <span class="text-lg font-extrabold text-primary">35 000 F</span>
       </div>
      </div>

      <ul class="space-y-2 text-sm text-slate-600">
       <li class="flex items-center gap-2"><i class="fas fa-check text-primary text-xs"></i> Séances individuelles dédiées</li>
       <li class="flex items-center gap-2"><i class="fas fa-check text-primary text-xs"></i> Progression personnalisée</li>
      </ul>
      <a href="https://wa.me/221777857089" target="_blank" rel="noopener"
         class="mt-8 block text-center border border-primary text-primary font-semibold px-5 py-3 rounded-2xl hover:bg-primary hover:text-white transition text-sm cursor-pointer">
       S'inscrire
      </a>
     </div>

     <!-- ── Individuel Option 2 POPULAIRE ── -->
     <div class="bg-gradient-to-br from-primary to-teal-700 rounded-3xl p-8 shadow-2xl shadow-primary/30 reveal reveal-delay-4 relative">
      <div class="absolute -top-3 right-6 bg-secondary text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full shadow">
       ⭐ POPULAIRE
      </div>
      <p class="text-xs font-bold text-white/60 uppercase tracking-widest mb-5">Individuel — Option 2</p>
      <p class="text-lg font-bold text-white mb-1">Lecture + Sourates + Invocations</p>
      <p class="text-xs text-white/60 mb-6">Formation complète : lecture, mémorisation et spiritualité</p>

      <div class="bg-white/10 rounded-xl px-4 py-3 mb-7">
       <div class="flex items-center justify-between">
        <div>
         <p class="text-sm font-medium text-white">6h / mois</p>
         <p class="text-xs text-white/50">1h20 / séance</p>
        </div>
        <div class="text-right">
         <p class="text-xs text-white/60 mb-0.5">À partir de</p>
         <span class="text-2xl font-extrabold text-secondary">50 000 F</span>
        </div>
       </div>
      </div>

      <ul class="space-y-3 text-sm text-white/90 mb-8">
       <li class="flex items-center gap-2"><i class="fas fa-check text-secondary text-xs"></i> Lecture du Noble Coran</li>
       <li class="flex items-center gap-2"><i class="fas fa-check text-secondary text-xs"></i> Mémorisation de sourates</li>
       <li class="flex items-center gap-2"><i class="fas fa-check text-secondary text-xs"></i> Invocations quotidiennes (Adkar)</li>
       <li class="flex items-center gap-2"><i class="fas fa-check text-secondary text-xs"></i> Développement spirituel complet</li>
      </ul>
      <a href="https://wa.me/221777857089" target="_blank" rel="noopener"
         class="block text-center bg-secondary hover:bg-secondary-dark text-gray-900 font-bold px-5 py-3 rounded-2xl transition text-sm cursor-pointer shadow-lg">
       S'inscrire maintenant
      </a>
     </div>

    </div><!-- /grid tarifs -->
   </div>
  </section>"""

NEW_TARIFS = """  <!-- ══════════════ TARIFS ══════════════ -->
  <section class="py-20 bg-white" id="tarifs">
   <div class="container mx-auto px-4">
    <div class="text-center mb-14 reveal">
     <span class="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
      <i class="fas fa-circle-check"></i> <span data-i18n="programme_online.tarifs_no_fees">Aucun frais d'inscription</span>
     </span>
     <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-3" data-i18n="programme_online.tarifs_title">Nos Tarifs</h2>
     <p class="text-slate-500 max-w-xl mx-auto mb-6" data-i18n="programme_online.tarifs_subtitle">Choisissez la formule qui correspond à votre rythme — collectif ou individuel.</p>
     <a href="assets/pdf/fiche-cours-en-ligne-al-amine-academy.pdf" download
        class="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-2xl transition shadow-md text-sm cursor-pointer tarif-pdf-btn">
      <i class="fas fa-file-pdf"></i> <span data-i18n="programme_online.tarifs_pdf_btn">Télécharger la fiche de renseignements (PDF)</span>
     </a>
    </div>

    <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">

     <!-- ── Collectif ── -->
     <div class="bg-slate-50 border border-slate-200 rounded-3xl p-8 reveal soft-card tarif-card">
      <p class="text-xs font-bold text-primary uppercase tracking-widest mb-5" data-i18n="programme_online.tarifs_collectif_label">Cours Collectifs</p>
      <div class="flex items-end gap-1 mb-1">
       <span class="text-4xl font-extrabold text-slate-900">10 000</span>
       <span class="text-sm text-slate-500 mb-1.5">FCFA / mois</span>
      </div>
      <p class="text-xs text-slate-400 mb-7" data-i18n="programme_online.tarifs_collectif_sub">12 apprenants max · Tous niveaux</p>
      <ul class="space-y-3 text-sm text-slate-600">
       <li class="flex items-center gap-2"><i class="fas fa-check text-primary text-xs"></i> <span data-i18n="programme_online.tarifs_collectif_feat1">Cours en direct Google Meet</span></li>
       <li class="flex items-center gap-2"><i class="fas fa-check text-primary text-xs"></i> <span data-i18n="programme_online.tarifs_collectif_feat2">Suivi WhatsApp de groupe</span></li>
       <li class="flex items-center gap-2"><i class="fas fa-check text-primary text-xs"></i> <span data-i18n="programme_online.tarifs_collectif_feat3">Samedis &amp; Dimanches</span></li>
       <li class="flex items-center gap-2"><i class="fas fa-check text-primary text-xs"></i> <span data-i18n="programme_online.tarifs_collectif_feat4">Tous niveaux confondus</span></li>
      </ul>
      <a href="https://wa.me/221777857089" target="_blank" rel="noopener"
         class="mt-8 block text-center border border-primary text-primary font-semibold px-5 py-3 rounded-2xl hover:bg-primary hover:text-white transition text-sm cursor-pointer"
         data-i18n="programme_online.tarifs_cta">S'inscrire</a>
     </div>

     <!-- ── Individuel Option 1 ── -->
     <div class="bg-slate-50 border border-slate-200 rounded-3xl p-8 reveal reveal-delay-2 soft-card tarif-card">
      <p class="text-xs font-bold text-primary uppercase tracking-widest mb-5" data-i18n="programme_online.tarifs_indiv1_label">Individuel — Option 1</p>
      <p class="text-lg font-bold text-slate-900 mb-1" data-i18n="programme_online.tarifs_indiv1_title">Lecture du Coran</p>
      <p class="text-xs text-slate-400 mb-6" data-i18n="programme_online.tarifs_indiv1_sub">Rythme adapté à l'enfant</p>

      <div class="space-y-3 mb-7">
       <div class="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-slate-100">
        <div>
         <p class="text-sm font-medium text-slate-700">3h / mois</p>
         <p class="text-xs text-slate-400" data-i18n="programme_online.tarifs_indiv1_3h_sub">45 min / séance</p>
        </div>
        <span class="text-lg font-extrabold text-primary">25 000 F</span>
       </div>
       <div class="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-slate-100">
        <div>
         <p class="text-sm font-medium text-slate-700">5h / mois</p>
         <p class="text-xs text-slate-400" data-i18n="programme_online.tarifs_indiv1_5h_sub">1h / séance</p>
        </div>
        <span class="text-lg font-extrabold text-primary">35 000 F</span>
       </div>
      </div>

      <ul class="space-y-2 text-sm text-slate-600">
       <li class="flex items-center gap-2"><i class="fas fa-check text-primary text-xs"></i> <span data-i18n="programme_online.tarifs_indiv1_feat1">Séances individuelles dédiées</span></li>
       <li class="flex items-center gap-2"><i class="fas fa-check text-primary text-xs"></i> <span data-i18n="programme_online.tarifs_indiv1_feat2">Progression personnalisée</span></li>
      </ul>
      <a href="https://wa.me/221777857089" target="_blank" rel="noopener"
         class="mt-8 block text-center border border-primary text-primary font-semibold px-5 py-3 rounded-2xl hover:bg-primary hover:text-white transition text-sm cursor-pointer"
         data-i18n="programme_online.tarifs_cta">S'inscrire</a>
     </div>

     <!-- ── Individuel Option 2 POPULAIRE ── -->
     <div class="bg-gradient-to-br from-primary to-teal-700 rounded-3xl p-8 shadow-2xl shadow-primary/30 reveal reveal-delay-4 relative tarif-card">
      <div class="absolute -top-3 right-6 bg-secondary text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full shadow badge-pulse"
           data-i18n="programme_online.tarifs_popular">POPULAIRE</div>
      <p class="text-xs font-bold text-white/60 uppercase tracking-widest mb-5" data-i18n="programme_online.tarifs_indiv2_label">Individuel — Option 2</p>
      <p class="text-lg font-bold text-white mb-1" data-i18n="programme_online.tarifs_indiv2_title">Lecture + Sourates + Invocations</p>
      <p class="text-xs text-white/60 mb-6" data-i18n="programme_online.tarifs_indiv2_sub">Formation complète : lecture, mémorisation et spiritualité</p>

      <div class="bg-white/10 rounded-xl px-4 py-3 mb-7">
       <div class="flex items-center justify-between">
        <div>
         <p class="text-sm font-medium text-white">6h / mois</p>
         <p class="text-xs text-white/50" data-i18n="programme_online.tarifs_indiv2_6h_sub">1h20 / séance</p>
        </div>
        <div class="text-right">
         <p class="text-xs text-white/60 mb-0.5" data-i18n="programme_online.tarifs_indiv2_from">À partir de</p>
         <span class="text-2xl font-extrabold text-secondary">50 000 F</span>
        </div>
       </div>
      </div>

      <ul class="space-y-3 text-sm text-white/90 mb-8">
       <li class="flex items-center gap-2"><i class="fas fa-check text-secondary text-xs"></i> <span data-i18n="programme_online.tarifs_indiv2_feat1">Lecture du Noble Coran</span></li>
       <li class="flex items-center gap-2"><i class="fas fa-check text-secondary text-xs"></i> <span data-i18n="programme_online.tarifs_indiv2_feat2">Mémorisation de sourates</span></li>
       <li class="flex items-center gap-2"><i class="fas fa-check text-secondary text-xs"></i> <span data-i18n="programme_online.tarifs_indiv2_feat3">Invocations quotidiennes (Adkar)</span></li>
       <li class="flex items-center gap-2"><i class="fas fa-check text-secondary text-xs"></i> <span data-i18n="programme_online.tarifs_indiv2_feat4">Développement spirituel complet</span></li>
      </ul>
      <a href="https://wa.me/221777857089" target="_blank" rel="noopener"
         class="block text-center bg-secondary hover:bg-secondary-dark text-gray-900 font-bold px-5 py-3 rounded-2xl transition text-sm cursor-pointer shadow-lg"
         data-i18n="programme_online.tarifs_indiv2_cta">S'inscrire maintenant</a>
     </div>

    </div><!-- /grid tarifs -->
   </div>
  </section>"""

# ─── 3. NIVEAUX SECTION ───────────────────────────────────────────────────────
OLD_NIVEAUX = """  <!-- ══════════════ 5 NIVEAUX ══════════════ -->
  <section class="py-20 bg-slate-50">
   <div class="container mx-auto px-4">
    <div class="text-center mb-14 reveal">
     <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-3 reveal">Nos 5 niveaux progressifs</h2>
     <p class="text-slate-500 max-w-2xl mx-auto">Du débutant absolu jusqu'à la certification — une progression structurée et un accompagnement adapté à chaque apprenant.</p>
    </div>

    <div class="max-w-3xl mx-auto space-y-4">

     <!-- N1 Initial -->
     <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 reveal soft-card">
      <div class="flex items-start gap-4">
       <div class="shrink-0 text-center">
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white text-sm font-bold">1</span>
       </div>
       <div class="flex-1">
        <div class="flex flex-wrap items-center gap-2 mb-2">
         <h3 class="font-extrabold text-slate-900 text-lg">Initial</h3>
         <span class="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Débutants complets</span>
        </div>
        <ul class="text-sm text-slate-600 space-y-1 mb-3">
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-primary text-xs"></i> Apprentissage de l'alphabet arabe</li>
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-primary text-xs"></i> Lecture de syllabes, mots et phrases simples</li>
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-primary text-xs"></i> Introduction à la lecture de versets du Coran</li>
        </ul>
        <div class="flex items-center gap-2 bg-primary/5 border-l-4 border-primary rounded-r-lg px-3 py-2 text-xs text-primary font-semibold">
         <i class="fas fa-bullseye"></i> Objectif : Lire les versets du Coran de manière autonome et correcte
        </div>
       </div>
      </div>
     </div>

     <!-- N2 Irtiqâ -->
     <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 reveal soft-card">
      <div class="flex items-start gap-4">
       <div class="shrink-0">
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white text-sm font-bold">2</span>
       </div>
       <div class="flex-1">
        <div class="flex flex-wrap items-center gap-2 mb-2">
         <h3 class="font-extrabold text-slate-900 text-lg">Irtiqâ' <span class="arabic-text text-base font-normal text-slate-500">(ارتقاء)</span></h3>
         <span class="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Améliorer la lecture</span>
        </div>
        <ul class="text-sm text-slate-600 space-y-1 mb-3">
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-primary text-xs"></i> Correction des erreurs de lecture</li>
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-primary text-xs"></i> Fluidité et articulation</li>
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-primary text-xs"></i> Introduction aux premières règles du Tajwid</li>
        </ul>
        <div class="flex items-center gap-2 bg-primary/5 border-l-4 border-primary rounded-r-lg px-3 py-2 text-xs text-primary font-semibold">
         <i class="fas fa-bullseye"></i> Objectif : Meilleure prononciation et lecture plus belle et plus fluide
        </div>
       </div>
      </div>
     </div>

     <!-- N3 Tazkiya -->
     <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 reveal soft-card">
      <div class="flex items-start gap-4">
       <div class="shrink-0">
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white text-sm font-bold">3</span>
       </div>
       <div class="flex-1">
        <div class="flex flex-wrap items-center gap-2 mb-2">
         <h3 class="font-extrabold text-slate-900 text-lg">Tazkiya <span class="arabic-text text-base font-normal text-slate-500">(تزكية)</span></h3>
         <span class="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Tajwid &amp; Spiritualité</span>
        </div>
        <ul class="text-sm text-slate-600 space-y-1 mb-3">
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-primary text-xs"></i> Application des règles du Tajwid en récitation</li>
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-primary text-xs"></i> Récitation lente et réfléchie</li>
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-primary text-xs"></i> Tawhid (fondements de la foi islamique)</li>
        </ul>
        <div class="flex items-center gap-2 bg-primary/5 border-l-4 border-primary rounded-r-lg px-3 py-2 text-xs text-primary font-semibold">
         <i class="fas fa-bullseye"></i> Objectif : Récitation conforme au Tajwid et bases solides en Tawhid
        </div>
       </div>
      </div>
     </div>

     <!-- N4 Itqân -->
     <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 reveal soft-card">
      <div class="flex items-start gap-4">
       <div class="shrink-0">
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white text-sm font-bold">4</span>
       </div>
       <div class="flex-1">
        <div class="flex flex-wrap items-center gap-2 mb-2">
         <h3 class="font-extrabold text-slate-900 text-lg">Itqân <span class="arabic-text text-base font-normal text-slate-500">(إتقان)</span></h3>
         <span class="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Maîtrise avancée</span>
        </div>
        <ul class="text-sm text-slate-600 space-y-1 mb-3">
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-primary text-xs"></i> Maîtrise avancée du Tajwid</li>
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-primary text-xs"></i> Récitation fluide et conforme</li>
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-primary text-xs"></i> Tawhid approfondi + introduction au Fiqh</li>
        </ul>
        <div class="flex items-center gap-2 bg-primary/5 border-l-4 border-primary rounded-r-lg px-3 py-2 text-xs text-primary font-semibold">
         <i class="fas fa-bullseye"></i> Objectif : Maîtrise complète de la récitation et des sciences islamiques fondamentales
        </div>
       </div>
      </div>
     </div>

     <!-- N5 Ijâza -->
     <div class="bg-gradient-to-r from-primary/5 to-teal-50 rounded-2xl p-6 shadow-sm border border-primary/20 reveal soft-card">
      <div class="flex items-start gap-4">
       <div class="shrink-0">
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-gray-900 text-sm font-bold">5</span>
       </div>
       <div class="flex-1">
        <div class="flex flex-wrap items-center gap-2 mb-2">
         <h3 class="font-extrabold text-slate-900 text-lg">Ijâza <span class="arabic-text text-base font-normal text-slate-500">(إجازة)</span></h3>
         <span class="text-xs font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">Certification</span>
        </div>
        <ul class="text-sm text-slate-600 space-y-1 mb-3">
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-secondary text-xs"></i> Préparation à la certification</li>
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-secondary text-xs"></i> Récitation évaluée par un maître qualifié</li>
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-secondary text-xs"></i> Obtention de l'Ijaza (autorisation de transmission)</li>
        </ul>
        <div class="flex items-center gap-2 bg-secondary/10 border-l-4 border-secondary rounded-r-lg px-3 py-2 text-xs text-amber-700 font-semibold">
         <i class="fas fa-award"></i> Objectif : Certification attestant la maîtrise de la récitation du Noble Coran
        </div>
       </div>
      </div>
     </div>

    </div><!-- /niveaux -->
   </div>
  </section>"""

NEW_NIVEAUX = """  <!-- ══════════════ 5 NIVEAUX ══════════════ -->
  <section class="py-20 bg-slate-50">
   <div class="container mx-auto px-4">
    <div class="text-center mb-14 reveal">
     <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-3" data-i18n="programme_online.levels_title">Nos 5 niveaux progressifs</h2>
     <p class="text-slate-500 max-w-2xl mx-auto" data-i18n="programme_online.levels_subtitle">Du débutant absolu jusqu'à la certification — une progression structurée et un accompagnement adapté à chaque apprenant.</p>
    </div>

    <div class="max-w-3xl mx-auto space-y-4">

     <!-- N1 Initial -->
     <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 reveal soft-card level-card">
      <div class="flex items-start gap-4">
       <div class="shrink-0 text-center">
        <span class="level-num inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white text-sm font-bold">1</span>
       </div>
       <div class="flex-1">
        <div class="flex flex-wrap items-center gap-2 mb-2">
         <h3 class="font-extrabold text-slate-900 text-lg">Initial</h3>
         <span class="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full" data-i18n="programme_online.lvl1_tag">Débutants complets</span>
        </div>
        <ul class="text-sm text-slate-600 space-y-1 mb-3">
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-primary text-xs"></i> <span data-i18n="programme_online.lvl1_feat1">Apprentissage de l'alphabet arabe</span></li>
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-primary text-xs"></i> <span data-i18n="programme_online.lvl1_feat2">Lecture de syllabes, mots et phrases simples</span></li>
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-primary text-xs"></i> <span data-i18n="programme_online.lvl1_feat3">Introduction à la lecture de versets du Coran</span></li>
        </ul>
        <div class="flex items-center gap-2 bg-primary/5 border-l-4 border-primary rounded-r-lg px-3 py-2 text-xs text-primary font-semibold">
         <i class="fas fa-bullseye shrink-0"></i> <span data-i18n="programme_online.lvl1_goal">Objectif : Lire les versets du Coran de manière autonome et correcte</span>
        </div>
       </div>
      </div>
     </div>

     <!-- N2 Irtiqâ -->
     <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 reveal soft-card level-card">
      <div class="flex items-start gap-4">
       <div class="shrink-0">
        <span class="level-num inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white text-sm font-bold">2</span>
       </div>
       <div class="flex-1">
        <div class="flex flex-wrap items-center gap-2 mb-2">
         <h3 class="font-extrabold text-slate-900 text-lg">Irtiqâ' <span class="arabic-text text-base font-normal text-slate-500">(ارتقاء)</span></h3>
         <span class="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full" data-i18n="programme_online.lvl2_tag">Améliorer la lecture</span>
        </div>
        <ul class="text-sm text-slate-600 space-y-1 mb-3">
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-primary text-xs"></i> <span data-i18n="programme_online.lvl2_feat1">Correction des erreurs de lecture</span></li>
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-primary text-xs"></i> <span data-i18n="programme_online.lvl2_feat2">Fluidité et articulation</span></li>
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-primary text-xs"></i> <span data-i18n="programme_online.lvl2_feat3">Introduction aux premières règles du Tajwid</span></li>
        </ul>
        <div class="flex items-center gap-2 bg-primary/5 border-l-4 border-primary rounded-r-lg px-3 py-2 text-xs text-primary font-semibold">
         <i class="fas fa-bullseye shrink-0"></i> <span data-i18n="programme_online.lvl2_goal">Objectif : Meilleure prononciation et lecture plus belle et plus fluide</span>
        </div>
       </div>
      </div>
     </div>

     <!-- N3 Tazkiya -->
     <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 reveal soft-card level-card">
      <div class="flex items-start gap-4">
       <div class="shrink-0">
        <span class="level-num inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white text-sm font-bold">3</span>
       </div>
       <div class="flex-1">
        <div class="flex flex-wrap items-center gap-2 mb-2">
         <h3 class="font-extrabold text-slate-900 text-lg">Tazkiya <span class="arabic-text text-base font-normal text-slate-500">(تزكية)</span></h3>
         <span class="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full" data-i18n="programme_online.lvl3_tag">Tajwid &amp; Spiritualité</span>
        </div>
        <ul class="text-sm text-slate-600 space-y-1 mb-3">
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-primary text-xs"></i> <span data-i18n="programme_online.lvl3_feat1">Application des règles du Tajwid en récitation</span></li>
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-primary text-xs"></i> <span data-i18n="programme_online.lvl3_feat2">Récitation lente et réfléchie</span></li>
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-primary text-xs"></i> <span data-i18n="programme_online.lvl3_feat3">Tawhid (fondements de la foi islamique)</span></li>
        </ul>
        <div class="flex items-center gap-2 bg-primary/5 border-l-4 border-primary rounded-r-lg px-3 py-2 text-xs text-primary font-semibold">
         <i class="fas fa-bullseye shrink-0"></i> <span data-i18n="programme_online.lvl3_goal">Objectif : Récitation conforme au Tajwid et bases solides en Tawhid</span>
        </div>
       </div>
      </div>
     </div>

     <!-- N4 Itqân -->
     <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 reveal soft-card level-card">
      <div class="flex items-start gap-4">
       <div class="shrink-0">
        <span class="level-num inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white text-sm font-bold">4</span>
       </div>
       <div class="flex-1">
        <div class="flex flex-wrap items-center gap-2 mb-2">
         <h3 class="font-extrabold text-slate-900 text-lg">Itqân <span class="arabic-text text-base font-normal text-slate-500">(إتقان)</span></h3>
         <span class="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full" data-i18n="programme_online.lvl4_tag">Maîtrise avancée</span>
        </div>
        <ul class="text-sm text-slate-600 space-y-1 mb-3">
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-primary text-xs"></i> <span data-i18n="programme_online.lvl4_feat1">Maîtrise avancée du Tajwid</span></li>
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-primary text-xs"></i> <span data-i18n="programme_online.lvl4_feat2">Récitation fluide et conforme</span></li>
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-primary text-xs"></i> <span data-i18n="programme_online.lvl4_feat3">Tawhid approfondi + introduction au Fiqh</span></li>
        </ul>
        <div class="flex items-center gap-2 bg-primary/5 border-l-4 border-primary rounded-r-lg px-3 py-2 text-xs text-primary font-semibold">
         <i class="fas fa-bullseye shrink-0"></i> <span data-i18n="programme_online.lvl4_goal">Objectif : Maîtrise complète de la récitation et des sciences islamiques fondamentales</span>
        </div>
       </div>
      </div>
     </div>

     <!-- N5 Ijâza -->
     <div class="bg-gradient-to-r from-primary/5 to-teal-50 rounded-2xl p-6 shadow-sm border border-primary/20 reveal soft-card level-card">
      <div class="flex items-start gap-4">
       <div class="shrink-0">
        <span class="level-num inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-gray-900 text-sm font-bold">5</span>
       </div>
       <div class="flex-1">
        <div class="flex flex-wrap items-center gap-2 mb-2">
         <h3 class="font-extrabold text-slate-900 text-lg">Ijâza <span class="arabic-text text-base font-normal text-slate-500">(إجازة)</span></h3>
         <span class="text-xs font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full" data-i18n="programme_online.lvl5_tag">Certification — Ijâza</span>
        </div>
        <ul class="text-sm text-slate-600 space-y-1 mb-3">
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-secondary text-xs"></i> <span data-i18n="programme_online.lvl5_feat1">Préparation à la certification</span></li>
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-secondary text-xs"></i> <span data-i18n="programme_online.lvl5_feat2">Récitation évaluée par un maître qualifié</span></li>
         <li class="flex items-center gap-2"><i class="fas fa-check-circle text-secondary text-xs"></i> <span data-i18n="programme_online.lvl5_feat3">Obtention de l'Ijaza (autorisation de transmission)</span></li>
        </ul>
        <div class="flex items-center gap-2 bg-secondary/10 border-l-4 border-secondary rounded-r-lg px-3 py-2 text-xs text-amber-700 font-semibold">
         <i class="fas fa-award shrink-0"></i> <span data-i18n="programme_online.lvl5_goal">Objectif : Certification attestant la maîtrise de la récitation du Noble Coran</span>
        </div>
       </div>
      </div>
     </div>

    </div><!-- /niveaux -->
   </div>
  </section>"""

# ─── APPLY ALL REPLACEMENTS ───────────────────────────────────────────────────
changes = [
    ('CSS animations', OLD_STYLE, NEW_STYLE),
    ('Tarifs section', OLD_TARIFS, NEW_TARIFS),
    ('Niveaux section', OLD_NIVEAUX, NEW_NIVEAUX),
]

ok = 0
for label, old, new in changes:
    if old in c:
        c = c.replace(old, new, 1)
        ok += 1
        print(f'OK: {label}')
    else:
        print(f'NOT FOUND: {label}')

if ok == len(changes):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print(f'\nAll {ok} patches applied and saved.')
else:
    print(f'\nOnly {ok}/{len(changes)} patches found. File NOT saved.')
