/**
 * AURA x NIKE Navigation & Search Micro-Interaction Engine
 * Handles Mega-Menu, Animated Search Overlay, Live Autocomplete, and Routing
 * Verified by Flaw Hunter
 */

class NikeNavSearchEngine {
  constructor() {
    this.searchOverlay = document.getElementById('nike-search-overlay');
    this.searchInput = document.getElementById('nike-search-input');
    this.searchTrigger = document.getElementById('nav-search-trigger');
    this.searchCancelBtn = document.getElementById('search-cancel-btn');
    this.liveResultsContainer = document.getElementById('live-search-results');
    this.popularTagsContainer = document.getElementById('popular-search-tags');
    this.themeToggleBtn = document.getElementById('theme-toggle-btn');
    this.cartCountBadge = document.getElementById('nav-cart-badge');

    this.popularTerms = [
      "Spatial Audio",
      "Pro Headphones",
      "Smart Glasses",
      "Titanium Watch",
      "Wireless Earbuds",
      "Fast Dock",
      "Cinema Soundbar"
    ];

    this.init();
  }

  init() {
    this.bindSearchEvents();
    this.bindMegaMenus();
    this.bindThemeEvents();
    this.syncCartBadge();

    // Listen to store updates
    if (window.appStore) {
      window.appStore.subscribe(() => {
        this.syncCartBadge();
      });
    }
  }

  bindSearchEvents() {
    if (this.searchTrigger) {
      this.searchTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.openSearch();
      });
    }

    if (this.searchCancelBtn) {
      this.searchCancelBtn.addEventListener('click', () => {
        this.closeSearch();
      });
    }

    if (this.searchOverlay) {
      this.searchOverlay.addEventListener('click', (e) => {
        if (e.target === this.searchOverlay) {
          this.closeSearch();
        }
      });
    }

    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.handleLiveSearch(e.target.value);
      });

      this.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.executeSearch(this.searchInput.value);
        } else if (e.key === 'Escape') {
          this.closeSearch();
        }
      });
    }

    // Keyboard shortcut "/" to quickly open search (Nike-style power feature)
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== this.searchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        this.openSearch();
      } else if (e.key === 'Escape') {
        this.closeSearch();
      }
    });

    // Populate Popular Search Terms
    if (this.popularTagsContainer) {
      this.popularTagsContainer.innerHTML = this.popularTerms.map(term => `
        <button type="button" class="popular-tag-btn" onclick="window.navSearch.executeSearch('${term}')">
          ${term}
        </button>
      `).join('');
    }
  }

  openSearch() {
    if (!this.searchOverlay) return;
    this.searchOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      if (this.searchInput) this.searchInput.focus();
    }, 150);
  }

  closeSearch() {
    if (!this.searchOverlay) return;
    this.searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (this.searchInput) this.searchInput.value = '';
    if (this.liveResultsContainer) this.liveResultsContainer.innerHTML = '';
  }

  executeSearch(query) {
    const term = (query || '').trim();
    this.closeSearch();
    window.location.href = `shop.html?search=${encodeURIComponent(term)}`;
  }

  handleLiveSearch(query) {
    if (!this.liveResultsContainer) return;
    const term = (query || '').trim().toLowerCase();

    if (!term || !window.PRODUCTS_DATA) {
      this.liveResultsContainer.innerHTML = '';
      return;
    }

    const matches = window.PRODUCTS_DATA.filter(p => 
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.tagline.toLowerCase().includes(term)
    ).slice(0, 4);

    if (matches.length === 0) {
      this.liveResultsContainer.innerHTML = `
        <div style="padding:1rem; color:var(--text-secondary); font-size:0.9rem;">
          No matching products found for "${term}".
        </div>
      `;
      return;
    }

    this.liveResultsContainer.innerHTML = `
      <div class="live-search-grid">
        ${matches.map(p => `
          <a href="product.html?id=${p.id}" class="live-search-item">
            <img src="${p.image}" alt="${p.name}" />
            <div>
              <div class="live-item-title">${p.name}</div>
              <div class="live-item-category">${p.category}</div>
              <div class="live-item-price">$${p.price}</div>
            </div>
          </a>
        `).join('')}
      </div>
    `;
  }

  bindMegaMenus() {
    const navItems = document.querySelectorAll('.nav-item-dropdown');
    navItems.forEach(item => {
      let timeout;
      item.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
        item.classList.add('dropdown-open');
      });
      item.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
          item.classList.remove('dropdown-open');
        }, 120);
      });
    });
  }

  bindThemeEvents() {
    const savedTheme = localStorage.getItem('aura_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('aura_theme', next);
      });
    }
  }

  syncCartBadge() {
    if (!this.cartCountBadge) return;
    try {
      let count = 0;
      if (window.appStore) {
        count = window.appStore.getCartTotals().totalItems;
      } else {
        const saved = JSON.parse(localStorage.getItem('aura_store_v1') || '{}');
        if (saved.cart && Array.isArray(saved.cart)) {
          count = saved.cart.reduce((sum, i) => sum + (i.quantity || 1), 0);
        }
      }
      this.cartCountBadge.textContent = count;
      this.cartCountBadge.style.display = count > 0 ? 'flex' : 'none';
    } catch (e) {
      // silent
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.navSearch = new NikeNavSearchEngine();
});
