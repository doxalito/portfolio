# Spiral — Shopify theme

Thème Shopify **Online Store 2.0** pour une boutique **mono-produit** (t-shirts sérigraphiés).
Codé en Liquid, entièrement personnalisable depuis l'éditeur de thème Shopify.

## Installer le thème sur Shopify

### Option A — Import du ZIP (le plus simple)
1. Génère le ZIP : à la racine du dossier `shopify-theme/`, sélectionne **tout le contenu**
   (les dossiers `assets`, `config`, `layout`, `locales`, `sections`, `snippets`, `templates`)
   et compresse-les **directement à la racine** du ZIP — pas dans un sous-dossier.
2. Dans ton admin Shopify : **Boutique en ligne › Thèmes › Ajouter un thème › Importer depuis un fichier ZIP**.
3. Une fois importé : **Personnaliser** pour ouvrir l'éditeur, ou **Publier** pour le mettre en ligne.

> ⚠️ Important : dans le ZIP, le dossier `assets/` doit être à la racine, pas
> `shopify-theme/assets/`. Le script `package.sh` s'en occupe automatiquement.

### Option B — Shopify CLI (développeur)
```bash
# Installer la CLI : https://shopify.dev/docs/themes/tools/cli
shopify theme dev    # prévisualisation locale en temps réel
shopify theme push   # envoyer vers la boutique
```

## Configurer la boutique

1. **Créer le produit** : Admin Shopify › **Produits › Ajouter un produit**.
   - Ajoute le titre (« Spiral Tee »), la description, les photos.
   - Crée les **variantes** (option « Taille » : S / M / L / XL) → elles s'affichent
     automatiquement comme boutons sur la page produit.
   - Définis le prix et le stock par taille.
2. **Mettre le produit en vedette sur l'accueil** :
   éditeur de thème › section **Featured product** › choisir le produit.
3. **Image du hero** : éditeur › section **Hero** › choisir une image de fond.
4. **Menu** : Admin › **Boutique en ligne › Navigation** › menu `main-menu`.
5. **Couleurs / typo / logo** : éditeur › **Paramètres du thème**.

## Structure

```
assets/      base.css, global.js (galerie, variantes, quantité)
config/      réglages du thème (couleurs, polices, marque)
layout/      theme.liquid (gabarit principal) + password.liquid
locales/     en.default.json (textes traduisibles)
sections/    hero, header, footer, main-product, featured-product, features, rich-text…
snippets/    icon-cart
templates/   index, product, cart, page, collection, search, 404, customers/…
```

La page produit gère seule : sélection de variante (prix + dispo en direct),
sélecteur de quantité, galerie d'images, bouton « Add to cart ».
Le panier et le paiement sont gérés nativement par Shopify.
