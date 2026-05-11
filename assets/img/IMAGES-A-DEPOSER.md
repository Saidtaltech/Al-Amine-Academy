# Images à déposer dans `assets/img/`

Toutes les pages utilisent ces noms **exacts**. Le site fonctionne sans elles (dégradé bleu de marque en fallback), mais il prendra toute sa dimension dès que tu déposes les fichiers ici. **Respecte les noms et extensions (`.jpg`).**

---

## Page d'accueil (`index.html`)

| Fichier | Section | Conseil photo |
|---|---|---|
| `hero-eleves-coran.jpg` | **Hero principal** (cover plein écran) | Élèves apprenant le Coran — lumière naturelle, format paysage 16/9 |
| `batiment-ecole.jpg` | Section « Notre approche » | Vue extérieure du bâtiment ou de la cour |
| `programme-tahfiz.jpg` | Carte programme Tahfiz Internat | Élève qui mémorise, plan rapproché |
| `programme-mixte.jpg` | Carte programme Mixte | Élèves arrivant ou sortant de l'école |
| `eleves-priere.jpg` | Section CTA finale (fond) | Élèves en prière, lumière douce |

---

## Page À Propos (`a-propos.html`)

| Fichier | Section |
|---|---|
| `equipe-pedagogique.jpg` | **Hero cover** (fond plein écran) + card flottante |
| `classe-apprentissage.jpg` | Section Mission & Vision |
| `directeur.jpg` | Section Équipe |

---

## Page Admission (`admission.html`)

| Fichier | Section |
|---|---|
| `accueil-eleves.jpg` | **Hero cover** (fond plein écran) |

---

## Page Témoignages (`temoignages.html`)

| Fichier | Section |
|---|---|
| `temoignages-hero.jpg` | **Hero cover** (fond plein écran) — famille + enfants souriants |

---

## Page Galerie (`galerie.html`)

| Fichier | Section |
|---|---|
| `galerie-hero.jpg` | **Hero cover** (fond plein écran) — vue d'ensemble de l'école |
| `galerie-classes.jpg` | Catégorie Salles de classe |
| `galerie-sport.jpg` | Catégorie Sport |
| `galerie-ceremonies.jpg` | Catégorie Cérémonies & événements |
| `galerie-batiment.jpg` | Catégorie Bâtiment & locaux |
| `galerie-cantine.jpg` | Catégorie Cantine & repas |
| `galerie-priere.jpg` | Catégorie Prières & vie spirituelle |

---

## Page Contact (`contact.html`)

| Fichier | Section |
|---|---|
| `facade-ecole.jpg` | **Hero cover** (fond plein écran) — façade ou entrée de l'école |

---

## Pages Programmes

| Fichier | Page | Section |
|---|---|---|
| `internat-eleves.jpg` | `programme-internat.html` | **Hero cover** + image section sous le hero |
| `programme-mixte-classe.jpg` | `programme-mixte.html` | **Hero cover** |
| `cours-en-ligne.jpg` | `programme-cours-en-ligne.html` | **Hero cover** |
| `cours-gratuits.jpg` | `programme-cours-gratuits.html` | **Hero cover** |
| `tahfiz-academique.jpg` | `programme-tahfiz-academique.html` | **Hero cover** |
| `conferences-hero.jpg` | `conferences.html` | **Hero cover** — conférence ou rassemblement |
| `camp-vacances-hero.jpg` | `camp-vacances.html` | **Hero cover** — activités de camp |

---

## Format recommandé

| Paramètre | Valeur |
|---|---|
| **Format** | `.jpg` (obligatoire — le code attend cette extension) |
| **Largeur hero** | 1600 px minimum (affiché plein écran) |
| **Largeur cartes** | 900 px suffit |
| **Poids cible** | < 300 KB (compresse sur [TinyPNG](https://tinypng.com) ou [Squoosh](https://squoosh.app)) |
| **Ratio hero** | 16/9 ou 3/2 — évite le portrait |
| **Visages** | Vérifie l'autorisation parentale (droit à l'image) |

---

## Comment fonctionne le fallback

- **Sans photo** → hero affiche un **dégradé bleu de marque** avec motif de points blancs. Le site est 100 % fonctionnel.
- **Avec photo** → hero affiche la **photo avec overlay semi-transparent** (dégradé bleu + dot-grid). Le texte reste parfaitement lisible même sur photo lumineuse.

Pour tester : dépose une image dans ce dossier, rafraîchis la page — aucune modification de code nécessaire.
