// Quick View Functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('quickViewModal');
    const modalContent = modal.querySelector('.book-details');
    const closeBtn = modal.querySelector('.modal-close');

    // Book details data (in a real application, this would come from a database)
    const bookDetails = {
        'The Midnight Library': {
            title: 'The Midnight Library',
            author: 'Matt Haig',
            description: `Between life and death there is a library, and within that library, the shelves go on forever. 
                Every book provides a chance to try another life you could have lived. To see how things would be if you 
                had made other choices... Would you have done anything different, if you had the chance to undo your regrets?`,
            price: 24.99,
            isbn: '978-0525559474',
            publisher: 'Viking',
            published: 'August 13, 2020',
            pages: 304,
            language: 'English',
            genre: 'Fiction, Fantasy',
            rating: 4.5,
            reviews: 128,
            image: './assets/images/book-1.png'
        },
        'Atomic Habits': {
            title: 'Atomic Habits',
            author: 'James Clear',
            description: `No matter your goals, Atomic Habits offers a proven framework for improving--every day. 
                James Clear, one of the world's leading experts on habit formation, reveals practical strategies 
                that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors 
                that lead to remarkable results.`,
            price: 29.99,
            isbn: '978-0735211292',
            publisher: 'Avery',
            published: 'October 16, 2018',
            pages: 320,
            language: 'English',
            genre: 'Self-help, Personal Development',
            rating: 5,
            reviews: 245,
            image: './assets/images/book-2.png'
        },
        'The Gruffalo': {
            title: 'The Gruffalo',
            author: 'Julia Donaldson',
            description: `A mouse is taking a stroll through the deep, dark wood when along comes a hungry fox, 
                then an owl, and then a snake. The mouse is good enough to eat but smart enough to know this, 
                so he invents... the gruffalo! As Mouse explains, the gruffalo is a creature with terrible features, 
                a terrible creature who scares away all the other animals.`,
            price: 19.99,
            isbn: '978-0142403877',
            publisher: 'Puffin Books',
            published: 'March 2, 2006',
            pages: 32,
            language: 'English',
            genre: "Children's Literature",
            rating: 4,
            reviews: 156,
            image: './assets/images/book-3.png'
        }
    };

    // Open modal with book details
    function openQuickView(bookTitle) {
        const book = bookDetails[bookTitle];
        if (!book) return;

        modalContent.innerHTML = `
            <div class="quick-view-grid">
                <div class="quick-view-image">
                    <img src="${book.image}" alt="${book.title}">
                </div>
                <div class="quick-view-info">
                    <h2>${book.title}</h2>
                    <p class="author">by ${book.author}</p>
                    <div class="rating">
                        ${generateStarRating(book.rating)}
                        <span class="review-count">(${book.reviews} reviews)</span>
                    </div>
                    <p class="price">$${book.price.toFixed(2)}</p>
                    <p class="description">${book.description}</p>
                    <div class="book-meta">
                        <p><strong>ISBN:</strong> ${book.isbn}</p>
                        <p><strong>Publisher:</strong> ${book.publisher}</p>
                        <p><strong>Published:</strong> ${book.published}</p>
                        <p><strong>Pages:</strong> ${book.pages}</p>
                        <p><strong>Language:</strong> ${book.language}</p>
                        <p><strong>Genre:</strong> ${book.genre}</p>
                    </div>
                    <div class="quick-view-actions">
                        <button class="btn btn-primary add-to-cart">Add to Cart</button>
                        <button class="btn add-to-wishlist">Add to Wishlist</button>
                    </div>
                </div>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Add event listeners for the new buttons
        const addToCartBtn = modalContent.querySelector('.add-to-cart');
        const addToWishlistBtn = modalContent.querySelector('.add-to-wishlist');

        addToCartBtn.addEventListener('click', () => {
            cart.addItem({
                id: book.isbn,
                title: book.title,
                price: book.price
            });
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Generate star rating HTML
    function generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let html = '';

        for (let i = 0; i < fullStars; i++) {
            html += '<ion-icon name="star"></ion-icon>';
        }
        if (hasHalfStar) {
            html += '<ion-icon name="star-half"></ion-icon>';
        }
        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
            html += '<ion-icon name="star-outline"></ion-icon>';
        }

        return html;
    }

    // Add click event listeners to quick view buttons
    document.querySelectorAll('.action-btn[aria-label="quick view"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.product-card');
            const title = card.querySelector('.card-title').textContent;
            openQuickView(title);
        });
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}); 