const fs = require('fs');
const path = require('path');

// Ensure 'dist' directory exists
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const cssContent = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');
const jsContent = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');

const combinedHtml = htmlContent
    .replace('<link rel="stylesheet" href="style.css">', `<style>${cssContent}</style>`)
    .replace('<script src="script.js"></script>', `<script>${jsContent}</script>`);

fs.writeFileSync(path.join(distDir, 'index.html'), combinedHtml, 'utf8');

console.log('Single, serverless index.html generated successfully in the "dist" directory!');
