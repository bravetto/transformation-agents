#!/bin/bash

# Script to help apply error boundaries to existing components
# This script will modify a client component to wrap it with error boundaries

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if a file was provided
if [ -z "$1" ]; then
  echo -e "${RED}Error: No file specified${NC}"
  echo -e "Usage: $0 path/to/component.tsx [component-name]"
  exit 1
fi

# Set variables
FILE_PATH=$1
COMPONENT_NAME=${2:-$(basename "$FILE_PATH" .tsx)}
DISPLAY_NAME=$(echo "$COMPONENT_NAME" | sed -r 's/([a-z])([A-Z])/\1 \2/g') # Convert camelCase to spaces

# Check if file exists
if [ ! -f "$FILE_PATH" ]; then
  echo -e "${RED}Error: File not found: $FILE_PATH${NC}"
  exit 1
fi

# Check if the file has 'use client' directive
if ! grep -q "\"use client\"" "$FILE_PATH"; then
  echo -e "${YELLOW}Warning: This doesn't appear to be a client component. Error boundaries only work with client components.${NC}"
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Create backup
cp "$FILE_PATH" "${FILE_PATH}.bak"
echo -e "${BLUE}Created backup: ${FILE_PATH}.bak${NC}"

# Add the import for withErrorBoundary
sed -i '' -e '/^import/a\
import { withErrorBoundary } from "@/components/with-error-boundary";
' "$FILE_PATH"

# Find the export default line
DEFAULT_EXPORT=$(grep -n "export default" "$FILE_PATH" | head -1 | cut -d: -f1)

if [ -z "$DEFAULT_EXPORT" ]; then
  echo -e "${YELLOW}Warning: Couldn't find 'export default' line. You'll need to modify the file manually.${NC}"
  exit 1
fi

# Extract the component name from the export
EXPORTED_NAME=$(grep "export default" "$FILE_PATH" | head -1 | sed -E 's/export default (function )?([A-Za-z0-9_]+).*$/\2/')

if [ -z "$EXPORTED_NAME" ]; then
  EXPORTED_NAME=$(grep "export default" "$FILE_PATH" | head -1 | sed -E 's/export default ([A-Za-z0-9_]+).*$/\1/')
fi

# Check if it's an unnamed function export (export default function() {...})
if grep -q "export default function *(" "$FILE_PATH"; then
  # This is an unnamed function, we need to convert it to a named function
  # Extract the line with the export default
  EXPORT_LINE=$(grep -n "export default function *(" "$FILE_PATH" | head -1 | cut -d: -f1)
  
  # Replace the export default function with a named function
  sed -i '' "${EXPORT_LINE}s/export default function/function ${COMPONENT_NAME}/" "$FILE_PATH"
  
  # Add the new export at the end of the file
  echo -e "\n// Export with error boundary" >> "$FILE_PATH"
  echo "export default withErrorBoundary(${COMPONENT_NAME}, {" >> "$FILE_PATH"
  echo "  componentName: \"${DISPLAY_NAME}\"," >> "$FILE_PATH"
  echo "  id: \"${COMPONENT_NAME}\"" >> "$FILE_PATH"
  echo "});" >> "$FILE_PATH"
else
  # It's a named export, add the new export at the end
  # First, remove the original export
  sed -i '' "s/export default ${EXPORTED_NAME}/const ${EXPORTED_NAME}Exported = ${EXPORTED_NAME}/" "$FILE_PATH"
  
  # Add the new export at the end of the file
  echo -e "\n// Export with error boundary" >> "$FILE_PATH"
  echo "export default withErrorBoundary(${EXPORTED_NAME}Exported, {" >> "$FILE_PATH"
  echo "  componentName: \"${DISPLAY_NAME}\"," >> "$FILE_PATH"
  echo "  id: \"${COMPONENT_NAME}\"" >> "$FILE_PATH"
  echo "});" >> "$FILE_PATH"
fi

echo -e "${GREEN}Successfully added error boundary to ${FILE_PATH}${NC}"
echo -e "${YELLOW}Please review the changes to ensure everything is correct.${NC}"
echo -e "You may want to add a try/catch block inside the component for more granular error handling." 