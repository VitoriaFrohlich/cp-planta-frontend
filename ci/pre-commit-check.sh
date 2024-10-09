#!/bin/bash

# Verifica se o código está de acordo com o ESLint
echo "Running linters and Prettier..."
npm run linters
if [ $? -ne 0 ]; then
  echo "ESLint check failed."
  exit 1
fi

echo "Pre-commit checks passed!"
exit 0