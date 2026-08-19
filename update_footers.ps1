$files = Get-ChildItem -Filter *.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # Replace Kathirkamam div with a tag
    $content = [regex]::Replace($content, '(?s)<div class="contact-item">\s*<div class="contact-icon"><i class="fas fa-map-marker-alt"></i></div>\s*<p><strong>Kathirkamam Branch</strong>.*?</p>\s*</div>', {
        param($m)
        $m.Value -replace '<div class="contact-item">', '<a href="https://maps.app.goo.gl/9ik651KTJ5uJDEZBA" target="_blank" rel="noopener noreferrer" class="contact-item" style="text-decoration: none; color: inherit; cursor: pointer;">' -replace '</div>$', '</a>'
    })
    
    # Replace Mission Street div with a tag
    $content = [regex]::Replace($content, '(?s)<div class="contact-item">\s*<div class="contact-icon"><i class="fas fa-map-marker-alt"></i></div>\s*<p><strong>Mission Street Branch</strong>.*?</p>\s*</div>', {
        param($m)
        $m.Value -replace '<div class="contact-item">', '<a href="https://maps.app.goo.gl/pDqgLvQdyULwN5pz7" target="_blank" rel="noopener noreferrer" class="contact-item" style="text-decoration: none; color: inherit; cursor: pointer;">' -replace '</div>$', '</a>'
    })

    [System.IO.File]::WriteAllText($file.FullName, $content, (New-Object System.Text.UTF8Encoding($false)))
}
