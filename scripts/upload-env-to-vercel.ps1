# 🔐 Vercel Environment Variables Upload Script (Windows PowerShell)
# The Bridge Project - JAHmere Webb Freedom Portal
# Generated on: 2025-07-21T03:18:00Z
# Aligned with championship-level codebase standards

[CmdletBinding()]
param(
    [switch]$Validate,
    [switch]$DryRun,
    [string]$Environment = "all"
)

# Set strict mode for better error handling
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# Championship-level logging function
function Write-ChampionshipLog {
    param(
        [string]$Message,
        [string]$Level = "INFO",
        [string]$Color = "White"
    )
    
    $timestamp = Get-Date -Format "HH:mm:ss"
    $prefix = switch ($Level) {
        "ERROR" { "❌" }
        "WARN" { "⚠️ " }
        "SUCCESS" { "✅" }
        "INFO" { "ℹ️ " }
        default { "📋" }
    }
    
    Write-Host "[$timestamp] $prefix $Message" -ForegroundColor $Color
}

Write-ChampionshipLog "🚀 Uploading environment variables to Vercel..." "INFO" "Green"
Write-ChampionshipLog "🌟 The Bridge Project - Championship Environment Management" "INFO" "Cyan"
Write-Host ""

# Verify PowerShell version compatibility
if ($PSVersionTable.PSVersion.Major -lt 5) {
    Write-ChampionshipLog "PowerShell 5.0 or higher required. Current version: $($PSVersionTable.PSVersion)" "ERROR" "Red"
    exit 1
}

# Check if Vercel CLI is installed with enhanced error handling
Write-ChampionshipLog "🔍 Checking Vercel CLI installation..." "INFO" "Blue"
try {
    $vercelVersion = vercel --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-ChampionshipLog "✅ Vercel CLI found: $vercelVersion" "SUCCESS" "Green"
    } else {
        throw "Vercel CLI not found"
    }
} catch {
    Write-ChampionshipLog "❌ Vercel CLI not found. Installing..." "ERROR" "Red"
    Write-ChampionshipLog "🔄 Running: npm i -g vercel" "INFO" "Yellow"
    
    try {
        npm i -g vercel
        Write-ChampionshipLog "✅ Vercel CLI installed successfully" "SUCCESS" "Green"
    } catch {
        Write-ChampionshipLog "❌ Failed to install Vercel CLI. Please install manually: npm i -g vercel" "ERROR" "Red"
        exit 1
    }
}

# Check if logged in to Vercel with better error handling
Write-ChampionshipLog "🔐 Verifying Vercel authentication..." "INFO" "Blue"
try {
    $whoamiOutput = vercel whoami 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-ChampionshipLog "✅ Authenticated with Vercel as: $whoamiOutput" "SUCCESS" "Green"
    } else {
        Write-ChampionshipLog "📝 Please login to Vercel:" "WARN" "Yellow"
        vercel login
        
        # Verify login was successful
        $whoamiOutput = vercel whoami 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-ChampionshipLog "❌ Vercel login failed. Please try again." "ERROR" "Red"
            exit 1
        }
        Write-ChampionshipLog "✅ Successfully authenticated with Vercel" "SUCCESS" "Green"
    }
} catch {
    Write-ChampionshipLog "❌ Error checking Vercel authentication: $_" "ERROR" "Red"
    exit 1
}

# Enhanced function to add environment variable with validation
function Add-EnvVar {
    param(
        [Parameter(Mandatory=$true)]
        [string]$Name,
        [Parameter(Mandatory=$true)]
        [string]$Value,
        [Parameter(Mandatory=$true)]
        [string]$Environments,
        [switch]$DryRun
    )
    
    if ($DryRun) {
        Write-ChampionshipLog "[DRY RUN] Would add $Name to $Environments" "INFO" "Magenta"
        return
    }
    
    Write-ChampionshipLog "🔄 Adding $Name to $Environments..." "INFO" "Cyan"
    
    try {
        # Use proper PowerShell pipeline for input
        $Value | vercel env add $Name $Environments
        
        if ($LASTEXITCODE -eq 0) {
            Write-ChampionshipLog "✅ Successfully added $Name" "SUCCESS" "Green"
        } else {
            Write-ChampionshipLog "❌ Failed to add $Name" "ERROR" "Red"
        }
    } catch {
        Write-ChampionshipLog "❌ Error adding $Name`: $_" "ERROR" "Red"
    }
    
    # Championship-level rate limiting
    Start-Sleep -Milliseconds 750
}

# Validate .env.local exists with enhanced messaging
if (!(Test-Path .env.local)) {
    Write-ChampionshipLog "❌ .env.local file not found!" "ERROR" "Red"
    Write-ChampionshipLog "💡 Run 'npm run env:setup' to generate template" "INFO" "Yellow"
    Write-ChampionshipLog "📋 Then copy .env.local.template to .env.local and customize" "INFO" "Yellow"
    exit 1
}

Write-ChampionshipLog "✅ Found .env.local file" "SUCCESS" "Green"

# Validation mode
if ($Validate) {
    Write-ChampionshipLog "🔍 Running validation mode..." "INFO" "Blue"
    try {
        node scripts/validate-environment.js
        if ($LASTEXITCODE -eq 0) {
            Write-ChampionshipLog "✅ Environment validation passed" "SUCCESS" "Green"
        } else {
            Write-ChampionshipLog "❌ Environment validation failed. Fix errors before uploading." "ERROR" "Red"
            exit 1
        }
    } catch {
        Write-ChampionshipLog "⚠️  Could not run validation. Proceeding with upload..." "WARN" "Yellow"
    }
}

Write-ChampionshipLog "📋 Processing .env.local file..." "INFO" "Blue"
Write-Host ""

