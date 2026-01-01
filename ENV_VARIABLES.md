# Variables d'environnement

Ce fichier documente toutes les variables d'environnement nécessaires pour faire fonctionner l'application.

## Configuration requise

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=kaay_nduggu

# JWT Configuration
JWT_SECRET=votre-clé-secrète-jwt-très-longue-et-aléatoire
JWT_EXPIRES_IN=1d

# Server Configuration
PORT=3000

# Environment
NODE_ENV=development
```

## Description des variables

### Database Configuration

- **DB_HOST** : Adresse de l'hôte de la base de données (par défaut: `localhost`)
- **DB_PORT** : Port de la base de données (par défaut: `3306` pour MySQL)
- **DB_USER** : Nom d'utilisateur pour se connecter à la base de données
- **DB_PASSWORD** : Mot de passe pour se connecter à la base de données
- **DB_NAME** : Nom de la base de données

### JWT Configuration

- **JWT_SECRET** : Clé secrète utilisée pour signer les tokens JWT. **IMPORTANT** : Utilisez une clé longue et aléatoire en production. Ne partagez jamais cette clé.
- **JWT_EXPIRES_IN** : Durée de validité des tokens JWT (ex: `1d`, `24h`, `3600s`)

### Server Configuration

- **PORT** : Port sur lequel l'application écoute (par défaut: `3000`)

### Environment

- **NODE_ENV** : Environnement d'exécution (`development`, `production`, `test`)

## Sécurité

⚠️ **IMPORTANT** :
- Ne commitez jamais le fichier `.env` dans le dépôt Git
- Utilisez des clés secrètes différentes pour chaque environnement (dev, staging, production)
- Générez une clé JWT_SECRET forte en production (minimum 32 caractères aléatoires)

## Génération d'une clé JWT_SECRET sécurisée

Pour générer une clé secrète sécurisée, vous pouvez utiliser :

```bash
# Avec Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Avec OpenSSL
openssl rand -hex 32
```

