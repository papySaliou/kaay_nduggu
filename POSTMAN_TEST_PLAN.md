# Plan de Test Postman - API Kaay Nduggu

Ce document décrit un plan de test complet pour tester l'API avec :
- 2 Producteurs
- 2 Clients
- 2 Produits
- 2 Commandes

## Configuration de base

**URL de base** : `http://localhost:3000`

## Variables Postman à créer

Créez les variables suivantes dans Postman (Environnement ou Collection) :

- `base_url` : `http://localhost:3000`
- `producer1_token` : (sera rempli après login)
- `producer2_token` : (sera rempli après login)
- `client1_token` : (sera rempli après login)
- `client2_token` : (sera rempli après login)
- `producer1_id` : (sera rempli après register)
- `producer2_id` : (sera rempli après register)
- `client1_id` : (sera rempli après register)
- `client2_id` : (sera rempli après register)
- `product1_id` : (sera rempli après création)
- `product2_id` : (sera rempli après création)
- `commande1_id` : (sera rempli après création)
- `commande2_id` : (sera rempli après création)

---

## Phase 1 : Inscription des utilisateurs

### 1.1 Inscription Producteur 1

**POST** `{{base_url}}/auth/register`

**Headers** :
```
Content-Type: application/json
```

**Body** (raw JSON) :
```json
{
  "name": "Amadou Diallo",
  "email": "amadou.producer@example.com",
  "phone": "+221771234567",
  "password": "password123",
  "role": "producer",
  "producteurInfo": {
    "zone": "Niayes",
    "farmName": "Ferme Diallo",
    "surfaceHa": 5.5
  }
}
```

**Tests à ajouter** :
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Response has userId", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('userId');
    pm.collectionVariables.set("producer1_id", jsonData.userId);
});

pm.test("Role is producer", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.role).to.eql("producer");
});
```

---

### 1.2 Inscription Producteur 2

**POST** `{{base_url}}/auth/register`

**Body** :
```json
{
  "name": "Fatou Sarr",
  "email": "fatou.producer@example.com",
  "phone": "+221771234568",
  "password": "password123",
  "role": "producer",
  "producteurInfo": {
    "zone": "Gandiol",
    "farmName": "Exploitation Sarr",
    "surfaceHa": 8.2
  }
}
```

**Tests** :
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

var jsonData = pm.response.json();
pm.collectionVariables.set("producer2_id", jsonData.userId);
```

---

### 1.3 Inscription Client 1

**POST** `{{base_url}}/auth/register`

**Body** :
```json
{
  "name": "Ibrahima Ndiaye",
  "email": "ibrahima.client@example.com",
  "phone": "+221771234569",
  "password": "password123",
  "role": "client",
  "clientInfo": {
    "type": "restaurant",
    "address": "Avenue Bourguiba, Dakar",
    "companyName": "Restaurant Le Teranga"
  }
}
```

**Tests** :
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

var jsonData = pm.response.json();
pm.collectionVariables.set("client1_id", jsonData.userId);
```

---

### 1.4 Inscription Client 2

**POST** `{{base_url}}/auth/register`

**Body** :
```json
{
  "name": "Aissatou Ba",
  "email": "aissatou.client@example.com",
  "phone": "+221771234570",
  "password": "password123",
  "role": "client",
  "clientInfo": {
    "type": "particulier",
    "address": "Quartier Almadies, Dakar"
  }
}
```

**Tests** :
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

var jsonData = pm.response.json();
pm.collectionVariables.set("client2_id", jsonData.userId);
```

---

## Phase 2 : Connexion des utilisateurs

### 2.1 Login Producteur 1

**POST** `{{base_url}}/auth/login`

**Body** :
```json
{
  "email": "amadou.producer@example.com",
  "password": "password123"
}
```

