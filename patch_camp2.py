# -*- coding: utf-8 -*-
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

path = r'C:\Users\7MAKSACOD PC\Desktop\Daara Al Amine Academy\SITE WEB AAA\camp-vacances.html'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

PATCHES = []

# ── 1. Hero image path ─────────────────────────────────────────────────────────
PATCHES.append((
    "url('/assets/img/camp-vacances-hero.jpg')",
    "url('assets/img/camp-vacances-hero.jpg')"
))

# ── 2. Programme A card ────────────────────────────────────────────────────────
PATCHES.append((
'''          <!-- PROGRAMME A -->
          <div class="program-card-a rounded-3xl p-8 shadow-lg card-hover relative overflow-hidden reveal reveal-left">
            <div class="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-20 -mt-20"></div>
            <div class="relative z-10">
              <div class="flex items-start gap-4 mb-5">
                <div class="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-md flex-shrink-0">
                  <i class="fas fa-city text-white text-xl"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-bold text-primary uppercase tracking-wider">Programme A</p>
                  <h3 class="text-2xl font-extrabold text-gray-900">Cité des Magistrats</h3>
                  <p class="text-sm text-gray-500 mt-1"><i class="fas fa-map-marker-alt mr-1 text-primary"></i> Dakar</p>
                </div>
              </div>

              <div class="bg-blue-50 rounded-xl p-3 mb-5 flex items-center gap-2">
                <i class="fas fa-users text-primary"></i>
                <p class="text-sm text-primary-dark font-semibold">Filles &amp; garçons — tous âges</p>
              </div>

              <div class="text-center py-5 mb-5 border-y border-gray-200">
                <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">À partir de</p>
                <p class="text-5xl font-extrabold text-primary-dark">100 000<span class="text-base ml-1 font-medium text-gray-600">F</span></p>
                <p class="text-sm text-gray-500 mt-1">FCFA / mois — internat complet</p>
              </div>

              <h4 class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3"><i class="fas fa-check-circle text-green-500 mr-1"></i> Inclus</h4>
              <ul class="space-y-2 mb-5 text-sm">
                <li class="flex items-start gap-2 text-gray-700"><i class="fas fa-fist-raised text-primary mt-0.5"></i><span><strong>Self-défense</strong> — apprendre à se défendre</span></li>
                <li class="flex items-start gap-2 text-gray-700"><i class="fas fa-puzzle-piece text-primary mt-0.5"></i><span><strong>Activités ludiques</strong> — créativité &amp; vie en groupe</span></li>
              </ul>

              <h4 class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3"><i class="fas fa-plus-circle text-amber-500 mr-1"></i> Options à ajouter</h4>
              <ul class="space-y-2 mb-6 text-sm">
                <li class="flex items-center justify-between bg-amber-50 rounded-lg px-3 py-2 text-gray-700">
                  <span class="flex items-center gap-2"><span>🧺</span><strong>Linge</strong></span>
                  <span class="font-bold text-amber-700 text-xs">+ 5 000 F / mois</span>
                </li>
                <li class="flex items-center justify-between bg-amber-50 rounded-lg px-3 py-2 text-gray-700">
                  <span class="flex items-center gap-2"><span>🍪</span><strong>Goûter</strong></span>
                  <span class="font-bold text-amber-700 text-xs">+ 5 000 F / mois</span>
                </li>
              </ul>

              <a href="#inscription" class="block text-center bg-primary hover:bg-primary-dark text-white py-3 rounded-full font-bold text-sm transition shadow-md">
                Choisir ce programme <i class="fas fa-arrow-right ml-1"></i>
              </a>
            </div>
          </div>''',
'''          <!-- PROGRAMME A -->
          <div class="rounded-3xl overflow-hidden shadow-lg card-hover reveal reveal-left" style="border-top:4px solid #1e7a9a;background:linear-gradient(155deg,#fff 0%,#f0f9fc 100%);">
            <!-- Cover photo -->
            <div class="prog-card-photo relative h-52">
              <img src="assets/img/camp-prog-a.jpg" alt="Programme A — Cité des Magistrats, self-défense" class="w-full h-full object-cover" loading="lazy">
              <div class="absolute inset-0 bg-gradient-to-t from-primary-dark/85 via-primary/30 to-transparent"></div>
              <div class="absolute bottom-0 left-0 p-5">
                <p class="text-xs font-bold text-white/75 uppercase tracking-widest">Programme A</p>
                <h3 class="text-2xl font-extrabold text-white drop-shadow">Cité des Magistrats</h3>
                <p class="text-sm text-white/80 mt-0.5"><i class="fas fa-map-marker-alt mr-1"></i> Dakar</p>
              </div>
              <div class="absolute top-3 right-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 text-[10px] text-white font-bold uppercase tracking-wider">
                <i class="fas fa-users mr-1"></i> Filles &amp; garçons
              </div>
            </div>
            <!-- Content -->
            <div class="p-8 relative overflow-hidden">
              <div class="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-20 -mt-20"></div>
              <div class="relative z-10">
                <div class="text-center py-5 mb-5 border-y border-gray-200">
                  <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">À partir de</p>
                  <p class="text-5xl font-extrabold text-primary-dark">100 000<span class="text-base ml-1 font-medium text-gray-600">F</span></p>
                  <p class="text-sm text-gray-500 mt-1">FCFA / mois — internat complet</p>
                </div>
                <h4 class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3"><i class="fas fa-check-circle text-green-500 mr-1"></i> Inclus</h4>
                <ul class="space-y-2 mb-5 text-sm">
                  <li class="flex items-start gap-2 text-gray-700"><i class="fas fa-fist-raised text-primary mt-0.5"></i><span><strong>Self-défense</strong> — apprendre à se défendre</span></li>
                  <li class="flex items-start gap-2 text-gray-700"><i class="fas fa-puzzle-piece text-primary mt-0.5"></i><span><strong>Activités ludiques</strong> — créativité &amp; vie en groupe</span></li>
                </ul>
                <h4 class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3"><i class="fas fa-plus-circle text-amber-500 mr-1"></i> Options à ajouter</h4>
                <ul class="space-y-2 mb-6 text-sm">
                  <li class="flex items-center justify-between bg-amber-50 rounded-lg px-3 py-2 text-gray-700">
                    <span class="flex items-center gap-2"><i class="fas fa-tshirt text-amber-600"></i><strong>Linge</strong></span>
                    <span class="font-bold text-amber-700 text-xs">+ 5 000 F / mois</span>
                  </li>
                  <li class="flex items-center justify-between bg-amber-50 rounded-lg px-3 py-2 text-gray-700">
                    <span class="flex items-center gap-2"><i class="fas fa-cookie-bite text-amber-600"></i><strong>Goûter</strong></span>
                    <span class="font-bold text-amber-700 text-xs">+ 5 000 F / mois</span>
                  </li>
                </ul>
                <a href="#inscription" class="block text-center bg-primary hover:bg-primary-dark text-white py-3 rounded-full font-bold text-sm transition shadow-md">
                  Choisir ce programme <i class="fas fa-arrow-right ml-1"></i>
                </a>
              </div>
            </div>
          </div>'''
))

