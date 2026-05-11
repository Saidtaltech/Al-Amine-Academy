# Bonjour Said — état du site au réveil

## Ce qui a été corrigé pendant ton sommeil

Le hero qui s'affichait vide en ligne était causé par **AOS (la bibliothèque d'animations)** qui mettait `opacity: 0` sur les blocs et ne réussissait pas à les ré-afficher en production (CDN lent, cache LiteSpeed, ou JS bloqué côté visiteur).

### Trois mesures de blindage appliquées

1. **Override CSS inline dans le `<head>` de toutes les 34 pages HTML.** Une règle `[data-aos] { opacity: 1 !important; transform: none !important; transition: none !important; }` est injectée **après** le CSS d'AOS — donc même si AOS JS ne charge jamais, le contenu est visible immédiatement. Fini les hero vides.

2. **`lang.js` renforcé.** Il injecte la même règle de secours dès l'exécution, applique les traductions sans attendre `DOMContentLoaded` si possible, et n'a plus de timeout de 3 secondes (le contenu n'est plus jamais caché).

3. **Cache-buster `?v=20260429b`.** Toutes les références à `lang.js` et `translations.js` ont ce suffixe — Hostinger LiteSpeed et le navigateur du visiteur sont obligés de re-télécharger les nouveaux fichiers.

---

## Ce qu'il te reste à faire (1 clic)

Pour mettre tout ça en ligne, **double-clique sur `PUSH-MISE-A-JOUR.cmd`** à la racine du dossier. Ça va :

1. `git add` tous les fichiers modifiés
2. `git commit` avec un message clair
3. `git push origin main` → GitHub → Hostinger redéploie automatiquement

Si pour une raison quelconque le `.cmd` n'aboutit pas, ouvre PowerShell dans le dossier et tape :

```powershell
git add .
git commit -m "fix: contenu visible meme si AOS/CDN echoue"
git push origin main
```

---

## Vérification après déploiement

1. Ouvre https://alamineacademy.com
2. Fais **Ctrl+Shift+R** (recharge sans cache)
3. Le hero doit afficher : « Offrez à votre enfant une éducation coranique d'excellence » + le sous-texte + les deux CTAs + la barre de stats (4.9/5, 200+, 3, 2023)
4. Clique sur **EN** en haut à droite → tout doit basculer en anglais avec un toast en bas à gauche
5. Clique sur **ع** → bascule en arabe + RTL automatique
6. Scrolle → la bande tarifs jaune doit apparaître, puis les sections « Les défis des parents », « Nous comprenons vos inquiétudes », etc.

Si le site est encore vide après Ctrl+Shift+R :
- Va dans hPanel → **Avancé → LiteSpeed Cache → Vider tout**
- Recharge la page

---

## État du site actuel : ~98 %

| Fait | Statut |
|---|---|
| Contenu FR/EN/AR/ES sur 23 pages + 11 articles blog | ✓ |
| Sélecteur de langue fonctionnel partout | ✓ |
| Formulaire d'inscription WhatsApp pré-rempli | ✓ |
| FAQ admission (10 questions) | ✓ |
| Bande tarifs sous le hero | ✓ |
| Couleurs unifiées `#1e7a9a` + `#f59e0b` | ✓ |
| Liens sociaux Facebook / Instagram / YouTube réels | ✓ |
| Sitemap, robots.txt, hreflang, canonical | ✓ |
| `.htaccess` (Hostinger) + `_redirects` (Netlify) + `vercel.json` | ✓ |
| **Résilience anti-AOS** (le fix de cette nuit) | ✓ |
| Page 404 personnalisée traduite | ✓ |
| Animations AOS (par défaut désactivées) | ⚠️ désactivées au profit de la visibilité — c'est volontaire |
| 22 photos réelles dans `assets/img/` | ❌ à déposer |
| Tailwind compilé en local (gain ~280 KB par page) | ❌ optionnel |
| Soumission Google Search Console | ❌ à faire |

---

## Notes techniques

- Les animations AOS (fade-up, fade-right, etc.) ne s'animent plus à l'apparition. Le contenu apparaît directement. C'est un compromis volontaire : visibilité du contenu > effets visuels.
- Si tu veux retrouver les animations un jour, il suffit de retirer la règle `[data-aos]{opacity:1!important...}` de `lang.js` ET du `<style data-aaa-inline-resilience>` de chaque page. Mais je te recommande de **garder le filet** — c'est ce qui te garantit qu'aucun visiteur ne tombera sur une page vide.
- Les fichiers ont tous le tag `?v=20260429b`. Quand tu modifies à nouveau `lang.js` ou `translations.js`, il suffit de bumper ce numéro dans tous les HTML pour forcer le rechargement (par exemple `v=20260430`).

Bonne journée — et bonne mise en ligne.
