// Search functionality
class SearchHandler {
    constructor() {
        this.searchInput = document.querySelector('.input-field');
        this.searchResults = document.createElement('div');
        this.searchResults.className = 'search-results';
        this.searchInput.parentElement.appendChild(this.searchResults);
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.searchInput.addEventListener('input', () => this.handleSearch());
        document.addEventListener('click', (e) => {
            if (!this.searchInput.contains(e.target) && !this.searchResults.contains(e.target)) {
                this.searchResults.classList.remove('active');
            }
        });
    }

    handleSearch() {
        const query = this.searchInput.value.toLowerCase().trim();
        if (query.length < 2) {
            this.searchResults.classList.remove('active');
            return;
        }

        // Get all product cards
        const products = document.querySelectorAll('.product-card');
        const results = Array.from(products).filter(product => {
            const title = product.querySelector('.card-title').textContent.toLowerCase();
            return title.includes(query);
        });

        this.displayResults(results);
    }

    displayResults(results) {
        if (results.length === 0) {
            this.searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
        } else {
            this.searchResults.innerHTML = results.map(product => {
                const title = product.querySelector('.card-title').textContent;
                const price = product.querySelector('.card-price').textContent;
                return `
                    <div class="search-result-item" data-product-id="${product.dataset.id}">
                        <div class="result-title">${title}</div>
                        <div class="result-price">${price}</div>
                    </div>
                `;
            }).join('');
        }
        this.searchResults.classList.add('active');

        // Add click handlers to results
        this.searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const productId = item.dataset.productId;
                const product = document.querySelector(`.product-card[data-id="${productId}"]`);
                if (product) {
                    product.scrollIntoView({ behavior: 'smooth' });
                    this.searchResults.classList.remove('active');
                    this.searchInput.value = '';
                }
            });
        });
    }
}

// Initialize search
document.addEventListener('DOMContentLoaded', () => {
    new SearchHandler();
}); 