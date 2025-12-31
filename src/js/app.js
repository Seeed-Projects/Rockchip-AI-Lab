document.addEventListener('DOMContentLoaded', function() {
    // Current selected chip
    let currentChip = 'rk3588'; // Default to rk3588

    // Page navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    // Set home page as active by default
    document.getElementById('home-page').classList.add('active');
    document.querySelector('.nav-link[data-page="home"]').classList.add('active-page');

    // Store loaded markdown content to avoid reloading
    const markdownCache = {};

    // Add click handlers to navigation links (except home)
    navLinks.forEach(link => {
        const targetPage = link.getAttribute('data-page');

        if (targetPage !== 'home') {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                // Update active nav link
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active-page');
                });
                this.classList.add('active-page');

                // Toggle submenu visibility
                const submenu = document.getElementById(`${targetPage}-submenu`);
                if (submenu) {
                    // Hide all other submenus first
                    document.querySelectorAll('.sub-menu').forEach(menu => {
                        if (menu !== submenu) {
                            menu.style.display = 'none';
                        }
                    });

                    // Toggle current submenu
                    if (submenu.style.display === 'block') {
                        submenu.style.display = 'none';
                    } else {
                        // Load directory content first
                        loadDirectoryContent(targetPage);
                        submenu.style.display = 'block';
                    }
                }

                // Update active page
                pages.forEach(page => {
                    page.classList.remove('active');
                    if (page.id === `${targetPage}-page`) {
                        page.classList.add('active');
                    }
                });
            });
        } else {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                // Update active nav link
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active-page');
                });
                this.classList.add('active-page');

                // Hide all submenus
                document.querySelectorAll('.sub-menu').forEach(menu => {
                    menu.style.display = 'none';
                });

                // Show home page
                pages.forEach(page => {
                    page.classList.remove('active');
                    if (page.id === 'home-page') {
                        page.classList.add('active');
                    }
                });
            });
        }
    });

    // Chip selection
    const chipButtons = document.querySelectorAll('.chip-btn');

    chipButtons.forEach(button => {
        button.addEventListener('click', function() {
            const chipType = this.getAttribute('data-chip');

            // Update active chip button
            chipButtons.forEach(btn => {
                btn.classList.remove('active-chip');
            });
            this.classList.add('active-chip');

            // Update current chip
            currentChip = chipType;

            // Reload current submenu if it's open
            const activeNav = document.querySelector('.nav-link.active-page');
            const targetPage = activeNav.getAttribute('data-page');
            if (targetPage !== 'home') {
                const submenu = document.getElementById(`${targetPage}-submenu`);
                if (submenu && submenu.style.display === 'block') {
                    loadDirectoryContent(targetPage);
                }
            }
        });
    });

    // Function to load directory content
    async function loadDirectoryContent(page) {
        const contentContainer = document.getElementById(`${page}-submenu`);
        if (!contentContainer) return;

        try {
            // Show loading indicator
            contentContainer.innerHTML = '<a href="#" class="loading">Loading...</a>';

            // Fetch directory listing (in a real implementation, this would be handled by the server)
            // For now, we'll simulate the directory structure
            const directoryHtml = generateDirectoryHtml(page);

            // Display the directory
            contentContainer.innerHTML = directoryHtml;

            // Add event listeners to markdown links
            const mdLinks = contentContainer.querySelectorAll('.md-link');
            mdLinks.forEach(link => {
                link.addEventListener('click', async function(e) {
                    e.preventDefault();

                    const mdFile = this.getAttribute('data-md-file');
                    await loadMarkdownContent(page, mdFile);
                });
            });
        } catch (error) {
            console.error(`Error loading ${page} directory:`, error);
            contentContainer.innerHTML = `<a href="#" class="error">Directory for ${page.toUpperCase()} is not available.</a>`;
        }
    }

    // Function to generate directory HTML
    function generateDirectoryHtml(page) {
        // This would normally fetch from the server
        // For now, we'll create a static directory structure based on what we know exists
        let mdFiles = [];

        switch(page) {
            case 'cv':
                mdFiles = ['index.md', 'image-recognition.md', 'object-detection.md', 'scene-understanding.md'];
                break;
            case 'llm':
                mdFiles = ['index.md', 'model-optimization.md', 'hardware-acceleration.md', 'edge-deployment.md'];
                break;
            case 'vlm':
                mdFiles = ['index.md', 'multimodal-understanding.md', 'cross-modal-learning.md', 'efficient-architectures.md'];
                break;
            case 'ui':
                mdFiles = ['index.md', 'ai-enhanced-interfaces.md', 'responsive-design.md', 'performance-optimization.md'];
                break;
            default:
                mdFiles = ['index.md'];
        }

        let html = '';
        mdFiles.forEach(file => {
            const displayName = file.replace('.md', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            html += `<a href="#" class="md-link" data-md-file="${file}">${displayName}</a>`;
        });

        return html;
    }

    // Function to load markdown content
    async function loadMarkdownContent(page, mdFile) {
        const contentContainer = document.getElementById(`${page}-content`);
        if (!contentContainer) return;

        const cacheKey = `${currentChip}-${page}-${mdFile}`;

        // Check if content is already loaded
        if (markdownCache[cacheKey]) {
            contentContainer.innerHTML = markdownCache[cacheKey];
            return;
        }

        try {
            // Show loading indicator
            contentContainer.innerHTML = '<p>Loading content...</p>';

            // Fetch markdown file from the selected chip directory
            const response = await fetch(`content/${currentChip}/${page}/${mdFile}`);
            if (!response.ok) {
                throw new Error(`Failed to load content/${currentChip}/${page}/${mdFile}`);
            }

            const markdownText = await response.text();

            // Convert markdown to HTML (simplified - in a real implementation you'd use a library like marked)
            const htmlContent = convertMarkdownToHtml(markdownText);

            // Cache the content
            markdownCache[cacheKey] = htmlContent;

            // Display the content
            contentContainer.innerHTML = htmlContent;

            // Scroll to the content
            contentContainer.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error(`Error loading content/${currentChip}/${page}/${mdFile}:`, error);
            contentContainer.innerHTML = `<p>Content for ${currentChip}/${page}/${mdFile} is not available.</p>`;
        }
    }

    // Simplified markdown to HTML converter (for demonstration)
    // In a real implementation, you would use a library like marked.js
    function convertMarkdownToHtml(md) {
        // Convert headers
        let html = md.replace(/^### (.*$)/gm, '<h3>$1</h3>')
                    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                    .replace(/^# (.*$)/gm, '<h1>$1</h1>');

        // Convert bold and italic
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Convert links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

        // Convert code blocks
        html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

        // Convert inline code
        html = html.replace(/`(.*?)`/g, '<code>$1</code>');

        // Convert paragraphs
        html = html.replace(/^\s*([^#<].*?)$/gm, '<p>$1</p>');

        // Remove empty paragraphs
        html = html.replace(/<p><\/p>/g, '');

        return html;
    }

    // Initialize home page content if needed
    // Home page content is already in HTML, so no need to load markdown
});