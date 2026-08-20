const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;
  
  content = content.replace(/(<h1[^>]*class="[^"]*about-title[^"]*"[^>]*>)(.*?)(<\/h1>)/gs, (match, p1, p2, p3) => {
      let rawText = p2.replace(/<[^>]+>/g, '').trim();
      let words = rawText.split(/\s+/);
      let newInner = '';
      if (words.length === 1) {
          newInner = words[0]; // Just plain text, which will be black by default CSS
      } else if (words.length > 1) {
          newInner = words[0] + ' <span class="text-pink">' + words.slice(1).join(' ') + '</span>';
      }
      return p1 + newInner + p3;
  });
  
  if (content !== original) {
      fs.writeFileSync(f, content);
      console.log('Updated ' + f);
  }
});

let jsContent = fs.readFileSync('script.js', 'utf8');
let jsOriginal = jsContent;
if (jsContent.includes('subcatTitle.innerHTML = categoryTitle;')) {
    jsContent = jsContent.replace(/subcatTitle\.innerHTML = categoryTitle;/g, 
      "let titleWords = categoryTitle.trim().split(/\\s+/);\n        if (titleWords.length === 1) {\n            subcatTitle.innerHTML = titleWords[0];\n        } else if (titleWords.length > 1) {\n            subcatTitle.innerHTML = `${titleWords[0]} <span class=\"text-pink\">${titleWords.slice(1).join(' ')}</span>`;\n        }");
}
if (jsContent !== jsOriginal) {
    fs.writeFileSync('script.js', jsContent);
    console.log('Updated script.js');
}
