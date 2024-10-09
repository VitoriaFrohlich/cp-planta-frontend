#!/bin/bash

# Verifica se o código está de acordo com o ESLint
echo "Running linters and Prettier..."
npm run linters
if [ $? -ne 0 ]; then
  echo "ESLint check failed."
  exit 1
fi

# Verifica se o código está formatado de acordo com o Prettier
echo "Running Prettier..."
npm run format
if [ $? -ne 0 ]; then
  echo "Prettier check failed."
  exit 1
fi

echo "### PRE-COMMIT: Verificações concluídas com sucesso."