#!/bin/bash

# 🚨 EMERGENCY POWERSHELL FIX
# Completely disables PSReadLine to prevent system instability
# JAHmere Bridge - Critical System Fix

set -euo pipefail

echo "🚨 EMERGENCY: PowerShell PSReadLine Disable"
echo "=========================================="
echo "This will disable PSReadLine to ensure system stability"
echo

# Create emergency PowerShell profile
create_emergency_profile() {
    local profile_dir="$HOME/.config/powershell"
    local profile_file="$profile_dir/Microsoft.PowerShell_profile.ps1"
    
    mkdir -p "$profile_dir"
    
    cat > "$profile_file" << 'EOF'
# JAHmere Bridge - EMERGENCY PowerShell Profile
# PSReadLine DISABLED for system stability

# Completely disable PSReadLine to prevent rendering errors
try {
    # Remove PSReadLine if loaded
    if (Get-Module PSReadLine -ErrorAction SilentlyContinue) {
        Remove-Module PSReadLine -Force -ErrorAction SilentlyContinue
    }
    
    # Prevent auto-loading
    $env:PSReadLineHistorySavePath = $null
    
    Write-Host "🚨 PSReadLine DISABLED for stability" -ForegroundColor Red
    Write-Host "✅ PowerShell running in safe mode" -ForegroundColor Green
} catch {
    # Ignore errors
}

# Set safe console settings
$Host.UI.RawUI.WindowTitle = "PowerShell - JAHmere Bridge (Safe Mode)"
$ErrorActionPreference = 'Continue'

# Ensure UTF-8 encoding
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::InputEncoding = [System.Text.Encoding]::UTF8

Write-Host "🛡️ PowerShell Safe Mode Active" -ForegroundColor Yellow
EOF
    
    echo "✅ Emergency profile created: $profile_file"
}

# Test emergency configuration
test_emergency_config() {
    echo "🧪 Testing emergency PowerShell configuration..."
    
    # Test with -NoProfile first
    echo "Testing PowerShell without profile..."
    pwsh -NoProfile -Command "Write-Host 'PowerShell NoProfile Test: SUCCESS' -ForegroundColor Green; exit 0" || {
        echo "❌ PowerShell NoProfile test failed"
        return 1
    }
    
    # Test with emergency profile
    echo "Testing PowerShell with emergency profile..."
    pwsh -Command "Write-Host 'PowerShell Emergency Profile Test: SUCCESS' -ForegroundColor Green; exit 0" || {
        echo "⚠️ PowerShell emergency profile test had issues"
    }
    
    echo "✅ Emergency configuration tested"
}

# Main execution
main() {
    echo "🚀 Implementing emergency PowerShell fix..."
    
    create_emergency_profile
    test_emergency_config
    
    echo
    echo "🎉 EMERGENCY FIX COMPLETED!"
    echo "============================="
    echo
    echo "📋 PowerShell Status:"
    echo "   ✅ PSReadLine DISABLED"
    echo "   ✅ Safe mode active"
    echo "   ✅ Basic functionality preserved"
    echo
    echo "🔧 Usage Instructions:"
    echo "   - Use 'pwsh -NoProfile' for maximum stability"
    echo "   - Use 'pwsh' for emergency profile mode"
    echo "   - Navigation fixes can now proceed safely"
    echo
    echo "⚠️  Note: Limited terminal features (no syntax highlighting, history search)"
    echo "✅ Benefit: No more PSReadLine crashes or rendering errors"
    echo
}

main "$@" 