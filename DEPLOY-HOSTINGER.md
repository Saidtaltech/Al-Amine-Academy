# Déployer sur Hostinger — pas-à-pas

Hostinger utilise hPanel (leur version de cPanel). Apache + .htaccess sont supportés nativement, donc tout ce qu'on a préparé fonctionne directement. Pas de build, pas de config supplémentaire.

---

## Méthode 1 — File Manager (la plus simple, sans logiciel)

### Étape 1 — Préparer le ZIP

1. Sur ton bureau, ouvre le dossier `SITE WEB AAA`.
2. **Sélectionne tout le contenu** (Ctrl+A) — pas le dossier lui-même, **son contenu** : `index.html`, `assets/`, `blog/`, `lang.js`, `translations.js`, `.htaccess`, etc.
3. Clic droit → **Envoyer vers → Dossier compressé (.zip)**.
4. Nomme-le `site.zip`.

> Important : **inclure les fichiers cachés** comme `.htaccess` (Windows ne les montre pas par défaut — Affichage → cocher « Éléments masqués »).

### Étape 2 — Connexion à hPanel

1. https://hpanel.hostinger.com → connecte-toi.
2. Choisis ton domaine `alamineacademy.com` dans la liste **Sites web**.
3. Clique sur **« Gérer »** ou **« Manage »**.

### Étape 3 — Upload via File Manager

1. Dans le menu de gauche : **Fichiers → Gestionnaire de fichiers** (File Manager).
2. Tu tombes sur le dossier `public_html/` — c'est là où va ton site.
3. **Vide le dossier** s'il contient un site existant (icône poubelle après tout sélectionner).
4. Clique **« Téléverser »** (Upload) en haut à droite.
5. Glisse `site.zip` dans la fenêtre.
6. Une fois uploadé, **clic droit sur `site.zip` → « Extraire »** (Extract).
7. Confirme l'extraction dans `public_html/`.
8. **Supprime `site.zip`** une fois extrait.

### Étape 4 — Vérification

1. Ouvre https://alamineacademy.com dans un nouvel onglet.
2. Le site doit s'afficher immédiatement (HTTPS automatique chez Hostinger).
3. Teste la page 404 en allant sur https://alamineacademy.com/page-inexistante → tu dois voir la page 404 personnalisée.
4. Teste le sélecteur de langue (FR/EN/AR/ES) en haut à droite.

---

## Méthode 2 — FTP (FileZilla, plus rapide pour des updates ultérieures)

### Étape 1 — Récupérer les identifiants FTP

1. hPanel → **Fichiers → Comptes FTP**.
2. Note :
   - **Hostname** : `ftp.alamineacademy.com` ou l'IP fournie
   - **Username** : généralement quelque chose comme `u123456789`
   - **Password** : celui que tu as défini
   - **Port** : 21 (FTP) ou 22 (SFTP)

### Étape 2 — Upload via FileZilla

1. Télécharge FileZilla : https://filezilla-project.org/download.php?type=client (gratuit).
2. **Fichier → Gestionnaire de Sites → Nouveau Site** : entre les identifiants Hostinger.
3. Connecte-toi.
4. **Côté gauche** (local) : navigue vers ton dossier `SITE WEB AAA`.
5. **Côté droit** (serveur) : ouvre `public_html/`.
6. Vide le contenu du serveur si besoin (sélectionner tout, supprimer).
7. **Glisse-dépose** tout le contenu local vers `public_html/`.
8. Patience pendant l'upload (~1-2 minutes pour ~1 MB de HTML).

> **Astuce** : dans FileZilla, **Édition → Paramètres → Transferts → Filtres** → vérifier que les fichiers cachés (commençant par `.`) sont bien envoyés.

---

## Méthode 3 — Git auto-deploy (si tu pousses sur GitHub/GitLab)

Hostinger Premium et Business supportent Git :

