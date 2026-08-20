const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;
  content = content.replace(/background-image:\s*url\('assets\/hero\//g, "background-image: linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url('assets/hero/");
  
  if (f === 'sub-category.html') {
      content = content.replace(/background-image:\s*url\('assets\/baby-care\//g, "background-image: linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url('assets/baby-care/");
  }
  
  if (content !== original) {
      fs.writeFileSync(f, content);
      console.log('Updated ' + f);
  }
});

let jsContent = fs.readFileSync('script.js', 'utf8');
if (jsContent.includes("url('${imgPath}')")) {
    jsContent = jsContent.replace("url('${imgPath}')", "linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url('${imgPath}')");
    fs.writeFileSync('script.js', jsContent);
    console.log('Updated script.js');
}
