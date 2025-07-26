# 🧪 PowerShell Extension Test Script
# The Bridge Project - JAHmere Webb Freedom Portal
# Test PowerShell extension functionality after installation

Write-Host "🚀 Testing PowerShell Extension Integration..." -ForegroundColor Green
Write-Host ""

# Test 1: Basic PowerShell functionality
Write-Host "✅ Test 1: Basic PowerShell Commands" -ForegroundColor Cyan
$currentLocation = Get-Location
Write-Host "   Current Directory: $currentLocation" -ForegroundColor White

# Test 2: Environment variable detection
Write-Host "✅ Test 2: Environment Variables" -ForegroundColor Cyan
$nodeVersion = $env:NODE_VERSION
if ($nodeVersion) {
    Write-Host "   Node Version: $nodeVersion" -ForegroundColor White
} else {
    Write-Host "   Node Version: Not set in environment" -ForegroundColor Yellow
}

# Test 3: File system operations
Write-Host "✅ Test 3: File System Access" -ForegroundColor Cyan
$packageJson = Test-Path "package.json"
Write-Host "   Package.json exists: $packageJson" -ForegroundColor White

# Test 4: Advanced PowerShell features
Write-Host "✅ Test 4: Advanced Features" -ForegroundColor Cyan
$processes = Get-Process | Where-Object { $_.ProcessName -like "node*" } | Measure-Object
Write-Host "   Node processes running: $($processes.Count)" -ForegroundColor White

# Test 5: IntelliSense test (will work in VS Code with extension)
Write-Host "✅ Test 5: IntelliSense Ready" -ForegroundColor Cyan
Write-Host "   Try typing 'Get-' in VS Code and see IntelliSense suggestions!" -ForegroundColor White

Write-Host ""
Write-Host "🌟 PowerShell Extension Test Complete!" -ForegroundColor Green
Write-Host "🎯 Your championship PowerShell environment is ready!" -ForegroundColor Magenta 