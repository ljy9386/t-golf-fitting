// Layout Component Loader
class LayoutLoader {
    static async loadComponent(elementId, componentPath) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`Failed to load ${componentPath}`);
            }
            const html = await response.text();
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = html;
            }
        } catch (error) {
            console.error('Error loading component:', error);
        }
    }

    static async init() {
        // Load header
        await this.loadComponent('header-placeholder', 'layouts/header.html');

        // Load footer
        await this.loadComponent('footer-placeholder', 'layouts/footer.html');
    }
}

// Initialize layout components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    LayoutLoader.init();
});
