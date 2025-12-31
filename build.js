const fs = require('fs');
const path = require('path');

// Define source and destination directories
const srcDir = './src';
const publicDir = './public';

// Create public directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Copy HTML files from src/pages to public
const pagesDir = path.join(srcDir, 'pages');
const files = fs.readdirSync(pagesDir);

files.forEach(file => {
    if (path.extname(file) === '.html') {
        const srcPath = path.join(pagesDir, file);
        const destPath = path.join(publicDir, file);
        
        let content = fs.readFileSync(srcPath, 'utf8');
        
        // Update relative paths to work from public directory
        content = content.replace(/\.\.\/styles\.css/g, 'styles.css');
        content = content.replace(/\.\.\/components/g, 'components');
        
        fs.writeFileSync(destPath, content);
        console.log(`Copied ${file} to public directory`);
    }
});

// Copy CSS file
const cssSrc = path.join(srcDir, 'styles.css');
const cssDest = path.join(publicDir, 'styles.css');
if (fs.existsSync(cssSrc)) {
    fs.copyFileSync(cssSrc, cssDest);
    console.log('Copied styles.css to public directory');
} else {
    // Create a default styles.css if it doesn't exist
    const defaultCSS = `
/* Global Styles */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
    color: #333;
}

/* Navigation Styles */
.navbar {
    background-color: #2c3e50;
    padding: 1rem 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
}

.nav-logo {
    color: white;
    font-size: 1.5rem;
    text-decoration: none;
    font-weight: bold;
}

.nav-menu {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-item {
    margin-left: 2rem;
}

.nav-link {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
}

.nav-link:hover {
    color: #3498db;
}

/* RK Chips Header */
.rk-chips-header {
    background-color: #ecf0f1;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #bdc3c7;
}

.rk-chip {
    text-align: center;
    padding: 1rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    width: 45%;
}

.rk-chip h3 {
    margin: 0 0 0.5rem 0;
    color: #2c3e50;
}

/* Container for page content */
.container {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 2rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    padding: 2rem;
}

h1 {
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 0.5rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .nav-container {
        flex-direction: column;
        padding: 1rem;
    }
    
    .nav-menu {
        margin-top: 1rem;
    }
    
    .nav-item {
        margin: 0 1rem;
    }
    
    .rk-chips-header {
        flex-direction: column;
    }
    
    .rk-chip {
        width: 100%;
        margin-bottom: 1rem;
    }
}
    `;
    fs.writeFileSync(cssDest, defaultCSS);
    console.log('Created default styles.css in public directory');
}

// Copy components directory
const componentsSrc = path.join(srcDir, 'components');
const componentsDest = path.join(publicDir, 'components');

if (!fs.existsSync(componentsDest)) {
    fs.mkdirSync(componentsDest, { recursive: true });
}

const componentFiles = fs.readdirSync(componentsSrc);
componentFiles.forEach(file => {
    const srcPath = path.join(componentsSrc, file);
    const destPath = path.join(componentsDest, file);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file} to public/components directory`);
});

console.log('Build completed successfully!');