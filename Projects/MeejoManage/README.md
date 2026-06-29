
# Meejo Manage - Guide d'Installation

Ce projet est une application React (Single Page Application) conçue pour la gestion commerciale.

## 🚀 Migration vers Supabase (SaaS Multi-Tenant)

Pour activer le backend cloud, suivez ces étapes :

### 1. Configuration Supabase
1. Créez un projet sur [Supabase.com](https://supabase.com).
2. Allez dans la section **SQL Editor**.
3. Copiez le contenu du fichier `database-schema.sql` (à la racine du projet).
4. Collez-le dans l'éditeur SQL et cliquez sur **RUN**.
   - Cela va créer toutes les tables nécessaires et configurer la sécurité (RLS).

### 2. Variables d'Environnement
Créez un fichier `.env` à la racine du projet avec vos clés Supabase (disponibles dans Project Settings > API) :

```env
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_cle_anon_publique
```

### 3. Installation Locale
1. Installez les dépendances :
   ```bash
   npm install
   ```
2. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

---

## Déploiement Hostinger (Production)

### Méthode Recommandée : Hébergement Web (File Manager)
1. Construisez l'application :
   ```bash
   npm run build
   ```
2. Uploadez le contenu du dossier `build` dans `public_html` sur Hostinger.
3. Assurez-vous que le fichier `.htaccess` est présent pour gérer le routing SPA.

### Méthode Alternative : VPS / App Platform
- **Commande de build** : `npm run build`
- **Dossier de sortie** : `build`
