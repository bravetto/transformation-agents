# 📊 Cursor.ai Monitoring Dashboard

## Quick Commands
```bash
# Check health
npm run cursor:health

# Auto-fix issues  
npm run cursor:fix

# Emergency fix (if system is critical)
npm run cursor:emergency
```

## Health Metrics

### Current Status
See `.cursor-health-report.json` for latest metrics

### Performance Indicators
- **Token Usage**: Target <10,000 tokens
- **Tool Count**: Target <10 MCP tools
- **Doc Size**: Target <5KB per file
- **Response Quality**: Target >95% accuracy

### Monitoring Schedule
- **Continuous**: GitHub Actions on every push
- **Weekly**: Full system health check
- **Monthly**: Performance review

## Alerts
Set up alerts when:
- Health score drops below 80
- Token usage exceeds 15,000
- Legacy .cursorrules detected
- Invalid file formats found

## Recovery Procedures
1. **Score 70-89**: Run `npm run cursor:fix`
2. **Score 50-69**: Run emergency fix + manual review
3. **Score <50**: Full system reset recommended