**Tests** :
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Response has access_token", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('access_token');
    pm.collectionVariables.set("producer1_token", jsonData.access_token);
});
```

---

### 2.2 Login Producteur 2

**POST** `{{base_url}}/auth/login`

**Body** :
```json
{
  "email": "fatou.producer@example.com",
  "password": "password123"
}
```

**Tests** :
```javascript
var jsonData = pm.response.json();
pm.collectionVariables.set("producer2_token", jsonData.access_token);
```

---

### 2.3 Login Client 1

**POST** `{{base_url}}/auth/login`

**Body** :
```json
{
  "email": "ibrahima.client@example.com",
  "password": "password123"
}
```

**Tests** :
```javascript
var jsonData = pm.response.json();
pm.collectionVariables.set("client1_token", jsonData.access_token);
```

---

### 2.4 Login Client 2

**POST** `{{base_url}}/auth/login`

**Body** :
```json
{
  "email": "aissatou.client@example.com",
  "password": "password123"
}
```

**Tests** :
```javascript
var jsonData = pm.response.json();
pm.collectionVariables.set("client2_token", jsonData.access_token);
```

---

## Phase 3 : Création des produits

### 3.1 Créer Produit 1 (par Producteur 1)

**POST** `{{base_url}}/products`

**Headers** :
```
Content-Type: application/json
Authorization: Bearer {{producer1_token}}
```

**Body** :
```json
{
  "name": "Tomates",
  "pricePerKg": 1500,
  "quantityKg": 100,
  "harvestDate": "2024-12-15",
  "available": true,
  "producerId": "{{producer1_id}}",
  "zone": "Niayes"
}
```

**Tests** :
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Product created successfully", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('id');
    pm.collectionVariables.set("product1_id", jsonData.id);
    pm.expect(jsonData.name).to.eql("Tomates");
    pm.expect(jsonData.producer.id).to.eql(pm.collectionVariables.get("producer1_id"));
});
```

---

### 3.2 Créer Produit 2 (par Producteur 2)

**POST** `{{base_url}}/products`

**Headers** :
```
Content-Type: application/json
Authorization: Bearer {{producer2_token}}
```

**Body** :
```json
{
  "name": "Oignons",
  "pricePerKg": 1200,
  "quantityKg": 80,
  "harvestDate": "2024-12-20",
  "available": true,
  "producerId": "{{producer2_id}}",
  "zone": "Gandiol"
}
```

**Tests** :
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

var jsonData = pm.response.json();
pm.collectionVariables.set("product2_id", jsonData.id);
```

---

### 3.3 Lister tous les produits

**GET** `{{base_url}}/products`

**Headers** :
```
Authorization: Bearer {{producer1_token}}
```

**Tests** :
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Returns array of products", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an('array');
    pm.expect(jsonData.length).to.be.at.least(2);
});
```

---

### 3.4 Récupérer Produit 1

**GET** `{{base_url}}/products/{{product1_id}}`

**Headers** :
```
Authorization: Bearer {{producer1_token}}
```

**Tests** :
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Returns correct product", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.id).to.eql(pm.collectionVariables.get("product1_id"));
});
```

---

### 3.5 Mes produits - Producteur 1

**GET** `{{base_url}}/products/my`

**Headers** :
```
Authorization: Bearer {{producer1_token}}
```

**Tests** :
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Returns only producer1's products", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an('array');
    jsonData.forEach(product => {
        pm.expect(product.producer.id).to.eql(pm.collectionVariables.get("producer1_id"));
    });
});
```

---

### 3.6 Mes produits - Producteur 2

**GET** `{{base_url}}/products/my`

**Headers** :
```
Authorization: Bearer {{producer2_token}}
```

**Tests** :
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Returns only producer2's products", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an('array');
    jsonData.forEach(product => {
        pm.expect(product.producer.id).to.eql(pm.collectionVariables.get("producer2_id"));
    });
});
```

---

## Phase 4 : Création des commandes

### 4.1 Créer Commande 1 (par Client 1)

**POST** `{{base_url}}/commandes`

**Headers** :
```
Content-Type: application/json
Authorization: Bearer {{client1_token}}
```

**Body** :
```json
{
  "clientId": "{{client1_id}}",
  "totalAmount": 0,
  "status": "pending",
  "deliveryDate": "2024-12-25"
}
```

**Tests** :
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

var jsonData = pm.response.json();
pm.collectionVariables.set("commande1_id", jsonData.id);
pm.expect(jsonData.client.id).to.eql(pm.collectionVariables.get("client1_id"));
```

---

### 4.2 Ajouter Produit 1 à Commande 1

**POST** `{{base_url}}/commande-item`

**Headers** :
```
Content-Type: application/json
Authorization: Bearer {{client1_token}}
```

**Body** :
```json
{
  "commandeId": "{{commande1_id}}",
  "productId": "{{product1_id}}",
  "quantityKg": 20
}
```

