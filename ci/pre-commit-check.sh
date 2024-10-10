#!/bin/bash

# Garante que o script está rodando do diretório raiz do projeto
cd "$(dirname "$0")/.."

# Verifica se o código está de acordo com o ESLint
echo "Running ESLint..."
npm run lint
if [ $? -ne 0 ]; then
  echo "ESLint check failed. Please fix the issues and try again."
  exit 1
fi

# Verifica se o código está formatado com Prettier (sem alterar)
echo "Running Prettier check..."
npm run prettier:check
if [ $? -ne 0 ]; then
  echo "Prettier check failed. Please format your code and try again."
  exit 1
fi

echo "Pre-commit checks passed!"
exit 0
