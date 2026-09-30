/**
 * AURA Storefront - Main Application Controller
 * Developed by Agent 3 (Senior Front-End) & Agent 4 (Junior Front-End)
 * Audited & Verified by Flaw Hunter (FLAW-001, FLAW-003, FLAW-004, FLAW-007 resolved)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize 3D Engine
  const aura3D = new Aura3DEngine('hero-3d-viewport');

  // DOM Elements
  const productsGrid = document.getElementById('products-grid');
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');
  const categoryTabs = document.querySelectorAll('.category-tab');
  const cartBtn = document.getElementById('cart-toggle-btn');
  const cartBadge = document.getElementById('cart-badge');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartShippingEl = document.getElementById('cart-shipping');
  const cartDiscountEl = document.getElementById('cart-discount');
  const cartTaxEl = document.getElementById('cart-tax');
  const cartTotalEl = document.getElementById('cart-total');
  const shippingTrackFill = document.getElementById('shipping-fill');
  const shippingText = document.getElementById('shipping-text');
  const promoInput = document.getElementById('promo-input');
  const promoApplyBtn = document.getElementById('promo-apply-btn');
  const checkoutOpenBtn = document.getElementById('checkout-open-btn');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');

  // Modals
  const quickLookModal = document.getElementById('quick-look-modal');
  const quickLookOverlay = document.getElementById('quick-look-overlay');
  const checkoutModal = document.getElementById('checkout-modal');
  const checkoutOverlay = document.getElementById('checkout-overlay');
  const confirmationModal = document.getElementById('confirmation-modal');
  const confirmationOverlay = document.getElementById('confirmation-overlay');

  let activeQuickProduct = null;
  let activeQuickColor = null;

  // Initialize theme
  document.documentElement.setAttribute('data-theme', appStore.state.theme);

  // 1. Render Catalog Grid
  async function renderProducts() {
    if (!productsGrid) return;
    const { category, search, sort } = appStore.state.filters;
    const products = await apiService.getProducts({ category, search, sort });

    if (products.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 1rem;">🔍</div>
          <h3>No products found</h3>
          <p style="margin-top: 0.5rem;">Try adjusting your search terms or category filter.</p>
        </div>
      `;
      return;
    }

    productsGrid.innerHTML = products.map(product => `
      <article class="product-card" data-id="${product.id}">
        <div class="product-media-wrapper">
          <span class="product-badge">${product.badge || 'Featured'}</span>
          <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy" />
          <button class="product-quick-btn" onclick="openQuickLook('${product.id}')" aria-label="Quick look for ${product.name}">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            Quick Look
          </button>
        </div>
        <div class="product-info">
          <div class="product-category-label">${product.category}</div>
          <h3 class="product-title">${product.name}</h3>
          <div class="product-rating-row">
            <span class="stars">★</span>
            <strong>${product.rating}</strong>
            <span>(${product.reviewCount} reviews)</span>
          </div>
          <div class="product-price-row">
            <span class="product-price">$${product.price}</span>
            ${product.originalPrice ? `<span class="product-original-price">$${product.originalPrice}</span>` : ''}
          </div>
          <button class="product-add-btn" onclick="quickAdd('${product.id}')">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Add to Bag
          </button>
        </div>
      </article>
    `).join('');
  }

  // 2. Global Quick Look & Add Hooks
  window.openQuickLook = (productId) => {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;
    activeQuickProduct = product;
    activeQuickColor = product.colors && product.colors[0] ? product.colors[0].name : "Standard";

    document.getElementById('ql-image').src = product.image;
    document.getElementById('ql-title').textContent = product.name;
    document.getElementById('ql-price').textContent = `$${product.price}`;
    document.getElementById('ql-tagline').textContent = product.tagline;
    document.getElementById('ql-description').textContent = product.description;
    document.getElementById('ql-rating').textContent = `${product.rating} (${product.reviewCount} customer reviews)`;

    // Color Swatches
    const swatchesContainer = document.getElementById('ql-swatches');
    if (product.colors && product.colors.length > 0) {
      swatchesContainer.innerHTML = product.colors.map((c, i) => `
        <button class="swatch-btn ${i === 0 ? 'active' : ''}" 
          style="background: ${c.hex};" 
          title="${c.name}" 
          onclick="selectQuickColor('${c.name}', this, ${c.threeColor})">
        </button>
      `).join('');
    } else {
      swatchesContainer.innerHTML = '<span style="font-size:0.85rem; color:var(--text-muted)">Standard</span>';
    }

    // Spec Table
    const specsContainer = document.getElementById('ql-specs');
    specsContainer.innerHTML = Object.entries(product.specs || {}).map(([key, val]) => `
      <div style="display:flex; justify-content:space-between; padding:0.4rem 0; border-bottom:1px solid var(--border-subtle); font-size:0.85rem;">
        <span style="color:var(--text-muted)">${key}</span>
        <strong>${val}</strong>
      </div>
    `).join('');

    quickLookOverlay.classList.add('open');
  };

  window.selectQuickColor = (colorName, element, threeColor) => {
    activeQuickColor = colorName;
    document.querySelectorAll('#ql-swatches .swatch-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
    if (aura3D && threeColor) {
      aura3D.setShellColor(threeColor);
    }
  };

  window.addActiveToCart = () => {
    if (!activeQuickProduct) return;
    appStore.addToCart(activeQuickProduct, activeQuickColor, 1);
    quickLookOverlay.classList.remove('open');
    showToast(`Added ${activeQuickProduct.name} (${activeQuickColor}) to your bag!`, 'success');
  };

  window.quickAdd = (productId) => {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;
    appStore.addToCart(product);
    showToast(`Added ${product.name} to your bag!`, 'success');
  };

  // 3. Cart State Synchronization
  appStore.subscribe((state, totals) => {
    // Badge counter
    if (cartBadge) {
      cartBadge.textContent = totals.totalItems;
      cartBadge.style.transform = totals.totalItems > 0 ? 'scale(1)' : 'scale(0)';
    }

    // Totals
    if (cartSubtotalEl) cartSubtotalEl.textContent = `$${totals.subtotal.toFixed(2)}`;
    if (cartShippingEl) {
      cartShippingEl.textContent = totals.shippingFee === 0 ? 'FREE' : `$${totals.shippingFee.toFixed(2)}`;
    }
    if (cartDiscountEl) {
      if (totals.discountAmount > 0) {
        document.getElementById('discount-row').style.display = 'flex';
        cartDiscountEl.textContent = `-$${totals.discountAmount.toFixed(2)}`;
      } else {
        document.getElementById('discount-row').style.display = 'none';
      }
    }
    if (cartTaxEl) cartTaxEl.textContent = `$${totals.tax.toFixed(2)}`;
    if (cartTotalEl) cartTotalEl.textContent = `$${totals.finalTotal.toFixed(2)}`;

    // Free shipping progress bar
    if (shippingTrackFill && shippingText) {
      shippingTrackFill.style.width = `${totals.progressToFreeShipping}%`;
      if (totals.progressToFreeShipping >= 100) {
        shippingText.innerHTML = `<strong>You unlocked Free Delivery!</strong> 🎉`;
      } else {
        shippingText.innerHTML = `Add <strong>$${totals.amountNeededForFreeShipping}</strong> more for Free Delivery`;
      }
    }

    // Cart Items Rendering
    if (cartItemsList) {
      if (state.cart.length === 0) {
        cartItemsList.innerHTML = `
          <div class="cart-empty-state">
            <div class="cart-empty-icon">
              <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
            <h4>Your shopping bag is empty</h4>
            <p style="font-size:0.85rem;">Discover our 3D products and add your favorites.</p>
          </div>
        `;
      } else {
        cartItemsList.innerHTML = state.cart.map(item => `
          <div class="cart-item">
            <img class="cart-item-image" src="${item.image}" alt="${item.name}" />
            <div class="cart-item-details">
              <div class="cart-item-title">${item.name}</div>
              <div class="cart-item-color">Color: ${item.color}</div>
              <div class="cart-item-footer">
                <div class="quantity-stepper">
                  <button class="stepper-btn" onclick="appStore.updateQuantity('${item.productId}', '${item.color}', -1)">-</button>
                  <span class="stepper-val">${item.quantity}</span>
                  <button class="stepper-btn" onclick="appStore.updateQuantity('${item.productId}', '${item.color}', 1)">+</button>
                </div>
                <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="cart-item-remove" onclick="appStore.removeFromCart('${item.productId}', '${item.color}')">Remove</button>
              </div>
            </div>
          </div>
        `).join('');
      }
    }
  });

  // 4. Cart Drawer Toggles
  const openCart = () => {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
  };

  const closeCart = () => {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
  };

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // 5. Promo Code Handler
  if (promoApplyBtn) {
    promoApplyBtn.addEventListener('click', () => {
      const code = promoInput.value;
      const res = appStore.applyPromoCode(code);
      if (res.success) {
        showToast(res.message, 'success');
        promoInput.value = '';
      } else {
        showToast(res.message, 'error');
      }
    });
  }

  // 6. Search, Filter & Sort
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      appStore.setSearchQuery(e.target.value);
      renderProducts();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      appStore.setSort(e.target.value);
      renderProducts();
    });
  }

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      appStore.setCategory(tab.dataset.category);
      renderProducts();
    });
  });

  // 7. Hero 3D Toolbar Buttons
  document.querySelectorAll('.toolbar-swatches .swatch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.toolbar-swatches .swatch-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const hex = parseInt(btn.dataset.hex);
      if (aura3D) aura3D.setShellColor(hex);
    });
  });

  const toggleRotateBtn = document.getElementById('toggle-rotate-btn');
  if (toggleRotateBtn) {
    toggleRotateBtn.addEventListener('click', () => {
      const isRotating = aura3D.toggleAutoRotate();
      toggleRotateBtn.classList.toggle('active', isRotating);
      toggleRotateBtn.innerHTML = isRotating 
        ? `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83"/></svg> Rotation ON`
        : `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/></svg> Rotation OFF`;
    });
  }

  const toggleExplodedBtn = document.getElementById('toggle-exploded-btn');
  if (toggleExplodedBtn) {
    toggleExplodedBtn.addEventListener('click', () => {
      const isExploded = aura3D.toggleExplodedView();
      toggleExplodedBtn.classList.toggle('active', isExploded);
      toggleExplodedBtn.innerHTML = isExploded 
        ? `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1"/></svg> Assemble View`
        : `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg> Exploded View`;
    });
  }

  // 8. Checkout Stepper & Submission
  if (checkoutOpenBtn) {
    checkoutOpenBtn.addEventListener('click', () => {
      if (appStore.state.cart.length === 0) {
        showToast("Your shopping bag is empty. Add a product first!", "error");
        return;
      }
      closeCart();
      checkoutOverlay.classList.add('open');
      populateOrderReview();
    });
  }

  function populateOrderReview() {
    const totals = appStore.getCartTotals();
    const reviewList = document.getElementById('checkout-items-summary');
    if (reviewList) {
      reviewList.innerHTML = appStore.state.cart.map(item => `
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.88rem;">
          <span>${item.quantity}x ${item.name} (${item.color})</span>
          <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
        </div>
      `).join('');
    }
    const totalEl = document.getElementById('checkout-final-total');
    if (totalEl) totalEl.textContent = `$${totals.finalTotal.toFixed(2)}`;
  }

  window.closeCheckout = () => {
    checkoutOverlay.classList.remove('open');
  };

  window.submitOrderForm = async (e) => {
    e.preventDefault();
    const name = document.getElementById('ship-name').value.trim();
    const email = document.getElementById('ship-email').value.trim();
    const address = document.getElementById('ship-address').value.trim();
    const city = document.getElementById('ship-city').value.trim();
    const zip = document.getElementById('ship-zip').value.trim();

    if (!name || !email || !address || !city || !zip) {
      showToast("Please fill out all delivery fields.", "error");
      return;
    }

    const totals = appStore.getCartTotals();
    const payload = {
      customer: { name, email, address, city, postalCode: zip },
      items: appStore.state.cart,
      totals: totals
    };

    const result = await apiService.submitOrder(payload);

    if (result && result.success) {
      checkoutOverlay.classList.remove('open');
      appStore.clearCart();
      
      // Populate Confirmation Modal
      document.getElementById('conf-order-id').textContent = result.orderId;
      document.getElementById('conf-email').textContent = email;
      document.getElementById('conf-delivery').textContent = result.estimatedDelivery;
      confirmationOverlay.classList.add('open');
      
      // Trigger Celebration Confetti
      launchConfetti();
    }
  };

  window.closeConfirmation = () => {
    confirmationOverlay.classList.remove('open');
  };

  // 9. Toast Notification Utility
  window.showToast = (message, type = 'info') => {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? '✓' : type === 'error' ? '⚠️' : 'ℹ️';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };

  // 10. Self-Contained Celebration Confetti
  function launchConfetti() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999';
    document.body.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    const particles = [];
    const colors = ['#22d3ee', '#a855f7', '#fbbf24', '#10b981', '#f43f5e'];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.7) * 18,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 10
      });
    }

    let frame = 0;
    function renderConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // Gravity
        p.rotation += p.vr;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      frame++;
      if (frame < 120) {
        requestAnimationFrame(renderConfetti);
      } else {
        canvas.remove();
      }
    }
    requestAnimationFrame(renderConfetti);
  }

  // 11. Theme Toggle
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const nextTheme = appStore.toggleTheme();
      showToast(`Switched to ${nextTheme === 'dark' ? 'Obsidian Dark' : 'Studio Light'} mode`);
    });
  }

  // 12. Keyboard Accessibility (Escape Closes Overlays) - FLAW-003 Resolution
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (quickLookOverlay.classList.contains('open')) quickLookOverlay.classList.remove('open');
      if (checkoutOverlay.classList.contains('open')) checkoutOverlay.classList.remove('open');
      if (confirmationOverlay.classList.contains('open')) confirmationOverlay.classList.remove('open');
      if (cartOverlay.classList.contains('open')) closeCart();
    }
  });

  // Initial catalog render
  renderProducts();
});
