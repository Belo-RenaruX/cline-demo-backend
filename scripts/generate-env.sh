#!/bin/bash

# Script to generate a default .env file for the Cline Demo Backend

# Check if .env already exists
if [ -f .env ]; then
  echo "Warning: .env file already exists."
  echo "To regenerate, please remove or rename the existing .env file first."
  exit 1
fi

# Create .env file with default values
cat > .env << EOF
NODE_ENV=development
NODE_PORT=3000
LOG_LEVEL=DEBUG
DB_PATH=./database.sqlite
TZ=America/Lima
EOF

echo "✅ .env file has been generated successfully with default values."
echo "You can modify these values as needed for your environment."
