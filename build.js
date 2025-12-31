const fs = require('fs');
const path = require('path');

// Define source and destination directories
const srcDir = './src';
const publicDir = './public';

// Ensure public directory exists with images subdirectory
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

if (!fs.existsSync(path.join(publicDir, 'images'))) {
    fs.mkdirSync(path.join(publicDir, 'images'), { recursive: true });
}

// Copy HTML, CSS, JS files to public
copyFileToPublic('index.html');
copyFileToPublic('styles.css');

// Copy JavaScript files
const jsSrcDir = path.join(srcDir, 'js');
const jsDestDir = path.join(publicDir, 'js');
if (fs.existsSync(jsSrcDir)) {
    // Remove old js directory if it exists
    if (fs.existsSync(jsDestDir)) {
        fs.rmSync(jsDestDir, { recursive: true, force: true });
    }
    
    fs.mkdirSync(jsDestDir, { recursive: true });
    const jsFiles = fs.readdirSync(jsSrcDir);
    jsFiles.forEach(file => {
        const srcPath = path.join(jsSrcDir, file);
        const destPath = path.join(jsDestDir, file);
        if (fs.statSync(srcPath).isFile()) {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied ${file} to public/js directory`);
        }
    });
}

// Copy content files (RK3588 and RK1820 documentation)
const contentSrcDir = path.join(srcDir, 'content');
const contentDestDir = path.join(publicDir, 'content');
if (fs.existsSync(contentSrcDir)) {
    // Remove old content directory if it exists
    if (fs.existsSync(contentDestDir)) {
        fs.rmSync(contentDestDir, { recursive: true, force: true });
    }
    
    copyDirectory(contentSrcDir, contentDestDir);
    console.log('Copied content directory to public/content');
}

// Helper function to copy a single file to public
function copyFileToPublic(fileName) {
    const srcPath = path.join(srcDir, fileName);
    const destPath = path.join(publicDir, fileName);
    
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${fileName} to public directory`);
    } else {
        console.log(`${fileName} does not exist in src directory`);
    }
}

// Helper function to recursively copy directories
function copyDirectory(src, dest) {
    if (!fs.existsSync(src)) {
        console.log(`Source directory does not exist: ${src}`);
        return;
    }
    
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    
    const items = fs.readdirSync(src);
    
    for (const item of items) {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);
        
        const stat = fs.statSync(srcPath);
        
        if (stat.isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

console.log('Build completed successfully!');
console.log('Files in public/:', fs.readdirSync(publicDir));
if (fs.existsSync(path.join(publicDir, 'content'))) {
    console.log('Content directories:', fs.readdirSync(path.join(publicDir, 'content')));
}