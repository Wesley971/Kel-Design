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

  /* ── Rendu du lookbook (HTML généré au déploiement par build.js) ── */

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Sveltia écrit les chemins d'images avec un slash initial (/images/…) ;
  // le site est servi depuis la racine, un chemin relatif suffit partout.
  function normalizeImagePath(src) {
    return String(src).replace(/^\/+/, '');
  }

  // Numérotation « No. 01 » : deux chiffres minimum, comme le HTML d'origine
  function pad2(n) {
    return n < 10 ? '0' + n : String(n);
  }

  // Une pièce « bientôt », ou disponible mais sans photo, prend le visuel
  // d'attente ; le dégradé dépend de la catégorie (voir .lookbook-card-visual--*)
  function isComingSoon(product) {
    return product.availability === 'bientot' || !product.images || !product.images.length;
  }

  var SOON_VISUAL_BY_CATEGORY = {
    'pendentif': 'lookbook-card-visual--pendant',
    'bracelet': 'lookbook-card-visual--bracelet',
    'bague': 'lookbook-card-visual--ring'
  };

  function renderLookbookCard(product, index, indent) {
    indent = indent || '';
    var name = escapeHtml(product.name);
    var label = indent + '  <span class="lookbook-card-label">No. ' + pad2(index + 1) + ' — ' + name + '</span>';

    if (isComingSoon(product)) {
      var visual = 'lookbook-card-visual lookbook-card-visual--soon';
      if (SOON_VISUAL_BY_CATEGORY[product.category]) visual += ' ' + SOON_VISUAL_BY_CATEGORY[product.category];
      return [
        indent + '<div class="lookbook-card">',
        indent + '  <div class="' + visual + '">',
        indent + '    <span class="lookbook-card-soon">Bientôt</span>',
        indent + '  </div>',
        label,
        indent + '</div>'
      ].join('\n');
    }

    var image = product.images[0];
    return [
      indent + '<div class="lookbook-card" data-piece-name="' + name + '">',
      indent + '  <img src="' + escapeHtml(normalizeImagePath(image.src)) + '" alt="' + escapeHtml(image.alt) + '" loading="lazy">',
      label,
      indent + '  <span class="lookbook-card-price">' + escapeHtml(formatPrice(product)) + '</span>',
      indent + '  <a href="' + escapeHtml(buildWhatsAppLink(product.name)) + '" class="lookbook-card-cta cta-link" target="_blank" rel="noopener noreferrer">Commander</a>',
      indent + '</div>'
    ].join('\n');
  }

  function renderLookbookCards(products, indent) {
    return products.map(function(product, index) {
      return renderLookbookCard(product, index, indent);
    }).join('\n');
  }

  function renderLookbookCount(products, indent) {
    return (indent || '') + '<span class="lookbook-count">01 — ' + pad2(products.length) + '</span>';
  }

  return {
    buildWhatsAppLink: buildWhatsAppLink,
    formatPrice: formatPrice,
    escapeHtml: escapeHtml,
    normalizeImagePath: normalizeImagePath,
    isComingSoon: isComingSoon,
    renderLookbookCard: renderLookbookCard,
    renderLookbookCards: renderLookbookCards,
    renderLookbookCount: renderLookbookCount
  };
}));
