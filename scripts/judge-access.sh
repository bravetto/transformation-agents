#!/bin/bash
# Quick access to Judge Dashboard

DOMAIN=${1:-"localhost:1437"}
echo "🏛️  Opening Judge Dashboard at: $DOMAIN"
echo "📊 Dashboard URL: http://$DOMAIN/dashboard/judge"
echo "⚖️  Enhanced Dashboard: http://$DOMAIN/judge-ferrero-private"
echo ""
echo "Available endpoints:"
echo "🔍 Health Check: http://$DOMAIN/api/health"
echo "🙏 Prayer Status: http://$DOMAIN/api/prayers"
echo "⏰ Countdown: http://$DOMAIN/api/countdown"
echo "✨ Divine Status: http://$DOMAIN/api/divine-status"
echo ""

if command -v open &> /dev/null; then
    open "http://$DOMAIN/dashboard/judge"
elif command -v xdg-open &> /dev/null; then
    xdg-open "http://$DOMAIN/dashboard/judge"
else
    echo "Please open http://$DOMAIN/dashboard/judge in your browser"
fi
