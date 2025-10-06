# Chrome DevTools MCP Test Script
# Skripta za testiranje Chrome DevTools MCP integracije

Write-Host "Chrome DevTools MCP Test" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Provera Node.js verzije
Write-Host "Provera Node.js verzije..." -ForegroundColor Yellow
$nodeVersion = node --version
Write-Host "   Node.js verzija: $nodeVersion" -ForegroundColor Green

if ($nodeVersion -match "v(\d+)\.") {
	$majorVersion = [int]$matches[1]
	if ($majorVersion -lt 20) {
		Write-Host "   Preporucena verzija je 20+ (idealno 22+)" -ForegroundColor Red
		Write-Host "   Preuzmi sa: https://nodejs.org/" -ForegroundColor Yellow
	}
}

Write-Host ""

# Provera Chrome instalacije
Write-Host "Provera Chrome instalacije..." -ForegroundColor Yellow
$chromePaths = @(
	"$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
	"${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
	"$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
)

$chromeFound = $false
foreach ($path in $chromePaths) {
	if (Test-Path $path) {
		Write-Host "   Chrome pronadjen: $path" -ForegroundColor Green
		$chromeFound = $true
		break
	}
}

if (-not $chromeFound) {
	Write-Host "   Chrome nije pronadjen" -ForegroundColor Red
	Write-Host "   Instaliraj sa: https://www.google.com/chrome/" -ForegroundColor Yellow
}

Write-Host ""

# Provera MCP konfiguracije
Write-Host "Provera MCP konfiguracije..." -ForegroundColor Yellow
$mcpConfigPath = "$env:APPDATA\Cursor\User\mcp.json"

if (Test-Path $mcpConfigPath) {
	Write-Host "   MCP konfiguracija pronadjena" -ForegroundColor Green
	Write-Host "   Lokacija: $mcpConfigPath" -ForegroundColor Gray
	
	$config = Get-Content $mcpConfigPath | ConvertFrom-Json
	if ($config.mcpServers.'chrome-devtools') {
		Write-Host "   Chrome DevTools MCP konfigurisan" -ForegroundColor Green
	} else {
		Write-Host "   Chrome DevTools MCP nije konfigurisan" -ForegroundColor Yellow
	}
} else {
	Write-Host "   MCP konfiguracija ne postoji" -ForegroundColor Red
	Write-Host "   Pokreni setup ponovo" -ForegroundColor Yellow
}

Write-Host ""

# Test Chrome DevTools MCP
Write-Host "Testiranje Chrome DevTools MCP..." -ForegroundColor Yellow
Write-Host "   Pokretanje MCP servera..." -ForegroundColor Gray

try {
	$process = Start-Process -FilePath "npx" -ArgumentList "-y", "chrome-devtools-mcp@latest", "--version" -NoNewWindow -Wait -PassThru
	
	if ($process.ExitCode -eq 0) {
		Write-Host "   Chrome DevTools MCP uspesno instaliran" -ForegroundColor Green
	} else {
		Write-Host "   Moguc problem sa instalacijom" -ForegroundColor Yellow
	}
} catch {
	Write-Host "   Greska pri testiranju MCP-a" -ForegroundColor Red
	Write-Host "   $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Sledeci koraci:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Restartuj Cursor IDE" -ForegroundColor White
Write-Host "2. Pokreni dev server: pnpm dev" -ForegroundColor White
Write-Host "3. Otvori http://localhost:3000 u Chrome-u" -ForegroundColor White
Write-Host "4. Zatrazi od AI asistenta da koristi Chrome DevTools" -ForegroundColor White
Write-Host ""
Write-Host "Primeri komandi:" -ForegroundColor Yellow
Write-Host "  - Testiraj booking flow za apartman" -ForegroundColor Gray
Write-Host "  - Analiziraj performanse pocetne stranice" -ForegroundColor Gray
Write-Host "  - Proveri responsive dizajn" -ForegroundColor Gray
Write-Host ""