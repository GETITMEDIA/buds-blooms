import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'index.html']

for f in html_files:
    basename = f.replace('.html', '')
    img_path = f"assets/hero/{basename}-hero.png"
    
    if os.path.exists(img_path):
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
            
        # 1. Strip old style block for the hero
        content = re.sub(r'<style>\s*\.[a-zA-Z0-9_-]+-hero\s*\{.*?</style>', '', content, flags=re.DOTALL)
        
        # 2. Replace section
        new_section = f'<section class="about-hero" style="position: relative; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 400px; padding: 0 20px; text-align: center; background-image: url(\'{img_path}\'); background-size: cover; background-position: center; border-radius: 0 0 30px 30px; margin-bottom: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">'
        content = re.sub(r'<section class="about-hero[^>]*>', new_section, content)
        
        # 3. Replace h1
        new_h1 = r'<h1 class="about-title" style="font-size: 3rem; margin-bottom: 15px; color: #fff; text-shadow: 0 4px 20px rgba(0,0,0,0.6);">\1</h1>'
        content = re.sub(r'<h1 class="about-title"[^>]*>(.*?)</h1>', new_h1, content, flags=re.DOTALL)
        
        # 4. Replace p
        new_p = r'<p class="about-subtitle" style="color: #fff; font-weight: 500; font-size: 1.1rem; text-shadow: 0 2px 10px rgba(0,0,0,0.8);">\1</p>'
        content = re.sub(r'<p class="about-subtitle"[^>]*>(.*?)</p>', new_p, content, flags=re.DOTALL)
        
        # 5. Remove text-shadow from text-pink and text-blue spans
        content = re.sub(r'<span class="(text-pink|text-blue)"\s*style="[^"]*">', r'<span class="\1">', content)
        content = re.sub(r'<span class="(text-pink|text-blue)">', r'<span class="\1" style="text-shadow: none;">', content)

        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        
        print(f"Updated {f}")
    else:
        print(f"Image not found for {f}")
