$files = Get-ChildItem -Filter *.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    $content = $content.Replace("https://maps.app.goo.gl/hKR8bkc7g2gktQFs7", "https://maps.app.goo.gl/HxDdWfGF9cqoaAPC6")
    $content = $content.Replace("https://maps.app.goo.gl/tjVZiM3XDLjABWuc9", "https://maps.app.goo.gl/HxDdWfGF9cqoaAPC6")

    [System.IO.File]::WriteAllText($file.FullName, $content, (New-Object System.Text.UTF8Encoding($false)))
}
