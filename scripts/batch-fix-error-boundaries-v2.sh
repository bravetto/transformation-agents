#!/bin/bash

# Batch script to fix error boundaries for components that failed in the previous run
# This script applies the advanced error boundary fix to components with various export patterns

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if the file exists
if [ ! -f "missing-error-boundaries.txt" ]; then
  echo -e "${RED}Error: missing-error-boundaries.txt not found${NC}"
  echo -e "Run 'node scripts/identify-missing-error-boundaries.js' first"
  exit 1
fi

# Read the file
COMPONENTS=$(cat missing-error-boundaries.txt | grep -v "^src/components/ui/" | grep -v "^src/app/" | grep -v "error-boundary.tsx")

# Count total components
TOTAL=$(echo "$COMPONENTS" | wc -l)
PROCESSED=0
SUCCESSFUL=0
FAILED=0

echo -e "${BLUE}Starting batch error boundary fix for $TOTAL components${NC}"
echo

# Process each component
while IFS= read -r component; do
  # Skip empty lines
  if [ -z "$component" ]; then
    continue
  fi

  # Extract component name for display
  COMPONENT_NAME=$(basename "$component" .tsx)
  
  # Increment counter
  ((PROCESSED++))
  
  echo -e "${YELLOW}[$PROCESSED/$TOTAL] Processing: $component${NC}"
  
  # Skip error boundary components themselves
  if [[ "$component" == *"error-boundary"* ]]; then
    echo -e "${BLUE}Skipping error boundary component${NC}"
    continue
  fi
  
  # Run the improved fix-error-boundaries-advanced-v2.js script
  if node scripts/fix-error-boundaries-advanced-v2.js "$component"; then
    echo -e "${GREEN}Successfully fixed error boundary for $component${NC}"
    ((SUCCESSFUL++))
  else
    echo -e "${RED}Failed to fix error boundary for $component${NC}"
    ((FAILED++))
  fi
  
  echo
done <<< "$COMPONENTS"

# Print summary
echo -e "${GREEN}=== Batch Processing Complete ===${NC}"
echo -e "Total components: $TOTAL"
echo -e "Processed: $PROCESSED"
echo -e "Successful: $SUCCESSFUL"
echo -e "Failed: $FAILED"

# Run the identify script again to see progress
echo
echo -e "${BLUE}Running identification script to check progress...${NC}"
node scripts/identify-missing-error-boundaries.js 