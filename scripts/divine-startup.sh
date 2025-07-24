#!/bin/bash

# 🚀 DIVINE STARTUP SCRIPT
# Divine Engineer's Defensive Architecture Protocol
# Ensures clean, stable, and high-performance development environment

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_section() {
    echo -e "\n${CYAN}${BOLD}=== $1 ===${NC}\n"
}

# Configuration
PREFERRED_PORTS=(4242 1437 3000 3001 4000)
DEFAULT_PORT=4242
PROJECT_NAME="Bridge Project - JAHmere Freedom Portal"

# Functions
check_requirements() {
    log_section "🔍 CHECKING SYSTEM REQUIREMENTS"
    
    # Check Node.js
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        log_success "Node.js: $NODE_VERSION"
    else
        log_error "Node.js not found. Please install Node.js first."
        exit 1
    fi
    
    # Check npm
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm --version)
        log_success "npm: $NPM_VERSION"
    else
        log_error "npm not found. Please install npm first."
        exit 1
    fi
    
    # Check if we're in the right directory
    if [[ ! -f "package.json" ]]; then
        log_error "package.json not found. Please run this script from the project root."
        exit 1
    fi
    
    log_success "All requirements satisfied"
}

cleanup_processes() {
    log_section "🧹 CLEANING UP EXISTING PROCESSES"
    
    # Kill existing Next.js processes
    if pgrep -f "next dev" > /dev/null; then
        log_info "Killing existing Next.js development servers..."
        pkill -f "next dev" || true
        sleep 2
    fi
    
    # Kill Node.js processes on our preferred ports
    for port in "${PREFERRED_PORTS[@]}"; do
        if lsof -ti:$port > /dev/null 2>&1; then
            log_info "Killing process on port $port..."
            kill -9 $(lsof -ti:$port) 2>/dev/null || true
        fi
    done
    
    log_success "Process cleanup completed"
}

cleanup_build_cache() {
    log_section "🧹 CLEARING BUILD CACHE"
    
    # Remove Next.js build cache
    if [[ -d ".next" ]]; then
        log_info "Removing .next directory..."
        rm -rf .next
    fi
    
    # Remove Node.js cache
    if [[ -d "node_modules/.cache" ]]; then
        log_info "Removing node_modules/.cache..."
        rm -rf node_modules/.cache
    fi
    
    # Clear npm cache (optional, but thorough)
    log_info "Clearing npm cache..."
    npm cache clean --force &>/dev/null || true
    
    log_success "Build cache cleared"
}

find_available_port() {
    log_section "🌐 FINDING AVAILABLE PORT"
    
    for port in "${PREFERRED_PORTS[@]}"; do
        if ! lsof -ti:$port > /dev/null 2>&1; then
            log_success "Port $port is available"
            echo $port
            return 0
        else
            log_warning "Port $port is in use"
        fi
    done
    
    log_error "No preferred ports available"
    return 1
}

run_health_check() {
    log_section "🛡️ RUNNING HEALTH CHECK"
    
    if [[ -f "scripts/build-health-monitor.js" ]]; then
        log_info "Running comprehensive health diagnostics..."
        node scripts/build-health-monitor.js
        
        # Check health report
        if [[ -f "health-report.json" ]]; then
            HEALTH_STATUS=$(node -p "JSON.parse(require('fs').readFileSync('health-report.json', 'utf8')).overall")
            
            case $HEALTH_STATUS in
                "healthy")
                    log_success "Health check: EXCELLENT"
                    ;;
                "warning")
                    log_warning "Health check: WARNING - Check health-report.json for details"
                    ;;
                "critical")
                    log_error "Health check: CRITICAL - System issues detected"
                    log_info "Review health-report.json and fix critical issues before continuing"
                    read -p "Continue anyway? (y/N): " -n 1 -r
                    echo
                    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                        exit 1
                    fi
                    ;;
            esac
        fi
    else
        log_warning "Health monitor not found, skipping health check"
    fi
}

install_dependencies() {
    log_section "📦 CHECKING DEPENDENCIES"
    
    if [[ ! -d "node_modules" ]] || [[ "package.json" -nt "node_modules" ]]; then
        log_info "Installing/updating dependencies..."
        npm install
        log_success "Dependencies installed"
    else
        log_success "Dependencies are up to date"
    fi
}

optimize_for_development() {
    log_section "⚡ OPTIMIZING FOR DEVELOPMENT"
    
    # Set development environment variables
    export NODE_ENV=development
    export NEXT_TELEMETRY_DISABLED=1  # Disable Next.js telemetry for better performance
    
    # Increase Node.js memory if needed
    export NODE_OPTIONS="--max-old-space-size=4096"
    
    log_success "Development optimizations applied"
}

start_development_server() {
    local port=$1
    
    log_section "🚀 STARTING DEVELOPMENT SERVER"
    
    log_info "Starting $PROJECT_NAME on port $port..."
    log_info "🌐 Server will be available at: http://localhost:$port"
    log_info "📱 Network access available at: http://$(ipconfig getifaddr en0):$port"
    
    echo -e "\n${BOLD}${GREEN}🎉 DIVINE ARCHITECTURE ACTIVATED! 🎉${NC}\n"
    echo -e "${CYAN}Development server starting with defensive protocols enabled...${NC}"
    echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}\n"
    
    # Start the server with error handling
    npm run dev -- --port $port || {
        log_error "Failed to start development server"
        log_info "Trying emergency recovery..."
        node scripts/build-health-monitor.js emergency
        exit 1
    }
}

# Main execution
main() {
    clear
    echo -e "${BOLD}${CYAN}"
    echo "  ╔══════════════════════════════════════════════════╗"
    echo "  ║          🚀 DIVINE STARTUP PROTOCOL 🚀          ║"
    echo "  ║       Defensive Architecture Initialized        ║"
    echo "  ╚══════════════════════════════════════════════════╝"
    echo -e "${NC}\n"
    
    # Check for flags
    SKIP_HEALTH_CHECK=false
    FORCE_PORT=""
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --skip-health)
                SKIP_HEALTH_CHECK=true
                shift
                ;;
            --port)
                FORCE_PORT="$2"
                shift 2
                ;;
            --help)
                echo "Usage: $0 [OPTIONS]"
                echo "Options:"
                echo "  --skip-health    Skip health check"
                echo "  --port PORT      Force specific port"
                echo "  --help          Show this help"
                exit 0
                ;;
            *)
                log_error "Unknown option: $1"
                exit 1
                ;;
        esac
    done
    
    # Execute startup sequence
    check_requirements
    cleanup_processes
    cleanup_build_cache
    install_dependencies
    optimize_for_development
    
    if [[ "$SKIP_HEALTH_CHECK" == false ]]; then
        run_health_check
    fi
    
    # Determine port
    if [[ -n "$FORCE_PORT" ]]; then
        if lsof -ti:$FORCE_PORT > /dev/null 2>&1; then
            log_error "Forced port $FORCE_PORT is not available"
            exit 1
        fi
        SELECTED_PORT=$FORCE_PORT
    else
        SELECTED_PORT=$(find_available_port)
        if [[ $? -ne 0 ]]; then
            log_error "No ports available. Please free up a port and try again."
            exit 1
        fi
    fi
    
    # Start the server
    start_development_server $SELECTED_PORT
}

# Trap Ctrl+C for clean shutdown
trap 'echo -e "\n${YELLOW}🛑 Shutting down gracefully...${NC}"; cleanup_processes; exit 0' INT

# Run main function
main "$@" 