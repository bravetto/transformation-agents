#!/bin/bash
# 🔐 Vercel Environment Variables Upload Script
# Generated on: 2025-07-21T03:18:00Z

echo "🚀 Uploading environment variables to Vercel..."
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm i -g vercel
fi

# Check if logged in to Vercel
vercel whoami &> /dev/null
if [ $? -ne 0 ]; then
    echo "📝 Please login to Vercel:"
    vercel login
fi

# Function to add environment variable
add_env_var() {
    local var_name=$1
    local var_value=$2
    local env_targets=$3
    
    echo "Adding $var_name to $env_targets..."
    echo "$var_value" | vercel env add $var_name $env_targets --yes
}

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found!"
    echo "💡 Run 'node scripts/environment-setup.js' to generate template"
    exit 1
fi

echo "📋 Found .env.local file. Starting upload..."
echo ""

# Parse .env.local and upload each variable
while IFS='=' read -r name value; do
    # Skip comments and empty lines
    if [[ $name =~ ^#.*$ ]] || [[ -z $name ]]; then
        continue
    fi
    
    # Remove quotes if present
    value=$(echo $value | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
    
    # Skip empty values
    if [[ -z $value ]]; then
        echo "⚠️  Skipping $name (empty value)"
        continue
    fi
    
    # Skip placeholder values
    if [[ $value == *"your_"* ]] || [[ $value == *"_here"* ]]; then
        echo "⚠️  Skipping $name (placeholder value)"
        continue
    fi
    
    # Determine environments based on variable name and type
    if [[ $name == *"_TEST"* ]] || [[ $name == *"_DEV"* ]]; then
        # Development only
        add_env_var "$name" "$value" "development"
    elif [[ $name == "NEXT_PUBLIC_"* ]]; then
        # Public variables go to all environments
        add_env_var "$name" "$value" "production preview development"
    elif [[ $name == "DATABASE_URL" ]]; then
        # Database URL - ask for environment
        echo ""
        echo "🗄️  $name detected (Database URL)"
        echo "⚠️  Use different database URLs for each environment!"
        echo "1) Production only (recommended)"
        echo "2) Preview and Development"
        echo "3) All environments (not recommended for security)"
        read -p "Choose (1-3): " choice
        
        case $choice in
            1) add_env_var "$name" "$value" "production" ;;
            2) add_env_var "$name" "$value" "preview development" ;;
            3) add_env_var "$name" "$value" "production preview development" ;;
            *) echo "Skipping $name..." ;;
        esac
    elif [[ $name == *"API_KEY"* ]] || [[ $name == *"SECRET"* ]] || [[ $name == *"TOKEN"* ]]; then
        # API keys and secrets - ask for environment
        echo ""
        echo "🔑 $name detected (API Key/Secret)"
        echo "1) Production only"
        echo "2) Preview and Development (testing)"
        echo "3) All environments"
        read -p "Choose (1-3): " choice
        
        case $choice in
            1) add_env_var "$name" "$value" "production" ;;
            2) add_env_var "$name" "$value" "preview development" ;;
            3) add_env_var "$name" "$value" "production preview development" ;;
            *) echo "Skipping $name..." ;;
        esac
    else
        # Other variables - default to all environments
        add_env_var "$name" "$value" "production preview development"
    fi
    
    # Add small delay to avoid rate limiting
    sleep 0.5
    
done < .env.local

echo ""
echo "✅ Environment variables uploaded to Vercel!"
echo ""
echo "📝 Next steps:"
echo "1. Go to your Vercel dashboard to verify: https://vercel.com/dashboard"
echo "2. Navigate to your project > Settings > Environment Variables"
echo "3. Verify all variables are set correctly"
echo "4. Redeploy your application to use the new variables:"
echo "   vercel --prod"
echo "5. Test in preview deployments first before production"
echo ""
echo "🔍 Verify deployment:"
echo "   curl https://your-domain.vercel.app/api/health" 