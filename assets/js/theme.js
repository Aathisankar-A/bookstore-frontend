// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.createThemeToggle();
        this.applyTheme();
    }

    createThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.setAttribute('aria-label', 'Toggle theme');
        themeToggle.innerHTML = `<ion-icon name="${this.theme === 'dark' ? 'sunny-outline' : 'moon-outline'}"></ion-icon>`;
        
        themeToggle.addEventListener('click', () => this.toggleTheme());
        document.body.appendChild(themeToggle);
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
        
        // Update toggle button icon
        const toggleBtn = document.querySelector('.theme-toggle');
        if (toggleBtn) {
            toggleBtn.innerHTML = `<ion-icon name="${this.theme === 'dark' ? 'sunny-outline' : 'moon-outline'}"></ion-icon>`;
        }
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        document.body.style.backgroundColor = this.theme === 'dark' ? 'var(--xiketic)' : 'var(--white-2)';
        document.body.style.color = this.theme === 'dark' ? 'var(--white-1)' : 'var(--eerie-black)';
    }
}

// Initialize theme manager
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
}); 