# Kaay Nduggu - API Marketplace pour Légumes

Une API REST basée sur NestJS pour un marketplace reliant producteurs et clients de légumes au Sénégal. Construite avec TypeORM, authentification JWT et validation de classe.

## Fonctionnalités

- **Gestion des Utilisateurs** : Inscription et authentification pour producteurs et clients
- **Gestion des Produits** : Les producteurs peuvent gérer leurs produits de légumes
- **Gestion des Commandes** : Les clients peuvent passer des commandes avec des articles
- **Authentification JWT** : Endpoints sécurisés avec accès basé sur les rôles
- **Base de Données** : MySQL/SQLite avec entités TypeORM

## Pile Technologique

- **Framework** : NestJS
- **Langage** : TypeScript
- **Base de Données** : TypeORM avec MySQL/SQLite
- **Authentification** : JWT avec Passport
- **Validation** : class-validator
- **Tests** : Jest

## Installation

```bash
npm install
```

## Configuration de l'Environnement

Créez un fichier `.env` dans le répertoire racine :

```env
DATABASE_TYPE=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=votre_username
DATABASE_PASSWORD=votre_password
DATABASE_NAME=kaay_nduggu

JWT_SECRET=votre_jwt_secret
```

## Exécution de l'Application

```bash
# développement
npm run start:dev

# production
npm run start:prod
```

## Endpoints API

### Authentification
- `POST /auth/login` - Connexion utilisateur
- `POST /auth/register` - Inscription utilisateur

### Utilisateurs
- `GET /users` - Lister les utilisateurs (admin uniquement)
- `GET /users/:id` - Obtenir un utilisateur par ID
- `POST /users` - Créer un utilisateur (admin uniquement)
- `PATCH /users/:id` - Mettre à jour un utilisateur
- `DELETE /users/:id` - Supprimer un utilisateur

### Produits
- `GET /products` - Lister tous les produits
- `GET /products/:id` - Obtenir un produit par ID
- `POST /products` - Créer un produit (producteur uniquement)
- `PATCH /products/:id` - Mettre à jour un produit (propriétaire uniquement)
- `DELETE /products/:id` - Supprimer un produit (propriétaire uniquement)

### Commandes
- `GET /commandes` - Lister les commandes (client uniquement)
- `GET /commandes/:id` - Obtenir une commande par ID
- `POST /commandes` - Créer une commande (client uniquement)
- `PATCH /commandes/:id` - Mettre à jour une commande (propriétaire uniquement)
- `DELETE /commandes/:id` - Supprimer une commande (propriétaire uniquement)

### Articles de Commande
- `GET /commande-item` - Lister les articles de commande
- `POST /commande-item` - Ajouter un article à la commande
- `PATCH /commande-item/:id` - Mettre à jour un article de commande
- `DELETE /commande-item/:id` - Supprimer un article de commande

### Producteurs
- `GET /producteur` - Lister les producteurs
- `POST /producteur` - Créer un profil producteur
- `PATCH /producteur/:id` - Mettre à jour un profil producteur
- `DELETE /producteur/:id` - Supprimer un profil producteur

### Infos Clients
- `GET /clientinfos` - Lister les infos clients
- `POST /clientinfos` - Créer un profil client
- `PATCH /clientinfos/:id` - Mettre à jour un profil client
- `DELETE /clientinfos/:id` - Supprimer un profil client

## Tests

```bash
# tests unitaires
npm run test

# tests e2e
npm run test:e2e

# couverture de tests
npm run test:cov
```

## Collection Postman

Importez `Kaay_Nduggu_API.postman_collection.json` pour tester les endpoints API.

## Documentation API (Swagger)

La documentation interactive de l'API est disponible via Swagger à l'adresse `http://localhost:3000/api` une fois l'application démarrée.

## Structure du Projet

```
src/
├── app.module.ts
├── main.ts
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── jwt-auth.guard.ts
│   └── ...
├── users/
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── entities/
│   └── dto/
├── products/
├── commandes/
├── commande-item/
├── producteur/
├── clientinfos/
└── common/
```

## Licence

Ce projet est sous licence MIT.
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