**Tests** :
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Item created and stock updated", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('id');
    pm.expect(jsonData.quantityKg).to.eql(20);
});
```

---

### 4.3 Créer Commande 2 (par Client 2)

**POST** `{{base_url}}/commandes`

**Headers** :
```
Content-Type: application/json
Authorization: Bearer {{client2_token}}
```

**Body** :
```json
{
  "clientId": "{{client2_id}}",
  "totalAmount": 0,
  "status": "pending",
  "deliveryDate": "2024-12-28"
}
```

**Tests** :
```javascript
var jsonData = pm.response.json();
pm.collectionVariables.set("commande2_id", jsonData.id);
```

---

### 4.4 Ajouter Produit 2 à Commande 2

**POST** `{{base_url}}/commande-item`

**Headers** :
```
Content-Type: application/json
Authorization: Bearer {{client2_token}}
```

**Body** :
```json
{
  "commandeId": "{{commande2_id}}",
  "productId": "{{product2_id}}",
  "quantityKg": 15
}
```

**Tests** :
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});
```

---

### 4.5 Lister toutes les commandes

**GET** `{{base_url}}/commandes`

**Headers** :
```
Authorization: Bearer {{client1_token}}
```

**Tests** :
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Returns array of commandes", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an('array');
    pm.expect(jsonData.length).to.be.at.least(2);
});
```

---

### 4.6 Récupérer Commande 1 avec détails

**GET** `{{base_url}}/commandes/{{commande1_id}}`

**Headers** :
```
Authorization: Bearer {{client1_token}}
```

**Tests** :
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Returns commande with items", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('items');
    pm.expect(jsonData.items).to.be.an('array');
    pm.expect(jsonData.totalAmount).to.be.above(0);
});
```

---

## Phase 5 : Mes commandes et commandes liées aux produits

### 5.1 Mes commandes - Client 1

**GET** `{{base_url}}/commandes/my`

**Headers** :
```
Authorization: Bearer {{client1_token}}
```

**Tests** :
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Returns only client1's commandes", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an('array');
    jsonData.forEach(commande => {
        pm.expect(commande.client.id).to.eql(pm.collectionVariables.get("client1_id"));
    });
});

pm.test("Returns commandes with items and products", function () {
    var jsonData = pm.response.json();
    if (jsonData.length > 0) {
        pm.expect(jsonData[0]).to.have.property('items');
        pm.expect(jsonData[0]).to.have.property('client');
    }
});
```

---

### 5.2 Mes commandes - Client 2

**GET** `{{base_url}}/commandes/my`

**Headers** :
```
Authorization: Bearer {{client2_token}}
```

**Tests** :
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Returns only client2's commandes", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an('array');
    jsonData.forEach(commande => {
        pm.expect(commande.client.id).to.eql(pm.collectionVariables.get("client2_id"));
    });
});
```

---

### 5.3 Commandes pour mes produits - Producteur 1

**GET** `{{base_url}}/commandes/producer-orders`

**Headers** :
```
Authorization: Bearer {{producer1_token}}
```

**Tests** :
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Returns commandes with producer1's products", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an('array');
    
    // Vérifier que toutes les commandes contiennent au moins un produit du producteur 1
    jsonData.forEach(commande => {
        let hasProducer1Product = false;
        if (commande.items && commande.items.length > 0) {
            commande.items.forEach(item => {
                if (item.product && item.product.producer && 
                    item.product.producer.id === pm.collectionVariables.get("producer1_id")) {
                    hasProducer1Product = true;
                }
            });
        }
        pm.expect(hasProducer1Product).to.be.true;
    });
});

pm.test("Returns commandes with full details", function () {
    var jsonData = pm.response.json();
    if (jsonData.length > 0) {
        pm.expect(jsonData[0]).to.have.property('items');
        pm.expect(jsonData[0]).to.have.property('client');
        pm.expect(jsonData[0].items[0]).to.have.property('product');
    }
});
```

---

### 5.4 Commandes pour mes produits - Producteur 2

**GET** `{{base_url}}/commandes/producer-orders`

**Headers** :
```
Authorization: Bearer {{producer2_token}}
```

**Tests** :
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Returns commandes with producer2's products", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an('array');
    
    jsonData.forEach(commande => {
        let hasProducer2Product = false;
        if (commande.items && commande.items.length > 0) {
            commande.items.forEach(item => {
                if (item.product && item.product.producer && 
                    item.product.producer.id === pm.collectionVariables.get("producer2_id")) {
                    hasProducer2Product = true;
                }
            });
        }
        pm.expect(hasProducer2Product).to.be.true;
    });
});
```

