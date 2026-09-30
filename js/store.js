/**
 * AURA Storefront - Reactive State Management
 * Developed by Agent 3 (Senior Front-End)
 * Audited & Verified by Flaw Hunter (FLAW-004 resolved)
 */

class Store {
  constructor() {
    this.subscribers = [];
    this.STORAGE_KEY = 'aura_store_v1';
    
    // Initial State
    this.state = {
      cart: [],
      promo: {
        code: null,
        discountPercent: 0,
        freeShipping: false
      },
      filters: {
        category: 'All',
        search: '',
        sort: 'featured'
      },
      theme: 'dark',
      user: {
        isLoggedIn: false,
        name: null,
        email: null,
        token: null
      }
    };

    this.loadPersistedState();
  }

  loadPersistedState() {
    if (typeof localStorage === 'undefined') return;
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.cart && Array.isArray(parsed.cart)) {
          this.state.cart = parsed.cart;
        }
        if (parsed.theme) {
          this.state.theme = parsed.theme;
        }
        if (parsed.user) {
          this.state.user = parsed.user;
        }
      }
    } catch (e) {
      console.warn("Could not load stored state, initializing fresh.", e);
    }
  }

  persistState() {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
        cart: this.state.cart,
        theme: this.state.theme,
        user: this.state.user
      }));
    } catch (e) {
      console.warn("Could not persist state to localStorage.", e);
    }
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    // Call immediately with current state
    callback(this.state, this.getCartTotals());
    return () => {
      this.subscribers = this.subscribers.filter(fn => fn !== callback);
    };
  }

  notify() {
    this.persistState();
    const totals = this.getCartTotals();
    this.subscribers.forEach(fn => fn(this.state, totals));
  }

  // Cart Operations
  addToCart(product, colorName = null, quantity = 1) {
    const selectedColor = colorName || (product.colors && product.colors[0] ? product.colors[0].name : "Standard");
    const existingIndex = this.state.cart.findIndex(
      item => item.productId === product.id && item.color === selectedColor
    );

    if (existingIndex > -1) {
      this.state.cart[existingIndex].quantity += quantity;
    } else {
      this.state.cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: selectedColor,
        quantity: quantity
      });
    }

    this.notify();
  }

  updateQuantity(productId, color, delta) {
    const item = this.state.cart.find(
      i => i.productId === productId && i.color === color
    );
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeFromCart(productId, color);
      return;
    }

    this.notify();
  }

  removeFromCart(productId, color) {
    this.state.cart = this.state.cart.filter(
      i => !(i.productId === productId && i.color === color)
    );
    this.notify();
  }

  clearCart() {
    this.state.cart = [];
    this.notify();
  }

  // Promo Engine
  applyPromoCode(rawCode) {
    const code = (rawCode || '').trim().toUpperCase();
    if (code === 'WELCOME20') {
      this.state.promo = {
        code: 'WELCOME20',
        discountPercent: 20,
        freeShipping: false
      };
      this.notify();
      return { success: true, message: "20% Discount applied to your bag!" };
    } else if (code === 'FREESHIP') {
      this.state.promo = {
        code: 'FREESHIP',
        discountPercent: 0,
        freeShipping: true
      };
      this.notify();
      return { success: true, message: "Free Delivery applied to your order!" };
    } else {
      return { success: false, message: "Invalid promo code. Try WELCOME20 or FREESHIP" };
    }
  }

  removePromoCode() {
    this.state.promo = {
      code: null,
      discountPercent: 0,
      freeShipping: false
    };
    this.notify();
  }

  // Totals Calculation
  getCartTotals() {
    const subtotal = this.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = this.state.cart.reduce((sum, item) => sum + item.quantity, 0);

    // Free delivery threshold: $150
    const threshold = 150;
    const progressToFreeShipping = Math.min(100, Math.round((subtotal / threshold) * 100));
    const amountNeededForFreeShipping = Math.max(0, threshold - subtotal);

    let discountAmount = 0;
    if (this.state.promo.discountPercent > 0) {
      discountAmount = (subtotal * this.state.promo.discountPercent) / 100;
    }

    const discountedSubtotal = Math.max(0, subtotal - discountAmount);

    let shippingFee = 0;
    if (subtotal > 0) {
      if (subtotal >= threshold || this.state.promo.freeShipping) {
        shippingFee = 0;
      } else {
        shippingFee = 15;
      }
    }

    // 8% tax on discounted subtotal
    const tax = subtotal > 0 ? (discountedSubtotal * 0.08) : 0;
    const finalTotal = discountedSubtotal + shippingFee + tax;

    return {
      subtotal: Number(subtotal.toFixed(2)),
      totalItems,
      discountAmount: Number(discountAmount.toFixed(2)),
      shippingFee: Number(shippingFee.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      finalTotal: Number(finalTotal.toFixed(2)),
      threshold,
      progressToFreeShipping,
      amountNeededForFreeShipping: Number(amountNeededForFreeShipping.toFixed(2))
    };
  }

  // Filters
  setCategory(category) {
    this.state.filters.category = category;
    this.notify();
  }

  setSearchQuery(query) {
    this.state.filters.search = query;
    this.notify();
  }

  setSort(sortValue) {
    this.state.filters.sort = sortValue;
    this.notify();
  }

  // Theme
  setTheme(theme) {
    this.state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    this.notify();
  }

  toggleTheme() {
    const nextTheme = this.state.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
    return nextTheme;
  }
}

// Global Store Instance
const appStore = new Store();
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Store };
}
