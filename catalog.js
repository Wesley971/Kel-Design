/* Catalogue — module partagé entre le navigateur et le build.

   Chargé par index.html avant tooplate-ivory-script.js (global `KelCatalog`)
   et par build.js en Node (`require('./catalog.js')`). Tout ce qui touche à la
   présentation d'un produit vit ici, une seule fois, pour que le carrousel,
   le lookbook et le build ne divergent jamais. */

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.KelCatalog = factory();
  }
}(this, function() {
  'use strict';

  function buildWhatsAppLink(pieceName) {
    return 'https://wa.me/33768728002?text=' + encodeURIComponent('Bonjour, je suis intéressée par : ' + pieceName);
  }

  function formatPrice(product) {
    if (product.priceType === 'devis') return 'Sur devis';
    return typeof product.price === 'number' ? product.price + '€' : '';
  }

  return {
    buildWhatsAppLink: buildWhatsAppLink,
    formatPrice: formatPrice
  };
}));