---

## Phase 6 : Tests de profil utilisateur

### 6.1 Profil Producteur 1

**GET** `{{base_url}}/auth/profile`

**Headers** :
```
Authorization: Bearer {{producer1_token}}
```

**Tests** :
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Returns user profile", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('userId');
    pm.expect(jsonData.role).to.eql("producer");
});
```

---

### 6.2 Profil Client 1

**GET** `{{base_url}}/auth/profile`

**Headers** :
```
Authorization: Bearer {{client1_token}}
```

**Tests** :
```javascript
pm.test("Returns client profile", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.role).to.eql("client");
});
```

---

## Phase 7 : Tests de validation et erreurs

### 7.1 Tentative de créer produit sans token

**POST** `{{base_url}}/products`

**Body** :
```json
{
  "name": "Test",
  "pricePerKg": 1000,
  "quantityKg": 50,
  "harvestDate": "2024-12-15",
  "producerId": "{{producer1_id}}",
  "zone": "Test"
}
```

**Tests** :
```javascript
pm.test("Should return 401 Unauthorized", function () {
    pm.response.to.have.status(401);
});
```

---

### 7.2 Tentative de créer produit avec role='client' (doit échouer)

**POST** `{{base_url}}/products`

**Headers** :
```
Content-Type: application/json
Authorization: Bearer {{client1_token}}
```

**Body** :
```json
{
  "name": "Test",
  "pricePerKg": 1000,
  "quantityKg": 50,
  "harvestDate": "2024-12-15",
  "producerId": "{{producer1_id}}",
  "zone": "Test"
}
```

**Tests** :
```javascript
pm.test("Should return 403 Forbidden", function () {
    pm.response.to.have.status(403);
});
```

---

### 7.3 Créer commande avec mauvais clientId

**POST** `{{base_url}}/commandes`

**Headers** :
```
Content-Type: application/json
Authorization: Bearer {{client1_token}}
```

**Body** :
```json
{
  "clientId": "invalid-uuid",
  "totalAmount": 0,
  "status": "pending",
  "deliveryDate": "2024-12-25"
}
```

**Tests** :
```javascript
pm.test("Should return 400 or 404", function () {
    pm.expect(pm.response.code).to.be.oneOf([400, 404]);
});
```

---

### 7.4 Créer produit avec producerId qui n'est pas un producteur

**POST** `{{base_url}}/products`

**Headers** :
```
Content-Type: application/json
Authorization: Bearer {{producer1_token}}
```

**Body** :
```json
{
  "name": "Test",
  "pricePerKg": 1000,
  "quantityKg": 50,
  "harvestDate": "2024-12-15",
  "producerId": "{{client1_id}}",
  "zone": "Test"
}
```

**Tests** :
```javascript
pm.test("Should return 400 Bad Request", function () {
    pm.response.to.have.status(400);
    pm.expect(pm.response.json().message).to.include("n'est pas un producteur");
});
```

---

### 7.5 Tentative de modifier commande d'un autre client (doit échouer)

**PATCH** `{{base_url}}/commandes/{{commande1_id}}`

**Headers** :
```
Content-Type: application/json
Authorization: Bearer {{client2_token}}
```

**Body** :
```json
{
  "status": "confirmed"
}
```

**Tests** :
```javascript
pm.test("Should return 400 Bad Request", function () {
    pm.response.to.have.status(400);
    pm.expect(pm.response.json().message).to.include("vos propres commandes");
});
```

---

### 7.6 Tentative de supprimer commande d'un autre client (doit échouer)

**DELETE** `{{base_url}}/commandes/{{commande1_id}}`

**Headers** :
```
Authorization: Bearer {{client2_token}}
```

**Tests** :
```javascript
pm.test("Should return 400 Bad Request", function () {
    pm.response.to.have.status(400);
    pm.expect(pm.response.json().message).to.include("vos propres commandes");
});
```

---

### 7.7 Tentative de créer commande avec role='producer' (doit échouer)

**POST** `{{base_url}}/commandes`

**Headers** :
```
Content-Type: application/json
Authorization: Bearer {{producer1_token}}
```

**Body** :
```json
{
  "clientId": "{{client1_id}}",
  "totalAmount": 0,
  "status": "pending",
  "deliveryDate": "2024-12-25"
}
```

**Tests** :
```javascript
pm.test("Should return 403 Forbidden", function () {
    pm.response.to.have.status(403);
});
```

---

## Phase 8 : Tests de mise à jour

### 8.1 Mettre à jour Produit 1

**PATCH** `{{base_url}}/products/{{product1_id}}`

**Headers** :
```
Content-Type: application/json
Authorization: Bearer {{producer1_token}}
```

**Body** :
```json
{
  "pricePerKg": 1600,
  "available": false
}
```

**Tests** :
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Product updated", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.pricePerKg).to.eql(1600);
    pm.expect(jsonData.available).to.eql(false);
});
```