# Enhanced environment variable processing
try {
    $envVars = Get-Content .env.local -ErrorAction Stop | Where-Object {
        $_ -notmatch '^#' -and $_ -match '=' -and $_.Trim() -ne ''
    }
    
    Write-ChampionshipLog "📊 Found $($envVars.Count) environment variables to process" "INFO" "Blue"
    
    $processedCount = 0
    $skippedCount = 0
    
    foreach ($line in $envVars) {
        try {
            $parts = $line -split '=', 2
            if ($parts.Count -lt 2) {
                Write-ChampionshipLog "⚠️  Skipping malformed line: $line" "WARN" "Yellow"
                $skippedCount++
                continue
            }
            
            $name = $parts[0].Trim()
            $value = $parts[1].Trim().Trim('"').Trim("'")
            
            # Enhanced validation
            if ([string]::IsNullOrWhiteSpace($name)) {
                Write-ChampionshipLog "⚠️  Skipping line with empty variable name" "WARN" "Yellow"
                $skippedCount++
                continue
            }
            
            if ([string]::IsNullOrWhiteSpace($value)) {
                Write-ChampionshipLog "⚠️  Skipping $name (empty value)" "WARN" "Yellow"
                $skippedCount++
                continue
            }
            
            # Skip placeholder values with enhanced detection
            if ($value -match "your_|_here|placeholder|example|test_value|change_me") {
                Write-ChampionshipLog "⚠️  Skipping $name (placeholder value detected)" "WARN" "Yellow"
                $skippedCount++
                continue
            }
            
            # Championship-level environment targeting
            $targetEnvironments = ""
            
            if ($name -match "_TEST$|_DEV$") {
                $targetEnvironments = "development"
            }
            elseif ($name -match "^NEXT_PUBLIC_") {
                $targetEnvironments = "production preview development"
                Write-ChampionshipLog "🌐 $name is a public variable (client-side accessible)" "INFO" "Blue"
            }
            elseif ($name -eq "DATABASE_URL") {
                Write-Host ""
                Write-ChampionshipLog "🗄️  $name detected (Database URL)" "INFO" "Magenta"
                Write-ChampionshipLog "⚠️  Use different database URLs for each environment!" "WARN" "Yellow"
                Write-Host "1) Production only (recommended)"
                Write-Host "2) Preview and Development"
                Write-Host "3) All environments (not recommended for security)"
                
                do {
                    $choice = Read-Host "Choose (1-3)"
                } while ($choice -notmatch "^[1-3]$")
                
                $targetEnvironments = switch ($choice) {
                    "1" { "production" }
                    "2" { "preview development" }
                    "3" { "production preview development" }
                }
            }
            elseif ($name -match "API_KEY|SECRET|TOKEN|PASSWORD|PRIVATE") {
                Write-Host ""
                Write-ChampionshipLog "🔑 $name detected (Sensitive credential)" "INFO" "Magenta"
                Write-Host "1) Production only"
                Write-Host "2) Preview and Development (testing)"
                Write-Host "3) All environments"
                
                do {
                    $choice = Read-Host "Choose (1-3)"
                } while ($choice -notmatch "^[1-3]$")
                
                $targetEnvironments = switch ($choice) {
                    "1" { "production" }
                    "2" { "preview development" }
                    "3" { "production preview development" }
                }
            }
            else {
                # Default: all environments for standard configuration
                $targetEnvironments = "production preview development"
            }
            
            # Apply environment filter if specified
            if ($Environment -ne "all") {
                if ($targetEnvironments -notmatch $Environment) {
                    Write-ChampionshipLog "⚠️  Skipping $name (not targeted for $Environment environment)" "WARN" "Yellow"
                    $skippedCount++
                    continue
                }
                $targetEnvironments = $Environment
            }
            
            # Execute the upload
            Add-EnvVar -Name $name -Value $value -Environments $targetEnvironments -DryRun:$DryRun
            $processedCount++
            
        } catch {
            Write-ChampionshipLog "❌ Error processing variable: $_" "ERROR" "Red"
            $skippedCount++
        }
    }
    
    Write-Host ""
    Write-ChampionshipLog "📊 Processing complete:" "INFO" "Cyan"
    Write-ChampionshipLog "   ✅ Processed: $processedCount variables" "SUCCESS" "Green"
    Write-ChampionshipLog "   ⚠️  Skipped: $skippedCount variables" "WARN" "Yellow"
    
} catch {
    Write-ChampionshipLog "❌ Error reading .env.local file: $_" "ERROR" "Red"
    exit 1
}

if (!$DryRun) {
    Write-Host ""
    Write-ChampionshipLog "✅ Environment variables uploaded to Vercel!" "SUCCESS" "Green"
    Write-Host ""
    Write-ChampionshipLog "📝 Next steps:" "INFO" "Cyan"
    Write-Host "1. Go to your Vercel dashboard to verify: https://vercel.com/dashboard"
    Write-Host "2. Navigate to your project > Settings > Environment Variables"
    Write-Host "3. Verify all variables are set correctly"
    Write-Host "4. Redeploy your application to use the new variables:"
    Write-Host "   vercel --prod"
    Write-Host "5. Test in preview deployments first before production"
    Write-Host ""
    Write-ChampionshipLog "🔍 Verify deployment:" "INFO" "Cyan"
    Write-Host "   curl https://your-domain.vercel.app/api/health"
    Write-Host ""
    Write-ChampionshipLog "🌟 JAHmere's July 28, 2025 Freedom Portal is ready for deployment!" "SUCCESS" "Green"
} else {
    Write-Host ""
    Write-ChampionshipLog "🔍 Dry run complete. Use without -DryRun to actually upload." "INFO" "Blue"
} 