1. hPanel → **Avancé → Git**.
2. **« Créer un nouveau dépôt »** : URL `https://github.com/tonuser/alamineacademy.git` + branche `main`.
3. Chemin de déploiement : `public_html`.
4. Coche **« Déploiement automatique sur push »**.
5. À chaque `git push origin main`, Hostinger récupère et déploie le dernier commit.

---

## Configuration HTTPS Hostinger (déjà actif normalement)

1. hPanel → **Sécurité → SSL**.
2. Vérifier que **« SSL gratuit »** est activé sur `alamineacademy.com` et `www.alamineacademy.com`.
3. Si pas activé, clique **« Installer »**.
4. Mon `.htaccess` force déjà la redirection HTTPS — donc même si quelqu'un tape `http://`, il sera redirigé vers `https://`.

---

## Adresse e-mail professionnelle

Tant que tu y es, dans hPanel :

1. **E-mails → Comptes e-mail → Créer un compte**.
2. Crée `contact@alamineacademy.com` (ou `contact@`, `inscription@`).
3. Le site renvoie déjà vers cette adresse — il faut que la boîte existe.

---

## Optimisations post-déploiement

### A. Activer la compression gzip (Hostinger le fait par défaut, vérifier)

1. hPanel → **Avancé → Optimisation**.
2. **« GZIP »** doit être activé. Mon `.htaccess` le force aussi.

### B. Activer le cache LiteSpeed (Hostinger utilise LiteSpeed, plus rapide qu'Apache standard)

1. hPanel → **Avancé → LiteSpeed Cache** (si visible).
2. Activer le cache pour tout le site.
3. Site 2-3× plus rapide sans rien changer.

### C. Soumettre le site à Google

1. https://search.google.com/search-console
2. Ajouter la propriété `alamineacademy.com`.
3. Vérifier via DNS (TXT record fourni par Google) — étape rapide via hPanel → DNS Zone Editor.
4. Soumettre `https://alamineacademy.com/sitemap.xml` dans Search Console.

---

## Checklist avant le « go live »

- [ ] Tous les fichiers du dossier `SITE WEB AAA/` sont dans `public_html/` (y compris `.htaccess`)
- [ ] HTTPS actif (vert dans la barre du navigateur)
- [ ] La page 404 personnalisée s'affiche pour une URL invalide
- [ ] Le sélecteur de langue (globe) bascule FR → EN → AR → ES
- [ ] Le formulaire WhatsApp d'admission ouvre WhatsApp avec un message pré-rempli
- [ ] Le bouton WhatsApp flottant en bas à droite fonctionne
- [ ] Les liens sociaux Facebook/Instagram/YouTube ouvrent les bons profils
- [ ] La fiche Google Maps de l'école est listée et le lien d'avis y mène

---

## Mises à jour ultérieures du site

À chaque modification d'un fichier :

**Si File Manager** : remplace simplement le fichier modifié dans `public_html/`.

**Si FTP** : FileZilla détecte les fichiers modifiés (option « Écraser si plus récent »).

**Si Git** : `git push` et c'est en ligne.

> **Astuce** : si une modification ne se voit pas immédiatement, vide le cache LiteSpeed (hPanel → LiteSpeed Cache → Vider tout) et fais Ctrl+Shift+R sur le navigateur.

---

## En cas de problème

| Symptôme | Cause probable | Solution |
|---|---|---|
| Page blanche | `.htaccess` mal uploadé (caché) | Re-vérifier qu'il est bien dans `public_html/` (afficher fichiers cachés) |
| 500 Internal Server Error | Conflit `.htaccess` | Renomme `.htaccess` en `.htaccess.old` temporairement, le site doit revenir |
| Mixed content (cadenas barré) | Image en `http://` dans une page | Chercher `http://` dans les sources, remplacer par `https://` |
| Polices Google ne chargent pas | Connection internet bloquée chez le visiteur | Le fallback Montserrat / Amiri est déjà en place côté CSS |

---

Si tu rencontres une erreur précise, dis-moi le message exact et je te guide.