# ── 3. Programme B card ────────────────────────────────────────────────────────
PATCHES.append((
'''          <!-- PROGRAMME B -->
          <div class="program-card-b rounded-3xl p-8 shadow-lg card-hover relative overflow-hidden reveal reveal-right">
            <div class="absolute top-3 right-3 bg-secondary text-gray-900 text-[10px] font-extrabold px-3 py-1 rounded-full shadow uppercase tracking-wider btn-shimmer">Tout inclus</div>
            <div class="absolute top-0 right-0 w-48 h-48 bg-secondary/5 rounded-full -mr-20 -mt-20 btn-shimmer"></div>
            <div class="relative z-10">
              <div class="flex items-start gap-4 mb-5">
                <div class="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center shadow-md flex-shrink-0">
                  <i class="fas fa-water text-white text-xl"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-bold text-secondary-dark uppercase tracking-wider">Programme B</p>
                  <h3 class="text-2xl font-extrabold text-gray-900">Villa de la Petite Côte</h3>
                  <p class="text-sm text-gray-500 mt-1"><i class="fas fa-map-marker-alt mr-1 text-secondary"></i> Ngérigne — près de Somone, Mbour</p>
                </div>
              </div>

              <div class="bg-amber-50 rounded-xl p-3 mb-5 flex items-center gap-2">
                <i class="fas fa-mars text-secondary-dark"></i>
                <p class="text-sm text-amber-900 font-semibold">Garçons à partir de 8 ans uniquement</p>
              </div>

              <div class="text-center py-5 mb-5 border-y border-amber-200">
                <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Forfait tout inclus</p>
                <p class="text-5xl font-extrabold text-secondary-dark">130 000<span class="text-base ml-1 font-medium text-gray-600">F</span></p>
                <p class="text-sm text-gray-500 mt-1">FCFA / mois — toutes activités</p>
              </div>

              <h4 class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3"><i class="fas fa-star text-secondary mr-1"></i> Activités incluses</h4>
              <ul class="space-y-2 mb-5 text-sm">
                <li class="flex items-start gap-2 text-gray-700"><span class="text-base">🏊</span><span><strong>Natation</strong> — piscine sur place</span></li>
                <li class="flex items-start gap-2 text-gray-700"><span class="text-base">🏀</span><span><strong>Basketball</strong> — terrain dédié</span></li>
                <li class="flex items-start gap-2 text-gray-700"><span class="text-base">⚽</span><span><strong>Baby-foot</strong> — loisir d\'intérieur</span></li>
              </ul>

              <div class="bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl p-4 text-white mb-6 flex items-center gap-3">
                <div class="relative w-14 h-14 flex-shrink-0">
                  <svg class="w-14 h-14 -rotate-90" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="32" stroke="rgba(255,255,255,0.15)" stroke-width="9" fill="none"/>
                    <circle cx="40" cy="40" r="32" stroke="#f59e0b" stroke-width="9" fill="none" stroke-dasharray="160.84 200" stroke-linecap="round"/>
                  </svg>
                  <div class="absolute inset-0 flex items-center justify-center text-sm font-extrabold">80%</div>
                </div>
                <div>
                  <p class="text-[10px] uppercase tracking-wider text-white/70">du programme</p>
                  <p class="font-bold leading-tight">Coran &amp; religion</p>
                </div>
              </div>

              <a href="#inscription" class="block text-center bg-secondary hover:bg-secondary-dark text-gray-900 py-3 rounded-full font-bold text-sm transition shadow-md btn-shimmer">
                Choisir ce programme <i class="fas fa-arrow-right ml-1"></i>
              </a>
            </div>
          </div>''',
'''          <!-- PROGRAMME B -->
          <div class="rounded-3xl overflow-hidden shadow-lg card-hover reveal reveal-right" style="border-top:4px solid #f59e0b;background:linear-gradient(155deg,#fff 0%,#fef9ec 100%);">
            <!-- Cover photo -->
            <div class="prog-card-photo relative h-52">
              <img src="assets/img/camp-prog-b.jpg" alt="Programme B — Villa Petite Côte Mbour" class="w-full h-full object-cover" loading="lazy">
              <div class="absolute inset-0 bg-gradient-to-t from-amber-900/85 via-amber-800/30 to-transparent"></div>
              <div class="absolute top-3 right-3 bg-secondary text-gray-900 text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow badge-pulse uppercase tracking-wider">Tout inclus</div>
              <div class="absolute bottom-0 left-0 p-5">
                <p class="text-xs font-bold text-amber-200 uppercase tracking-widest">Programme B</p>
                <h3 class="text-2xl font-extrabold text-white drop-shadow">Villa de la Petite Côte</h3>
                <p class="text-sm text-white/80 mt-0.5"><i class="fas fa-map-marker-alt mr-1"></i> Ngérigne — Mbour</p>
              </div>
              <div class="absolute top-3 left-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 text-[10px] text-white font-bold uppercase tracking-wider">
                <i class="fas fa-mars mr-1"></i> Garçons 8 ans+
              </div>
            </div>
            <!-- Content -->
            <div class="p-8 relative overflow-hidden">
              <div class="absolute top-0 right-0 w-48 h-48 bg-secondary/5 rounded-full -mr-20 -mt-20"></div>
              <div class="relative z-10">
                <div class="text-center py-5 mb-5 border-y border-amber-200">
                  <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Forfait tout inclus</p>
                  <p class="text-5xl font-extrabold text-secondary-dark">130 000<span class="text-base ml-1 font-medium text-gray-600">F</span></p>
                  <p class="text-sm text-gray-500 mt-1">FCFA / mois — toutes activités</p>
                </div>
                <h4 class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3"><i class="fas fa-star text-secondary mr-1"></i> Activités incluses</h4>
                <ul class="space-y-2 mb-5 text-sm">
                  <li class="flex items-start gap-2 text-gray-700"><i class="fas fa-swimming-pool text-secondary mt-0.5"></i><span><strong>Natation</strong> — piscine sur place</span></li>
                  <li class="flex items-start gap-2 text-gray-700"><i class="fas fa-basketball-ball text-secondary mt-0.5"></i><span><strong>Basketball</strong> — terrain dédié</span></li>
                  <li class="flex items-start gap-2 text-gray-700"><i class="fas fa-table-tennis text-secondary mt-0.5"></i><span><strong>Baby-foot</strong> — loisir d\'intérieur</span></li>
                </ul>
                <div class="bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl p-4 text-white mb-6 flex items-center gap-3">
                  <div class="relative w-14 h-14 flex-shrink-0">
                    <svg class="w-14 h-14 -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="32" stroke="rgba(255,255,255,0.15)" stroke-width="9" fill="none"/>
                      <circle cx="40" cy="40" r="32" stroke="#f59e0b" stroke-width="9" fill="none" stroke-dasharray="160.84 200" stroke-linecap="round"/>
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center text-sm font-extrabold">80%</div>
                  </div>
                  <div>
                    <p class="text-[10px] uppercase tracking-wider text-white/70">du programme</p>
                    <p class="font-bold leading-tight">Coran &amp; religion</p>
                  </div>
                </div>
                <a href="#inscription" class="block text-center bg-secondary hover:bg-secondary-dark text-gray-900 py-3 rounded-full font-bold text-sm transition shadow-md btn-shimmer">
                  Choisir ce programme <i class="fas fa-arrow-right ml-1"></i>
                </a>
              </div>
            </div>
          </div>'''
))

ok = 0
for old, new in PATCHES:
    if old in c:
        c = c.replace(old, new, 1)
        ok += 1
        print(f'OK ({ok}/{len(PATCHES)}): {old[:55].strip()!r}...')
    else:
        print(f'NOT FOUND: {old[:55].strip()!r}...')

if ok == len(PATCHES):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print(f'\nSaved. {ok}/{len(PATCHES)} patches applied.')
else:
    print(f'\nFile NOT saved — only {ok}/{len(PATCHES)} matched.')
