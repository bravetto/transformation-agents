#!/bin/bash

# Batch script to add error boundaries to multiple components
# This script reads the missing-error-boundaries.txt file and adds error boundaries to each component

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
COMPONENTS=$(cat missing-error-boundaries.txt)

# Count total components
TOTAL=$(echo "$COMPONENTS" | wc -l)
PROCESSED=0
SUCCESSFUL=0
FAILED=0

echo -e "${BLUE}Starting batch error boundary addition for $TOTAL components${NC}"
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
  
  # Skip UI components for now (they require special handling)
  if [[ "$component" == *"/ui/"* ]]; then
    echo -e "${BLUE}Skipping UI component - will handle separately${NC}"
    continue
  fi

  # Skip page components for now (they require special handling)
  if [[ "$component" == *"/app/"* ]]; then
    echo -e "${BLUE}Skipping page component - will handle separately${NC}"
    continue
  fi
  
  # Run the add-error-boundaries.sh script
  if ./scripts/add-error-boundaries.sh "$component" "$COMPONENT_NAME"; then
    echo -e "${GREEN}Successfully added error boundary to $component${NC}"
    ((SUCCESSFUL++))
  else
    echo -e "${RED}Failed to add error boundary to $component${NC}"
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
echo -e "Skipped: $((TOTAL - PROCESSED))"

# Remind about UI and page components
echo
echo -e "${YELLOW}Note: UI components and page components were skipped and need special handling${NC}"
echo -e "UI components should be wrapped when used, not in their definition"
echo -e "Page components need server-side error handling with error.tsx files" 