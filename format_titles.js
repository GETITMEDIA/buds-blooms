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
          newInner = '<span class="text-pink">' + words[0] + '</span>';
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
