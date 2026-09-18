/* ==========================================================================
   Spiral theme — global JS
   ========================================================================== */
(function () {
  'use strict';

  /* ----- Product gallery thumbnails ------------------------------------ */
  document.querySelectorAll('[data-product-gallery]').forEach(function (gallery) {
    var mainImg = gallery.querySelector('[data-gallery-main]');
    gallery.querySelectorAll('[data-gallery-thumb]').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        if (!mainImg) return;
        var full = thumb.getAttribute('data-full');
        var alt = thumb.getAttribute('data-alt') || '';
        if (full) {
          mainImg.src = full;
          mainImg.alt = alt;
        }
        gallery.querySelectorAll('[data-gallery-thumb]').forEach(function (t) {
          t.setAttribute('aria-current', t === thumb ? 'true' : 'false');
        });
      });
    });
  });

  /* ----- Quantity steppers --------------------------------------------- */
  document.querySelectorAll('[data-quantity]').forEach(function (wrap) {
    var input = wrap.querySelector('input');
    if (!input) return;
    wrap.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var step = btn.getAttribute('data-action') === 'increase' ? 1 : -1;
        var min = parseInt(input.min || '1', 10);
        var value = parseInt(input.value || '1', 10) + step;
        input.value = Math.max(min, value);
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });
  });

  /* ----- Variant selection: update price, availability, URL ------------ */
  document.querySelectorAll('[data-product-form]').forEach(function (form) {
    var dataEl = form.querySelector('[data-product-json]');
    if (!dataEl) return;

    var product;
    try { product = JSON.parse(dataEl.textContent); } catch (e) { return; }

    var idInput = form.querySelector('[data-variant-id]');
    var addBtn = form.querySelector('[data-add-to-cart]');
    var priceEl = document.querySelector('[data-price-current]');
    var compareEl = document.querySelector('[data-price-compare]');

    function selectedOptions() {
      return Array.prototype.map.call(
        form.querySelectorAll('[data-option-input]:checked'),
        function (el) { return el.value; }
      );
    }

    function findVariant(options) {
      return product.variants.find(function (variant) {
        return variant.options.every(function (opt, i) { return opt === options[i]; });
      });
    }

    function formatMoney(cents) {
      return (cents / 100).toLocaleString(undefined, {
        style: 'currency',
        currency: window.Shopify && window.Shopify.currency ? window.Shopify.currency.active : 'EUR'
      });
    }

    function update() {
      var options = selectedOptions();
      var variant = findVariant(options);

      if (!variant) {
        if (addBtn) {
          addBtn.disabled = true;
          addBtn.textContent = addBtn.getAttribute('data-unavailable-text') || 'Unavailable';
        }
        return;
      }

      if (idInput) idInput.value = variant.id;

      if (priceEl) priceEl.textContent = formatMoney(variant.price);
      if (compareEl) {
        if (variant.compare_at_price && variant.compare_at_price > variant.price) {
          compareEl.textContent = formatMoney(variant.compare_at_price);
          compareEl.hidden = false;
        } else {
          compareEl.hidden = true;
        }
      }

      if (addBtn) {
        if (variant.available) {
          addBtn.disabled = false;
          addBtn.textContent = addBtn.getAttribute('data-add-text') || 'Add to cart';
        } else {
          addBtn.disabled = true;
          addBtn.textContent = addBtn.getAttribute('data-sold-out-text') || 'Sold out';
        }
      }

      // Reflect variant in the URL without reloading.
      if (history.replaceState) {
        var url = new URL(window.location.href);
        url.searchParams.set('variant', variant.id);
        history.replaceState({}, '', url.toString());
      }
    }

    form.querySelectorAll('[data-option-input]').forEach(function (input) {
      input.addEventListener('change', update);
    });

    update();
  });
})();
