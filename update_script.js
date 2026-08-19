const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');

files.forEach(f => {
    const basename = path.basename(f, '.html');
    const imgPath = `assets/hero/${basename}-hero.png`;
    
    if (fs.existsSync(imgPath)) {
        let content = fs.readFileSync(f, 'utf8');
        
        // 1. Strip old style block
        content = content.replace(/<style>\s*\.[a-zA-Z0-9_-]+-hero\s*\{[\s\S]*?<\/style>/, '');
        
        // 2. Replace section
        const newSection = `<section class="about-hero" style="position: relative; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 400px; padding: 0 20px; text-align: center; background-image: url('${imgPath}'); background-size: cover; background-position: center; border-radius: 0 0 30px 30px; margin-bottom: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">`;
        content = content.replace(/<section class="about-hero[^>]*>/, newSection);
        
        // 3. Replace h1
        const newH1 = `<h1 class="about-title" style="font-size: 3rem; margin-bottom: 15px; color: #fff; text-shadow: 0 4px 20px rgba(0,0,0,0.6);">$1</h1>`;
        content = content.replace(/<h1 class="about-title"[^>]*>([\s\S]*?)<\/h1>/g, newH1);
        
        // 4. Replace p
        const newP = `<p class="about-subtitle" style="color: #fff; font-weight: 500; font-size: 1.1rem; text-shadow: 0 2px 10px rgba(0,0,0,0.8);">$1</p>`;
        content = content.replace(/<p class="about-subtitle"[^>]*>([\s\S]*?)<\/p>/g, newP);
        
        // 5. Remove text-shadow from text-pink and text-blue spans
        content = content.replace(/<span class="(text-pink|text-blue)"\s*style="[^"]*">/g, '<span class="$1">');
        content = content.replace(/<span class="(text-pink|text-blue)">/g, '<span class="$1" style="text-shadow: none;">');
        
        fs.writeFileSync(f, content, 'utf8');
        console.log(`Updated ${f}`);
    } else {
        console.log(`Image not found for ${f}: ${imgPath}`);
    }
});
