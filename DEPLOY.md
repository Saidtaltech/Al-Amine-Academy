# Déployer alamineacademy.com

Le site est 100 % statique : HTML + CSS + JS + assets. Aucune base de données, aucun backend. Donc déploiement très simple, gratuit dans la plupart des cas.

Choisis l'option qui te convient — toutes sont configurées et prêtes.

---

## Option 1 — Netlify (le plus simple, gratuit, recommandé)

1. Va sur https://app.netlify.com/signup et crée un compte (gratuit, login Google ou GitHub).
2. Sur le dashboard, clique **« Add new site » → « Deploy manually »**.
3. Glisse-dépose le **dossier complet** `SITE WEB AAA` dans la zone indiquée.
4. Le site est en ligne en ~30 secondes sur une URL temporaire `xxx.netlify.app`.
5. Onglet **« Domain settings »** → **« Add custom domain »** → entre `alamineacademy.com` et suis les instructions DNS.
6. Le HTTPS Let's Encrypt est activé automatiquement.

Les fichiers `_redirects` et `_headers` sont déjà présents — ils gèrent le 404 personnalisé, les en-têtes de sécurité et le cache navigateur.

**Mises à jour ultérieures** : tu glisses le dossier de nouveau, ou tu connectes le repo Git et chaque `git push` redéploie automatiquement.

---

## Option 2 — Vercel (alternative au même niveau que Netlify)

1. https://vercel.com/signup
2. **« Add New Project »** → upload le dossier (ou via Git).
3. Aucune configuration à faire — `vercel.json` est déjà présent.
4. URL `xxx.vercel.app` instantanée, custom domain en quelques clics.

---

## Option 3 — Hébergement classique OVH / cPanel / FTP

1. Connecte-toi en FTP (FileZilla, Cyberduck) avec les identifiants fournis par ton hébergeur.
2. Place tous les fichiers du dossier `SITE WEB AAA` dans `www/` ou `public_html/` (selon l'hébergeur).
3. Le `.htaccess` (déjà présent) prend en charge :
   - Redirection HTTPS forcée
   - Page 404 personnalisée
   - Compression gzip
   - Cache navigateur
   - URLs propres (`/a-propos` au lieu de `/a-propos.html`)
4. Ouvre https://alamineacademy.com pour vérifier.

**Si l'apperçu local en file:// fonctionne** mais pas en ligne : vérifier que `mod_rewrite` est activé chez ton hébergeur (généralement OUI sur OVH mutualisé).

---

## Option 4 — GitHub Pages (gratuit, pour repo public)

1. Crée un repo GitHub `alamineacademy.github.io` (ou autre nom).
2. Pousse tout le contenu :
   ```bash
   cd "SITE WEB AAA"
   git init
   git add .
   git commit -m "Site initial"
   git remote add origin git@github.com:tonuser/alamineacademy.github.io.git
   git push -u origin main
   ```
3. Settings → Pages → Source = `main` branch / root.
4. Ton site est en ligne sur `https://tonuser.github.io/alamineacademy.github.io/`.
5. Pour le custom domain `alamineacademy.com` : Settings → Pages → Custom domain.

Note : GitHub Pages ne lit pas `.htaccess` (Apache) ni `_redirects` (Netlify), mais le site fonctionne quand même — juste sans redirections HTTPS forcées et sans URLs propres `/a-propos` (il faudra `/a-propos.html`).

---

## Avant de déployer — checklist finale

- [x] **23 pages HTML** taguées avec `data-i18n` (FR, EN, AR, ES)
- [x] **`translations.js` inline** — aucun fetch nécessaire (marche en file://)
- [x] **`lang.js`** avec toast feedback, RTL automatique, fallback AOS / Font Awesome
- [x] **Footer cohérent** sur toutes les pages
- [x] **Liens sociaux** réels (Facebook, Instagram, YouTube, WhatsApp)
- [x] **Sitemap.xml** + **robots.txt** à jour
- [x] **Meta descriptions uniques** sur chaque page
- [x] **Bande tarifs** sous le hero
- [x] **FAQ enrichie** sur admission (10 questions)
- [x] **Formulaire WhatsApp intégré** sur admission
- [x] **Couleur secondary unifiée** (`#f59e0b` partout)
- [x] **Touch targets ≥ 44 px** sur le sélecteur de langue
- [ ] **Images réelles** : à déposer dans `assets/img/` selon `IMAGES-A-DEPOSER.md` (le site fonctionne sans, fallback gradient + icône)
- [ ] **Compilation Tailwind** (optionnel, gain ~280 KB par page) : voir section ci-dessous

---

## Compiler Tailwind pour la production (optionnel mais recommandé)

Actuellement, Tailwind est chargé via CDN (`cdn.tailwindcss.com`), ce qui ajoute ~300 KB par page. Pour passer à 10–15 KB :

```bash
# 1. Installe Tailwind CLI (Node.js requis)
npm install -D tailwindcss

# 2. Crée un input.css minimal
echo "@tailwind base; @tailwind components; @tailwind utilities;" > input.css

# 3. Compile en production
npx tailwindcss -i input.css -o assets/css/tailwind.min.css --content "./*.html,./blog/*.html" --minify

# 4. Sur chaque HTML, remplace
#   <script src="https://cdn.tailwindcss.com"></script>
# par
#   <link rel="stylesheet" href="assets/css/tailwind.min.css">
```

À faire une seule fois avant déploiement final.

---

## Suivi post-déploiement

1. **Google Search Console** : ajouter `alamineacademy.com`, soumettre `sitemap.xml`.
2. **Google Analytics 4 (optionnel)** : créer une propriété, coller le code de mesure dans le `<head>` de chaque HTML.
3. **Google My Business** : vérifier que le profil de l'école pointe vers `alamineacademy.com` (le site lui-même renvoie déjà vers GMB pour les avis).

---

## Reprise du dépôt par un autre développeur

Tout est dans le dossier — pas de build step requis. Cloner le repo et ouvrir `index.html` dans un navigateur suffit pour développer en local.

Pour les modifications de traductions : éditer **uniquement** `translations.js` (les fichiers JSON sont des copies pour les développeurs ; le runtime utilise le JS inline).
