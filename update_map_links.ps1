$files = Get-ChildItem -Filter *.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    $content = $content.Replace("https://maps.app.goo.gl/9ik651KTJ5uJDEZBA", "https://maps.app.goo.gl/hKR8bkc7g2gktQFs7")
    $content = $content.Replace("https://maps.app.goo.gl/pDqgLvQdyULwN5pz7", "https://maps.app.goo.gl/tjVZiM3XDLjABWuc9")

    [System.IO.File]::WriteAllText($file.FullName, $content, (New-Object System.Text.UTF8Encoding($false)))
}
