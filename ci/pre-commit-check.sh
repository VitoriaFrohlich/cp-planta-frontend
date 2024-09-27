#!/bin/bash

# Verifica se houve modificações no .gitignore
if git diff --cached --name-only | grep -q '.gitignore'; then
    echo "### ATENÇÃO: Modificações no .gitignore não são permitidas."
    exit 1
fi

# Executa lint e testes
npx lint-staged
npm run test -- --passWithNoTests

# Verifica se lint e testes passaram
if [ $? -ne 0 ]; then
    echo "### ERRO: Verificações de lint ou testes falharam."
    exit 1
fi

echo "### PRE-COMMIT: Verificações concluídas com sucesso."