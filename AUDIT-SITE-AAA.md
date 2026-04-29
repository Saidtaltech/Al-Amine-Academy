# Audit Complet — Site Web DAARA Al Amine Academy
**Date :** 25 mars 2026
**URL cible :** alamineacademy.com
**Fichiers analysés :** 31 fichiers (HTML, JS, JSON, XML, PNG)

---

## BUGS CRITIQUES (à corriger immédiatement)

### 1. `programme-mixte.html` est vide (0 octets)
Le fichier existe mais ne contient aucun contenu. Toute personne qui y accède verra une page blanche. Il faut soit le remplir avec du contenu, soit le supprimer du repo et retirer les liens qui pointent vers lui.

### 2. Liens internes cassés (20+ liens brisés)
Plusieurs pages contiennent des liens vers des fichiers inexistants :
- `English.html`, `ar.html`, `es.html` — pages de langue qui n'existent pas
- `actions-sociales.html`, `cercles-etude.html`, `conferences-islamiques.html` — pages communautaires inexistantes
- Depuis les articles du blog : liens vers `ecole-coranique-dakar-inscription-2026.html` (sans le préfixe `blog/`), `meilleurs-daara-dakar-2025.html`, etc.
- `blog/daara-moderne-vs-traditionnel-2025.html` — le vrai fichier s'appelle `daara-moderne-vs-traditionnel.html` (sans le "-2025")
- `/programme-internat.html` (chemin absolu au lieu de relatif)

### 3. Système de traduction incohérent
Deux systèmes coexistent sur le site :
- **index.html, admission.html, blog.html** : utilisent `lang.js` (le bon système, avec fichiers JSON)
- **a-propos.html, contact.html, galerie.html, temoignages.html** : ont un `switchLanguage()` vide qui ne fait rien (`console.log` uniquement)

Résultat : le changement de langue ne fonctionne que sur certaines pages.

### 4. Contenu placeholder visible par les visiteurs
- **index.html** : "Remplacez par une vraie photo" (section hero)
- **galerie.html** : "Remplacez ces placeholders par vos vraies photos et vidéos"
- **temoignages.html** : "Remplacez par vos vrais témoignages Google"

---

## SEO — Problèmes importants

### 5. Meta descriptions dupliquées
8 pages sur 11 partagent seulement 2 descriptions génériques. Chaque page devrait avoir sa propre description unique :
- `a-propos.html`, `contact.html`, `galerie.html`, `temoignages.html` → même description générique
- `admission.html`, `programme-cours-en-ligne.html`, `programme-cours-gratuits.html`, `programme-internat.html` → même description générique
- **Seuls** `index.html`, `blog.html` et `programme-tahfiz-academique.html` ont des descriptions uniques

### 6. `Information_Sheet_Al_Amine_Academy.html` sans meta description ni favicon
Ce fichier n'a ni balise `<meta name="description">`, ni `<link rel="icon">`.

### 7. `admission.html` absent de la navigation
La page existe et est dans le sitemap, mais aucun lien dans le menu ne pointe vers elle. Les visiteurs ne peuvent la trouver que par recherche Google.

### 8. `programme-mixte.html` absent du sitemap
Le fichier (vide) n'est pas dans `sitemap.xml` — ce qui est correct vu qu'il est vide, mais il faudra l'ajouter si le contenu est créé.

### 9. Tailwind CSS chargé via CDN (performance)
Les 20 pages HTML chargent Tailwind depuis `cdn.tailwindcss.com`. Ce CDN est conçu pour le développement, pas pour la production. Le fichier JS fait ~300KB et ralentit chaque chargement de page. En production, il faut compiler Tailwind pour ne garder que les classes utilisées (résultat : ~10-15KB au lieu de ~300KB).

### 10. Aucune image réelle
Le site n'a qu'une seule image (`LogoAAA.png`). Toutes les "photos" sont des placeholders avec des icônes Font Awesome. Google Image ne référencera rien, et les visiteurs verront un site sans visuels.

---

## DESIGN & UX

### 11. Pas de page 404 personnalisée
Si un visiteur tape une mauvaise URL, il verra la page 404 par défaut du serveur.

### 12. Navigation : page Témoignages absente du menu
`temoignages.html` existe mais n'est pas dans le menu principal. Même problème pour `admission.html`.

### 13. Mobile : menu hamburger peut ne pas fonctionner
La fonction `toggleMenu()` est définie en bas de page dans certains fichiers. Si le JS n'a pas fini de charger, le bouton ne répondra pas.

### 14. Bouton WhatsApp : numéro cohérent
Le numéro WhatsApp (+221 77 774 37 00) est cohérent sur toutes les pages — c'est bien.

### 15. Formulaire d'inscription = Google Forms externe
Le CTA principal "S'inscrire" renvoie vers un Google Forms. C'est fonctionnel mais peu professionnel. Un formulaire intégré au site améliorerait la conversion et l'image de marque.

---

## CONTENU & TEXTES

### 16. TODO dans le code source
`index.html` contient le commentaire `// TODO: Implémenter la traduction complète` dans le JavaScript inline.

### 17. Doublon blog : "meilleurs-daara-dakar-2025" existe en 2 versions
- `blog/meilleurs-daara-dakar-2025.html` (24 KB)
- `blog/les-10-meilleurs-daara-dakar-2025.html` (48 KB)

Ces deux articles traitent du même sujet et risquent de se cannibaliser en SEO.

### 18. Traductions JSON incomplètes
Les fichiers `translations-*.json` ne couvrent que le menu, le footer, le hero et les contacts. Tout le contenu des pages (titres de sections, descriptions de programmes, prix, etc.) n'est pas traduit. Le site est essentiellement en français uniquement malgré le sélecteur de langue.

---

## PERFORMANCE

### 19. Chaque page charge 4 ressources externes lourdes
- `cdn.tailwindcss.com` (~300KB JS)
- `fonts.googleapis.com` (2 polices)
- `cdnjs.cloudflare.com/font-awesome` (~90KB CSS)
- `unpkg.com/aos` (animation)

Total : ~500KB+ de ressources externes avant même d'afficher du contenu. Recommandation : compiler Tailwind, n'inclure que les icônes Font Awesome utilisées, et charger AOS uniquement sur les pages qui l'utilisent.

### 20. Pas de compression d'images
Le seul fichier image (LogoAAA.png) fait 64KB. Quand de vraies photos seront ajoutées, il faudra les optimiser (WebP, lazy loading).

---

## RÉSUMÉ DES PRIORITÉS

| Priorité | Problème | Impact |
|----------|----------|--------|
| CRITIQUE | programme-mixte.html vide | Page blanche pour les visiteurs |
| CRITIQUE | 20+ liens cassés | Erreurs 404, mauvais SEO |
| CRITIQUE | Contenu placeholder visible | Image non professionnelle |
| ÉLEVÉ | Traduction cassée sur 4 pages | Fonctionnalité inutile |
| ÉLEVÉ | Meta descriptions dupliquées | SEO pénalisé |
| ÉLEVÉ | Aucune vraie photo | Site peu attractif |
| MOYEN | Tailwind CDN en production | Lenteur de chargement |
| MOYEN | Pages manquantes dans la nav | Contenu inaccessible |
| MOYEN | Articles blog en doublon | Cannibalisation SEO |
| FAIBLE | Pas de page 404 | UX dégradée |
| FAIBLE | Google Forms externe | Conversion moins optimale |
