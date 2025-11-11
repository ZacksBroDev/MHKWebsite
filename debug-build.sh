#!/bin/bash

echo "=== AWS Amplify Debug Script ==="
echo "Current working directory:"
pwd

echo -e "\n=== Full directory tree ==="
find . -type f -name "*.jsx" | sort

echo -e "\n=== src/pages structure ==="
find src/pages -type f 2>/dev/null || echo "src/pages not found"

echo -e "\n=== Looking for Home.jsx specifically ==="
find . -name "Home.jsx" -type f

echo -e "\n=== Case-sensitive check ==="
find . -name "*ome.jsx" -type f
find . -name "*ome.*" -type f

echo -e "\n=== Running actual build ==="
npm run build