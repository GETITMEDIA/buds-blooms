const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;
  
  // Remove gradient overlay
  content = content.replace(/linear-gradient\(rgba\(0,0,0,0\.3\), rgba\(0,0,0,0\.3\)\),\s*/g, '');
  
  // Remove spans from about-title
  content = content.replace(/(<h1[^>]*class="[^"]*about-title[^"]*"[^>]*>)(.*?)(<\/h1>)/gs, (match, p1, p2, p3) => {
      let rawText = p2.replace(/<[^>]+>/g, '').trim();
      return p1 + rawText + p3;
  });
  
  if (content !== original) {
      fs.writeFileSync(f, content);
      console.log('Updated ' + f);
  }
});

let jsContent = fs.readFileSync('script.js', 'utf8');
let jsOriginal = jsContent;
jsContent = jsContent.replace(/linear-gradient\(rgba\(0,0,0,0\.3\), rgba\(0,0,0,0\.3\)\),\s*/g, '');
if (jsContent.includes('titleWords.length')) {
    jsContent = jsContent.replace(/let titleWords = categoryTitle\.trim\(\)\.split\(\/\\s\+\/\);\s*if \(titleWords\.length === 1\) \{\s*subcatTitle\.innerHTML = `<span class="text-pink">\$\{titleWords\[0\]\}<\/span>`;\s*\} else if \(titleWords\.length > 1\) \{\s*subcatTitle\.innerHTML = `\$\{titleWords\[0\]\} <span class="text-pink">\$\{titleWords\.slice\(1\)\.join\(' '\)\}<\/span>`;\s*\}/g, 'subcatTitle.innerHTML = categoryTitle;');
}
if (jsContent !== jsOriginal) {
    fs.writeFileSync('script.js', jsContent);
    console.log('Updated script.js');
}

let cssContent = fs.readFileSync('style.css', 'utf8');
let cssOriginal = cssContent;
cssContent = cssContent.replace(/\.about-title \{\s*font-family: var\(--font-display\);\s*font-size: 64px;\s*font-weight: 900;\s*color: #ffffff;/g, '.about-title {\n  font-family: var(--font-display);\n  font-size: 64px;\n  font-weight: 900;\n  color: var(--black);');
cssContent = cssContent.replace(/\.about-subtitle \{\s*font-size: 20px;\s*color: rgba\(255, 255, 255, 0\.9\);/g, '.about-subtitle {\n  font-size: 20px;\n  color: var(--gray-600);');
if (cssContent !== cssOriginal) {
    fs.writeFileSync('style.css', cssContent);
    console.log('Updated style.css');
}
