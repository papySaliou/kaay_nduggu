# Améliorations du Plan de Test Postman

## Problèmes identifiés

### 1. **Authentification manquante**
- Les guards JWT sont maintenant activés sur `/products` et `/commandes`
- Toutes les requêtes vers ces endpoints nécessitent un token
- Plusieurs requêtes dans le plan actuel n'ont pas de header `Authorization`

### 2. **Endpoint manquant**
- `GET /products/my` existe mais n'est pas testé dans le plan
- Cet endpoint permet aux producteurs de voir uniquement leurs produits

### 3. **Vérifications de propriétaire**
- Les endpoints `PATCH /products/:id` et `DELETE /products/:id` vérifient maintenant que l'utilisateur est le propriétaire
- Il faut tester qu'un producteur ne peut pas modifier/supprimer les produits d'un autre

### 4. **Rôles requis**
- Certains endpoints nécessitent des rôles spécifiques
- Il faut tester les cas d'erreur (403 Forbidden) quand le mauvais rôle est utilisé

---

## Corrections à apporter au plan de test

### Phase 3 : Produits - Corrections nécessaires

#### 3.3 Lister tous les produits
**PROBLÈME** : Pas de token dans le plan actuel
**CORRECTION** : Ajouter le header Authorization (peut être n'importe quel token)

```http
GET {{base_url}}/products
Authorization: Bearer {{producer1_token}}
```

#### 3.4 Récupérer Produit 1
**PROBLÈME** : Pas de token dans le plan actuel
**CORRECTION** : Ajouter le header Authorization

```http
GET {{base_url}}/products/{{product1_id}}
Authorization: Bearer {{producer1_token}}
```

#### 3.5 NOUVEAU : Mes produits - Producteur 1
**ENDPOINT MANQUANT** : Ajouter ce test

```http
GET {{base_url}}/products/my
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

#### 3.6 NOUVEAU : Mes produits - Producteur 2
```http
GET {{base_url}}/products/my
Authorization: Bearer {{producer2_token}}
```

---

### Phase 4 : Commandes - Corrections nécessaires

#### 4.5 Lister toutes les commandes
**PROBLÈME** : Pas de token dans le plan actuel
**CORRECTION** : Ajouter le header Authorization (nécessite role='client' ou 'producer')

```http
GET {{base_url}}/commandes
Authorization: Bearer {{client1_token}}
```

#### 4.6 Récupérer Commande 1 avec détails
**PROBLÈME** : Pas de token dans le plan actuel
**CORRECTION** : Ajouter le header Authorization

```http
GET {{base_url}}/commandes/{{commande1_id}}
Authorization: Bearer {{client1_token}}
```

---

### Phase 6 : Tests de validation et erreurs - Ajouts nécessaires

#### 6.4 NOUVEAU : Tentative de créer produit sans token (doit échouer)
```http
POST {{base_url}}/products
Content-Type: application/json
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
pm.test("Should return 401 Unauthorized", function () {
    pm.response.to.have.status(401);
});
```

#### 6.5 NOUVEAU : Tentative de créer produit avec role='client' (doit échouer)
```http
POST {{base_url}}/products
Authorization: Bearer {{client1_token}}
Content-Type: application/json
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

#### 6.6 NOUVEAU : Tentative de modifier produit d'un autre producteur (doit échouer)
```http
PATCH {{base_url}}/products/{{product1_id}}
Authorization: Bearer {{producer2_token}}
Content-Type: application/json
```

**Body** :
```json
{
  "pricePerKg": 2000
}
```

**Tests** :
```javascript
pm.test("Should return 400 Bad Request", function () {
    pm.response.to.have.status(400);
    pm.expect(pm.response.json().message).to.include("vos propres produits");
});
```

#### 6.7 NOUVEAU : Tentative de supprimer produit d'un autre producteur (doit échouer)
```http
DELETE {{base_url}}/products/{{product1_id}}
Authorization: Bearer {{producer2_token}}
```

**Tests** :
```javascript
pm.test("Should return 400 Bad Request", function () {
    pm.response.to.have.status(400);
    pm.expect(pm.response.json().message).to.include("vos propres produits");
});
```

#### 6.8 NOUVEAU : Tentative de créer commande avec role='producer' (doit échouer)
```http
POST {{base_url}}/commandes
Authorization: Bearer {{producer1_token}}
Content-Type: application/json
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

#### 6.9 NOUVEAU : Tentative d'accéder à /commandes avec role incorrect
```http
GET {{base_url}}/commandes
Authorization: Bearer {{producer1_token}}
```

**Note** : Ceci devrait fonctionner car `@Roles('client', 'producer')` permet les deux rôles.

---

### Phase 7 : Tests de mise à jour - Corrections

#### 7.1 Mettre à jour Produit 1
**AMÉLIORATION** : Vérifier que seul le propriétaire peut modifier

Les tests existants sont corrects car on utilise `producer1_token` pour modifier `product1_id`.

---

### Phase 8 : Tests de suppression - Corrections

#### 8.1 Supprimer Produit 2
**AMÉLIORATION** : Vérifier que seul le propriétaire peut supprimer

Les tests existants sont corrects car on utilise `producer2_token` pour supprimer `product2_id`.

---

## Résumé des corrections

### Endpoints à corriger (ajouter Authorization) :
1. ✅ `GET /products` - Ajouter token
2. ✅ `GET /products/:id` - Ajouter token
3. ✅ `GET /commandes` - Ajouter token
4. ✅ `GET /commandes/:id` - Ajouter token

### Nouveaux endpoints à ajouter :
1. ✅ `GET /products/my` - Mes produits (Producteur 1)
2. ✅ `GET /products/my` - Mes produits (Producteur 2)

### Nouveaux tests d'erreur à ajouter :
1. ✅ Créer produit sans token (401)
2. ✅ Créer produit avec role='client' (403)
3. ✅ Modifier produit d'un autre producteur (400)
4. ✅ Supprimer produit d'un autre producteur (400)
5. ✅ Créer commande avec role='producer' (403)

---

## Ordre des routes - Vérification

✅ **Correct** : L'ordre des routes dans le code est bon :
- `GET /commandes/my-commandes` est avant `GET /commandes/:id`
- `GET /products/my` est avant `GET /products/:id`

Cela évite que `:id` capture "my-commandes" ou "my".

---

## Checklist finale

- [ ] Tous les endpoints `/products` ont un token
- [ ] Tous les endpoints `/commandes` ont un token
- [ ] Endpoint `GET /products/my` est testé
- [ ] Tests de vérification de propriétaire sont ajoutés
- [ ] Tests de rôles incorrects sont ajoutés (403)
- [ ] Tests sans authentification sont ajoutés (401)

