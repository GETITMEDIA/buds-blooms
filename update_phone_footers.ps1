$files = Get-ChildItem -Filter *.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    $content = [regex]::Replace($content, '(?s)<div class="contact-item">\s*<div class="contact-icon"><i class="fas fa-phone-alt"></i></div>\s*<p><a href="tel:\+919092233778">\+91 90922 33778</a></p>\s*</div>', {
        param($m)
        '<a href="tel:+919092233778" class="contact-item" style="text-decoration: none; color: inherit; cursor: pointer;">' + "`n            " + '<div class="contact-icon"><i class="fas fa-phone-alt"></i></div>' + "`n            " + '<p>+91 90922 33778</p>' + "`n          " + '</a>'
    })

    [System.IO.File]::WriteAllText($file.FullName, $content, (New-Object System.Text.UTF8Encoding($false)))
}
