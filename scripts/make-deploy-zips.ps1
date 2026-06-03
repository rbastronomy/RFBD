# Build cPanel-ready deploy zips with POSIX (forward-slash) entry paths and no
# explicit directory entries, so the Linux extractor creates each folder fresh
# with normal (writable) permissions.
#
# Windows PowerShell's Compress-Archive and .NET Framework ZipFile both write
# backslash separators, which makes Linux unzip mis-create nested folders as
# read-only ("checkdir error: Permission denied"). This avoids that.
#
# Usage:  powershell -ExecutionPolicy Bypass -File scripts\make-deploy-zips.ps1
# Run `npm run build` first so dist/ is current.

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$bs = [char]92   # backslash
$fs = [char]47   # forward slash
$root = Split-Path -Parent $PSScriptRoot
$dist = Join-Path $root "dist"
if (-not (Test-Path $dist)) { throw "No existe dist/. Corre: npm run build" }

function New-ZipFwd([string]$srcDir, [string]$zipPath) {
  if (Test-Path $zipPath) { Remove-Item -LiteralPath $zipPath -Force }
  $srcFull = (Resolve-Path $srcDir).Path.TrimEnd($bs)
  $stream = [System.IO.File]::Open($zipPath, [System.IO.FileMode]::CreateNew)
  $zip = New-Object System.IO.Compression.ZipArchive($stream, [System.IO.Compression.ZipArchiveMode]::Create)
  $count = 0
  foreach ($file in Get-ChildItem -LiteralPath $srcDir -Recurse -File -Force) {
    $rel = $file.FullName.Substring($srcFull.Length + 1).Replace($bs, $fs)
    $entry = $zip.CreateEntry($rel, [System.IO.Compression.CompressionLevel]::Optimal)
    $inStream = [System.IO.File]::OpenRead($file.FullName)
    $outStream = $entry.Open()
    $inStream.CopyTo($outStream)
    $outStream.Dispose(); $inStream.Dispose()
    $count++
  }
  $zip.Dispose(); $stream.Close()
  return $count
}

# --- 1) Solo La Isla: la-isla/ + demos/.htaccess ---
$stage = Join-Path $env:TEMP "rfbd_laisla_stage"
if (Test-Path $stage) { Remove-Item -LiteralPath $stage -Recurse -Force }
New-Item -ItemType Directory -Path $stage | Out-Null
Copy-Item (Join-Path $dist "demos\la-isla") (Join-Path $stage "la-isla") -Recurse
Copy-Item (Join-Path $dist "demos\.htaccess") (Join-Path $stage ".htaccess")
$nLaisla = New-ZipFwd $stage (Join-Path $root "rfbd-la-isla.zip")
Remove-Item -LiteralPath $stage -Recurse -Force

# --- 2) Sitio completo: contenido de dist en la raiz del zip ---
$nFull = New-ZipFwd $dist (Join-Path $root "rfbd-deploy.zip")

Write-Output ("rfbd-la-isla.zip  -> {0} archivos" -f $nLaisla)
Write-Output ("rfbd-deploy.zip   -> {0} archivos" -f $nFull)

# --- Verificacion: separadores forward-slash ---
$check = [System.IO.Compression.ZipFile]::OpenRead((Join-Path $root "rfbd-la-isla.zip"))
$sample = ($check.Entries | Where-Object { $_.FullName -like "*chunks*" } | Select-Object -First 1).FullName
Write-Output ("ejemplo entrada: {0}" -f $sample)
Write-Output ("forward-slash OK: {0}" -f ($sample.Contains($fs) -and -not $sample.Contains($bs)))
$check.Dispose()