---

### 8.2 Mettre à jour Commande 1

**PATCH** `{{base_url}}/commandes/{{commande1_id}}`

**Headers** :
```
Content-Type: application/json
Authorization: Bearer {{client1_token}}
```

**Body** :
```json
{
  "status": "confirmed"
}
```

**Tests** :
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Commande status updated", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.status).to.eql("confirmed");
});
```

---

## Phase 9 : Tests de suppression

### 9.1 Supprimer Produit 2

**DELETE** `{{base_url}}/products/{{product2_id}}`

**Headers** :
```
Authorization: Bearer {{producer2_token}}
```

**Tests** :
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Product deleted", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.message).to.include("supprimé");
});
```

---

### 9.2 Vérifier que le produit est supprimé

**GET** `{{base_url}}/products/{{product2_id}}`

**Tests** :
```javascript
pm.test("Should return 404", function () {
    pm.response.to.have.status(404);
});
```

---

## Ordre d'exécution recommandé

1. **Phase 1** : Inscription (4 requêtes)
2. **Phase 2** : Login (4 requêtes)
3. **Phase 3** : Création produits (6 requêtes) - *Inclut "Mes produits"*
4. **Phase 4** : Création commandes (6 requêtes)
5. **Phase 5** : Mes commandes et commandes liées (4 requêtes)
6. **Phase 6** : Profils (2 requêtes)
7. **Phase 7** : Tests d'erreurs (7 requêtes) - *Inclut tests de sécurité et propriété*
8. **Phase 8** : Mises à jour (2 requêtes)
9. **Phase 9** : Suppressions (2 requêtes)

**Total : ~37 requêtes**

---

## Collection Postman

Pour faciliter l'import, créez une collection Postman avec :
- **Dossiers** : Phase 1, Phase 2, Phase 3, Phase 4, Phase 5, Phase 6, Phase 7, Phase 8
- **Variables de collection** : Toutes les variables mentionnées ci-dessus
- **Scripts de pré-requête** : Aucun nécessaire
- **Scripts de test** : Ajoutez les tests JavaScript fournis pour chaque requête

---

## Notes importantes

1. **Ordre d'exécution** : Respectez l'ordre des phases car chaque phase dépend des précédentes
2. **Variables** : Les IDs et tokens sont automatiquement sauvegardés via les scripts de test
3. **Dates** : Ajustez les dates selon la date actuelle
4. **Guards** : Si les guards JWT sont activés, toutes les requêtes protégées nécessitent le header `Authorization`
5. **Validation** : Les DTOs valident automatiquement les données, les erreurs retournent un code 400

---

## Checklist de test

- [ ] Tous les utilisateurs peuvent s'inscrire
- [ ] Tous les utilisateurs peuvent se connecter
- [ ] Les producteurs peuvent créer des produits
- [ ] Les clients peuvent créer des commandes
- [ ] Les commandes sont liées aux bons clients
- [ ] Les produits sont liés aux bons producteurs
- [ ] Les items de commande sont créés correctement
- [ ] Les totaux de commande sont calculés
- [ ] **Les clients peuvent voir uniquement leurs commandes** (`GET /commandes/my`)
- [ ] **Les producteurs peuvent voir les commandes contenant leurs produits** (`GET /commandes/producer-orders`)
- [ ] **Les producteurs peuvent voir uniquement leurs produits** (`GET /products/my`)
- [ ] Les validations fonctionnent (rôles, IDs)
- [ ] **Les producteurs ne peuvent modifier/supprimer que leurs propres produits**
- [ ] **Les clients ne peuvent modifier/supprimer que leurs propres commandes**
- [ ] **Les clients ne peuvent pas créer de produits** (403)
- [ ] **Les producteurs ne peuvent pas créer de commandes** (403)
- [ ] **Les requêtes sans token retournent 401**
- [ ] Les mises à jour fonctionnent
- [ ] Les suppressions fonctionnent
- [ ] Les erreurs sont gérées correctement

