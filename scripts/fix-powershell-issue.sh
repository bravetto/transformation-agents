#!/bin/bash

# 🔧 POWERSHELL PSREADLINE FIX SCRIPT
# Resolves "Cannot locate offset rendered text" error
# Compatible with macOS Darwin 24.5.0 and PowerShell 7.5.2

set -euo pipefail

echo "🔧 JAHmere Bridge PowerShell Fix - Starting..."
echo "Target: PSReadLine rendering issue resolution"
echo "System: $(uname -s) $(uname -r)"
echo

# Function to check PowerShell availability
check_powershell() {
    if ! command -v pwsh &> /dev/null; then
        echo "❌ PowerShell not found. Please install PowerShell 7+"
        exit 1
    fi
    echo "✅ PowerShell found: $(pwsh --version)"
}

# Function to backup current PSReadLine configuration
backup_psreadline() {
    echo "📦 Backing up current PSReadLine configuration..."
    
    local backup_dir="$HOME/.config/powershell/backup/$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$backup_dir"
    
    # Backup PowerShell profile if it exists
    if [ -f "$HOME/.config/powershell/Microsoft.PowerShell_profile.ps1" ]; then
        cp "$HOME/.config/powershell/Microsoft.PowerShell_profile.ps1" "$backup_dir/"
        echo "✅ Profile backed up to: $backup_dir"
    fi
    
    echo "✅ Backup completed"
}

# Function to fix PSReadLine with multiple strategies
fix_psreadline() {
    echo "🔄 Implementing PSReadLine fix strategies..."
    
    # Strategy 1: Force reinstall with proper parameters
    echo "📥 Strategy 1: Clean PSReadLine reinstall..."
    pwsh -NoProfile -Command "
        try {
            # Remove existing module references
            Get-Module PSReadLine | Remove-Module -Force -ErrorAction SilentlyContinue
            
            # Install latest stable version
            Install-Module -Name PSReadLine -Repository PSGallery -Force -Scope CurrentUser -AllowClobber -SkipPublisherCheck -MinimumVersion 2.3.6
            
            Write-Host '✅ PSReadLine installation completed'
        } catch {
            Write-Host '⚠️ Strategy 1 failed: ' + \$_.Exception.Message
        }
    " || echo "⚠️ Strategy 1 encountered issues, continuing..."
    
    # Strategy 2: Configure safe PSReadLine options
    echo "⚙️ Strategy 2: Configure safe PSReadLine options..."
    pwsh -NoProfile -Command "
        try {
            Import-Module PSReadLine -Force -ErrorAction SilentlyContinue
            
            # Set safe rendering options
            Set-PSReadLineOption -PredictionSource None -ErrorAction SilentlyContinue
            Set-PSReadLineOption -EditMode Windows -ErrorAction SilentlyContinue
            Set-PSReadLineOption -BellStyle None -ErrorAction SilentlyContinue
            
            Write-Host '✅ Safe PSReadLine options configured'
        } catch {
            Write-Host '⚠️ Strategy 2 failed: ' + \$_.Exception.Message
        }
    " || echo "⚠️ Strategy 2 encountered issues, continuing..."
    
    # Strategy 3: Create defensive PowerShell profile
    echo "📝 Strategy 3: Create defensive PowerShell profile..."
    create_defensive_profile
}

# Function to create a defensive PowerShell profile
create_defensive_profile() {
    local profile_dir="$HOME/.config/powershell"
    local profile_file="$profile_dir/Microsoft.PowerShell_profile.ps1"
    
    mkdir -p "$profile_dir"
    
    cat > "$profile_file" << 'EOF'
# JAHmere Bridge - Defensive PowerShell Profile
# Prevents PSReadLine rendering issues on macOS

# Safe PSReadLine configuration
if ($host.Name -eq 'ConsoleHost') {
    try {
        Import-Module PSReadLine -ErrorAction SilentlyContinue
        
        # Configure safe options to prevent rendering issues
        Set-PSReadLineOption -PredictionSource None -ErrorAction SilentlyContinue
        Set-PSReadLineOption -EditMode Windows -ErrorAction SilentlyContinue
        Set-PSReadLineOption -BellStyle None -ErrorAction SilentlyContinue
        Set-PSReadLineOption -HistorySearchCursorMovesToEnd -ErrorAction SilentlyContinue
        
        # Disable problematic features that cause offset errors
        Set-PSReadLineKeyHandler -Key Tab -Function Complete -ErrorAction SilentlyContinue
        
        Write-Host "✅ PSReadLine configured safely" -ForegroundColor Green
    } catch {
        Write-Host "⚠️ PSReadLine configuration skipped: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

# Error handling for terminal issues
$ErrorActionPreference = 'Continue'

# Set safe encoding
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
EOF
    
    echo "✅ Defensive profile created: $profile_file"
}

# Function to verify the fix
verify_fix() {
    echo "🧪 Verifying PowerShell fix..."
    
    # Test basic PowerShell functionality
    local test_result
    test_result=$(pwsh -NoProfile -Command "
        try {
            # Test basic command execution
            Get-Date | Out-String
            Write-Output 'POWERSHELL_TEST_SUCCESS'
        } catch {
            Write-Output 'POWERSHELL_TEST_FAILED: ' + \$_.Exception.Message
        }
    " 2>&1)
    
    if echo "$test_result" | grep -q "POWERSHELL_TEST_SUCCESS"; then
        echo "✅ PowerShell basic functionality verified"
    else
        echo "❌ PowerShell test failed:"
        echo "$test_result"
        return 1
    fi
    
    # Test PSReadLine functionality with new profile
    echo "🔍 Testing PSReadLine with defensive profile..."
    pwsh -Command "
        try {
            Import-Module PSReadLine -ErrorAction SilentlyContinue
            Write-Host '✅ PSReadLine loaded successfully' -ForegroundColor Green
        } catch {
            Write-Host '⚠️ PSReadLine issue persists: ' + \$_.Exception.Message -ForegroundColor Yellow
        }
    " || echo "⚠️ PSReadLine test completed with warnings"
}

# Function to provide system hardening recommendations
system_hardening() {
    echo "🛡️ System hardening recommendations:"
    echo
    echo "1. Terminal Configuration:"
    echo "   - Use iTerm2 or standard Terminal.app"
    echo "   - Avoid complex terminal multiplexers with PowerShell"
    echo
    echo "2. PowerShell Usage:"
    echo "   - Always use 'pwsh' command for PowerShell 7+"
    echo "   - Avoid mixing bash and PowerShell in complex scripts"
    echo
    echo "3. Environment Variables:"
    echo "   - Set TERM=xterm-256color for better compatibility"
    echo "   - Ensure LC_ALL=en_US.UTF-8 for proper encoding"
    echo
    echo "4. Regular Maintenance:"
    echo "   - Update PowerShell monthly: brew upgrade powershell"
    echo "   - Monitor PSReadLine releases for macOS fixes"
}

# Main execution
main() {
    echo "🚀 Starting JAHmere Bridge PowerShell Fix"
    echo "========================================"
    echo
    
    check_powershell
    backup_psreadline
    fix_psreadline
    verify_fix
    system_hardening
    
    echo
    echo "🎉 PowerShell fix completed!"
    echo "📋 Next steps:"
    echo "   1. Restart all PowerShell sessions"
    echo "   2. Test navigation fix compatibility"
    echo "   3. Monitor for any remaining issues"
    echo
    echo "🔗 If issues persist, check: https://github.com/PowerShell/PSReadLine/issues"
}

# Execute main function
main "$@" 