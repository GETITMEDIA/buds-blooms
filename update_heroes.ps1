$htmlFiles = Get-ChildItem -Filter *.html -Exclude "index.html"
foreach ($file in $htmlFiles) {
    $basename = $file.BaseName
    $heroImage = "assets/hero/$basename-hero.png"
    
    if (Test-Path $heroImage) {
        $content = Get-Content $file.FullName -Raw
        
        # 1. Remove the old <style> block for hero image
        $content = $content -replace '(?s)\s*<style>\s*\.[a-zA-Z0-9_-]+-hero\s*\{.*?</style>\s*', "`n    "
        
        # 2. Replace the <section class="about-hero..."> tag
        $sectionRegex = '(?s)<section class="about-hero[^>]*>'
        $newSection = '<section class="about-hero" style="position: relative; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 400px; padding: 0 20px; text-align: center; background-image: url(''' + $heroImage + '''); background-size: cover; background-position: center; border-radius: 0 0 30px 30px; margin-bottom: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">'
        $content = $content -replace $sectionRegex, $newSection
        
        # 3. Update the h1 and p tags to have the white text style
        $h1Regex = '<h1 class="about-title"[^>]*>(.*?)</h1>'
        $newH1 = '<h1 class="about-title" style="font-size: 3rem; margin-bottom: 15px; color: #fff; text-shadow: 0 4px 20px rgba(0,0,0,0.6);">$1</h1>'
        $content = $content -replace $h1Regex, $newH1
        
        $pRegex = '<p class="about-subtitle"[^>]*>(.*?)</p>'
        $newP = '<p class="about-subtitle" style="color: #fff; font-weight: 500; font-size: 1.1rem; text-shadow: 0 2px 10px rgba(0,0,0,0.8);">$1</p>'
        $content = $content -replace $pRegex, $newP
        
        # 4. Handle text-shadow on spans in h1
        # First, remove any existing style="text-shadow: none;" to avoid duplication
        $content = $content -replace '<span class="(text-pink|text-blue)"\s*style="text-shadow:\s*none;"\s*>', '<span class="$1">'
        # Then apply it
        $content = $content -replace '<span class="(text-pink|text-blue)"\s*>', '<span class="$1" style="text-shadow: none;">'
        
        [System.IO.File]::WriteAllText($file.FullName, $content, (New-Object System.Text.UTF8Encoding($false)))
        Write-Host "Updated $($file.Name)"
    }
}
